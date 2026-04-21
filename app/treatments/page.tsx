import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TreatmentsHubClient from '@/components/pages/TreatmentsHubClient'
import { fetchSiteSettings } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Treatments | True Precision Medical',
  description:
    'Minimally invasive treatments for joint pain, spine conditions, nerve pain, vascular disease, and more. Board-certified specialists. Same-day discharge. No hospital stays.',
  alternates: { canonical: '/treatments' },
}

export default async function TreatmentsPage() {
  const siteSettings = await fetchSiteSettings()
  return (
    <>
      <Header site={siteSettings} />
      <TreatmentsHubClient />
      <Footer site={siteSettings} />
    </>
  )
}
