"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import svgPaths from "@/lib/svgPaths";

export interface ServiceCardProps {
  index: string;
  title: string;
  description?: string;
  items: string[];
  bgImage?: string;
  href?: string;
}

export function ServiceCard({
  index,
  title,
  description,
  items,
  bgImage = "/images/ai-automation.png",
  href = "/contact",
}: ServiceCardProps) {
  return (
    <Link href={href} className="block h-full">
      <div className="relative bg-white border border-[#AEAEAE]/40 p-6 md:p-8 flex flex-col justify-between h-full min-h-120 lg:min-h-140 overflow-hidden group cursor-pointer transition-all duration-500 ease-in-out hover:bg-[#292c2e]">
        {/* Optional Background Image on Hover */}
        {bgImage && (
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover size-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out pointer-events-none"
          />
        )}

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />

        {/* Top Tag Badge */}
        <div className="self-start bg-[#292c2e] group-hover:bg-[#f3f4f6] px-3 py-1.5 rounded-xs flex items-center gap-2.5 z-10 transition-colors duration-500 ease-in-out">
          <div className="bg-[#98ff03] size-3.5 shrink-0" />
          <span className="font-space font-normal text-xs md:text-sm text-white group-hover:text-[#292c2e] uppercase tracking-wider whitespace-nowrap transition-colors duration-500 ease-in-out">
            {title}
          </span>
        </div>

        {/* Optional Description Text (Shown on Hover or if available) */}
        {description && (
          <p className="font-inter font-medium text-xs md:text-[13px] text-white/90 leading-relaxed z-10 max-w-70 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            {description}
          </p>
        )}

        {/* Center Big Number */}
        <div className="relative my-auto flex items-center justify-center pointer-events-none select-none z-10">
          <span className="font-inter font-semibold text-[140px] sm:text-[170px] lg:text-[200px] leading-none text-[#f3f4f6] group-hover:text-white/70 uppercase tracking-tighter transition-colors duration-500 ease-in-out">
            {index}
          </span>
        </div>

        {/* Bottom Action & Items Container */}
        <div className="flex items-end justify-between z-10 mt-auto w-full">
          {/* Items List with Vertical Lime Line */}
          <div className="flex items-center gap-3.5">
            <div className="w-[2px] h-[68px] bg-[#98ff03] shrink-0" />
            <ul className="font-inter font-medium text-xs md:text-[14px] text-black group-hover:text-white leading-relaxed capitalize transition-colors duration-500 ease-in-out">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Arrow Action Badge (Reveals on Hover) */}
          <div className="bg-white p-2.5 rounded-[4px] shadow-md flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-y-3 group-hover:translate-y-0 hover:bg-[#f3f4f6]">
            <div className="size-5 md:size-6 relative">
              <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d={svgPaths.p127c5100}
                  fill="#292C2E"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
