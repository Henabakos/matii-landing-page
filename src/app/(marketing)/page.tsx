import Hero from '@/components/sections/Hero'
import AboutUs from '@/components/sections/AboutUs'
import Services from '@/components/sections/Services'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import CtaBanner from '@/components/sections/CtaBanner'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </main>
  );
}
