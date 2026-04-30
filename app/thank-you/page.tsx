import Link from 'next/link'
import { Phone, CheckCircle2 } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { fetchSiteSettings } from '@/lib/sanity'

export default async function ThankYouPage() {
  const { phone, phoneHref } = await fetchSiteSettings()

  return (
    <div
      className="min-h-screen flex flex-col px-4 py-8 sm:px-6 sm:py-12"
      style={{ background: 'linear-gradient(160deg, #FDFCFA 0%, #F9F7F4 100%)' }}
    >
      <div className="max-w-xl mx-auto w-full">

        {/* Logo */}
        <Link href="/" className="inline-flex mb-12">
          <Logo variant="dark" width={140} height={38} className="h-9 w-auto opacity-80" />
        </Link>

        {/* Card */}
        <div
          className="bg-white rounded-3xl p-7 sm:p-10"
          style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)' }}
        >
          {/* Confirmation icon */}
          <div className="w-11 h-11 rounded-full bg-[#F0FAF7] flex items-center justify-center mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#4DCCE8]" strokeWidth={2} />
          </div>

          <p className="text-[11px] font-semibold tracking-[0.20em] uppercase text-[#9A9490] mb-3">
            Request received
          </p>
          <h1 className="font-heading font-semibold text-[#0E0E0E] leading-[1.04] tracking-[-0.04em] mb-4"
              style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
            We&apos;ll be in touch{' '}
            <span style={{ color: '#B8AA82' }}>soon.</span>
          </h1>
          <p className="text-[#4A4440] text-[15px] leading-relaxed mb-8 max-w-sm">
            A care coordinator will review your submission and contact you within 48 hours to confirm your consultation details.
          </p>

          {/* Tips */}
          <div className="space-y-3 mb-8">
            {[
              'Keep your phone nearby — our team may call from an unfamiliar number.',
              'Our coordinators are available Monday–Friday, 8am–5pm.',
            ].map((tip) => (
              <div
                key={tip}
                className="flex gap-3 rounded-xl bg-[#F9F7F4] border border-black/[0.05] px-4 py-3.5"
              >
                <div className="w-1 flex-shrink-0 rounded-full bg-[#B8AA82] self-stretch" />
                <p className="text-[13px] text-[#4A4440] leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#1A1814] text-[#EDE6D8] px-6 py-3 text-[14px] font-semibold hover:bg-[#2a2520] transition-colors duration-200"
              style={{ boxShadow: '0 2px 12px rgba(26,24,20,0.14)' }}
            >
              Return Home
            </Link>
            <a
              href={phoneHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.10] text-[#1A1814] px-6 py-3 text-[14px] font-semibold hover:bg-black/[0.02] transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-[#9A9490]" />
              {phone}
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
