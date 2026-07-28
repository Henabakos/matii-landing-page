import React from "react";

export interface MetricCardProps {
  iconPath: string;
  number: string;
  description: string;
}

export function MetricCard({ iconPath, number, description }: MetricCardProps) {
  return (
    <div className="relative bg-[#f3f4f6] border border-[rgba(174,174,174,0.2)] p-4 md:p-5 flex items-center gap-5 md:gap-6 w-full">
      {/* Architectural Corner Accents */}
      <div className="absolute bg-[#292c2e] size-2.5 -top-1 -left-1" />
      <div className="absolute bg-[#292c2e] size-2.5 -bottom-1 -right-1" />

      {/* Icon Badge */}
      <div className="bg-[#292c2e] size-[87px] shrink-0 flex items-center justify-center p-5">
        <div className="size-10 relative shrink-0">
          <svg className="block size-full" fill="none" viewBox="0 0 40 40">
            <path d={iconPath} fill="#98FF03" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <span className="font-inter font-medium text-4xl md:text-[48px] leading-tight text-[#292c2e] -mb-1">
          {number}
        </span>
        <p className="font-inter font-normal text-xs md:text-[14px] text-[#444445] leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}

export default MetricCard;
