"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  /** Optional uppercase category or section tag badge (e.g., "CAPABILITIES & SYSTEMS") */
  tag?: string;
  /** Main title - can be a string or ReactNode for custom line breaks */
  title: React.ReactNode;
  /** Context description paragraph placed on the right side */
  description: string;
  /** Decorative top-left shape SVG (defaults to "/shapes/hero-shape.svg") */
  shapeSrc?: string;
  /** Decorative bottom-right shape SVG (defaults to "/shapes/hero-shape.svg") */
  bottomShapeSrc?: string;
  /** Optional children (e.g. CTA buttons, search bar, filters) */
  children?: React.ReactNode;
  /** Additional container classes */
  className?: string;
}

export function PageHeader({
  tag,
  title,
  description,
  shapeSrc = "/shapes/hero-shape.svg",
  bottomShapeSrc = "/shapes/hero-shape.svg",
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.4)] dark:border-white/10 min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] flex flex-col justify-end transition-colors duration-200",
        className
      )}
    >
      {/* Signature Rectangular Corner Pins from Design System */}
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-0.5 -left-0.5 z-20 transition-colors duration-200" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-0.5 -right-0.5 z-20 transition-colors duration-200" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-0.5 -left-0.5 z-20 transition-colors duration-200" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-0.5 -right-0.5 z-20 transition-colors duration-200" />

      {/* Top-Left Stepped Geometric Pattern Shape */}
      {shapeSrc && (
        <div
          className="hidden md:block absolute top-0 left-0 w-32 h-24 lg:w-56 lg:h-48 pointer-events-none z-0 dark:opacity-80"
          style={{ position: "absolute" }}
        >
          <Image
            src={shapeSrc}
            alt="header-pattern-top"
            className="object-contain"
            fill
            priority
          />
        </div>
      )}

      {/* Bottom-Right Rotated Stepped Geometric Pattern Shape */}
      {bottomShapeSrc && (
        <div
          className="hidden md:block absolute -bottom-6 lg:-bottom-10 right-0 w-28 h-24 lg:w-44 lg:h-36 pointer-events-none z-0 opacity-75 dark:opacity-60"
          style={{ position: "absolute" }}
        >
          <Image
            src={bottomShapeSrc}
            alt="header-pattern-bottom"
            className="rotate-180 object-contain"
            fill
          />
        </div>
      )}

      {/* Split 2-Column Content Layout with Generous Headroom and Optical Breathing Space */}
      <div className="relative z-10 px-6 sm:px-10 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 lg:pt-32 pb-10 sm:pb-14 md:pb-16 lg:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Section Tag + Big Bold Headline */}
          <div className="lg:col-span-7">
            {tag && (
              <p className="font-urbanist uppercase text-xs md:text-sm font-medium tracking-[0.1em] text-[#292c2e] dark:text-zinc-400 mb-4 transition-colors">
                {tag}
              </p>
            )}
            <h1 className="font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] lg:text-[54px] leading-[1.14] text-[#292c2e] dark:text-white tracking-tight">
              {title}
            </h1>
          </div>

          {/* Right Column: Context Description paragraph aligned with baseline */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-urbanist font-normal text-base sm:text-lg md:text-[18px] leading-[1.5] text-[#444445] dark:text-zinc-300">
              {description}
            </p>
            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
