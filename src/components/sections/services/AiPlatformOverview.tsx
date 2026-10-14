import AiProductPortfolio from "./AiProductPortfolio";
import type { PillarContent } from "@/lib/pillars/schema";

export default function AiPlatformOverview({content}: {content: PillarContent}) {
  return (
    <div id="capabilities" className="scroll-mt-28 border-t border-border py-16 md:py-24">
      {content.overview?.visible && <section aria-labelledby="platform-overview-heading" className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">One platform. From data to production.</p>
          <h2 id="platform-overview-heading" className="mt-5 text-balance font-urbanist text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">What is MATII Data & AI?</h2>
          <p className="mt-6 max-w-prose font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{content.overview.positioning}</p>
          <div className="mt-8 border-s-2 border-primary ps-5"><h3 className="font-urbanist text-xl font-semibold">Your information, brought together.</h3><p className="mt-3 font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{content.overview.example}</p></div>
          <p className="mt-6 font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{content.overview.applications}</p>
        </div>
        <div className="border border-border bg-card p-6 sm:p-8"><h3 className="font-urbanist text-2xl font-semibold">From scattered data to useful AI.</h3><ol className="mt-6 space-y-5">{content.overview.workflow.map((step, index) => <li key={step} className="flex items-start gap-4"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background font-inter text-xs tabular-nums">{index + 1}</span><span className="font-inter text-base leading-relaxed">{step}</span></li>)}</ol></div>
      </section>}

      <section aria-labelledby="portfolio-heading" className="pt-16 md:pt-24">
        <div>
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">The complete product portfolio</p>
          <div className="mt-5 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <h2 id="portfolio-heading" className="whitespace-pre-line text-balance font-urbanist text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">{content.portfolioHeading}</h2>
          <p className="font-urbanist text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg lg:pt-2">{content.portfolioDescription}</p>
          </div>
        </div>
        <AiProductPortfolio items={content.products} />
      </section>
    </div>
  );
}
