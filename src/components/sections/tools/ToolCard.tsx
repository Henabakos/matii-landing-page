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
    <div className="relative bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/10 p-2.5 px-4 flex items-center justify-center transition-all duration-300 group shrink-0">
      {/* Icon Badge */}
      <div className="size-10 flex items-center justify-center text-[#292c2e] dark:text-zinc-200">
        <TechIcon name={iconName || name} className="size-8 text-[#292c2e] dark:text-zinc-200" />
      </div>
    </div>
  );
}

export default ToolCard;
