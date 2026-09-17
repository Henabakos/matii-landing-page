"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

const defaultRelatedProjects: ProjectCardProps[] = [
  {
    id: "1",
    category: "Fintech",
    year: "2025",
    title: "Digital Wallet & Finance Website",
    description:
      "Next-gen mobile banking and web app platform crafted for lightning-fast digital asset transactions.",
    statLabel: "Conversion Lift: +65%",
    slug: "digital-wallet",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "2",
    category: "Healthcare SaaS",
    year: "2025",
    title: "Liyana Care Patient Portal",
    description:
      "Thoughtful digital clinical portal designed to solve patient communication bottlenecks efficiently.",
    statLabel: "User Retention: 98.4%",
    slug: "liyana-care",
    imageUrl: "/images/solutions-1.png",
  },
];

export function ProjectExploreMore() {
  return (
    <div className="pt-14 pb-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-space font-medium text-3xl sm:text-4xl md:text-[48px] text-[#292c2e] dark:text-white tracking-tight leading-tight">
            Explore More Work
          </h2>
          <p className="font-inter text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mt-2">
            Browse additional work focused on strategy, automation, and scalable
            design built to improve clarity and performance.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 bg-[#292c2e] dark:bg-white dark:text-[#292c2e] hover:bg-black dark:hover:bg-zinc-200 text-white transition-all px-5 py-3 text-xs font-space font-semibold tracking-wider uppercase shrink-0 group shadow-sm"
        >
          <span>More Projects</span>
          <div className="bg-[#98ff03] p-1 text-[#292c2e] transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight className="size-3.5" />
          </div>
        </Link>
      </div>

      {/* Project Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {defaultRelatedProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectExploreMore;
