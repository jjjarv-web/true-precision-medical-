import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header2 from '@/components/layout/Header2'
import Footer from '@/components/layout/Footer'
import ProviderCard from '@/components/providers/ProviderCard'
import { fetchSiteSettings, fetchProviders } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Our Specialists | True Precision Medical',
  description:
    'Meet the board-certified, fellowship-trained specialists at True Precision Medical — surgeons, interventional radiologists, and advanced practice providers focused on minimally invasive care.',
  alternates: { canonical: '/specialists' },
}

export default async function SpecialistsIndexPage() {
  const [siteSettings, providers] = await Promise.all([fetchSiteSettings(), fetchProviders()])

  return (
    <>
      <Header2 site={siteSettings} />
      <main className="flex-grow bg-white">
        <section className="pt-36 pb-20 sm:pt-44 sm:pb-24">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[#4A4440] hover:text-[#1A1814] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
                Home
              </Link>
            </div>
            <span className="block mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
              Our Specialists
            </span>
            <h1 className="font-heading font-semibold text-[#1A1814] text-[clamp(30px,4.5vw,52px)] leading-[1.02] tracking-[-0.04em] max-w-3xl">
              Fellowship-trained. Board-certified. Focused on you.
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#4A4440]">
              Our clinical team includes board-certified physicians and licensed advanced practice
              providers — all focused on the least invasive, evidence-based path for your condition.
            </p>
          </div>
        </section>

        <section className="pb-28 sm:pb-32">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {providers.map((provider, i) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  index={i}
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 22vw"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer site={siteSettings} />
    </>
  )
}
