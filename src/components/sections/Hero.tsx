"use client";

import { Link } from "@/i18n/routing";
import TrustBadge from "./hero/TrustBadge";
import PartnerLogos from "./hero/PartnerLogos";
import ArrowForwardIcon from "./hero/ArrowForwardIcon";
import Image from "next/image";
import type { PartnerItem } from "@/lib/services/partner.service";
import TechPathBackground from "@/components/common/TechPathBackground";

import { useTranslations } from "next-intl";

interface HeroProps {
  partners?: PartnerItem[];
}

export function Hero({ partners }: HeroProps) {
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative w-full overflow-hidden">
      {/* Abstract technical line infrastructure background */}
      <TechPathBackground variant="brand" intensity="subtle" animated={true} />
      <div className="relative max-w-345 mx-auto pt-10 md:pt-16 pb-16 md:pb-24">

        {/* <div className="hidden md:block absolute top-0 left-0 w-32 h-24 lg:w-56 lg:h-48" style={{ position: "absolute" }}>
          <Image
            src="/shapes/hero-shape.svg"
            alt=""
            className="object-contain"
            fill
          />
        </div> */}

        <div className="hidden md:block absolute -bottom-10 lg:-bottom-14 right-0 w-28 h-24 lg:w-44 lg:h-36 pointer-events-none z-0 opacity-75" style={{ position: "absolute" }}>
          <Image
            src="/shapes/hero-shape.svg"
            alt=""
            sizes="(max-width: 1024px) 112px, 176px"
            className="rotate-180 object-contain"
            fill
          />
        </div>
        <div className="flex flex-col items-center text-center">
          {/* Top Trust Badge */}
          <div className="mb-6 md:mb-8">
            <TrustBadge />
          </div>

          {/* Main Headline */}
          <h1 className="font-urbanist text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#292c2e] dark:text-white leading-[1.12] md:leading-[1.2] max-w-[760px] tracking-tight mb-6 transition-colors">
            {tHero("headline")}
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-base md:text-[18px] text-[#444445] dark:text-zinc-300 leading-[1.6] max-w-[520px] mb-8 md:mb-10 font-normal transition-colors">
            {tHero("subtitle")}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-24">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#292c2e] hover:bg-[#1a1c1d] text-white dark:bg-[#98ff03] dark:text-[#161819] dark:hover:bg-[#86e200] font-inter font-medium text-sm md:text-[14px] pl-5 pr-2 py-2 rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] inline-flex items-center justify-center gap-2 border border-[#292c2e] dark:border-[#98ff03] transition-all group"
            >
              <span>{tHero("startProject")}</span>
              <div className="bg-[#98ff03] dark:bg-[#161819] p-2 rounded-[4px] border border-white dark:border-[#161819] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowForwardIcon color="currentColor" className="text-[#292C2E] dark:text-[#98ff03]" />
              </div>
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto bg-white hover:bg-[#fafafa] dark:bg-[#161819] dark:hover:bg-[#222527] text-[rgba(42,42,42,0.8)] hover:text-[#2a2a2b] dark:text-zinc-200 dark:hover:text-white font-inter font-medium text-sm md:text-[14px] pl-5 pr-2 py-2 rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] dark:shadow-none inline-flex items-center justify-center gap-2 border border-[#eee] dark:border-white/10 transition-all group"
            >
              <span>{tHero("exploreServices")}</span>
              <div className="bg-[#f3f3f3] dark:bg-[#222527] p-2 rounded-[4px] border border-[#eee] dark:border-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowForwardIcon color="currentColor" className="text-black dark:text-white" />
              </div>
            </Link>
          </div>

          {/* Trusted Partners Section */}
          <div className="w-full flex flex-col items-center relative z-10">
            <p className="font-urbanist uppercase text-xs md:text-sm font-medium tracking-[0.1em] text-[#2a2a2b] dark:text-zinc-400 mb-8 transition-colors">
              {tCommon("trustedPartners")}
            </p>
            <PartnerLogos partners={partners} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
