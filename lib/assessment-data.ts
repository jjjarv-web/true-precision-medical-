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
// KNEE PAIN  (dedicated — user already told us the joint)
// ─────────────────────────────────────────────
const kneePain: AssessmentConfig = {
  categoryId: 'knee',
  slug: 'knee',
  title: 'Knee Pain',
  color: '#4DCCE8',
  questions: [
    {
      id: 'character',
      text: 'How would you describe your knee pain?',
      layout: 'grid-2',
      options: [
        { id: 'aching', label: 'Aching or constant' },
        { id: 'sharp', label: 'Sharp when moving' },
        { id: 'swelling', label: 'Swelling or stiffness' },
        { id: 'all', label: 'Mix of the above' },
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
      id: 'trigger',
      text: 'When is your knee pain worst?',
      layout: 'grid-2',
      options: [
        { id: 'activity', label: 'Walking or standing' },
        { id: 'stairs', label: 'Going up or down stairs' },
        { id: 'rest', label: 'Even at rest' },
        { id: 'all', label: 'Throughout the day' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been dealing with this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What treatments have you already tried?',
      layout: 'grid-icon-5',
      multiSelect: true,
      options: [
        { id: 'medication', label: 'Medication', icon: 'pill' },
        { id: 'injections', label: 'Injections', icon: 'injection' },
        { id: 'pt', label: 'Physical Therapy', icon: 'therapy' },
        { id: 'surgery', label: 'Surgery consult', icon: 'surgery' },
        { id: 'none', label: 'None yet', icon: 'none' },
      ],
    },
  ],
  result: {
    headline: 'Great News!',
    subhead:
      'Based on your answers, you may be an excellent candidate for minimally invasive knee care — without replacement surgery.',
    body: 'Our specialists use genicular artery embolization and peripheral nerve stimulation to reduce knee pain at its source, with same-day discharge and a fast recovery.',
    stats: [
      '90% of patients with your profile experience significant pain relief',
      'No hospital stay — outpatient procedure, home the same day',
      '4 out of 5 patients experience relief lasting 2+ years',
    ],
  },
}

// ─────────────────────────────────────────────
// SHOULDER PAIN
// ─────────────────────────────────────────────
const shoulderPain: AssessmentConfig = {
  categoryId: 'shoulder',
  slug: 'shoulder',
  title: 'Shoulder Pain',
  color: '#4DCCE8',
  questions: [
    {
      id: 'character',
      text: 'How would you describe your shoulder pain?',
      layout: 'grid-2',
      options: [
        { id: 'aching', label: 'Aching or stiff' },
        { id: 'sharp', label: 'Sharp when reaching' },
        { id: 'radiating', label: 'Burning down my arm' },
        { id: 'rest', label: 'Hurts even at rest' },
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
      id: 'motion',
      text: 'How does it affect your range of motion?',
      layout: 'grid-3',
      options: [
        { id: 'mild', label: 'Mild limitation', sub: 'Some stiffness' },
        { id: 'moderate', label: 'Avoid overhead', sub: 'Noticeable' },
        { id: 'severe', label: "Can't raise arm", sub: 'Significant' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been dealing with this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What treatments have you already tried?',
      layout: 'grid-icon-5',
      multiSelect: true,
      options: [
        { id: 'medication', label: 'Medication', icon: 'pill' },
        { id: 'injections', label: 'Injections', icon: 'injection' },
        { id: 'pt', label: 'Physical Therapy', icon: 'therapy' },
        { id: 'surgery', label: 'Surgery consult', icon: 'surgery' },
        { id: 'none', label: 'None yet', icon: 'none' },
      ],
    },
  ],
  result: {
    headline: 'Relief Without Surgery Is Possible.',
    subhead:
      'Based on your answers, image-guided shoulder treatments may significantly reduce your pain without open surgery.',
    body: 'Our specialists use embolization and nerve stimulation techniques to target chronic shoulder inflammation and pain directly — preserving your joint with a same-day outpatient procedure.',
    stats: [
      'Most patients with your profile avoid shoulder surgery entirely',
      'Outpatient procedure — home the same day',
      'Meaningful relief typically within 2–4 weeks',
    ],
  },
}

// ─────────────────────────────────────────────
// WRIST PAIN
// ─────────────────────────────────────────────
const wristPain: AssessmentConfig = {
  categoryId: 'wrist',
  slug: 'wrist',
  title: 'Wrist Pain',
  color: '#4DCCE8',
  questions: [
    {
      id: 'character',
      text: 'How would you describe your wrist pain?',
      layout: 'grid-2',
      options: [
        { id: 'aching', label: 'Aching or stiff' },
        { id: 'sharp', label: 'Sharp or stabbing' },
        { id: 'burning', label: 'Burning or tingling' },
        { id: 'swelling', label: 'Swelling or tenderness' },
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
      id: 'grip',
      text: 'Does it affect your grip strength or fine motor control?',
      layout: 'grid-3',
      options: [
        { id: 'yes', label: 'Yes, noticeably' },
        { id: 'somewhat', label: 'Somewhat' },
        { id: 'no', label: 'Not really' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you had this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What have you already tried?',
      layout: 'grid-2',
      options: [
        { id: 'bracing', label: 'Brace or splint' },
        { id: 'injections', label: 'Cortisone injection' },
        { id: 'pt', label: 'Physical Therapy' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'Minimally Invasive Options Are Available.',
    subhead:
      'Based on your answers, targeted wrist treatments may give you lasting relief without the recovery of open surgery.',
    body: 'Our specialists use image-guided embolization for chronic wrist tendinopathy and pain — a same-day outpatient procedure with minimal downtime.',
    stats: [
      'Outpatient procedure — no hospital stay required',
      'Most patients return to daily activity within days',
      'High success rate for chronic tendinopathy and wrist pain',
    ],
  },
}

// ─────────────────────────────────────────────
// FOOT PAIN  (plantar fascia / heel)
// ─────────────────────────────────────────────
const footPain: AssessmentConfig = {
  categoryId: 'foot',
  slug: 'foot',
  title: 'Foot Pain',
  color: '#4DCCE8',
  questions: [
    {
      id: 'location',
      text: 'Where in your foot do you feel the pain most?',
      layout: 'grid-2',
      options: [
        { id: 'heel', label: 'Heel or bottom of foot' },
        { id: 'ball', label: 'Ball of foot' },
        { id: 'top', label: 'Top of foot' },
        { id: 'ankle', label: 'Ankle area' },
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
      id: 'timing',
      text: 'When is it worst?',
      layout: 'grid-2',
      options: [
        { id: 'morning', label: 'First steps in the morning' },
        { id: 'standing', label: 'After prolonged standing' },
        { id: 'activity', label: 'During activity' },
        { id: 'constant', label: 'All the time' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been dealing with this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What have you already tried?',
      layout: 'grid-2',
      options: [
        { id: 'orthotics', label: 'Orthotics or insoles' },
        { id: 'injections', label: 'Cortisone injection' },
        { id: 'pt', label: 'PT or stretching' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'You May Have More Options Than You Think.',
    subhead:
      'Based on your answers, minimally invasive treatment may resolve your foot or heel pain without surgery.',
    body: 'Our specialists offer embolization therapy for plantar fasciitis and chronic heel pain that hasn\'t responded to conservative care — outpatient, same-day discharge.',
    stats: [
      'High success rate for plantar fasciitis not responding to injections or PT',
      'Same-day discharge — no hospital stay',
      'Patients typically return to walking within days',
    ],
  },
}

// ─────────────────────────────────────────────
// NEUROPATHY  (peripheral nerve, hands/feet)
// ─────────────────────────────────────────────
const neuropathy: AssessmentConfig = {
  categoryId: 'neuropathy',
  slug: 'neuropathy',
  title: 'Neuropathy',
  color: '#4DCCE8',
  questions: [
    {
      id: 'location',
      text: 'Where do you experience your symptoms most?',
      layout: 'grid-2',
      options: [
        { id: 'feet', label: 'Feet or toes' },
        { id: 'hands', label: 'Hands or fingers' },
        { id: 'both', label: 'Both hands and feet' },
        { id: 'legs', label: 'Legs or arms' },
      ],
    },
    {
      id: 'character',
      text: 'How would you describe the sensation?',
      layout: 'grid-2',
      options: [
        { id: 'burning', label: 'Burning or tingling' },
        { id: 'numbness', label: 'Numbness or weakness' },
        { id: 'shooting', label: 'Shooting or electric' },
        { id: 'all', label: 'A mix of all of these' },
      ],
    },
    {
      id: 'severity',
      text: 'How severe are your symptoms on a scale of 0–10?',
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
      id: 'cause',
      text: 'Do you know what\'s causing your neuropathy?',
      layout: 'grid-2',
      options: [
        { id: 'diabetic', label: 'Diabetic neuropathy' },
        { id: 'chemo', label: 'Chemotherapy-related' },
        { id: 'unknown', label: 'Unknown cause' },
        { id: 'other', label: 'Other / not sure' },
      ],
    },
  ],
  result: {
    headline: 'Relief May Be Closer Than You Think.',
    subhead:
      'Based on your answers, peripheral nerve stimulation may significantly reduce your neuropathy symptoms.',
    body: 'Our pain specialists use image-guided nerve stimulation to target the source of chronic nerve pain — reducing or eliminating symptoms without major surgery or heavy medication.',
    stats: [
      'Over 80% of patients see meaningful symptom reduction',
      'Minimally invasive — same-day outpatient procedure',
      'Most patients reduce or eliminate daily pain medication',
    ],
  },
}

// ─────────────────────────────────────────────
// HEADACHE & NEURALGIA
// ─────────────────────────────────────────────
const neuralgia: AssessmentConfig = {
  categoryId: 'neuralgia',
  slug: 'neuralgia',
  title: 'Headache & Neuralgia',
  color: '#4DCCE8',
  questions: [
    {
      id: 'character',
      text: 'How would you describe your head or nerve pain?',
      layout: 'grid-2',
      options: [
        { id: 'occipital', label: 'Back-of-head or neck pain' },
        { id: 'facial', label: 'Facial or jaw pain' },
        { id: 'scalp', label: 'Stabbing or electric in scalp' },
        { id: 'constant', label: 'Constant daily headaches' },
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
      id: 'frequency',
      text: 'How often do you experience this?',
      layout: 'grid-2',
      options: [
        { id: 'few', label: 'A few times a week' },
        { id: 'daily', label: 'Daily' },
        { id: 'constant', label: 'Nearly constant' },
        { id: 'episodic', label: 'Unpredictable episodes' },
      ],
    },
    {
      id: 'duration',
      text: 'How long have you been dealing with this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'treatments',
      text: 'What have you already tried?',
      layout: 'grid-2',
      options: [
        { id: 'medication', label: 'Medications or triptans' },
        { id: 'nerve-block', label: 'Nerve blocks' },
        { id: 'botox', label: 'Botox injections' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'There Are Targeted Options For You.',
    subhead:
      'Based on your answers, occipital nerve stimulation or targeted nerve blocks may provide lasting relief.',
    body: 'Our specialists treat chronic headaches and neuralgia with minimally invasive techniques — occipital nerve stimulation, targeted nerve blocks, and image-guided ablation — addressing the source rather than masking symptoms.',
    stats: [
      'Most patients with treatment-resistant headaches see improvement',
      'Outpatient procedure — no hospital stay required',
      'Relief often begins within 1–2 weeks of treatment',
    ],
  },
}

// ─────────────────────────────────────────────
// UTERINE FIBROIDS  (dedicated — user selected from treatment menu)
// ─────────────────────────────────────────────
const uterineFibroids: AssessmentConfig = {
  categoryId: 'fibroids',
  slug: 'fibroids',
  title: 'Uterine Fibroids',
  color: '#4DCCE8',
  questions: [
    {
      id: 'symptoms',
      text: 'Which symptoms are affecting you most?',
      layout: 'grid-2',
      multiSelect: true,
      options: [
        { id: 'bleeding', label: 'Heavy or prolonged periods' },
        { id: 'pressure', label: 'Pelvic pressure or fullness' },
        { id: 'urination', label: 'Frequent urination' },
        { id: 'pain', label: 'Pelvic or back pain' },
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
      text: 'How long have you been experiencing this?',
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
        { id: 'medication', label: 'Hormonal therapy or meds' },
        { id: 'birthcontrol', label: 'Birth control' },
        { id: 'procedure', label: 'A procedure or surgery' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'There Is a Better Way.',
    subhead:
      'Based on your answers, uterine fibroid embolization (UFE) may eliminate your symptoms without a hysterectomy.',
    body: 'UFE is a uterus-preserving, outpatient procedure that cuts off blood flow to fibroids — shrinking them and relieving symptoms with a significantly shorter recovery than surgery.',
    stats: [
      '90%+ of fibroid patients avoid hysterectomy with UFE',
      'Outpatient procedure — home the same day',
      'Symptom relief typically begins within 2–4 weeks',
    ],
  },
}

const peripheralArterialDisease: AssessmentConfig = {
  categoryId: 'pad',
  slug: 'pad',
  title: 'Peripheral Arterial Disease',
  color: '#4DCCE8',
  questions: [
    {
      id: 'symptoms',
      text: 'Which symptoms are you experiencing?',
      layout: 'grid-2',
      multiSelect: true,
      options: [
        { id: 'cramping', label: 'Leg cramping or pain when walking' },
        { id: 'rest-pain', label: 'Foot or leg pain at rest' },
        { id: 'wounds', label: 'Non-healing wounds or sores' },
        { id: 'coldness', label: 'Coldness or numbness in legs or feet' },
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
      text: 'How long have you been experiencing this?',
      layout: 'grid-3',
      options: [
        { id: 'short', label: '< 6 months' },
        { id: 'medium', label: '6 – 12 months' },
        { id: 'long', label: '1+ year' },
      ],
    },
    {
      id: 'radiating',
      text: 'Does the pain or discomfort travel down your leg or into your foot?',
      layout: 'grid-3',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'sometimes', label: 'Sometimes' },
        { id: 'no', label: 'No' },
      ],
    },
    {
      id: 'treatments',
      text: 'What treatments have you already tried?',
      layout: 'grid-2',
      multiSelect: true,
      options: [
        { id: 'medication', label: 'Blood thinners or medication' },
        { id: 'lifestyle', label: 'Exercise or lifestyle changes' },
        { id: 'surgery', label: 'Prior surgery or procedure' },
        { id: 'none', label: 'Nothing yet' },
      ],
    },
  ],
  result: {
    headline: 'Minimally Invasive Care Is Available.',
    subhead:
      'Based on your answers, endovascular treatment may restore blood flow and relieve your symptoms — without open bypass surgery.',
    body: 'Our interventional specialists use angioplasty, stenting, and atherectomy to open blocked arteries through a pinhole access point. Most patients go home the same day with significantly improved circulation.',
    stats: [
      'Performed through an access point smaller than a pencil tip',
      'Same-day or next-morning discharge',
      'Most patients notice improved circulation within days',
    ],
  },
}

// ─────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────
export const ASSESSMENT_CONFIGS: AssessmentConfig[] = [
  // Condition-specific (primary entry points from landing page)
  kneePain,
  shoulderPain,
  wristPain,
  footPain,
  backNeck,
  neuropathy,
  neuralgia,
  uterineFibroids,
  peripheralArterialDisease,
  // Broader category flows (kept for backward compatibility)
  jointPain,
  mensHealth,
  womensHealth,
  nervePain,
  vascularVein,
]

export function getAssessmentConfig(slug: string): AssessmentConfig | undefined {
  return ASSESSMENT_CONFIGS.find((c) => c.slug === slug)
}
