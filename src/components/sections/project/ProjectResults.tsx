import type { ProjectResultItem } from "@/lib/services/project-results";

export interface ProjectResultsProps {
  results?: ProjectResultItem[];
}

const GRID_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Splits "45%" into number and suffix so the unit can be accented. */
function splitValue(value: string) {
  const match = value.match(/^([^\d]*[\d.,]+)(.*)$/);
  return match ? { main: match[1], suffix: match[2] } : { main: value, suffix: "" };
}

export function ProjectResults({ results = [] }: ProjectResultsProps) {
  if (!results.length) return null;
  const columns = GRID_COLUMNS[results.length] || "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section aria-labelledby="project-results-title" className="py-14 md:py-20 border-b border-zinc-200 dark:border-white/10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-[2px]">
            <span className="bg-[#98ff03] size-2.5 shrink-0" aria-hidden="true" />
            <span className="font-space text-xs text-[#292c2e] dark:text-white uppercase tracking-wider font-bold">{"{THE IMPACT}"}</span>
          </span>
          <h2 id="project-results-title" className="font-space font-medium text-3xl md:text-4xl tracking-tight text-[#292c2e] dark:text-white">
            Measurable results
          </h2>
        </div>
      </div>

      <dl className={`grid grid-cols-1 ${columns} border-s border-t border-zinc-200 dark:border-white/10`}>
        {results.map((result, index) => {
          const { main, suffix } = splitValue(result.value);
          return (
            <div
              key={`${result.label}-${index}`}
              className="group relative flex flex-col justify-between gap-6 border-e border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 md:p-8 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]"
            >
              <span className="absolute top-0 start-0 h-0.5 w-0 bg-[#98ff03] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
              {/* dt must precede dd in the DOM; flex order shows the number first. */}
              <dt className="order-2 space-y-1.5">
                <span className="block font-space text-sm md:text-base font-semibold text-[#292c2e] dark:text-zinc-100">{result.label}</span>
                {result.description && (
                  <span className="block font-inter text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{result.description}</span>
                )}
              </dt>
              <dd className="order-1 font-space text-5xl md:text-6xl font-bold tracking-tight text-[#292c2e] dark:text-white tabular-nums">
                {main}
                {suffix && <span className="text-lime-700 dark:text-[#98ff03]">{suffix}</span>}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export default ProjectResults;
