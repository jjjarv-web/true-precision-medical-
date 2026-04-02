import Image from 'next/image'
import { Phone } from 'lucide-react'
import { FOOTER_COLUMNS, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-brand-primary-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex mb-6" aria-label="True Precision Medical home">
              <Image
                src="/logo.png"
                alt="True Precision Medical"
                width={200}
                height={48}
                className="h-10 w-auto object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </a>
            <p className="text-white/60 mb-8 max-w-sm leading-relaxed text-sm">
              A modern specialty medical organization focused on minimally invasive care,
              helping you recover faster and live better.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sky cursor-pointer transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-4 h-4 bg-white/80 rounded-sm" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sky cursor-pointer transition-colors">
                <span className="sr-only">Twitter / X</span>
                <div className="w-4 h-4 bg-white/80 rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sky cursor-pointer transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-4 h-4 bg-white/80 rounded" />
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold mb-6 uppercase tracking-widest text-xs text-white/40">
                {col.heading}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 hover:text-brand-sky transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {col.heading === 'Contact' && (
                  <li>
                    <a
                      href={PHONE_HREF}
                      className="text-sm text-white/70 hover:text-brand-sky transition-colors duration-200 flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-sky flex-shrink-0" />
                      {PHONE_NUMBER}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} True Precision Medical. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
