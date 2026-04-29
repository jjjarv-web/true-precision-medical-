import Header from '@/components/layout/Header'
import Header2 from '@/components/layout/Header2'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Hero2 from '@/components/sections/Hero2'
import InsuranceBar from '@/components/sections/InsuranceBar'
import TrustCredentials from '@/components/sections/TrustCredentials'
import LocationsMap from '@/components/sections/LocationsMap'
import Treatments from '@/components/sections/Treatments'
import HowItWorks from '@/components/sections/HowItWorks'
import PatientStories from '@/components/sections/PatientStories'
import {
  fetchInsuranceSettings,
  fetchSiteSettings,
  fetchLocations,
  fetchHomepageProviders,
  fetchProviders,
} from '@/lib/sanity'

export default async function HomePage() {
  const [insuranceSettings, siteSettings, locations, homepageProviders, allProviders] =
    await Promise.all([
      fetchInsuranceSettings(),
      fetchSiteSettings(),
      fetchLocations(),
      fetchHomepageProviders(),
      fetchProviders(),
    ])

  return (
    <>
      {/* Header2 — feature/second-hero-design branch */}
      <Header2 site={siteSettings} />
      {/* <Header site={siteSettings} /> */}
      <main className="flex-grow">
        {/* Hero2 — feature/second-hero-design branch preview */}
        <Hero2 />
        {/* <Hero
          googleReviewRating={siteSettings.googleReviewRating}
          googleReviewCount={siteSettings.googleReviewCount}
        /> */}
        <Treatments />
        <InsuranceBar settings={insuranceSettings} site={siteSettings} />
        <TrustCredentials
          homepageProviders={homepageProviders}
          totalProviderCount={allProviders.length}
          googleReviewRating={siteSettings.googleReviewRating}
          googleReviewCount={siteSettings.googleReviewCount}
        />
        <LocationsMap locations={locations} />
        <HowItWorks />
        <PatientStories
          googleReviewRating={siteSettings.googleReviewRating}
          googleReviewCount={siteSettings.googleReviewCount}
        />
      </main>
      <Footer site={siteSettings} />
    </>
  )
}
