"use client";

import { useState } from "react";
import ProjectCard, {
  ProjectCardProps,
} from "@/components/sections/project/ProjectCard";
import Image from "next/image";

const allProjects: ProjectCardProps[] = [
  {
    id: "1",
    category: "AI Automation",
    year: "2025",
    title: "Ragnarok AI Agent Platform",
    description:
      "AI-driven automation system improving engagement and conversion clarity for SaaS startups.",
    statLabel: "Demo Clicks: +13.2x",
    slug: "ragnarok-ai",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "2",
    category: "Healthcare SaaS",
    year: "2025",
    title: "Liyana Care Patient Portal",
    description:
      "Thoughtful clinical portal designed to eliminate patient communication bottlenecks efficiently.",
    statLabel: "User Retention: 98.4%",
    slug: "liyana-care",
    imageUrl: "/images/solutions-1.png",
  },
  {
    id: "3",
    category: "Cloud Operations",
    year: "2025",
    title: "Nexis SaaS Enterprise Platform",
    description:
      "Automated cloud workspace streamlining operations across 10+ global enterprise locations.",
    statLabel: "Operation Speed: +60%",
    slug: "nexis-saas-platform",
    imageUrl: "/images/faq-illustration.png",
  },
  {
    id: "4",
    category: "Fintech & Mobile",
    year: "2025",
    title: "Apex Mobile Asset Wallet",
    description:
      "High-performance mobile banking and asset wallet built for instant digital transactions.",
    statLabel: "Downloads: 100k+",
    slug: "apex-mobile-app",
    imageUrl: "/images/about-illustration.png",
  },
  {
    id: "5",
    category: "Fintech & Mobile",
    year: "2024",
    title: "Digital Asset & Exchange Web App",
    description:
      "Responsive financial trading interface designed for clarity, security, and high performance.",
    statLabel: "Conversion Lift: +65%",
    slug: "digital-wallet",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "6",
    category: "AI Automation",
    year: "2024",
    title: "Smart Workflow Orchestration",
    description:
      "Custom AI workflow agents automating complex enterprise data pipelines seamlessly.",
    statLabel: "Time Saved: 45%",
    slug: "workflow-orchestration",
    imageUrl: "/images/solutions-1.png",
  },
];

const categories = [
  "All",
  "AI Automation",
  "Healthcare SaaS",
  "Cloud Operations",
  "Fintech & Mobile",
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <section className="relative w-full pt-12 md:pt-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-345 mx-auto relative">
        <div className="hidden md:block absolute top-0 right-0 w-32 h-26 lg:w-56 lg:h-48">
          <Image
            src="/shapes/project-shape.svg"
            alt="hero-shape"
            className="object-contain "
            fill
          />
        </div>

        {/* Section Header Tag */}
        <div className="mb-6">
          <div className="inline-flex gap-2.5 items-center bg-white px-2.5 py-1">
            <div className="bg-[#98ff03] size-4 shrink-0" />
            <span className="font-space font-normal text-base md:text-lg text-black uppercase tracking-wider whitespace-nowrap">
              OUR WORK & PROJECTS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          <h2 className="lg:col-span-6 font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black tracking-tight">
            SOLUTIONS WE BUILT FOR
            <br />
            FORWARD-THINKING TEAMS.
          </h2>
        </div>
        {/* Pill Category Filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`font-space text-xs md:text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#292c2e] text-white shadow-md border border-[#292c2e]"
                    : "bg-[#f3f4f6] text-[#292c2e] hover:bg-zinc-200 border border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
