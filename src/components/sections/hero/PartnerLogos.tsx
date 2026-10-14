"use client";

import ContentEmptyState from "@/components/common/ContentEmptyState";

import React from "react";
import Image from "next/image";
import type { PartnerItem } from "@/lib/services/partner.service";

interface PartnerLogosProps {
  partners?: PartnerItem[];
}

function LogoSet({ partners }: { partners?: PartnerItem[] }) {
  if (partners && partners.length > 0) {
    return (
      <div className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-20 pr-12 sm:pr-16 md:pr-20">
        {partners.map((partner, idx) => {
          if (!partner.logoUrl) return <span key={partner.id} className="font-urbanist text-xl font-medium text-zinc-600 dark:text-zinc-300">{partner.name}</span>;

          const logoElement = (
            <div
              className="relative h-10 sm:h-12 md:h-14 w-32 sm:w-40 md:w-48 shrink-0 flex items-center justify-center transition-all duration-300 group"
              style={{ position: "relative" }}
              title={partner.name}
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                fill
                unoptimized={true}
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                className="object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-150 dark:contrast-125 dark:group-hover:brightness-100 transition-all duration-300"
              />
            </div>
          );

          if (partner.websiteUrl) {
            return (
              <a
                key={`${partner.id}-${idx}`}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98ff03] rounded-md transition-transform hover:scale-105"
                title={partner.name}
              >
                {logoElement}
              </a>
            );
          }

          return (
            <div key={`${partner.id}-${idx}`} className="shrink-0 transition-transform hover:scale-105">
              {logoElement}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export function PartnerLogos({ partners }: PartnerLogosProps) {
  if (!partners?.length) return <ContentEmptyState kind="partners" compact />;
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Edge gradient masks for smooth fade on margins */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-48 bg-gradient-to-r from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#0d0f10] dark:via-[#0d0f10]/95 dark:to-transparent z-20 transition-colors" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-48 bg-gradient-to-l from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#0d0f10] dark:via-[#0d0f10]/95 dark:to-transparent z-20 transition-colors" />

      {/* Infinite scrolling track */}
      <div
        className="animate-marquee flex w-max cursor-grab active:cursor-grabbing"
        style={{ animation: "marqueeScroll 25s linear infinite" }}
      >
        {/* First Half (Track A) */}
        <div className="flex shrink-0 items-center">
          <LogoSet partners={partners} />
          <LogoSet partners={partners} />
        </div>

        {/* Second Half (Track B: exact clone for infinite 0% to -50% loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          <LogoSet partners={partners} />
          <LogoSet partners={partners} />
        </div>
      </div>
    </div>
  );
}

export default PartnerLogos;
