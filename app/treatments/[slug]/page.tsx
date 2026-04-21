import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TreatmentDetailClient from '@/components/pages/TreatmentDetailClient'
import { fetchSiteSettings } from '@/lib/sanity'
import { SPECIALTIES, TREATMENT_DETAILS } from '@/lib/constants'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const spec = SPECIALTIES.find((s) => s.id === slug)
  const detail = TREATMENT_DETAILS[slug]
  if (!spec || !detail) return { title: 'Treatment | True Precision Medical' }
  return {
    title: `${spec.label} Treatment | True Precision Medical`,
    description: `${detail.tagline} Minimally invasive ${spec.label.toLowerCase()} care at True Precision Medical — board-certified specialists, same-day discharge, no hospital stays.`,
    alternates: { canonical: `/treatments/${slug}` },
  }
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const spec = SPECIALTIES.find((s) => s.id === slug)
  const detail = TREATMENT_DETAILS[slug]
  if (!spec || !detail) notFound()

  const siteSettings = await fetchSiteSettings()

  return (
    <>
      <Header site={siteSettings} />
      <TreatmentDetailClient slug={slug} specLabel={spec.label} detail={detail} />
      <Footer site={siteSettings} />
    </>
  )
}
