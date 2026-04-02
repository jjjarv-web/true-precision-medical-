import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Treatments from '@/components/sections/Treatments'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import LocationsCTA from '@/components/sections/LocationsCTA'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <Treatments />
        <HowItWorks />
        <WhyChooseUs />
        <LocationsCTA />
      </main>
      <Footer />
    </>
  )
}
