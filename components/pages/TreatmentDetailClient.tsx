'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { EASE, SPECIALTIES, type TreatmentDetail } from '@/lib/constants'

type Props = {
  slug: string
  specLabel: string
  detail: TreatmentDetail
}

export default function TreatmentDetailClient({ slug, specLabel, detail }: Props) {
  const paragraphs = detail.intro.split('\n\n')
  const others = SPECIALTIES.filter((s) => s.id !== slug)

  return (
    <main className="flex-grow">

      {/* ── Hero ────────────────────────────── dark */}
      <section className="relative bg-[#07080C] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 65% 40%, rgba(77,204,232,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-44 pb-36 sm:pt-52 sm:pb-44">

          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/30 hover:text-white/60 transition-colors mb-14"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
              All Treatments
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4DCCE8]/60 mb-7"
          >
            {specLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
            className="font-heading font-bold text-[#EDE6D8] leading-[1.04] tracking-[-0.04em] max-w-3xl"
            style={{ fontSize: 'clamp(34px, 5vw, 66px)' }}
          >
            {detail.tagline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
            className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <Link
              href={`/assessment/${slug}`}
              className="group inline-flex items-center gap-2.5 bg-[#D4C4A8] text-[#1A1814] px-8 py-4 rounded-full text-sm font-semibold tracking-[0.02em] hover:bg-[#C9B896] transition-colors duration-200"
              style={{ boxShadow: '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)' }}
            >
              Start Free Assessment
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <span className="text-[13px] text-white/30">Takes less than 2 minutes</span>
          </motion.div>
        </div>
      </section>

      {/* ── Overview ────────────────────────── white */}
      <section className="bg-white py-32 sm:py-44">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-20 lg:gap-32 items-start">

            {/* Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block mb-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
                Conditions We Treat
              </span>
              <ul className="space-y-4">
                {detail.conditions.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                    className="flex items-center gap-4 text-[15px] text-[#4A4440]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4DCCE8] flex-shrink-0" />
                    {c}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Overview copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            >
              <span className="block mb-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
                Overview
              </span>
              <div className="space-y-6">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-[17px] leading-[1.75] text-[#4A4440]">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Our Approach ────────────────────── cream */}
      <section className="bg-[#F9F7F4] py-32 sm:py-44">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block mb-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]"
          >
            Our Approach
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: 'rgba(26,24,20,0.06)' }}>
            {detail.approaches.map((approach, i) => (
              <motion.div
                key={approach.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="bg-[#F9F7F4] p-10 sm:p-12 flex flex-col gap-5"
              >
                <span className="font-mono text-[11px] text-[#1A1814]/20 tracking-widest select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading font-semibold text-[#1A1814] text-[18px] leading-snug tracking-[-0.02em]">
                  {approach.name}
                </h3>
                <p className="text-[14px] text-[#4A4440] leading-relaxed flex-1">
                  {approach.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to Expect ──────────────────── dark */}
      <section className="relative bg-[#07080C] overflow-hidden py-32 sm:py-44">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(77,204,232,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block mb-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35 text-center"
          >
            What to Expect
          </motion.span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {[
              { label: 'Before', text: detail.expectations.before },
              { label: 'During', text: detail.expectations.during },
              { label: 'After', text: detail.expectations.after },
            ].map(({ label, text }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                className="bg-[#07080C] px-10 py-12 sm:px-12 sm:py-14 flex flex-col gap-6"
              >
                <p className="font-heading font-bold text-[#4DCCE8] text-[11px] tracking-[0.1em] uppercase">
                  {label}
                </p>
                <p className="text-[14px] text-white/50 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Assessment CTA ──────────────────── white */}
      <section className="bg-white py-36 sm:py-48">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center"
        >
          <span className="block mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
            Ready to take the next step?
          </span>
          <h2
            className="font-heading font-bold text-[#1A1814] leading-[1.05] tracking-[-0.04em] mb-6"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
          >
            Find out if you&apos;re a candidate.
          </h2>
          <p className="text-[#4A4440] text-[16px] leading-relaxed mb-12 max-w-sm mx-auto">
            Our free assessment takes less than 2 minutes and helps us match you with the right specialist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href={`/assessment/${slug}`}
              className="group inline-flex items-center gap-2.5 bg-[#1A1814] text-[#EDE6D8] px-9 py-4 rounded-full text-sm font-semibold tracking-[0.02em] hover:bg-[#2a2520] transition-colors duration-200"
              style={{ boxShadow: '0 4px 20px rgba(26,24,20,0.18)' }}
            >
              Start Free Assessment
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#4A4440] hover:text-[#1A1814] transition-colors duration-200"
            >
              Or request a consultation
              <ArrowRight className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Other treatments ────────────────── cream */}
      <section className="bg-[#F9F7F4] py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
              Other Specialty Areas
            </span>
            <Link
              href="/treatments"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4A4440] hover:text-[#1A1814] transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {others.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              >
                <Link
                  href={`/treatments/${s.id}`}
                  className="group flex items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-4 py-5 text-center hover:border-[#4DCCE8]/25 hover:bg-[#4DCCE8]/[0.03] transition-all duration-200"
                >
                  <p className="font-heading font-semibold text-[#1A1814] text-[13px] leading-snug">
                    {s.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
