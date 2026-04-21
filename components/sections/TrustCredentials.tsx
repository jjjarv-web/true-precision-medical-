'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EASE } from '@/lib/constants'
import type { Provider } from '@/lib/constants'
import ProviderCard from '@/components/providers/ProviderCard'

type TrustCredentialsProps = {
  homepageProviders: Provider[]
  /** Total providers on the full directory (for “View all n specialists”). */
  totalProviderCount: number
  googleReviewRating: number
  googleReviewCount: number
}

function StarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

const CREDENTIALS = [
  { index: '01', title: 'Board-Certified', detail: 'Every physician holds active board certification in their specialty.' },
  { index: '02', title: 'Fellowship-Trained', detail: 'Advanced subspecialty fellowship training beyond board certification.' },
  { index: '03', title: 'AAAHC Accredited', detail: 'Our centers meet the rigorous AAAHC ambulatory healthcare standards.' },
  { index: '04', title: 'Same-Day Discharge', detail: 'No hospital stays. Every procedure. You go home the same day.' },
]

export default function TrustCredentials({
  homepageProviders,
  totalProviderCount,
  googleReviewRating,
  googleReviewCount,
}: TrustCredentialsProps) {
  const providersRef  = useRef(null)
  const statsRef      = useRef(null)
  const credRef       = useRef(null)
  const providersInView = useInView(providersRef, { once: true, margin: '-100px' })
  const statsInView     = useInView(statsRef,     { once: true, margin: '-100px' })
  const credInView      = useInView(credRef,      { once: true, margin: '-100px' })

  const showFullTeamLinkOnMobile = totalProviderCount > homepageProviders.length

  return (
    <>
      {/* ── Block 1: Providers ─────────────────────────────── white */}
      {homepageProviders.length > 0 && (
        <section ref={providersRef} className="pt-24 pb-16 sm:pb-20 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={providersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              className="mb-14"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-5 block">
                Meet the Specialists
              </span>
              <h2 className="font-heading font-bold text-[#1A1814] text-[clamp(28px,4vw,48px)] leading-[1.08] tracking-[-0.04em]">
                Fellowship-trained surgeons.<br className="hidden sm:block" /> Board-certified. Focused on you.
              </h2>
            </motion.div>

            {/* Mobile: scroll hint + link when the full team is larger than the four featured cards */}
            <p className="lg:hidden mb-4 text-[12px] leading-relaxed text-[#9A9490]">
              <span className="text-[#6B6560]">Swipe to browse profiles.</span>
              {showFullTeamLinkOnMobile && (
                <>
                  {' '}
                  <Link
                    href="/specialists"
                    className="font-semibold text-[#4A4440] underline decoration-[#4DCCE8]/50 underline-offset-[3px] hover:text-[#1A1814] hover:decoration-[#4DCCE8] transition-colors"
                  >
                    View all {totalProviderCount} specialists
                  </Link>
                </>
              )}
            </p>

            {/* Mobile carousel — four curated providers */}
            <div className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-4 -mx-6 px-6 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] lg:hidden">
              {homepageProviders.map((provider, i) => (
                <div key={provider.id} className="snap-center flex-none w-[72vw] sm:w-[52vw]">
                  <ProviderCard provider={provider} index={i} />
                </div>
              ))}
            </div>

            {/* Desktop grid — four curated providers */}
            <div className="hidden lg:grid grid-cols-4 gap-5">
              {homepageProviders.map((provider, i) => (
                <ProviderCard key={provider.id} provider={provider} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={providersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: EASE, delay: 0.4 }}
              className={
                showFullTeamLinkOnMobile
                  ? 'hidden lg:flex justify-center mt-10 mb-0'
                  : 'flex justify-center mt-10 mb-0'
              }
            >
              <Link
                href="/specialists"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1814] hover:text-[#4DCCE8] transition-colors duration-200"
              >
                Meet all our specialists
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

          </div>
        </section>
      )}

      {/* ── Block 2: Credentials strip ──────────────────── warm cream */}
      <section ref={credRef} className="bg-[#F9F7F4] py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={credInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-black/[0.07]"
          >
            {CREDENTIALS.map((cred, i) => (
              <motion.div
                key={cred.index}
                initial={{ opacity: 0, y: 10 }}
                animate={credInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.11 }}
                className="lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col gap-2"
              >
                <span className="font-mono text-[11px] text-[#1A1814]/25 tracking-widest select-none">
                  {cred.index}
                </span>
                <p className="font-heading font-semibold text-[#1A1814] text-[15px] leading-snug">
                  {cred.title}
                </p>
                <p className="text-[13px] text-[#4A4440] leading-relaxed">
                  {cred.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Block 3: Stats ─────────────────────────────────── dark */}
      <section
        ref={statsRef}
        className="relative overflow-hidden bg-[#07080C]"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
      >
        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(77,204,232,0.06) 0%, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-12 text-center">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-12"
          >
            Arizona&apos;s most trusted minimally invasive clinic
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mb-6"
          >
            <h2
              className="font-heading font-bold text-[#EDE6D8] leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Zero hospital stays.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            className="font-heading font-semibold text-white/55 tracking-[-0.03em] mb-24"
            style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}
          >
            Every procedure.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={statsInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            className="h-px bg-white/[0.07] mb-20 origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">

            {/* Google rating */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
              className="flex flex-col items-center py-10 sm:pr-10"
            >
              <p
                className="font-heading font-bold text-[#EDE6D8] leading-none tracking-[-0.04em] mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}
              >
                {googleReviewRating.toFixed(1)}
              </p>
              <div className="flex items-center gap-[3px] mb-3">
                {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                on Google
              </p>
              <p className="text-[11px] text-white/35 mt-1">{googleReviewCount}+ verified reviews</p>
            </motion.div>

            {/* No. 1 GAE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
              className="flex flex-col items-center py-10 sm:px-10 border-t border-white/[0.06] sm:border-t-0 sm:border-l sm:border-r sm:border-white/[0.06]"
            >
              <p
                className="font-heading font-bold text-[#EDE6D8] leading-none tracking-[-0.04em] mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}
              >
                No.&thinsp;1
              </p>
              <p className="text-[13px] font-semibold text-white/50 mb-1">
                U.S. Referral Center
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                for GAE
              </p>
              <p className="text-[10px] italic text-white/20 mt-2">
                Genicular Artery Embolization
              </p>
            </motion.div>

            {/* 15,000+ procedures */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
              className="flex flex-col items-center py-10 sm:pl-10 border-t border-white/[0.06] sm:border-t-0"
            >
              <p
                className="font-heading font-bold text-[#EDE6D8] leading-none tracking-[-0.04em] mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}
              >
                15,000+
              </p>
              <p className="text-[13px] font-semibold text-white/50 mb-1">
                Outpatient procedures
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                No general anesthesia
              </p>
            </motion.div>

          </div>

        </div>

        <div className="pb-24" />

      </section>
    </>
  )
}
