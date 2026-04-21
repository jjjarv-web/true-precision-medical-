'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SPECIALTIES } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function TreatmentsHubClient() {
  return (
    <main className="flex-grow bg-[#07080C]">

      {/* ── Hero ─────────────────────────────── */}
      <section className="pt-44 pb-32 sm:pt-52 sm:pb-44">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40"
          >
            Specialty Areas
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-heading font-bold text-[#EDE6D8] text-[clamp(38px,6vw,72px)] leading-[1.04] tracking-[-0.04em] max-w-3xl"
          >
            Every condition.<br className="hidden sm:block" /> One standard of care.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/50"
          >
            Our specialists focus on minimally invasive solutions first — smaller incisions,
            faster recovery, same-day discharge. For every condition we treat.
          </motion.p>
        </div>
      </section>

      {/* ── Specialty grid ───────────────────── */}
      <section className="pb-44 sm:pb-52">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {SPECIALTIES.map((spec, i) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                <Link
                  href={`/treatments/${spec.id}`}
                  className="group relative flex flex-col gap-6 p-10 sm:p-12 bg-[#07080c] transition-colors duration-300 hover:bg-white/[0.03] h-full"
                >
                  {/* Index */}
                  <span className="font-mono text-[11px] text-white/15 tracking-widest select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Condition name */}
                  <h2 className="font-heading font-semibold text-[#EDE6D8] text-[22px] tracking-[-0.025em] leading-snug">
                    {spec.label}
                  </h2>

                  {/* Description */}
                  <p className="text-[14px] text-white/40 leading-relaxed flex-1">
                    {spec.desc}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white/25 group-hover:text-[#4DCCE8] transition-colors duration-200 text-[13px] font-medium mt-2">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                  {/* Hover top-border accent */}
                  <div className="absolute top-0 inset-x-0 h-px bg-[#4DCCE8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What brings you in ───────────────── */}
      <section className="pb-44 sm:pb-52">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="h-px bg-white/[0.07] mb-20 origin-left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

            {/* Left — headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35 mb-7">
                Not sure where to start?
              </p>
              <h2
                className="font-heading font-bold text-[#EDE6D8] leading-[1.04] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(30px, 3.5vw, 50px)' }}
              >
                Tell us what brings you in.
              </h2>
              <p className="mt-6 text-[15px] text-white/40 leading-relaxed max-w-xs">
                Pick a condition below — we&apos;ll route you to the right specialist in minutes.
              </p>
            </motion.div>

            {/* Right — specialty pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              {SPECIALTIES.map((spec, i) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, ease: EASE, delay: i * 0.07 }}
                >
                  <Link
                    href={`/assessment/${spec.id}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-5 py-3 text-[14px] font-medium text-white/60 hover:border-[#4DCCE8]/40 hover:bg-[#4DCCE8]/[0.07] hover:text-[#EDE6D8] transition-all duration-200"
                  >
                    {spec.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
