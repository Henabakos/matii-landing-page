"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Cpu,
  Server,
  Zap,
  ShieldCheck,
  Activity,
  Calendar,
  ExternalLink,
  Code2,
  Users2,
  Cloud,
  Brain,
} from "lucide-react";
import {
  EnterpriseSoftwareFigure,
  BpoSolutionsFigure,
  AiDataPlatformFigure,
  ManagedCloudFigure,
} from "@/components/figures/pillar-figures";
import type { PillarData } from "@/data/pillars-data";
import { PILLARS_LIST } from "@/data/pillars-data";

interface PillarDetailPageProps {
  pillar: PillarData;
}

const FIGURE_COMPONENTS = {
  EnterpriseSoftwareFigure: <EnterpriseSoftwareFigure />,
  BpoSolutionsFigure: <BpoSolutionsFigure />,
  AiDataPlatformFigure: <AiDataPlatformFigure />,
  ManagedCloudFigure: <ManagedCloudFigure />,
};

const PILLAR_ICONS = {
  enterprise: <Code2 className="size-4 text-[#98ff03]" />,
  bpo: <Users2 className="size-4 text-[#98ff03]" />,
  cloud: <Cloud className="size-4 text-[#98ff03]" />,
  ai: <Brain className="size-4 text-[#98ff03]" />,
};

export default function PillarDetailPage({ pillar }: PillarDetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const otherPillars = PILLARS_LIST.filter((p) => p.id !== pillar.id);

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-14 overflow-hidden">
      <div className="max-w-[1380px] mx-auto space-y-16 md:space-y-24">
        {/* =================================================================== */}
        {/* 1. TOP BREADCRUMB & BACK ACTION */}
        {/* =================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(174,174,174,0.25)] dark:border-white/10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-space text-xs sm:text-sm uppercase tracking-wider text-[#292c2e] dark:text-zinc-300 hover:text-black dark:hover:text-[#98ff03] transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-space uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>Services</span>
            <span>/</span>
            <span className="text-[#292c2e] dark:text-[#98ff03] font-medium">
              {pillar.shortTitle}
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. HERO SECTION — ARCHITECTURAL FRAMED HEADER */}
        {/* =================================================================== */}
        <div className="relative bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.35)] dark:border-white/10 p-6 sm:p-10 md:p-14 transition-colors duration-200">
          {/* Architectural Corner Accents */}
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px]" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Pillar Tag */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#292c2e] dark:bg-white/10 rounded-[2px] border border-zinc-700/40 dark:border-white/10">
                <div className="size-2 rounded-full bg-[#98ff03] animate-pulse" />
                <span className="font-space font-medium text-xs sm:text-[13px] uppercase tracking-wider text-white">
                  {pillar.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-space font-medium text-3xl sm:text-5xl md:text-[56px] lg:text-[62px] leading-[1.08] text-[#292c2e] dark:text-white tracking-tight">
                {pillar.title}
              </h1>

              {/* Subtitle */}
              <p className="font-inter text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {pillar.subtitle}
              </p>

              {/* Hero Action CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  target="_blank"
                  href="https://calendly.com/Matiidigitals/30min"
                  className="font-inter text-sm md:text-[15px] font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] dark:bg-[#98ff03] dark:text-[#161819] dark:hover:bg-[#86e200] px-6 py-3 rounded-[4px] inline-flex items-center gap-2.5 shadow-sm transition-all group"
                >
                  <span>Book Architecture Review</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a
                  href="#specifications"
                  className="font-inter text-sm md:text-[15px] font-medium text-[#292c2e] dark:text-zinc-300 hover:text-black dark:hover:text-white px-5 py-3 rounded-[4px] border border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 transition-all inline-flex items-center gap-2"
                >
                  <span>Explore Technical Specs</span>
                  <ChevronDown className="size-4" />
                </a>
              </div>
            </div>

            {/* Quick Metadata Card */}
            <div className="lg:col-span-4 bg-zinc-50 dark:bg-[#0f1113] border border-zinc-200 dark:border-white/10 p-6 rounded-[4px] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
                <span className="font-space text-xs uppercase tracking-wider text-zinc-500">
                  System Identifier
                </span>
                <span className="font-space text-xs font-semibold text-[#292c2e] dark:text-[#98ff03]">
                  {pillar.systemCode}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
                <span className="font-space text-xs uppercase tracking-wider text-zinc-500">
                  Engagement Model
                </span>
                <span className="font-inter text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Dedicated Pod / Turnkey SLA
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
                <span className="font-space text-xs uppercase tracking-wider text-zinc-500">
                  Audit Readiness
                </span>
                <span className="font-inter text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" />
                  SOC2 · ISO 27001
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-space text-xs uppercase tracking-wider text-zinc-500">
                  Deployment Speed
                </span>
                <span className="font-inter text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  2 – 4 Weeks to Staging
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. INTERACTIVE 3D SCHEMATIC / FIGURE STAGE */}
        {/* =================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <div className="size-2 bg-[#98ff03]" />
              <span className="font-space text-xs md:text-sm font-semibold uppercase tracking-wider text-[#292c2e] dark:text-white">
                Live Architecture Stage · Interactive Telemetry
              </span>
            </div>
            <span className="hidden sm:inline font-space text-xs text-zinc-500 uppercase tracking-wider">
              Move cursor over schematic to inspect node telemetry
            </span>
          </div>

          <div className="relative border border-[rgba(174,174,174,0.35)] dark:border-white/10 bg-white dark:bg-[#0c0d0f] rounded-[4px] p-4 sm:p-8 md:p-12 overflow-hidden shadow-sm">
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="max-w-[840px] mx-auto flex items-center justify-center">
              {FIGURE_COMPONENTS[pillar.figureName]}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. KEY TECHNICAL SPECIFICATIONS & BENCHMARKS (4 CARDS) */}
        {/* =================================================================== */}
        <div id="specifications" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="size-2 bg-[#98ff03]" />
                <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
                  BENCHMARK PROTOCOLS
                </span>
              </div>
              <h2 className="font-space font-medium text-2xl sm:text-3xl md:text-4xl text-[#292c2e] dark:text-white tracking-tight">
                Engineering Specifications & SLA Thresholds
              </h2>
            </div>
            <span className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Audited in production environments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {pillar.specs.map((spec, idx) => (
              <div
                key={idx}
                className="relative bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 p-6 rounded-[4px] hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-all group"
              >
                <div className="font-space text-xs uppercase tracking-wider text-zinc-500 mb-2 flex items-center justify-between">
                  <span>{spec.label}</span>
                  <span className="size-1.5 rounded-full bg-[#98ff03] opacity-60 group-hover:opacity-100" />
                </div>
                <div className="font-space font-bold text-2xl sm:text-3xl text-[#292c2e] dark:text-white tracking-tight mb-2 group-hover:text-black dark:group-hover:text-[#98ff03] transition-colors">
                  {spec.value}
                </div>
                {spec.description && (
                  <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {spec.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. CORE CAPABILITIES MATRIX (6 CARDS) */}
        {/* =================================================================== */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="size-2 bg-[#98ff03]" />
              <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
                CORE CAPABILITIES
              </span>
            </div>
            <h2 className="font-space font-medium text-2xl sm:text-3xl md:text-4xl text-[#292c2e] dark:text-white tracking-tight">
              What We Engineer & Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillar.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="relative bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 p-6 md:p-7 rounded-[4px] flex flex-col justify-between hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-space text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    {cap.metrics && (
                      <span className="font-space text-[11px] font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/10 text-[#292c2e] dark:text-[#98ff03]">
                        {cap.metrics}
                      </span>
                    )}
                  </div>
                  <h3 className="font-space font-semibold text-lg md:text-xl text-[#292c2e] dark:text-white mb-3 group-hover:text-black dark:group-hover:text-[#98ff03] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="font-inter text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                {cap.tags && cap.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-white/5">
                    {cap.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-inter px-2 py-0.5 bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 rounded-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 6. ARCHITECTURAL BLUEPRINT & PROCESSING FLOW (3 PIPELINE STEPS) */}
        {/* =================================================================== */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="size-2 bg-[#98ff03]" />
              <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
                SYSTEM BLUEPRINT
              </span>
            </div>
            <h2 className="font-space font-medium text-2xl sm:text-3xl md:text-4xl text-[#292c2e] dark:text-white tracking-tight">
              Production Execution Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {pillar.architectureSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-zinc-50/70 dark:bg-[#121416] border border-zinc-200 dark:border-white/10 p-6 md:p-8 rounded-[4px] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-space font-bold text-2xl md:text-3xl text-zinc-300 dark:text-zinc-700">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-space uppercase tracking-wider px-2 py-1 bg-zinc-200/60 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 rounded-[2px]">
                    {step.techBadge}
                  </span>
                </div>
                <h3 className="font-space font-semibold text-lg text-[#292c2e] dark:text-white">
                  {step.title}
                </h3>
                <p className="font-inter text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 7. REAL-WORLD CASE STUDY IMPACT TEASER */}
        {/* =================================================================== */}
        <div className="relative bg-gradient-to-br from-zinc-900 to-[#161819] text-white p-8 sm:p-12 md:p-16 rounded-[4px] border border-zinc-800 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#98ff03] text-black text-xs font-space uppercase font-bold tracking-wider rounded-[2px]">
                Proven Client Impact
              </div>
              <h3 className="font-space font-medium text-2xl sm:text-3xl md:text-4xl leading-tight text-white">
                {pillar.caseStudy.headline}
              </h3>
              {pillar.caseStudy.quote && (
                <p className="font-inter italic text-zinc-300 text-sm sm:text-base border-l-2 border-[#98ff03] pl-4 py-1">
                  &ldquo;{pillar.caseStudy.quote}&rdquo;
                </p>
              )}
              <div className="text-xs font-space text-zinc-400">
                Client: {pillar.caseStudy.client} · {pillar.caseStudy.industry}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 bg-white/5 border border-white/10 p-6 rounded-[4px]">
              <div className="font-space text-xs font-semibold uppercase tracking-wider text-[#98ff03] mb-2">
                Audited Results
              </div>
              {pillar.caseStudy.impactMetrics.map((m, mIdx) => (
                <div key={mIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-[#98ff03] shrink-0 mt-0.5" />
                  <span className="font-inter text-sm text-zinc-200">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 8. PRODUCTION TECH STACK */}
        {/* =================================================================== */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2">
            <div className="size-2 bg-[#98ff03]" />
            <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
              ENGINEERING TOOLCHAIN
            </span>
          </div>
          <h2 className="font-space font-medium text-2xl sm:text-3xl text-[#292c2e] dark:text-white tracking-tight">
            Production Technologies & Frameworks
          </h2>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {pillar.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="font-space text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-[3px] bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.35)] dark:border-white/10 text-[#292c2e] dark:text-zinc-200 hover:border-[#98ff03] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 9. DELIVERY LIFECYCLE (4 PHASES) */}
        {/* =================================================================== */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="size-2 bg-[#98ff03]" />
              <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
                HOW WE DELIVER
              </span>
            </div>
            <h2 className="font-space font-medium text-2xl sm:text-3xl md:text-4xl text-[#292c2e] dark:text-white tracking-tight">
              4-Stage Enterprise Delivery Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillar.lifecycle.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 p-6 rounded-[4px] relative"
              >
                <div className="font-space font-bold text-2xl text-[#98ff03] mb-2">
                  {item.step}
                </div>
                <h3 className="font-space font-semibold text-base text-[#292c2e] dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 10. TECHNICAL FAQ ACCORDION */}
        {/* =================================================================== */}
        {pillar.faqs && pillar.faqs.length > 0 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="size-2 bg-[#98ff03]" />
                <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>
              <h2 className="font-space font-medium text-2xl sm:text-3xl md:text-4xl text-[#292c2e] dark:text-white tracking-tight">
                Technical & Engagement Questions
              </h2>
            </div>

            <div className="space-y-3">
              {pillar.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] rounded-[4px] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-space font-medium text-base sm:text-lg text-[#292c2e] dark:text-white cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`size-5 text-[#98ff03] transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 md:px-6 font-inter text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 11. CROSS-PILLAR NAVIGATION ("EXPLORE OTHER PILLARS") */}
        {/* =================================================================== */}
        <div className="space-y-6 pt-6 border-t border-[rgba(174,174,174,0.3)] dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <div className="size-2 bg-[#98ff03]" />
                <span className="font-space text-xs uppercase tracking-widest text-[#292c2e] dark:text-[#98ff03] font-semibold">
                  DISCOVER MORE PILLARS
                </span>
              </div>
              <h2 className="font-space font-medium text-2xl sm:text-3xl text-[#292c2e] dark:text-white tracking-tight">
                Explore The Complete Matii Platform
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1.5 font-space text-xs uppercase tracking-wider text-[#292c2e] dark:text-white hover:text-[#98ff03] dark:hover:text-[#98ff03] transition-colors"
            >
              <span>View Overview</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPillars.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="group relative bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 p-6 rounded-[4px] hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-space text-xs font-semibold text-zinc-400">
                      PILLAR {other.index}
                    </span>
                    <div className="p-1.5 rounded-[2px] bg-zinc-100 dark:bg-white/10">
                      {PILLAR_ICONS[other.id]}
                    </div>
                  </div>
                  <h3 className="font-space font-semibold text-lg text-[#292c2e] dark:text-white group-hover:text-[#98ff03] transition-colors mb-2">
                    {other.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {other.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between font-space text-xs uppercase font-semibold text-[#292c2e] dark:text-zinc-300 group-hover:text-black dark:group-hover:text-[#98ff03]">
                  <span>Explore Pillar →</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 12. BOTTOM FRAMED CTA BANNER */}
        {/* =================================================================== */}
        <div className="relative bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.35)] dark:border-white/10 p-8 sm:p-12 md:p-16 text-center space-y-6">
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px]" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px]" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px]" />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#292c2e] dark:bg-white/10 rounded-[2px] text-white text-xs font-space uppercase">
            <span className="size-2 rounded-full bg-[#98ff03]" />
            Enterprise Engagement Ready
          </div>

          <h2 className="font-space font-medium text-3xl sm:text-4xl md:text-5xl text-[#292c2e] dark:text-white max-w-2xl mx-auto leading-tight">
            Ready to Deploy {pillar.shortTitle} for Your Organization?
          </h2>

          <p className="font-inter text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Connect directly with our principal architects. We review your requirements, benchmark performance targets, and provide a comprehensive architecture blueprint.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              target="_blank"
              href="https://calendly.com/Matiidigitals/30min"
              className="font-inter text-sm md:text-base font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] dark:bg-[#98ff03] dark:text-[#161819] dark:hover:bg-[#86e200] px-7 py-3.5 rounded-[4px] inline-flex items-center gap-2.5 shadow-sm transition-all group"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="font-inter text-sm md:text-base font-medium text-[#292c2e] dark:text-zinc-200 hover:text-black dark:hover:text-white px-7 py-3.5 rounded-[4px] border border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 transition-all inline-flex items-center gap-2"
            >
              <span>Send Inquiries</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
