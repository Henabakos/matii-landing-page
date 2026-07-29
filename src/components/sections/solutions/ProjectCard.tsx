"use client";

import Image from "next/image";
import svgPaths from "@/lib/svgPaths";

export interface ProjectCardProps {
  title: string;
  description: string;
  bgImage: string;
  projectUrl?: string;
  metrics: {
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
}

export function ProjectCard({
  title,
  description,
  bgImage,
  projectUrl = "https://calendly.com/motiondigitals/30min",
  metrics,
}: ProjectCardProps) {
  return (
    <div className="relative w-full h-[480px] sm:h-[540px] md:h-[584px] overflow-hidden rounded-[4px]  group ">
      {/* Project Unique Background Image */}
      <Image
        src={bgImage}
        alt={title}
        fill
        className="object-cover size-full group-hover:scale-105 transition-transform duration-700 pointer-events-none"
      />

      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 z-20 bg-[#292c2e] text-white px-4 py-2 rounded-[2px] flex items-center gap-2 text-xs md:text-sm font-space uppercase tracking-wider hover:bg-[#383b3e] transition-all shadow-lg border border-white/10"
      >
        <span>View project</span>
        <div className="size-4 relative shrink-0">
          <svg className="block size-full" fill="none" viewBox="0 0 16 16">
            <path
              d={svgPaths.p159fbc80}
              stroke="#98FF03"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      </a>

      {/* Bottom-Left Overlay Box matching Group28 / Group30 */}
      <div className="absolute bottom-0 left-0 md:right-auto max-w-[540px] bg-[#292c2e]/60 p-6 md:p-8 border border-white/10 backdrop-blur-md z-20 shadow-2xl">
        {/* Project Title */}
        <h3 className="font-space font-bold text-2xl sm:text-4xl text-white tracking-tight capitalize mb-2">
          {title}
        </h3>

        {/* Project Description */}
        <p className="font-inter font-normal text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
          {description}
        </p>

        {/* Divider Line */}
        <div className="w-full border-t border-white/20 mb-4" />

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Stat 1 */}
          <div className="flex flex-col">
            <span className="font-space font-medium text-xl sm:text-3xl text-white leading-tight">
              {metrics.stat1Value}
            </span>
            <span className="font-inter font-normal text-[10px] sm:text-xs text-white/60 lowercase">
              {metrics.stat1Label}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col border-l border-white/20 pl-4">
            <span className="font-space font-medium text-xl sm:text-3xl text-white leading-tight">
              {metrics.stat2Value}
            </span>
            <span className="font-inter font-normal text-[10px] sm:text-xs text-white/60 lowercase">
              {metrics.stat2Label}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col border-l border-white/20 pl-4">
            <span className="font-space font-medium text-xl sm:text-3xl text-white leading-tight">
              {metrics.stat3Value}
            </span>
            <span className="font-inter font-normal text-[10px] sm:text-xs text-white/60 lowercase">
              {metrics.stat3Label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
