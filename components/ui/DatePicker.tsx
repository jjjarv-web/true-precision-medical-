'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '@/lib/constants'

type Props = {
  value: string
  onChange: (value: string) => void
  minDate?: string
  placeholder?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
const DISPLAY_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const POPOVER_WIDTH = 320
const POPOVER_HEIGHT = 340
const VIEWPORT_MARGIN = 12
const OFFSET = 8

function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function fromISODate(iso: string | undefined): Date | null {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

function startOfDay(date: Date): Date {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export default function DatePicker({ value, onChange, minDate, placeholder = 'Select a date' }: Props) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const selected = useMemo(() => fromISODate(value), [value])
  const min = useMemo(() => (minDate ? fromISODate(minDate) : null), [minDate])
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewDate, setViewDate] = useState<Date>(() => selected ?? today)
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null)

  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    setViewDate(selected ?? today)
  }, [open, selected, today])

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return

    function updatePosition() {
      const triggerEl = triggerRef.current
      if (!triggerEl) return
      const rect = triggerEl.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      const width = Math.min(POPOVER_WIDTH, vw - VIEWPORT_MARGIN * 2)

      let left = rect.left
      if (left + width > vw - VIEWPORT_MARGIN) left = vw - VIEWPORT_MARGIN - width
      if (left < VIEWPORT_MARGIN) left = VIEWPORT_MARGIN

      let top = rect.bottom + OFFSET
      if (top + POPOVER_HEIGHT > vh - VIEWPORT_MARGIN) {
        const flipped = rect.top - OFFSET - POPOVER_HEIGHT
        if (flipped >= VIEWPORT_MARGIN) top = flipped
      }

      setCoords({ top, left, width })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onDocPointer(e: MouseEvent) {
      const t = e.target as Node
      if (triggerRef.current?.contains(t)) return
      if (popoverRef.current?.contains(t)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const grid = useMemo(() => {
    const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
    const startWeekday = firstOfMonth.getDay()
    const gridStart = new Date(firstOfMonth)
    gridStart.setDate(1 - startWeekday)
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart)
      d.setDate(gridStart.getDate() + i)
      return d
    })
  }, [viewDate])

  const displayLabel = selected ? DISPLAY_FORMATTER.format(selected) : placeholder

  function goPrevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }
  function goNextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  function selectDate(d: Date) {
    if (min && d < min) return
    onChange(toISODate(d))
    setOpen(false)
  }

  const minMonth = min ? new Date(min.getFullYear(), min.getMonth(), 1) : null
  const prevDisabled = minMonth
    ? new Date(viewDate.getFullYear(), viewDate.getMonth(), 1) <= minMonth
    : false

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-3 bg-white border rounded-xl px-4 py-3 text-[15px] text-left outline-none transition-all duration-200 ${
          open
            ? 'border-[#4DCCE8]/60 ring-2 ring-[#4DCCE8]/10'
            : 'border-black/[0.08] hover:border-black/[0.16]'
        }`}
      >
        <span className={selected ? 'text-[#1A1814]' : 'text-[#C4BEBB]'}>{displayLabel}</span>
        <Calendar className="w-4 h-4 text-[#9A9490] flex-shrink-0" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && coords && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: EASE }}
                role="dialog"
                aria-label="Choose a date"
                className="rounded-2xl bg-white border border-black/[0.08] p-4 origin-top"
                style={{
                  position: 'fixed',
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  zIndex: 1000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={goPrevMonth}
                    disabled={prevDisabled}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A4440] hover:bg-black/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[14px] font-semibold text-[#1A1814]">
                    {MONTH_FORMATTER.format(viewDate)}
                  </span>
                  <button
                    type="button"
                    onClick={goNextMonth}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A4440] hover:bg-black/[0.04] transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                  {WEEKDAYS.map((w) => (
                    <div
                      key={w}
                      className="h-7 flex items-center justify-center text-[11px] font-medium text-[#9A9490]"
                    >
                      {w}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {grid.map((d) => {
                    const inMonth = d.getMonth() === viewDate.getMonth()
                    const disabled = min ? d < min : false
                    const isSelected = selected ? isSameDay(d, selected) : false
                    const isToday = isSameDay(d, today)

                    const base =
                      'h-9 w-full rounded-lg text-[13px] font-medium transition-all duration-150 flex items-center justify-center'
                    let state = ''
                    if (isSelected) {
                      state = 'bg-[#4DCCE8] text-[#07080C]'
                    } else if (disabled) {
                      state = 'text-[#D9D3CF] cursor-not-allowed'
                    } else if (!inMonth) {
                      state = 'text-[#C4BEBB] hover:bg-black/[0.03]'
                    } else {
                      state = 'text-[#1A1814] hover:bg-black/[0.04]'
                    }
                    const todayRing = isToday && !isSelected ? 'ring-1 ring-[#4DCCE8]/50' : ''

                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDate(d)}
                        aria-pressed={isSelected}
                        aria-label={DISPLAY_FORMATTER.format(d)}
                        className={`${base} ${state} ${todayRing}`}
                      >
                        {d.getDate()}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}
