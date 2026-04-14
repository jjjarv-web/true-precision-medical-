'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ArrowLeft, Sun, Sunset } from 'lucide-react'

type Step = 'contact' | 'preference'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STEPS_INFO = [
  {
    n: '1',
    title: 'Submit your request',
    desc: 'Takes less than 5 minutes.',
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
  'w-full bg-white border border-black/[0.08] rounded-xl px-4 py-3 text-[15px] text-[#1A1814] placeholder:text-[#C4BEBB] outline-none focus:border-[#4DCCE8]/60 focus:ring-2 focus:ring-[#4DCCE8]/15 transition-all duration-200'

const LABEL = 'block text-[12px] font-semibold text-[#4A4440] mb-1.5'

export default function BookingClient() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('contact')
  const [direction, setDirection] = useState<1 | -1>(1)

  // Step 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error1, setError1] = useState('')

  // Step 2
  const [phone, setPhone] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [timePreference, setTimePreference] = useState<'morning' | 'afternoon' | null>(null)
  const [error2, setError2] = useState('')

  const today = new Date().toISOString().split('T')[0]

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

  function handleBack() {
    setDirection(-1)
    setStep('contact')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError2('')
    if (!phone.trim() || !preferredDate || !timePreference) {
      setError2('Please complete all fields.')
      return
    }
    router.push('/thank-you')
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  }

  return (
    <div className="min-h-screen bg-[#07080C] flex flex-col lg:flex-row">

      {/* ── Left panel — context ───────────────────────── */}
      <div className="lg:w-[44%] flex flex-col justify-between px-8 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-16 lg:min-h-screen">
        <div>
          {/* Logo / back */}
          <Link href="/" className="inline-block mb-14 lg:mb-20">
            <Image
              src="/logo/true-precision-medical-logo.svg"
              alt="True Precision Medical"
              width={160}
              height={44}
              className="h-9 w-auto brightness-0 invert opacity-75"
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
              <span key={item} className="text-[11px] text-white/25 font-medium">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right panel — form card ────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
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
              <div className="h-[3px] flex-1 rounded-full bg-[#1A1814] transition-all duration-500" />
              <div
                className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
                  step === 'preference' ? 'bg-[#1A1814]' : 'bg-black/[0.08]'
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
                    className="w-full flex items-center justify-center gap-2 bg-[#1A1814] text-[#EDE6D8] rounded-xl py-3.5 text-[15px] font-semibold tracking-[-0.01em] hover:bg-[#2a2520] active:scale-[0.99] transition-all duration-200"
                    style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.20)' }}
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
                  <h2 className="font-heading font-bold text-[#1A1814] text-[20px] leading-snug tracking-[-0.03em] mb-7">
                    When works for you?
                  </h2>

                  <div className="mb-4">
                    <label className={LABEL}>Phone number</label>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(602) 555-0100"
                      className={INPUT}
                    />
                  </div>

                  <div className="mb-5">
                    <label className={LABEL}>Preferred date</label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      min={today}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={INPUT}
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
                              ? 'bg-[#1A1814] border-[#1A1814] text-[#EDE6D8]'
                              : 'bg-white border-black/[0.08] text-[#4A4440] hover:border-black/[0.16]'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${
                              timePreference === key ? 'text-[#4DCCE8]' : 'text-[#9A9490]'
                            }`}
                          />
                          <span>{label}</span>
                          <span
                            className={`text-[11px] font-normal transition-colors duration-200 ${
                              timePreference === key ? 'text-[#EDE6D8]/50' : 'text-[#9A9490]'
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
                    className="w-full flex items-center justify-center gap-2 bg-[#1A1814] text-[#EDE6D8] rounded-xl py-3.5 text-[15px] font-semibold tracking-[-0.01em] hover:bg-[#2a2520] active:scale-[0.99] transition-all duration-200"
                    style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.20)' }}
                  >
                    Submit Request
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full flex items-center justify-center gap-1.5 mt-3 py-2 text-[13px] text-[#9A9490] hover:text-[#4A4440] transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
