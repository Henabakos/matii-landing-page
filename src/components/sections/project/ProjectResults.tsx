"use client";

import React from "react";

export interface ProjectResultsProps {
  demoClickGrowth?: string;
  higherEngagement?: string;
  pipelineInfluence?: string;
  qualifiedLeads?: string;
}

export function ProjectResults({
  demoClickGrowth = "13.2",
  higherEngagement = "42",
  pipelineInfluence = "$80K",
  qualifiedLeads = "77",
}: ProjectResultsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 md:py-18 border-b border-zinc-200 dark:border-white/10 items-start">
      <div className="lg:col-span-4">
        <div className="inline-flex items-center gap-2 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-[2px]">
          <div className="bg-[#98ff03] size-3 shrink-0 border border-zinc-400/40" />
          <span className="font-space text-xs md:text-sm text-[#292c2e] dark:text-white uppercase tracking-wider font-bold">
            {"{THE RESULTS}"}
          </span>
        </div>
      </div>

      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
        {/* Stat Column 1 */}
        <div className="space-y-8">
          <div>
            <span className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium block mb-1">
              Demo Click Growth
            </span>
            <span className="font-space font-bold text-4xl sm:text-6xl text-[#292c2e] dark:text-white tracking-tight">
              {demoClickGrowth}
              <span className="px-1 ml-0.5 text-[#98ff03]">x</span>
            </span>
          </div>

          <div>
            <span className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium block mb-1">
              Higher Engagement
            </span>
            <span className="font-space font-bold text-4xl sm:text-6xl text-[#292c2e] dark:text-white tracking-tight">
              {higherEngagement}
              <span className=" px-1 ml-0.5 text-[#98ff03]">%</span>
            </span>
          </div>
        </div>

        {/* Stat Column 2 */}
        <div className="space-y-8 sm:border-l sm:border-zinc-200 dark:sm:border-white/10 sm:pl-8 md:pl-12">
          <div>
            <span className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium block mb-1">
              Pipeline Influence
            </span>
            <span className="font-space font-bold text-4xl sm:text-6xl text-[#292c2e] dark:text-white tracking-tight">
              {pipelineInfluence}
              <span className=" px-1 ml-0.5 text-[#98ff03]">+</span>
            </span>
          </div>

          <div>
            <span className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium block mb-1">
              Qualified Leads
            </span>
            <span className="font-space font-bold text-4xl sm:text-6xl text-[#292c2e] dark:text-white tracking-tight">
              {qualifiedLeads}
              <span className=" px-1 ml-0.5 text-[#98ff03]">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectResults;
