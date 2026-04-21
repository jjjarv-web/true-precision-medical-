import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocationsClient from '@/components/pages/LocationsClient'
import { fetchSiteSettings, fetchLocations } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Locations | True Precision Medical',
  description:
    'True Precision Medical locations across Arizona. Minimally invasive outpatient specialty care — board-certified specialists, same-day discharge, easy parking at every site.',
  alternates: { canonical: '/locations' },
}

export default async function LocationsPage() {
  const [siteSettings, locations] = await Promise.all([
    fetchSiteSettings(),
    fetchLocations(),
  ])
  return (
    <>
      <Header site={siteSettings} />
      <LocationsClient siteSettings={siteSettings} locations={locations} />
      <Footer
        site={siteSettings}
        conversionDescription="Most major insurance plans accepted."
      />
    </>
  )
}
