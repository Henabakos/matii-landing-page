import ServicesTag from "./services/ServicesTag";
import ServiceCard from "./services/ServiceCard";
import {
  EnterpriseSoftwareFigure,
  BpoSolutionsFigure,
  AiDataPlatformFigure,
  ManagedCloudFigure,
} from "../figures/pillar-figures";

export function Services() {
  return (
    <section className="relative w-full">
      <div className="relative max-w-[1380px] mx-auto py-16 flex flex-col items-center bg-white dark:bg-[#161819] border-b border-[#AEAEAE]/40 dark:border-white/10 transition-colors duration-200">
        <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px] z-10 transition-colors duration-200" />
        <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px] z-10 transition-colors duration-200" />
        {/* Top Tag Badge */}
        <div className="mb-6">
          <ServicesTag />
        </div>

        {/* Main Section Headline - Subheadline: Urbanist Medium */}
        <h2 className="font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black dark:text-white text-center uppercase tracking-tight mb-12 md:mb-16 transition-colors">
          IDEAS DON&apos;T STAY STILL.
        </h2>

        {/* Services 4-Column Grid */}
        <div className="relative w-full">
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px] z-10 transition-colors duration-200" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px] z-10 transition-colors duration-200" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px] z-10 transition-colors duration-200" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px] z-10 transition-colors duration-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {/* Card 01 - Enterprise Software */}
            <ServiceCard
              index="01"
              title="ENTERPRISE SOFTWARE"
              href="/services/enterprise"
              description="Mission-critical platforms, core banking systems, and robust ERP architectures built for scale, resilience, and institutional compliance."
              items={[
                "Core Banking & Fintech",
                "Enterprise ERP Systems",
                "Custom System Architecture",
                "Secure API & Integrations",
              ]}
              bgImage="/images/enterprise-software.jpg"
              animationComponent={<EnterpriseSoftwareFigure />}
            />

            {/* Card 02 - BPO */}
            <ServiceCard
              index="02"
              title="BPO SOLUTIONS"
              href="/services/bpo"
              description="High-efficiency business process outsourcing, dedicated tech-enabled back-office operations, and 24/7 multilingual customer support."
              items={[
                "Customer Experience & CX",
                "Back-Office Operations",
                "Data Processing & Annotation",
                "Dedicated Talent Teams",
              ]}
              bgImage="/images/bpo-solutions.jpg"
              animationComponent={<BpoSolutionsFigure />}
            />

            {/* Card 03 - AI & Data Platform */}
            <ServiceCard
              index="03"
              title="AI & DATA PLATFORM"
              href="/services/ai"
              description="Enterprise AI pipelines, automated intelligent agents, and centralized data architectures transforming telemetry into decisive action."
              items={[
                "Data Warehousing & ETL",
                "Predictive Analytics & BI",
                "Custom LLM & AI Agents",
                "Intelligent Automation",
              ]}
              bgImage="/images/ai-data-platform.jpg"
              animationComponent={<AiDataPlatformFigure />}
            />

            {/* Card 04 - Managed Cloud Services */}
            <ServiceCard
              index="04"
              title="MANAGED CLOUD SERVICES"
              href="/services/cloud"
              description="End-to-end cloud infrastructure management, 24/7 SRE monitoring, automated CI/CD pipelines, and high-availability disaster recovery."
              items={[
                "Cloud Migration & Architecture",
                "24/7 SRE & Monitoring",
                "DevOps & CI/CD Pipelines",
                "Security & Compliance Audits",
              ]}
              bgImage="/images/ai-automation.png"
              animationComponent={<ManagedCloudFigure />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
