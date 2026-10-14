"use client";

import { siteConfig } from "@/lib/site-config";
import { brandedTitle } from "@/lib/seo";
import React, { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Smartphone,
  Monitor,
  Tag,
  Search,
} from "lucide-react";

interface SeoMetaFieldsProps {
  seoTitle: string;
  setSeoTitle: (val: string) => void;
  seoDescription: string;
  setSeoDescription: (val: string) => void;
  seoKeywords: string;
  setSeoKeywords: (val: string) => void;
  defaultTitle: string;
  defaultDescription: string;
  slug: string;
  coverImage?: string;
  sectionPath?: "blog" | "news" | "projects" | "careers";
}

export function SeoMetaFields({
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,
  seoKeywords,
  setSeoKeywords,
  defaultTitle,
  defaultDescription,
  slug,
  coverImage,
  sectionPath = "blog",
}: SeoMetaFieldsProps) {
  const [activePreviewTab, setActivePreviewTab] = useState<"google" | "social">("google");
  const [googleDevice, setGoogleDevice] = useState<"desktop" | "mobile">("desktop");
  const [newKeywordInput, setNewKeywordInput] = useState("");

  const effectiveTitle = brandedTitle(seoTitle.trim() || defaultTitle || "Untitled Document");
  const effectiveDescription =
    seoDescription.trim() ||
    defaultDescription ||
    "Add a compelling meta description to maximize click-through rate from search engines.";

  const siteUrl = siteConfig.url;
  const fullUrl = `${siteUrl}/${sectionPath}/${slug || "preview-slug"}`;

  // Keyword array parsing
  const keywordsList = seoKeywords
    ? seoKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
    : [];

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = newKeywordInput.trim().replace(/^,|,$/g, "");
      if (val && !keywordsList.includes(val)) {
        const updated = [...keywordsList, val].join(", ");
        setSeoKeywords(updated);
      }
      setNewKeywordInput("");
    }
  };

  const handleRemoveKeyword = (tagToRemove: string) => {
    const updated = keywordsList.filter((k) => k !== tagToRemove).join(", ");
    setSeoKeywords(updated);
  };

  // SEO Health Checks
  const titleLen = effectiveTitle.length;
  const isTitleIdeal = titleLen >= 40 && titleLen <= 60;
  const isTitleTooLong = titleLen > 65;

  const descLen = effectiveDescription.length;
  const isDescIdeal = descLen >= 120 && descLen <= 160;
  const isDescTooLong = descLen > 165;

  return (
    <div className="bg-white dark:bg-[#16181b] border border-zinc-200/90 dark:border-white/10 rounded-[4px] p-5 sm:p-6 space-y-6 relative shadow-xs">
      <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
      <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-[3px] bg-[#292c2e] text-[#98ff03] dark:bg-[#98ff03]/20 dark:text-[#98ff03] flex items-center justify-center font-bold">
            <Globe className="size-4" />
          </div>
          <div>
            <h3 className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100 uppercase tracking-wider">
              Search Engine Optimization (SEO) & Social Cards
            </h3>
            <p className="font-inter text-[11px] text-zinc-500 dark:text-zinc-400">
              Preview titles, descriptions, and social cards. Search engines may rewrite snippets.
            </p>
          </div>
        </div>

        {/* Quick Health Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 dark:bg-white/10 rounded-[3px] text-[10px] font-space uppercase font-bold text-zinc-700 dark:text-zinc-300">
          {isTitleIdeal && isDescIdeal ? (
            <>
              <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
              <span>Snippet length: Good</span>
            </>
          ) : (
            <>
              <AlertTriangle className="size-3 text-amber-500 dark:text-amber-400" />
              <span>Review snippet length</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-7 space-y-4 font-inter text-xs">
          {/* SEO Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                SEO Meta Title
              </label>
              <span
                className={`font-mono text-[10px] tabular-nums ${isTitleTooLong
                  ? "text-red-500 font-bold"
                  : isTitleIdeal
                    ? "text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-zinc-400 dark:text-zinc-500"
                  }`}
              >
                {titleLen}/60 chars {isTitleIdeal ? "✓ Ideal" : isTitleTooLong ? "⚠️ Too long" : ""}
              </span>
            </div>
            <input
              type="text"
              placeholder={defaultTitle || "e.g. Scaling Next.js to 1M Daily Visitors | Matii"}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full border border-zinc-300 dark:border-white/10 dark:bg-white/5 px-3 py-2 rounded-[3px] text-xs font-inter text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
            />
            <p className="font-inter text-[10px] text-zinc-400 dark:text-zinc-500">
              Leave blank to auto-use standard headline. Optimal: 50–60 characters.
            </p>
          </div>

          {/* Meta Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                Meta Description
              </label>
              <span
                className={`font-mono text-[10px] tabular-nums ${isDescTooLong
                  ? "text-red-500 font-bold"
                  : isDescIdeal
                    ? "text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-zinc-400 dark:text-zinc-500"
                  }`}
              >
                {descLen}/160 chars {isDescIdeal ? "✓ Ideal" : isDescTooLong ? "⚠️ Too long" : ""}
              </span>
            </div>
            <textarea
              rows={3}
              placeholder={defaultDescription || "e.g. Discover the architectural patterns behind high-performance web applications..."}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full border border-zinc-300 dark:border-white/10 dark:bg-white/5 px-3 py-2 rounded-[3px] text-xs font-inter text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none leading-relaxed"
            />
            <p className="font-inter text-[10px] text-zinc-400 dark:text-zinc-500">
              High-converting pitch shown on Google search and social snippets (120–160 chars).
            </p>
          </div>

          {/* Focus Keywords */}
          <div className="space-y-1.5">
            <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Tag className="size-3 text-[#292c2e] dark:text-[#98ff03]" />
              <span>Target Focus Keywords</span>
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[3px] min-h-[42px] items-center">
              {keywordsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-[11px] font-space rounded-[2px] shadow-xs"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(tag)}
                    className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder={keywordsList.length === 0 ? "Type keyword and press Enter..." : "+ add tag"}
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                onKeyDown={handleAddKeyword}
                className="flex-1 min-w-[120px] bg-transparent text-xs outline-none font-inter text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
            </div>
            <p className="font-inter text-[10px] text-zinc-400 dark:text-zinc-500">
              Editorial planning terms only. Google does not use the meta keywords tag for ranking.
            </p>
          </div>
        </div>

        {/* Right Column: Live SERP & Social Card Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActivePreviewTab("google")}
                className={`text-[11px] font-space uppercase font-bold px-2 py-1 rounded-[3px] transition-all cursor-pointer ${activePreviewTab === "google"
                  ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-black"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
              >
                <span className="flex items-center gap-1">
                  <Search className="size-3" />
                  Google SERP
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab("social")}
                className={`text-[11px] font-space uppercase font-bold px-2 py-1 rounded-[3px] transition-all cursor-pointer ${activePreviewTab === "social"
                  ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-black"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
              >
                <span className="flex items-center gap-1">
                  <Share2 className="size-3" />
                  Social Card
                </span>
              </button>
            </div>

            {activePreviewTab === "google" && (
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-white/10 p-0.5 rounded-[3px]">
                <button
                  type="button"
                  onClick={() => setGoogleDevice("desktop")}
                  title="Desktop Search"
                  className={`p-1 rounded-[2px] cursor-pointer ${googleDevice === "desktop" ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-xs" : "text-zinc-400 dark:text-zinc-500"
                    }`}
                >
                  <Monitor className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleDevice("mobile")}
                  title="Mobile Search"
                  className={`p-1 rounded-[2px] cursor-pointer ${googleDevice === "mobile" ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-xs" : "text-zinc-400 dark:text-zinc-500"
                    }`}
                >
                  <Smartphone className="size-3" />
                </button>
              </div>
            )}
          </div>

          {/* Live Preview Screen */}
          {activePreviewTab === "google" ? (
            <div
              className={`bg-white dark:bg-[#1f2227] border border-zinc-200/90 dark:border-white/10 rounded-[4px] p-4 shadow-xs space-y-1 font-sans ${googleDevice === "mobile" ? "max-w-[320px] mx-auto border-dashed" : ""
                }`}
            >
              {/* Site metadata bar */}
              <div className="flex items-center gap-2 text-xs">
                <div className="size-4 rounded-full bg-[#292c2e] flex items-center justify-center text-[#98ff03] text-[9px] font-bold">
                  M
                </div>
                <div className="leading-tight overflow-hidden">
                  <div className="text-[12px] text-[#202124] dark:text-zinc-200 font-normal truncate">
                    MATII TECHNOLOGIES
                  </div>
                  <div className="text-[11px] text-[#4d5156] dark:text-zinc-400 font-mono truncate">
                    {fullUrl}
                  </div>
                </div>
              </div>

              {/* Title link */}
              <div className="pt-1">
                <h4 className="text-[17px] font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-2">
                  {effectiveTitle}
                </h4>
              </div>

              {/* Snippet text */}
              <p className="text-[12px] text-[#4d5156] dark:text-zinc-300 leading-relaxed line-clamp-3">
                {effectiveDescription}
              </p>
            </div>
          ) : (
            /* Social Card Preview */
            <div className="bg-white dark:bg-[#1f2227] border border-zinc-200/90 dark:border-white/10 rounded-[6px] overflow-hidden shadow-xs">
              {coverImage ? (
                <div className="relative w-full aspect-[1.91/1] bg-zinc-100 dark:bg-zinc-800 overflow-hidden outline outline-1 outline-[oklch(0_0_0_/_0.1)]">
                  <Image
                    src={coverImage}
                    alt="Social Card Banner"
                    fill
                    unoptimized={coverImage.startsWith("data:")}
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[1.91/1] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 text-xs font-mono">
                  Cover image preview placeholder
                </div>
              )}
              <div className="p-3 bg-zinc-50 dark:bg-white/5 border-t border-zinc-100 dark:border-white/10 space-y-1">
                <p className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                  {new URL(siteConfig.url).hostname}
                </p>
                <h4 className="font-space font-bold text-xs text-[#292c2e] dark:text-white line-clamp-1 leading-snug">
                  {effectiveTitle}
                </h4>
                <p className="font-inter text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {effectiveDescription}
                </p>
              </div>
            </div>
          )}

          {/* Quick checklist */}
          <div className="bg-zinc-50/70 dark:bg-white/5 p-3 rounded-[3px] border border-zinc-200 dark:border-white/10 text-[11px] font-inter text-zinc-600 dark:text-zinc-300 space-y-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-[#292c2e] dark:text-[#98ff03]" />
              <span className="font-space font-bold uppercase text-[10px] text-zinc-800 dark:text-zinc-200">
                SEO Best Practices
              </span>
            </div>
            <ul className="space-y-1 pl-4 list-disc text-zinc-500 dark:text-zinc-400 text-[10px]">
              <li>Includes unique title under 60 characters</li>
              <li>Includes meta description under 160 characters</li>
              <li>Canonical tags auto-bound to public reader path</li>
              <li>Generates Article & Breadcrumb JSON-LD schema</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoMetaFields;
