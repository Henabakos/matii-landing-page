import Hero from "@/components/sections/Hero";
import OfficeShowcase from "@/components/sections/OfficeShowcase";
import AboutUs from "@/components/common/AboutUs";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ToolsWeUse from "@/components/sections/ToolsWeUse";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import { getActivePartners } from "@/lib/services/partner.service";
import { getKpisByCategory } from "@/lib/services/kpi.service";
import { getSolutionsBuiltProjects } from "@/lib/services/project.service";
import { getActiveTestimonials } from "@/lib/services/testimonial.service";
import { JsonLd, generateOrganizationSchema } from "@/components/common/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matii Digitals | Turning Ideas Into Digital Momentum",
  description:
    "We build digital products, systems, and experiences that move ideas forward. End-to-end engineering, AI automation, and Swiss-calibrated design.",
  openGraph: {
    title: "Matii Digitals | Turning Ideas Into Digital Momentum",
    description:
      "From ambitious ideas to powerful digital products, we design and build experiences, systems, and technology that move businesses forward.",
    type: "website",
    url: "https://Matiidigitals.com",
    images: [
      {
        url: "/images/about-illustration.png",
        width: 1200,
        height: 630,
        alt: "Matii Digitals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matii Digitals | Turning Ideas Into Digital Momentum",
    description:
      "From ambitious ideas to powerful digital products, we design and build experiences, systems, and technology that move businesses forward.",
    images: ["/images/about-illustration.png"],
  },
};

export default async function HomePage() {
  const [partners, kpis, solutionsProjects, testimonials] = await Promise.all([
    getActivePartners().catch(() => []),
    getKpisByCategory("HERO_ABOUT").catch(() => []),
    getSolutionsBuiltProjects().catch(() => []),
    getActiveTestimonials().catch(() => []),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const orgSchema = generateOrganizationSchema(siteUrl);

  return (
    <>
      <JsonLd data={orgSchema} />
      <main className="w-full px-4 md:px-8 space-y-16">
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
      </main>
    </>
  );
}
