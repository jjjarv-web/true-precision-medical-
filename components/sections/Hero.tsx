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

const STAR_PATH =
  'M6 0.5l1.237 3.809H11.4L8.09 6.586l1.237 3.809L6 8.138l-3.326 2.257L3.91 6.586.6 4.309h4.163z'

const STAR_STEP = 11.5

function GoogleStars() {
  return (
    <svg
      width={5 * STAR_STEP + 2}
      height="12"
      viewBox={`0 0 ${5 * STAR_STEP + 2} 12`}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${1 + i * STAR_STEP}, 0.5)`}>
          <path d={STAR_PATH} fill="#FBBC05" />
        </g>
      ))}
    </svg>
  )
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Hero() {
  const [selected, setSelected] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    // ── Phase 1: "Major Surgery" enters together ──────────────────────────────
    tl.fromTo('.gsap-major',
      { opacity: 0, y: 44, filter: 'blur(14px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' }
    )
    .fromTo('.gsap-surgery',
      { opacity: 0, y: 44, filter: 'blur(14px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
      '<0.1'
    )

    // ── Phase 2: Breath ───────────────────────────────────────────────────────
    tl.to({}, { duration: 0.65 })

    // ── Phase 3a: Major shrinks + strikethrough draws ─────────────────────────
    tl.to('.gsap-major-inner',
      { scale: 0.76, opacity: 0.18, y: 6, duration: 0.9, ease: 'power2.inOut' }
    )
    .to('.gsap-strike',
      { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
      '<'
    )

    // ── Beat — let the strike land ────────────────────────────────────────────
    tl.to({}, { duration: 0.38 })

    // ── Phase 3b: Major collapses out, Surgery drifts to center ──────────────
    // overflow:hidden lets the width:0 collapse clip the content cleanly
    tl.set('.gsap-major', { overflow: 'hidden' })
      .to('.gsap-major',
        { width: 0, marginRight: 0, opacity: 0, duration: 0.65, ease: 'power2.inOut' }
      )

    // ── Phase 3c: Reimagined blooms in as Major disappears ────────────────────
    tl.fromTo('.gsap-reimagined',
      { opacity: 0, y: 38, filter: 'blur(10px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
      '<0.15'
    )

    // ── Phase 4: Body content staggered reveal ────────────────────────────────
    tl.fromTo('.gsap-body-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0,  duration: 0.6, ease: 'power2.out', stagger: 0.18 },
      '-=0.3'
    )

    // ── Scroll attention: pulse the "What's bringing you in?" block ───────────
    // Fires once when the user scrolls ~50px — a nudge before they leave.
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
        scale: 1.05,
        duration: 0.42,
        ease: 'power2.out',
      })
      .to('.gsap-bringing-heading', {
        scale: 1,
        duration: 0.38,
        ease: 'power2.inOut',
      })
      .to('.gsap-pills-wrapper', {
        y: -7,
        duration: 0.36,
        ease: 'power2.out',
      }, '<0.06')
      .to('.gsap-pills-wrapper', {
        y: 0,
        duration: 0.44,
        ease: 'power2.inOut',
      })
  }, { scope: containerRef })

  return (
    <section className="relative min-h-screen flex items-center bg-white">

      {/* Hero background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/hero-bg-images.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.22]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 72% 62% at 50% 42%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 58%, transparent 100%)',
              'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0.08) 100%)',
            ].join(', '),
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
        />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 75% 5%, rgba(74,144,212,0.07) 0%, transparent 60%)' }}
      />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 15% 95%, rgba(91,183,166,0.05) 0%, transparent 60%)' }}
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pt-48 pb-28 text-center"
      >
        {/* ── H1 ─────────────────────────────────────────────────────────────── */}
        <h1 className="font-heading font-extrabold leading-[1.2] tracking-tight text-brand-ink text-[clamp(46px,7.5vw,92px)] mb-8">

          {/* Line 1: Major Surgery */}
          <span className="block">

            {/* "Major" — outer keeps layout, inner scales/fades */}
            <span
              className="gsap-major inline-block"
              style={{ opacity: 0, marginRight: '0.2em' }}
            >
              {/* Strikethrough lives inside inner so it moves with the text on scale */}
              <span
                className="gsap-major-inner relative inline-block"
                style={{ transformOrigin: 'center center' }}
              >
                Major
                <span
                  className="gsap-strike absolute inset-x-0 pointer-events-none rounded-full"
                  style={{
                    top: '52%',
                    height: '0.07em',
                    marginTop: '-0.035em',
                    backgroundColor: 'rgba(13,27,62,0.5)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                  }}
                />
              </span>
            </span>

            {/* "Surgery" — enters with Major, stays at full weight */}
            <span
              className="gsap-surgery inline-block gradient-text py-[0.1em]"
              style={{ opacity: 0 }}
            >
              Surgery
            </span>
          </span>

          {/* Line 2: Reimagined */}
          <span className="block">
            <span
              className="gsap-reimagined inline-block"
              style={{ opacity: 0 }}
            >
              Reimagined
            </span>
          </span>
        </h1>

        {/* ── Body copy ───────────────────────────────────────────────────────── */}
        <p
          className="gsap-body-item text-lg md:text-xl text-brand-ink-secondary leading-relaxed max-w-xl mx-auto mb-7"
          style={{ opacity: 0 }}
        >
          See why Arizona&apos;s board-certified orthopedic surgeons,
          neurosurgeons, and interventional radiologists are redefining
          what surgery looks like.
        </p>

        {/* ── Google trust signal (official-style summary bar) ───────────────── */}
        <div
          className="gsap-body-item flex justify-center mb-12"
          style={{ opacity: 0 }}
        >
          <div
            className="inline-flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center rounded-xl bg-[#F9F9FB] px-4 py-2.5 sm:px-5 sm:py-3 border border-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            role="group"
            aria-label="Google rating summary"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <GoogleLogo />
              <GoogleStars />
            </div>
            <span className="text-sm font-bold text-[#1A1C1E] tabular-nums leading-none">4.9</span>
            <span className="text-sm text-[#5F6368] select-none leading-none" aria-hidden>
              ·
            </span>
            <span className="text-sm text-[#5F6368] leading-none">400+ reviews on Google</span>
          </div>
        </div>

        {/* ── Consultation Selector ───────────────────────────────────────────── */}
        <div
          className="gsap-body-item"
          style={{ opacity: 0 }}
        >
          <p className="gsap-bringing-heading font-heading font-bold text-brand-ink mb-8 text-[clamp(22px,3vw,36px)] leading-snug">
            What&apos;s bringing you in?
          </p>

          <div className="gsap-pills-wrapper flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-12">
            {SPECIALTIES.map((spec) => {
              const isSelected = selected === spec.id
              const isDimmed   = selected !== null && !isSelected
              return (
                <motion.button
                  key={spec.id}
                  onClick={() => setSelected(isSelected ? null : spec.id)}
                  animate={{
                    backgroundColor: isSelected ? '#1E3A5F' : 'rgba(255,255,255,0.58)',
                    borderColor:     isSelected ? '#1E3A5F' : 'rgba(255,255,255,0.60)',
                    boxShadow: isSelected
                      ? '0 8px 32px rgba(30,58,95,0.30), inset 0 1px 0 rgba(255,255,255,0.12)'
                      : '0 2px 6px rgba(17,35,70,0.05), 0 10px 32px rgba(17,35,70,0.07), inset 0 1px 0 rgba(255,255,255,0.88), inset 0 -1px 0 rgba(255,255,255,0.22)',
                    opacity: isDimmed ? 0.32 : 1,
                    scale:   isDimmed ? 0.94 : 1,
                    filter:  isDimmed ? 'blur(0.4px)' : 'blur(0px)',
                  }}
                  whileHover={{
                    y: isSelected ? 0 : -3,
                    scale: isDimmed ? 0.94 : isSelected ? 1 : 1.02,
                    borderColor: isSelected ? '#1E3A5F' : 'rgba(74,144,212,0.50)',
                    boxShadow: isSelected
                      ? '0 12px 36px rgba(30,58,95,0.34), inset 0 1px 0 rgba(255,255,255,0.12)'
                      : '0 4px 10px rgba(17,35,70,0.05), 0 18px 48px rgba(17,35,70,0.10), inset 0 1px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(255,255,255,0.28)',
                    transition: { duration: 0.15, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="px-9 py-[1.1rem] min-w-[172px] rounded-[1.6rem] border text-sm font-medium tracking-[0.01em] cursor-pointer
                             outline-none focus-visible:ring-2 focus-visible:ring-brand-sky
                             select-none backdrop-blur-2xl text-center"
                >
                  <motion.span
                    animate={{ color: isSelected ? '#ffffff' : '#0D1B3E' }}
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
              {selected ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, y: 28, scale: 0.90 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={{    opacity: 0, y: 16,  scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.a
                    href="#"
                    whileHover={{
                      y: -3,
                      boxShadow: '0 12px 40px rgba(30,58,95,0.38), inset 0 1px 0 rgba(255,255,255,0.16)',
                      transition: { duration: 0.15, ease: 'easeOut' },
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="inline-flex items-center gap-2.5 bg-brand-primary text-white
                               px-9 py-[1.1rem] rounded-[1.6rem] text-sm font-medium tracking-[0.01em]"
                    style={{ boxShadow: '0 8px 32px rgba(30,58,95,0.30), inset 0 1px 0 rgba(255,255,255,0.12)' }}
                  >
                    Start Your Free Virtual Consultation
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <p className="text-xs text-brand-muted tracking-wide">
                    No referral needed&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Takes less than 5 minutes
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{    opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-brand-muted-light"
                >
                  Select a condition above to get started
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
