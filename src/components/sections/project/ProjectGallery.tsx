"use client";

import React from "react";
import Image from "next/image";

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface ProjectGalleryProps {
  items?: GalleryItem[];
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "AI Workflow & Node Dashboard Design",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "2",
    title: "Brand Architecture & Swiss Style System",
    imageUrl: "/images/solutions-1.png",
  },
  {
    id: "3",
    title: "Mobile Application & Real-time Logs UI",
    imageUrl: "/images/faq-illustration.png",
  },
  {
    id: "4",
    title: "High Conversion Landing Page Architecture",
    imageUrl: "/images/about-illustration.png",
  },
];

export function ProjectGallery({
  items,
}: ProjectGalleryProps) {
  const validItems = (items || []).filter((item) => Boolean(item?.imageUrl && item.imageUrl.trim()));
  const displayItems = validItems.length > 0 ? validItems : defaultGalleryItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-14 border-b border-zinc-200 dark:border-white/10">
      {displayItems.map((item) => (
        <div
          key={item.id}
          className="group relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10"
        >
          <Image
            src={item.imageUrl}
            alt={item.title || "Project case study visual"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {item.title ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#292c2e]/90 via-[#292c2e]/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <p className="font-space text-xs font-bold uppercase tracking-wider text-white">
                {item.title}
              </p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default ProjectGallery;

