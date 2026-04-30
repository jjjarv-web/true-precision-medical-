'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE, SPECIALTIES } from '@/lib/constants'

export default function Treatments() {
  return (
    <section id="treatments" className="bg-[#07080c] pt-24 sm:pt-32 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 lg:mb-18 pt-8"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-5 block">
            Specialty Areas
          </span>
          <h2 className="font-heading font-semibold text-[clamp(28px,3.8vw,48px)] text-[#EDE6D8] leading-[1.04] tracking-[-0.04em]">
            Explore treatments.
          </h2>
        </motion.div>

        {/* Card grid — gap-px on parent acts as razor-thin divider lines */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          {SPECIALTIES.map((spec, i) => (
            <motion.a
              key={spec.id}
              href={`/treatments/${spec.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.10 }}
              className="group relative flex flex-col p-8 bg-[#07080c] cursor-pointer transition-colors duration-300 hover:bg-white/[0.04] min-h-[300px] overflow-hidden"
            >
              {/* Anatomical background image */}
              <div className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-none select-none">
                <img
                  src={spec.img}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-[0.09] group-hover:opacity-[0.18] transition-opacity duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, #07080c 0%, #07080c 15%, transparent 100%)' }}
                />
              </div>

              {/* Card content */}
              <div className="relative z-10 flex flex-col gap-5 flex-1">
                {/* Index */}
                <span className="font-mono text-[11px] text-white/18 tracking-widest select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Condition name */}
                <h3 className="font-heading font-semibold text-white text-xl tracking-[-0.025em] leading-snug">
                  {spec.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed flex-1">
                  {spec.desc}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-white/25 group-hover:text-white/60 transition-colors duration-250 text-sm tracking-[0.01em]">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>

              {/* Hover top-border accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-[#4DCCE8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
