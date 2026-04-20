// One-off seed for the four original locations.
// Run with:  node --env-file=.env.local scripts/seed-locations.mjs
// Safe to re-run — uses createOrReplace with fixed _ids, so it's idempotent.

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!token) throw new Error('Missing SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DEFAULT_HOURS = {
  monday: '8am – 5pm',
  tuesday: '8am – 5pm',
  wednesday: '8am – 5pm',
  thursday: '8am – 5pm',
  friday: '8am – 5pm',
  saturday: 'Closed',
  sunday: 'Closed',
}

const locations = [
  {
    _id: 'location-phoenix-central',
    name: 'Phoenix — Central',
    slug: 'phoenix-central',
    phone: '(602) 555-0101',
    streetAddress: '6036 N 19th Ave',
    suite: 'Suite 204',
    city: 'Phoenix',
    state: 'AZ',
    postalCode: '85015',
    lat: 33.5069,
    lng: -112.1012,
    orderRank: 'a0',
  },
  {
    _id: 'location-scottsdale-north',
    name: 'Scottsdale — North',
    slug: 'scottsdale-north',
    phone: '(480) 555-0199',
    streetAddress: '8752 E Pinnacle Peak Rd',
    suite: 'Suite 100',
    city: 'Scottsdale',
    state: 'AZ',
    postalCode: '85255',
    lat: 33.7067,
    lng: -111.9225,
    orderRank: 'a1',
  },
  {
    _id: 'location-gilbert-east-valley',
    name: 'Gilbert — East Valley',
    slug: 'gilbert-east-valley',
    phone: '(480) 555-0177',
    streetAddress: '2680 S Val Vista Dr',
    suite: 'Suite 110',
    city: 'Gilbert',
    state: 'AZ',
    postalCode: '85295',
    lat: 33.2792,
    lng: -111.7896,
    orderRank: 'a2',
  },
  {
    _id: 'location-peoria-west-valley',
    name: 'Peoria — West Valley',
    slug: 'peoria-west-valley',
    phone: '(623) 555-0144',
    streetAddress: '13128 N 94th Dr',
    suite: 'Suite 300',
    city: 'Peoria',
    state: 'AZ',
    postalCode: '85381',
    lat: 33.5847,
    lng: -112.2553,
    orderRank: 'a3',
  },
]

function toDoc(loc) {
  return {
    _id: loc._id,
    _type: 'location',
    name: loc.name,
    phone: loc.phone,
    isActive: true,
    streetAddress: loc.streetAddress,
    suite: loc.suite,
    city: loc.city,
    state: loc.state,
    postalCode: loc.postalCode,
    coordinates: `${loc.lat}, ${loc.lng}`,
    hours: { ...DEFAULT_HOURS },
    orderRank: loc.orderRank,
  }
}

async function main() {
  console.log(`Seeding ${locations.length} locations into ${dataset}…`)
  for (const loc of locations) {
    const doc = toDoc(loc)
    const res = await client.createOrReplace(doc)
    console.log(`  ✓ ${res._id} — ${res.name}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error('\n✗ Seed failed:')
  console.error(err?.message || err)
  if (err?.statusCode === 403 || /Insufficient permissions/i.test(String(err?.message))) {
    console.error(
      '\nHint: your token does not have write access. Create a new Editor or Admin token at\n' +
        'https://www.sanity.io/manage and set it as SANITY_API_WRITE_TOKEN in .env.local.'
    )
  }
  process.exit(1)
})
