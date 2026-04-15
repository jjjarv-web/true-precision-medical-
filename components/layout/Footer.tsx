import { Phone, ArrowRight } from 'lucide-react'
import { FOOTER_COLUMNS, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'
import Logo from '@/components/ui/Logo'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#07080C] text-white">

      {/* ── Conversion band ─────────────────────────────── */}
      <div
        className="border-b border-white/[0.06]"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(77,204,232,0.05) 0%, transparent 70%)' }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-5">
            Arizona&apos;s Premier Minimally Invasive Center
          </p>
          <h2
            className="font-heading font-bold text-[#EDE6D8] leading-[1.04] tracking-[-0.04em] mb-6"
            style={{ fontSize: 'clamp(30px, 4.5vw, 56px)' }}
          >
            Ready when you are.
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Virtual assessment available. Most major insurance plans accepted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/book"
              className="inline-flex items-center gap-2.5 bg-[#D4C4A8] text-[#1A1814] px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.02em] hover:bg-[#C9B896] transition-colors duration-200"
              style={{ boxShadow: '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)' }}
            >
              Request a Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/55 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex mb-6" aria-label="True Precision Medical home">
              <Logo
                variant="light"
                width={180}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert opacity-80"
              />
            </a>
            <p className="text-white/45 mb-8 max-w-sm leading-relaxed text-sm">
              Arizona&apos;s leading outpatient specialty center. Minimally invasive procedures,
              same-day discharge, and board-certified surgeons — no hospital required.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#4DCCE8] hover:border-[#4DCCE8]/30 transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#4DCCE8] hover:border-[#4DCCE8]/30 transition-colors duration-200"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#4DCCE8] hover:border-[#4DCCE8]/30 transition-colors duration-200"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold mb-6 uppercase tracking-[0.18em] text-[11px] text-white/35">
                {col.heading}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {col.heading === 'Contact' && (
                  <li>
                    <a
                      href={PHONE_HREF}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#4DCCE8] flex-shrink-0" />
                      {PHONE_NUMBER}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} True Precision Medical. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

    </footer>
  )
}
