import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex mb-8">
          <Logo variant="dark" width={140} height={38} className="h-9 w-auto opacity-95" />
        </Link>

        <div className="bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-9">
          <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#2F34F4] mb-3">
            Request received
          </p>
          <h1 className="font-heading font-bold text-[#111111] text-[clamp(30px,4.6vw,44px)] leading-[1.08] tracking-[-0.03em] mb-4">
            Thank you. We&apos;ll be in touch soon.
          </h1>
          <p className="text-[#4A4440] text-[16px] leading-relaxed mb-6">
            A care coordinator will review your submission and contact you within 48 hours to confirm
            your consultation details.
          </p>

          <div className="space-y-3 mb-8">
            <div className="rounded-xl border border-black/[0.08] px-4 py-3 text-[14px] text-[#1A1814]">
              Please keep your phone nearby in case our team calls from an unfamiliar number.
            </div>
            <div className="rounded-xl border border-black/[0.08] px-4 py-3 text-[14px] text-[#1A1814]">
              Need immediate help? Call our office directly to speak with a coordinator.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#2F34F4] text-white px-5 py-3 text-[14px] font-semibold hover:opacity-95 transition"
            >
              Return Home
            </Link>
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-black/[0.12] text-[#1A1814] px-5 py-3 text-[14px] font-semibold hover:bg-black/[0.02] transition"
            >
              Update Booking Request
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
