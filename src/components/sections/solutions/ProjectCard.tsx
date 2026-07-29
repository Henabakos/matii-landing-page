"use client";

import React, { useState, useRef } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[480px] sm:h-[540px] md:h-[584px] overflow-hidden rounded-[4px] group cursor-pointer"
    >
      {/* Whole Card Click Target Link */}
      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`View project ${title}`}
      />

      {/* Project Unique Background Image */}
      <Image
        src={bgImage}
        alt={title}
        fill
        className="object-cover size-full group-hover:scale-105 transition-transform duration-700 pointer-events-none"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-[5]" />

      {/* Smooth Magnetic Cursor-Following "View Project" Button */}
      <div
        className="hidden md:flex absolute top-0 left-0 z-30 pointer-events-none bg-[#292c2e] text-white px-4 py-2 rounded-[2px] items-center gap-2 text-xs md:text-sm font-space uppercase tracking-wider shadow-2xl border border-white/20 transition-[transform,opacity] duration-300 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1 : 0.7})`,
          opacity: isHovered ? 1 : 0,
        }}
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
      </div>

      {/* Mobile/Touch Fallback Static Button (Top Right) */}
      <div className="md:hidden absolute top-4 right-4 z-20 bg-[#292c2e] text-white px-3 py-1.5 rounded-[2px] flex items-center gap-2 text-xs font-space uppercase tracking-wider shadow-lg border border-white/10 pointer-events-none">
        <span>View project</span>
        <div className="size-3.5 relative shrink-0">
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
      </div>

      {/* Bottom-Left Overlay Box matching Group28 / Group30 */}
      <div className="absolute bottom-0 left-0 md:right-auto max-w-[540px] bg-[#292c2e]/75 p-6 md:p-8 border border-white/10 backdrop-blur-md z-20 shadow-2xl pointer-events-none">
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
