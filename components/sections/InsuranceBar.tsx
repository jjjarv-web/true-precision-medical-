'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Search, CheckCircle2, Phone } from 'lucide-react'
import { INSURANCES } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type MatchState = 'idle' | 'match' | 'nomatch'

const IDLE_PILLS = ['Medicare', 'Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare', 'Cigna']
const REMAINING = INSURANCES.length - IDLE_PILLS.length

export default function InsuranceBar() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [query, setQuery]     = useState('')
  const [focused, setFocused] = useState(false)

  const normalised = query.trim().toLowerCase()

  const suggestions = useMemo(() => {
    if (!normalised) return []
    return INSURANCES.filter((i) =>
      i.name.toLowerCase().includes(normalised)
    ).slice(0, 5)
  }, [normalised])

  const matchState: MatchState = !normalised
    ? 'idle'
    : suggestions.length > 0
    ? 'match'
    : 'nomatch'

  const showDropdown = focused && normalised.length > 0 && suggestions.length > 0

  function handleSelect(name: string) {
    setQuery(name)
    setFocused(false)
  }

  return (
    <>
      <section
        ref={ref}
        className="relative z-10 bg-[#F9F7F4] pb-32 -mt-12 rounded-t-[2rem]"
        style={{ boxShadow: '0 -12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55)' }}
      >
        <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 pt-20 sm:pt-24"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted/60 mb-5 block">
              Insurance & Coverage
            </span>
            <h2 className="font-heading font-bold text-[#1A1814] text-[clamp(28px,4vw,48px)] leading-[1.08] tracking-[-0.03em] mb-4">
              Is your plan accepted?
            </h2>
            <p className="text-[#4A4440] text-base leading-relaxed">
              We accept most major insurance plans. Type yours below to confirm instantly.
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
                  ? '0 0 0 3px rgba(74,144,212,0.18), 0 8px 32px rgba(13,27,62,0.10)'
                  : matchState === 'match'
                  ? '0 0 0 2.5px rgba(91,183,166,0.30), 0 4px 20px rgba(13,27,62,0.07)'
                  : '0 2px 16px rgba(13,27,62,0.06)',
              }}
              transition={{ duration: 0.2 }}
              className="relative rounded-2xl"
            >
              <div className="relative flex items-center">
                <Search
                  className="absolute left-5 w-4.5 h-4.5 pointer-events-none z-10 transition-colors duration-200 w-[18px] h-[18px]"
                  style={{ color: focused ? '#4A90D4' : '#94A3B8' }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  placeholder="Search your insurance provider…"
                  className="w-full bg-white pl-13 pr-14 py-4 rounded-2xl border border-black/[0.07]
                             text-[#1A1814] text-base font-medium placeholder:text-[#9A9490]
                             outline-none transition-colors duration-200"
                  style={{ paddingLeft: '3.2rem' }}
                />
                <AnimatePresence mode="wait">
                  {matchState === 'match' && !focused && (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute right-5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-accent" />
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
                  {suggestions.map((ins) => (
                    <li key={ins.name}>
                      <button
                        onMouseDown={() => handleSelect(ins.name)}
                        className="w-full text-left px-5 py-3.5 text-sm font-medium text-[#1A1814]
                                   hover:bg-[#F9F7F4] transition-colors duration-150 flex items-center
                                   justify-between group"
                      >
                        <span>{ins.name}</span>
                        {ins.priority && (
                          <span className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            In-network
                          </span>
                        )}
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

              {matchState === 'match' && !focused && (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-center gap-2.5 bg-white border border-brand-accent/25
                             rounded-xl px-5 py-3 shadow-[0_2px_12px_rgba(91,183,166,0.12)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <p className="text-sm font-semibold text-[#1A1814]">
                    <span className="text-brand-accent">{query}</span> is accepted — you&apos;re covered.
                  </p>
                </motion.div>
              )}

              {matchState === 'nomatch' && (
                <motion.div
                  key="nomatch"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-center gap-2.5 bg-white border border-brand-sky/20
                             rounded-xl px-5 py-3 shadow-[0_2px_12px_rgba(74,144,212,0.08)]"
                >
                  <Phone className="w-4 h-4 text-brand-sky flex-shrink-0" />
                  <p className="text-sm text-[#4A4440]">
                    Don&apos;t see your plan?{' '}
                    <a href="tel:18005550199" className="font-semibold text-brand-sky hover:text-brand-primary transition-colors">
                      Call us
                    </a>
                    {' '}— we likely have options.
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
                      onMouseDown={() => { setQuery(name); setFocused(false) }}
                      className="px-3 py-1.5 rounded-full bg-white border border-black/[0.07] text-xs
                                 font-medium text-[#4A4440] hover:border-brand-sky/40
                                 hover:text-brand-sky transition-colors duration-200 cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                  <span className="px-3 py-1.5 rounded-full bg-transparent border border-black/[0.06]
                                   text-xs text-brand-muted-light select-none">
                    +{REMAINING} more
                  </span>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  )
}
