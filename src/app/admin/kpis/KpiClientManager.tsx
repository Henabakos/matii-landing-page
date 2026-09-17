"use client";

import React, { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Check, X, TrendingUp, AlertCircle } from "lucide-react";
import { saveKpiAction, deleteKpiAction } from "@/lib/actions/kpi.actions";
import type { Kpi } from "@prisma/client";

interface KpiClientManagerProps {
  initialKpis: Kpi[];
}

export function KpiClientManager({ initialKpis }: KpiClientManagerProps) {
  const [kpis, setKpis] = useState<Kpi[]>(initialKpis);
  const [editingKpi, setEditingKpi] = useState<Partial<Kpi> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOpenEdit = (kpi: Kpi) => {
    setEditingKpi(kpi);
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
    setIsNew(true);
    setFeedback(null);
  };

  const handleClose = () => {
    setEditingKpi(null);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-zinc-200/80 shadow-sm relative">
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] tracking-tight">
            Key Performance Indicators (KPIs)
          </h2>
          <p className="font-inter text-xs text-zinc-500 mt-1">
            Values here directly power the homepage & about stats cards (e.g. 50+, 10+, ∞).
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03]" />
          <span>New KPI Metric</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      ) : null}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="relative bg-white border border-zinc-200/80 p-6 rounded-[4px] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#292c2e] transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-space font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-zinc-100 text-zinc-600">
                  {kpi.category}
                </span>
                <span className="text-[11px] font-inter text-zinc-400">
                  Order #{kpi.order}
                </span>
              </div>

              <div>
                <span className="font-space font-bold text-4xl text-[#292c2e] tabular-nums tracking-tight">
                  {kpi.value}
                </span>
                <h3 className="font-space font-semibold text-sm text-zinc-800 mt-1">
                  {kpi.label}
                </h3>
              </div>

              <p className="font-inter text-xs text-zinc-500 leading-relaxed">
                {kpi.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-zinc-400 truncate max-w-[140px]">
                {kpi.key}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(kpi)}
                  className="p-1.5 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-[3px] transition-colors active:scale-[0.96]"
                  title="Edit KPI"
                >
                  <Edit2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(kpi.id)}
                  className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-[3px] transition-colors active:scale-[0.96]"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[rgba(174,174,174,0.4)] w-full max-w-lg p-6 sm:p-8 rounded-[4px] shadow-2xl relative">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-5">
              <h3 className="font-space font-medium text-lg text-[#292c2e]">
                {isNew ? "Create New KPI" : "Edit KPI Metric"}
              </h3>
              <button
                onClick={handleClose}
                type="button"
                className="p-1 text-zinc-400 hover:text-black rounded-[3px]"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-inter text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600">
                    Display Value (e.g. 50+, 98.4%)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingKpi.value || ""}
                    onChange={(e) =>
                      setEditingKpi({ ...editingKpi, value: e.target.value })
                    }
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-sm font-bold text-[#292c2e]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600">
                    Unique Key (Slug)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingKpi.key || ""}
                    onChange={(e) =>
                      setEditingKpi({ ...editingKpi, key: e.target.value })
                    }
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600">
                  Metric Label
                </label>
                <input
                  type="text"
                  required
                  value={editingKpi.label || ""}
                  onChange={(e) =>
                    setEditingKpi({ ...editingKpi, label: e.target.value })
                  }
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingKpi.description || ""}
                  onChange={(e) =>
                    setEditingKpi({ ...editingKpi, description: e.target.value })
                  }
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600">
                    Category
                  </label>
                  <select
                    value={editingKpi.category || "HERO_ABOUT"}
                    onChange={(e) =>
                      setEditingKpi({ ...editingKpi, category: e.target.value })
                    }
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-700 bg-white"
                  >
                    <option value="HERO_ABOUT">HERO_ABOUT (Homepage / About)</option>
                    <option value="GENERAL">GENERAL (Stats / Footers)</option>
                    <option value="SOLUTIONS">SOLUTIONS (Projects)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-700"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-space text-xs uppercase font-medium rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black text-white font-space text-xs uppercase font-semibold rounded-[3px] active:scale-[0.96] shadow-sm disabled:opacity-50"
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
