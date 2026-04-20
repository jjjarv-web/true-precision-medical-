export const GOOGLE_RATING   = 4.9
export const GOOGLE_REVIEWS  = 400

export type Provider = {
  id: string
  name: string
  title: string
  bio?: string
  photoUrl?: string
}

export const PROVIDERS: Provider[] = [
  {
    id: 'provider-1',
    name: 'Dr. Sarah Mitchell',
    title: 'Orthopedic Surgeon',
    bio: 'Fellowship-trained in joint preservation and minimally invasive knee and hip procedures. Board Certified.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'provider-2',
    name: 'Dr. James Caldwell',
    title: 'Interventional Radiologist',
    bio: 'Specializes in image-guided, catheter-based treatments for vascular and pain conditions. Board Certified.',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'provider-3',
    name: 'Dr. Elena Vasquez',
    title: 'Neurosurgeon',
    bio: 'Expert in minimally invasive spine surgery and nerve decompression. Fellowship-trained. Board Certified.',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'provider-4',
    name: 'Dr. Ryan Park',
    title: 'Sports Medicine Specialist',
    bio: 'Regenerative medicine and arthroscopic solutions for athletes and active patients. Board Certified.',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
  },
]

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
  img: string
}

export const SPECIALTIES: Specialty[] = [
  {
    id: 'joint',
    label: 'Joint Pain',
    desc: 'Knee, hip, and shoulder preservation and minimally invasive repair.',
    img: '/images/joint-pain.jpg',
  },
  {
    id: 'spine',
    label: 'Back & Neck',
    desc: 'Advanced neurosurgery and pain management without major fusion.',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mens',
    label: "Men's Health",
    desc: 'Targeted treatments for conditions affecting men\'s quality of life and vitality.',
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'womens',
    label: "Women's Health",
    desc: 'Compassionate, specialized care for conditions unique to women\'s health.',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'nerve',
    label: 'Nerve Pain',
    desc: 'Image-guided, targeted treatments for nerve and chronic pain conditions.',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'vascular',
    label: 'Vascular & Vein',
    desc: 'Minimally invasive vascular treatments for healthier circulation and vein health.',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
  },
]

export const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Specialists', href: '#specialists' },
  { label: 'Locations', href: '#locations' },
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
      { label: 'Orthopedics', href: '#' },
      { label: 'Neurosurgery', href: '#' },
      { label: 'Interventional Radiology', href: '#' },
      { label: 'Pain Management', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Approach', href: '#' },
      { label: 'Specialists', href: '#' },
      { label: 'Locations', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book Online', href: '#' },
      { label: 'Patient Portal', href: '#' },
      { label: 'Refer a Patient', href: '#' },
    ],
  },
]
