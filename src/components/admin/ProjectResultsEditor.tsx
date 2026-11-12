"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ProjectResultItem } from "@/lib/services/project-results";

interface ProjectResultsEditorProps {
  items: ProjectResultItem[];
  onChange: (items: ProjectResultItem[]) => void;
}

const MAX_RESULTS = 6;
const inputClass =
  "w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none";

/** Free-form impact metrics ("45%" / "Faster month-end close") for a case study. */
export function ProjectResultsEditor({ items, onChange }: ProjectResultsEditorProps) {
  const update = (index: number, patch: Partial<ProjectResultItem>) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-white/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">Results &amp; Impact Metrics</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Shown as the results band on the case study. The first metric is also the headline stat on project cards. Leave empty to hide.
          </p>
        </div>
        <button
          type="button"
          disabled={items.length >= MAX_RESULTS}
          onClick={() => onChange([...items, { value: "", label: "", description: "" }])}
          className="shrink-0 inline-flex items-center gap-1.5 bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-black px-3 py-1.5 rounded-[3px] font-space text-[11px] font-bold uppercase disabled:opacity-40"
        >
          <Plus className="size-3.5" /> Add metric
        </button>
      </div>

      {items.length === 0 ? (
        <p className="border border-dashed border-zinc-300 dark:border-white/15 rounded-[3px] px-3 py-4 text-center text-[11px] text-zinc-500">
          No results yet. Add measurable outcomes such as &quot;40%&quot; / &quot;Reduction in reporting time&quot;.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-2 items-start border border-zinc-200 dark:border-white/10 rounded-[3px] p-2.5 bg-zinc-50/60 dark:bg-white/[0.02]">
              <input
                value={item.value}
                onChange={(e) => update(index, { value: e.target.value })}
                placeholder="45%"
                aria-label={`Metric ${index + 1} value`}
                className={`${inputClass} font-space font-bold`}
              />
              <div className="space-y-2">
                <input
                  value={item.label}
                  onChange={(e) => update(index, { label: e.target.value })}
                  placeholder="Faster production reporting"
                  aria-label={`Metric ${index + 1} label`}
                  className={inputClass}
                />
                <input
                  value={item.description || ""}
                  onChange={(e) => update(index, { description: e.target.value })}
                  placeholder="Optional context, e.g. measured over the first 6 months"
                  aria-label={`Metric ${index + 1} description`}
                  className={inputClass}
                />
              </div>
              <div className="flex sm:flex-col gap-1">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" className="p-1.5 rounded-[3px] text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10 disabled:opacity-30">
                  <ArrowUp className="size-3.5" />
                </button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down" className="p-1.5 rounded-[3px] text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10 disabled:opacity-30">
                  <ArrowDown className="size-3.5" />
                </button>
                <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} aria-label="Remove metric" className="p-1.5 rounded-[3px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectResultsEditor;
