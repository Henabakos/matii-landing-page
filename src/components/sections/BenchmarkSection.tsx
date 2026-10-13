"use client";

import { useState } from "react";
import {
  StartupFigure,
  BuildFigure,
  BootFigure,
  WeightFigure,
} from "../figures/benchmark-figures";
import {
  benchmarkReport,
  formatBenchmarkDuration,
} from "../../lib/framework-benchmark";

const RIVALS = benchmarkReport.frameworks.filter(
  (framework) => framework.id !== "farm",
);
const FARM = benchmarkReport.frameworks.find(
  (framework) => framework.id === "farm",
)!;

export function BenchmarkSection() {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <section
      id="benchmarks"
      className="relative w-full overflow-hidden py-12 md:py-20"
      aria-label="Framework Performance Benchmarks"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[800px] max-w-full rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-345 px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-zinc-100/80 dark:bg-white/5 backdrop-blur-sm text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Measured Live · Engineering Benchmarks
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white max-w-3xl">
            Calibrated for pure velocity. Benchmarked to the millisecond.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Every interactive isometric model below is driven by real benchmark
            measurements running on hardware cycles. Scrub or hover each figure to inspect spring
            physics, startup dials, column stacks, and continuous feeds.
          </p>

          {/* Quick Methodology Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowMethodology(!showMethodology)}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-tight px-3.5 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/25 bg-white/70 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all shadow-sm"
            >
              <span>{showMethodology ? "Hide" : "Inspect"} Test Methodology & Spec</span>
              <svg
                className={`size-3.5 transition-transform duration-200 ${
                  showMethodology ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable Methodology Drawer */}
        {showMethodology && (
          <div className="mb-14 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0e1013] p-6 sm:p-8 text-sm shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-white/10">
              <div>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Verifiable Fixture: {benchmarkReport.fixture.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
                  {benchmarkReport.fixture.description}
                </p>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                {benchmarkReport.quality.publishable ? "Publishable · Contention-Free" : "Review"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 font-mono text-xs">
              <div>
                <div className="text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Hardware</div>
                <div className="font-medium text-zinc-900 dark:text-zinc-200 mt-1">
                  {benchmarkReport.system.cpu} ({benchmarkReport.system.logicalCpuCount} Cores)
                </div>
                <div className="text-zinc-500 text-[11px] mt-0.5">{benchmarkReport.system.memoryGb} GB RAM · {benchmarkReport.system.architecture}</div>
              </div>

              <div>
                <div className="text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Environment</div>
                <div className="font-medium text-zinc-900 dark:text-zinc-200 mt-1">
                  Node {benchmarkReport.system.node}
                </div>
                <div className="text-zinc-500 text-[11px] mt-0.5">pnpm {benchmarkReport.system.pnpm} · {benchmarkReport.system.os}</div>
              </div>

              <div>
                <div className="text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Sampling Protocol</div>
                <div className="font-medium text-zinc-900 dark:text-zinc-200 mt-1">
                  {benchmarkReport.methodology.runs} Runs × {benchmarkReport.methodology.measuredRequestsPerRun} Req
                </div>
                <div className="text-zinc-500 text-[11px] mt-0.5">{benchmarkReport.methodology.order}</div>
              </div>

              <div>
                <div className="text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Cache Policy</div>
                <div className="font-medium text-zinc-900 dark:text-zinc-200 mt-1">
                  Cold caches purged
                </div>
                <div className="text-zinc-500 text-[11px] mt-0.5">Warm Node compile cache</div>
              </div>
            </div>
          </div>
        )}

        {/* 2x2 Interactive Figures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Card 1: Cold Start Dial */}
          <article className="group relative rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-[#0c0d0f] p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20">
            {/* Corner Markers */}
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 right-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 right-0" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  Dev Server Startup
                </span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  FIG. 01 · STOPWATCH
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white flex flex-wrap items-baseline gap-x-2">
                <span>First page render vs</span>
                <span className="benchmark-comparison-rotator text-emerald-600 dark:text-emerald-400 font-semibold underline decoration-emerald-500/40 underline-offset-4">
                  {RIVALS.map((rival, index) => (
                    <span
                      key={rival.id}
                      className="benchmark-comparison-item"
                      style={{ animationDelay: `${index * 3000}ms` }}
                    >
                      {rival.label}
                    </span>
                  ))}
                </span>
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Cold SSR compilation to first visual paint on a 120-item dynamic route. The stopwatch blade sweeps in real time to each framework&apos;s measured arrival mark.
              </p>

              <div className="mt-4 flex items-center gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-900 dark:text-white font-medium">
                  Farm.js: {formatBenchmarkDuration(FARM.metrics.devFirstPageMs.median)}
                </span>
                <span>·</span>
                <span>Next.js: {formatBenchmarkDuration(RIVALS[0]!.metrics.devFirstPageMs.median)} (5.5×)</span>
              </div>
            </div>

            {/* Interactive SVG Stage */}
            <div className="mt-6">
              <StartupFigure />
            </div>
          </article>

          {/* Card 2: Production Build Columns */}
          <article className="group relative rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-[#0c0d0f] p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20">
            {/* Corner Markers */}
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 right-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 right-0" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  Production Build
                </span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  FIG. 02 · PLINTH STACKS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white flex flex-wrap items-baseline gap-x-2">
                <span>Compilation time vs</span>
                <span className="benchmark-comparison-rotator text-cyan-600 dark:text-cyan-400 font-semibold underline decoration-cyan-500/40 underline-offset-4">
                  {RIVALS.map((rival, index) => (
                    <span
                      key={rival.id}
                      className="benchmark-comparison-item"
                      style={{ animationDelay: `${index * 3000}ms` }}
                    >
                      {rival.label}
                    </span>
                  ))}
                </span>
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Full production client bundling, server route emission, and asset compilation. Rounded columns rise in unison, with height segmented into 1-second blocks.
              </p>

              <div className="mt-4 flex items-center gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-900 dark:text-white font-medium">
                  Farm.js: {formatBenchmarkDuration(FARM.metrics.buildMs.median)}
                </span>
                <span>·</span>
                <span>Next.js: {formatBenchmarkDuration(RIVALS[0]!.metrics.buildMs.median)} (4.5×)</span>
              </div>
            </div>

            {/* Interactive SVG Stage */}
            <div className="mt-6">
              <BuildFigure />
            </div>
          </article>

          {/* Card 3: Server Rack Units */}
          <article className="group relative rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-[#0c0d0f] p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20">
            {/* Corner Markers */}
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 right-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 right-0" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  Production Boot & Init
                </span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  FIG. 03 · SERVER RACK
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white flex flex-wrap items-baseline gap-x-2">
                <span>Process ready latency vs</span>
                <span className="benchmark-comparison-rotator text-amber-600 dark:text-amber-400 font-semibold underline decoration-amber-500/40 underline-offset-4">
                  {RIVALS.map((rival, index) => (
                    <span
                      key={rival.id}
                      className="benchmark-comparison-item"
                      style={{ animationDelay: `${index * 3000}ms` }}
                    >
                      {rival.label}
                    </span>
                  ))}
                </span>
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Cold process boot to first served request in edge and container runtimes. Server units display live progress bars and green status LEDs when operational.
              </p>

              <div className="mt-4 flex items-center gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-900 dark:text-white font-medium">
                  Farm.js: {formatBenchmarkDuration(FARM.metrics.productionBootMs.median)}
                </span>
                <span>·</span>
                <span>Next.js: {formatBenchmarkDuration(RIVALS[0]!.metrics.productionBootMs.median)} (4.0×)</span>
              </div>
            </div>

            {/* Interactive SVG Stage */}
            <div className="mt-6">
              <BootFigure />
            </div>
          </article>

          {/* Card 4: Paper Printers */}
          <article className="group relative rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-[#0c0d0f] p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20">
            {/* Corner Markers */}
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 top-0 right-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 left-0" />
            <div className="absolute size-1.5 bg-zinc-400 dark:bg-white/40 bottom-0 right-0" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-2.5 py-0.5 rounded border border-violet-500/20">
                  Response HTML Payload
                </span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  FIG. 04 · DESK PRINTERS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white flex flex-wrap items-baseline gap-x-2">
                <span>Transferred HTML weight vs</span>
                <span className="benchmark-comparison-rotator text-violet-600 dark:text-violet-400 font-semibold underline decoration-violet-500/40 underline-offset-4">
                  {RIVALS.map((rival, index) => (
                    <span
                      key={rival.id}
                      className="benchmark-comparison-item"
                      style={{ animationDelay: `${index * 3000}ms` }}
                    >
                      {rival.label}
                    </span>
                  ))}
                </span>
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Initial HTML response weight for the dynamic list route. Continuous feed printers output curled, folded reams at a calibrated rate of one fold per four kilobytes.
              </p>

              <div className="mt-4 flex items-center gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-900 dark:text-white font-medium">
                  Farm.js: {(FARM.metrics.responseBytes.median / 1024).toFixed(1)} KB
                </span>
                <span>·</span>
                <span>Next.js: {(RIVALS[0]!.metrics.responseBytes.median / 1024).toFixed(1)} KB (4.1× lighter)</span>
              </div>
            </div>

            {/* Interactive SVG Stage */}
            <div className="mt-6">
              <WeightFigure />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default BenchmarkSection;
