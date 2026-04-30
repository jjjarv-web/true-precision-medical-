'use client'

import dynamic from 'next/dynamic'
import { EASE } from '@/lib/constants'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { MapPin, Phone, Clock, Navigation, ChevronRight } from 'lucide-react'
import type { Location } from '@/lib/sanity'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

type Props = {
  locations: Location[]
  /** Optional — defaults preserve homepage copy. Use on /locations to avoid duplicating the page hero. */
  sectionEyebrow?: string
  sectionHeadline?: string
  sectionDescription?: string
  /** When true, bumps top padding to clear the fixed nav and renders the headline as h1. */
  isPageHero?: boolean
}

function formatCityLine(loc: Location) {
  const suffix = [loc.state, loc.postalCode].filter(Boolean).join(' ')
  return [loc.city, suffix].filter(Boolean).join(', ')
}

function formatStreetLine(loc: Location) {
  return [loc.streetAddress, loc.suite].filter(Boolean).join(', ')
}

export default function LocationsMap({
  locations,
  sectionEyebrow = 'Our Locations',
  sectionHeadline = 'Find us near you.',
  sectionDescription = 'Most patients are seen within the week. Easy parking at every site.',
  isPageHero = false,
}: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [activeId, setActiveId] = useState<string | null>(null)

  if (locations.length === 0) return null

  return (
    <section
      ref={ref}
      className="relative"
      style={{ background: 'linear-gradient(180deg, #FDFCFA 0%, #F9F7F4 100%)', isolation: 'isolate' }}
    >
      <div className={`max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pb-28 sm:pb-36 ${isPageHero ? 'pt-44 sm:pt-52' : 'pt-28 sm:pt-36'}`}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-4 block">
            {sectionEyebrow}
          </span>
          {isPageHero ? (
            <h1
              className="font-heading font-semibold text-[#1A1814] leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(34px, 5.5vw, 64px)' }}
            >
              {sectionHeadline}
            </h1>
          ) : (
            <h2
              className="font-heading font-semibold text-[#1A1814] leading-[1.04] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(26px, 3.8vw, 44px)' }}
            >
              {sectionHeadline}
            </h2>
          )}
          <p className="text-[#4A4440] text-[15px] mt-3 max-w-sm leading-relaxed">
            {sectionDescription}
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
            {locations.map((loc, i) => {
              const isActive = activeId === loc._id
              const streetLine = formatStreetLine(loc)
              const cityLine = formatCityLine(loc)
              return (
                <motion.button
                  key={loc._id}
                  onClick={() => setActiveId(isActive ? null : loc._id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className={`relative w-full text-left rounded-2xl border px-6 py-5 transition-all duration-250 outline-none focus-visible:ring-2 focus-visible:ring-[#4DCCE8]/40 ${
                    isActive
                      ? 'bg-white border-[#4DCCE8]/45 shadow-[0_2px_6px_rgba(0,0,0,0.05),0_8px_28px_rgba(77,204,232,0.11)]'
                      : 'bg-white border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.05)] hover:border-[#4DCCE8]/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.07),0_10px_28px_rgba(0,0,0,0.07)]'
                  }`}
                >
                  {/* Aqua left accent */}
                  <div className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-full transition-all duration-250 ${
                    isActive ? 'bg-[#4DCCE8] opacity-100' : 'bg-transparent opacity-0'
                  }`} />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isActive ? 'bg-[#4DCCE8]/12' : 'bg-black/[0.04]'
                      }`}>
                        <MapPin className={`w-4 h-4 transition-colors duration-200 ${
                          isActive ? 'text-[#4DCCE8]' : 'text-[#9A9490]'
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-heading font-semibold text-[15px] leading-tight transition-colors duration-200 ${
                          isActive ? 'text-[#1A1814]' : 'text-[#2E2B28]'
                        }`}>
                          {loc.name}
                        </p>
                        <p className="text-[#9A9490] text-xs mt-1 leading-relaxed">
                          {streetLine}{cityLine ? `, ${cityLine}` : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                      isActive ? 'text-[#4DCCE8] rotate-90' : 'text-black/20'
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
                        <div className="mt-4 pt-4 border-t border-black/[0.06] flex flex-col gap-3">

                          {loc.phone && (
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-black/[0.04]">
                                <Phone className="w-3 h-3 text-[#9A9490]" />
                              </div>
                              <a
                                href={loc.phoneHref}
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm text-[#4A4440] hover:text-[#4DCCE8] transition-colors font-medium"
                              >
                                {loc.phone}
                              </a>
                            </div>
                          )}

                          {loc.hoursSummary.length > 0 && (
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-black/[0.04]">
                                <Clock className="w-3 h-3 text-[#9A9490]" />
                              </div>
                              <div className="text-sm text-[#9A9490] space-y-0.5 leading-snug">
                                {loc.hoursSummary.map((line) => (
                                  <div key={line}>{line}</div>
                                ))}
                              </div>
                            </div>
                          )}

                          <a
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#07080C] bg-[#4DCCE8] hover:bg-[#6DD8EE] transition-colors duration-150"
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
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
          >
            <LeafletMap
              locations={locations.map(({ _id, lat, lng }) => ({ id: _id, lat, lng }))}
              activeId={activeId}
              onSelect={setActiveId}
            />

            {/* Edge fade — blends map into section background */}
            <div
              className="absolute inset-0 pointer-events-none z-[999]"
              style={{
                background: `
                  linear-gradient(to right,  #F9F7F4 0%, transparent 8%),
                  linear-gradient(to left,   #F9F7F4 0%, transparent 8%),
                  linear-gradient(to bottom, #FDFCFA 0%, transparent 8%),
                  linear-gradient(to top,    #F9F7F4 0%, transparent 8%)
                `,
              }}
            />

            {/* Attribution overlay — bottom right */}
            <div className="absolute bottom-2 right-2 z-[1000] text-[9px] text-black/20 pointer-events-none select-none">
              © OpenStreetMap · CARTO
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
