"use client";

import { Link } from "@/i18n/routing";
import TrustBadge from "./hero/TrustBadge";
import PartnerLogos from "./hero/PartnerLogos";
import ArrowForwardIcon from "./hero/ArrowForwardIcon";
import Image from "next/image";
import type { PartnerItem } from "@/lib/services/partner.service";
import TechPathBackground from "@/components/common/TechPathBackground";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.css";

interface HeroProps {
  partners?: PartnerItem[];
}

export function Hero({ partners }: HeroProps) {
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section aria-labelledby="hero-heading" className="relative w-full overflow-hidden">
      {/* Abstract technical line infrastructure background */}
      <TechPathBackground variant="brand" intensity="subtle" animated={true} />
      <div className="relative max-w-345 mx-auto pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">

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
            alt="hero-shape"
            className="rotate-180 object-contain"
            fill
          />
        </div>
        <div className="flex flex-col items-center text-center">
          {/* Top Trust Badge */}
          <div className={`${styles.reveal} mb-7 sm:mb-8`}>
            <TrustBadge />
          </div>

          {/* Main Headline */}
          <h1 id="hero-heading" className={`${styles.reveal} ${styles.headline} font-urbanist text-[clamp(2.25rem,5.5vw,5rem)] font-bold text-[#292c2e] dark:text-white leading-[1.08] max-w-[960px] tracking-[-0.04em] text-balance mb-6 sm:mb-7 transition-colors`}>
            {tHero("headline")}
          </h1>

          {/* Subtitle */}
          <p className={`${styles.reveal} ${styles.subtitle} font-inter text-base sm:text-lg text-[#444445] dark:text-zinc-300 leading-[1.75] max-w-[580px] text-pretty mb-8 sm:mb-10 font-normal transition-colors`}>
            {tHero("subtitle")}
          </p>

          {/* Dual Action Buttons */}
          <div className={`${styles.reveal} ${styles.actions} flex w-full max-w-sm sm:max-w-none flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20`}>
            <Link
              href="/contact"
              className={`${styles.action} w-full sm:w-auto min-h-14 bg-[#292c2e] hover:bg-[#1a1c1d] text-white dark:bg-[#98ff03] dark:text-[#161819] dark:hover:bg-[#86e200] font-inter font-medium text-sm pl-6 pr-2 py-2 rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] inline-flex items-center justify-between gap-5 border border-[#292c2e] dark:border-[#98ff03] transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lg group`}
            >
              <span>{tHero("startProject")}</span>
              <div aria-hidden="true" className="bg-[#98ff03] dark:bg-[#161819] p-2.5 rounded-[6px] border border-white dark:border-[#161819] flex items-center justify-center transition-transform motion-safe:group-hover:translate-x-0.5">
                <ArrowForwardIcon color="currentColor" className="text-[#292C2E] dark:text-[#98ff03]" />
              </div>
            </Link>

            <Link
              href="/services"
              className={`${styles.action} w-full sm:w-auto min-h-14 bg-white hover:bg-[#fafafa] dark:bg-[#161819] dark:hover:bg-[#222527] text-[rgba(42,42,42,0.8)] hover:text-[#2a2a2b] dark:text-zinc-200 dark:hover:text-white font-inter font-medium text-sm pl-6 pr-2 py-2 rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] dark:shadow-none inline-flex items-center justify-between gap-5 border border-[#ddd] dark:border-white/15 transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lg group`}
            >
              <span>{tHero("exploreServices")}</span>
              <div aria-hidden="true" className="bg-[#f3f3f3] dark:bg-[#222527] p-2.5 rounded-[6px] border border-[#eee] dark:border-white/10 flex items-center justify-center transition-transform motion-safe:group-hover:translate-x-0.5">
                <ArrowForwardIcon color="currentColor" className="text-black dark:text-white" />
              </div>
            </Link>
          </div>

          {/* Trusted Partners Section */}
          <div className="w-full max-w-5xl flex flex-col items-center relative z-10 border-t border-[#292c2e]/10 dark:border-white/10 pt-7 sm:pt-8">
            <p className="font-inter uppercase text-[11px] sm:text-xs font-medium tracking-[0.16em] text-[#444445] dark:text-zinc-400 mb-4 sm:mb-6 transition-colors">
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
