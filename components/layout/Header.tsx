'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X } from 'lucide-react'
import { NAV_LINKS, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHome = pathname === '/'
  const darkTransparent = isHome && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        darkTransparent
          ? 'bg-black/45 backdrop-blur-md py-5 border-b border-white/[0.06]'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(13,27,62,0.08)] py-3'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="True Precision Medical home">
          <Image
            src="/logo/true-precision-medical-logo.svg"
            alt="True Precision Medical"
            width={180}
            height={50}
            className={`h-10 w-auto object-contain block transition-[filter] duration-300 ${
              darkTransparent ? 'brightness-0 invert' : ''
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                darkTransparent
                  ? 'text-white/88 hover:text-white'
                  : 'text-brand-ink/70 hover:text-brand-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className={`text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
              darkTransparent
                ? 'text-white/88 hover:text-white'
                : 'text-brand-ink/70 hover:text-brand-primary'
            }`}
          >
            <Phone className="w-4 h-4" />
            {PHONE_NUMBER}
          </a>
          <a
            href="#"
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              darkTransparent
                ? 'bg-[#D4C4A8] text-[#1A1814] hover:bg-[#C9B896] shadow-[0_2px_14px_rgba(0,0,0,0.35)] hover:-translate-y-0.5'
                : 'bg-brand-primary hover:bg-brand-primary-dark text-white shadow-[0_2px_12px_rgba(30,58,95,0.25)] hover:-translate-y-0.5'
            }`}
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            darkTransparent
              ? 'text-white hover:bg-white/10'
              : 'text-brand-ink hover:bg-brand-surface-blue'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-5 flex flex-col gap-1 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-3 font-medium text-brand-ink rounded-lg hover:bg-brand-bg-alt transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          <a
            href={PHONE_HREF}
            className="px-3 py-3 font-medium text-brand-ink/70 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {PHONE_NUMBER}
          </a>
          <a
            href="#"
            className="bg-brand-primary text-white px-5 py-3.5 rounded-xl text-sm font-semibold text-center mt-1"
          >
            Book Consultation
          </a>
        </div>
      )}
    </header>
  )
}
