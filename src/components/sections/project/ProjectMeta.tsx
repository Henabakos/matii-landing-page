import { ArrowUpRight } from "lucide-react";

export interface ProjectMetaProps {
  clientName?: string;
  clientLogoText?: string;
  liveUrl?: string;
  timeline?: string;
  services?: string;
  category?: string;
  year?: string;
}

/** "ERP • MES, Analytics" → ["ERP", "MES", "Analytics"] */
function splitServices(services?: string): string[] {
  return (services || "").split(/\s*(?:•|·|\||,|;|\n)\s*/).map(item => item.trim()).filter(Boolean);
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return <dt className="font-space text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{children}</dt>;
}

export function ProjectMeta({ clientName, clientLogoText, liveUrl, timeline, services, category, year }: ProjectMetaProps) {
  const serviceList = splitServices(services);
  if (!clientName && !liveUrl && !timeline && !serviceList.length && !category) return null;

  return (
    <dl className="mb-4 grid grid-cols-1 gap-px overflow-clip border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-12">
      {(clientName || liveUrl) && (
        <div className="space-y-3 bg-white p-6 dark:bg-[#161819] lg:col-span-3">
          <MetaLabel>Client</MetaLabel>
          <dd className="space-y-2">
            <span className="flex items-center gap-3">
              {clientLogoText && <span className="flex size-9 shrink-0 items-center justify-center bg-[#292c2e] font-space text-sm font-bold text-[#98ff03]">{clientLogoText}</span>}
              {clientName && <span className="font-space text-lg font-semibold leading-tight">{clientName}</span>}
            </span>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-zinc-600 underline underline-offset-4 hover:text-[#292c2e] dark:text-zinc-400 dark:hover:text-white">
                Visit project <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
          </dd>
        </div>
      )}
      {category && (
        <div className="space-y-3 bg-white p-6 dark:bg-[#161819] lg:col-span-2">
          <MetaLabel>Industry</MetaLabel>
          <dd className="font-space text-lg leading-tight">{category}</dd>
        </div>
      )}
      {(timeline || year) && (
        <div className="space-y-3 bg-white p-6 dark:bg-[#161819] lg:col-span-2">
          <MetaLabel>Timeline</MetaLabel>
          <dd className="space-y-1">
            {timeline && <span className="block font-space text-lg leading-tight">{timeline}</span>}
            {year && <span className="block text-sm text-zinc-500 dark:text-zinc-400">{year}</span>}
          </dd>
        </div>
      )}
      {serviceList.length > 0 && (
        <div className="space-y-3 bg-white p-6 dark:bg-[#161819] sm:col-span-2 lg:col-span-5 lg:[grid-column-end:-1]">
          <MetaLabel>Services</MetaLabel>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {serviceList.map(service => (
                <li key={service} className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-inter text-xs leading-snug text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  {service}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  );
}

export default ProjectMeta;
