export type OptionLayout = 'grid-3' | 'grid-2' | 'grid-icon-4' | 'grid-icon-5' | 'grid-icon-2'

export type Option = {
  id: string
  label: string
  sub?: string
  icon?: string // SVG path data or named icon key
}

export type Question = {
  id: string
  text: string
  layout: OptionLayout
  multiSelect?: boolean
  options: Option[]
}

export type ResultConfig = {
  headline: string
  subhead: string
  body: string
  stats: string[]
}

export type AssessmentConfig = {
  categoryId: string
  slug: string
  title: string
  color: string // accent hex for this category
  questions: Question[]
  result: ResultConfig
}

// ─────────────────────────────────────────────
// JOINT PAIN
// ─────────────────────────────────────────────
const jointPain: AssessmentConfig = {
  categoryId: 'joint',
  slug: 'joint',
  title: 'Joint Pain',
  color: '#4DCCE8',
  questions: [
    {
      id: 'location',
      text: 'Where is your joint pain located?',
      layout: 'grid-icon-4',
      options: [
        { id: 'knee', label: 'Knee', icon: 'knee' },
        { id: 'hip', label: 'Hip', icon: 'hip' },
        { id: 'shoulder', label: 'Shoulder', icon: 'shoulder' },
        { id: 'multiple', label: 'Multiple joints', icon: 'multiple' },
      ],
    },
    {
      id: 'severity',
      text: 'How would you rate your pain on a scale of 0–10?',
      layout: 'grid-3',
      options: [
        { id: 'low', label: '0 – 3', sub: 'Low' },
        { id: 'moderate', label: '4 – 6', sub: 'Moderate' },
        { id: 'severe', label: '7 – 10', sub: 'Severe' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been dealing with this pain?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'age',
      text: "What's your age range?",
      layout: 'grid-3',
      options: [
        { id: 'under40', label: 'Under 40' },
        { id: '40to60', label: '40 – 60' },
        { id: 'over60', label: 'Over 60' },
      ],
    },
    {
      id: 'treatments',
      text: 'What treatments have you tried for your joint pain?',
      layout: 'grid-icon-5',
      multiSelect: true,
      options: [
        { id: 'medication', label: 'Medication', icon: 'pill' },
        { id: 'injections', label: 'Injections', icon: 'injection' },
        { id: 'pt', label: 'Physical Therapy', icon: 'therapy' },
        { id: 'surgery', label: 'Surgery', icon: 'surgery' },
        { id: 'none', label: 'None yet', icon: 'none' },
      ],
    },
  ],
  result: {
    headline: 'Great News!',
    subhead:
      "Based on your answers, you may be an excellent candidate for minimally invasive joint care — without major surgery.",
    body: "Our specialists use image-guided techniques to target the source of joint pain directly, helping you recover faster and get back to what matters.",
    stats: [
      '90% of patients with your profile experience significant pain relief',
      '95% of people who complete this assessment request an appointment',
      '4 out of 5 patients experience relief lasting 2+ years',
    ],
  },
}

// ─────────────────────────────────────────────
// BACK & NECK
// ─────────────────────────────────────────────
const backNeck: AssessmentConfig = {
  categoryId: 'spine',
  slug: 'spine',
  title: 'Back & Neck',
  color: '#4DCCE8',
  questions: [
    {
      id: 'location',
      text: 'Where is your pain primarily located?',
      layout: 'grid-3',
      options: [
        { id: 'lower-back', label: 'Lower Back' },
        { id: 'mid-back', label: 'Mid Back' },
        { id: 'neck', label: 'Neck' },
      ],
    },
    {
      id: 'radiating',
      text: 'Does your pain travel down your arm or leg?',
      layout: 'grid-2',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
    },
    {
      id: 'severity',
      text: 'How would you rate your pain on a scale of 0–10?',
      layout: 'grid-3',
      options: [
        { id: 'low', label: '0 – 3', sub: 'Low' },
        { id: 'moderate', label: '4 – 6', sub: 'Moderate' },
        { id: 'severe', label: '7 – 10', sub: 'Severe' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been experiencing this pain?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What have you tried for relief?',
      layout: 'grid-icon-5',
      multiSelect: true,
      options: [
        { id: 'medication', label: 'Medication', icon: 'pill' },
        { id: 'injections', label: 'Injections', icon: 'injection' },
        { id: 'pt', label: 'Physical Therapy', icon: 'therapy' },
        { id: 'chiro', label: 'Chiropractic', icon: 'surgery' },
        { id: 'none', label: 'Nothing yet', icon: 'none' },
      ],
    },
  ],
  result: {
    headline: 'Good News!',
    subhead:
      "Based on your answers, you may benefit from minimally invasive spine care — no major fusion required.",
    body: "Our neurosurgery and pain management specialists specialize in image-guided, tissue-sparing approaches that address the root cause of back and neck pain.",
    stats: [
      'Most patients with your profile avoid major spinal fusion surgery',
      '88% report meaningful improvement within 6 weeks of treatment',
      'Same-day discharge available for most procedures',
    ],
  },
}

// ─────────────────────────────────────────────
// MEN'S HEALTH
// ─────────────────────────────────────────────
const mensHealth: AssessmentConfig = {
  categoryId: 'mens',
  slug: 'mens',
  title: "Men's Health",
  color: '#4DCCE8',
  questions: [
    {
      id: 'concern',
      text: 'What is your primary concern?',
      layout: 'grid-2',
      options: [
        { id: 'prostate', label: 'Enlarged Prostate / BPH' },
        { id: 'varicocele', label: 'Varicocele' },
        { id: 'erectile', label: 'Erectile Dysfunction' },
        { id: 'other', label: 'Other' },
      ],
    },
    {
      id: 'impact',
      text: 'How much is this affecting your daily life?',
      layout: 'grid-3',
      options: [
        { id: 'mild', label: 'Mildly', sub: 'Manageable' },
        { id: 'moderate', label: 'Moderately', sub: 'Noticeable' },
        { id: 'severe', label: 'Significantly', sub: 'Major impact' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been experiencing these symptoms?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'age',
      text: "What's your age range?",
      layout: 'grid-3',
      options: [
        { id: 'under40', label: 'Under 40' },
        { id: '40to60', label: '40 – 60' },
        { id: 'over60', label: 'Over 60' },
      ],
    },
    {
      id: 'treatments',
      text: 'Have you tried any treatments so far?',
      layout: 'grid-2',
      options: [
        { id: 'medication', label: 'Medication' },
        { id: 'lifestyle', label: 'Lifestyle changes' },
        { id: 'procedure', label: 'A procedure' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'You Have Options.',
    subhead:
      "Based on your answers, there are minimally invasive treatments that may help — without the risks of major surgery.",
    body: "Our interventional specialists offer targeted, image-guided procedures designed specifically for men's health conditions, with fast recovery and discreet care.",
    stats: [
      'Minimally invasive options available for most conditions described',
      'Most patients return to normal activity within days, not weeks',
      'Discreet, outpatient care with same-day discharge',
    ],
  },
}

// ─────────────────────────────────────────────
// WOMEN'S HEALTH
// ─────────────────────────────────────────────
const womensHealth: AssessmentConfig = {
  categoryId: 'womens',
  slug: 'womens',
  title: "Women's Health",
  color: '#4DCCE8',
  questions: [
    {
      id: 'concern',
      text: 'What brings you in today?',
      layout: 'grid-2',
      options: [
        { id: 'fibroids', label: 'Uterine Fibroids' },
        { id: 'pelvic', label: 'Pelvic Pain' },
        { id: 'varicose', label: 'Varicose Veins' },
        { id: 'other', label: 'Other' },
      ],
    },
    {
      id: 'impact',
      text: 'How much are your symptoms affecting your daily life?',
      layout: 'grid-3',
      options: [
        { id: 'mild', label: 'Mildly', sub: 'Manageable' },
        { id: 'moderate', label: 'Moderately', sub: 'Noticeable' },
        { id: 'severe', label: 'Significantly', sub: 'Major impact' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been experiencing these symptoms?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'age',
      text: "What's your age range?",
      layout: 'grid-3',
      options: [
        { id: 'under35', label: 'Under 35' },
        { id: '35to50', label: '35 – 50' },
        { id: 'over50', label: 'Over 50' },
      ],
    },
    {
      id: 'treatments',
      text: 'What have you already tried?',
      layout: 'grid-2',
      options: [
        { id: 'medication', label: 'Hormone therapy / Meds' },
        { id: 'procedure', label: 'A procedure or surgery' },
        { id: 'lifestyle', label: 'Lifestyle changes' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'There Is a Better Way.',
    subhead:
      "Based on your answers, a minimally invasive approach may relieve your symptoms without major surgery.",
    body: "Our specialists offer targeted, uterine-sparing and tissue-preserving procedures with fast recovery times — so you can get back to living your life.",
    stats: [
      '90%+ of fibroid patients avoid hysterectomy with interventional treatment',
      'Most patients return home the same day',
      'Symptom relief typically begins within 2–4 weeks',
    ],
  },
}

// ─────────────────────────────────────────────
// NERVE PAIN
// ─────────────────────────────────────────────
const nervePain: AssessmentConfig = {
  categoryId: 'nerve',
  slug: 'nerve',
  title: 'Nerve Pain',
  color: '#4DCCE8',
  questions: [
    {
      id: 'type',
      text: 'How would you describe your nerve pain?',
      layout: 'grid-2',
      options: [
        { id: 'burning', label: 'Burning or tingling' },
        { id: 'shooting', label: 'Shooting or electric' },
        { id: 'numbness', label: 'Numbness or weakness' },
        { id: 'all', label: 'A mix of the above' },
      ],
    },
    {
      id: 'location',
      text: 'Where do you feel it most?',
      layout: 'grid-2',
      options: [
        { id: 'arm-hand', label: 'Arm / Hand' },
        { id: 'leg-foot', label: 'Leg / Foot' },
        { id: 'torso', label: 'Torso / Ribs' },
        { id: 'face', label: 'Face / Head' },
      ],
    },
    {
      id: 'severity',
      text: 'How severe is your pain on a scale of 0–10?',
      layout: 'grid-3',
      options: [
        { id: 'low', label: '0 – 3', sub: 'Low' },
        { id: 'moderate', label: '4 – 6', sub: 'Moderate' },
        { id: 'severe', label: '7 – 10', sub: 'Severe' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been living with this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What have you tried for relief?',
      layout: 'grid-2',
      options: [
        { id: 'medication', label: 'Nerve medications' },
        { id: 'injections', label: 'Nerve blocks / injections' },
        { id: 'pt', label: 'Physical Therapy' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'Relief May Be Closer Than You Think.',
    subhead:
      "Based on your answers, targeted nerve treatments may significantly reduce your pain — without major surgery.",
    body: "Our pain specialists use image-guided nerve blocks, ablations, and neuromodulation techniques to precisely target the source of chronic nerve pain.",
    stats: [
      'Over 80% of patients with your profile see meaningful relief after treatment',
      'Minimally invasive procedures with same-day recovery',
      'Most patients reduce or eliminate daily pain medication',
    ],
  },
}

// ─────────────────────────────────────────────
// VASCULAR & VEIN
// ─────────────────────────────────────────────
const vascularVein: AssessmentConfig = {
  categoryId: 'vascular',
  slug: 'vascular',
  title: 'Vascular & Vein',
  color: '#4DCCE8',
  questions: [
    {
      id: 'concern',
      text: 'What is your primary vascular concern?',
      layout: 'grid-2',
      options: [
        { id: 'varicose', label: 'Varicose Veins' },
        { id: 'pad', label: 'Leg pain / Poor circulation' },
        { id: 'dvt', label: 'Blood clots / DVT history' },
        { id: 'other', label: 'Other' },
      ],
    },
    {
      id: 'symptoms',
      text: 'Are you experiencing any of the following?',
      layout: 'grid-2',
      multiSelect: true,
      options: [
        { id: 'swelling', label: 'Leg swelling' },
        { id: 'heaviness', label: 'Heaviness or aching' },
        { id: 'skin', label: 'Skin changes or ulcers' },
        { id: 'none', label: 'None of these' },
      ],
    },
    {
      id: 'severity',
      text: 'How much do these symptoms affect your daily life?',
      layout: 'grid-3',
      options: [
        { id: 'mild', label: 'Mildly', sub: 'Manageable' },
        { id: 'moderate', label: 'Moderately', sub: 'Noticeable' },
        { id: 'severe', label: 'Significantly', sub: 'Major impact' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you had these symptoms?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'age',
      text: "What's your age range?",
      layout: 'grid-3',
      options: [
        { id: 'under40', label: 'Under 40' },
        { id: '40to60', label: '40 – 60' },
        { id: 'over60', label: 'Over 60' },
      ],
    },
  ],
  result: {
    headline: 'Good News!',
    subhead:
      "Based on your answers, minimally invasive vascular treatments may effectively address your symptoms.",
    body: "Our interventional radiologists specialize in catheter-based and image-guided vascular procedures — treating the problem at its source with a tiny incision and fast recovery.",
    stats: [
      'Minimally invasive options available for most vascular conditions',
      '95% of patients go home the same day',
      'Most patients see visible improvement within 2–6 weeks',
    ],
  },
}

// ─────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────
export const ASSESSMENT_CONFIGS: AssessmentConfig[] = [
  jointPain,
  backNeck,
  mensHealth,
  womensHealth,
  nervePain,
  vascularVein,
]

export function getAssessmentConfig(slug: string): AssessmentConfig | undefined {
  return ASSESSMENT_CONFIGS.find((c) => c.slug === slug)
}
