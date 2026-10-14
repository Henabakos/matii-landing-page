import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import Hero from "@/components/sections/Hero";
import OfficeShowcase from "@/components/sections/OfficeShowcase";
import AboutUs from "@/components/common/AboutUs";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import { getActivePartners } from "@/lib/services/partner.service";
import { getKpisByCategory } from "@/lib/services/kpi.service";
import { getSolutionsBuiltProjects } from "@/lib/services/project.service";
import { getActiveTestimonials } from "@/lib/services/testimonial.service";


export default async function HomePage({ params }: LocalePageProps) {
  const [partners, kpis, solutionsProjects, testimonials] = await Promise.all([
    getActivePartners(),
    getKpisByCategory("HERO_ABOUT"),
    getSolutionsBuiltProjects(),
    getActiveTestimonials(),
  ]);


  return (<>
    <PageStructuredData path="/" locale={(await params).locale} />
    <>
      <div className="w-full px-4 md:px-8 space-y-16">
        <Hero partners={partners} />
        <div className="max-w-345 mx-auto space-y-16">
          <OfficeShowcase />
          <AboutUs kpis={kpis} />
          <SolutionsWeBuilt projects={solutionsProjects} />
          <Services />
          {/* <ToolsWeUse /> */}
          <WhyChooseUs />
          <Faq />
          <Testimonials testimonials={testimonials} />
        </div>
      </div>
    </>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/", props);
}
