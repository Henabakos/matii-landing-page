"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  Quote,
  MessageSquareQuote,
  Eye,
  UploadCloud,
  Loader2,
  User,
} from "lucide-react";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import {
  saveTestimonialAction,
  deleteTestimonialAction,
  toggleTestimonialActiveAction,
} from "@/lib/actions/testimonial.actions";
import type { Testimonial } from "@prisma/client";

interface TestimonialClientManagerProps {
  initialTestimonials: Testimonial[];
}

const AVATAR_PRESETS = [
  { label: "Avatar 1", url: "/avatars/avatar-1.png" },
  { label: "Avatar 2", url: "/avatars/avatar-2.png" },
  { label: "Avatar 3", url: "/avatars/avatar-3.png" },
];

export function TestimonialClientManager({
  initialTestimonials,
}: TestimonialClientManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isImportingUrl, setIsImportingUrl] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleOpenEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsNew(false);
    setFeedback(null);
    setImportError(null);
  };

  const handleOpenNew = () => {
    setEditingTestimonial({
      authorName: "",
      authorRole: "",
      quote: "",
      avatarUrl: "/avatars/avatar-1.png",
      rating: 5,
      order: testimonials.length + 1,
      isActive: true,
    });
    setIsNew(true);
    setFeedback(null);
    setImportError(null);
  };

  const handleClose = () => {
    setEditingTestimonial(null);
    setIsNew(false);
    setImportError(null);
  };

  const handleImportFromUrl = async () => {
    const currentUrl = editingTestimonial?.avatarUrl?.trim();
    if (!currentUrl) return;

    setIsImportingUrl(true);
    setImportError(null);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl, folder: "Matii_testimonials" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to process avatar URL");
      }
      setEditingTestimonial((prev) => (prev ? { ...prev, avatarUrl: data.url } : null));
      setFeedback("Avatar image imported and synced successfully!");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setImportError(err.message || "Failed to import avatar from URL");
    } finally {
      setIsImportingUrl(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.authorName || !editingTestimonial?.quote) return;

    startTransition(async () => {
      try {
        const res = await saveTestimonialAction({
          id: editingTestimonial.id,
          authorName: editingTestimonial.authorName!,
          authorRole: editingTestimonial.authorRole || "",
          quote: editingTestimonial.quote!,
          avatarUrl: editingTestimonial.avatarUrl || "/avatars/avatar-1.png",
          rating: Number(editingTestimonial.rating || 5),
          order: Number(editingTestimonial.order || 0),
          isActive: Boolean(editingTestimonial.isActive),
        });

        if (res?.testimonial) {
          const saved = res.testimonial;
          setTestimonials((prev) => {
            const exists = prev.some((t) => t.id === saved.id);
            if (exists) {
              return prev.map((t) => (t.id === saved.id ? saved : t)).sort((a, b) => a.order - b.order);
            }
            return [...prev, saved].sort((a, b) => a.order - b.order);
          });
        }

        setFeedback("Testimonial saved and public site revalidated!");
        setTimeout(() => setFeedback(null), 4000);
        handleClose();
      } catch (err) {
        console.error("Failed to save testimonial:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this testimonial?")) return;

    startTransition(async () => {
      try {
        await deleteTestimonialAction(id);
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setFeedback("Testimonial deleted successfully!");
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        console.error("Failed to delete testimonial:", err);
      }
    });
  };

  const handleToggleActive = (id: string, currentState: boolean) => {
    startTransition(async () => {
      try {
        await toggleTestimonialActiveAction(id, currentState);
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isActive: !currentState } : t))
        );
        setFeedback(
          `Testimonial marked as ${!currentState ? "Active" : "Inactive"}`
        );
        setTimeout(() => setFeedback(null), 3000);
      } catch (err) {
        console.error("Failed to toggle testimonial state:", err);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-1.5 bg-[#292c2e] text-[#98ff03] rounded-[4px]">
              <MessageSquareQuote className="size-4" />
            </div>
            <h1 className="text-2xl font-space font-bold text-zinc-900 tracking-tight">
              Client Testimonials
            </h1>
          </div>
          <p className="text-xs font-inter text-zinc-500">
            Manage the social proof and client endorsements displayed on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-zinc-800 text-white rounded-[8px] font-space text-xs font-medium transition-all shadow-sm active:scale-[0.98]"
        >
          <Plus className="size-4 text-[#98ff03]" />
          <span>New Testimonial</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[8px] text-xs font-inter flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
          <Check className="size-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`border rounded-[12px] p-6 flex flex-col justify-between transition-all bg-white ${
              item.isActive
                ? "border-zinc-200 hover:border-zinc-300 shadow-sm"
                : "border-zinc-200/60 opacity-60 bg-zinc-50"
            }`}
          >
            {/* Top Bar: Stars, Order Badge, & Actions */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < item.rating
                          ? "text-[#80d800] fill-[#80d800]"
                          : "text-zinc-200 fill-zinc-200"
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-[11px] font-space text-zinc-400">
                    ({item.rating}/5)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(item.id, item.isActive)}
                    disabled={isPending}
                    className={`px-2 py-0.5 rounded-[4px] text-[10px] font-space font-semibold uppercase tracking-wider transition-colors ${
                      item.isActive
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </button>

                  <span className="text-[11px] font-space text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                    #{item.order}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p className="font-inter text-sm text-zinc-700 leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Bottom Footer: Author Details & Edit Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
              <div className="flex items-center gap-3">
                <div className="relative size-10 rounded-full overflow-hidden border border-zinc-200 shrink-0 bg-zinc-100">
                  <Image
                    src={item.avatarUrl || "/avatars/avatar-1.png"}
                    alt={item.authorName}
                    fill
                    unoptimized={true}
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-urbanist font-semibold text-sm text-zinc-900">
                    {item.authorName}
                  </h4>
                  <p className="font-inter text-xs text-zinc-500">
                    {item.authorRole}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-[6px] transition-colors"
                  title="Edit testimonial"
                >
                  <Edit2 className="size-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-[6px] transition-colors"
                  title="Delete testimonial"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16 bg-zinc-50 border border-dashed border-zinc-300 rounded-[12px]">
          <MessageSquareQuote className="size-8 text-zinc-400 mx-auto mb-3" />
          <h3 className="font-space font-medium text-sm text-zinc-700 mb-1">
            No Testimonials Found
          </h3>
          <p className="font-inter text-xs text-zinc-500 mb-4">
            Add testimonials to feature client endorsements on the homepage.
          </p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#292c2e] text-white rounded-[6px] text-xs font-space font-medium hover:bg-zinc-800"
          >
            <Plus className="size-3.5 text-[#98ff03]" />
            Add First Testimonial
          </button>
        </div>
      )}

      {/* Edit / New Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[12px] border border-zinc-200 max-w-lg w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h3 className="font-space font-bold text-base text-zinc-900">
                {isNew ? "Add New Testimonial" : "Edit Testimonial"}
              </h3>
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-zinc-700 p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-space font-medium text-zinc-700 mb-1.5">
                  Author Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.authorName || ""}
                  onChange={(e) =>
                    setEditingTestimonial((prev) => ({
                      ...prev,
                      authorName: e.target.value,
                    }))
                  }
                  placeholder="e.g. Sara Haile"
                  className="w-full px-3 py-2 text-xs font-inter border border-zinc-300 rounded-[6px] focus:outline-none focus:border-[#292c2e] focus:ring-1 focus:ring-[#292c2e]"
                />
              </div>

              <div>
                <label className="block text-xs font-space font-medium text-zinc-700 mb-1.5">
                  Author Role & Company *
                </label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.authorRole || ""}
                  onChange={(e) =>
                    setEditingTestimonial((prev) => ({
                      ...prev,
                      authorRole: e.target.value,
                    }))
                  }
                  placeholder="e.g. Founder at Nexis AI Solutions"
                  className="w-full px-3 py-2 text-xs font-inter border border-zinc-300 rounded-[6px] focus:outline-none focus:border-[#292c2e] focus:ring-1 focus:ring-[#292c2e]"
                />
              </div>

              <div>
                <label className="block text-xs font-space font-medium text-zinc-700 mb-1.5">
                  Quote / Review Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingTestimonial.quote || ""}
                  onChange={(e) =>
                    setEditingTestimonial((prev) => ({
                      ...prev,
                      quote: e.target.value,
                    }))
                  }
                  placeholder="Share the client's endorsement or project review..."
                  className="w-full px-3 py-2 text-xs font-inter border border-zinc-300 rounded-[6px] focus:outline-none focus:border-[#292c2e] focus:ring-1 focus:ring-[#292c2e]"
                />
              </div>

              {/* Author Avatar Management: Upload, Web URL, Preset, or Local Path */}
              <div className="bg-zinc-50/70 p-4 border border-zinc-200/90 rounded-[8px] space-y-3.5">
                <CloudinaryUploadButton
                  label="Author Avatar Image"
                  hint="Upload an avatar image (PNG, JPG, WebP), or add by URL from web"
                  value={editingTestimonial.avatarUrl || ""}
                  onChange={(url: string) =>
                    setEditingTestimonial((prev) =>
                      prev ? { ...prev, avatarUrl: url } : null
                    )
                  }
                  aspectRatio="square"
                  objectFit="cover"
                  layout="vertical"
                  folder="Matii_testimonials"
                />

                {/* Direct Asset Path or Web URL Input */}
                <div className="space-y-1.5 pt-1 border-t border-zinc-200/70">
                  <div className="flex items-center justify-between">
                    <label className="font-space text-[10px] uppercase font-bold text-zinc-600">
                      Direct Asset Path or Web URL
                    </label>
                    {editingTestimonial.avatarUrl && (
                      <span className="font-mono text-[9px] text-zinc-400 bg-white px-1.5 py-0.2 rounded border border-zinc-200">
                        {editingTestimonial.avatarUrl.startsWith("http")
                          ? "Remote URL"
                          : "Local /avatars/ Path"}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/avatars/avatar-1.png or https://... (direct or web link)"
                      value={editingTestimonial.avatarUrl || ""}
                      onChange={(e) => {
                        setEditingTestimonial((prev) =>
                          prev ? { ...prev, avatarUrl: e.target.value } : null
                        );
                        if (importError) setImportError(null);
                      }}
                      className="flex-1 border border-zinc-300 px-3 py-1.5 rounded-[4px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none bg-white"
                    />
                    {editingTestimonial.avatarUrl &&
                      editingTestimonial.avatarUrl.startsWith("http") &&
                      !editingTestimonial.avatarUrl.includes("res.cloudinary.com") && (
                        <button
                          type="button"
                          disabled={isImportingUrl}
                          onClick={handleImportFromUrl}
                          className="px-2.5 py-1.5 bg-[#292c2e] hover:bg-black text-white text-[10px] font-space uppercase font-bold rounded-[4px] shrink-0 active:scale-[0.96] transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50 shadow-2xs"
                          title="Import and optimize avatar from this URL"
                        >
                          {isImportingUrl ? (
                            <>
                              <Loader2 className="size-3 animate-spin" />
                              <span>Importing...</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="size-3 text-[#98ff03]" />
                              <span>Import</span>
                            </>
                          )}
                        </button>
                      )}
                  </div>
                  {importError && (
                    <p className="text-[10px] text-red-600 font-inter flex items-center gap-1">
                      <X className="size-3 shrink-0" />
                      <span>{importError}</span>
                    </p>
                  )}
                </div>

                {/* Preset Avatars Quick Select */}
                <div className="space-y-1.5 pt-1 border-t border-zinc-200/70">
                  <span className="font-space text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                    Or Pick a Default Preset Avatar
                  </span>
                  <div className="flex items-center gap-3">
                    {AVATAR_PRESETS.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() =>
                          setEditingTestimonial((prev) =>
                            prev ? { ...prev, avatarUrl: preset.url } : null
                          )
                        }
                        className={`relative size-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          editingTestimonial.avatarUrl === preset.url
                            ? "border-[#292c2e] ring-2 ring-[#98ff03] scale-105"
                            : "border-zinc-200 opacity-60 hover:opacity-100 hover:scale-105"
                        }`}
                        title={preset.label}
                      >
                        <Image
                          src={preset.url}
                          alt={preset.label}
                          fill
                          unoptimized={true}
                          sizes="40px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Testimonial Preview */}
                <div className="space-y-1.5 pt-1 border-t border-zinc-200/70">
                  <span className="font-space text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                    Live Testimonial Card Preview
                  </span>
                  <div className="p-3 bg-white rounded-[6px] border border-zinc-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-1 text-[#80d800]">
                      {Array.from({ length: editingTestimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-[#80d800]" />
                      ))}
                    </div>
                    <p className="font-inter text-xs text-zinc-600 italic line-clamp-2">
                      &ldquo;{editingTestimonial.quote || "Client testimonial quote will appear here..."}&rdquo;
                    </p>
                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="relative size-8 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0">
                        {editingTestimonial.avatarUrl ? (
                          <Image
                            src={editingTestimonial.avatarUrl}
                            alt="preview"
                            fill
                            unoptimized={true}
                            sizes="32px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center bg-zinc-200 text-zinc-400">
                            <User className="size-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-urbanist font-bold text-xs text-zinc-900 truncate">
                          {editingTestimonial.authorName || "Author Name"}
                        </p>
                        <p className="font-inter text-[10px] text-zinc-400 truncate">
                          {editingTestimonial.authorRole || "Role & Company"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Star Rating & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space font-medium text-zinc-700 mb-1.5">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setEditingTestimonial((prev) => ({
                            ...prev,
                            rating: star,
                          }))
                        }
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`size-5 ${
                            star <= (editingTestimonial.rating || 5)
                              ? "text-[#80d800] fill-[#80d800]"
                              : "text-zinc-200 fill-zinc-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-space font-medium text-zinc-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingTestimonial.order ?? 1}
                    onChange={(e) =>
                      setEditingTestimonial((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs font-inter border border-zinc-300 rounded-[6px] focus:outline-none focus:border-[#292c2e]"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={Boolean(editingTestimonial.isActive)}
                  onChange={(e) =>
                    setEditingTestimonial((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="rounded border-zinc-300 text-[#292c2e] focus:ring-[#292c2e]"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-xs font-space text-zinc-700 cursor-pointer"
                >
                  Publish on Public Homepage (Active)
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-space text-zinc-600 hover:bg-zinc-100 rounded-[6px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-zinc-800 text-white rounded-[6px] font-space text-xs font-medium transition-all disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isPending ? "Saving..." : isNew ? "Create" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialClientManager;
