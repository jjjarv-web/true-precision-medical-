'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function HowItWorks() {
  return (
    <section id="approach" className="py-28 sm:py-36 bg-[#F9F7F4] overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-20 sm:mb-24"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-5 block">
            Our Process
          </span>
          <h2 className="font-heading font-bold text-[#1A1814] text-[clamp(28px,3.5vw,48px)] leading-[1.08] tracking-[-0.04em] mb-5">
            A simpler path to relief.
          </h2>
          <p className="text-[#4A4440] text-[15px] leading-relaxed max-w-md">
            No hospital mazes. Direct access to specialists
            who treat your specific condition.
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">

          {/* Connecting line — desktop only */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="hidden lg:block absolute top-8 left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px origin-left"
            style={{ background: 'linear-gradient(to right, transparent, rgba(26,24,20,0.1) 15%, rgba(26,24,20,0.1) 85%, transparent)' }}
            aria-hidden
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
                className="flex flex-col"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start mb-6 lg:mb-8">
                  <div
                    className="w-16 h-16 rounded-full bg-white border border-black/[0.08] flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.06), inset 0 1px 0 rgba(255,255,255,1)' }}
                  >
                    <span className="font-mono text-[13px] text-[#1A1814]/40 tracking-widest select-none">
                      {item.step}
                    </span>
                  </div>
                  {/* Mobile connecting line */}
                  <div className="flex-1 h-px bg-black/[0.07] lg:hidden" />
                </div>

                <h4 className="font-heading font-semibold text-[#1A1814] text-[18px] leading-snug tracking-[-0.02em] mb-3">
                  {item.title}
                </h4>
                <p className="text-[#4A4440] text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#EDE6D8] bg-[#1A1814] hover:bg-[#2a2520] transition-colors duration-200"
            style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.18)' }}
          >
            Request a Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-[13px] text-[#9A9490]">
            Takes less than 5 minutes
          </span>
        </motion.div>

      </div>
    </section>
  )
}
