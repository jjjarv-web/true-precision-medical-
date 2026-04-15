'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X } from 'lucide-react'
import { NAV_LINKS, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'
import Logo from '@/components/ui/Logo'

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
            ? 'bg-[#07080C]/92 backdrop-blur-md border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="True Precision Medical home">
          <Logo
            variant="light"
            width={180}
            height={50}
            className="h-10 w-auto object-contain block brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="text-sm font-medium flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            {PHONE_NUMBER}
          </a>
          <a
            href="/book"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#D4C4A8] text-[#1A1814] hover:bg-[#C9B896] shadow-[0_2px_14px_rgba(0,0,0,0.35)] hover:-translate-y-0.5"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0D0E14]/96 backdrop-blur-md border-t border-white/[0.06] p-5 flex flex-col gap-1 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-3 font-medium text-white/75 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-white/[0.07] my-2" />
          <a
            href={PHONE_HREF}
            className="px-3 py-3 font-medium text-white/55 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {PHONE_NUMBER}
          </a>
          <a
            href="/book"
            className="bg-[#D4C4A8] text-[#1A1814] px-5 py-3.5 rounded-xl text-sm font-semibold text-center mt-1 hover:bg-[#C9B896] transition-colors"
          >
            Book Consultation
          </a>
        </div>
      )}
    </header>
  )
}
