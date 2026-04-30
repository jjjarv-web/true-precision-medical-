'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Sun, Sunset, CheckCircle2 } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import DatePicker from '@/components/ui/DatePicker'
import { EASE } from '@/lib/constants'

type Step = 'contact' | 'preference'

const STEPS_INFO = [
  { n: '1', title: 'Submit your request',    desc: 'Takes less than 2 minutes.' },
  { n: '2', title: 'We confirm your visit',  desc: 'A care coordinator contacts you within 48 hours.' },
  { n: '3', title: 'Your consultation',      desc: 'Meet your specialist at one of our outpatient centers.' },
]

const TRUST = ['Board-Certified Specialists', 'AAAHC Accredited Centers', 'Same-Day Discharge']

const INPUT =
  'w-full min-w-0 bg-white border border-black/[0.08] rounded-xl px-4 py-3 text-[15px] text-[#1A1814] placeholder:text-[#C4BEBB] outline-none focus:border-[#4DCCE8]/60 focus:ring-2 focus:ring-[#4DCCE8]/10 transition-all duration-200'

const LABEL = 'block text-[12px] font-semibold text-[#4A4440] mb-1.5'

const ASSESSMENT_CONTEXT_KEY = 'assessmentBookingContext'

function digitsOnly(value: string): string {
  return value.replace(/\D+/g, '')
}

function formatPhoneAsTyped(raw: string): string {
  const d = digitsOnly(raw).slice(0, 10)
  if (d.length === 0) return ''
  if (d.length < 4) return `(${d}`
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

function isValidUSPhone(raw: string): boolean {
  const d = digitsOnly(raw)
  if (d.length !== 10) return false
  if (/^[01]/.test(d)) return false
  if (/^[01]/.test(d.slice(3))) return false
  if (/^(\d)\1{9}$/.test(d)) return false
  if (d === '1234567890' || d === '0123456789' || d === '9876543210') return false
  return true
}

type AssessmentContext = {
  source: 'assessment'
  categorySlug: string
  categoryTitle: string
  responses: {
    questionId: string
    question: string
    selected: string[]
  }[]
  personalizedSummary: string[]
}

export default function BookingClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('contact')
  const [direction, setDirection] = useState<1 | -1>(1)

  // Step 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [error1, setError1]       = useState('')

  // Step 2
  const [phone, setPhone]                   = useState('')
  const [phoneTouched, setPhoneTouched]     = useState(false)
  const [preferredDate, setPreferredDate]   = useState('')
  const [timePreference, setTimePreference] = useState<'morning' | 'afternoon' | null>(null)
  const [error2, setError2]                 = useState('')
  const [assessmentContext, setAssessmentContext] = useState<AssessmentContext | null>(null)

  const phoneValid    = isValidUSPhone(phone)
  const phoneError    = phoneTouched && phone.length > 0 && !phoneValid
  const canSubmitStep2 = phoneValid && Boolean(preferredDate) && Boolean(timePreference)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (searchParams.get('from') !== 'assessment') { setAssessmentContext(null); return }
    const rawContext = window.sessionStorage.getItem(ASSESSMENT_CONTEXT_KEY)
    if (!rawContext) return
    try {
      const parsed = JSON.parse(rawContext) as AssessmentContext
      if (parsed.source === 'assessment') setAssessmentContext(parsed)
    } catch {
      setAssessmentContext(null)
    }
  }, [searchParams])

  function handleStep1(e: FormEvent) {
    e.preventDefault()
    setError1('')
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError1('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError1('Please enter a valid email address.')
      return
    }
    setDirection(1)
    setStep('preference')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError2('')
    if (!canSubmitStep2) {
      if (!phoneValid)      { setPhoneTouched(true); setError2('Please enter a valid U.S. phone number.') }
      else if (!preferredDate)   setError2('Please choose a preferred date.')
      else if (!timePreference)  setError2('Please choose a preferred time.')
      return
    }
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(ASSESSMENT_CONTEXT_KEY)
    router.push('/thank-you')
  }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ?  24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -24 :  24 }),
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #FDFCFA 0%, #F9F7F4 100%)' }}
    >
      {/* ── Nav bar ───────────────────────────────────────────── */}
      <div className="w-full px-6 pt-7 pb-0 flex items-center justify-center">
        <Link href="/">
          <Logo variant="dark" width={148} height={40} className="h-8 w-auto opacity-80" />
        </Link>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">

        {/* Assessment context banner */}
        {assessmentContext && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full max-w-[520px] mb-5 rounded-2xl border border-black/[0.07] bg-white/70 backdrop-blur-sm px-5 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4DCCE8] mb-1.5">
              From your assessment
            </p>
            <p className="text-[14px] text-[#1A1814] font-medium mb-2">
              Booking for <span className="font-semibold">{assessmentContext.categoryTitle}</span>
            </p>
            {assessmentContext.personalizedSummary.slice(0, 1).map((item) => (
              <p key={item} className="text-[13px] text-[#4A4440] leading-relaxed">{item}</p>
            ))}
          </motion.div>
        )}

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A9490] mb-3">
            Consultation Request
          </p>
          <h1
            className="font-heading font-semibold text-[#0E0E0E] leading-[1.06] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
          >
            Start with a <span style={{ color: '#B8AA82' }}>conversation.</span>
          </h1>
          <p className="mt-3 text-[#4A4440] text-[15px] leading-relaxed">
            A care coordinator confirms your visit within 48 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="w-full max-w-[520px] rounded-3xl overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.05)',
          }}
        >
          {/* Progress bar */}
          <div className="px-8 pt-8 pb-0">
            <div className="flex gap-2 mb-7">
              <div className="h-[3px] flex-1 rounded-full bg-[#4DCCE8] transition-all duration-500" />
              <div
                className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
                  step === 'preference' ? 'bg-[#4DCCE8]' : 'bg-black/[0.08]'
                }`}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 'contact' ? (
                <motion.form
                  key="contact"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: EASE }}
                  onSubmit={handleStep1}
                  className="px-8 pb-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-2">
                    Step 1 of 2
                  </p>
                  <h2 className="font-heading font-bold text-[#1A1814] text-[20px] leading-snug tracking-[-0.03em] mb-7">
                    Let&apos;s start with your details.
                  </h2>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className={LABEL}>First name</label>
                      <input
                        type="text"
                        required
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Last name</label>
                      <input
                        type="text"
                        required
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Smith"
                        className={INPUT}
                      />
                    </div>
                  </div>

                  <div className="mb-7">
                    <label className={LABEL}>Email address</label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className={INPUT}
                    />
                  </div>

                  {error1 && (
                    <p className="text-red-500 text-[13px] mb-4 -mt-3">{error1}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-200 hover:bg-[#2a2520] active:scale-[0.99]"
                    style={{
                      backgroundColor: '#1A1814',
                      color: '#EDE6D8',
                      boxShadow: '0 2px 12px rgba(26,24,20,0.14)',
                    }}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[12px] text-[#C4BEBB] mt-4 leading-snug">
                    Your information is used only to coordinate your consultation.
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="preference"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: EASE }}
                  onSubmit={handleSubmit}
                  className="px-8 pb-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-2">
                    Step 2 of 2
                  </p>
                  <h2 className="font-heading font-bold text-[#1A1814] text-[20px] leading-snug tracking-[-0.03em] mb-6">
                    When works for you?
                  </h2>

                  <div className="mb-4">
                    <label className={LABEL}>Phone number</label>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={14}
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneAsTyped(e.target.value))}
                      onBlur={() => setPhoneTouched(true)}
                      placeholder="(602) 555-0100"
                      aria-invalid={phoneError || undefined}
                      className={`${INPUT} ${
                        phoneError ? 'border-red-400/70 focus:border-red-400/70 focus:ring-red-400/10' : ''
                      }`}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-[12px] mt-1.5">
                        Please enter a valid 10-digit U.S. phone number.
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <label className={LABEL}>Preferred date</label>
                    <DatePicker
                      value={preferredDate}
                      onChange={setPreferredDate}
                      minDate={today}
                      placeholder="Select a date"
                    />
                  </div>

                  <div className="mb-7">
                    <label className={LABEL}>Preferred time</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(
                        [
                          { key: 'morning',   label: 'Morning',   sub: '8am – 12pm',  Icon: Sun    },
                          { key: 'afternoon', label: 'Afternoon', sub: '12pm – 5pm',  Icon: Sunset },
                        ] as const
                      ).map(({ key, label, sub, Icon }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setTimePreference(key)}
                          className={`flex flex-col items-center gap-2 py-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                            timePreference === key
                              ? 'bg-[#1A1814] border-[#1A1814] text-[#EDE6D8]'
                              : 'bg-white border-black/[0.08] text-[#4A4440] hover:border-black/[0.16]'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${
                              timePreference === key ? 'text-[#EDE6D8]/70' : 'text-[#9A9490]'
                            }`}
                          />
                          <span>{label}</span>
                          <span
                            className={`text-[11px] font-normal transition-colors duration-200 ${
                              timePreference === key ? 'text-[#EDE6D8]/55' : 'text-[#9A9490]'
                            }`}
                          >
                            {sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {error2 && (
                    <p className="text-red-500 text-[13px] mb-4 -mt-3">{error2}</p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmitStep2}
                    aria-disabled={!canSubmitStep2}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 mb-1 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-200 ${
                      canSubmitStep2
                        ? 'hover:bg-[#2a2520] active:scale-[0.99] cursor-pointer'
                        : 'cursor-not-allowed opacity-40'
                    }`}
                    style={canSubmitStep2 ? {
                      backgroundColor: '#1A1814',
                      color: '#EDE6D8',
                      boxShadow: '0 2px 12px rgba(26,24,20,0.14)',
                    } : {
                      backgroundColor: '#1A1814',
                      color: '#EDE6D8',
                    }}
                  >
                    Submit Request
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setDirection(-1); setStep('contact') }}
                    className="w-full text-center text-[13px] text-[#9A9490] mt-3 hover:text-[#4A4440] transition-colors duration-200"
                  >
                    ← Back
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* What happens next — 3-step strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="w-full max-w-[520px] mt-6"
        >
          <div className="grid grid-cols-3 gap-3">
            {STEPS_INFO.map((item, i) => (
              <div
                key={item.n}
                className="flex flex-col gap-2 rounded-2xl border border-black/[0.07] bg-white/50 px-4 py-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-black/[0.10] flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                  >
                    <span className="font-mono text-[10px] text-[#1A1814]/35 select-none leading-none">{item.n}</span>
                  </span>
                  {i < (step === 'contact' ? 0 : 1) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4DCCE8]" />
                  )}
                </div>
                <p className="text-[13px] font-semibold text-[#1A1814] leading-snug">{item.title}</p>
                <p className="text-[11.5px] text-[#9A9490] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1.5 mt-6">
            {TRUST.map((item, i) => (
              <span key={item} className="flex items-center gap-1.5 text-[11px] text-[#9A9490] font-medium">
                {i !== 0 && <span className="w-[3px] h-[3px] rounded-full bg-black/20 inline-block" />}
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
