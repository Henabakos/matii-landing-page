"use client";

import Image from "next/image";
import svgPaths from "@/lib/svgPaths";
import AboutTag from "../sections/about-us/AboutTag";
import MetricCard from "../sections/about-us/MetricCard";
import type { KpiItem } from "@/lib/services/kpi.service";

import { useTranslations } from "next-intl";

interface AboutUsProps {
  kpis?: KpiItem[];
}

const defaultIcons = [svgPaths.p35638972, svgPaths.p28ab6b00, svgPaths.p9d06a00];

export function AboutUs({ kpis }: AboutUsProps) {
  const t = useTranslations("aboutUs");

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.4)] dark:border-white/10 py-16 md:py-24 px-4 md:px-8 transition-colors duration-200">
        {/* Top Tag Badge */}
        <div className="mb-8">
          <AboutTag />
        </div>

        {/* Headline and Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <h2 className="lg:col-span-6 font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black dark:text-white tracking-tight transition-colors">
            {t("heading")}
          </h2>
          <p className="lg:col-span-6 font-urbanist font-normal text-base md:text-[18px] leading-[1.4] text-[#444445] dark:text-zinc-300 lg:pt-2 transition-colors">
            {t("desc")}
          </p>
        </div>

        {/* Metrics Cards & Illustration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Metric Cards Stack */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {kpis && kpis.length > 0 ? (
              kpis.map((kpi, idx) => (
                <MetricCard
                  key={kpi.id}
                  iconPath={defaultIcons[idx % defaultIcons.length]}
                  number={kpi.value}
                  description={kpi.description}
                />
              ))
            ) : (
              <>
                <MetricCard
                  iconPath={svgPaths.p35638972}
                  number={t("stat1Value")}
                  description={t("stat1Desc")}
                />
                <MetricCard
                  iconPath={svgPaths.p28ab6b00}
                  number={t("stat2Value")}
                  description={t("stat2Desc")}
                />
                <MetricCard
                  iconPath={svgPaths.p9d06a00}
                  number={t("stat3Value")}
                  description={t("stat3Desc")}
                />
              </>
            )}
          </div>

          {/* Right Side Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[320px] sm:h-[400px] md:h-[480px]">
            <Image
              src="/images/about-illustration.png"
              alt="About Us Illustration"
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
