"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Play, X, MapPin, Sparkles, Volume2, VolumeX } from "lucide-react";
import ArrowForwardIcon from "./hero/ArrowForwardIcon";

import { useTranslations } from "next-intl";

interface OfficeShowcaseProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  videoUrl?: string;
  gifUrl?: string;
}

export function OfficeShowcase({
  badge,
  title,
  subtitle,
}: OfficeShowcaseProps) {
  const t = useTranslations("officeShowcase");

  const displayTitle = title || t("title");
  const displaySubtitle = subtitle || t("subtitle");

  return (
    <section className="relative w-full overflow-hidden" aria-label="Office and Global Standards Showcase">
      <div className="relative max-w-345 mx-auto">
        {/* Main Card with consistent styling, border, and rounded corners */}
        <div className="relative w-full overflow-hidden rounded-[8px] md:rounded-[8px] bg-[#161819] border border-white/10 shadow-[0px_4px_24px_rgba(0,0,0,0.15)] min-h-[460px] sm:min-h-[500px] md:min-h-[520px] flex items-center">
          {/* Background Studio Visual */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/office.jpg"
              alt="MATII TECHNOLOGIES studio in Addis Ababa"
              fill
              sizes="(max-width: 1380px) 100vw, 1380px"
              className="object-cover object-center scale-[1.01] transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* Cinematic Gradient Overlays for optimal readability and depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35 sm:via-black/75 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 md:hidden" />
          </div>

          {/* Foreground Content Stack */}
          <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 max-w-2xl">
            {/* Main Title - Subheadline: Urbanist Medium */}
            <h2 className="font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-white tracking-tight mb-4 sm:mb-6">
              {displayTitle}
            </h2>

            {/* Subtitle / Description - Consistent font and size */}
            <p className="font-inter font-normal text-base md:text-[16px] leading-[1.4] text-[#d4d4d8] max-w-[560px] mb-8 md:mb-10">
              {displaySubtitle}
            </p>

            {/* Dual Action Buttons - Consistent with Hero.tsx styling and radius */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-[#98ff03] hover:bg-[#86e200] text-[#292c2e] font-inter font-medium text-sm md:text-[14px] pl-5 pr-2 py-2 rounded-[8px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] inline-flex items-center justify-center gap-2 border border-[#98ff03] transition-all group cursor-pointer"
              >
                <span>{t("bookCall")}</span>
                <div className="bg-[#292c2e] p-2 rounded-[4px] border border-[#292c2e] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowForwardIcon color="#98ff03" />
                </div>
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-inter font-medium text-sm md:text-[14px] pl-5 pr-2 py-2 rounded-[8px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] inline-flex items-center justify-center gap-2 border border-white/20 backdrop-blur-sm transition-all group cursor-pointer"
              >
                <span>{t("seeWork")}</span>
                <div className="bg-white/10 p-2 rounded-[4px] border border-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowForwardIcon color="white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfficeShowcase;
