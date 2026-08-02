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
  items = defaultGalleryItems,
}: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-14 border-b border-zinc-200">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative w-full aspect-video overflow-hidden bg-zinc-100 border border-zinc-200"
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectGallery;
