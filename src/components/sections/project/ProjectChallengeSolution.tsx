"use client";

import React from "react";

export interface ProjectChallengeSolutionProps {
  challengeParagraphs?: string[];
  solutionParagraphs?: string[];
}

export function ProjectChallengeSolution({
  challengeParagraphs = [],
  solutionParagraphs = [],
}: ProjectChallengeSolutionProps) {
  return (
    <div className="space-y-12 md:space-y-16 pb-16 border-b border-zinc-200 dark:border-white/10">
      {/* THE CHALLENGE */}
      {challengeParagraphs.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-[2px]">
            <div className="bg-[#98ff03] size-3 shrink-0 border border-zinc-400/40" />
            <span className="font-space text-xs md:text-sm text-[#292c2e] dark:text-white uppercase tracking-wider font-bold">
              {"{THE CHALLENGE}"}
            </span>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4 font-inter text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
          {challengeParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>}

      {/* THE SOLUTION */}
      {solutionParagraphs.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-[2px]">
            <div className="bg-[#98ff03] size-3 shrink-0 border border-zinc-400/40" />
            <span className="font-space text-xs md:text-sm text-[#292c2e] dark:text-white uppercase tracking-wider font-bold">
              {"{THE SOLUTION}"}
            </span>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4 font-inter text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
          {solutionParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>}
    </div>
  );
}

export default ProjectChallengeSolution;
