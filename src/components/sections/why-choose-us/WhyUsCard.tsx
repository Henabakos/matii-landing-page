import React from "react";

export interface WhyUsCardProps {
  iconPath: string;
  title: string;
  description: string;
}

export function WhyUsCard({ iconPath, title, description }: WhyUsCardProps) {
  return (
    <div className="relative border border-[rgba(174,174,174,0.2)] dark:border-white/10 p-6 md:p-8 flex flex-col justify-between h-full min-h-[295px] w-full transition-colors">
      {/* Corner Dot Accent from Template */}
      <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 -left-1" />

      {/* Icon Badge */}
      <div className="bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10 size-[70px] shrink-0 rounded-[6px] flex items-center justify-center p-4 shadow-[0px_4px_3.4px_rgba(42,42,43,0.25)] mb-6">
        <div className="size-9 relative shrink-0">
          <svg className="block size-full" fill="none" viewBox="0 0 40 40">
            <path d={iconPath} fill="#98FF03" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-urbanist font-medium text-xl md:text-[24px] leading-snug text-[#292c2e] dark:text-white lowercase transition-colors">
          {title}
        </h3>
        <p className="font-inter font-normal text-sm md:text-[16px] text-[#797f8b] dark:text-zinc-400 leading-relaxed lowercase transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}

export default WhyUsCard;
