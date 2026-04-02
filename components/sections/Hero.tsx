'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { CONSULTATION_SPECIALTIES } from '@/lib/constants'

// H1 split into 3 visual lines for centered stacked layout
const H1_LINES = [
  ["Arizona's", 'Premier'],
  ['Minimally', 'Invasive'],
  ['Surgery', 'Centers.'],
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const wordVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  },
})

const STAR_PATH =
  'M6 0.5l1.237 3.809H11.4L8.09 6.586l1.237 3.809L6 8.138l-3.326 2.257L3.91 6.586.6 4.309h4.163z'

function GoogleStars() {
  return (
    <svg width="74" height="11" viewBox="0 0 74 11" fill="none" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${i * 15}, 0)`}>
          <path d={STAR_PATH} fill="#FBBC05" />
        </g>
      ))}
    </svg>
  )
}

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Hero() {
  const [selected, setSelected] = useState<string | null>(null)

  const totalWords = H1_LINES.flat().length
  const bodyDelay  = totalWords * 0.06 + 0.25
  const trustDelay = bodyDelay + 0.18
  const selectorDelay = trustDelay + 0.18

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Ambient glows — barely-there depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 75% 5%, rgba(74,144,212,0.08) 0%, transparent 60%)' }}
      />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 15% 95%, rgba(91,183,166,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-44 text-center">

        {/* H1 — 3 stacked lines, word-by-word blur-fade */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="font-heading font-extrabold leading-[1.04] tracking-tight text-brand-ink text-[clamp(46px,7.5vw,92px)] mb-8"
        >
          {H1_LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word) => (
                <motion.span
                  key={`${li}-${word}`}
                  variants={wordVariants}
                  className={`inline-block mr-[0.2em] last:mr-0 ${word === 'Premier' ? 'gradient-text' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Body copy */}
        <motion.p
          variants={fadeUp(bodyDelay)}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-brand-ink-secondary leading-relaxed max-w-xl mx-auto mb-7"
        >
          Explore alternatives to major surgery with board-certified specialists
          in orthopedics, neurosurgery, and interventional radiology.
        </motion.p>

        {/* Google trust signal */}
        <motion.div
          variants={fadeUp(trustDelay)}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-2.5 mb-20"
        >
          <GoogleLogo />
          <GoogleStars />
          <span className="text-sm font-semibold text-brand-ink">4.9</span>
          <span className="text-brand-muted-light text-sm select-none">·</span>
          <span className="text-sm text-brand-muted">340+ reviews on Google</span>
        </motion.div>

        {/* ── Interactive Consultation Selector ─────────── */}
        <motion.div
          variants={fadeUp(selectorDelay)}
          initial="hidden"
          animate="visible"
        >

          {/* The question — subheadline weight */}
          <p className="font-heading font-bold text-brand-ink mb-8 text-[clamp(22px,3vw,36px)] leading-snug">
            What&apos;s bringing you in?
          </p>

          {/* Specialty tiles — large pill chips, flex-wrap centered */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-12">
            {CONSULTATION_SPECIALTIES.map((spec) => {
              const isSelected = selected === spec.id
              const isDimmed   = selected !== null && !isSelected
              return (
                <motion.button
                  key={spec.id}
                  onClick={() => setSelected(isSelected ? null : spec.id)}
                  animate={{
                    backgroundColor: isSelected ? '#1E3A5F' : '#ffffff',
                    borderColor:     isSelected ? '#1E3A5F' : 'rgba(30,58,95,0.13)',
                    opacity:         isDimmed ? 0.3 : 1,
                    scale:           isDimmed ? 0.94 : 1,
                    filter:          isDimmed ? 'blur(0.4px)' : 'blur(0px)',
                  }}
                  whileHover={{
                    y: isSelected ? 0 : -3,
                    scale: isDimmed ? 0.94 : isSelected ? 1 : 1.03,
                    borderColor: isSelected ? '#1E3A5F' : 'rgba(74,144,212,0.55)',
                    boxShadow:   isSelected
                      ? '0 8px 28px rgba(30,58,95,0.28)'
                      : '0 8px 22px rgba(30,58,95,0.11)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="px-7 py-4 rounded-2xl border-[1.5px] text-base font-semibold
                             cursor-pointer outline-none focus-visible:ring-2
                             focus-visible:ring-brand-sky select-none"
                >
                  <motion.span
                    animate={{ color: isSelected ? '#ffffff' : '#0D1B3E' }}
                    transition={{ duration: 0.16 }}
                  >
                    {spec.label}
                  </motion.span>
                </motion.button>
              )
            })}
          </div>

          {/* CTA — completely different idle vs active states */}
          <div className="min-h-[80px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, y: 28, scale: 0.90 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={{    opacity: 0, y: 16,  scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.a
                    href="#"
                    whileHover={{ y: -2, boxShadow: '0 14px 44px rgba(74,144,212,0.52)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="inline-flex items-center gap-2.5 bg-brand-primary text-white
                               px-8 py-4 rounded-2xl text-base font-semibold"
                    style={{ boxShadow: '0 6px 30px rgba(74,144,212,0.40)' }}
                  >
                    Start Your Free Virtual Consultation
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <p className="text-xs text-brand-muted tracking-wide">
                    No referral needed&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Takes less than 5 minutes
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{    opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-brand-muted-light"
                >
                  Select a condition above to get started
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
