"use client";

import React from "react";
import Image from "next/image";
import svgPaths from "@/lib/svgPaths";
import type { PartnerItem } from "@/lib/services/partner.service";
import styles from "./PartnerLogos.module.css";

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
      <div className={`${styles.logoSet} flex shrink-0 items-center gap-8 sm:gap-12 md:gap-16 pr-8 sm:pr-12 md:pr-16`}>
        {partners.map((partner, idx) => {
          if (!partner.logoUrl) return null;

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

  return (
    <div className={`${styles.logoSet} flex shrink-0 items-center gap-8 sm:gap-12 md:gap-16 pr-8 sm:pr-12 md:pr-16 dark:brightness-200 dark:contrast-125`}>
      <DefaultLogos />
    </div>
  );
}

export function PartnerLogos({ partners }: PartnerLogosProps) {
  return (
    <div className={`${styles.viewport} relative w-full overflow-hidden py-4`}>
      {/* Edge gradient masks for smooth fade on margins */}
      <div aria-hidden="true" className={`${styles.mask} pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-20`} />
      <div aria-hidden="true" className={`${styles.mask} pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-20`} />

      {/* Infinite scrolling track */}
      <div
        className={`${styles.track} animate-marquee flex w-max`}
      >
        {/* First Half (Track A) */}
        <div className="flex shrink-0 items-center">
          <LogoSet partners={partners} />
          <div className={styles.duplicate} aria-hidden="true" inert>
            <LogoSet partners={partners} />
          </div>
        </div>

        {/* Second Half (Track B: exact clone for infinite 0% to -50% loop) */}
        <div className={`${styles.duplicate} flex shrink-0 items-center`} aria-hidden="true" inert>
          <LogoSet partners={partners} />
          <LogoSet partners={partners} />
        </div>
      </div>
    </div>
  );
}

export default PartnerLogos;
