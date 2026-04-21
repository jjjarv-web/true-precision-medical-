'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Sun, Sunset } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import DatePicker from '@/components/ui/DatePicker'
import { EASE } from '@/lib/constants'

type Step = 'contact' | 'preference'


const STEPS_INFO = [
  {
    n: '1',
    title: 'Submit your request',
    desc: 'Takes less than 2 minutes.',
  },
  {
    n: '2',
    title: 'We confirm your visit',
    desc: 'A care coordinator contacts you within 48 hours to finalize your appointment.',
  },
  {
    n: '3',
    title: 'Your consultation',
    desc: 'Meet your specialist at one of our premium outpatient centers.',
  },
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
  // NANP: area code and exchange code must start with 2-9.
  if (/^[01]/.test(d)) return false
  if (/^[01]/.test(d.slice(3))) return false
  // Reject all-same-digit numbers.
  if (/^(\d)\1{9}$/.test(d)) return false
  // Reject obvious sequential numbers (ascending or descending).
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
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error1, setError1] = useState('')

  // Step 2
  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [preferredDate, setPreferredDate] = useState('')
  const [timePreference, setTimePreference] = useState<'morning' | 'afternoon' | null>(null)
  const [error2, setError2] = useState('')
  const [assessmentContext, setAssessmentContext] = useState<AssessmentContext | null>(null)

  const phoneValid = isValidUSPhone(phone)
  const phoneError = phoneTouched && phone.length > 0 && !phoneValid
  const canSubmitStep2 = phoneValid && Boolean(preferredDate) && Boolean(timePreference)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (searchParams.get('from') !== 'assessment') {
      setAssessmentContext(null)
      return
    }

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
      if (!phoneValid) {
        setPhoneTouched(true)
        setError2('Please enter a valid U.S. phone number.')
      } else if (!preferredDate) {
        setError2('Please choose a preferred date.')
      } else if (!timePreference) {
        setError2('Please choose a preferred time.')
      }
      return
    }

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(ASSESSMENT_CONTEXT_KEY)
    }

    router.push('/thank-you')
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  }

  return (
    <div className="min-h-screen bg-[#07080C] flex flex-col lg:items-stretch">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:min-h-screen">

      {/* ── Left panel — context ───────────────────────── */}
      <div className="order-2 lg:order-1 lg:w-[44%] flex flex-col justify-between px-8 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-16">
        <div>
          {/* Logo / back */}
          <Link href="/" className="hidden lg:inline-block mb-14 lg:mb-20">
            <Logo
              variant="light"
              width={160}
              height={44}
              className="h-9 w-auto opacity-75"
            />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-5">
              Consultation Request
            </p>
            <h1
              className="font-heading font-bold text-[#EDE6D8] leading-[1.06] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
            >
              Start with a<br /> conversation.
            </h1>
            <p className="text-white/50 text-[15px] leading-relaxed mb-14 max-w-xs">
              A care coordinator will match you with the right specialist and confirm your visit within 48 hours.
            </p>
          </motion.div>

          {/* What happens next */}
          <div className="space-y-6">
            {STEPS_INFO.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-7 h-7 rounded-full border border-white/[0.14] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-mono text-[11px] text-white/35 select-none">{item.n}</span>
                </div>
                <div>
                  <p className="text-[#EDE6D8]/85 text-[14px] font-semibold leading-snug">{item.title}</p>
                  <p className="text-white/35 text-[13px] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {assessmentContext && (
            <div className="mt-8 rounded-2xl border border-white/[0.12] bg-white/[0.03] p-4 max-w-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4DCCE8] mb-2">
                From your assessment
              </p>
              <p className="text-[15px] text-[#EDE6D8] mb-3">
                Booking for <span className="font-semibold">{assessmentContext.categoryTitle}</span>.
              </p>
              {assessmentContext.personalizedSummary.slice(0, 2).map((item) => (
                <p key={item} className="text-[13px] text-white/70 leading-relaxed mb-1 last:mb-0">
                  {item}
                </p>
              ))}
              <details className="mt-3">
                <summary className="text-[12px] text-white/80 cursor-pointer">View your inputs</summary>
                <div className="mt-3 space-y-2">
                  {assessmentContext.responses.map((response) => (
                    <div key={response.questionId} className="text-[12px] text-white/70">
                      <p className="font-semibold text-white/90">{response.question}</p>
                      <p>{response.selected.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
          className="mt-14 pt-7 border-t border-white/[0.07]"
        >
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {TRUST.map((item) => (
              <span key={item} className="text-[11px] text-white/40 font-medium">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right panel — form card ────────────────────── */}
      <div className="order-1 lg:order-2 flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-20 sm:px-10 sm:pt-12 sm:pb-20 lg:px-16 lg:py-16">
        <Link href="/" className="inline-block mb-8 lg:hidden self-start">
          <Logo
            variant="light"
            width={140}
            height={38}
            className="h-8 w-auto opacity-75"
          />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          className="w-full max-w-[440px] rounded-3xl"
          style={{
            background: '#F9F7F4',
            boxShadow:
              '0 4px 8px rgba(0,0,0,0.10), 0 24px 56px rgba(0,0,0,0.30), 0 64px 96px rgba(0,0,0,0.18)',
          }}
        >
          {/* Progress bar */}
          <div className="px-8 pt-8">
            <div className="flex gap-2 mb-8">
              <div className="h-[3px] flex-1 rounded-full bg-[#4DCCE8] transition-all duration-500" />
              <div
                className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
                  step === 'preference' ? 'bg-[#4DCCE8]' : 'bg-black/[0.08]'
                }`}
              />
            </div>
          </div>

          {/* Animated step */}
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
                  transition={{ duration: 0.32, ease: EASE }}
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
                    className="w-full flex items-center justify-center gap-2 bg-[#4DCCE8] text-[#07080C] rounded-xl py-3.5 text-[15px] font-semibold tracking-[-0.01em] hover:opacity-90 active:scale-[0.99] transition-all duration-200"
                    style={{ boxShadow: '0 2px 16px rgba(77,204,232,0.30)' }}
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
                  transition={{ duration: 0.32, ease: EASE }}
                  onSubmit={handleSubmit}
                  className="px-8 pb-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-2">
                    Step 2 of 2
                  </p>
                  <h2 className="font-heading font-bold text-[#1A1814] text-[20px] leading-snug tracking-[-0.03em] mb-4">
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
                          { key: 'morning', label: 'Morning', sub: '8am – 12pm', Icon: Sun },
                          { key: 'afternoon', label: 'Afternoon', sub: '12pm – 5pm', Icon: Sunset },
                        ] as const
                      ).map(({ key, label, sub, Icon }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setTimePreference(key)}
                          className={`flex flex-col items-center gap-2 py-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                              timePreference === key
                              ? 'bg-[#4DCCE8] border-[#4DCCE8] text-[#07080C]'
                              : 'bg-white border-black/[0.08] text-[#4A4440] hover:border-black/[0.16]'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${
                              timePreference === key ? 'text-[#07080C]/70' : 'text-[#9A9490]'
                            }`}
                          />
                          <span>{label}</span>
                          <span
                            className={`text-[11px] font-normal transition-colors duration-200 ${
                              timePreference === key ? 'text-[#07080C]/55' : 'text-[#9A9490]'
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
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 mb-4 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-200 ${
                      canSubmitStep2
                        ? 'bg-[#4DCCE8] text-[#07080C] hover:opacity-90 active:scale-[0.99] cursor-pointer'
                        : 'bg-[#E4DFD9] text-[#9A9490] cursor-not-allowed'
                    }`}
                    style={canSubmitStep2 ? { boxShadow: '0 2px 16px rgba(77,204,232,0.30)' } : undefined}
                  >
                    Submit Request
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      </div>
    </div>
  )
}
