// One-off seed — full copy + photos from lib/constants.ts demo data.
// Run with:  node --env-file=.env.local scripts/seed-providers.mjs
// Requires SANITY_API_WRITE_TOKEN (Editor). Safe to re-run — fixed _ids.

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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

async function uploadImage(source, filename) {
  let buf
  if (source.startsWith('/')) {
    // Local file path relative to project root
    const absPath = resolve(join(__dirname, '..', 'public', source))
    buf = readFileSync(absPath)
  } else {
    const res = await fetch(source)
    if (!res.ok) throw new Error(`Image fetch failed ${res.status}: ${source}`)
    buf = Buffer.from(await res.arrayBuffer())
  }
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
    _id: 'provider-seed-dr-samuel-kim',
    name: 'Dr. Samuel Kim',
    slug: 'dr-samuel-kim',
    title: 'Neurosurgeon',
    featuredOnHomepage: true,
    cardTagline: '23 years in neurosurgery · PNS specialist · Former Weill Cornell faculty',
    highlights: [
      '23 years of neurosurgical experience',
      'Former Assistant Professor, Weill Cornell Medical College',
      'PNS specialist — outpatient same-day surgery',
    ],
    shortIntro:
      'With 23 years of neurosurgical experience and over a decade as an Assistant Professor at Weill Cornell Medical College, Dr. Kim now specializes in Peripheral Nerve Stimulation (PNS) — a minimally invasive, outpatient treatment for chronic pain conditions including occipital neuralgia, migraines, back and neck pain, and knee and foot pain.',
    extendedBio:
      "Dr. Kim is a neurosurgeon with 23 years of experience, including more than 10 years as an Assistant Professor of Neurological Surgery at Weill Cornell Medical College, where he both performed and taught brain and spine surgeries. He currently runs his own practice in Phoenix, AZ.\n\nOver his career, Dr. Kim has performed numerous complex spine surgeries — historically one of the most effective treatments for chronic pain. The advent of Peripheral Nerve Stimulation (PNS) has given him a revolutionary, minimally invasive alternative: a technique that delivers enormous pain relief with minimal downside risk, performed entirely in the outpatient setting.\n\nDr. Kim specializes in PNS for patients suffering from occipital neuralgia, chronic migraines, chronic neck and low back pain, knee pain, and foot pain. His procedures are performed in an ambulatory surgery center, allowing patients to have their surgery and return home the same day.\n\nDr. Kim takes pride in getting to know each patient as an individual. His approach centers on building a strong doctor-patient relationship, where every treatment plan is carefully tailored to the unique needs and goals of the person in front of him.",
    photoUrl: '/images/providers/dr-samuel-kim.png',
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
    const ext = row.photoUrl.endsWith('.png') ? 'png' : 'jpg'
    photo = await uploadImage(row.photoUrl, `provider-${safeName}.${ext}`)
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
