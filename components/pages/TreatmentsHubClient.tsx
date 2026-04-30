'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EASE, SPECIALTIES } from '@/lib/constants'

// Columns shown in the hero image strip
const HERO_COLUMNS = [
  { id: 'knee',       label: 'Knee',               tag: 'GAE & PNS',  img: '/images/hero/hero-knee.png'          },
  { id: 'shoulder',   label: 'Shoulder',            tag: 'Embo & PNS', img: '/images/hero/hero-shoulder.png'      },
  { id: 'foot',       label: 'Plantar Fascia',      tag: 'Embo',       img: '/images/hero/hero-plantar-fascia.png'},
  { id: 'wrist',      label: 'Wrist',               tag: 'Embo',       img: '/images/hero/hero-wrist.png'         },
  { id: 'neuropathy', label: 'Neuropathy',           tag: 'PNS',        img: '/images/hero/hero-neuropathy.png'   },
  { id: 'spine',      label: 'Back & Neck',          tag: 'PNS',        img: '/images/hero/hero-back-neck.png'    },
  { id: 'neuralgia',  label: 'Occipital Neuralgia',  tag: 'PNS',        img: '/images/hero/hero-occipital.png'    },
]

export default function TreatmentsHubClient() {
  return (
    <main className="flex-grow bg-[#07080C]">

      {/* ── Hero — white split layout ─────────────────────────────── */}
      <section className="bg-white flex flex-col lg:flex-row overflow-hidden" style={{ minHeight: '72vh' }}>

        {/* LEFT — copy */}
        <div className="flex-none lg:w-[38%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 pt-36 pb-10 lg:py-32">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block mb-5 text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: 'rgba(14,14,14,0.40)' }}
          >
            Minimally Invasive. Maximum Relief.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
            className="font-heading font-semibold leading-[1.06] tracking-[-0.05em]"
            style={{ fontSize: 'clamp(38px, 3.6vw, 58px)', color: '#0E0E0E' }}
          >
            Precisely targeted.<br />
            Naturally restorative.<br />
            <span style={{ color: '#B8AA82' }}>Lasting relief.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="mt-6 leading-[1.6] tracking-tight"
            style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: '#444444', maxWidth: 380 }}
          >
            Advanced Embo and PNS therapies that focus on the source of your
            pain&mdash;so you can get back to what matters most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="mt-8 flex items-center gap-5 flex-wrap"
          >
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14px] font-medium tracking-tight text-white select-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.20)] active:scale-[0.98]"
              style={{ backgroundColor: '#0E0E0E', boxShadow: '0 2px 10px rgba(0,0,0,0.14)' }}
            >
              <ArrowRight className="w-[14px] h-[14px]" aria-hidden />
              Start Free Assessment
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — vertical image strip */}
        {/* Desktop: flex columns fill height. Mobile: horizontal scroll strip. */}
        <div
          className="flex-1 relative flex overflow-x-auto lg:overflow-x-visible scrollbar-none"
          style={{ minHeight: 280 }}
        >
          {/* Top fade — columns melt into the white header */}
          <div
            className="absolute inset-x-0 top-0 h-40 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)' }}
            aria-hidden
          />
          {HERO_COLUMNS.map(({ id, label, tag, img }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.06 }}
              className="group relative flex-none lg:flex-1 overflow-hidden border-r border-black/[0.07] last:border-r-0"
              style={{ width: 136, minWidth: 136 }}
            >
              <Link href={`/treatments/${id}`} className="block absolute inset-0" tabIndex={-1} aria-hidden />

              {/* Image fills the column */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                style={{ opacity: 0.38, filter: 'saturate(0.55) contrast(0.90)' }}
              />

              {/* Bottom label */}
              <div className="absolute bottom-0 inset-x-0 px-3 pb-4 pt-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, transparent 100%)' }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0E0E0E] leading-tight">
                  {label}
                </p>
                <p className="text-[9px] tracking-wide mt-0.5" style={{ color: 'rgba(14,14,14,0.42)' }}>
                  {tag}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Specialty grid ───────────────────── */}
      <section className="pt-20 sm:pt-28 pb-44 sm:pb-52">
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
                className="font-heading font-semibold text-[#EDE6D8] leading-[1.04] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(28px, 3.2vw, 46px)' }}
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
