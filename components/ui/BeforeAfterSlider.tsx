'use client'

import Image from 'next/image'
import { GripVertical } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  altBefore: string
  altAfter: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  altBefore,
  altAfter,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [pct, setPct] = useState(50)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - r.left, 0), r.width)
    setPct(r.width > 0 ? (x / r.width) * 100 : 50)
  }, [])

  useEffect(() => {
    const stop = () => {
      draggingRef.current = false
    }
    window.addEventListener('blur', stop)
    return () => window.removeEventListener('blur', stop)
  }, [])

  function startDrag(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.preventDefault()
    draggingRef.current = true
    setFromClientX(e.clientX)

    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return
      setFromClientX(ev.clientX)
    }
    const onEnd = () => {
      draggingRef.current = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onEnd)
      window.removeEventListener('pointercancel', onEnd)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onEnd)
    window.addEventListener('pointercancel', onEnd)
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label="Before and after comparison. Drag horizontally to compare."
      aria-orientation="horizontal"
      className="relative w-full cursor-ew-resize select-none touch-none rounded-[1.25rem] sm:rounded-[1.6rem] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f8fc]"
      style={{ aspectRatio: '4/3' }}
      onPointerDown={startDrag}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 10 : 5
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setPct((p) => Math.max(0, p - step))
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          setPct((p) => Math.min(100, p + step))
        }
        if (e.key === 'Home') {
          e.preventDefault()
          setPct(0)
        }
        if (e.key === 'End') {
          e.preventDefault()
          setPct(100)
        }
      }}
    >
      <Image
        src={afterSrc}
        alt={altAfter}
        fill
        draggable={false}
        className="object-cover pointer-events-none"
        sizes="(max-width: 1024px) 100vw, 800px"
        priority
      />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - pct}% 0 0)`,
        }}
      >
        <Image
          src={beforeSrc}
          alt={altBefore}
          fill
          draggable={false}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
          priority
        />
      </div>

      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[3] px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-black/45 backdrop-blur-md border border-white/15">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[3] px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-black/45 backdrop-blur-md border border-white/15">
        {afterLabel}
      </div>

      <div
        className="absolute top-0 bottom-0 z-[2] w-px bg-white shadow-[0_0_14px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        aria-hidden
      />

      <div
        className="absolute top-1/2 z-[4] flex h-11 w-11 sm:h-12 sm:w-12 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border border-white/90 bg-white/98 text-brand-ink shadow-[0_4px_22px_rgba(13,27,62,0.22)] pointer-events-none"
        style={{ left: `${pct}%` }}
        aria-hidden
      >
        <GripVertical className="w-5 h-5 sm:w-6 sm:h-6 opacity-75" strokeWidth={1.65} />
      </div>
    </div>
  )
}
