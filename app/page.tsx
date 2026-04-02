import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import InsuranceBar from '@/components/sections/InsuranceBar'
import TrustCredentials from '@/components/sections/TrustCredentials'
import LocationsMap from '@/components/sections/LocationsMap'
import TrustBar from '@/components/sections/TrustBar'
import Treatments from '@/components/sections/Treatments'
import HowItWorks from '@/components/sections/HowItWorks'
import Providers from '@/components/sections/Providers'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import LocationsCTA from '@/components/sections/LocationsCTA'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <InsuranceBar />
        <TrustCredentials />
        <LocationsMap />
        <TrustBar />
        <Treatments />
        <HowItWorks />
        <Providers />
        <WhyChooseUs />
        <LocationsCTA />
      </main>
      <Footer />
    </>
  )
}
