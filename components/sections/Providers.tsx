'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { ArrowRight, UserRound, Hand } from 'lucide-react'
import { PROVIDERS } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const PHOTO_SPEC = 'JPG or PNG · 800 × 1067 px'

function ProviderCard({
  provider,
  index,
  isTouch,
  onFirstTap,
  hintDismissed,
}: {
  provider: (typeof PROVIDERS)[number]
  index: number
  isTouch: boolean
  onFirstTap: () => void
  hintDismissed: boolean
}) {
  const [flipped, setFlipped] = useState(false)

  function handleTap() {
    if (!isTouch) return
    if (!flipped) onFirstTap()
    setFlipped((f) => !f)
  }

  const isActive = isTouch ? flipped : undefined // on desktop CSS group-hover handles it

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      className={isTouch ? '' : 'group'}
      style={{ perspective: '1000px' }}
      onClick={handleTap}
    >
      {/* Flip track */}
      <div
        className={`provider-flip-track relative w-full ${isTouch && flipped ? 'provider-flipped' : ''}`}
        style={{ aspectRatio: '3/4' }}
      >
        {/* ── FRONT ───────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {provider.photoUrl ? (
            <Image
              src={provider.photoUrl}
              alt={provider.name}
              fill
              className={`object-cover object-top transition-all duration-700 ease-out
                grayscale hover:grayscale-0
                ${!isTouch ? 'group-hover:scale-[1.04] group-hover:grayscale-0' : isActive ? 'scale-[1.04] grayscale-0' : ''}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#EEF4FB' }}>
              <div className="flex flex-col items-center gap-1 opacity-30">
                <div className="rounded-full" style={{ width: 56, height: 56, backgroundColor: '#1E3A5F' }} />
                <div className="rounded-t-full" style={{ width: 88, height: 52, backgroundColor: '#1E3A5F', marginTop: 6 }} />
              </div>
              <div className="text-center px-4 mt-2">
                <p className="text-xs font-semibold text-brand-primary/50 uppercase tracking-widest mb-1">Provider Photo</p>
                <p className="text-xs text-brand-muted-light leading-snug">{PHOTO_SPEC}</p>
              </div>
            </div>
          )}

          {/* Bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(13,27,62,0.22) 0%, transparent 45%)' }}
          />

          {/* Tap hint — touch only, fades once any card is tapped */}
          {isTouch && !hintDismissed && !flipped && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
              className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none"
            >
              <Hand className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/60 text-xs font-medium">Tap to learn more</span>
            </motion.div>
          )}
        </div>

        {/* ── BACK ────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col justify-between p-8"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#1E3A5F',
          }}
        >
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
              Meet Your Specialist
            </p>
            <h3 className="font-heading font-extrabold text-white text-2xl leading-tight mb-2">
              {provider.name}
            </h3>
            <p className="text-brand-sky-light text-sm font-medium">{provider.title}</p>
          </div>

          <div className="w-12 h-px bg-white/20" />

          <p className="text-white/70 text-sm leading-relaxed flex-1 flex items-center">
            {provider.bio ?? 'Fellowship-trained and board-certified specialist focused on minimally invasive care.'}
          </p>

          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
            Board Certified · Fellowship Trained
          </p>
        </div>
      </div>

      {/* Below-card: name+title ↔ CTA */}
      <div className="mt-4 px-1 relative h-14">
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-300 ${
            isTouch ? (flipped ? 'opacity-0' : 'opacity-100') : 'group-hover:opacity-0'
          }`}
        >
          <p className="font-heading font-bold text-brand-ink text-base leading-tight">{provider.name}</p>
          <p className="text-brand-muted text-sm mt-0.5">{provider.title}</p>
        </div>
        <div
          className={`absolute inset-0 flex items-center transition-opacity duration-300 ${
            isTouch ? (flipped ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-sky transition-colors duration-200"
          >
            Book a Consultation
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Providers() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [isTouch, setIsTouch]           = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
  }, [])

  const handleFirstTap = useCallback(() => {
    setHintDismissed(true)
  }, [])

  return (
    <section ref={ref} id="specialists" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <UserRound className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Our Specialists
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-brand-ink text-[clamp(28px,4vw,52px)] leading-tight mb-4">
            Which specialist is right for you?
          </h2>
          <p className="text-brand-ink-secondary text-lg max-w-lg mx-auto leading-relaxed">
            Every provider on our team is fellowship-trained and focused exclusively
            on minimally invasive care.
          </p>
        </motion.div>

        {/* ── Mobile: horizontal snap carousel (hidden on lg+) ── */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 -mx-6 px-6 pb-5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] lg:hidden">
          {PROVIDERS.map((provider, i) => (
            <div key={provider.id} className="snap-center flex-none w-[76vw] sm:w-[58vw]">
              <ProviderCard
                provider={provider}
                index={i}
                isTouch={isTouch}
                onFirstTap={handleFirstTap}
                hintDismissed={hintDismissed}
              />
            </div>
          ))}
        </div>

        {/* ── Desktop: auto-fill grid (hidden below lg) ── */}
        <div
          className="hidden lg:grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
        >
          {PROVIDERS.map((provider, i) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              index={i}
              isTouch={isTouch}
              onFirstTap={handleFirstTap}
              hintDismissed={hintDismissed}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
