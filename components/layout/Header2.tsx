'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X } from 'lucide-react'
import { NAV_LINKS, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'
import type { SiteSettings } from '@/lib/sanity'
import Logo from '@/components/ui/Logo'

type Props = {
  site?: SiteSettings
}

const SCROLL_THRESHOLD = 24

export default function Header2({ site }: Props = {}) {
  const phone      = site?.phone    ?? PHONE_NUMBER
  const phoneHref  = site?.phoneHref ?? PHONE_HREF
  const pathname   = usePathname()
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [pathname])

  /**
   * Transparent/ghost at the top of the light hero → solid white glass on scroll.
   * ARC-inspired: nav fades to 0.75 opacity when scrolled so content breathes,
   * snaps back to full on hover.
   */
  const barClass = scrolled
    ? 'bg-white/92 backdrop-blur-md shadow-[0_1px_0_rgba(14,14,14,0.07)] py-3'
    : 'bg-transparent py-5'

  const navOpacity = scrolled ? 0.78 : 1

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${barClass}`}
        style={{ opacity: navOpacity }}
        onMouseEnter={() => { /* noop — CSS handles hover */ }}
      >
        {/* Hover restores full opacity */}
        <style>{`header:hover { opacity: 1 !important; }`}</style>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center">

          {/* Logo — dark variant for light bg */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label="True Precision Medical home"
          >
            <Logo
              variant="dark"
              width={180}
              height={50}
              className="h-9 w-auto object-contain block"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-medium tracking-tight transition-colors duration-150"
                style={{ color: 'rgba(14,14,14,0.62)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0E0E0E')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(14,14,14,0.62)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={phoneHref}
              className="text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
              style={{ color: 'rgba(14,14,14,0.50)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0E0E0E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(14,14,14,0.50)')}
            >
              <Phone className="w-3.5 h-3.5" />
              {phone}
            </a>

            <Link
              href="/book"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-[13.5px] font-medium
                         tracking-tight text-white select-none
                         shadow-[0_2px_12px_rgba(14,14,14,0.22),inset_0_1px_0_rgba(255,255,255,0.10)]
                         transition-all duration-200 hover:-translate-y-px
                         hover:shadow-[0_4px_18px_rgba(14,14,14,0.30)] active:scale-[0.98]"
              style={{ backgroundColor: '#0E0E0E' }}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-colors duration-150"
            style={{ color: '#0E0E0E' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>
        </div>
      </header>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-0 z-40 pt-20 pb-6 px-5 flex flex-col gap-1
                     bg-white/97 backdrop-blur-md
                     shadow-[0_8px_32px_rgba(14,14,14,0.10)]
                     border-b border-black/[0.07] md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-3.5 rounded-xl text-[15px] font-medium tracking-tight
                         transition-colors duration-150"
              style={{ color: 'rgba(14,14,14,0.70)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0E0E0E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(14,14,14,0.70)')}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px mx-3 my-2" style={{ backgroundColor: 'rgba(14,14,14,0.08)' }} />

          <a
            href={phoneHref}
            className="px-3 py-3 flex items-center gap-2 text-[14px] font-medium"
            style={{ color: 'rgba(14,14,14,0.45)' }}
          >
            <Phone className="w-4 h-4" />
            {phone}
          </a>

          <Link
            href="/book"
            className="mt-1 mx-0 py-4 rounded-full text-[15px] font-medium text-center
                       text-white tracking-tight select-none
                       shadow-[0_2px_14px_rgba(14,14,14,0.20)]
                       transition-all duration-200 active:scale-[0.98]"
            style={{ backgroundColor: '#0E0E0E' }}
            onClick={() => setMobileOpen(false)}
          >
            Book Consultation
          </Link>
        </div>
      )}
    </>
  )
}
