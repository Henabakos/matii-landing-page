"use client";

import React from "react";
import Image from "next/image";
import SectionTag from "@/components/common/SectionTag";
import ProjectMeta from "@/components/sections/project/ProjectMeta";
import ProjectChallengeSolution from "@/components/sections/project/ProjectChallengeSolution";
import ProjectGallery from "@/components/sections/project/ProjectGallery";
import ProjectResults from "@/components/sections/project/ProjectResults";
import ProjectExploreMore from "@/components/sections/project/ProjectExploreMore";

export interface ProjectDetailPageProps {
  slug?: string;
  title?: string;
  subtitle?: string;
  coverImage?: string;
  clientName?: string;
  clientLogoText?: string;
  liveUrl?: string;
  timeline?: string;
  services?: string;
}

export function ProjectDetailPage({
  slug,
  title = "AI Agent Website Built for Automation Startups",
  subtitle = "AI-driven automation systems improved engagement and conversion clarity for a SaaS company, reducing friction.",
  coverImage = "/images/ai-automation.png",
  clientName = "Ragnarok AI",
  clientLogoText = "R",
  liveUrl = "https://calendly.com/motiondigitals/30min",
  timeline = "3 Months",
  services = "NLP Solutions • AI Automation • AI Integration",
}: ProjectDetailPageProps) {
  const formattedSlugTag = slug
    ? `PROJECT // ${slug.replace(/-/g, " ").toUpperCase()}`
    : "PROJECT DETAIL";

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 overflow-hidden ">
      <div className="max-w-[1380px] mx-auto relative overflow-hidden text-[#292c2e]">
        {/* Background Decorative Graphic Shapes matching Landing Page */}
        <div className="hidden md:block absolute top-0 right-0 w-32 h-26 lg:w-56 lg:h-48 opacity-[0.06] pointer-events-none">
          <Image
            src="/shapes/white-shape.svg"
            alt="shape"
            className="object-contain"
            fill
          />
        </div>
        <div className="hidden md:block absolute bottom-0 left-0 w-32 h-26 lg:w-56 lg:h-48 opacity-[0.06] pointer-events-none">
          <Image
            src="/shapes/solution-shape.svg"
            alt="shape"
            className="object-contain"
            fill
          />
        </div>

        {/* 1. TOP SECTION TAG & HERO HEADER */}
        <div className="mb-6">
          <SectionTag title={formattedSlugTag} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 md:mb-14">
          <div className="lg:col-span-8">
            <h1 className="font-space font-medium text-3xl sm:text-5xl md:text-[56px] lg:text-[64px] leading-[1.12] text-[#292c2e] tracking-tight">
              {title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="font-inter font-normal text-sm sm:text-base md:text-[18px] leading-[1.5] text-zinc-600">
              {subtitle}
            </p>
          </div>
        </div>

        {/* MAIN HERO PROJECT COVER IMAGE */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[4px] border border-zinc-200 overflow-hidden shadow-md mb-12">
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* METADATA BAR */}
        <ProjectMeta
          clientName={clientName}
          clientLogoText={clientLogoText}
          liveUrl={liveUrl}
          timeline={timeline}
          services={services}
        />

        {/* 2. THE CHALLENGE & THE SOLUTION SECTIONS */}
        <ProjectChallengeSolution />

        {/* 3. BRAND IDENTITY & PROJECT GALLERY GRID (2x2) */}
        <ProjectGallery />

        {/* 4. RESULTS METRICS SECTION */}
        <ProjectResults />

        {/* 5. EXPLORE MORE WORK SECTION */}
        <ProjectExploreMore />
      </div>
    </div>
  );
}

export default ProjectDetailPage;
