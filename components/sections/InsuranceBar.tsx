'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Search, CheckCircle2, Phone, ShieldCheck } from 'lucide-react'
import { INSURANCES } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type MatchState = 'idle' | 'match' | 'nomatch'

export default function InsuranceBar() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [query, setQuery]         = useState('')
  const [focused, setFocused]     = useState(false)

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
    <section
      ref={ref}
      className="relative z-0 py-32 bg-white"
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Insurance Accepted
            </span>
          </div>
          <h2 className="font-heading font-bold text-brand-ink text-[clamp(28px,4vw,46px)] leading-tight mb-3">
            Is your insurance accepted?
          </h2>
          <p className="text-brand-ink-secondary text-lg mb-10 leading-relaxed">
            Most major plans accepted. Type your provider to check instantly.
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
          className="relative"
        >
          {/* Input wrapper */}
          <motion.div
            animate={{
              boxShadow: focused
                ? '0 0 0 3px rgba(74,144,212,0.22), 0 8px 32px rgba(30,58,95,0.12)'
                : matchState === 'match'
                ? '0 0 0 3px rgba(91,183,166,0.25), 0 4px 20px rgba(30,58,95,0.08)'
                : matchState === 'nomatch'
                ? '0 0 0 2px rgba(30,58,95,0.10), 0 4px 20px rgba(30,58,95,0.06)'
                : '0 2px 16px rgba(30,58,95,0.07)',
            }}
            transition={{ duration: 0.25 }}
            className="relative rounded-2xl overflow-visible"
          >
            <div className="relative flex items-center">
              <Search
                className="absolute left-5 w-5 h-5 pointer-events-none z-10 transition-colors duration-200"
                style={{ color: focused ? '#4A90D4' : '#94A3B8' }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Enter your insurance provider…"
                className="w-full bg-white pl-14 pr-14 py-5 rounded-2xl border border-brand-primary/10
                           text-brand-ink text-lg font-medium placeholder:text-brand-muted-light
                           outline-none transition-colors duration-200"
              />
              {/* State icon right side */}
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

          {/* Dropdown suggestions */}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                key="dropdown"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border
                           border-brand-primary/10 shadow-[0_8px_32px_rgba(30,58,95,0.12)]
                           overflow-hidden z-50"
              >
                {suggestions.map((ins) => (
                  <li key={ins.name}>
                    <button
                      onMouseDown={() => handleSelect(ins.name)}
                      className="w-full text-left px-6 py-4 text-base font-medium text-brand-ink
                                 hover:bg-brand-bg-alt transition-colors duration-150 flex items-center
                                 justify-between group"
                    >
                      <span>{ins.name}</span>
                      {ins.priority && (
                        <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                          Priority
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Result state */}
        <div className="mt-6 min-h-[56px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {matchState === 'match' && !focused && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-center gap-2.5 bg-brand-surface-teal border border-brand-accent/20
                           rounded-xl px-6 py-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <p className="text-sm font-semibold text-brand-ink">
                  Great news —{' '}
                  <span className="text-brand-accent">{query}</span>{' '}
                  is accepted. You&apos;re covered.
                </p>
              </motion.div>
            )}

            {matchState === 'nomatch' && (
              <motion.div
                key="nomatch"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-center gap-2.5 bg-brand-surface-blue border border-brand-sky/20
                           rounded-xl px-6 py-3.5"
              >
                <Phone className="w-4 h-4 text-brand-sky flex-shrink-0" />
                <p className="text-sm font-medium text-brand-ink">
                  Not sure about your plan?{' '}
                  <a
                    href="tel:18005550199"
                    className="font-semibold text-brand-sky hover:text-brand-primary transition-colors"
                  >
                    Call us
                  </a>
                  {' '}— we likely still have options.
                </p>
              </motion.div>
            )}

            {matchState === 'idle' && (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-brand-muted-light"
              >
                Medicare, Aetna, BCBS, Cigna, UnitedHealthcare &amp; more
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
