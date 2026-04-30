'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Search, CheckCircle2, AlertCircle, Phone } from 'lucide-react'
import {
  getCarrierSuggestions,
  isOutOfNetwork,
  isKnownCarrier,
} from '@/lib/insurance-data'
import type { InsuranceSettings, SiteSettings } from '@/lib/sanity'
import { EASE, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

type MatchState = 'idle' | 'pass' | 'fail' | 'unknown'


type Props = {
  settings: InsuranceSettings
  site?: SiteSettings
}

export default function InsuranceBar({ settings, site }: Props) {
  const phone = site?.phone ?? PHONE_NUMBER
  const phoneHref = site?.phoneHref ?? PHONE_HREF
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-110px' })

  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [selectedCarrier, setSelectedCarrier] = useState<string | null>(null)

  const normalised = query.trim().toLowerCase()

  const suggestions = useMemo(() => getCarrierSuggestions(query), [query])

  const matchState: MatchState = useMemo(() => {
    if (!query.trim()) return 'idle'
    if (!selectedCarrier) return 'idle'

    if (isOutOfNetwork(selectedCarrier, settings.outOfNetworkCarriers)) return 'fail'
    if (isKnownCarrier(selectedCarrier)) return 'pass'
    return 'unknown'
  }, [query, selectedCarrier, settings.outOfNetworkCarriers])

  const showDropdown = focused && normalised.length > 0 && suggestions.length > 0

  function handleSelect(name: string) {
    setQuery(name)
    setSelectedCarrier(name)
    setFocused(false)
  }

  function handleInputChange(value: string) {
    setQuery(value)
    setSelectedCarrier(null)
  }

  function handleInputBlur() {
    setTimeout(() => {
      setFocused(false)
      // If user typed something and blurred without selecting, check if it's a known carrier
      if (query.trim() && !selectedCarrier) {
        if (isKnownCarrier(query.trim())) {
          setSelectedCarrier(query.trim())
        } else if (query.trim().length > 3) {
          // Unknown carrier — show unknown state
          setSelectedCarrier(query.trim())
        }
      }
    }, 150)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    e.preventDefault()
    if (!query.trim()) return
    const choice = suggestions[0] ?? query.trim()
    handleSelect(choice)
    e.currentTarget.blur()
  }

  const FEATURED_INSURERS = [
    'Medicare', 'Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare',
    'Cigna', 'Humana', 'Tricare', 'Anthem',
  ]

  return (
    <section ref={ref} className="bg-[#07080C]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 sm:pt-24 pb-28 sm:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: headline + search ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-5 block">
              Insurance & Coverage
            </span>
            <h2 className="font-heading font-semibold text-[#EDE6D8] leading-[1.04] tracking-[-0.04em] mb-5"
                style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              Your plan is almost<br className="hidden sm:block" /> certainly covered.
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed mb-8">
              We accept most major insurance plans. Type yours below to confirm in seconds.
            </p>

            {/* Search input */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-2.5">
              Check your plan
            </p>
            <div className="relative mb-4">
              <motion.div
                animate={{
                  boxShadow: focused
                    ? '0 0 0 3px rgba(77,204,232,0.18), 0 8px 32px rgba(0,0,0,0.25)'
                    : matchState === 'pass'
                    ? '0 0 0 2.5px rgba(77,204,232,0.28), 0 4px 20px rgba(0,0,0,0.18)'
                    : matchState === 'fail'
                    ? '0 0 0 2.5px rgba(239,68,68,0.20), 0 4px 20px rgba(0,0,0,0.18)'
                    : '0 2px 16px rgba(0,0,0,0.20)',
                }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl"
              >
                <div className="relative flex items-center">
                  <Search
                    className="absolute left-5 pointer-events-none z-10 transition-colors duration-200 w-[18px] h-[18px]"
                    style={{ color: focused ? '#4DCCE8' : '#9A9490' }}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Search your insurance provider…"
                    className="w-full bg-white/[0.08] border border-white/[0.10] pl-13 pr-14 py-4 rounded-2xl
                               text-white text-base font-medium placeholder:text-white/30
                               outline-none transition-colors duration-200"
                    style={{ paddingLeft: '3.2rem' }}
                  />
                  <AnimatePresence mode="wait">
                    {matchState === 'pass' && !focused && (
                      <motion.span key="check" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2, ease: EASE }} className="absolute right-5">
                        <CheckCircle2 className="w-5 h-5 text-[#4DCCE8]" />
                      </motion.span>
                    )}
                    {matchState === 'fail' && !focused && (
                      <motion.span key="alert" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2, ease: EASE }} className="absolute right-5">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.ul key="dropdown" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 3 }} transition={{ duration: 0.18, ease: EASE }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#1A1B20] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.40)] overflow-hidden z-50"
                  >
                    {suggestions.map((name) => (
                      <li key={name}>
                        <button onMouseDown={() => handleSelect(name)}
                          className="w-full text-left px-5 py-3.5 text-sm font-medium text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors duration-150"
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* State feedback */}
            <div className="min-h-[52px] flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {matchState === 'pass' && !focused && (
                  <motion.div key="pass" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-start gap-2.5 bg-white/[0.07] border border-[#4DCCE8]/25 rounded-xl px-5 py-3.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4DCCE8] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/70 leading-snug">{settings.passMessage}</p>
                  </motion.div>
                )}
                {matchState === 'fail' && !focused && (
                  <motion.div key="fail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                    className="flex flex-col gap-3 bg-white/[0.06] border border-amber-400/20 rounded-xl px-5 py-4"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-white/60 leading-snug">{settings.failMessage}</p>
                    </div>
                    <a href={phoneHref}
                      className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold text-[#1A1814] bg-[#D4C4A8] hover:bg-[#C9B896] transition-colors duration-150"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Call {phone}
                    </a>
                  </motion.div>
                )}
                {matchState === 'unknown' && !focused && (
                  <motion.div key="unknown" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-start gap-2.5 bg-white/[0.06] border border-white/[0.09] rounded-xl px-5 py-3.5"
                  >
                    <Phone className="w-4 h-4 text-[#4DCCE8] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/55 leading-snug">{settings.unknownMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right: insurance grid ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {FEATURED_INSURERS.map((name) => (
                <button
                  key={name}
                  onMouseDown={() => handleSelect(name)}
                  className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-4 text-center cursor-pointer
                             hover:bg-white/[0.10] hover:border-[#4DCCE8]/30 hover:text-[#4DCCE8] transition-all duration-200 group"
                >
                  <span className="text-[13px] font-medium text-white/55 group-hover:text-[#4DCCE8] transition-colors duration-200 leading-snug">{name}</span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-[12px] text-white/30 text-center tracking-wide">
              + 150 more accepted plans
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
