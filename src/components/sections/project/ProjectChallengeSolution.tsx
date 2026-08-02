"use client";

import React from "react";

export interface ProjectChallengeSolutionProps {
  challengeParagraphs?: string[];
  solutionParagraphs?: string[];
}

export function ProjectChallengeSolution({
  challengeParagraphs = [
    "Ragnarok needed to position itself as the premium choice for automation startups while entering a crowded AI market filled with similar solutions and competing messaging.",
    "The product had strong positioning potential but lacked clear structure and messaging that communicated its value to both technical users and business decision makers. Ragnarok needed a clear identity to stand out while competing against established automation platforms.",
  ],
  solutionParagraphs = [
    "We designed a premium conversion-focused experience that clarified positioning, strengthened messaging, and helped Ragnarok communicate value clearly with automation market.",
    "We designed a high-conversion layout focused on clarity, authority, and structured storytelling to help users understand value quickly. The new experience aligned visual direction with product strategy, improving engagement and supporting stronger positioning in the AI space.",
  ],
}: ProjectChallengeSolutionProps) {
  return (
    <div className="space-y-12 md:space-y-16 pb-16 border-b border-zinc-200">
      {/* THE CHALLENGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 bg-[#f3f4f6] border border-zinc-200 px-3 py-1.5 rounded-[2px]">
            <div className="bg-[#98ff03] size-3 shrink-0 border border-zinc-400/40" />
            <span className="font-space text-xs md:text-sm text-[#292c2e] uppercase tracking-wider font-bold">
              {"{THE CHALLENGE}"}
            </span>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4 font-inter text-zinc-700 text-sm md:text-base leading-relaxed">
          {challengeParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>

      {/* THE SOLUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 bg-[#f3f4f6] border border-zinc-200 px-3 py-1.5 rounded-[2px]">
            <div className="bg-[#98ff03] size-3 shrink-0 border border-zinc-400/40" />
            <span className="font-space text-xs md:text-sm text-[#292c2e] uppercase tracking-wider font-bold">
              {"{THE SOLUTION}"}
            </span>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4 font-inter text-zinc-700 text-sm md:text-base leading-relaxed">
          {solutionParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectChallengeSolution;
