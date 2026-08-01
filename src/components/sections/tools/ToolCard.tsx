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
    <div className="relative bg-[#f3f4f6] p-2.5 px-4 flex items-center justify-center transition-all duration-300 group shrink-0">
      {/* Icon Badge */}
      <div className="size-10 flex items-center justify-center text-[#292c2e]">
        <TechIcon name={iconName || name} className="size-8 text-[#292c2e]" />
      </div>
    </div>
  );
}

export default ToolCard;
