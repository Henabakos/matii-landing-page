"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ProjectMetaProps {
  clientName?: string;
  clientLogoText?: string;
  liveUrl?: string;
  timeline?: string;
  services?: string;
}

export function ProjectMeta({
  clientName = "Ragnarok AI",
  clientLogoText = "R",
  liveUrl = "https://calendly.com/motiondigitals/30min",
  timeline = "3 Months",
  services = "NLP Solutions • AI Automation • AI Integration",
}: ProjectMetaProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-zinc-200 mb-14">
      {/* Column 1: Client */}
      <div className="flex flex-col gap-3">
        <span className="font-space text-xs sm:text-sm uppercase tracking-wider text-zinc-500 font-semibold">
          Client
        </span>
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 bg-[#292c2e] text-[#98ff03] rounded-[2px] flex items-center justify-center font-bold text-xs font-space">
              {clientLogoText}
            </div>
            <span className="font-space font-bold text-lg md:text-xl text-[#292c2e]">
              {clientName}
            </span>
          </div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-space text-sm text-[#292c2e] font-semibold hover:text-black transition-colors"
          >
            <span>Live Preview</span>
            <div className="bg-[#98ff03] p-1 rounded-[2px] text-[#292c2e]">
              <ArrowUpRight className="size-3" />
            </div>
          </a>
        </div>
      </div>

      {/* Column 2: Timeline */}
      <div className="flex flex-col gap-2 md:border-l md:border-zinc-200 md:pl-8">
        <span className="font-space text-xs sm:text-sm uppercase tracking-wider text-zinc-500 font-semibold">
          Timeline
        </span>
        <span className="font-space font-medium text-2xl sm:text-3xl text-[#292c2e]">
          {timeline}
        </span>
      </div>

      {/* Column 3: Services */}
      <div className="flex flex-col gap-2 md:border-l md:border-zinc-200 md:pl-8">
        <span className="font-space text-xs sm:text-sm uppercase tracking-wider text-zinc-500 font-semibold">
          Services
        </span>
        <span className="font-space font-medium text-lg sm:text-xl text-[#292c2e] leading-snug">
          {services}
        </span>
      </div>
    </div>
  );
}

export default ProjectMeta;
