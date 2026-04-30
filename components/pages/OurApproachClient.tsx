'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EASE, HOW_IT_WORKS_STEPS, WHY_FEATURES } from '@/lib/constants'
import type { SiteSettings } from '@/lib/sanity'

const CREDENTIALS = [
  { index: '01', title: 'Board-Certified', detail: 'Every physician holds active board certification in their specialty.' },
  { index: '02', title: 'Fellowship-Trained', detail: 'Advanced subspecialty fellowship training beyond board certification.' },
  { index: '03', title: 'AAAHC Accredited', detail: 'Our centers meet the rigorous AAAHC ambulatory healthcare standards.' },
  { index: '04', title: 'Same-Day Discharge', detail: 'No hospital stays. Every procedure. You go home the same day.' },
]

const PRINCIPLES = [
  {
    number: '01',
    heading: 'Less invasive, first.',
    body: 'We exhaust every minimally invasive option before recommending open surgery. Smaller incisions mean less trauma, less pain, and significantly faster recovery.',
  },
  {
    number: '02',
    heading: 'Specialists, not generalists.',
    body: 'Every patient is seen by a fellowship-trained specialist who focuses exclusively on your condition. Not a general practitioner — the right expert, from day one.',
  },
  {
    number: '03',
    heading: 'Outpatient, always.',
    body: "We built our centers around same-day discharge because hospitals introduce risk and cost that most procedures don\u2019t require. You go home the same afternoon \u2014 every time.",
  },
  {
    number: '04',
    heading: 'Honest options.',
    body: "We tell you when a procedure is right for you \u2014 and when it isn\u2019t. Our specialists are paid to give you the best outcome, not to fill a schedule.",
  },
]

type Props = {
  siteSettings: SiteSettings
}

export default function OurApproachClient({ siteSettings }: Props) {
  return (
    <main className="flex-grow">

      {/* ── Hero ────────────────────────────── white */}
      <section className="bg-white pt-44 pb-32 sm:pt-52 sm:pb-44">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]"
          >
            Our Approach
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
            className="font-heading font-semibold text-[#1A1814] leading-[1.02] tracking-[-0.05em] max-w-3xl"
            style={{ fontSize: 'clamp(34px, 5vw, 62px)' }}
          >
            Major surgery should be the last resort. Not the first option.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
            className="mt-9 text-[17px] leading-relaxed text-[#4A4440] max-w-lg"
          >
            True Precision Medical was built around a single conviction: most conditions
            have a less invasive solution. We find it — every time.
          </motion.p>
        </div>
      </section>

      {/* ── Core principles ─────────────────── dark */}
      <section className="relative bg-[#07080C] overflow-hidden py-32 sm:py-44">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(77,204,232,0.05) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block mb-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40"
          >
            What We Believe
          </motion.span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="bg-[#07080C] p-12 sm:p-14 flex flex-col gap-6"
              >
                <span className="font-mono text-[11px] text-white/18 tracking-widest select-none">
                  {p.number}
                </span>
                <h2 className="font-heading font-bold text-[#EDE6D8] text-[22px] leading-snug tracking-[-0.025em]">
                  {p.heading}
                </h2>
                <p className="text-[14px] text-white/50 leading-relaxed max-w-sm">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────── cream */}
      <section className="bg-[#F9F7F4] py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-24"
          >
            <span className="block mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
              Our Process
            </span>
            <h2 className="font-heading font-semibold text-[#1A1814] text-[clamp(26px,3.5vw,44px)] leading-[1.04] tracking-[-0.04em] mb-6 max-w-xl">
              A simpler path to relief.
            </h2>
            <p className="text-[#4A4440] text-[16px] leading-relaxed max-w-md">
              No hospital mazes. Direct access to specialists who treat your specific condition.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
              className="hidden lg:block absolute top-8 left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px origin-left"
              style={{ background: 'linear-gradient(to right, transparent, rgba(26,24,20,0.1) 15%, rgba(26,24,20,0.1) 85%, transparent)' }}
              aria-hidden
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-10">
              {HOW_IT_WORKS_STEPS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start mb-8 lg:mb-10">
                    <div
                      className="w-16 h-16 rounded-full bg-white border border-black/[0.08] flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.06), inset 0 1px 0 rgba(255,255,255,1)' }}
                    >
                      <span className="font-mono text-[13px] text-[#1A1814]/35 tracking-widest select-none">
                        {item.step}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-black/[0.06] lg:hidden" />
                  </div>
                  <h4 className="font-heading font-semibold text-[#1A1814] text-[19px] leading-snug tracking-[-0.02em] mb-4">
                    {item.title}
                  </h4>
                  <p className="text-[#4A4440] text-[14px] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            className="mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href="/assessment"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-[#EDE6D8] bg-[#1A1814] hover:bg-[#2a2520] transition-colors duration-200"
              style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.18)' }}
            >
              Start Free Assessment
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <span className="text-[13px] text-[#9A9490]">Takes less than 2 minutes</span>
          </motion.div>
        </div>
      </section>

      {/* ── Why different ───────────────────── dark */}
      <section className="relative bg-[#07080C] overflow-hidden py-32 sm:py-44">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(ellipse 50% 50% at 30% 60%, rgba(77,204,232,0.04) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-20"
          >
            <span className="block mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Why True Precision Medical
            </span>
            <h2 className="font-heading font-semibold text-[#EDE6D8] text-[clamp(26px,3.5vw,44px)] leading-[1.04] tracking-[-0.04em] max-w-xl">
              We believe most surgery is avoidable. Here&apos;s how we prove it.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {WHY_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="bg-[#07080C] p-12 sm:p-14 flex flex-col gap-5"
              >
                <h3 className="font-heading font-bold text-[#EDE6D8] text-[20px] leading-snug tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-white/45 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-px grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {[
              { value: siteSettings.googleReviewRating.toFixed(1), label: 'Patient Rating on Google' },
              { value: '98%', label: 'Same-Day Discharge Rate' },
              { value: '48h', label: 'Avg. Time to Appointment' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.1 }}
                className="bg-[#07080C] px-12 py-12 text-center"
              >
                <p className="font-heading font-bold text-[#EDE6D8] tracking-[-0.03em] mb-3" style={{ fontSize: 'clamp(32px,4vw,50px)' }}>
                  {stat.value}
                </p>
                <p className="text-[11px] text-white/35 uppercase tracking-[0.16em] font-semibold leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ─────────────────────── cream */}
      <section className="bg-[#F9F7F4] py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-black/[0.07]"
          >
            {CREDENTIALS.map((cred, i) => (
              <motion.div
                key={cred.index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
                className="lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col gap-3"
              >
                <span className="font-mono text-[11px] text-[#1A1814]/20 tracking-widest select-none">
                  {cred.index}
                </span>
                <p className="font-heading font-semibold text-[#1A1814] text-[15px] leading-snug">
                  {cred.title}
                </p>
                <p className="text-[13px] text-[#4A4440] leading-relaxed">{cred.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Specialists callout ──────────────── white */}
      <section className="bg-white py-28 sm:py-36">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-10"
          >
            <div>
              <span className="block mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
                The Team
              </span>
              <h2 className="font-heading font-semibold text-[#1A1814] text-[clamp(22px,3vw,38px)] leading-[1.04] tracking-[-0.04em] max-w-md">
                Meet the specialists behind the approach.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#4A4440] max-w-sm">
                Fellowship-trained. Board-certified. Each one focused on a specific discipline — so you see the right expert from day one.
              </p>
            </div>
            <Link
              href="/specialists"
              className="group inline-flex items-center gap-2.5 flex-shrink-0 bg-[#1A1814] text-[#EDE6D8] px-8 py-4 rounded-full text-sm font-semibold tracking-[0.02em] hover:bg-[#2a2520] transition-colors duration-200"
              style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.18)' }}
            >
              View all specialists
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
