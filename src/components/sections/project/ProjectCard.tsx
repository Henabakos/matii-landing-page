"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ProjectCardProps {
  id?: string;
  category: string;
  year: string;
  title: string;
  description: string;
  statLabel: string;
  slug: string;
  imageUrl?: string;
}

export function ProjectCard({
  category,
  year,
  title,
  description,
  statLabel,
  slug,
  imageUrl = "/images/ai-automation.png",
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] overflow-hidden flex flex-col justify-between min-h-[400px] hover:border-[#98ff03] dark:hover:border-[#98ff03] block transition-all"
    >
      <div>
        {/* Full-width Project Thumbnail Image */}
        {imageUrl && (
          <div className="relative w-full aspect-video border-b border-zinc-200 dark:border-white/10 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        )}

        <div className="p-3 sm:p-5">
          <h3 className="font-space font-bold text-xl sm:text-2xl text-[#292c2e] dark:text-white group-hover:text-black dark:group-hover:text-[#98ff03] transition-colors mb-2">
            {title}
          </h3>
          <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs font-space text-zinc-600 dark:text-zinc-400">
        <span className="font-medium">{statLabel}</span>
        <span className="group-hover:translate-x-1 transition-transform text-[#292c2e] dark:text-white group-hover:text-[#98ff03] dark:group-hover:text-[#98ff03] font-bold">
          View Project →
        </span>
      </div>
    </Link>
  );
}

export default ProjectCard;
