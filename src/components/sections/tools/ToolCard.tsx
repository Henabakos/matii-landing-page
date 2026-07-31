import React from "react";
import TechIcon from "./TechIcon";

export interface ToolCardProps {
  name: string;
  category: string;
  iconName?: string;
  icon?: string;
}

export function ToolCard({ name, category, iconName, icon }: ToolCardProps) {
  return (
    <div className="relative bg-[#f3f4f6] border border-[rgba(174,174,174,0.3)] p-4 md:p-5 flex items-center gap-4 min-w-[200px] sm:min-w-[230px] rounded-[4px] shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md cursor-pointer group">
      {/* Icon Badge */}
      <div className="bg-[#292c2e] size-11 shrink-0 rounded-[4px] flex items-center justify-center p-2 text-[#98ff03]">
        <TechIcon name={iconName || name} className="size-6" />
      </div>

      {/* Tool Details */}
      <div className="flex flex-col">
        <span className="font-inter font-semibold text-base text-[#292c2e] leading-snug group-hover:text-black transition-colors">
          {name}
        </span>
        <span className="font-inter font-normal text-xs text-[#797f8b] capitalize">
          {category}
        </span>
      </div>
    </div>
  );
}

export default ToolCard;
