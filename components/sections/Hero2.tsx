'use client'

import { useState, useEffect, useRef } from 'react'
import {
  PersonStanding,
  Activity,
  Footprints,
  Hand,
  Zap,
  AlignCenter,
  Brain,
  ArrowRight,
  Play,
} from 'lucide-react'

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
  { id: 'knee',      label: 'Knee',               treatment: 'GAE & PNS',  Icon: PersonStanding },
  { id: 'shoulder',  label: 'Shoulder',            treatment: 'Embo & PNS', Icon: Activity },
  { id: 'plantar',   label: 'Plantar Fascia',      treatment: 'Embo',       Icon: Footprints },
  { id: 'wrist',     label: 'Wrist',               treatment: 'Embo',       Icon: Hand },
  { id: 'neuro',     label: 'Neuropathy',          treatment: 'PNS',        Icon: Zap },
  { id: 'back',      label: 'Back & Neck',         treatment: 'PNS',        Icon: AlignCenter },
  { id: 'occipital', label: 'Occipital Neuralgia', treatment: 'PNS',        Icon: Brain },
]

export default function Hero2() {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
      className="flex flex-col min-h-screen overflow-hidden"
      style={{ backgroundColor: BG }}
    >

      {/* ── Text + desktop image area ───────────────────────────── */}
      <div className="relative lg:min-h-screen overflow-hidden">
        <div className="relative lg:min-h-screen max-w-[1440px] mx-auto">

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

          {/* LAYER 3 — copy */}
          <div className="hero2-content relative z-[2]">
            <div style={{ maxWidth: 480 }}>

              {/* Eyebrow — ARC style: medium, very wide tracking, muted */}
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em]"
                 style={{ color: 'rgba(14,14,14,0.40)' }}>
                Minimally Invasive. Maximum Relief.
              </p>

              {/* Headline — ARC: semibold, tight tracking, near-[0.98] leading */}
              <h1
                className="font-heading font-semibold leading-[0.98] tracking-[-0.06em] mb-6"
                style={{ fontSize: 'clamp(46px, 4vw, 62px)', color: '#0E0E0E' }}
              >
                <span className="block">Target the source.</span>
                <span className="block">Relieve the pain.</span>
                <span className="block" style={{ color: GOLD }}>Restore your life.</span>
              </h1>

              {/* Body — ARC: normal weight, 1.55 leading, tracking-tight */}
              <p
                className="font-normal leading-[1.55] tracking-tight mb-8"
                style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#444444', maxWidth: 420 }}
              >
                Advanced, image-guided treatments that treat the source of your
                pain&mdash;so you can move better, feel better, and live better.
              </p>

              {/* CTAs — ARC style */}
              <div className="flex items-center gap-5 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[15px] font-medium
                             tracking-tight text-white select-none
                             shadow-[0_18px_34px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]
                             transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(0,0,0,0.24)]
                             active:scale-[0.98]"
                  style={{ backgroundColor: '#0E0E0E' }}
                >
                  <ArrowRight className="w-[15px] h-[15px]" aria-hidden />
                  Explore Treatments
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-3 text-[15px] font-medium tracking-tight
                             transition-all duration-200 select-none hover:opacity-80"
                  style={{ color: 'rgba(14,14,14,0.60)' }}
                >
                  <span
                    className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: 'rgba(14,14,14,0.18)' }}
                  >
                    <Play className="w-[11px] h-[11px] fill-current ml-0.5" style={{ color: '#0E0E0E' }} />
                  </span>
                  How It Works
                </button>
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
        {/* Top fade — blends into hero copy bg */}
        <div
          className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)` }}
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
      <div className="border-t" style={{ borderColor: 'rgba(14,14,14,0.09)', backgroundColor: BG }}>
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
