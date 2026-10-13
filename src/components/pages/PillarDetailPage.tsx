import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Headphones,
  Layers3,
  Plus,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  EnterpriseSoftwareFigure,
  BpoSolutionsFigure,
  AiDataPlatformFigure,
  ManagedCloudFigure,
} from "@/components/figures/pillar-figures";
import { PILLARS_LIST, type PillarData } from "@/data/pillars-data";
import { SERVICE_DETAIL_CONTENT } from "@/data/service-detail-content";
import styles from "./ServiceDetail.module.css";

const FIGURES = {
  EnterpriseSoftwareFigure,
  BpoSolutionsFigure,
  AiDataPlatformFigure,
  ManagedCloudFigure,
};
const ICONS = {
  enterprise: Code2,
  bpo: Headphones,
  cloud: Cloud,
  ai: Database,
};
const CAPABILITY_ICONS = [
  Layers3,
  Workflow,
  Database,
  ShieldCheck,
  Code2,
  Headphones,
];
const PHASES = ["Understand", "Design", "Deliver", "Improve"];
const SECTIONS = ["Overview", "Capabilities", "Approach", "FAQs"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span aria-hidden="true" className="size-2 shrink-0 bg-[#98ff03]" />
      {children}
    </p>
  );
}

export default function PillarDetailPage({ pillar }: { pillar: PillarData }) {
  const content = SERVICE_DETAIL_CONTENT[pillar.id];
  const Figure = FIGURES[pillar.figureName];
  const Icon = ICONS[pillar.id];

  return (
    <div className={`${styles.page} px-4 pb-12 pt-6 md:px-8 md:pb-20 md:pt-8`}>
      <div className="mx-auto max-w-[1380px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 font-inter text-xs text-muted-foreground"
        >
          <Link href="/" className={styles.textLink}>
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <Link href="/services" className={styles.textLink}>
            Services
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span aria-current="page" className="font-medium text-foreground">
            {content.name}
          </span>
        </nav>

        <section
          aria-labelledby="service-title"
          className={`${styles.hero} relative overflow-hidden rounded-[4px] border border-white/10 bg-[#161819] text-white`}
        >
          <div className="grid items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-14 lg:py-16">
            <div className={`${styles.reveal} relative z-10`}>
              <p className="mb-6 flex items-center gap-3 font-inter text-xs font-medium tracking-wide text-[#98ff03]">
                <Icon aria-hidden="true" className="size-4" />
                {content.name}
                <span className="ml-auto hidden font-mono text-[10px] text-zinc-500 sm:block">
                  SERVICE / {pillar.index}
                </span>
              </p>
              <h1
                id="service-title"
                className="whitespace-pre-line text-balance font-urbanist text-[clamp(2.5rem,4.7vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.04em]"
              >
                {content.headline}
              </h1>
              <p className="mt-6 max-w-xl font-inter text-base leading-[1.8] text-zinc-300 sm:text-lg">
                {content.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className={`${styles.primaryAction} inline-flex min-h-12 items-center justify-between gap-6 rounded-lg bg-[#98ff03] px-5 py-3.5 font-inter text-sm font-semibold text-[#161819]`}
                >
                  <span>Let’s talk about your project</span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </Link>
                <a
                  href="#capabilities"
                  className={`${styles.secondaryAction} inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/20 px-5 py-3.5 font-inter text-sm text-white`}
                >
                  Explore the service
                  <ArrowDown aria-hidden="true" className="size-4" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 font-inter text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <Check
                    aria-hidden="true"
                    className="size-3.5 text-[#98ff03]"
                  />
                  Built around your needs
                </span>
                <span className="flex items-center gap-2">
                  <Check
                    aria-hidden="true"
                    className="size-3.5 text-[#98ff03]"
                  />
                  Clear delivery and ownership
                </span>
              </div>
            </div>
            <div
              className={`${styles.diagram} relative min-w-0 rounded-xl border border-white/10 bg-[#0d0f10] p-4 sm:p-6`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                <span>Connected by design</span>
                <span className="flex items-center gap-2 text-[#98ff03]">
                  <span className="size-1.5 rounded-full bg-[#98ff03]" />
                  {pillar.shortTitle}
                </span>
              </div>
              <div className="mx-auto w-full max-w-[460px] py-6">
                <Figure />
              </div>
              <ol
                aria-label="Service workflow"
                className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4"
              >
                {content.workflow.map((step, index) => (
                  <li key={step} className="min-w-0">
                    <span className="mb-2 block font-mono text-[10px] text-[#98ff03]">
                      0{index + 1}
                    </span>
                    <span className="font-inter text-[11px] leading-relaxed text-zinc-300 sm:text-xs">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 font-inter text-[10px] text-zinc-500">
                Illustrative service architecture
              </p>
            </div>
          </div>
        </section>

        <nav
          aria-label="On this page"
          className={`${styles.sectionNav} my-6 flex items-center gap-1 overflow-x-auto border-b border-border pb-3 sm:my-8 sm:gap-3`}
        >
          {SECTIONS.map((section, index) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-3 font-inter text-xs font-medium text-foreground sm:px-4 sm:text-sm"
            >
              <span className="font-mono text-[10px] text-muted-foreground">
                0{index + 1}
              </span>
              {section}
            </a>
          ))}
          <span className="ml-auto hidden pr-2 font-inter text-xs text-muted-foreground lg:block">
            From possibility to a practical plan.
          </span>
        </nav>

        <section
          id="overview"
          aria-labelledby="overview-title"
          className="scroll-mt-8 py-10 sm:py-14 lg:py-16"
        >
          <div className="grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionLabel>The opportunity</SectionLabel>
              <h2 id="overview-title" className={styles.sectionTitle}>
                Built for your business.
                <br />
                <span className="text-muted-foreground">
                  Designed to move it forward.
                </span>
              </h2>
            </div>
            <p className="max-w-2xl font-inter text-base leading-[1.9] text-muted-foreground sm:text-lg">
              {content.overview}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {content.outcomes.map((outcome, index) => (
              <div key={outcome.title} className="border-t border-border pt-5">
                <span className="font-mono text-xs text-muted-foreground">
                  0{index + 1} /
                </span>
                <h3 className="mb-2 mt-4 font-urbanist text-xl font-semibold tracking-tight text-foreground">
                  {outcome.title}
                </h3>
                <p className="max-w-xs font-inter text-sm leading-relaxed text-muted-foreground">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="capabilities"
          aria-labelledby="capabilities-title"
          className="scroll-mt-8 py-10 sm:py-14 lg:py-16"
        >
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>What we can help you build</SectionLabel>
              <h2 id="capabilities-title" className={styles.sectionTitle}>
                The right expertise.
                <br />
                Where you need it.
              </h2>
            </div>
            <p className="max-w-sm font-inter text-sm leading-relaxed text-muted-foreground">
              A focused engagement or a connected solution. We shape the scope
              around your priorities.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.map((capability, index) => {
              const CapabilityIcon = CAPABILITY_ICONS[index];
              return (
                <article
                  key={capability.title}
                  className={`${styles.capability} rounded-lg border border-border bg-card p-6 sm:p-8`}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-background text-foreground">
                      <CapabilityIcon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mb-3 font-urbanist text-xl font-semibold leading-tight tracking-tight text-card-foreground">
                    {capability.title}
                  </h3>
                  <p className="font-inter text-sm leading-[1.8] text-muted-foreground">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="approach"
          aria-labelledby="approach-title"
          className="scroll-mt-8 py-10 sm:py-14 lg:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionLabel>How we work</SectionLabel>
              <h2 id="approach-title" className={styles.sectionTitle}>
                A clear process.
                <br />A shared direction.
              </h2>
              <p className="mt-5 max-w-md font-inter text-sm leading-[1.8] text-muted-foreground">
                We make room for the right questions, involve your team at each
                stage, and keep the next step clear.
              </p>
              <div className="mt-8 rounded-lg border border-border bg-card p-6 sm:p-7">
                <h3 className="mb-5 font-urbanist text-lg font-semibold text-foreground">
                  What you take forward
                </h3>
                <ul className="space-y-4">
                  {content.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-inter text-sm leading-relaxed text-muted-foreground"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-foreground"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {content.phases.map((phase, index) => (
                <li
                  key={PHASES[index]}
                  className="flex gap-5 py-7 sm:gap-7 sm:py-8"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-sm text-foreground">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="mb-2 font-urbanist text-2xl font-semibold tracking-tight text-foreground">
                      {PHASES[index]}
                    </h3>
                    <p className="max-w-xl font-inter text-sm leading-[1.8] text-muted-foreground">
                      {phase}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="toolchain-title"
          className="my-8 rounded-lg border border-border bg-card px-6 py-8 sm:px-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <div>
              <SectionLabel>Tools that fit the task</SectionLabel>
              <h2
                id="toolchain-title"
                className="font-urbanist text-2xl font-semibold tracking-tight text-foreground"
              >
                Your needs lead.
                <br />
                The technology follows.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {pillar.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-background px-3 py-2 font-inter text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faqs"
          aria-labelledby="faq-title"
          className="grid scroll-mt-8 gap-8 py-10 sm:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-16"
        >
          <div>
            <SectionLabel>A few things you might ask</SectionLabel>
            <h2 id="faq-title" className={styles.sectionTitle}>
              Before we begin.
            </h2>
            <p className="mt-5 max-w-sm font-inter text-sm leading-relaxed text-muted-foreground">
              Have a more specific question?
              <br />
              <Link
                href="/contact"
                className={`${styles.textLink} mt-3 inline-flex items-center gap-2 font-medium text-foreground`}
              >
                Talk to our team
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {content.faqs.map((faq) => (
              <details key={faq.question} className={styles.faq}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-urbanist text-lg font-semibold leading-relaxed text-foreground">
                  <span>{faq.question}</span>
                  <Plus aria-hidden="true" className="size-5 shrink-0" />
                </summary>
                <p className="pb-6 pr-5 font-inter text-sm leading-[1.8] text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="related-title"
          className="border-t border-border py-10 sm:py-14"
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Better together</SectionLabel>
              <h2
                id="related-title"
                className="font-urbanist text-3xl font-semibold tracking-tight text-foreground"
              >
                Explore our other services.
              </h2>
            </div>
            <Link
              href="/services"
              className={`${styles.textLink} inline-flex items-center gap-2 font-inter text-sm text-foreground`}
            >
              All services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {PILLARS_LIST.filter((other) => other.id !== pillar.id).map(
              (other) => {
                const OtherIcon = ICONS[other.id];
                return (
                  <Link
                    key={other.id}
                    href={`/services/${other.slug}`}
                    className={`${styles.related} group flex items-center gap-4 rounded-lg border border-border bg-card p-5 sm:p-6`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background text-foreground">
                      <OtherIcon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-urbanist text-lg font-semibold text-foreground">
                      {SERVICE_DETAIL_CONTENT[other.id].name}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto size-4 shrink-0 text-foreground"
                    />
                  </Link>
                );
              },
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
