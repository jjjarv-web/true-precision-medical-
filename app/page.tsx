import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import InsuranceBar from '@/components/sections/InsuranceBar'
import TrustCredentials from '@/components/sections/TrustCredentials'
import LocationsMap from '@/components/sections/LocationsMap'
import Treatments from '@/components/sections/Treatments'
import HowItWorks from '@/components/sections/HowItWorks'
import PatientStories from '@/components/sections/PatientStories'
import { fetchInsuranceSettings } from '@/lib/sanity'

export default async function HomePage() {
  const insuranceSettings = await fetchInsuranceSettings()

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Treatments />
        <InsuranceBar settings={insuranceSettings} />
        <TrustCredentials />
        <LocationsMap />
        <HowItWorks />
        <PatientStories />
      </main>
      <Footer />
    </>
  )
}
