'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { MapPin, Phone, Clock, Navigation, ChevronRight } from 'lucide-react'
import { LOCATIONS } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Arizona overview shown before any location is selected
const AZ_OVERVIEW_URL =
  'https://www.google.com/maps?q=Phoenix+Metropolitan+Area+Arizona&output=embed&z=9'

export default function LocationsMap() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [activeId, setActiveId]   = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const active = activeId ? LOCATIONS.find((l) => l.id === activeId) ?? null : null

  // Arizona overview — zoomed out to show the full state
  const AZ_OVERVIEW = 'https://www.google.com/maps?q=Arizona&output=embed&z=6'

  const mapSrc = active ? active.embedUrl : AZ_OVERVIEW

  function handleSelect(id: string) {
    if (id === activeId) return
    setMapLoaded(false)
    setActiveId(id)
  }

  return (
    <section ref={ref} className="py-32 bg-white">
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
            className="lg:col-span-2 flex flex-col gap-2"
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
                  className={`w-full text-left rounded-2xl border px-5 py-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-sky ${
                    isActive
                      ? 'bg-white border-brand-primary/20 shadow-[0_4px_24px_rgba(30,58,95,0.10)]'
                      : 'bg-white/60 border-transparent hover:bg-white hover:border-brand-primary/10 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Pin indicator */}
                      <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        isActive ? 'bg-brand-primary' : 'bg-brand-surface-blue'
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
                        <div className="mt-4 ml-11 flex flex-col gap-3">
                          {/* Phone */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
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
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: 'rgba(251,146,60,0.10)' }}>
                              <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#f97316' }} />
                            </div>
                            <span className="text-sm text-brand-muted">{loc.hours}</span>
                          </div>

                          {/* Get Directions button */}
                          <a
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90 active:opacity-80"
                            style={{ backgroundColor: 'var(--color-brand-primary)' }}
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
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(30,58,95,0.12)] border border-brand-primary/8 min-h-[480px]"
          >
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
              style={{ filter: 'none' }}
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
