'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ShieldCheck, Building2, UserCheck, Zap } from 'lucide-react'

const STATS = [
  { value: '15,000+', label: 'Procedures Performed' },
  { value: '4.9★',    label: 'Average Patient Rating' },
  { value: '12',      label: 'Arizona Locations' },
  { value: '0',       label: 'Hospital Stays Required' },
]

const CREDENTIALS = [
  {
    icon: UserCheck,
    title: 'Board-Certified & Fellowship-Trained',
    body:
      'Every specialist holds board certification in their discipline — orthopedic surgery, neurosurgery, or interventional radiology — and completes advanced fellowship training before joining our team.',
  },
  {
    icon: Building2,
    title: 'AAAHC Accredited Surgical Centers',
    body:
      'Our outpatient surgical centers meet the rigorous standards set by the Accreditation Association for Ambulatory Health Care — the same standard required for hospital-based procedures.',
  },
  {
    icon: Zap,
    title: 'No Hospital. No Overnight Stay.',
    body:
      'Every procedure is performed in our premium outpatient centers. You go home the same day and recover in your own bed — not a hospital room.',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function TrustCredentials() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Why Patients Trust Us
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-brand-ink text-[clamp(30px,4.5vw,54px)] leading-tight">
            Credentials that matter<br className="hidden sm:block" /> to the people who matter.
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-primary/8 rounded-2xl overflow-hidden mb-20 shadow-[0_2px_40px_rgba(30,58,95,0.07)]"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
              className="bg-white px-8 py-10 text-center"
            >
              <p className="font-heading font-extrabold text-brand-ink text-[clamp(32px,4vw,48px)] leading-none mb-2">
                {stat.value === '0' ? (
                  <span className="gradient-text">Zero</span>
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-sm text-brand-muted leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Credential blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CREDENTIALS.map((cred, i) => {
            const Icon = cred.icon
            return (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * 0.09 }}
                className="flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-surface-blue flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-sky" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-ink text-lg mb-2 leading-snug">
                    {cred.title}
                  </h3>
                  <p className="text-brand-ink-secondary leading-relaxed text-[15px]">
                    {cred.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
