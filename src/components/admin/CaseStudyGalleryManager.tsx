"use client";

import React from "react";
import Image from "next/image";
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Layers, Sparkles } from "lucide-react";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface CaseStudyGalleryManagerProps {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}

const DEFAULT_SAMPLE_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "AI Workflow & Node Dashboard Design",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "gallery-2",
    title: "Brand Architecture & Swiss Style System",
    imageUrl: "/images/solutions-1.png",
  },
  {
    id: "gallery-3",
    title: "Mobile Application & Real-time Logs UI",
    imageUrl: "/images/faq-illustration.png",
  },
  {
    id: "gallery-4",
    title: "High Conversion Landing Page Architecture",
    imageUrl: "/images/about-illustration.png",
  },
];

export function CaseStudyGalleryManager({ items = [], onChange }: CaseStudyGalleryManagerProps) {
  const handleAddItem = () => {
    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `Case Study Visual #${items.length + 1}`,
      imageUrl: "",
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, updatedFields: Partial<GalleryItem>) => {
    const updated = [...items];
    updated[index] = { ...updated[index], ...updatedFields };
    onChange(updated);
  };

  const handleRemoveItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...items];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleLoadDefaults = () => {
    onChange(DEFAULT_SAMPLE_ITEMS);
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200/90 rounded-[4px] p-5 space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-[#292c2e]" />
            <h4 className="font-space text-xs font-bold uppercase tracking-wider text-[#292c2e]">
              Case Study Gallery Images
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/80 text-zinc-700 font-semibold">
              {items.length} {items.length === 1 ? "image" : "images"}
            </span>
          </div>
          <p className="text-[11px] font-inter text-zinc-500">
            Showcase screenshots, dashboard views, mobile UI, and visual deliverables on the project details page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {items.length === 0 && (
            <button
              type="button"
              onClick={handleLoadDefaults}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 text-[11px] font-space font-medium rounded-[3px] transition-all cursor-pointer"
              title="Preload standard template items"
            >
              <Sparkles className="size-3 text-[#292c2e]" />
              <span>Load Template</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#292c2e] hover:bg-black text-white text-[11px] font-space font-bold uppercase tracking-wider rounded-[3px] transition-all active:scale-[0.96] cursor-pointer shadow-xs"
          >
            <Plus className="size-3.5 text-[#98ff03]" />
            <span>Add Gallery Image</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-zinc-200 rounded-[4px] bg-white space-y-2">
          <ImageIcon className="size-8 text-zinc-300 mx-auto" />
          <p className="font-space text-xs font-semibold text-zinc-600">
            No Case Study Images Configured
          </p>
          <p className="font-inter text-[11px] text-zinc-400 max-w-sm mx-auto">
            Click &quot;Add Gallery Image&quot; above to upload screenshots or high-res deliverables via Cloudinary.
          </p>
        </div>
      ) : (
        /* Image Grid / List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white border border-zinc-200/90 rounded-[4px] p-3.5 space-y-3 shadow-xs relative group overflow-hidden"
            >
              {/* Card top toolbar */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="font-space text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-[2px]">
                  Visual #{index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(index)}
                    title="Move image up"
                    className="p-1 text-zinc-400 hover:text-black disabled:opacity-25 transition-colors cursor-pointer"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => handleMoveDown(index)}
                    title="Move image down"
                    className="p-1 text-zinc-400 hover:text-black disabled:opacity-25 transition-colors cursor-pointer"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>

                  <div className="w-[1px] h-3 bg-zinc-200 mx-0.5" />

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    title="Remove image from gallery"
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-[2px] transition-colors cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Title / Caption input */}
              <div className="space-y-1">
                <label className="text-[10px] font-space uppercase font-bold text-zinc-600 block">
                  Image Title / Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Interactive Dashboard UI, Node Architecture"
                  value={item.title || ""}
                  onChange={(e) => handleUpdateItem(index, { title: e.target.value })}
                  className="w-full border border-zinc-300 px-2.5 py-1.5 rounded-[3px] text-xs font-inter text-zinc-800 focus:outline-none focus:border-[#292c2e]"
                />
              </div>

              {/* Cloudinary upload picker */}
              <CloudinaryUploadButton
                label="Case Study Image Asset"
                hint="Upload or paste image URL"
                value={item.imageUrl || ""}
                onChange={(url) => handleUpdateItem(index, { imageUrl: url })}
                aspectRatio="video"
                layout="vertical"
                folder="Matii_projects"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CaseStudyGalleryManager;
