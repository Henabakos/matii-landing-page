"use client";

import ToolsTag from "./tools/ToolsTag";
import ToolCard from "./tools/ToolCard";
import { row1Tools, row2Tools, row3Tools } from "@/data/techStack";

export function ToolsWeUse() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto py-6 md:py-12 relative bg-white dark:bg-transparent overflow-hidden transition-colors">
        {/* Top Section Tag Badge */}
        <div className="flex justify-center mb-8">
          <ToolsTag />
        </div>

        {/* 2-Column Section Layout matching @tools-we-use design system */}
        <div className="relative w-full bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.4)] dark:border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors">
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 right-0 z-10 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 left-0 z-10 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 right-0 z-10 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 left-0 z-10 transition-colors" />

          {/* Left Column: Smaller column containing text */}
          <div className="lg:col-span-4 p-8 md:p-12 flex items-center justify-start border-b lg:border-b-0 lg:border-r border-[rgba(174,174,174,0.3)] dark:border-white/10">
            <h2 className="font-inter font-medium text-3xl sm:text-4xl text-[#292c2e] dark:text-white leading-tight tracking-tight lowercase max-w-sm transition-colors">
              tools we use to help your business
            </h2>
          </div>

          {/* Right Column: Larger column containing sliding marquee rows */}
          <div className="lg:col-span-8 py-6 md:py-8 flex flex-col justify-center gap-4 overflow-hidden relative ">
            {/* Row 1: Slides Right */}
            <div className="overflow-hidden w-full">
              <div className="animate-slide-right gap-4">
                {[...row1Tools, ...row1Tools].map((tool, idx) => (
                  <ToolCard
                    key={`r1-${idx}`}
                    name={tool.name}
                    category={tool.category}
                    iconName={tool.iconName}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Slides Left */}
            <div className="overflow-hidden w-full">
              <div className="animate-slide-left gap-4">
                {[...row2Tools, ...row2Tools].map((tool, idx) => (
                  <ToolCard
                    key={`r2-${idx}`}
                    name={tool.name}
                    category={tool.category}
                    iconName={tool.iconName}
                  />
                ))}
              </div>
            </div>

            {/* Row 3: Slides Right */}
            <div className="overflow-hidden w-full">
              <div className="animate-slide-right gap-4">
                {[...row3Tools, ...row3Tools].map((tool, idx) => (
                  <ToolCard
                    key={`r3-${idx}`}
                    name={tool.name}
                    category={tool.category}
                    iconName={tool.iconName}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsWeUse;
