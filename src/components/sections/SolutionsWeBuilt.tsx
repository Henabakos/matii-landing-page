"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import SolutionsTag from "./solutions/SolutionsTag";
import ProjectCard from "./solutions/ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";

import Image from "next/image";

const projects = [
  {
    title: "Liyana Care",
    description:
      "Before we build, we listen. We understand the problem, uncover what matters, and create thoughtful digital solutions designed to solve.",
    bgImage: "/images/ai-automation.png",
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

export function SolutionsWeBuilt() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="max-w-[1380px] mx-auto border border-[rgba(174,174,174,0.4)] p-6 md:p-12 relative overflow-hidden">
        {/* Top Section Tag Badge */}
        <div className="flex justify-center mb-8">
          <SolutionsTag />
        </div>

        {/* Headline and Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 lg:mb-16">
          <h2 className="lg:col-span-6 font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-[#292c2e] tracking-tight lowercase">
            Every solution we build starts with a deep understanding of Problems
          </h2>
          <p className="lg:col-span-6 font-inter font-normal text-base md:text-[20px] leading-[1.4] text-black lowercase lg:pt-2">
            Before we build, we listen. We understand the problem, uncover what
            matters, and create thoughtful digital solutions designed to solve
            it properly.
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
          <div className="hidden md:block absolute -top-1 left-0 w-32 h-26 lg:w-56 lg:h-48 z-10">
            <Image
              src="/shapes/solution-shape.svg"
              alt="hero-shape"
              className="object-contain"
              fill
            />
          </div>
          <CarouselContent>
            {projects.map((project, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <ProjectCard {...project} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls Bar matching template layout */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(174,174,174,0.3)]">
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
