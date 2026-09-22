"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Check, X, Handshake, ExternalLink, Globe, UploadCloud, Loader2 } from "lucide-react";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { savePartnerAction, deletePartnerAction } from "@/lib/actions/partner.actions";
import type { Partner } from "@prisma/client";

interface PartnerClientManagerProps {
  initialPartners: Partner[];
}

export function PartnerClientManager({
  initialPartners,
}: PartnerClientManagerProps) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isImportingUrl, setIsImportingUrl] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleOpenEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsNew(false);
    setFeedback(null);
    setImportError(null);
  };

  const handleOpenNew = () => {
    setEditingPartner({
      name: "",
      logoUrl: "",
      websiteUrl: "",
      order: partners.length + 1,
      isActive: true,
    });
    setIsNew(true);
    setFeedback(null);
    setImportError(null);
  };

  const handleClose = () => {
    setEditingPartner(null);
    setIsNew(false);
    setImportError(null);
  };

  const handleImportFromUrl = async () => {
    const currentUrl = editingPartner?.logoUrl?.trim();
    if (!currentUrl) return;

    setIsImportingUrl(true);
    setImportError(null);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl, folder: "Matii_partners" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to process logo URL");
      }
      setEditingPartner((prev) => (prev ? { ...prev, logoUrl: data.url } : null));
      setFeedback("Logo imported and synced successfully!");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setImportError(err.message || "Failed to import logo from URL");
    } finally {
      setIsImportingUrl(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner?.name) return;

    startTransition(async () => {
      try {
        const res = await savePartnerAction({
          id: editingPartner.id,
          name: editingPartner.name!,
          logoUrl: editingPartner.logoUrl || undefined,
          websiteUrl: editingPartner.websiteUrl || undefined,
          order: Number(editingPartner.order || 0),
          isActive: Boolean(editingPartner.isActive),
        });

        if (res?.partner) {
          const saved = res.partner;
          setPartners((prev) => {
            const exists = prev.some((p) => p.id === saved.id);
            if (exists) {
              return prev.map((p) => (p.id === saved.id ? saved : p)).sort((a, b) => a.order - b.order);
            }
            return [...prev, saved].sort((a, b) => a.order - b.order);
          });
        }

        setFeedback("Partner updated and public site revalidated!");
        setTimeout(() => setFeedback(null), 4000);
        handleClose();
      } catch (err) {
        console.error("Failed to save partner:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this partner?")) return;

    startTransition(async () => {
      try {
        await deletePartnerAction(id);
        setPartners((prev) => prev.filter((p) => p.id !== id));
        setFeedback("Partner deleted successfully!");
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        console.error("Failed to delete partner:", err);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#16181b] p-6 border border-zinc-200/80 dark:border-white/10 shadow-sm relative">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] dark:text-zinc-100 tracking-tight">
            Trusted Partners & Brands
          </h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage partner logos displayed in the Hero trusted partners bar.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03] dark:text-black" />
          <span>Add New Partner</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>{feedback}</span>
        </div>
      ) : null}

      <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse font-inter text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/10 font-space text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              <th className="p-4">Brand / Company</th>
              <th className="p-4">Logo Asset</th>
              <th className="p-4">Website Link</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-[4px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 flex items-center justify-center p-1 relative overflow-hidden shrink-0 shadow-2xs">
                      {partner.logoUrl ? (
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          unoptimized={true}
                          sizes="36px"
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <Handshake className="size-4 text-zinc-400 dark:text-zinc-500" />
                      )}
                    </div>
                    <span className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100">
                      {partner.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]" title={partner.logoUrl || "Default Vector"}>
                  <span className="text-xs bg-zinc-100 dark:bg-white/10 px-1.5 py-0.5 rounded-[2px] text-zinc-600 dark:text-zinc-300">
                    {partner.logoUrl ? (partner.logoUrl.startsWith("http") ? "Cloud/Remote" : "Local Asset") : "Default"}
                  </span>
                  <span className="ml-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                    {partner.logoUrl ? partner.logoUrl.split("/").pop() : "Vector"}
                  </span>
                </td>
                <td className="p-4 text-zinc-500 dark:text-zinc-400">
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#292c2e] dark:text-[#98ff03] hover:underline inline-flex items-center gap-1"
                    >
                      <span className="truncate max-w-[160px]">{partner.websiteUrl}</span>
                      <ExternalLink className="size-3 text-zinc-400 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-600">—</span>
                  )}
                </td>
                <td className="p-4 font-space font-semibold tabular-nums text-zinc-600 dark:text-zinc-300">
                  #{partner.order}
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                      partner.isActive
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                        : "bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {partner.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(partner)}
                      className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] transition-colors"
                      title="Edit Partner"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(partner.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-[3px] transition-colors"
                      title="Delete Partner"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPartner ? (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#16181b] border border-[rgba(174,174,174,0.4)] dark:border-white/10 w-full max-w-xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3 mb-5">
              <h3 className="font-space font-medium text-lg text-[#292c2e] dark:text-zinc-100">
                {isNew ? "Add Trusted Partner" : `Edit Partner: ${editingPartner.name || "Brand"}`}
              </h3>
              <button
                onClick={handleClose}
                type="button"
                className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-inter text-xs">
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Partner Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Robotics, Acme AI, Stripe"
                  value={editingPartner.name || ""}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, name: e.target.value })
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-sm font-semibold text-[#292c2e] dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              {/* Logo Asset Manager: Upload Image & Add by URL */}
              <div className="bg-zinc-50/70 dark:bg-white/[0.02] p-4 border border-zinc-200/90 dark:border-white/10 rounded-[4px] space-y-3.5">
                <CloudinaryUploadButton
                  label="Partner Logo Asset"
                  hint="Upload an SVG, PNG, or WebP logo file, or add by URL"
                  value={editingPartner.logoUrl || ""}
                  onChange={(url: string) =>
                    setEditingPartner((prev) => (prev ? { ...prev, logoUrl: url } : null))
                  }
                  aspectRatio="square"
                  objectFit="contain"
                  layout="vertical"
                  folder="Matii_partners"
                />

                {/* Direct Asset Path / URL Input */}
                <div className="space-y-1.5 pt-1 border-t border-zinc-200/70 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="font-space text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                      Direct Asset Path or Web URL
                    </label>
                    {editingPartner.logoUrl && (
                      <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-400 bg-white dark:bg-white/5 px-1.5 py-0.2 rounded border border-zinc-200 dark:border-white/10">
                        {editingPartner.logoUrl.startsWith("http") ? "Remote URL" : "Local /shapes/ Path"}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/shapes/hero-shape.svg or https://... (direct image or webpage)"
                      value={editingPartner.logoUrl || ""}
                      onChange={(e) => {
                        setEditingPartner((prev) =>
                          prev ? { ...prev, logoUrl: e.target.value } : null
                        );
                        if (importError) setImportError(null);
                      }}
                      className="flex-1 border border-zinc-300 dark:border-white/10 px-3 py-1.5 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                    />
                    {editingPartner.logoUrl &&
                      editingPartner.logoUrl.startsWith("http") &&
                      !editingPartner.logoUrl.includes("res.cloudinary.com") && (
                        <button
                          type="button"
                          disabled={isImportingUrl}
                          onClick={handleImportFromUrl}
                          className="px-2.5 py-1.5 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-[10px] font-space uppercase font-bold rounded-[3px] shrink-0 active:scale-[0.96] transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50 shadow-2xs"
                          title="Import and optimize logo from this URL"
                        >
                          {isImportingUrl ? (
                            <>
                              <Loader2 className="size-3 animate-spin" />
                              <span>Importing...</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="size-3 text-[#98ff03] dark:text-black" />
                              <span>Import</span>
                            </>
                          )}
                        </button>
                      )}
                  </div>
                  {importError && (
                    <p className="text-[10px] text-red-600 dark:text-red-400 font-inter flex items-center gap-1">
                      <X className="size-3 shrink-0" />
                      <span>{importError}</span>
                    </p>
                  )}
                </div>

                {/* Live Hero Marquee Preview */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-space text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-wider block">
                    Live Hero Marquee Preview
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Light mode badge */}
                    <div className="p-3 bg-[#f3f4f6] rounded-[3px] border border-zinc-200 flex flex-col items-center justify-center gap-1.5">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Light Theme</span>
                      <div className="h-8 shrink-0 flex items-center gap-2 px-3 py-1 bg-white/90 border border-zinc-200/80 rounded-[4px] shadow-2xs">
                        {editingPartner.logoUrl ? (
                          <div className="w-6 h-6 relative shrink-0">
                            <Image
                              src={editingPartner.logoUrl}
                              alt="preview"
                              fill
                              unoptimized={true}
                              sizes="24px"
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <span className="font-space font-medium text-xs text-[#2a2a2b] tracking-wider uppercase whitespace-nowrap">
                          {editingPartner.name || "Brand Name"}
                        </span>
                      </div>
                    </div>

                    {/* Dark mode badge */}
                    <div className="p-3 bg-[#0d0f10] rounded-[3px] border border-white/10 flex flex-col items-center justify-center gap-1.5">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Dark Theme</span>
                      <div className="h-8 shrink-0 flex items-center gap-2 px-3 py-1 bg-[#161819] border border-white/10 rounded-[4px]">
                        {editingPartner.logoUrl ? (
                          <div className="w-6 h-6 relative shrink-0">
                            <Image
                              src={editingPartner.logoUrl}
                              alt="preview"
                              fill
                              unoptimized={true}
                              sizes="24px"
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <span className="font-space font-medium text-xs text-zinc-200 tracking-wider uppercase whitespace-nowrap">
                          {editingPartner.name || "Brand Name"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={editingPartner.websiteUrl || ""}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      websiteUrl: e.target.value,
                    })
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingPartner.order || 0}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={editingPartner.isActive ?? true}
                      onChange={(e) =>
                        setEditingPartner({
                          ...editingPartner,
                          isActive: e.target.checked,
                        })
                      }
                      className="size-4 text-[#292c2e] focus:ring-[#98ff03] accent-[#98ff03]"
                    />
                    <span className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                      Visible on Homepage
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-700 dark:text-zinc-200 font-space text-xs uppercase font-medium rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black font-space text-xs uppercase font-semibold rounded-[3px] active:scale-[0.96] shadow-sm disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PartnerClientManager;
