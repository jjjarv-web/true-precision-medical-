'use client'

import { useCallback, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, Star } from 'lucide-react'
import { FEATURED_TESTIMONIALS, GOOGLE_BUSINESS_REVIEWS_URL, GOOGLE_RATING, GOOGLE_REVIEWS } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function initialsFromName(name: string) {
  const parts = name.replace(/\./g, '').trim().split(/\s+/)
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04]" strokeWidth={0} />
      ))}
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function PatientStories() {
  const wallRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const toggle = useCallback(() => {
    setExpanded((e) => {
      const next = !e
      if (!next && wallRef.current) {
        requestAnimationFrame(() =>
          wallRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        )
      }
      return next
    })
  }, [])

  return (
    <section id="patient-stories" className="bg-[#07080C] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-5 block">
            Patient Stories
          </span>
          <h2 className="font-heading font-bold text-[#EDE6D8] text-[clamp(26px,4vw,48px)] leading-[1.08] tracking-[-0.04em] mb-6">
            Real outcomes. Real people.
          </h2>
          {/* Compact Google trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.10]">
            <GoogleLogo />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04]" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#EDE6D8]">{GOOGLE_RATING.toFixed(1)}</span>
            <span className="text-sm text-white/40">· {GOOGLE_REVIEWS}+ reviews</span>
          </div>
        </motion.div>

        <div ref={wallRef} className="relative max-w-5xl mx-auto">

          {/* Review wall */}
          <div
            className="overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ maxHeight: expanded ? 5000 : 520 }}
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {FEATURED_TESTIMONIALS.map((t) => (
                <article
                  key={t.id}
                  className="break-inside-avoid mb-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6
                             transition-[transform,border-color,background] duration-200
                             hover:-translate-y-0.5 hover:bg-white/[0.08] hover:border-white/[0.12]"
                >
                  <div className="flex gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-[#EDE6D8]"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(77,204,232,0.25) 0%, rgba(30,58,95,0.20) 100%)',
                      }}
                    >
                      {initialsFromName(t.name)}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-heading font-semibold text-[#EDE6D8] text-sm leading-tight">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-white/40 mt-0.5 leading-snug">{t.detail}</p>
                      <p className="text-[10px] text-white/20 mt-0.5 font-mono">{t.date}</p>
                    </div>
                  </div>
                  <StarRow />
                  <blockquote className="text-white/65 text-[14px] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </article>
              ))}
            </div>
          </div>

          {/* Cloud fade overlay — dark version */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-14 transition-opacity duration-500"
            style={{
              top: expanded ? '90%' : '40%',
              opacity: expanded ? 0 : 1,
            }}
            aria-hidden
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 55%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 55%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(7,8,12,0.65) 50%, rgba(7,8,12,1) 100%)',
              }}
            />
          </div>

          {/* Toggle + Google link */}
          <div className="relative z-10 flex flex-col items-center gap-5 pt-6">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.07] px-6 py-3 text-sm font-semibold text-white/80
                         shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-[transform,box-shadow,background] hover:-translate-y-0.5 hover:bg-white/[0.11] hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
            >
              {expanded ? 'Show fewer' : 'Read more stories'}
              <ChevronDown
                className={`h-4 w-4 text-white/40 transition-transform duration-500 ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE }}
              href={GOOGLE_BUSINESS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white/35 hover:text-[#4DCCE8] transition-colors duration-200"
            >
              Read all reviews on Google
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  )
}
