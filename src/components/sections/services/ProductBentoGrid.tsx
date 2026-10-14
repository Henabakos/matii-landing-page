"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, Database, Cable, Search, ChartNoAxesCombined, Network, FlaskConical, Cpu, Workflow, PanelsTopLeft } from "lucide-react";


export interface BentoItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  capabilities: string[];
  imageSrc: string;
  demoUrl: string;
  icon: keyof typeof icons;
  wide?: boolean;
}
const icons = { Cable, Database, Search, ChartNoAxesCombined, Network, FlaskConical, Cpu, Workflow, PanelsTopLeft };
interface BentoGroup { name: string; ids: string[] }

export default function ProductBentoGrid({ items, groups = [] }: { items: BentoItem[]; groups?: BentoGroup[] }) {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const products = groups.length ? items.filter(product => groups[selectedGroup].ids.includes(product.id)) : items;

  return (
    <>
      {groups.length > 0 && <div aria-label="Filter products" className="mb-8 mt-10 flex flex-wrap gap-2 sm:gap-3">
        {groups.map((group, index) => (
          <button key={group.name} type="button" aria-pressed={selectedGroup === index} onClick={() => setSelectedGroup(index)} className={`inline-flex min-h-11 items-center gap-3 border px-4 py-2.5 font-inter text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${selectedGroup === index ? "border-[#292c2e] bg-[#292c2e] text-white dark:border-primary dark:bg-primary dark:text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>
            {group.name}<span className="text-xs tabular-nums opacity-80">{group.ids.length}</span>
          </button>
        ))}
      </div>}
      <p role="status" className="sr-only">Showing {products.length} products: {groups[selectedGroup]?.name ?? "All services"}.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {products.map(product => {
          const Icon = icons[product.icon];
          const wide = selectedGroup === 0 && product.wide;
          return (
            <article id={`matii-${product.id}`} key={product.id} aria-labelledby={`matii-${product.id}-heading`} className={`relative flex min-w-0 scroll-mt-28 flex-col overflow-hidden border border-border bg-card p-6 sm:p-8 ${wide ? "lg:col-span-8" : "lg:col-span-4"}`}>
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="flex size-10 items-center justify-center border border-border bg-background"><Icon aria-hidden="true" className="size-5" strokeWidth={1.5} /></span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">MATII / {String(items.indexOf(product) + 1).padStart(2, "0")}</span>
              </div>
              <div className={`flex flex-1 flex-col ${wide ? "lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6" : ""}`}>
                <div>
                  <p className="mb-3 font-inter text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{product.category}</p>
                  <h3 id={`matii-${product.id}-heading`} className={`text-balance font-urbanist font-semibold leading-[1.1] tracking-tight ${wide ? "text-3xl xl:text-4xl" : "text-2xl"}`}>{product.name}</h3>
                  <p className="mt-4 text-pretty font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{product.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map(tag => <span key={tag} className="border border-border bg-background px-2.5 py-1.5 font-inter text-xs leading-relaxed">{tag}</span>)}
                  </div>
                </div>
                <div className={`relative isolate mt-6 flex items-center justify-center overflow-hidden border border-white/10 bg-[#101213] ${wide ? "lg:my-0 lg:min-h-64" : ""}`}>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(#98ff03_0.6px,transparent_0.6px)] [background-size:16px_16px]" />
                  <Image src={product.imageSrc} alt={`${product.name}: ${product.category} concept illustration`} width={640} height={360} sizes={wide ? "(max-width: 767px) 100vw, 40vw" : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"} className="relative h-auto w-full object-contain" />
                </div>
              </div>
              <details className="group mt-6 border-t border-border">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 font-inter text-sm font-medium [&::-webkit-details-marker]:hidden">Explore all capabilities <Plus aria-hidden="true" className="size-4 shrink-0 group-open:rotate-45" /></summary>
                <ul className={`grid gap-2 pb-5 pt-2 ${wide ? "sm:grid-cols-2" : ""}`}>
                  {product.capabilities.map(capability => <li key={capability} className="border border-border bg-background p-3 font-inter text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{capability}</li>)}
                </ul>
              </details>
              <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                <span aria-hidden="true" className="h-px w-8 bg-primary" />
                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Book a demo of ${product.name} (opens in a new tab)`} className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[4px] bg-[#292c2e] py-2 pe-2 ps-4 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1a1c1d] dark:bg-primary dark:text-primary-foreground dark:hover:bg-[#86e200]">
                  Book a demo <span className="bg-white/10 p-1.5 dark:bg-black/10"><ArrowUpRight aria-hidden="true" className="size-4" /></span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
