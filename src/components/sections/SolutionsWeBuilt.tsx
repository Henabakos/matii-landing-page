"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import SolutionsTag from "./solutions/SolutionsTag";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";

import SolutionCard, { SolutionCardProps } from "./solutions/SolutionCard";
import Image from "next/image";
import type { ParsedProject } from "@/lib/services/project.service";

const defaultProjects: SolutionCardProps[] = [
  {
    title: "Liyana Care",
    description:
      "Before we build, we listen. We understand the problem, uncover what matters, and create thoughtful digital solutions designed to solve.",
    bgImage: "/images/ai-automation.png",
    projectUrl: "/projects/liyana-care",
    metrics: {
      stat1Value: "40%",
      stat1Label: "fast completion",
      stat2Value: "25%",
      stat2Label: "user engagement",
      stat3Value: "4.8",
      stat3Label: "star rating",
    },
  },
  {
    title: "Nexis SaaS Platform",
    description:
      "Engineered an automated cloud workspace that streamlined internal operations and enhanced team collaboration across 10+ global locations.",
    bgImage: "/images/ai-automation.png",
    projectUrl: "/projects/nexis-saas-platform",
    metrics: {
      stat1Value: "60%",
      stat1Label: "speed increase",
      stat2Value: "3.5x",
      stat2Label: "scale capacity",
      stat3Value: "4.9",
      stat3Label: "star rating",
    },
  },
  {
    title: "Apex Mobile App",
    description:
      "Designed and deployed a modern mobile experience providing real-time analytics, secure transactions, and seamless user journeys.",
    bgImage: "/images/ai-automation.png",
    projectUrl: "/projects/apex-mobile-app",
    metrics: {
      stat1Value: "100k+",
      stat1Label: "downloads",
      stat2Value: "99.9%",
      stat2Label: "uptime",
      stat3Value: "5.0",
      stat3Label: "star rating",
    },
  },
];

interface SolutionsWeBuiltProps {
  projects?: ParsedProject[];
}

export function SolutionsWeBuilt({ projects }: SolutionsWeBuiltProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  const displayProjects: SolutionCardProps[] =
    projects && projects.length > 0
      ? projects.map((p) => ({
        title: p.title,
        description: p.subtitle,
        bgImage: p.coverImage || "/images/ai-automation.png",
        projectUrl: `/projects/${p.slug}`,
        metrics: {
          stat1Value:
            p.metrics.stat1Value ||
            (p.metrics.demoClickGrowth ? `+${p.metrics.demoClickGrowth}x` : "40%"),
          stat1Label: p.metrics.stat1Label || "growth",
          stat2Value:
            p.metrics.stat2Value ||
            (p.metrics.higherEngagement ? `${p.metrics.higherEngagement}%` : "98%"),
          stat2Label: p.metrics.stat2Label || "retention",
          stat3Value:
            p.metrics.stat3Value ||
            (p.metrics.qualifiedLeads ? `${p.metrics.qualifiedLeads}%` : "4.9"),
          stat3Label: p.metrics.stat3Label || "satisfaction",
        },
      }))
      : defaultProjects;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto border border-[rgba(174,174,174,0.4)] dark:border-white/10 bg-white dark:bg-[#161819] p-6 md:p-12 relative overflow-hidden transition-colors duration-200">
        {/* Top Section Tag Badge */}
        <div className="flex justify-center mb-8">
          <SolutionsTag />
        </div>

        {/* Headline and Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 lg:mb-16">
          <h2 className="lg:col-span-6 font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black dark:text-white tracking-tight transition-colors">
            Understanding Needs.
            <br /> Driving Progress.
          </h2>
          <p className="lg:col-span-6 font-urbanist font-normal text-base md:text-[18px] leading-[1.4] text-[#444445] dark:text-zinc-300 lg:pt-2 transition-colors">
            We understand your priorities and challenges, then build practical solutions that create measurable impact and lasting progress.
          </p>
        </div>

        {/* Shadcn Carousel Integration */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <div className="hidden md:block absolute -top-1 left-0 w-32 h-26 lg:w-56 lg:h-48 z-10 dark:opacity-80">
            <Image
              src="/shapes/solution-shape.svg"
              alt="hero-shape"
              className="object-contain"
              fill
            />
          </div>
          <CarouselContent>
            {displayProjects.map((project, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <SolutionCard {...project} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls Bar matching template layout */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(174,174,174,0.3)] dark:border-white/10">
            <CarouselDots />
            <div className="flex items-center gap-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default SolutionsWeBuilt;
