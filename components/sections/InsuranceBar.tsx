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
import { PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type MatchState = 'idle' | 'pass' | 'fail' | 'unknown'

const IDLE_PILLS = [
  'Medicare',
  'Blue Cross Blue Shield',
  'Aetna',
  'UnitedHealthcare',
  'Cigna',
]

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

  return (
    <section
      ref={ref}
      className="relative z-10 -mt-12 rounded-t-[2rem] pb-28"
      style={{
        background: 'linear-gradient(to bottom, #F9F7F4 0%, #F9F7F4 60%, #ffffff 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
      }}
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 pt-28 sm:pt-32"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-5 block">
            Insurance & Coverage
          </span>
          <h2 className="font-heading font-bold text-[#1A1814] text-[clamp(28px,4vw,48px)] leading-[1.08] tracking-[-0.04em] mb-4">
            Your plan is almost<br className="hidden sm:block" /> certainly covered.
          </h2>
          <p className="text-[#4A4440] text-base leading-relaxed">
            We accept most major insurance plans. Type yours to confirm in seconds.
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="relative mb-6"
        >
          <motion.div
            animate={{
              boxShadow: focused
                ? '0 0 0 3px rgba(77,204,232,0.18), 0 8px 32px rgba(26,24,20,0.08)'
                : matchState === 'pass'
                ? '0 0 0 2.5px rgba(77,204,232,0.28), 0 4px 20px rgba(26,24,20,0.06)'
                : matchState === 'fail'
                ? '0 0 0 2.5px rgba(239,68,68,0.20), 0 4px 20px rgba(26,24,20,0.06)'
                : '0 2px 16px rgba(26,24,20,0.06)',
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
                className="w-full bg-white pl-13 pr-14 py-4 rounded-2xl border border-black/[0.07]
                           text-[#1A1814] text-base font-medium placeholder:text-[#9A9490]
                           outline-none transition-colors duration-200"
                style={{ paddingLeft: '3.2rem' }}
              />
              <AnimatePresence mode="wait">
                {matchState === 'pass' && !focused && (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="absolute right-5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#4DCCE8]" />
                  </motion.span>
                )}
                {matchState === 'fail' && !focused && (
                  <motion.span
                    key="alert"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="absolute right-5"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                key="dropdown"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border
                           border-black/[0.06] shadow-[0_8px_32px_rgba(13,27,62,0.10)]
                           overflow-hidden z-50"
              >
                {suggestions.map((name) => (
                  <li key={name}>
                    <button
                      onMouseDown={() => handleSelect(name)}
                      className="w-full text-left px-5 py-3.5 text-sm font-medium text-[#1A1814]
                                 hover:bg-[#F9F7F4] transition-colors duration-150"
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* State feedback */}
        <div className="min-h-[52px] flex flex-col items-center justify-center gap-4">
          <AnimatePresence mode="wait">

            {matchState === 'pass' && !focused && (
              <motion.div
                key="pass"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-start gap-2.5 bg-white border border-[#4DCCE8]/25
                           rounded-xl px-5 py-3.5 shadow-[0_2px_12px_rgba(77,204,232,0.10)] max-w-md text-left"
              >
                <CheckCircle2 className="w-4 h-4 text-[#4DCCE8] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#1A1814] leading-snug">
                  {settings.passMessage}
                </p>
              </motion.div>
            )}

            {matchState === 'fail' && !focused && (
              <motion.div
                key="fail"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex flex-col gap-3 bg-white border border-amber-200
                           rounded-xl px-5 py-4 shadow-[0_2px_12px_rgba(245,158,11,0.08)] max-w-md text-left"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#4A4440] leading-snug">
                    {settings.failMessage}
                  </p>
                </div>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 w-full
                             rounded-xl px-4 py-3 text-sm font-semibold text-[#EDE6D8]
                             bg-[#1A1814] hover:bg-[#2a2520] transition-colors duration-150"
                  style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.18)' }}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call {phone}
                </a>
              </motion.div>
            )}

            {matchState === 'unknown' && !focused && (
              <motion.div
                key="unknown"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-start gap-2.5 bg-white border border-black/[0.08]
                           rounded-xl px-5 py-3.5 shadow-[0_2px_12px_rgba(26,24,20,0.05)] max-w-md text-left"
              >
                <Phone className="w-4 h-4 text-[#4DCCE8] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#4A4440] leading-snug">
                  {settings.unknownMessage}
                </p>
              </motion.div>
            )}

            {matchState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {IDLE_PILLS.map((name) => (
                  <button
                    key={name}
                    onMouseDown={() => handleSelect(name)}
                    className="px-3 py-1.5 rounded-full bg-white border border-black/[0.07] text-xs
                               font-medium text-[#4A4440] hover:border-[#4DCCE8]/40
                               hover:text-[#4DCCE8] transition-colors duration-200 cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
