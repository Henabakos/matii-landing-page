import type { PillarContent } from "@/lib/pillars/schema";
import ProductBentoGrid from "./ProductBentoGrid";
export default function PillarCapabilities({content}: {content: PillarContent}) {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="scroll-mt-28 border-t border-border py-16 md:py-24">
      <p className="font-inter text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">Explore our capabilities</p>
      <div className="mb-10 mt-5 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <h2 id="capabilities-heading" className="whitespace-pre-line text-balance font-urbanist text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">{content.portfolioHeading}</h2>
        <p className="font-urbanist text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg lg:pt-2">{content.portfolioDescription}</p>
      </div>
      <ProductBentoGrid items={content.products} />
    </section>
  );
}
