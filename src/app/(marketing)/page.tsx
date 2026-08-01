import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/common/AboutUs";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ToolsWeUse from "@/components/sections/ToolsWeUse";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main className="w-full px-4 md:px-8 py-8">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <Hero />
        <AboutUs />
        <SolutionsWeBuilt />
        <Services />
        <ToolsWeUse />
        <WhyChooseUs />
        <Faq />
        <Testimonials />
      </div>
    </main>
  );
}
