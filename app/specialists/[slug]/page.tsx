import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProviderCard from '@/components/providers/ProviderCard'
import ProviderExtendedBio from '@/components/providers/ProviderExtendedBio'
import { providerMetaDescription } from '@/lib/constants'
import { fetchSiteSettings, fetchProviders, fetchProviderBySlug } from '@/lib/sanity'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const providers = await fetchProviders()
  return providers.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const provider = await fetchProviderBySlug(slug)
  if (!provider) {
    return { title: 'Specialist not found | True Precision Medical' }
  }
  return {
    title: `${provider.name} · ${provider.title} | True Precision Medical`,
    description: providerMetaDescription(provider),
    alternates: { canonical: `/specialists/${provider.slug}` },
  }
}

export default async function ProviderDetailPage({ params }: PageProps) {
  const { slug } = await params
  const provider = await fetchProviderBySlug(slug)
  if (!provider) notFound()

  const [siteSettings, allProviders] = await Promise.all([
    fetchSiteSettings(),
    fetchProviders(),
  ])
  const related = allProviders.filter((p) => p.slug !== provider.slug).slice(0, 3)

  return (
    <>
      <Header site={siteSettings} />
      <main className="flex-grow bg-white">
        {/* Breadcrumb */}
        <div className="pt-28 sm:pt-32">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <Link
              href="/specialists"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#4A4440] hover:text-[#1A1814] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Specialists
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start">
              {/* Photo */}
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-[#F5F3F0]"
                style={{ aspectRatio: '3/4' }}
              >
                {provider.photoUrl ? (
                  <Image
                    src={provider.photoUrl}
                    alt={provider.name}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1 opacity-20">
                      <div className="rounded-full bg-[#1A1814]" style={{ width: 72, height: 72 }} />
                      <div
                        className="rounded-t-full bg-[#1A1814]"
                        style={{ width: 110, height: 66, marginTop: 8 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Text */}
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
                  {provider.title}
                </p>
                <h1 className="font-heading font-bold text-[#1A1814] text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.035em]">
                  {provider.name}
                </h1>

                <div className="mt-8 flex flex-wrap gap-2">
                  {provider.highlights.map((line) => (
                    <span
                      key={line}
                      className="inline-flex rounded-full border border-black/[0.08] bg-[#F9F7F4] px-4 py-2 text-[12px] font-semibold leading-snug text-[#1A1814]"
                    >
                      {line}
                    </span>
                  ))}
                </div>

                {provider.shortIntro && (
                  <div className="mt-8">
                    <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
                      Overview
                    </h2>
                    <p className="text-[16px] leading-relaxed text-[#4A4440]">{provider.shortIntro}</p>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1A1814] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#2A2620] hover:-translate-y-0.5 shadow-[0_2px_14px_rgba(0,0,0,0.18)]"
                  >
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/specialists"
                    className="inline-flex items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-5 py-3 text-sm font-semibold text-[#1A1814] transition-colors hover:bg-[#F9F7F4]"
                  >
                    View all specialists
                  </Link>
                </div>

                {provider.extendedBio?.trim() && (
                  <ProviderExtendedBio text={provider.extendedBio} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="pb-24 sm:pb-32 pt-6 border-t border-black/[0.06]">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-16">
              <div className="mb-10 flex items-end justify-between gap-4">
                <h2 className="font-heading font-bold text-[#1A1814] text-[clamp(22px,2.6vw,30px)] leading-tight tracking-[-0.02em]">
                  Other specialists
                </h2>
                <Link
                  href="/specialists"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1814] transition-colors hover:text-[#4DCCE8]"
                >
                  View all
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    index={i}
                    imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer site={siteSettings} />
    </>
  )
}
