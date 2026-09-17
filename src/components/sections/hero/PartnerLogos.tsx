"use client";

import React from "react";
import Image from "next/image";
import svgPaths from "@/lib/svgPaths";
import type { PartnerItem } from "@/lib/services/partner.service";

interface PartnerLogosProps {
  partners?: PartnerItem[];
}

function DefaultLogos() {
  return (
    <>
      {/* Logo 1 */}
      <div className="h-7 shrink-0 flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 relative">
          <svg className="block size-full" fill="none" viewBox="0 0 25 26">
            <path d={svgPaths.p1872c680} fill="#222222" fillOpacity="0.35" />
            <path d={svgPaths.p23f7dd00} fill="#2A2A2B" />
          </svg>
        </div>
        <div className="h-4 relative w-[50px]">
          <svg className="block size-full" fill="none" viewBox="0 0 50 16">
            <path d={svgPaths.p149b9900} fill="#2A2A2B" />
            <path d={svgPaths.p1c19fe80} fill="#2A2A2B" />
            <path d={svgPaths.pca40a70} fill="#2A2A2B" />
            <path d={svgPaths.p125051f0} fill="#2A2A2B" />
            <path d={svgPaths.p869cd00} fill="#2A2A2B" />
            <path d={svgPaths.p15e89680} fill="#2A2A2B" />
          </svg>
        </div>
      </div>

      {/* Logo 2 */}
      <div className="h-7 shrink-0 flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 relative">
          <svg className="block size-full" fill="none" viewBox="0 0 26 26">
            <path clipRule="evenodd" d={svgPaths.p36e82680} fill="#2A2A2B" fillRule="evenodd" />
            <path d={svgPaths.p32c2cf80} fill="#AEAEAE" />
            <path d={svgPaths.p2ebf6800} fill="#717680" />
          </svg>
        </div>
        <div className="h-4 relative w-[76px]">
          <svg className="block size-full" fill="none" viewBox="0 0 76 16">
            <path d={svgPaths.p10e20d00} fill="#111111" />
            <path d={svgPaths.p3362f770} fill="#111111" />
            <path d={svgPaths.p12afdf00} fill="#111111" />
            <path d={svgPaths.p3728840} fill="#111111" />
            <path d={svgPaths.p4858b00} fill="#111111" />
            <path d={svgPaths.p38240f00} fill="#111111" />
            <path d={svgPaths.p11480b00} fill="#111111" />
            <path d={svgPaths.p769d700} fill="#111111" />
          </svg>
        </div>
      </div>

      {/* Logo 3 */}
      <div className="h-7 shrink-0 flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-4 h-[28px] relative">
          <svg className="block size-full" fill="none" viewBox="0 0 17 28">
            <rect fill="#2A2A2B" height="5.6" width="5.6" y="11.2" />
            <rect fill="#2A2A2B" height="5.6" transform="rotate(180 16.8 16.8)" width="5.6" x="16.8" y="16.8" />
            <path d={svgPaths.p1ced53f0} fill="#222222" fillOpacity="0.15" />
            <path d={svgPaths.p149600} fill="#222222" fillOpacity="0.35" />
            <path d={svgPaths.p223e800} fill="#222222" fillOpacity="0.6" />
            <path d={svgPaths.p39cd8a00} fill="#222222" fillOpacity="0.6" />
          </svg>
        </div>
        <div className="h-4 relative w-[74px]">
          <svg className="block size-full" fill="none" viewBox="0 0 74 16">
            <path d={svgPaths.p3d807f80} fill="#2A2A2B" />
            <path d={svgPaths.p2c5f4340} fill="#2A2A2B" />
            <path d={svgPaths.p3282ce80} fill="#2A2A2B" />
            <path d={svgPaths.p3e91ec00} fill="#2A2A2B" />
            <path d={svgPaths.p2cca6f80} fill="#2A2A2B" />
            <path d={svgPaths.p3347f280} fill="#2A2A2B" />
            <path d={svgPaths.p3dbfaf00} fill="#2A2A2B" />
            <path d={svgPaths.p31429940} fill="#2A2A2B" />
          </svg>
        </div>
      </div>

      {/* Amazon Logo */}
      <div className="h-[21px] shrink-0 w-[69px] opacity-80 hover:opacity-100 transition-opacity">
        <svg className="block size-full" fill="none" viewBox="0 0 70 21">
          <g clipPath="url(#amazon_clip)">
            <path d={svgPaths.p356c9a80} fill="#2A2A2B" />
            <path d={svgPaths.p2b48a980} fill="#2A2A2B" />
            <path d={svgPaths.pd4c2d80} fill="#2A2A2B" />
            <path d={svgPaths.p32526400} fill="#2A2A2B" />
            <path d={svgPaths.p3f3d5a80} fill="#2A2A2B" />
            <path d={svgPaths.p1c5aa100} fill="#2A2A2B" />
            <path d={svgPaths.p18633400} fill="#2A2A2B" />
            <path d={svgPaths.p30a72080} fill="#2A2A2B" />
          </g>
          <defs>
            <clipPath id="amazon_clip">
              <rect fill="white" height="21" width="69.3" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Logo 4 */}
      <div className="h-7 shrink-0 flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 relative">
          <svg className="block size-full" fill="none" viewBox="0 0 26 26">
            <path d={svgPaths.p24272e00} fill="#222222" fillOpacity="0.35" />
            <path d={svgPaths.p33312200} fill="#2A2A2B" />
            <path d={svgPaths.p1fe7f100} fill="#2A2A2B" />
          </svg>
        </div>
        <div className="h-4 relative w-[60px]">
          <svg className="block size-full" fill="none" viewBox="0 0 60 16">
            <path d={svgPaths.p17f2000} fill="#2A2A2B" />
            <path d={svgPaths.p216bf380} fill="#2A2A2B" />
            <path d={svgPaths.p34f4d900} fill="#2A2A2B" />
            <path d={svgPaths.p2f2a6f00} fill="#2A2A2B" />
            <path d={svgPaths.p372e18c0} fill="#2A2A2B" />
            <path d={svgPaths.pe68f280} fill="#2A2A2B" />
            <path d={svgPaths.p1d025900} fill="#2A2A2B" />
          </svg>
        </div>
      </div>
    </>
  );
}

function LogoSet({ partners }: { partners?: PartnerItem[] }) {
  if (partners && partners.length > 0) {
    return (
      <div className="flex shrink-0 items-center gap-10 md:gap-16 pr-10 md:pr-16">
        {partners.map((partner, idx) => (
          <div
            key={`${partner.id}-${idx}`}
            className="h-8 shrink-0 flex items-center gap-2 px-3 py-1 bg-white/70 dark:bg-[#161819] border border-zinc-200/60 dark:border-white/10 rounded-[4px] hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-colors"
            title={partner.name}
          >
            {partner.logoUrl ? (
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  unoptimized={true}
                  sizes="24px"
                  className="object-contain"
                />
              </div>
            ) : null}
            <span className="font-space font-medium text-xs md:text-sm text-[#2a2a2b] dark:text-zinc-200 tracking-wider uppercase whitespace-nowrap">
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-10 md:gap-16 pr-10 md:pr-16 dark:brightness-200 dark:contrast-125">
      <DefaultLogos />
    </div>
  );
}

export function PartnerLogos({ partners }: PartnerLogosProps) {
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
