import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ToolsWeUse from "@/components/sections/ToolsWeUse";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import CtaBanner from "@/components/sections/CtaBanner";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <AboutUs />
      <Services />
      <ToolsWeUse />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />
    </main>
  );
}
