"use client";

import { ArrowUpRight } from "lucide-react";

export interface ProjectMetaProps {
  clientName?: string;
  clientLogoText?: string;
  liveUrl?: string;
  timeline?: string;
  services?: string;
}

export function ProjectMeta({ clientName, clientLogoText, liveUrl, timeline, services }: ProjectMetaProps) {
  if (!clientName && !liveUrl && !timeline && !services) return null;
  return (
    <div className="mb-14 grid gap-6 border-y border-zinc-200 py-8 dark:border-white/10 md:grid-cols-3">
      {(clientName || liveUrl) && <div className="space-y-3">
        <p className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Client</p>
        <div className="flex flex-wrap items-center gap-3">
          {clientLogoText && <span className="flex size-8 items-center justify-center bg-[#292c2e] text-sm text-[#98ff03]">{clientLogoText}</span>}
          {clientName && <span className="font-space text-xl font-semibold">{clientName}</span>}
          {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4">Visit project<ArrowUpRight aria-hidden="true" className="size-4" /></a>}
        </div>
      </div>}
      {timeline && <div className="space-y-3"><p className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Timeline</p><p className="font-space text-2xl">{timeline}</p></div>}
      {services && <div className="space-y-3"><p className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Services</p><p className="font-space text-lg">{services}</p></div>}
    </div>
  );
}

export default ProjectMeta;
