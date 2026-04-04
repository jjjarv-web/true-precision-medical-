'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { MapPin, Phone, Clock, Navigation, ChevronRight } from 'lucide-react'
import { LOCATIONS } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const AZ_OVERVIEW = 'https://www.google.com/maps?q=Arizona&output=embed&z=6'

export default function LocationsMap() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [activeId, setActiveId]   = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const active = activeId ? LOCATIONS.find((l) => l.id === activeId) ?? null : null
  const mapSrc = active ? active.embedUrl : AZ_OVERVIEW

  function handleSelect(id: string) {
    if (id === activeId) return
    setMapLoaded(false)
    setActiveId(id)
  }

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-white to-[#f4f7fb]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Our Locations
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-brand-ink text-[clamp(28px,4vw,50px)] leading-tight mb-3">
            Closer than you think.<br className="hidden sm:block" />
            <span className="gradient-text">We&apos;re local.</span>
          </h2>
          <p className="text-brand-ink-secondary text-lg max-w-lg mx-auto leading-relaxed">
            {LOCATIONS.length} locations across the Valley — board-certified specialists ready to see you.
          </p>
        </motion.div>

        {/* Layout: location list + map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

          {/* ── Location list ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-2.5"
          >
            {LOCATIONS.map((loc, i) => {
              const isActive = activeId === loc.id
              return (
                <motion.button
                  key={loc.id}
                  onClick={() => handleSelect(loc.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className={`relative w-full text-left rounded-[1.4rem] border px-5 py-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-sky backdrop-blur-xl ${
                    isActive
                      ? 'bg-white border-brand-primary/18 shadow-[0_2px_8px_rgba(30,58,95,0.06),_0_16px_40px_rgba(30,58,95,0.13),_inset_0_1px_0_rgba(255,255,255,0.92)]'
                      : 'bg-[rgba(255,255,255,0.58)] border-[rgba(255,255,255,0.62)] shadow-[0_2px_6px_rgba(17,35,70,0.05),_0_10px_28px_rgba(17,35,70,0.07),_inset_0_1px_0_rgba(255,255,255,0.88)] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06),_0_16px_36px_rgba(30,58,95,0.11),_inset_0_1px_0_rgba(255,255,255,0.92)] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Active left accent bar */}
                  {isActive && (
                    <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-brand-primary rounded-full" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Pin badge */}
                      <div className={`mt-0.5 w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-primary shadow-[0_4px_12px_rgba(30,58,95,0.24)]'
                          : 'bg-brand-surface-blue shadow-[0_2px_8px_rgba(17,35,70,0.08)]'
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-brand-sky'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-heading font-bold text-sm leading-tight truncate transition-colors duration-200 ${
                          isActive ? 'text-brand-primary' : 'text-brand-ink'
                        }`}>
                          {loc.name}
                        </p>
                        <p className="text-brand-muted text-xs mt-0.5 truncate">{loc.address}</p>
                        <p className="text-brand-muted-light text-xs">{loc.city}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-all duration-200 ${
                      isActive ? 'text-brand-primary translate-x-0.5' : 'text-brand-muted-light'
                    }`} />
                  </div>

                  {/* Expanded detail — only on active */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 ml-12 flex flex-col gap-3">
                          {/* Phone */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: 'rgba(16,185,129,0.10)' }}>
                              <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#10b981' }} />
                            </div>
                            <a
                              href={`tel:${loc.phone.replace(/\D/g, '')}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm font-medium text-brand-ink hover:text-brand-sky transition-colors"
                            >
                              {loc.phone}
                            </a>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: 'rgba(251,146,60,0.10)' }}>
                              <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#f97316' }} />
                            </div>
                            <span className="text-sm text-brand-muted">{loc.hours}</span>
                          </div>

                          {/* Get Directions */}
                          <a
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 w-full flex items-center justify-center gap-2 rounded-[1.2rem] px-4 py-2.5 text-sm font-medium tracking-[0.01em] text-white transition-all duration-150 hover:-translate-y-0.5"
                            style={{
                              backgroundColor: 'var(--color-brand-primary)',
                              boxShadow: '0 4px 16px rgba(30,58,95,0.24), inset 0 1px 0 rgba(255,255,255,0.12)',
                            }}
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            Get Directions
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </motion.div>

          {/* ── Map ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="lg:col-span-3 relative rounded-[1.6rem] overflow-hidden min-h-[480px]"
            style={{
              boxShadow: '0 2px 8px rgba(30,58,95,0.06), 0 16px 56px rgba(30,58,95,0.16)',
              border: '1px solid rgba(30,58,95,0.08)',
            }}
          >
            {/* Top-edge vignette — softens the hard map border */}
            <div
              className="absolute inset-x-0 top-0 h-8 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)' }}
            />

            {/* Loading skeleton */}
            {!mapLoaded && (
              <div className="absolute inset-0 bg-brand-bg-alt flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3 text-brand-muted">
                  <MapPin className="w-7 h-7 animate-pulse text-brand-sky" />
                  <span className="text-sm font-medium">Loading map…</span>
                </div>
              </div>
            )}

            <iframe
              key={activeId ?? 'overview'}
              src={mapSrc}
              title={active ? `True Precision Medical — ${active.name}` : 'True Precision Medical — Arizona Locations'}
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: 'saturate(0.85) brightness(1.04) contrast(0.96)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
