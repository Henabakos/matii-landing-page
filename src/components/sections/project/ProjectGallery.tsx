"use client";

import React from "react";
import Image from "next/image";

export interface GalleryItem {
  id: string;
  tag: string;
  title: string;
  imageUrl: string;
}

export interface ProjectGalleryProps {
  items?: GalleryItem[];
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    tag: "01 // INTERFACE DESIGN",
    title: "AI Workflow & Node Dashboard Design",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "2",
    tag: "02 // BRAND SYSTEM",
    title: "Brand Architecture & Swiss Style System",
    imageUrl: "/images/solutions-1.png",
  },
  {
    id: "3",
    tag: "03 // MOBILE APP",
    title: "Mobile Application & Real-time Logs UI",
    imageUrl: "/images/faq-illustration.png",
  },
  {
    id: "4",
    tag: "04 // CONVERSION ARCHITECTURE",
    title: "High Conversion Landing Page Architecture",
    imageUrl: "/images/about-illustration.png",
  },
];

export function ProjectGallery({
  items = defaultGalleryItems,
}: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-14 border-b border-zinc-200">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative w-full aspect-[4/3] rounded-[4px] overflow-hidden bg-zinc-100 border border-zinc-200 shadow-md transition-all duration-500 hover:border-[#292c2e]"
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="bg-[#292c2e]/90 backdrop-blur-md border border-zinc-700 text-[#98ff03] text-[10px] font-space uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider">
              {item.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectGallery;
