/** Shared Framer Motion cubic-bezier ease used across all animated components. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Default Google stats when Site Settings fields are unset (see `fetchSiteSettings`). */
export const GOOGLE_RATING = 4.9
export const GOOGLE_REVIEWS = 400

export type Provider = {
  id: string
  name: string
  title: string
  slug: string
  /** Short line on card hover footer — must be truthful per person */
  cardTagline: string
  /** 1–3 short pills on profile page */
  highlights: string[]
  /**
   * Short intro / overview — profile hero + card hover teaser.
   * Sanity field id: `shortIntro` (display name: “Short intro (overview)”).
   */
  shortIntro?: string
  /**
   * Optional long-form bio; collapsible on profile when lengthy.
   * Sanity field id: `extendedBio` (display name: “Extended bio”).
   */
  extendedBio?: string
  photoUrl?: string
}

/** One-line SEO / Open Graph fallback when `shortIntro` is empty — neutral wording (no implied credentials). */
export function providerMetaDescription(p: Pick<Provider, 'name' | 'title' | 'shortIntro'>): string {
  if (p.shortIntro?.trim()) {
    const t = p.shortIntro.trim()
    return t.length <= 165 ? t : `${t.slice(0, 162)}…`
  }
  return `${p.name} — ${p.title} at True Precision Medical.`
}

/** Shared slugifier — also used when providers move into Sanity later. */
export function providerSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

const PROVIDERS_RAW: Omit<Provider, 'slug'>[] = [
  {
    id: 'provider-neuro',
    name: 'Dr. Samuel Kim',
    title: 'Neurosurgeon',
    cardTagline: '23 years in neurosurgery · PNS specialist · Former Weill Cornell faculty',
    highlights: [
      '23 years of neurosurgical experience',
      'Former Assistant Professor, Weill Cornell Medical College',
      'PNS specialist — outpatient same-day surgery',
    ],
    shortIntro:
      'Neurosurgeon with 23 years of experience and a former Weill Cornell faculty member. Specializes in Peripheral Nerve Stimulation (PNS) for occipital neuralgia, migraines, and chronic pain — outpatient, same-day surgery.',
    extendedBio:
      "Dr. Kim is a neurosurgeon with 23 years of experience, including more than 10 years as an Assistant Professor of Neurological Surgery at Weill Cornell Medical College, where he both performed and taught brain and spine surgeries. He currently runs his own practice in Phoenix, AZ.\n\nOver his career, Dr. Kim has performed numerous complex spine surgeries — historically one of the most effective treatments for chronic pain. The advent of Peripheral Nerve Stimulation (PNS) has given him a revolutionary, minimally invasive alternative: a technique that delivers enormous pain relief with minimal downside risk, performed entirely in the outpatient setting.\n\nDr. Kim specializes in PNS for patients suffering from occipital neuralgia, chronic migraines, chronic neck and low back pain, knee pain, and foot pain. His procedures are performed in an ambulatory surgery center, allowing patients to have their surgery and return home the same day.\n\nDr. Kim takes pride in getting to know each patient as an individual. His approach centers on building a strong doctor-patient relationship, where every treatment plan is carefully tailored to the unique needs and goals of the person in front of him.",
    photoUrl: '/images/providers/dr-samuel-kim.png',
  },
  {
    id: 'provider-ortho',
    name: 'Dr. Marcus Webb',
    title: 'Orthopedic Surgeon',
    cardTagline: 'ABOS board certified · Sports & joint preservation',
    highlights: ['ABOS board certified', 'Sports medicine & joint preservation fellowship'],
    shortIntro:
      'Emphasizes joint preservation, arthroscopic repair, and return-to-activity planning for active adults — from weekend athletes to patients getting back to daily life without major surgery.',
    extendedBio:
      'Dr. Webb’s orthopedic training emphasized sports medicine and joint preservation before he focused on arthroscopic and minimally invasive techniques for knee and shoulder conditions. He believes most patients do best when surgery is paired with structured rehab and clear milestones — so you always know what “better” looks like week by week.\n\nHe takes time to explain imaging in plain language, compare non-operative paths with surgical ones, and help you weigh recovery time against your personal priorities. Many of his patients are trying to avoid or delay joint replacement; when replacement is the right answer, he discusses implant options and expectations openly.\n\nDr. Webb is active in peer education on outpatient orthopedic procedures and works with our care coordinators to streamline scheduling, pre-op preparation, and follow-up across our Arizona locations.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'provider-ir',
    name: 'Dr. Rebecca Huang',
    title: 'Interventional Radiologist',
    cardTagline: 'ABR certified · Image-guided & catheter-based care',
    highlights: ['ABR board certified (diagnostic radiology)', 'Interventional radiology fellowship'],
    shortIntro:
      'Performs catheter-based, image-guided treatments for pain, vascular conditions, and many procedures that once required open surgery — with smaller incisions, targeted therapy, and typically same-day discharge.',
    extendedBio:
      'After diagnostic radiology residency and an interventional radiology fellowship, Dr. Huang built a practice around procedures that use real-time imaging to treat disease through tiny access points — often under moderate sedation with same-day discharge.\n\nShe collaborates daily with orthopedic, neurosurgery, vascular, and pain teams to plan procedures that reduce recovery time and target symptoms at their source. Her communication style is detail-oriented: she wants patients to understand what the images show, what the procedure does, and what to expect in the first days after treatment.\n\nDr. Huang is passionate about expanding appropriate outpatient alternatives to open surgery when clinical evidence supports them, and she participates in multidisciplinary tumor boards and quality review for complex cases.',
    photoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'provider-np',
    name: 'Jordan Ellis',
    title: 'Family Nurse Practitioner',
    cardTagline: 'FNP-BC · Arizona licensed NP',
    highlights: ['FNP-BC (ANCC)', 'Arizona licensed NP'],
    shortIntro:
      'Works alongside our physicians to coordinate care plans, educate patients on minimally invasive options, and support you from first visit through recovery.',
    extendedBio:
      'Jordan is a board-certified family nurse practitioner with experience in outpatient specialty care. She focuses on patient education, medication reconciliation, and care coordination so that your treatment plan stays consistent across visits.\n\nShe often serves as a first point of contact for questions after procedures and helps connect you with resources — from physical therapy referrals to insurance navigation when appropriate.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'provider-pa',
    name: 'Sam Patel',
    title: 'Physician Assistant',
    cardTagline: 'PA-C · NCCPA certified',
    highlights: ['NCCPA certified (PA-C)', 'Arizona licensed PA'],
    shortIntro:
      'Partners with our surgical and interventional teams for evaluations, follow-up, and procedure preparation — helping you understand each step of your care path.',
    extendedBio:
      'Sam supports pre-operative education, same-day discharge follow-ups, and clear handoffs between our surgical, interventional, and primary care partners.',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
]

/** Fallback roster when Sanity has no `provider` documents (e.g. before seeding). Superseded by CMS data once documents exist. */
export const PROVIDERS: Provider[] = PROVIDERS_RAW.map((p) => ({
  ...p,
  slug: providerSlug(p.name),
}))

/**
 * Homepage shows at most four curated “lead” providers so the section stays balanced
 * as the full team grows (5–7+). Order = left-to-right / scroll order.
 * Omitted IDs still appear on `/specialists` and their own profile pages.
 */
export const HOMEPAGE_FEATURED_PROVIDER_IDS: readonly string[] = [
  'provider-neuro',
  'provider-ortho',
  'provider-ir',
  'provider-np',
]

export function getHomepageProviders(): Provider[] {
  return HOMEPAGE_FEATURED_PROVIDER_IDS.map((id) => PROVIDERS.find((p) => p.id === id)).filter(
    (p): p is Provider => p != null
  )
}

export function hasMoreProvidersBeyondHomepage(): boolean {
  return PROVIDERS.length > getHomepageProviders().length
}

export function findProviderBySlug(slug: string): Provider | undefined {
  return PROVIDERS.find((p) => p.slug === slug)
}

export type Insurance = {
  name: string
  priority?: boolean
}

export const INSURANCES: Insurance[] = [
  { name: 'Medicare', priority: true },
  { name: 'Medicaid' },
  { name: 'Blue Cross Blue Shield' },
  { name: 'Aetna' },
  { name: 'UnitedHealthcare' },
  { name: 'Cigna' },
  { name: 'Humana' },
  { name: 'Tricare' },
  { name: 'Anthem' },
  { name: 'Oscar Health' },
  { name: 'Molina Healthcare' },
  { name: 'Centene' },
  { name: 'Beacon Health' },
]

export type Specialty = {
  id: string
  label: string
  desc: string
  img: string | null
}

export const SPECIALTIES: Specialty[] = [
  {
    id: 'knee',
    label: 'Knee Pain',
    desc: 'Genicular artery embolization and peripheral nerve stimulation for knee osteoarthritis and chronic knee pain — without replacement surgery.',
    img: '/images/hero/hero-knee.png',
  },
  {
    id: 'shoulder',
    label: 'Shoulder Pain',
    desc: 'Image-guided embolization and nerve stimulation to reduce shoulder inflammation and chronic pain, preserving your joint without open surgery.',
    img: '/images/hero/hero-shoulder.png',
  },
  {
    id: 'wrist',
    label: 'Wrist Pain',
    desc: 'Targeted embolization for chronic wrist tendinopathy and pain — a minimally invasive alternative to surgery with same-day discharge.',
    img: '/images/hero/hero-wrist.png',
  },
  {
    id: 'foot',
    label: 'Foot Pain',
    desc: 'Embolization therapy for plantar fasciitis and chronic heel pain that hasn\'t responded to conservative treatment.',
    img: '/images/hero/hero-plantar-fascia.png',
  },
  {
    id: 'spine',
    label: 'Back & Neck Pain',
    desc: 'Peripheral nerve stimulation and image-guided interventions for spine-related pain — meaningful relief without major fusion surgery.',
    img: '/images/hero/hero-back-neck.png',
  },
  {
    id: 'neuropathy',
    label: 'Neuropathy',
    desc: 'Peripheral nerve stimulation to treat chronic nerve pain, numbness, and tingling — targeting the source for lasting relief.',
    img: '/images/hero/hero-neuropathy.png',
  },
  {
    id: 'neuralgia',
    label: 'Headache & Neuralgia',
    desc: 'Occipital nerve stimulation and targeted nerve blocks for chronic headaches, occipital neuralgia, and treatment-resistant head pain.',
    img: '/images/hero/hero-occipital.png',
  },
  {
    id: 'fibroids',
    label: 'Uterine Fibroids',
    desc: 'Uterine fibroid embolization (UFE) — a uterus-preserving, outpatient alternative to hysterectomy with a significantly shorter recovery.',
    img: '/images/hero/hero-fibroids.png',
  },
  {
    id: 'pad',
    label: 'Peripheral Arterial Disease',
    desc: 'Minimally invasive endovascular treatments to restore blood flow, relieve limb pain, and reduce the risk of serious complications — without open surgery.',
    img: '/images/hero/hero-pad.png',
  },
]

export const NAV_LINKS = [
  { label: 'Treatments', href: '/treatments' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Specialists', href: '/specialists' },
  { label: 'Locations', href: '/locations' },
] as const

export const PHONE_NUMBER = '(800) 555-0199'
export const PHONE_HREF = 'tel:18005550199'

/** Swappable per client: Google Maps → Share → copy link (strip ?entry=… tracking if you like). */
export const GOOGLE_BUSINESS_REVIEWS_URL =
  'https://www.google.com/maps/place/True+Precision+Medical/@33.525985,-112.103685,17z/data=!3m1!4b1!4m6!3m5!1s0x872b123bb6d63d83:0x15f41e757384b1d6!8m2!3d33.5257521!4d-112.1009342!16s%2Fg%2F11t0vntnv-'

export type BeforeAfterPair = {
  beforeSrc: string
  afterSrc: string
  altBefore: string
  altAfter: string
  caption: string
}

/** Replace with consented clinical or lifestyle photography per compliance. */
export const PATIENT_STORIES_BEFORE_AFTER: BeforeAfterPair = {
  beforeSrc:
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1400&auto=format&fit=crop',
  afterSrc:
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1400&auto=format&fit=crop',
  altBefore: 'Illustrative before — replace with approved imagery',
  altAfter: 'Illustrative after — replace with approved imagery',
  caption:
    'Individual results vary. Images shown are placeholders; use consented patient photography or cleared clinical assets for production.',
}

export type FeaturedTestimonial = {
  id: string
  quote: string
  name: string
  detail: string
  date: string
}

export const FEATURED_TESTIMONIALS: FeaturedTestimonial[] = [
  {
    id: '1',
    quote:
      'From the first consult to same-day discharge, everything felt coordinated and calm. I wish I had found this team sooner.',
    name: 'Carolyn S.',
    detail: 'Knee care · Phoenix',
    date: 'Jan 2025',
  },
  {
    id: '2',
    quote:
      'The staff explained every step. I walked out knowing exactly what to expect—and the follow-up was just as thoughtful.',
    name: 'James T.',
    detail: 'Outpatient procedure · Scottsdale',
    date: 'Mar 2025',
  },
  {
    id: '3',
    quote:
      'Minimal downtime, clear communication, and physicians who actually listened. An exceptional experience top to bottom.',
    name: 'Elena R.',
    detail: 'Vascular consult · East Valley',
    date: 'Feb 2025',
  },
  {
    id: '4',
    quote:
      'I was nervous about any procedure. They took the time I needed, answered every question, and I was home the same afternoon.',
    name: 'Michael D.',
    detail: 'Spine · Peoria',
    date: 'Dec 2024',
  },
  {
    id: '5',
    quote:
      'Professional from check-in to discharge. The facility feels nothing like a hospital—quiet, modern, and genuinely comfortable.',
    name: 'Patricia W.',
    detail: 'Fibroid treatment · Gilbert',
    date: 'Nov 2024',
  },
  {
    id: '6',
    quote:
      'After years of putting off care, I finally got relief. The imaging-guided approach meant a smaller incision and faster recovery than I expected.',
    name: 'Robert K.',
    detail: 'Joint pain · Phoenix',
    date: 'Apr 2025',
  },
  {
    id: '7',
    quote: 'Clear, direct, and kind. That combination is rare.',
    name: 'Sandra M.',
    detail: 'Consultation · Scottsdale',
    date: 'Mar 2025',
  },
  {
    id: '8',
    quote:
      'My referring doctor sent me here and I am glad they did. The specialist walked me through options I did not know existed outside of major surgery.',
    name: 'David L.',
    detail: 'Second opinion · East Valley',
    date: 'Jan 2025',
  },
  {
    id: '9',
    quote:
      'Scheduling was straightforward, wait times were reasonable, and billing was explained upfront. As someone who manages a busy schedule, that mattered.',
    name: 'Angela H.',
    detail: 'Outpatient procedure · Phoenix',
    date: 'Feb 2025',
  },
  {
    id: '10',
    quote:
      'I appreciated the focus on minimally invasive options first. It aligned with what I wanted: fix the problem without an unnecessary hospital stay.',
    name: 'Thomas B.',
    detail: 'Nerve pain · Peoria',
    date: 'Dec 2024',
  },
]

export type ServiceCategory = {
  label: string
  icon: 'bone' | 'activity' | 'brain' | 'stethoscope'
  colorClass: string
  iconColorClass: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    label: 'Knee & Joint Pain',
    icon: 'bone',
    colorClass: 'bg-brand-surface-warm',
    iconColorClass: 'text-orange-600',
  },
  {
    label: 'Spine & Back',
    icon: 'activity',
    colorClass: 'bg-brand-surface-blue',
    iconColorClass: 'text-brand-sky',
  },
  {
    label: 'Neurosurgery',
    icon: 'brain',
    colorClass: 'bg-brand-surface-purple',
    iconColorClass: 'text-purple-600',
  },
  {
    label: 'Explore All',
    icon: 'stethoscope',
    colorClass: 'bg-brand-surface-teal',
    iconColorClass: 'text-brand-accent',
  },
]


export type HowItWorksStep = {
  step: string
  title: string
  desc: string
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Request a consultation',
    desc: "Book online or call us. We'll match you with the right specialist for your specific condition within 48 hours.",
  },
  {
    step: '02',
    title: 'Get a personalized plan',
    desc: 'Meet with your doctor to review imaging and discuss minimally invasive options tailored to your lifestyle.',
  },
  {
    step: '03',
    title: 'Receive outpatient care',
    desc: 'Undergo your procedure in our state-of-the-art, comfortable outpatient centers and recover at home the same day.',
  },
]

export type WhyFeature = {
  title: string
  desc: string
  icon: 'scan-line' | 'building-2' | 'award'
}

export const WHY_FEATURES: WhyFeature[] = [
  {
    title: 'Minimally Invasive Focus',
    desc: 'Our techniques use smaller incisions, causing less trauma to your body, which means significantly less pain and faster healing.',
    icon: 'scan-line',
  },
  {
    title: 'Outpatient Convenience',
    desc: 'Avoid the hospital entirely. Our premium surgical centers are designed for comfort, efficiency, and same-day discharge.',
    icon: 'building-2',
  },
  {
    title: 'Elite Specialists',
    desc: 'You are treated by fellowship-trained experts who specialize exclusively in advanced, tissue-sparing procedures.',
    icon: 'award',
  },
]

export type TrustItem = {
  icon: 'shield-check' | 'star' | 'clock' | 'map-pin'
  label: string
}

export const TRUST_ITEMS: TrustItem[] = [
  { icon: 'shield-check', label: 'Board-Certified Specialists' },
  { icon: 'star', label: '4.9/5 Patient Rating' },
  { icon: 'clock', label: 'Outpatient Focus' },
  { icon: 'map-pin', label: '12 Premium Locations' },
]

export type FooterColumn = {
  heading: string
  links: { label: string; href: string }[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Treatments',
    links: [
      { label: 'Knee Pain', href: '/treatments/knee' },
      { label: 'Shoulder Pain', href: '/treatments/shoulder' },
      { label: 'Back & Neck Pain', href: '/treatments/spine' },
      { label: 'Neuropathy', href: '/treatments/neuropathy' },
      { label: 'Headache & Neuralgia', href: '/treatments/neuralgia' },
      { label: 'Uterine Fibroids', href: '/treatments/fibroids' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Approach', href: '/our-approach' },
      { label: 'Specialists', href: '/specialists' },
      { label: 'Locations', href: '/locations' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book Online', href: '/book' },
      { label: 'Patient Portal', href: '#' },
      { label: 'Refer a Patient', href: '#' },
    ],
  },
]

export type TreatmentDetail = {
  tagline: string
  intro: string
  conditions: string[]
  approaches: { name: string; desc: string }[]
  expectations: { before: string; during: string; after: string }
}

export const TREATMENT_DETAILS: Record<string, TreatmentDetail> = {
  knee: {
    tagline: 'Relieve knee pain without replacement.',
    intro:
      "Knee pain from osteoarthritis or chronic inflammation can be debilitating — but joint replacement isn't your only option. Our interventional specialists use genicular artery embolization (GAE) and peripheral nerve stimulation (PNS) to reduce pain and improve function without surgery.\n\nMost patients treated with GAE experience significant pain reduction within weeks, with same-day discharge.",
    conditions: [
      'Knee osteoarthritis',
      'Chronic knee inflammation',
      'Knee pain after prior surgery',
      'Knee synovitis',
      'Degenerative knee disease',
      'Sports-related knee injury',
    ],
    approaches: [
      {
        name: 'Genicular Artery Embolization (GAE)',
        desc: 'A catheter-based procedure that reduces blood flow to the inflamed synovial tissue driving knee pain — no incision, no general anesthesia, same-day discharge.',
      },
      {
        name: 'Peripheral Nerve Stimulation (PNS)',
        desc: 'A small lead placed near the genicular nerves delivers gentle electrical impulses that interrupt pain signals before they reach the brain.',
      },
      {
        name: 'Image-Guided Injections',
        desc: 'Ultrasound or fluoroscopy-guided corticosteroid, PRP, or viscosupplement injections — precision placement for maximum effect with minimal side effects.',
      },
    ],
    expectations: {
      before: 'A dedicated consultation to review your imaging, understand your pain history, and recommend the most appropriate intervention for your anatomy and goals.',
      during: 'Procedures are performed under light sedation in our outpatient center. No hospital admission, no overnight stay.',
      after: 'Same-day discharge with a clear recovery timeline. Most patients notice meaningful improvement within 2–4 weeks.',
    },
  },
  shoulder: {
    tagline: 'Restore shoulder function. Skip the open surgery.',
    intro:
      "Chronic shoulder pain from tendinopathy, calcific tendinitis, or persistent inflammation can significantly limit daily life. Our embolization and nerve stimulation approaches target the source of pain with precision — preserving your joint and avoiding the lengthy recovery of traditional surgery.",
    conditions: [
      'Shoulder tendinopathy',
      'Calcific tendinitis',
      'Chronic shoulder inflammation',
      'Rotator cuff related pain',
      'Post-operative shoulder pain',
    ],
    approaches: [
      {
        name: 'Shoulder Embolization',
        desc: 'Catheter-based embolization reduces abnormal blood vessel growth in inflamed shoulder tissue — addressing the root cause of chronic tendon pain.',
      },
      {
        name: 'Peripheral Nerve Stimulation (PNS)',
        desc: 'Targeted nerve stimulation near the suprascapular or axillary nerves interrupts pain signals and provides sustained relief for chronic shoulder pain.',
      },
      {
        name: 'Image-Guided Injections',
        desc: 'Ultrasound-guided injection of anti-inflammatory agents directly into the affected bursa or tendon sheath for precise, targeted relief.',
      },
    ],
    expectations: {
      before: 'We review your imaging and pain history, explain what is driving your symptoms, and discuss all minimally invasive options available.',
      during: 'Outpatient procedures performed under local anesthetic or light sedation. Most take under two hours.',
      after: 'Same-day discharge. Most patients notice improvement within weeks, with continued progress over 1–3 months.',
    },
  },
  wrist: {
    tagline: 'Targeted relief for chronic wrist pain.',
    intro:
      "Chronic wrist pain from tendinopathy or post-injury inflammation can interfere with everything from work to daily tasks. Embolization offers a minimally invasive path to pain relief without open surgery — same-day discharge, no general anesthesia.",
    conditions: [
      'Wrist tendinopathy',
      "De Quervain's tenosynovitis",
      'Chronic wrist inflammation',
      'Post-injury wrist pain',
      'Carpal-related inflammation',
    ],
    approaches: [
      {
        name: 'Wrist Embolization',
        desc: 'Catheter-based embolization reduces abnormal neovascularization in inflamed wrist tendons — treating the root cause of chronic pain with same-day discharge.',
      },
      {
        name: 'Image-Guided Injections',
        desc: 'Ultrasound-guided corticosteroid or PRP injections placed precisely at the site of inflammation for targeted, effective relief.',
      },
    ],
    expectations: {
      before: 'A consultation to review your history and imaging and confirm embolization is the right approach for your condition.',
      during: 'Outpatient procedure under local anesthetic. Typically under an hour.',
      after: 'Same-day discharge. Most patients return to normal activity within days to weeks.',
    },
  },
  foot: {
    tagline: 'Step forward without foot pain.',
    intro:
      "Plantar fasciitis and chronic heel pain are among the most common and frustrating conditions — often resistant to months of conservative care. Embolization targets the abnormal blood vessel growth driving your pain, offering meaningful relief where other treatments have failed.",
    conditions: [
      'Plantar fasciitis',
      'Chronic heel pain',
      'Plantar fascia tendinopathy',
      'Foot pain unresponsive to conservative care',
    ],
    approaches: [
      {
        name: 'Plantar Fascia Embolization',
        desc: 'A catheter-based procedure that reduces abnormal neovascularization in the plantar fascia — addressing the inflammatory process driving chronic heel pain.',
      },
      {
        name: 'Image-Guided Injections',
        desc: 'Ultrasound-guided corticosteroid or PRP injections delivered precisely to the plantar fascia insertion point for immediate pain management.',
      },
    ],
    expectations: {
      before: 'We review your imaging and prior treatment history to confirm you are a good candidate for embolization.',
      during: 'Outpatient procedure under local anesthetic. Typically 30–60 minutes.',
      after: 'Same-day discharge. Significant pain relief is typically achieved within 4–8 weeks.',
    },
  },
  neuropathy: {
    tagline: 'Interrupt the pain signal. Restore your quality of life.',
    intro:
      "Peripheral neuropathy — numbness, burning, tingling, or chronic nerve pain — often worsens over time with medication alone. Peripheral nerve stimulation (PNS) delivers gentle electrical impulses directly to the affected nerves, interrupting pain signals before they reach the brain.\n\nIt's not masking the pain. It's changing how your nervous system processes it.",
    conditions: [
      'Peripheral neuropathy',
      'Diabetic neuropathy',
      'Chemotherapy-induced neuropathy',
      'Chronic nerve pain in hands or feet',
      'Small fiber neuropathy',
    ],
    approaches: [
      {
        name: 'Peripheral Nerve Stimulation (PNS)',
        desc: 'A thin lead placed near the affected peripheral nerve delivers precisely calibrated electrical pulses that modulate pain signals — providing lasting relief without systemic medication side effects.',
      },
      {
        name: 'Image-Guided Nerve Blocks',
        desc: 'Diagnostic and therapeutic nerve blocks to confirm the pain pathway and provide immediate relief while longer-term solutions are planned.',
      },
    ],
    expectations: {
      before: 'A thorough evaluation of your neuropathy type, severity, and prior treatments to confirm PNS is appropriate for your specific nerve distribution.',
      during: 'Lead placement is performed under light sedation with imaging guidance. A trial period allows you to evaluate the benefit before permanent implantation.',
      after: 'Most patients experience significant improvement during the trial. Permanent implantation is a brief outpatient procedure with minimal downtime.',
    },
  },
  neuralgia: {
    tagline: 'Break the cycle of chronic head pain.',
    intro:
      "Occipital neuralgia and chronic headaches can be relentless — shooting pain from the base of the skull, pressure behind the eyes, sensitivity to light. When medications and injections provide only temporary relief, peripheral nerve stimulation (PNS) offers a more durable solution by directly modulating the nerve signals driving your pain.",
    conditions: [
      'Occipital neuralgia',
      'Chronic migraine',
      'Cervicogenic headache',
      'Post-traumatic headache',
      'Trigeminal neuralgia',
      'Cluster headache',
    ],
    approaches: [
      {
        name: 'Occipital Nerve Stimulation (PNS)',
        desc: 'Leads placed near the greater and lesser occipital nerves deliver electrical pulses that block pain signals — providing sustained headache relief without ongoing medication.',
      },
      {
        name: 'Occipital Nerve Blocks',
        desc: 'Image-guided injection of local anesthetic and corticosteroid around the occipital nerve — both diagnostic and therapeutic for acute relief.',
      },
      {
        name: 'Radiofrequency Ablation',
        desc: 'For appropriate candidates, heat energy disrupts the nerve fibers transmitting pain signals — effects typically last 9–18 months.',
      },
    ],
    expectations: {
      before: 'We review your headache history, prior treatments, and imaging to determine the best approach for your specific pain pattern.',
      during: 'Nerve blocks and stimulation lead placement are outpatient procedures under local anesthetic or light sedation.',
      after: 'Many patients notice significant improvement within days to weeks. Stimulation parameters can be adjusted to optimize relief.',
    },
  },
  fibroids: {
    tagline: 'Preserve your uterus. End the symptoms.',
    intro:
      "Uterine fibroids are the leading cause of hysterectomy in the United States — but surgery is rarely your only option. Uterine fibroid embolization (UFE) shrinks fibroids by cutting off their blood supply, resolving symptoms without removing the uterus.\n\nCovered by most major insurance. Outpatient. Home the same day.",
    conditions: [
      'Uterine fibroids',
      'Heavy or prolonged menstrual bleeding',
      'Pelvic pressure and pain',
      'Frequent urination from fibroid bulk',
      'Anemia from fibroid-related blood loss',
    ],
    approaches: [
      {
        name: 'Uterine Fibroid Embolization (UFE)',
        desc: 'A catheter-based procedure that delivers tiny particles to the uterine arteries feeding your fibroids — cutting off their blood supply. Fibroids shrink over months, relieving symptoms without surgery or organ removal.',
      },
      {
        name: 'Pre-Procedure Imaging Review',
        desc: 'A detailed MRI or ultrasound review confirms fibroid size, location, and number — ensuring UFE is appropriate and planning the optimal approach for your anatomy.',
      },
    ],
    expectations: {
      before: 'A consultation with imaging review to confirm you are a good candidate for UFE and discuss what to expect during and after the procedure.',
      during: 'UFE is performed under light sedation through a small catheter, typically taking 45–90 minutes in our outpatient suite.',
      after: 'Most patients go home the same day. Cramping and fatigue are common for the first few days. Symptom improvement typically occurs within 1–3 months as fibroids shrink.',
    },
  },
  joint: {
    tagline: 'Your joints deserve better than replacement.',
    intro:
      "Joint pain changes everything — how you move, sleep, and think about the future. Our orthopedic specialists focus on preservation first: arthroscopic repair, targeted injections, and image-guided procedures that address the root cause before considering more invasive options.\n\nMost patients who come to us have been told surgery is their only path. Often, it isn\u2019t.",
    conditions: [
      'Knee osteoarthritis',
      'Hip pain & impingement',
      'Shoulder instability & rotator cuff',
      'Joint degeneration',
      'Sports injuries',
      'Tendon & ligament damage',
    ],
    approaches: [
      {
        name: 'Genicular Artery Embolization',
        desc: 'A catheter-based procedure that reduces blood flow to the inflamed synovial tissue driving knee pain — no incision, no general anesthesia, same-day discharge.',
      },
      {
        name: 'Arthroscopic Repair',
        desc: 'Minimally invasive surgery through tiny portals to repair torn cartilage, ligaments, or tendons with significantly less recovery time than open procedures.',
      },
      {
        name: 'Image-Guided Injections',
        desc: 'Ultrasound or fluoroscopy-guided corticosteroid, PRP, or viscosupplement injections — precision placement for maximum effect.',
      },
    ],
    expectations: {
      before: 'A dedicated consultation to review your imaging, understand your goals, and build a plan that fits your life — not a one-size-fits-all protocol.',
      during: 'Most procedures are performed under light sedation in our outpatient center. No hospital admission, no overnight stay.',
      after: 'Same-day discharge with a clear recovery timeline. Our team checks in to track your progress and adjust the plan if needed.',
    },
  },
  spine: {
    tagline: 'Relief without the fusion.',
    intro:
      "Back and neck pain can feel relentless — and the fear of major spine surgery often keeps people from seeking help. Our neurosurgeons trained in minimally invasive techniques that treat the source of pain through smaller access points, preserving healthy tissue and shortening recovery.\n\nFusion is sometimes the right answer. But it\u2019s rarely the first one.",
    conditions: [
      'Herniated disc',
      'Spinal stenosis',
      'Sciatica & radiculopathy',
      'Neck pain & cervical conditions',
      'Degenerative disc disease',
      'Facet joint arthritis',
    ],
    approaches: [
      {
        name: 'Endoscopic Decompression',
        desc: 'A state-of-the-art approach using a small tube and camera to relieve nerve pressure without the muscle disruption of traditional open surgery.',
      },
      {
        name: 'Nerve Blocks & Ablation',
        desc: 'Image-guided injections and radiofrequency procedures that interrupt pain signals at their source — effective for facet, sacroiliac, and radicular pain.',
      },
      {
        name: 'Motion-Preserving Options',
        desc: 'When surgical stabilization is needed, our surgeons prioritize techniques that protect adjacent levels and maintain natural spinal movement.',
      },
    ],
    expectations: {
      before: 'Your surgeon reviews your MRI or CT in detail with you, explains exactly what is causing your pain, and walks through every option before recommending a path.',
      during: 'Outpatient procedures performed under local anesthetic or light sedation. Most take under two hours.',
      after: 'Most patients go home within hours. A structured recovery protocol helps you return to normal activity as quickly as safely possible.',
    },
  },
  mens: {
    tagline: "Don't settle for symptoms you've been told to live with.",
    intro:
      "Men's health conditions — from an enlarged prostate to hormone imbalance — often go undertreated because the alternatives sound worse than the problem. Our interventional and urology-aligned specialists offer outpatient, catheter-based solutions that work without the side effects of traditional surgery.\n\nYou shouldn't have to choose between discomfort and a major procedure.",
    conditions: [
      'Benign prostatic hyperplasia (BPH)',
      'Chronic pelvic pain',
      'Erectile dysfunction (vascular causes)',
      'Varicocele',
      'Hormone optimization',
      'Prostate conditions',
    ],
    approaches: [
      {
        name: 'Prostatic Artery Embolization (PAE)',
        desc: 'A catheter-based procedure that reduces prostate size by restricting blood flow to the enlarged tissue — no incision, no catheter left behind, same-day discharge.',
      },
      {
        name: 'Varicocele Embolization',
        desc: 'An image-guided alternative to open surgery that seals off dilated veins causing pain, fertility issues, or hormone disruption.',
      },
      {
        name: 'Targeted Vascular Evaluation',
        desc: "For ED with vascular causes, we assess and address blood flow issues that other providers may overlook — treating the cause, not just the symptom.",
      },
    ],
    expectations: {
      before: "A detailed consultation that respects your privacy and your time. We review your history, imaging, and goals before recommending any course of action.",
      during: 'Catheter-based procedures are performed under light sedation. No general anesthesia, no hospital stay.',
      after: 'Most patients resume normal activity within days. Our team follows up to confirm results and answer any questions.',
    },
  },
  womens: {
    tagline: 'Preserve more. Recover faster. Stay home.',
    intro:
      "Women's health conditions like uterine fibroids, heavy bleeding, and pelvic pain are often treated with surgery that removes organs unnecessarily. Our interventional specialists offer uterus-preserving alternatives that are proven, outpatient, and covered by most major insurance.\n\nYou deserve options — not just a surgical date.",
    conditions: [
      'Uterine fibroids',
      'Adenomyosis',
      'Heavy menstrual bleeding',
      'Pelvic congestion syndrome',
      'Ovarian vein reflux',
      'Post-menopausal conditions',
    ],
    approaches: [
      {
        name: 'Uterine Fibroid Embolization (UFE)',
        desc: 'A catheter-based procedure that cuts off blood supply to fibroids, shrinking them naturally — without surgery, without removing the uterus, and with a much shorter recovery than hysterectomy.',
      },
      {
        name: 'Pelvic Vein Embolization',
        desc: 'Treats pelvic congestion syndrome and ovarian vein reflux — chronic pelvic pain conditions that are frequently misdiagnosed — through a minimally invasive catheter approach.',
      },
      {
        name: 'Image-Guided Ablation',
        desc: 'Targeted ablation techniques for adenomyosis and other conditions where precision matters.',
      },
    ],
    expectations: {
      before: 'A thorough consultation with imaging review. We take the time to explain every option and answer questions about recovery, fertility implications, and expected outcomes.',
      during: 'Outpatient procedure under light sedation. No general anesthesia, no hospital admission — typically one to two hours.',
      after: 'Most patients are home the same day and back to normal activity within one to two weeks — significantly faster than surgical alternatives.',
    },
  },
  nerve: {
    tagline: 'Target the source. Not just the symptom.',
    intro:
      'Chronic nerve pain is one of the most complex and undertreated conditions in medicine. Our interventional pain specialists use real-time imaging to place treatments precisely where they are needed — not guessing, not masking — addressing the signals driving your pain at their origin.\n\nYou don\'t have to manage pain forever.',
    conditions: [
      'Chronic radicular pain',
      'Complex regional pain syndrome (CRPS)',
      'Peripheral neuropathy',
      'Post-surgical nerve pain',
      'Trigeminal & occipital neuralgia',
      'Facet & sacroiliac joint pain',
    ],
    approaches: [
      {
        name: 'Image-Guided Nerve Blocks',
        desc: 'Fluoroscopy or ultrasound-guided injections that deliver medication precisely to the affected nerve — diagnostic and therapeutic in a single visit.',
      },
      {
        name: 'Radiofrequency Ablation (RFA)',
        desc: 'Uses heat energy to disrupt the nerve signals causing chronic pain. Effects typically last 9–18 months; the procedure is repeatable.',
      },
      {
        name: 'Spinal Cord Stimulation',
        desc: 'For complex, refractory nerve pain, small electrodes modify pain signals before they reach the brain — an alternative to long-term opioid management.',
      },
    ],
    expectations: {
      before: 'We start with a thorough diagnostic evaluation, review your imaging and prior treatments, and identify which interventions are most likely to produce lasting relief.',
      during: 'Most procedures are performed under light sedation or local anesthetic in our outpatient center. Precision imaging guides every step.',
      after: 'Many patients notice meaningful improvement within days to weeks. We track your response and adjust the protocol to build on what works.',
    },
  },
  pad: {
    tagline: 'Restore blood flow. Relieve limb pain. No open surgery.',
    intro:
      "Peripheral arterial disease occurs when plaque buildup narrows the arteries supplying blood to your legs, feet, or arms — causing pain, cramping, and in severe cases, non-healing wounds or limb-threatening ischemia. Traditional treatment often meant bypass surgery with weeks of recovery.\n\nOur interventional specialists treat PAD endovascularly: through a tiny access point in the wrist or groin, we open blocked arteries with balloons and stents, restoring circulation the same day.",
    conditions: [
      'Peripheral arterial disease (PAD)',
      'Claudication (leg pain with walking)',
      'Critical limb ischemia',
      'Non-healing wounds or ulcers',
      'Rest pain in feet or legs',
      'Arterial blockages in the iliac, femoral, or tibial arteries',
    ],
    approaches: [
      {
        name: 'Percutaneous Transluminal Angioplasty (PTA)',
        desc: 'A tiny balloon catheter is guided to the narrowed artery and inflated to open the blockage, restoring blood flow without any incision.',
      },
      {
        name: 'Endovascular Stenting',
        desc: "When angioplasty alone isn't sufficient, a small metal stent is placed inside the artery to hold it open long-term and prevent re-narrowing.",
      },
      {
        name: 'Atherectomy',
        desc: 'A specialized catheter removes or shaves away the plaque buildup directly from within the artery wall, clearing the vessel before or instead of stenting.',
      },
    ],
    expectations: {
      before: 'A non-invasive vascular ultrasound or CT angiogram maps the location and severity of your arterial disease. We review findings together and build a personalized treatment plan.',
      during: 'Procedures are performed under light sedation through an access point smaller than a pencil tip. Most cases take one to two hours with minimal discomfort.',
      after: 'Same-day or next-morning discharge is standard. Most patients notice improved circulation and reduced pain within days. A structured follow-up plan monitors long-term vessel health.',
    },
  },
  vascular: {
    tagline: 'Smaller access. Better circulation. Home the same day.',
    intro:
      'Vascular conditions — varicose veins, arterial blockages, chronic venous insufficiency — are often treated with open surgery that carries real risk and long recovery. Catheter-based medicine has changed that. Our interventional radiologists treat most vascular conditions through an access point no larger than a pinhole.\n\nSame results. A fraction of the recovery.',
    conditions: [
      'Varicose veins & chronic venous insufficiency',
      'Peripheral arterial disease (PAD)',
      'Deep vein thrombosis (DVT)',
      'Renal artery stenosis',
      'Mesenteric ischemia',
      'Vascular malformations',
    ],
    approaches: [
      {
        name: 'Endovenous Ablation',
        desc: 'Laser or radiofrequency energy delivered inside the damaged vein closes it from within — eliminating varicose veins without stripping or surgical incisions.',
      },
      {
        name: 'Angioplasty & Stenting',
        desc: 'For arterial blockages, a small balloon opens the narrowed vessel and a stent holds it open — restoring blood flow without bypass surgery.',
      },
      {
        name: 'Catheter-Directed Thrombolysis',
        desc: 'For acute clot conditions, medication delivered directly to the clot site via catheter dissolves it far more effectively than systemic IV treatment.',
      },
    ],
    expectations: {
      before: 'A vascular imaging evaluation pinpoints the location and severity of the issue. We explain your options clearly and help you decide on the right intervention.',
      during: 'Catheter-based procedures typically take one to two hours under light sedation. Most patients feel minimal discomfort during and after.',
      after: 'Same-day discharge is standard. Recovery timelines depend on the procedure, but most patients return to full activity significantly faster than after open surgery.',
    },
  },
}
