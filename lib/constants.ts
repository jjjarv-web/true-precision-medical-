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

export type ConsultationSpecialty = {
  id: string
  label: string
}

export const CONSULTATION_SPECIALTIES: ConsultationSpecialty[] = [
  { id: 'knee',     label: 'Knee Pain'        },
  { id: 'shoulder', label: 'Shoulder Pain'    },
  { id: 'spine',    label: 'Spine & Back'     },
  { id: 'hip',      label: 'Hip Pain'         },
  { id: 'nerve',    label: 'Nerve Conditions' },
  { id: 'sports',   label: 'Sports Injury'    },
]

export const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Specialists', href: '#specialists' },
  { label: 'Locations', href: '#locations' },
] as const

export const PHONE_NUMBER = '(800) 555-0199'
export const PHONE_HREF = 'tel:18005550199'

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

export type TreatmentCategory = {
  title: string
  desc: string
  colorClass: string
  img: string
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  {
    title: 'Orthopedics',
    desc: 'Knee, hip, and shoulder preservation and minimally invasive repair.',
    colorClass: 'bg-brand-surface-warm',
    img: 'https://images.unsplash.com/photo-1552196563-552592671689?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Spine & Back',
    desc: 'Advanced neurosurgery and pain management without major fusion.',
    colorClass: 'bg-brand-surface-blue',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Interventional',
    desc: 'Image-guided, targeted treatments for vascular and pain conditions.',
    colorClass: 'bg-brand-surface-purple',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Sports Medicine',
    desc: 'Regenerative therapies and arthroscopic solutions for active patients.',
    colorClass: 'bg-brand-bg-alt',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
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
}

export const WHY_FEATURES: WhyFeature[] = [
  {
    title: 'Minimally Invasive Focus',
    desc: 'Our techniques use smaller incisions, causing less trauma to your body, which means significantly less pain and faster healing.',
  },
  {
    title: 'Outpatient Convenience',
    desc: 'Avoid the hospital entirely. Our premium surgical centers are designed for comfort, efficiency, and same-day discharge.',
  },
  {
    title: 'Elite Specialists',
    desc: 'You are treated by fellowship-trained experts who specialize exclusively in advanced, tissue-sparing procedures.',
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
