'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { INSURANCES } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}

const cellVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
}

export default function InsuranceBar() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const primary    = INSURANCES.filter((i) => i.priority)
  const secondary  = INSURANCES.filter((i) => !i.priority)

  return (
    <section
      ref={ref}
      className="py-24 border-y border-brand-primary/6"
      style={{ backgroundColor: 'var(--color-brand-bg-alt)' }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Insurance Accepted
            </span>
          </div>
          <h2 className="font-heading font-bold text-brand-ink text-[clamp(26px,3.5vw,40px)] leading-tight mb-3">
            We work with your insurance.
          </h2>
          <p className="text-brand-ink-secondary text-lg max-w-md mx-auto leading-relaxed">
            Most major plans accepted — including Medicare. Verify your coverage
            before your first visit, no cost.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Medicare — full-width featured cell */}
          {primary.map((ins) => (
            <motion.div
              key={ins.name}
              variants={cellVariants}
              whileHover={{
                opacity: 1,
                borderColor: 'rgba(30,58,95,0.28)',
                y: -1,
                boxShadow: '0 4px 20px rgba(30,58,95,0.09)',
              }}
              className="mb-3 w-full flex items-center justify-between px-7 py-5
                         bg-white rounded-2xl border border-brand-primary/10
                         cursor-default select-none transition-none"
              style={{ opacity: 0.9 }}
            >
              <span className="font-heading font-bold text-brand-ink text-xl tracking-tight">
                {ins.name}
              </span>
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-widest">
                Accepted
              </span>
            </motion.div>
          ))}

          {/* Secondary carriers — 3-column grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {secondary.map((ins) => (
              <motion.div
                key={ins.name}
                variants={cellVariants}
                whileHover={{
                  opacity: 1,
                  borderColor: 'rgba(74,144,212,0.35)',
                  y: -1,
                  boxShadow: '0 4px 16px rgba(30,58,95,0.07)',
                }}
                className="flex items-center px-5 py-4 bg-white rounded-xl
                           border border-brand-primary/8 cursor-default select-none
                           transition-none"
                style={{ opacity: 0.65 }}
              >
                <span className="font-medium text-brand-ink text-sm leading-snug">
                  {ins.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold
                       text-brand-sky hover:text-brand-primary transition-colors duration-200"
          >
            Verify my insurance coverage
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
