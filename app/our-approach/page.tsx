import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import OurApproachClient from '@/components/pages/OurApproachClient'
import { fetchSiteSettings } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Our Approach | True Precision Medical',
  description:
    'True Precision Medical believes major surgery should be the last resort, not the first option. Fellowship-trained specialists, outpatient procedures, same-day discharge — every time.',
  alternates: { canonical: '/our-approach' },
}

export default async function OurApproachPage() {
  const siteSettings = await fetchSiteSettings()
  return (
    <>
      <Header site={siteSettings} />
      <OurApproachClient siteSettings={siteSettings} />
      <Footer site={siteSettings} />
    </>
  )
}
