import Hero from '@/components/sections/Hero'
import AboutUs from '@/components/sections/AboutUs'
import Services from '@/components/sections/Services'

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <AboutUs />
      <Services />
    </main>
  );
}
