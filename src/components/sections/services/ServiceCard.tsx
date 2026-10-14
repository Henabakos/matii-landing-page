import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface ServiceCardProps {
  index: string;
  title: string;
  description?: string;
  items: string[];
  href?: string;
}

export default function ServiceCard({ index, title, description, items, href = "/contact" }: ServiceCardProps) {
  return (
    <Link href={href} className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-inter text-xs tabular-nums tracking-widest text-zinc-600 dark:text-zinc-400">{index}</span>
        <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-5 text-foreground" />
      </div>
      <h3 className="max-w-64 sm:min-h-[2.3em] text-balance font-urbanist text-2xl font-semibold leading-[1.15] tracking-tight xl:text-3xl">{title}</h3>
      {description && <p className="mb-7 mt-4 max-w-md text-pretty font-inter text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{description}</p>}
      <ul className="mt-auto space-y-2 border-s-2 border-primary ps-4 font-inter text-sm leading-relaxed">
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
      <span className="mt-8 border-t border-border pt-5 font-inter text-sm font-medium underline-offset-4 group-hover:underline">Explore service<span className="sr-only">: {title}</span></span>
    </Link>
  );
}
