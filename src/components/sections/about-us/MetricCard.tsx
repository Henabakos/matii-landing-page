import React from "react";

export interface MetricCardProps {
  iconPath: string;
  number: string;
  description: string;
}

export function MetricCard({ iconPath, number, description }: MetricCardProps) {
  return (
    <div className="relative bg-[#f3f4f6] dark:bg-white/5 border border-[rgba(174,174,174,0.2)] dark:border-white/10 p-4 md:p-5 flex items-center gap-5 md:gap-6 w-full transition-colors">
      {/* Architectural Corner Accents */}
      <div className="absolute bg-[#292c2e] dark:bg-white size-2.5 -top-1 -left-1 transition-colors" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-2.5 -bottom-1 -right-1 transition-colors" />

      {/* Icon Badge */}
      <div className="bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10 size-[87px] shrink-0 flex items-center justify-center p-5">
        <div className="size-10 relative shrink-0">
          <svg className="block size-full" fill="none" viewBox="0 0 40 40">
            <path d={iconPath} fill="#98FF03" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <span className="font-inter font-medium text-4xl md:text-[48px] leading-tight text-[#292c2e] dark:text-white -mb-1 transition-colors">
          {number}
        </span>
        <p className="font-inter font-normal text-xs md:text-[14px] text-[#444445] dark:text-zinc-300 leading-snug transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}

export default MetricCard;
