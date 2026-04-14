'use client'

import { useState, useRef, useEffect } from 'react'
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
  const [idleVisible, setIdleVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setIdleVisible(true), 5350)
    return () => clearTimeout(t)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      '.gsap-h1-surgery',
      { opacity: 0, y: 40, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95, ease: 'power3.out' }
    )
      .fromTo(
        '.gsap-h1-reimagined',
        { opacity: 0, y: 36, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        '<0.12'
      )
      .to({}, { duration: 0.35 })
      .fromTo(
        '.gsap-body-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.14 },
        '-=0.15'
      )
      // Step 1 — blur pulses up: the dematerialization moment
      // Step 1 — blur up: dematerialization moment
      // switch to overlay blend so letter shapes interact with the background pixels (genuine transparency)
      .to('.gsap-h1-surgery', {
        filter: 'blur(8px)',
        duration: 0.5,
        ease: 'power2.in',
        onStart: () => { gsap.set('.gsap-h1-surgery', { mixBlendMode: 'overlay' }); },
      }, 3.5)
      // Step 2 — glass settle: white + overlay on dark bg = letters become luminous windows into the image
      .to('.gsap-h1-surgery', {
        filter: 'blur(0px)',
        color: '#ffffff',
        opacity: 0.32,
        scale: 0.90,
        textShadow: 'none',
        duration: 1.4,
        ease: 'power2.out',
      }, '+=0')
      // Reimagined breathes forward as Surgery recedes — slight lag so it reads as consequence, not coordination
      .to('.gsap-h1-reimagined', {
        scale: 1.04,
        duration: 1.8,
        ease: 'power2.out',
      }, 3.8)
      // Layer 1 — headline words stagger in one by one
      .fromTo('.gsap-path-word',
        { opacity: 0, y: 12, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        4.2
      )
      // Layer 2 — pills grid rises in as a unit
      .fromTo('.gsap-pills-entrance',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        4.9
      )
      // Layer 3 — idle CTA hint is controlled by React state (see idleVisible)

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
        <h1 className="relative font-heading font-extrabold leading-[1.08] tracking-[-0.04em] text-[clamp(44px,8vw,88px)] mb-8 [text-rendering:geometricPrecision]">
          <span className="gsap-h1-surgery block" style={{ opacity: 0, color: HERO_SURGERY_P1 }}>
            Surgery
          </span>
          <span className="gsap-h1-reimagined block mt-1" style={{ opacity: 0, color: HERO_REIMAGINED }}>
            Reimagined
          </span>
        </h1>

        <p
          className="gsap-body-item text-base md:text-lg text-white/72 leading-relaxed max-w-xl mx-auto mb-8 font-normal"
          style={{ opacity: 0 }}
        >
          One of Arizona&apos;s leading centers for minimally invasive procedures, with
          neurosurgeons, interventional radiologists, and orthopedic surgeons treating
          joint pain, nerve pain, fibroids, vascular conditions, and more.
        </p>

        <div
          className="gsap-body-item flex justify-center mb-12"
          style={{ opacity: 0 }}
        >
          <div
            className="inline-flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center rounded-lg bg-white/[0.08] px-4 py-2.5 sm:px-5 sm:py-3 border border-white/[0.12] backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
            role="group"
            aria-label="Google rating summary"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <GoogleLogo />
              <GoogleStars />
            </div>
            <span className="text-sm font-bold text-white tabular-nums leading-none">4.9</span>
            <span className="text-sm text-white/45 select-none leading-none" aria-hidden>
              ·
            </span>
            <span className="text-sm text-white/65 leading-none">400+ reviews on Google</span>
          </div>
        </div>

        <div className="gsap-specialty-section">
          <p className="gsap-bringing-heading font-heading font-semibold text-white mb-8 text-[clamp(20px,2.8vw,32px)] leading-snug tracking-[-0.02em]">
            {['What', 'brings', 'you', 'in?'].map((word, i) => (
              <span key={i} className="gsap-path-word inline-block" style={{ opacity: 0 }}>
                {word}{i < 3 ? '\u00A0' : ''}
              </span>
            ))}
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
                    backgroundColor: isSelected ? '#D4C4A8' : 'rgba(255,255,255,0.07)',
                    borderColor: isSelected ? '#D4C4A8' : 'rgba(255,255,255,0.14)',
                    boxShadow: isSelected
                      ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)'
                      : '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                    opacity: isDimmed ? 0.35 : 1,
                    scale: isDimmed ? 0.96 : 1,
                    filter: isDimmed ? 'blur(0.3px)' : 'blur(0px)',
                  }}
                  whileHover={{
                    y: isSelected ? 0 : -2,
                    scale: isDimmed ? 0.96 : isSelected ? 1 : 1.02,
                    borderColor: isSelected ? '#D4C4A8' : 'rgba(255,255,255,0.28)',
                    boxShadow: isSelected
                      ? '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
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
              {selected ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.a
                    href="/book"
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
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: idleVisible ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-xs text-white/30 tracking-wide"
                >
                  Select a condition to get started
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
