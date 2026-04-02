'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { MapPin, Phone, Clock, ArrowRight, Navigation } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Placeholder — update with real address
const LOCATION = {
  name:    'True Precision Medical — Scottsdale',
  address: '8752 E Pinnacle Peak Rd, Suite 100',
  city:    'Scottsdale, AZ 85255',
  phone:   '(480) 555-0199',
  hours:   'Mon – Fri: 8am – 5pm',
  mapsUrl: 'https://maps.google.com/?q=8752+E+Pinnacle+Peak+Rd+Scottsdale+AZ+85255',
  embedUrl:
    'https://www.google.com/maps?q=Scottsdale,+AZ+85255&output=embed&z=13',
}

export default function LocationsMap() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section ref={ref} className="py-32" style={{ backgroundColor: 'var(--color-brand-bg-alt)' }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">

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
              Find Us
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-brand-ink text-[clamp(28px,4vw,50px)] leading-tight mb-3">
            We&apos;re real. We&apos;re local.<br className="hidden sm:block" />
            And we&apos;re probably closer than you think.
          </h2>
          <p className="text-brand-ink-secondary text-lg max-w-lg mx-auto leading-relaxed">
            12 locations across the Valley — board-certified specialists ready to see you.
          </p>
        </motion.div>

        {/* Card + Map grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

          {/* Location card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col justify-between bg-white border border-brand-primary/10 rounded-2xl p-8 shadow-[0_4px_32px_rgba(30,58,95,0.08)]"
          >
            <div>
              <p className="font-heading font-bold text-brand-ink text-lg mb-6 leading-snug">
                {LOCATION.name}
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-brand-sky" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-ink">{LOCATION.address}</p>
                    <p className="text-sm text-brand-muted">{LOCATION.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface-teal flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-brand-accent" />
                  </div>
                  <a
                    href={`tel:${LOCATION.phone.replace(/\D/g, '')}`}
                    className="text-sm font-medium text-brand-ink hover:text-brand-sky transition-colors"
                  >
                    {LOCATION.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface-warm flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-sm font-medium text-brand-ink">{LOCATION.hours}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-[0_2px_16px_rgba(30,58,95,0.25)] hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-sky hover:text-brand-primary transition-colors"
              >
                See all 12 locations
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(30,58,95,0.12)] border border-brand-primary/8 min-h-[360px]"
          >
            {/* Skeleton shimmer while loading */}
            {!mapLoaded && (
              <div className="absolute inset-0 bg-brand-bg-alt flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3 text-brand-muted">
                  <MapPin className="w-8 h-8 animate-pulse text-brand-sky" />
                  <span className="text-sm font-medium">Loading map…</span>
                </div>
              </div>
            )}
            <iframe
              src={LOCATION.embedUrl}
              title="True Precision Medical location map"
              className="absolute inset-0 w-full h-full border-0"
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
