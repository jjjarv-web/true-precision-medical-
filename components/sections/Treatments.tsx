'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SPECIALTIES } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Treatments() {
  return (
    <section id="treatments" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
            Specialty Areas
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-heading font-bold text-brand-ink mb-4 leading-tight">
            Specialized care,<br className="hidden sm:block" /> tailored to you.
          </h2>
          <p className="text-lg text-brand-muted leading-relaxed">
            Minimally invasive procedures that get you back to your life faster.
          </p>
        </motion.div>

        {/* ── Mobile: horizontal snap carousel (lg:hidden) ─────────── */}
        {/* ── Mobile: horizontal snap carousel (lg:hidden) ─────────── */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-5 px-5 pb-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] lg:hidden">
          {SPECIALTIES.map((spec, i) => (
            <motion.a
              href="#"
              key={spec.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
              className="snap-center flex-none w-[82vw] sm:w-[56vw] relative rounded-[1.6rem] overflow-hidden block"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={spec.img}
                alt={spec.label}
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                sizes="82vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(13,27,62,0.88) 0%, rgba(13,27,62,0.38) 48%, transparent 100%)',
                }}
              />
              <div
                className="absolute top-6 left-6 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/30 text-white text-xs font-medium tracking-[0.01em]"
                style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
              >
                {spec.label}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-7">
                <h3 className="font-heading font-bold text-white text-xl leading-tight mb-2">
                  {spec.label}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {spec.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium tracking-[0.01em]">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Desktop: 3×2 immersive card grid (hidden lg:grid) ──────── */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {SPECIALTIES.map((spec, i) => (
            <motion.a
              href="#"
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 32px rgba(13,27,62,0.22), 0 32px 72px rgba(13,27,62,0.26)',
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="relative rounded-[1.6rem] overflow-hidden block group h-[380px] cursor-pointer"
              style={{
                boxShadow:
                  '0 4px 16px rgba(13,27,62,0.12), 0 16px 48px rgba(13,27,62,0.18)',
              }}
            >
              <Image
                src={spec.img}
                alt={spec.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1280px) 33vw, 400px"
                priority={i < 3}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(13,27,62,0.88) 0%, rgba(13,27,62,0.30) 52%, transparent 100%)',
                }}
              />
              <div
                className="absolute top-6 left-6 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/30 text-white text-xs font-medium tracking-[0.01em]"
                style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
              >
                {spec.label}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-7">
                <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-2">
                  {spec.label}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {spec.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-medium tracking-[0.01em] opacity-75 group-hover:opacity-100 transition-opacity duration-200">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
