'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { INSURANCES } from '@/lib/constants'

// Double array for seamless infinite marquee
const MARQUEE_ITEMS = [...INSURANCES, ...INSURANCES]

export default function InsuranceBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 overflow-hidden border-y border-brand-primary/6"
      style={{ backgroundColor: 'var(--color-brand-bg-alt)' }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-6 sm:px-10 text-center mb-10"
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
          Most major plans accepted. No surprises — verify your coverage before your first visit.
        </p>
      </motion.div>

      {/* Marquee track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Fade masks on edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-brand-bg-alt) 10%, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-brand-bg-alt) 10%, transparent)' }}
        />

        <div className="flex gap-3 animate-marquee whitespace-nowrap w-max">
          {MARQUEE_ITEMS.map((ins, i) => (
            <span
              key={i}
              className={`inline-flex items-center px-5 py-2.5 rounded-full border text-sm font-semibold flex-shrink-0 select-none ${
                ins.priority
                  ? 'bg-brand-primary text-white border-brand-primary shadow-[0_2px_12px_rgba(30,58,95,0.22)]'
                  : 'bg-white text-brand-ink border-brand-primary/10 shadow-sm'
              }`}
            >
              {ins.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-10"
      >
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-sky hover:text-brand-primary transition-colors duration-200"
        >
          Verify my insurance coverage
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  )
}
