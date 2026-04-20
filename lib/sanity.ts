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
