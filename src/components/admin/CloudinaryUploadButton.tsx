"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Link as LinkIcon, X, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";

interface CloudinaryUploadButtonProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  folder?: string;
  aspectRatio?: "video" | "square" | "wide";
  layout?: "auto" | "horizontal" | "vertical";
  objectFit?: "cover" | "contain";
}

export function CloudinaryUploadButton({
  value,
  onChange,
  label = "Cover Image",
  hint = "Upload a high-res image to Cloudinary (PNG, JPG, WebP) or add via URL",
  folder = "Matii_cms",
  aspectRatio = "wide",
  layout = "auto",
  objectFit,
}: CloudinaryUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [entryMode, setEntryMode] = useState<"upload" | "url">("upload");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasImgError, setHasImgError] = useState(false);

  React.useEffect(() => {
    setHasImgError(false);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error("Image upload error:", err);
      setUploadError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleManualUrlSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetUrl = manualUrl.trim();
    if (!targetUrl) return;

    // If local asset path (like /shapes/hero-shape.svg), set directly
    if (targetUrl.startsWith("/") && !targetUrl.startsWith("//")) {
      onChange(targetUrl);
      setShowUrlInput(false);
      setManualUrl("");
      setUploadError(null);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, folder }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to process image URL");
      }

      onChange(data.url);
      setShowUrlInput(false);
      setManualUrl("");
    } catch (err: any) {
      console.error("URL import error:", err);
      setUploadError(err.message || "Failed to import image from URL");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setUploadError(null);
    setHasImgError(false);
  };

  const isUnoptimized =
    !value ||
    !value.startsWith("https://res.cloudinary.com") ||
    value.endsWith(".svg") ||
    value.startsWith("data:");

  const fitClass =
    objectFit === "contain" || (!objectFit && aspectRatio === "square")
      ? "object-contain p-2 bg-white dark:bg-zinc-900"
      : "object-cover";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-space text-[11px] uppercase font-bold text-zinc-700 tracking-wider flex items-center gap-1.5">
          <ImageIcon className="size-3.5 text-[#292c2e]" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-[10px] font-space uppercase text-zinc-500 hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LinkIcon className="size-3" />
              <span>{showUrlInput ? "Hide URL Editor" : "Edit URL"}</span>
            </button>
          )}
        </div>
      </div>

      {hint && <p className="font-inter text-[11px] text-zinc-400">{hint}</p>}

      {/* Manual URL editor drawer (when value is present) */}
      {showUrlInput && value && (
        <div className="flex gap-2 pt-1 pb-1">
          <input
            type="text"
            placeholder="https://example.com/image.jpg or /shapes/..."
            value={manualUrl || value}
            disabled={isUploading}
            onChange={(e) => setManualUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleManualUrlSubmit();
              }
            }}
            className="flex-1 border border-zinc-300 px-3 py-1.5 rounded-[3px] text-xs font-mono text-zinc-800 focus:border-[#292c2e] outline-none bg-white disabled:opacity-50"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => handleManualUrlSubmit()}
            className="px-3 py-1.5 bg-[#292c2e] hover:bg-black text-white text-[11px] font-space uppercase font-semibold rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer disabled:opacity-50 flex items-center gap-1"
          >
            {isUploading ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <span>Update URL</span>
            )}
          </button>
        </div>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.svg,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload / Preview Area */}
      {value ? (
        layout === "vertical" ? (
          <div className="relative group border border-zinc-200/90 rounded-[4px] p-2.5 bg-zinc-50/50 space-y-2.5">
            {/* Full-width responsive image preview */}
            <div
              className={`relative w-full ${
                aspectRatio === "square"
                  ? "aspect-square max-w-[140px] mx-auto"
                  : aspectRatio === "wide"
                  ? "aspect-[21/9]"
                  : "aspect-video"
              } overflow-hidden rounded-[3px] bg-zinc-900 outline outline-1 outline-[oklch(0_0_0_/_0.1)]`}
            >
              {hasImgError ? (
                <div className="size-full flex flex-col items-center justify-center p-3 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 space-y-1">
                  <ImageIcon className="size-6 text-zinc-300" />
                  <span className="text-[10px] font-space uppercase font-bold text-zinc-600">Asset Linked</span>
                  <span className="text-[9px] font-mono text-zinc-400 truncate max-w-[120px]">{value}</span>
                </div>
              ) : (
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fill
                  unoptimized={isUnoptimized}
                  onError={() => setHasImgError(true)}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className={fitClass}
                />
              )}
            </div>

            {/* Bottom metadata and action bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-200/70">
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-600 font-space text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="size-3 shrink-0" />
                  <span className="truncate">
                    {value.startsWith("http") ? "Asset Ready & Synced" : "Local Asset Linked"}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-zinc-400 truncate max-w-[200px]" title={value}>
                  {value}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-[10px] font-space uppercase font-bold bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-2xs"
                >
                  Replace File
                </button>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => {
                    setManualUrl(value);
                    setShowUrlInput(true);
                  }}
                  className="px-2.5 py-1 text-[10px] font-space uppercase font-bold bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer whitespace-nowrap shadow-2xs disabled:opacity-50"
                >
                  Edit URL
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-2 py-1 text-[10px] font-space uppercase font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Horizontal / Auto layout with defensive wrapping and min-widths */
          <div className="relative group border border-zinc-200/90 rounded-[4px] p-2.5 bg-zinc-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <div
              className={`relative w-full ${
                aspectRatio === "square"
                  ? "aspect-square sm:w-28"
                  : aspectRatio === "wide"
                  ? "aspect-[21/9] sm:w-56"
                  : "aspect-video sm:w-48"
              } overflow-hidden rounded-[3px] bg-zinc-900 outline outline-1 outline-[oklch(0_0_0_/_0.1)] shrink-0`}
            >
              {hasImgError ? (
                <div className="size-full flex flex-col items-center justify-center p-3 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 space-y-1">
                  <ImageIcon className="size-6 text-zinc-300" />
                  <span className="text-[10px] font-space uppercase font-bold text-zinc-600">Asset Linked</span>
                  <span className="text-[9px] font-mono text-zinc-400 truncate max-w-[120px]">{value}</span>
                </div>
              ) : (
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fill
                  unoptimized={isUnoptimized}
                  onError={() => setHasImgError(true)}
                  sizes="340px"
                  className={fitClass}
                />
              )}
            </div>

            <div className="flex-1 min-w-0 w-full space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-600 font-space text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle2 className="size-3 shrink-0" />
                <span className="whitespace-nowrap">
                  {value.startsWith("http") ? "Asset Ready & Synced" : "Local Asset Linked"}
                </span>
              </div>
              <p className="font-mono text-[11px] text-zinc-500 truncate" title={value}>
                {value}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-[10px] font-space uppercase font-bold bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-2xs"
                >
                  Replace File
                </button>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => {
                    setManualUrl(value);
                    setShowUrlInput(true);
                  }}
                  className="px-2.5 py-1 text-[10px] font-space uppercase font-bold bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer whitespace-nowrap shadow-2xs disabled:opacity-50"
                >
                  Edit URL
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-2 py-1 text-[10px] font-space uppercase font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* Empty State: Tabs between Upload File and Enter URL */
        <div className="space-y-2">
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-[4px] border border-zinc-200/80 w-fit">
            <button
              type="button"
              onClick={() => {
                setEntryMode("upload");
                setUploadError(null);
              }}
              className={`px-3 py-1 text-[10px] font-space uppercase font-bold rounded-[3px] transition-all flex items-center gap-1.5 cursor-pointer ${
                entryMode === "upload"
                  ? "bg-white text-[#292c2e] shadow-2xs"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              <UploadCloud className="size-3" />
              <span>Upload Image</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEntryMode("url");
                setUploadError(null);
              }}
              className={`px-3 py-1 text-[10px] font-space uppercase font-bold rounded-[3px] transition-all flex items-center gap-1.5 cursor-pointer ${
                entryMode === "url"
                  ? "bg-white text-[#292c2e] shadow-2xs"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              <LinkIcon className="size-3" />
              <span>Add by URL</span>
            </button>
          </div>

          {entryMode === "upload" ? (
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed border-zinc-300 hover:border-[#292c2e] bg-white hover:bg-zinc-50/70 p-6 rounded-[4px] text-center cursor-pointer transition-all active:scale-[0.99] group ${
                isUploading ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="size-10 rounded-full bg-zinc-100 group-hover:bg-[#98ff03]/20 flex items-center justify-center text-zinc-600 group-hover:text-black transition-colors">
                  {isUploading ? (
                    <Loader2 className="size-5 animate-spin text-[#292c2e]" />
                  ) : (
                    <UploadCloud className="size-5" />
                  )}
                </div>
                <div>
                  <p className="font-space font-bold text-xs text-[#292c2e]">
                    {isUploading ? "Uploading to Cloudinary..." : "Click to select or drop image"}
                  </p>
                  <p className="font-inter text-[10px] text-zinc-400 mt-0.5">
                    Supports SVG, PNG, JPG, WebP with CDN delivery
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-zinc-200 bg-white p-4 rounded-[4px] space-y-2.5">
              <label className="font-space text-[10px] uppercase font-bold text-zinc-600 block">
                Enter Web URL or SVG Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://... (direct image or Logoipsum page) or /shapes/..."
                  value={manualUrl}
                  disabled={isUploading}
                  onChange={(e) => {
                    setManualUrl(e.target.value);
                    if (uploadError) setUploadError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleManualUrlSubmit();
                    }
                  }}
                  className="flex-1 border border-zinc-300 px-3 py-2 rounded-[3px] text-xs font-mono text-zinc-800 focus:border-[#292c2e] outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={isUploading || !manualUrl.trim()}
                  onClick={() => handleManualUrlSubmit()}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-[11px] font-space uppercase font-bold rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Importing...</span>
                    </>
                  ) : (
                    <span>Import Asset</span>
                  )}
                </button>
              </div>
              <p className="font-inter text-[10px] text-zinc-400">
                Supports direct image URLs (PNG, SVG, JPG), Logoipsum artwork pages, or raw SVG code.
              </p>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="font-inter text-[11px] text-red-600 flex items-center gap-1">
          <X className="size-3 shrink-0" />
          <span>{uploadError}</span>
        </p>
      )}
    </div>
  );
}

export default CloudinaryUploadButton;
