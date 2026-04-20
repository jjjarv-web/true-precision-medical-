import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
})

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
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: '(800) 555-0199',
  phoneHref: 'tel:+18005550199',
}

function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  return digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const data = await sanityClient.fetch<{ phone?: string } | null>(
    `*[_id == "siteSettings" && !(_id in path("drafts.**"))][0]{ phone }`,
    {},
    { next: { revalidate: 3600 } }
  )

  const phone = data?.phone?.trim()
  if (!phone) return DEFAULT_SITE_SETTINGS

  const phoneHref = toTelHref(phone)
  if (!phoneHref) return DEFAULT_SITE_SETTINGS

  return { phone, phoneHref }
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
