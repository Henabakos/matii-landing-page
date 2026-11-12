import type { HtmlHeading } from "@/lib/content";

/** Pre-sanitized HTML (see projects/[slug]/page.tsx) plus the h2/h3 outline extracted from it. */
export interface ProjectRichSection {
  html: string;
  headings: HtmlHeading[];
}

export interface ProjectChallengeSolutionProps {
  challenge?: ProjectRichSection;
  solution?: ProjectRichSection;
}

const SECTIONS = [
  { key: "challenge", index: "01", tag: "{THE CHALLENGE}", title: "The Challenge" },
  { key: "solution", index: "02", tag: "{THE SOLUTION}", title: "The Solution" },
] as const;

export function ProjectChallengeSolution({ challenge, solution }: ProjectChallengeSolutionProps) {
  const content = { challenge, solution };
  const visible = SECTIONS.filter(section => content[section.key]?.html);
  if (!visible.length) return null;

  return (
    <div className="border-b border-zinc-200 dark:border-white/10">
      {visible.map((section, position) => {
        const { html, headings } = content[section.key]!;
        // An outline only helps when the section is long enough to need navigation.
        const outline = headings.length >= 2 ? headings : [];
        return (
          <section
            key={section.key}
            id={section.key}
            aria-labelledby={`${section.key}-title`}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 md:py-20 scroll-mt-8 ${position > 0 ? "border-t border-zinc-200 dark:border-white/10" : ""}`}
          >
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-space text-sm tabular-nums text-zinc-400 dark:text-zinc-500">{section.index}</span>
                  <span className="h-px w-8 bg-zinc-300 dark:bg-white/15" aria-hidden="true" />
                  <span className="inline-flex items-center gap-2 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-[2px]">
                    <span className="bg-[#98ff03] size-2.5 shrink-0" aria-hidden="true" />
                    <span className="font-space text-xs text-[#292c2e] dark:text-white uppercase tracking-wider font-bold">{section.tag}</span>
                  </span>
                </div>
                <h2 id={`${section.key}-title`} className="font-space font-medium text-3xl md:text-4xl leading-tight tracking-tight text-[#292c2e] dark:text-white">
                  {section.title}
                </h2>
                {outline.length > 0 && (
                  <nav aria-label={`${section.title} outline`} className="hidden lg:block">
                    <p className="mb-3 font-space text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">In this section</p>
                    <ol className="space-y-0.5 border-s border-zinc-200 dark:border-white/10">
                      {outline.map(heading => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className={`-ms-px block border-s-2 border-transparent py-1.5 font-inter text-sm leading-snug text-zinc-600 transition-colors hover:border-[#98ff03] hover:text-[#292c2e] dark:text-zinc-400 dark:hover:text-white ${heading.level === 3 ? "ps-7 text-[13px]" : "ps-4"}`}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
              </div>
            </aside>

            <div className="lg:col-span-8 min-w-0">
              <div className="Matii-prose case-study-prose max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default ProjectChallengeSolution;
