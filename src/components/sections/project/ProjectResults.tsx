"use client";

import ContentEmptyState from "@/components/common/ContentEmptyState";

export interface ProjectResultsProps {
  demoClickGrowth?: string;
  higherEngagement?: string;
  pipelineInfluence?: string;
  qualifiedLeads?: string;
}

export function ProjectResults({ demoClickGrowth, higherEngagement, pipelineInfluence, qualifiedLeads }: ProjectResultsProps) {
  const metrics = [
    { label: "Demo Click Growth", value: demoClickGrowth, unit: "x" },
    { label: "Higher Engagement", value: higherEngagement, unit: "%" },
    { label: "Pipeline Influence", value: pipelineInfluence, unit: "+" },
    { label: "Qualified Leads", value: qualifiedLeads, unit: "%" },
  ].filter(metric => metric.value !== undefined && metric.value !== "");
  if (!metrics.length) return <ContentEmptyState kind="metrics" compact />;
  return (
    <section aria-label="Project results" className="grid gap-8 border-b border-zinc-200 py-14 dark:border-white/10 sm:grid-cols-2">
      {metrics.map(metric => <div key={metric.label}>
        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">{metric.label}</p>
        <p className="font-space text-4xl font-bold tracking-tight text-[#292c2e] dark:text-white sm:text-6xl">
          {metric.value}<span className="ms-1 text-lime-700 dark:text-[#98ff03]">{metric.unit}</span>
        </p>
      </div>)}
    </section>
  );
}

export default ProjectResults;
