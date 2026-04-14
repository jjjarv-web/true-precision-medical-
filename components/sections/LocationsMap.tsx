'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { LOCATIONS } from '@/lib/constants'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function LocationsMap() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [activeId, setActiveId] = useState<string | null>(null)
  const active = activeId ? LOCATIONS.find((l) => l.id === activeId) ?? null : null

  return (
    <section
      ref={ref}
      className="relative bg-[#07080C]"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4 block">
            Our Locations
          </span>
          <h2
            className="font-heading font-bold text-[#EDE6D8] leading-[1.05] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Closer than you think.
          </h2>
          <p className="text-white/55 text-[15px] mt-3 max-w-sm leading-relaxed">
            Most patients are seen within the week. Easy parking at every site.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

          {/* Location list */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-2"
          >
            {LOCATIONS.map((loc, i) => {
              const isActive = activeId === loc.id
              return (
                <motion.button
                  key={loc.id}
                  onClick={() => setActiveId(isActive ? null : loc.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className={`relative w-full text-left rounded-2xl border px-5 py-4 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#4DCCE8]/50 ${
                    isActive
                      ? 'bg-white/[0.12] border-[#4DCCE8]/30'
                      : 'bg-white/[0.07] border-white/[0.12] hover:bg-white/[0.10] hover:border-white/[0.18]'
                  }`}
                >
                  {/* Aqua left accent */}
                  {isActive && (
                    <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#4DCCE8]" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isActive ? 'bg-[#4DCCE8]/15' : 'bg-white/[0.05]'
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 transition-colors duration-200 ${
                          isActive ? 'text-[#4DCCE8]' : 'text-white/30'
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-heading font-semibold text-sm leading-tight transition-colors duration-200 ${
                          isActive ? 'text-[#EDE6D8]' : 'text-white/70'
                        }`}>
                          {loc.name}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5">{loc.address}</p>
                        <p className="text-white/30 text-xs">{loc.city}</p>
                      </div>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-all duration-200 ${
                      isActive ? 'bg-[#4DCCE8]' : 'bg-white/15'
                    }`} />
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.26, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 ml-11 flex flex-col gap-3">

                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.06]">
                              <Phone className="w-3 h-3 text-white/40" />
                            </div>
                            <a
                              href={`tel:${loc.phone.replace(/\D/g, '')}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-white/50 hover:text-[#4DCCE8] transition-colors"
                            >
                              {loc.phone}
                            </a>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.06]">
                              <Clock className="w-3 h-3 text-white/40" />
                            </div>
                            <span className="text-sm text-white/40">{loc.hours}</span>
                          </div>

                          <a
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#07080C] bg-[#4DCCE8] hover:bg-[#6DD8EE] transition-colors duration-150"
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

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[480px]"
            style={{ border: '1px solid rgba(255,255,255,0.07)', filter: 'brightness(1.35)' }}
          >
            <LeafletMap
              locations={LOCATIONS.map(({ id, lat, lng }) => ({ id, lat, lng }))}
              activeId={activeId}
              onSelect={setActiveId}
            />

            {/* Attribution overlay — bottom right */}
            <div className="absolute bottom-2 right-2 z-[1000] text-[9px] text-white/20 pointer-events-none select-none">
              © OpenStreetMap · CARTO
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
