// Pure helpers (no DB imports) so client components such as the admin form can use them.

export interface ProjectResultItem {
  value: string;
  label: string;
  description?: string;
}

/** Legacy keys (demoClickGrowth…) are still read; new saves use the free-form `results` list. */
export interface ProjectMetrics {
  results?: ProjectResultItem[];
  [key: string]: string | ProjectResultItem[] | undefined;
}

const LEGACY_RESULT_FIELDS: { key: string; label: string; unit: string }[] = [
  { key: "demoClickGrowth", label: "Demo Click Growth", unit: "x" },
  { key: "higherEngagement", label: "Higher Engagement", unit: "%" },
  { key: "pipelineInfluence", label: "Pipeline Influence", unit: "+" },
  { key: "qualifiedLeads", label: "Qualified Leads", unit: "%" },
];

export function getProjectResults(metrics: ProjectMetrics | null | undefined): ProjectResultItem[] {
  if (!metrics) return [];
  if (Array.isArray(metrics.results)) {
    return metrics.results
      .filter((item) => item && String(item.value || "").trim() && String(item.label || "").trim())
      .map((item) => ({ value: String(item.value).trim(), label: String(item.label).trim(), description: item.description?.trim() || undefined }));
  }
  return LEGACY_RESULT_FIELDS.flatMap(({ key, label, unit }) => {
    const raw = metrics[key];
    const value = typeof raw === "string" ? raw.trim() : "";
    return value ? [{ value: value.endsWith(unit) ? value : `${value}${unit}`, label }] : [];
  });
}
