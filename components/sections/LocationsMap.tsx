'use client'

import dynamic from 'next/dynamic'
import { EASE } from '@/lib/constants'
import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import type { Location } from '@/lib/sanity'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

type Props = {
  locations: Location[]
  sectionEyebrow?: string
  sectionHeadline?: string
  sectionDescription?: string
  isPageHero?: boolean
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

        {/* Map — full width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            height: 'clamp(480px, 52vw, 640px)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.09)',
          }}
        >
          <LeafletMap
            locations={locations.map(({ _id, lat, lng, name, streetAddress, suite, city, state, postalCode, phone, phoneHref, hoursSummary, mapsUrl }) => ({
              id: _id, lat, lng, name, streetAddress, suite, city, state, postalCode, phone, phoneHref, hoursSummary, mapsUrl,
            }))}
            activeId={activeId}
            onSelect={setActiveId}
          />

          {/* Subtle edge fade — top + bottom only */}
          <div
            className="absolute inset-0 pointer-events-none z-[999]"
            style={{
              background: `
                linear-gradient(to bottom, #FDFCFA 0%, transparent 6%),
                linear-gradient(to top,    #F9F7F4 0%, transparent 6%)
              `,
            }}
          />

          {/* Attribution */}
          <div className="absolute bottom-2 right-2 z-[1000] text-[9px] text-black/20 pointer-events-none select-none">
            © OpenStreetMap · CARTO
          </div>
        </motion.div>

      </div>
    </section>
  )
}
