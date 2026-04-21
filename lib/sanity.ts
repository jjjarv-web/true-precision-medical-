import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { Provider } from './constants'
import {
  PROVIDERS as STATIC_PROVIDERS,
  GOOGLE_RATING,
  GOOGLE_REVIEWS,
  getHomepageProviders as staticGetHomepageProviders,
} from './constants'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
})

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

function providerPhotoUrl(photo: unknown): string | undefined {
  if (!photo || typeof photo !== 'object') return undefined
  try {
    return imageBuilder
      .image(photo as Parameters<typeof imageBuilder.image>[0])
      .width(960)
      .height(1280)
      .fit('crop')
      .quality(85)
      .auto('format')
      .url()
  } catch {
    return undefined
  }
}

type RawProviderDoc = {
  _id: string
  name?: string
  slug?: string
  title?: string
  cardTagline?: string
  highlights?: string[]
  shortIntro?: string
  extendedBio?: string | null
  photo?: unknown
}

function mapSanityProvider(raw: RawProviderDoc): Provider | null {
  const slug = raw.slug?.trim()
  const name = raw.name?.trim()
  const title = raw.title?.trim()
  if (!slug || !name || !title) return null

  const cardTagline = raw.cardTagline?.trim()
  const highlights = Array.isArray(raw.highlights)
    ? raw.highlights.map((h) => String(h).trim()).filter(Boolean)
    : []
  if (!cardTagline || highlights.length === 0) return null

  return {
    id: raw._id,
    name,
    title,
    slug,
    cardTagline,
    highlights,
    shortIntro: raw.shortIntro?.trim() || undefined,
    extendedBio: raw.extendedBio?.trim() || undefined,
    photoUrl: providerPhotoUrl(raw.photo),
  }
}

const providerProjection = `{
  _id,
  name,
  "slug": slug.current,
  title,
  cardTagline,
  highlights,
  shortIntro,
  extendedBio,
  photo
}`

const providerListFilter = `_type == "provider" && (isActive == true || !defined(isActive)) && !(_id in path("drafts.**"))`

async function fetchProvidersCore(): Promise<Provider[]> {
  const data = await sanityClient.fetch<RawProviderDoc[]>(
    `*[${providerListFilter}] | order(orderRank) ${providerProjection}`,
    {},
    { next: { revalidate: 3600 } }
  )
  if (!Array.isArray(data) || data.length === 0) return []
  return data.map(mapSanityProvider).filter((p): p is Provider => p != null)
}

/** All active providers, CMS order (drag in Studio). Falls back to static `PROVIDERS` in code when the dataset is empty. */
export async function fetchProviders(): Promise<Provider[]> {
  const core = await fetchProvidersCore()
  return core.length > 0 ? core : STATIC_PROVIDERS
}

/**
 * Homepage strip (max 4): documents with `featuredOnHomepage` first; if none are flagged, uses the first four
 * from the full provider list. Falls back to static `HOMEPAGE_FEATURED_PROVIDER_IDS` when CMS is empty.
 */
export async function fetchHomepageProviders(): Promise<Provider[]> {
  // GROQ slice [a...b] has an exclusive end → [0...4] is four items (indices 0–3).
  const featuredData = await sanityClient.fetch<RawProviderDoc[]>(
    `*[${providerListFilter} && featuredOnHomepage == true] | order(orderRank) [0...4] ${providerProjection}`,
    {},
    { next: { revalidate: 3600 } }
  )
  const featured = Array.isArray(featuredData)
    ? featuredData.map(mapSanityProvider).filter((p): p is Provider => p != null)
    : []
  if (featured.length > 0) return featured.slice(0, 4)

  const core = await fetchProvidersCore()
  if (core.length > 0) return core.slice(0, 4)

  return staticGetHomepageProviders()
}

export async function fetchProviderBySlug(slug: string): Promise<Provider | null> {
  const raw = await sanityClient.fetch<RawProviderDoc | null>(
    `*[${providerListFilter} && slug.current == $slug][0] ${providerProjection}`,
    { slug },
    { next: { revalidate: 3600 } }
  )
  const fallback = () => STATIC_PROVIDERS.find((p) => p.slug === slug) ?? null
  if (!raw) return fallback()
  const mapped = mapSanityProvider(raw)
  return mapped ?? fallback()
}

export async function fetchInsuranceSettings(): Promise<InsuranceSettings> {
  const data = await sanityClient.fetch<InsuranceSettings | null>(
    `*[_id == "insuranceSettings" && !(_id in path("drafts.**"))][0]{
      outOfNetworkCarriers,
      passMessage,
      failMessage,
      unknownMessage
    }`,
    {},
    { next: { revalidate: 3600 } }
  )

  if (!data) return DEFAULT_INSURANCE_SETTINGS

  return {
    outOfNetworkCarriers: data.outOfNetworkCarriers ?? [],
    passMessage: data.passMessage ?? DEFAULT_INSURANCE_SETTINGS.passMessage,
    failMessage: data.failMessage ?? DEFAULT_INSURANCE_SETTINGS.failMessage,
    unknownMessage: data.unknownMessage ?? DEFAULT_INSURANCE_SETTINGS.unknownMessage,
  }
}

export type InsuranceSettings = {
  outOfNetworkCarriers: string[]
  passMessage: string
  failMessage: string
  unknownMessage: string
}

export const DEFAULT_INSURANCE_SETTINGS: InsuranceSettings = {
  outOfNetworkCarriers: [],
  passMessage:
    'We accept many plans like yours. Coverage varies by plan — benefits will be verified before your visit.',
  failMessage:
    'We may be out of network with this carrier. Coverage varies by plan — please call to verify.',
  unknownMessage:
    "We're not familiar with that carrier — call us and we'll look it up with you.",
}

export type SiteSettings = {
  phone: string
  phoneHref: string
  /** Google Business Profile average rating (1–5), one decimal in UI. */
  googleReviewRating: number
  /** Raw count; UI appends + (e.g. 400+). */
  googleReviewCount: number
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: '(800) 555-0199',
  phoneHref: 'tel:+18005550199',
  googleReviewRating: GOOGLE_RATING,
  googleReviewCount: GOOGLE_REVIEWS,
}

function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  return digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`
}

function coerceGoogleReviewRating(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return GOOGLE_RATING
  return Math.min(5, Math.max(1, Math.round(value * 10) / 10))
}

function coerceGoogleReviewCount(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return GOOGLE_REVIEWS
  return Math.max(0, Math.round(value))
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const data = await sanityClient.fetch<{
    phone?: string
    googleReviewRating?: number
    googleReviewCount?: number
  } | null>(
    `*[_id == "siteSettings" && !(_id in path("drafts.**"))][0]{
      phone,
      googleReviewRating,
      googleReviewCount
    }`,
    {},
    { next: { revalidate: 3600 } }
  )

  const googleReviewRating = coerceGoogleReviewRating(data?.googleReviewRating)
  const googleReviewCount = coerceGoogleReviewCount(data?.googleReviewCount)

  const phone = data?.phone?.trim()
  if (!phone) {
    return { ...DEFAULT_SITE_SETTINGS, googleReviewRating, googleReviewCount }
  }

  const phoneHref = toTelHref(phone)
  if (!phoneHref) {
    return { ...DEFAULT_SITE_SETTINGS, googleReviewRating, googleReviewCount }
  }

  return { phone, phoneHref, googleReviewRating, googleReviewCount }
}

export type LocationHours = {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
}

export type Location = {
  _id: string
  name: string
  slug: string
  phone: string
  phoneHref: string
  streetAddress: string
  suite?: string
  city: string
  state: string
  postalCode: string
  lat: number
  lng: number
  hours: LocationHours
  hoursSummary: string[]
  mapsUrl: string
  specialties?: string[]
}

const DAY_ORDER: Array<{ key: keyof LocationHours; label: string }> = [
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
]

export function formatHoursSummary(hours?: LocationHours | null): string[] {
  if (!hours) return []

  const days = DAY_ORDER.map(({ key, label }) => ({
    label,
    value: (hours[key]?.trim() || 'Closed'),
  }))

  const runs: Array<{ start: string; end: string; value: string }> = []
  for (const day of days) {
    const last = runs[runs.length - 1]
    if (last && last.value === day.value) {
      last.end = day.label
    } else {
      runs.push({ start: day.label, end: day.label, value: day.value })
    }
  }

  return runs.map(({ start, end, value }) =>
    start === end ? `${start}: ${value}` : `${start} – ${end}: ${value}`
  )
}

export function buildMapsUrl(
  parts: Pick<Location, 'streetAddress' | 'suite' | 'city' | 'state' | 'postalCode'>
): string {
  const q = [parts.streetAddress, parts.suite, parts.city, parts.state, parts.postalCode]
    .filter((segment) => typeof segment === 'string' && segment.length > 0)
    .join(', ')
  return `https://maps.google.com/?q=${encodeURIComponent(q)}`
}

type RawLocation = {
  _id: string
  name?: string
  phone?: string
  streetAddress?: string
  suite?: string
  city?: string
  state?: string
  postalCode?: string
  coordinates?: string
  hours?: LocationHours
  specialties?: string[]
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

function parseCoordinates(input?: string | null): { lat: number; lng: number } | null {
  if (!input) return null
  const parts = String(input).split(',').map((s) => s.trim())
  if (parts.length !== 2) return null
  const lat = Number(parts[0])
  const lng = Number(parts[1])
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  if (lat < -90 || lat > 90) return null
  if (lng < -180 || lng > 180) return null
  return { lat, lng }
}

export async function fetchLocations(): Promise<Location[]> {
  const data = await sanityClient.fetch<RawLocation[]>(
    `*[_type == "location" && (isActive == true || !defined(isActive)) && !(_id in path("drafts.**"))] | order(orderRank){
      _id,
      name,
      phone,
      streetAddress,
      suite,
      city,
      state,
      postalCode,
      coordinates,
      hours,
      specialties
    }`,
    {},
    { next: { revalidate: 3600 } }
  )

  if (!Array.isArray(data)) return []

  return data
    .map((loc) => {
      const coords = parseCoordinates(loc.coordinates)
      return { loc, coords }
    })
    .filter(
      ({ loc, coords }) =>
        coords &&
        loc.name &&
        loc.streetAddress &&
        loc.city &&
        loc.state &&
        loc.postalCode
    )
    .map(({ loc, coords }) => {
      const streetAddress = loc.streetAddress as string
      const city = loc.city as string
      const state = loc.state as string
      const postalCode = loc.postalCode as string
      const phone = loc.phone?.trim() ?? ''

      const name = loc.name as string
      return {
        _id: loc._id,
        name,
        slug: slugify(name),
        phone,
        phoneHref: toTelHref(phone),
        streetAddress,
        suite: loc.suite?.trim() || undefined,
        city,
        state,
        postalCode,
        lat: (coords as { lat: number; lng: number }).lat,
        lng: (coords as { lat: number; lng: number }).lng,
        hours: loc.hours ?? {},
        hoursSummary: formatHoursSummary(loc.hours),
        mapsUrl: buildMapsUrl({
          streetAddress,
          suite: loc.suite,
          city,
          state,
          postalCode,
        }),
        specialties: loc.specialties ?? [],
      }
    })
}
