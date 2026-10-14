import PillarCapabilities from "@/components/sections/services/PillarCapabilities";
import { ArrowDown, ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import TechPathBackground from "@/components/common/TechPathBackground";
import AiPlatformOverview from "@/components/sections/services/AiPlatformOverview";
import type { PillarContent } from "@/lib/pillars/schema";
import ServiceIllustration from "@/components/figures/ServiceIllustration";
import { type PillarData } from "@/data/pillars-data";


function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-urbanist text-xs font-semibold uppercase tracking-[0.12em]">
      <span aria-hidden="true" className="size-2.5 shrink-0 bg-primary" />
      {children}
    </span>
  );
}

export default function PillarDetailPage({ pillar, content, related }: { pillar: PillarData; content: PillarContent; related: {id: string; slug: string; shortTitle: string}[] }) {
  const isAiPlatform = pillar.id === "ai";
  const serviceOrder = ["enterprise", "bpo", "ai", "cloud"];
  const serviceNumber = (id: string) => String(serviceOrder.indexOf(id) + 1).padStart(2, "0");
  const otherServices = related.filter((item) => item.id !== pillar.id);

  return (
    <div className="service-detail w-full px-4 md:px-8 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-foreground [&_summary:focus-visible]:outline-2 [&_summary:focus-visible]:outline-offset-4 [&_summary:focus-visible]:outline-foreground">
      <div className="mx-auto max-w-345">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-6 font-inter text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/services" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" /> All services
          </Link>
          <span aria-hidden="true" className="text-zinc-400">/</span>
          <span aria-current="page" className="text-foreground">{content.listing.title}</span>
        </nav>

        <section aria-labelledby="service-heading" className="relative py-10 md:py-16 lg:pb-20">
          <TechPathBackground variant="brand" intensity="subtle" animated={false} />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-xs bg-[#292c2e] px-3 py-2 text-white">
                <SectionLabel>{content.name}</SectionLabel>
              </div>
              <h1 id="service-heading" className="max-w-2xl text-balance font-urbanist text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl xl:text-[64px]">
                {content.headline}
              </h1>
              <p className="mt-6 max-w-xl text-pretty font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
                {content.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-4 rounded-xl border border-[#292c2e] bg-[#292c2e] py-2 pe-2 ps-5 font-inter text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1a1c1d] dark:border-primary dark:bg-primary dark:text-primary-foreground dark:hover:bg-[#86e200]">
                  Start a project
                  <span className="rounded bg-primary p-2 text-primary-foreground dark:bg-[#161819] dark:text-primary">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
                <a href="#capabilities" className="inline-flex min-h-12 items-center justify-center gap-2 px-4 font-inter text-sm font-medium underline-offset-4 hover:underline">
                  {isAiPlatform ? "Explore the platform" : "Explore the service"} <ArrowDown aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>
            <div className="relative min-w-0">

              <ServiceIllustration service={pillar.id} />

            </div>
          </div>
        </section>

        {pillar.id === "ai" ? <AiPlatformOverview content={content} /> : <PillarCapabilities content={content} />}

          {content.techStack.length > 0 && (
            <details className="mb-16 border-y border-border py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-inter text-sm font-medium [&::-webkit-details-marker]:hidden">
                Explore the tools & technologies <Plus aria-hidden="true" className="size-4 shrink-0" />
              </summary>
              <ul className="flex flex-wrap gap-2 pb-5 pt-2" aria-label="Tools and technologies">
                {content.techStack.map((tool) => <li key={tool} className="rounded-md border border-border bg-card px-3 py-2 font-inter text-sm">{tool}</li>)}
              </ul>
            </details>
          )}

        <section aria-labelledby="process-heading" className="relative border border-border bg-card px-6 py-12 sm:px-10 md:py-16">
          <div aria-hidden="true" className="absolute -start-[3px] -top-[3px] size-1.5 bg-foreground" />
          <div aria-hidden="true" className="absolute -end-[3px] -bottom-[3px] size-1.5 bg-foreground" />
          <SectionLabel>How we work</SectionLabel>
          <h2 id="process-heading" className="mt-5 text-balance font-urbanist text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">A clear path forward.</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.process.map((step, index) => (
              <li key={step.title} className="border-t border-border pt-5">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-background font-inter text-sm tabular-nums">0{index + 1}</span>
                <h3 className="mt-5 font-urbanist text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {content.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="grid gap-8 py-16 md:py-20 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <div>
              <SectionLabel>A little more clarity</SectionLabel>
              <h2 id="faq-heading" className="mt-5 text-balance font-urbanist text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">Good questions.<br />Clear answers.</h2>
              <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 font-inter text-sm underline underline-offset-4">Talk to our team <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
            </div>
            <div className="border-t border-border">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-urbanist text-lg font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus aria-hidden="true" className="mt-1 size-5 shrink-0 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-prose pb-6 pe-6 font-inter text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {otherServices.length > 0 && <section aria-labelledby="related-heading" className="border-t border-border py-12 md:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 id="related-heading" className="font-urbanist text-2xl font-medium tracking-tight md:text-3xl">More ways to move forward.</h2>
            <Link href="/services" className="inline-flex min-h-11 items-center gap-2 font-inter text-sm underline underline-offset-4">View all services <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {otherServices.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="group flex min-h-28 items-center justify-between gap-5 border border-border bg-card p-6 transition-colors hover:bg-accent">
                <span><span className="mb-2 block font-inter text-xs text-zinc-600 dark:text-zinc-400">{serviceNumber(service.id)}</span><span className="font-urbanist text-xl font-semibold">{service.shortTitle}</span></span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
              </Link>
            ))}
          </div>
        </section>}
      </div>
    </div>
  );
}
