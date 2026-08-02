"use client";

import React from "react";
import Link from "next/link";

export interface ProjectCardProps {
  id?: string;
  category: string;
  year: string;
  title: string;
  description: string;
  statLabel: string;
  slug: string;
}

export function ProjectCard({
  category,
  year,
  title,
  description,
  statLabel,
  slug,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative rounded-[4px] border border-zinc-200 bg-white overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[340px] hover:border-[#292c2e] shadow-sm hover:shadow-md transition-all block"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#f3f4f6] border border-zinc-200 px-3 py-1 rounded-full text-[#292c2e] text-xs font-space font-medium">
          <span className="size-1.5 rounded-full bg-[#98ff03]" />
          <span>{category}</span>
        </div>
        <span className="font-mono text-xs text-zinc-400">{year}</span>
      </div>

      <div>
        <h3 className="font-space font-bold text-2xl sm:text-3xl text-[#292c2e] group-hover:text-black transition-colors mb-2">
          {title}
        </h3>
        <p className="font-inter text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-6 border-t border-zinc-200 flex items-center justify-between text-xs font-space text-zinc-600">
        <span className="font-medium">{statLabel}</span>
        <span className="group-hover:translate-x-1 transition-transform text-[#292c2e] font-bold">
          View Project →
        </span>
      </div>
    </Link>
  );
}

export default ProjectCard;
