'use client'

import { motion } from 'motion/react'
import { EASE } from '@/lib/constants'
import { Phone, MapPin, Clock, Navigation, ArrowRight } from 'lucide-react'
import LocationsMap from '@/components/sections/LocationsMap'
import type { Location, SiteSettings } from '@/lib/sanity'

function LocationCard({ loc, index }: { loc: Location; index: number }) {
  const streetLine = [loc.streetAddress, loc.suite].filter(Boolean).join(', ')
  const cityLine = [loc.city, loc.state, loc.postalCode].filter(Boolean).join(', ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className="rounded-2xl border border-black/[0.07] bg-white p-8 flex flex-col gap-6 hover:border-black/[0.12] hover:shadow-[0_4px_24px_rgba(26,24,20,0.06)] transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-8 h-8 rounded-xl bg-[#F9F7F4] border border-black/[0.06] flex items-center justify-center flex-shrink-0">
          <MapPin className="w-3.5 h-3.5 text-[#4DCCE8]" />
        </div>
        <h3 className="font-heading font-semibold text-[#1A1814] text-[16px] leading-snug tracking-[-0.02em]">
          {loc.name}
        </h3>
      </div>

      <div className="text-[13px] text-[#4A4440] leading-relaxed pl-11">
        <p>{streetLine}</p>
        <p className="text-[#9A9490]">{cityLine}</p>
      </div>

      {loc.hoursSummary.length > 0 && (
        <div className="flex items-start gap-3 pl-11">
          <Clock className="w-3.5 h-3.5 text-[#9A9490] mt-0.5 flex-shrink-0" />
          <div className="text-[12px] text-[#9A9490] space-y-1 leading-snug">
            {loc.hoursSummary.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      )}

      {loc.phone && (
        <div className="flex items-center gap-3 pl-11">
          <Phone className="w-3.5 h-3.5 text-[#9A9490] flex-shrink-0" />
          <a
            href={loc.phoneHref}
            className="text-[13px] text-[#4A4440] hover:text-[#1A1814] transition-colors"
          >
            {loc.phone}
          </a>
        </div>
      )}

      <a
        href={loc.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-auto pl-11 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A1814] hover:text-[#4DCCE8] transition-colors duration-200"
      >
        <Navigation className="w-3.5 h-3.5" />
        Get Directions
        <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  )
}

type Props = {
  locations: Location[]
  siteSettings: SiteSettings
}

export default function LocationsClient({ locations, siteSettings }: Props) {
  const hasLocations = locations.length > 0

  return (
    <main className="flex-grow">

      {/* ── Hero + Interactive map ──────────── dark (combined) */}
      {hasLocations && (
        <LocationsMap
          locations={locations}
          isPageHero
          sectionEyebrow="Our Locations"
          sectionHeadline="Find us near you."
          sectionDescription={`Most patients are seen within the week. ${locations.length} location${locations.length !== 1 ? 's' : ''} across Arizona.`}
        />
      )}

      {/* ── Location cards ──────────────────── cream */}
      {hasLocations && (
        <section className="bg-[#F9F7F4] py-32 sm:py-44">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block mb-14 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]"
            >
              All Locations
            </motion.span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {locations.map((loc, i) => (
                <LocationCard key={loc._id} loc={loc} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback — no Sanity locations */}
      {!hasLocations && (
        <section className="bg-[#07080C] pt-44 sm:pt-52 pb-32">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <span className="block mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Our Locations
            </span>
            <h1 className="font-heading font-bold text-[#EDE6D8] text-[clamp(38px,6vw,72px)] leading-[1.04] tracking-[-0.04em] mb-8">
              Find us near you.
            </h1>
            <p className="text-white/50 text-[16px]">
              Location details are being added — check back soon or call{' '}
              <a href={siteSettings.phoneHref} className="text-white font-semibold hover:text-[#4DCCE8] transition-colors">
                {siteSettings.phone}
              </a>
            </p>
          </div>
        </section>
      )}

      {/* ── Visit strip ─────────────────────── white */}
      <section className="bg-white py-28 sm:py-36">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="h-px bg-black/[0.06] mb-20 origin-left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'rgba(26,24,20,0.05)' }}>
            {[
              { title: 'Easy Parking', desc: 'Surface lots and covered structures at every site. No hospital maze.' },
              { title: 'Same-Day Discharge', desc: 'Every procedure is outpatient. You go home the same day, every time.' },
              { title: 'Seen Within the Week', desc: 'Most patients have a specialist appointment within 48 hours of calling.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="bg-white px-10 py-12 sm:px-12"
              >
                <h3 className="font-heading font-semibold text-[#1A1814] text-[18px] leading-snug mb-4">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#4A4440] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
