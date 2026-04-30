'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  PersonStanding,
  Activity,
  Footprints,
  Hand,
  Zap,
  AlignCenter,
  Brain,
  ArrowRight,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

const BG   = '#F9F7F4'
const GOLD = '#B8AA82'  // ARC's warm sand-gold

const AUTO_MS = 4000

const IMAGES: Record<string, string> = {
  knee:      '/images/hero/hero-knee.png',
  shoulder:  '/images/hero/hero-shoulder.png',
  plantar:   '/images/hero/hero-plantar-fascia.png',
  wrist:     '/images/hero/hero-wrist.png',
  neuro:     '/images/hero/hero-neuropathy.png',
  back:      '/images/hero/hero-back-neck.png',
  occipital: '/images/hero/hero-occipital.png',
}

const CONDITIONS = [
  { id: 'knee',      label: 'Knee',               treatment: 'GAE & PNS',  Icon: PersonStanding, annotation: 'No surgery required'       },
  { id: 'shoulder',  label: 'Shoulder',            treatment: 'Embo & PNS', Icon: Activity,       annotation: 'Non-surgical'               },
  { id: 'plantar',   label: 'Plantar Fascia',      treatment: 'Embo',       Icon: Footprints,     annotation: 'Fast recovery'              },
  { id: 'wrist',     label: 'Wrist',               treatment: 'Embo',       Icon: Hand,           annotation: 'Image-guided precision'     },
  { id: 'neuro',     label: 'Neuropathy',          treatment: 'PNS',        Icon: Zap,            annotation: 'Minimally invasive'         },
  { id: 'back',      label: 'Back & Neck',         treatment: 'PNS',        Icon: AlignCenter,    annotation: 'Same-day procedure'         },
  { id: 'occipital', label: 'Occipital Neuralgia', treatment: 'PNS',        Icon: Brain,          annotation: 'Lasting results'            },
]

export default function Hero2() {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl
      // Eyebrow drifts up, fades in
      .fromTo('.hero2-eyebrow',
        { autoAlpha: 0, y: 4 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'sine.out' },
        0.1
      )
      // Headline — gentle blur + y (ARC's hero-subtitle pattern)
      .fromTo('.hero2-headline',
        { autoAlpha: 0, y: 6, filter: 'blur(6px)' },
        {
          autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'sine.out',
          onComplete() { gsap.set('.hero2-headline', { clearProps: 'filter,transform' }) },
        },
        '-=0.25'
      )
      // Body copy — micro scale-in (ARC's hero-message pattern)
      .fromTo('.hero2-body',
        { autoAlpha: 0, y: 12, scale: 0.97 },
        {
          autoAlpha: 1, y: 0, scale: 1, duration: 1.0,
          onComplete() { gsap.set('.hero2-body', { clearProps: 'transform' }) },
        },
        '-=0.4'
      )
      // CTAs
      .fromTo('.hero2-cta',
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1, y: 0, duration: 0.9,
          onComplete() { gsap.set('.hero2-cta', { clearProps: 'transform' }) },
        },
        '-=0.2'
      )
      // Chips bar rises in last (ARC's hero-peek pattern)
      .fromTo('.hero2-chips',
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1, y: 0, duration: 1.0,
          onComplete() { gsap.set('.hero2-chips', { clearProps: 'transform' }) },
        },
        '+=0.1'
      )
  }, { scope: containerRef })

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setActive(i => (i + 1) % CONDITIONS.length),
      AUTO_MS
    )
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChip = (i: number) => {
    setActive(i)
    resetTimer()
  }

  return (
    <section
      ref={containerRef}
      className="flex flex-col min-h-screen lg:h-screen overflow-hidden"
      style={{ backgroundColor: BG }}
    >

      {/* ── Text + desktop image area ───────────────────────────── */}
      <div className="relative z-10 shrink-0 lg:flex-1 lg:overflow-hidden">
        <div className="relative lg:h-full max-w-[1440px] mx-auto">

          {/* LAYER 1 — cycling images: desktop only */}
          <div className="hero2-slides-wrapper hidden lg:block" aria-hidden="true">
            {CONDITIONS.map(({ id }, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                src={IMAGES[id]}
                alt=""
                className="hero2-slide"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
          </div>

          {/* LAYER 2 — left warm wash: desktop only */}
          <div aria-hidden className="hero2-fade pointer-events-none absolute inset-0 z-[1] hidden lg:block" />

          {/* LAYER 2.5 — per-condition annotation: desktop only */}
          <div
            className="hidden lg:block absolute z-[2] pointer-events-none"
            style={{ right: '5%', top: '52%', transform: 'translateY(-50%)' }}
            aria-hidden="true"
          >
            {CONDITIONS.map(({ id, annotation }, i) => (
              <div
                key={id}
                className="flex items-center gap-3 transition-opacity duration-700"
                style={{ opacity: i === active ? 1 : 0, position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0 }}
              >
                {/* Horizontal rule */}
                <div style={{ width: 28, height: 1, backgroundColor: 'rgba(14,14,14,0.28)', flexShrink: 0 }} />
                {/* Label */}
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.22em] whitespace-nowrap"
                  style={{ color: 'rgba(14,14,14,0.50)' }}
                >
                  {annotation}
                </span>
              </div>
            ))}
          </div>

          {/* LAYER 3 — copy */}
          <div className="hero2-content relative z-[2]">
            <div style={{ maxWidth: 480 }}>

              {/* Eyebrow — ARC style: medium, very wide tracking, muted */}
              <p className="hero2-eyebrow mb-5 text-[11px] font-medium uppercase tracking-[0.34em]"
                 style={{ color: 'rgba(14,14,14,0.40)', opacity: 0 }}>
                Minimally Invasive. Maximum Relief.
              </p>

              {/* Headline — ARC: semibold, tight tracking, near-[0.98] leading */}
              <h1
                className="hero2-headline font-heading font-semibold leading-[1.08] tracking-[-0.06em] mb-6"
                style={{ fontSize: 'clamp(46px, 4vw, 62px)', color: '#0E0E0E', opacity: 0 }}
              >
                <span className="block">Target the source.</span>
                <span className="block">Relieve the pain.</span>
                <span className="block" style={{ color: GOLD }}>Restore your life.</span>
              </h1>

              {/* Body — ARC: normal weight, 1.55 leading, tracking-tight */}
              <p
                className="hero2-body font-normal leading-[1.55] tracking-tight mb-8"
                style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#444444', maxWidth: 420, opacity: 0 }}
              >
                Advanced, image-guided treatments that treat the source of your
                pain&mdash;so you can move better, feel better, and live better.
              </p>

              {/* CTAs */}
              <div className="hero2-cta flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>

                {/* Primary — Start Free Assessment */}
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[15px] font-medium
                             tracking-tight text-white select-none
                             shadow-[0_2px_8px_rgba(0,0,0,0.10)]
                             transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(0,0,0,0.14)]
                             active:scale-[0.98]"
                  style={{ backgroundColor: '#0E0E0E' }}
                >
                  <ArrowRight className="w-[15px] h-[15px]" aria-hidden />
                  Start Free Assessment
                </Link>

                {/* Secondary — Text Us (mobile) */}
                <a
                  href={`sms:${PHONE_HREF.replace('tel:', '')}?body=Hi%2C%20I%27d%20like%20to%20connect%20with%20True%20Precision%20Medical.`}
                  className="sm:hidden inline-flex items-center gap-2.5 text-[15px] font-medium tracking-tight
                             transition-all duration-200 select-none hover:opacity-75"
                  style={{ color: 'rgba(14,14,14,0.60)' }}
                >
                  <span
                    className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: 'rgba(14,14,14,0.18)' }}
                  >
                    <MessageCircle className="w-[15px] h-[15px]" style={{ color: '#0E0E0E' }} />
                  </span>
                  Text Us
                </a>

                {/* Secondary — Text or call (desktop) */}
                <a
                  href={PHONE_HREF}
                  className="hidden sm:inline-flex items-center gap-2.5 text-[15px] font-medium tracking-tight
                             transition-all duration-200 select-none hover:opacity-75"
                  style={{ color: 'rgba(14,14,14,0.60)' }}
                >
                  <span
                    className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: 'rgba(14,14,14,0.18)' }}
                  >
                    <Phone className="w-[14px] h-[14px]" style={{ color: '#0E0E0E' }} />
                  </span>
                  {PHONE_NUMBER}
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile image strip — flex-1 fills remaining viewport height ── */}
      <div className="flex-1 relative lg:hidden overflow-hidden" style={{ minHeight: 200 }}>
        {CONDITIONS.map(({ id }, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            src={IMAGES[id]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-[50%_22%] pointer-events-none transition-opacity duration-700"
            style={{
              opacity: i === active ? 0.55 : 0,
              filter: 'saturate(0.85) contrast(0.92)',
            }}
          />
        ))}
        {/* Top fade — blends into hero copy bg, tall enough to cover button shadow */}
        <div
          className="absolute inset-x-0 top-0 h-36 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 20%, transparent 100%)` }}
          aria-hidden
        />
        {/* Bottom fade — blends into chips bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BG} 0%, transparent 100%)` }}
          aria-hidden
        />
      </div>

      {/* ── Condition chips bar ───────────────────────────────────── */}
      <div className="hero2-chips border-t" style={{ borderColor: 'rgba(14,14,14,0.09)', backgroundColor: BG, opacity: 0 }}>
        <div
          className="flex overflow-x-auto lg:grid lg:grid-cols-7 scrollbar-none divide-x"
          style={{ borderColor: 'rgba(14,14,14,0.08)' }}
        >
          {CONDITIONS.map(({ id, label, treatment, Icon }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => handleChip(i)}
              className="flex items-center gap-3 px-4 sm:px-5 py-[18px] flex-shrink-0 lg:flex-shrink
                         lg:justify-center text-left transition-colors duration-200 select-none"
              style={{
                borderColor: 'rgba(14,14,14,0.08)',
                backgroundColor: i === active ? 'rgba(14,14,14,0.04)' : 'transparent',
              }}
            >
              <Icon
                className="w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200"
                style={{ color: i === active ? GOLD : 'rgba(14,14,14,0.30)' }}
                aria-hidden
              />
              <div className="flex flex-col min-w-0">
                <span
                  className="text-[12.5px] leading-snug whitespace-nowrap transition-colors duration-200"
                  style={{
                    fontWeight: i === active ? 600 : 400,
                    color: i === active ? '#0E0E0E' : 'rgba(14,14,14,0.55)',
                  }}
                >
                  {label}
                </span>
                <span
                  className="text-[11px] leading-snug whitespace-nowrap"
                  style={{ color: 'rgba(14,14,14,0.38)' }}
                >
                  {treatment}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

    </section>
  )
}
