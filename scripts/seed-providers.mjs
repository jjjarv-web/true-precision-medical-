// One-off seed — full copy + photos from lib/constants.ts demo data.
// Run with:  node --env-file=.env.local scripts/seed-providers.mjs
// Requires SANITY_API_WRITE_TOKEN (Editor). Safe to re-run — fixed _ids.

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

async function uploadImageFromUrl(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Image fetch failed ${res.status}: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, { filename })
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

/** Mirrors PROVIDERS_RAW in lib/constants.ts (same slugs as providerSlug(name)). */
const rows = [
  {
    _id: 'provider-seed-dr-elena-vasquez',
    name: 'Dr. Elena Vasquez',
    slug: 'dr-elena-vasquez',
    title: 'Neurosurgeon',
    featuredOnHomepage: true,
    cardTagline: 'ABNS board certified · Spine fellowship',
    highlights: ['ABNS board certified', 'Minimally invasive spine fellowship'],
    shortIntro:
      'Focuses on minimally invasive spine surgery, nerve decompression, and image-guided approaches so patients recover with less downtime than traditional open procedures.',
    extendedBio:
      'Dr. Vasquez completed residency training in neurological surgery followed by a dedicated fellowship in minimally invasive and complex spine surgery. Her practice philosophy centers on matching the least invasive effective procedure to each patient’s anatomy and goals — whether that means endoscopic decompression, motion-preserving options, or carefully selected fusion when necessary.\n\nShe works closely with physical medicine, pain management, and primary care teams so that surgery is one part of a broader recovery plan. Patients appreciate her direct communication style and emphasis on setting realistic expectations before and after any procedure.\n\nOutside the OR, she contributes to clinical quality initiatives across True Precision Medical’s outpatient centers and stays current with evolving techniques in endoscopic and tubular access spine surgery.',
    photoUrl:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
    orderRank: 'a0',
  },
  {
    _id: 'provider-seed-dr-marcus-webb',
    name: 'Dr. Marcus Webb',
    slug: 'dr-marcus-webb',
    title: 'Orthopedic Surgeon',
    featuredOnHomepage: true,
    cardTagline: 'ABOS board certified · Sports & joint preservation',
    highlights: ['ABOS board certified', 'Sports medicine & joint preservation fellowship'],
    shortIntro:
      'Emphasizes joint preservation, arthroscopic repair, and return-to-activity planning for active adults — from weekend athletes to patients getting back to daily life without major surgery.',
    extendedBio:
      'Dr. Webb’s orthopedic training emphasized sports medicine and joint preservation before he focused on arthroscopic and minimally invasive techniques for knee and shoulder conditions. He believes most patients do best when surgery is paired with structured rehab and clear milestones — so you always know what “better” looks like week by week.\n\nHe takes time to explain imaging in plain language, compare non-operative paths with surgical ones, and help you weigh recovery time against your personal priorities. Many of his patients are trying to avoid or delay joint replacement; when replacement is the right answer, he discusses implant options and expectations openly.\n\nDr. Webb is active in peer education on outpatient orthopedic procedures and works with our care coordinators to streamline scheduling, pre-op preparation, and follow-up across our Arizona locations.',
    photoUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    orderRank: 'a1',
  },
  {
    _id: 'provider-seed-dr-rebecca-huang',
    name: 'Dr. Rebecca Huang',
    slug: 'dr-rebecca-huang',
    title: 'Interventional Radiologist',
    featuredOnHomepage: true,
    cardTagline: 'ABR certified · Image-guided & catheter-based care',
    highlights: ['ABR board certified (diagnostic radiology)', 'Interventional radiology fellowship'],
    shortIntro:
      'Performs catheter-based, image-guided treatments for pain, vascular conditions, and many procedures that once required open surgery — with smaller incisions, targeted therapy, and typically same-day discharge.',
    extendedBio:
      'After diagnostic radiology residency and an interventional radiology fellowship, Dr. Huang built a practice around procedures that use real-time imaging to treat disease through tiny access points — often under moderate sedation with same-day discharge.\n\nShe collaborates daily with orthopedic, neurosurgery, vascular, and pain teams to plan procedures that reduce recovery time and target symptoms at their source. Her communication style is detail-oriented: she wants patients to understand what the images show, what the procedure does, and what to expect in the first days after treatment.\n\nDr. Huang is passionate about expanding appropriate outpatient alternatives to open surgery when clinical evidence supports them, and she participates in multidisciplinary tumor boards and quality review for complex cases.',
    photoUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    orderRank: 'a2',
  },
  {
    _id: 'provider-seed-jordan-ellis',
    name: 'Jordan Ellis',
    slug: 'jordan-ellis',
    title: 'Family Nurse Practitioner',
    featuredOnHomepage: true,
    cardTagline: 'FNP-BC · Arizona licensed NP',
    highlights: ['FNP-BC (ANCC)', 'Arizona licensed NP'],
    shortIntro:
      'Works alongside our physicians to coordinate care plans, educate patients on minimally invasive options, and support you from first visit through recovery.',
    extendedBio:
      'Jordan is a board-certified family nurse practitioner with experience in outpatient specialty care. She focuses on patient education, medication reconciliation, and care coordination so that your treatment plan stays consistent across visits.\n\nShe often serves as a first point of contact for questions after procedures and helps connect you with resources — from physical therapy referrals to insurance navigation when appropriate.',
    photoUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    orderRank: 'a3',
  },
  {
    _id: 'provider-seed-sam-patel',
    name: 'Sam Patel',
    slug: 'sam-patel',
    title: 'Physician Assistant',
    featuredOnHomepage: false,
    cardTagline: 'PA-C · NCCPA certified',
    highlights: ['NCCPA certified (PA-C)', 'Arizona licensed PA'],
    shortIntro:
      'Partners with our surgical and interventional teams for evaluations, follow-up, and procedure preparation — helping you understand each step of your care path.',
    extendedBio:
      'Sam supports pre-operative education, same-day discharge follow-ups, and clear handoffs between our surgical, interventional, and primary care partners.',
    photoUrl:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    orderRank: 'a4',
  },
]

async function toDoc(row) {
  let photo
  try {
    const safeName = row.slug.replace(/[^a-z0-9-]/gi, '-')
    photo = await uploadImageFromUrl(row.photoUrl, `provider-${safeName}.jpg`)
  } catch (e) {
    console.warn(`  ⚠ Photo upload skipped for ${row.name}:`, e.message)
  }

  return {
    _id: row._id,
    _type: 'provider',
    name: row.name,
    slug: { _type: 'slug', current: row.slug },
    title: row.title,
    isActive: true,
    featuredOnHomepage: row.featuredOnHomepage,
    cardTagline: row.cardTagline,
    highlights: row.highlights,
    shortIntro: row.shortIntro,
    extendedBio: row.extendedBio,
    orderRank: row.orderRank,
    ...(photo ? { photo } : {}),
  }
}

async function main() {
  console.log(`Seeding ${rows.length} providers into ${dataset}…`)
  for (const row of rows) {
    const doc = await toDoc(row)
    const res = await client.createOrReplace(doc)
    console.log(`  ✓ ${res._id} — ${res.name}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error('\n✗ Seed failed:')
  console.error(err?.message || err)
  if (err?.statusCode === 403 || /Insufficient permissions/i.test(String(err?.message))) {
    console.error('\nHint: set SANITY_API_WRITE_TOKEN to an Editor token in .env.local')
  }
  process.exit(1)
})
