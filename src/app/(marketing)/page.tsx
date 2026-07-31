import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ToolsWeUse from "@/components/sections/ToolsWeUse";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <AboutUs />
      <SolutionsWeBuilt />
      <Services />
      <ToolsWeUse />
      <WhyChooseUs />
      <Faq />
      <Testimonials />
    </main>
  );
}
