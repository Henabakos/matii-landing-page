"use client";

import React, { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Check, X, TrendingUp, AlertCircle } from "lucide-react";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { saveKpiAction, deleteKpiAction } from "@/lib/actions/kpi.actions";
import type { Kpi } from "@prisma/client";

interface KpiClientManagerProps {
  initialKpis: Kpi[];
}

export function KpiClientManager({ initialKpis }: KpiClientManagerProps) {
  const [kpis, setKpis] = useState<Kpi[]>(initialKpis);
  const [editingKpi, setEditingKpi] = useState<Partial<Kpi> | null>(null);
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [activeTranslationLocale, setActiveTranslationLocale] = useState<string>("om");
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOpenEdit = (kpi: Kpi) => {
    setEditingKpi(kpi);
    if ((kpi as any).translations) {
      try {
        setTranslations(
          typeof (kpi as any).translations === "string"
            ? JSON.parse((kpi as any).translations)
            : (kpi as any).translations
        );
      } catch {
        setTranslations({});
      }
    } else {
      setTranslations({});
    }
    setIsNew(false);
    setFeedback(null);
  };

  const handleOpenNew = () => {
    setEditingKpi({
      key: "",
      label: "",
      value: "",
      unit: "",
      description: "",
      category: "HERO_ABOUT",
      order: kpis.length + 1,
      isActive: true,
    });
    setTranslations({});
    setIsNew(true);
    setFeedback(null);
  };

  const handleClose = () => {
    setEditingKpi(null);
    setTranslations({});
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKpi?.key || !editingKpi?.label || !editingKpi?.value) return;

    startTransition(async () => {
      try {
        await saveKpiAction({
          id: editingKpi.id,
          key: editingKpi.key!,
          label: editingKpi.label!,
          value: editingKpi.value!,
          unit: editingKpi.unit || "",
          description: editingKpi.description || "",
          category: editingKpi.category || "HERO_ABOUT",
          order: Number(editingKpi.order || 0),
          isActive: Boolean(editingKpi.isActive),
          translations,
        });

        setFeedback("KPI updated and cache purged successfully!");
        setTimeout(() => setFeedback(null), 4000);
        handleClose();
      } catch (err) {
        console.error("Failed to save KPI:", err);
        setFeedback("Failed to save KPI. Check your input.");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this KPI?")) return;

    startTransition(async () => {
      try {
        await deleteKpiAction(id);
        setKpis((prev) => prev.filter((k) => k.id !== id));
        setFeedback("KPI deleted successfully!");
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        console.error("Failed to delete KPI:", err);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#16181b] p-6 border border-zinc-200/80 dark:border-white/10 shadow-sm relative">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] dark:text-zinc-100 tracking-tight">
            Key Performance Indicators (KPIs)
          </h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Values here directly power the homepage & about stats cards (e.g. 50+, 10+, ∞).
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03] dark:text-black" />
          <span>New KPI Metric</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>{feedback}</span>
        </div>
      ) : null}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="relative bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 p-6 rounded-[4px] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#292c2e] dark:hover:border-white/30 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                  {kpi.category}
                </span>
                <span className="text-[11px] font-inter text-zinc-400 dark:text-zinc-500">
                  Order #{kpi.order}
                </span>
              </div>

              <div>
                <span className="font-space font-bold text-4xl text-[#292c2e] dark:text-[#98ff03] tabular-nums tracking-tight">
                  {kpi.value}
                </span>
                <h3 className="font-space font-semibold text-sm text-zinc-800 dark:text-zinc-100 mt-1">
                  {kpi.label}
                </h3>
              </div>

              <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {kpi.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-[140px]">
                {kpi.key}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(kpi)}
                  className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] transition-colors active:scale-[0.96]"
                  title="Edit KPI"
                >
                  <Edit2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(kpi.id)}
                  className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-[3px] transition-colors active:scale-[0.96]"
                  title="Delete KPI"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingKpi ? (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#16181b] border border-[rgba(174,174,174,0.4)] dark:border-white/10 w-full max-w-lg p-6 sm:p-8 rounded-[4px] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3 mb-5">
              <h3 className="font-space font-medium text-lg text-[#292c2e] dark:text-zinc-100">
                {isNew ? "Create New KPI" : "Edit KPI Metric"}
              </h3>
              <button
                onClick={handleClose}
                type="button"
                className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px]"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-inter text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Display Value (e.g. 50+, 98.4%)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingKpi.value || ""}
                    onChange={(e) =>
                      setEditingKpi({ ...editingKpi, value: e.target.value })
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-sm font-bold text-[#292c2e] dark:text-[#98ff03] bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Unique Key (Slug)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingKpi.key || ""}
                    onChange={(e) =>
                      setEditingKpi({ ...editingKpi, key: e.target.value })
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                  Metric Label
                </label>
                <input
                  type="text"
                  required
                  value={editingKpi.label || ""}
                  onChange={(e) =>
                    setEditingKpi({ ...editingKpi, label: e.target.value })
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingKpi.description || ""}
                  onChange={(e) =>
                    setEditingKpi({ ...editingKpi, description: e.target.value })
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                />
              </div>

              {/* AI Auto-Translation Section */}
              <div className="p-3 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-[4px] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-2">
                  <div>
                    <h4 className="text-xs font-space font-bold text-zinc-800 dark:text-zinc-200">
                      Multi-Language Translations
                    </h4>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-inter">
                      Translate label & description into Afaan Oromoo, Amharic, German, and Polish.
                    </p>
                  </div>
                  <AutoTranslateButton
                    sourceFields={{
                      label: editingKpi.label || "",
                      description: editingKpi.description || "",
                    }}
                    onTranslated={(newTranslations) => {
                      setTranslations((prev) => ({
                        ...prev,
                        ...newTranslations,
                      }));
                    }}
                  />
                </div>

                {/* Locale Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { code: "om", name: "Afaan Oromoo" },
                    { code: "am", name: "አማርኛ (Amharic)" },
                    { code: "de", name: "Deutsch" },
                    { code: "pl", name: "Polski" },
                  ].map((loc) => {
                    const isFilled = Boolean(translations[loc.code]?.label);
                    return (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setActiveTranslationLocale(loc.code)}
                        className={`px-2 py-0.5 rounded text-[10px] font-space font-medium transition-colors flex items-center gap-1.5 ${
                          activeTranslationLocale === loc.code
                            ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black"
                            : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{loc.name}</span>
                        {isFilled && (
                          <span className="size-1.5 rounded-full bg-[#98ff03]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Locale Fields */}
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                      Label ({activeTranslationLocale.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={translations[activeTranslationLocale]?.label || ""}
                      onChange={(e) =>
                        setTranslations((prev) => ({
                          ...prev,
                          [activeTranslationLocale]: {
                            ...prev[activeTranslationLocale],
                            label: e.target.value,
                          },
                        }))
                      }
                      placeholder="Label translation..."
                      className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                      Description ({activeTranslationLocale.toUpperCase()})
                    </label>
                    <textarea
                      rows={2}
                      value={translations[activeTranslationLocale]?.description || ""}
                      onChange={(e) =>
                        setTranslations((prev) => ({
                          ...prev,
                          [activeTranslationLocale]: {
                            ...prev[activeTranslationLocale],
                            description: e.target.value,
                          },
                        }))
                      }
                      placeholder="Description translation..."
                      className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Category
                  </label>
                  <select
                    value={editingKpi.category || "HERO_ABOUT"}
                    onChange={(e) =>
                      setEditingKpi({ ...editingKpi, category: e.target.value })
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  >
                    <option value="HERO_ABOUT">HERO_ABOUT (Homepage / About)</option>
                    <option value="GENERAL">GENERAL (Stats / Footers)</option>
                    <option value="SOLUTIONS">SOLUTIONS (Projects)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingKpi.order || 0}
                    onChange={(e) =>
                      setEditingKpi({
                        ...editingKpi,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
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
                  {isPending ? "Saving..." : "Save KPI Metric"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default KpiClientManager;
