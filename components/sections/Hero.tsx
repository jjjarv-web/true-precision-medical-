'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { SPECIALTIES } from '@/lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Top-L mock: aqua “Surgery”, cream “Reimagined” */
const HERO_SURGERY_P1 = '#4DCCE8'
const HERO_REIMAGINED = '#EDE6D8'

type HeroProps = {
  googleReviewRating: number
  googleReviewCount: number
}

export default function Hero({ googleReviewRating, googleReviewCount }: HeroProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl
      // Surgery enters
      .fromTo(
        '.gsap-h1-surgery',
        { opacity: 0, y: 30, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95, ease: 'power3.out' }
      )
      // hold — let "Surgery" be read
      .to({}, { duration: 0.6 })
      // Surgery exits — blurs and drifts up
      .to('.gsap-h1-surgery', {
        opacity: 0,
        y: -16,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power2.in',
      })
      // Reimagined enters — zooms up from distance, blur dissolves; scale uses transform so container never reflows
      .fromTo(
        '.gsap-h1-reimagined',
        { opacity: 0, y: 24, scale: 0.82, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
        '-=0.15'
      )
      .to({}, { duration: 0.4 })
      // body copy and review line stagger in
      .fromTo(
        '.gsap-body-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.14 },
        '-=0.1'
      )
      // pills grid rises in
      .fromTo('.gsap-pills-entrance',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '+=0.2'
      )
      // condition label arrives last — pure fade, no gesture
      .fromTo('.gsap-condition-label',
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: 'power1.out' },
        '+=0.3'
      )

    const attentionTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top -50px',
        toggleActions: 'play none none none',
        once: true,
      },
    })

    attentionTl
      .to('.gsap-bringing-heading', {
        scale: 1.04,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to('.gsap-bringing-heading', {
        scale: 1,
        duration: 0.36,
        ease: 'power2.inOut',
      })
      .to(
        '.gsap-pills-wrapper',
        {
          y: -6,
          duration: 0.34,
          ease: 'power2.out',
        },
        '<0.06'
      )
      .to('.gsap-pills-wrapper', {
        y: 0,
        duration: 0.42,
        ease: 'power2.inOut',
      })
  }, { scope: containerRef })

  return (
    <section className="relative min-h-screen flex items-center bg-[#07080c] text-white">
      {/* Background: bg-1 fades in, then bg-2 crossfades over it */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1 — initial image */}
        <Image
          src="/images/tpm-hero-bg-1.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[50%_45%] animate-[bgFadeIn_1.6s_ease-out_forwards]"
          sizes="100vw"
          style={{ opacity: 0 }}
        />
        {/* Layer 2 — crossfades in over layer 1 */}
        <Image
          src="/images/tpm-hero-bg-2.jpg"
          alt=""
          fill
          className="object-cover object-[50%_45%] animate-[bgCrossfade_2.2s_ease-in-out_3.5s_forwards]"
          sizes="100vw"
          style={{ opacity: 0 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/47 to-black/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(7,8,12,0.55) 70%, #07080c 100%)',
          }}
          aria-hidden
        />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pt-44 pb-28 md:pt-48 text-center"
      >
        <h1 className="grid font-heading font-extrabold leading-[1.08] tracking-[-0.04em] text-[clamp(52px,9.5vw,108px)] mb-10 [text-rendering:geometricPrecision]">
          <span className="gsap-h1-surgery [grid-area:1/1]" style={{ opacity: 0, color: HERO_SURGERY_P1 }}>
            Surgery
          </span>
          <span className="gsap-h1-reimagined [grid-area:1/1]" style={{ opacity: 0, color: HERO_REIMAGINED }}>
            Reimagined
          </span>
        </h1>

        <p
          className="gsap-body-item text-base md:text-lg text-white/72 leading-[1.7] max-w-[520px] mx-auto mb-10 font-normal"
          style={{ opacity: 0 }}
        >
          Precision outpatient procedures for the conditions that once meant major surgery &mdash; led by neurosurgeons, orthopedic specialists, and interventional radiologists.
        </p>

        <div className="gsap-specialty-section pt-12">
          <p
            className="gsap-condition-label text-sm text-white/40 tracking-wide mb-5"
            style={{ opacity: 0 }}
          >
            Select your condition to begin
          </p>

          <div className="gsap-pills-wrapper gsap-pills-entrance grid grid-cols-2 gap-3 max-w-md sm:max-w-xl mx-auto mb-10" style={{ opacity: 0 }}>
            {SPECIALTIES.map((spec) => {
              const isSelected = selected === spec.id
              const isDimmed = selected !== null && !isSelected
              return (
                <motion.button
                  key={spec.id}
                  onClick={() => setSelected(isSelected ? null : spec.id)}
                  animate={{
                    backgroundColor: isSelected ? '#D4C4A8' : 'rgba(255,255,255,0.05)',
                    borderColor: isSelected ? '#D4C4A8' : 'rgba(255,255,255,0.10)',
                    boxShadow: isSelected
                      ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)'
                      : '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                    opacity: isDimmed ? 0.35 : 1,
                    scale: isDimmed ? 0.96 : 1,
                    filter: isDimmed ? 'blur(0.3px)' : 'blur(0px)',
                  }}
                  whileHover={{
                    y: isSelected ? 0 : -2,
                    scale: isDimmed ? 0.96 : isSelected ? 1 : 1.02,
                    borderColor: isSelected ? '#D4C4A8' : 'rgba(255,255,255,0.22)',
                    boxShadow: isSelected
                      ? '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
                    transition: { duration: 0.15, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="px-5 py-3.5 rounded-full border text-sm font-medium tracking-[0.02em] cursor-pointer
                             outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c]
                             select-none text-center min-h-[48px] flex items-center justify-center"
                >
                  <motion.span
                    animate={{ color: isSelected ? '#1A1814' : '#F4F4F5' }}
                    transition={{ duration: 0.16 }}
                  >
                    {spec.label}
                  </motion.span>
                </motion.button>
              )
            })}
          </div>

          <div className="min-h-[80px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.a
                    href={`/assessment/${selected}`}
                    whileHover={{
                      y: -2,
                      boxShadow: '0 10px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
                      transition: { duration: 0.15, ease: 'easeOut' },
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="inline-flex items-center gap-2.5 bg-[#D4C4A8] text-[#1A1814] px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.02em]"
                    style={{
                      boxShadow: '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)',
                    }}
                  >
                    Start Your Free Virtual Assessment
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <p className="text-xs text-white/50 tracking-wide">
                    Takes less than 2 minutes
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p
            className="gsap-pills-entrance text-xs text-white/35 tracking-wide mt-6"
            style={{ opacity: 0 }}
            aria-label="Google rating summary"
          >
            ★ {googleReviewRating.toFixed(1)} rating · {googleReviewCount}+ reviews
          </p>
        </div>
      </div>
    </section>
  )
}
