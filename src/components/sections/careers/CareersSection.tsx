"use client";

import ContentEmptyState from "@/components/common/ContentEmptyState";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import PageHeader from "@/components/common/PageHeader";
import {
  MapPin,
  Briefcase,
  DollarSign,
} from "lucide-react";
import {
  TbUserCode,
  TbWorldLongitude,
  TbCpu,
  TbSchool,
  TbRadar,
  TbArrowUpRight,
} from "react-icons/tb";

import type { FormattedJobPosition } from "@/lib/services/career.service";

import { useTranslations } from "next-intl";

interface CareersSectionProps {
  initialJobs?: FormattedJobPosition[];
}

export function CareersSection({ initialJobs }: CareersSectionProps) {
  const t = useTranslations("pages.careers");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const displayJobs = initialJobs ?? [];

  // Dynamically extract unique departments from active jobs
  const departments = [
    "All",
    ...Array.from(new Set(displayJobs.map((job) => job.department))).filter(Boolean),
  ];

  const filteredJobs =
    selectedDepartment === "All"
      ? displayJobs
      : displayJobs.filter((job) => job.department === selectedDepartment);

  return (
    <section className="relative w-full pt-8 md:pt-12 px-4 md:px-8 overflow-hidden">
      <div className="max-w-345 mx-auto relative space-y-12">
        <PageHeader
          tag={t("tag")}
          title={t("title")}
          description={t("description")}
        />

        {/* Perks / Culture Banner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <TbUserCode className="size-5 text-[#292c2e] dark:text-[#98ff03] mb-3" strokeWidth={1.8} />
            <h3 className="font-space font-bold text-lg text-[#292c2e] dark:text-white uppercase mb-2">
              Senior Culture
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Work alongside senior craftspeople with high autonomy and no
              bureaucracy.
            </p>
          </div>

          <div className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <TbWorldLongitude className="size-5 text-[#292c2e] dark:text-[#98ff03] mb-3" strokeWidth={1.8} />
            <h3 className="font-space font-bold text-lg text-[#292c2e] dark:text-white uppercase mb-2">
              Flexible &amp; Remote
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Remote-first or hybrid options in Addis Ababa with flexible
              working hours.
            </p>
          </div>

          <div className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <TbCpu className="size-5 text-[#292c2e] dark:text-[#98ff03] mb-3" strokeWidth={1.8} />
            <h3 className="font-space font-bold text-lg text-[#292c2e] dark:text-white uppercase mb-2">
              Continuous Growth
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Annual budgets for learning, conferences, cutting-edge AI
              subscriptions, and top hardware.
            </p>
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {departments.map((dept) => {
            const isActive = selectedDepartment === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDepartment(dept)}
                className={`font-space text-xs md:text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-none transition-all duration-300 cursor-pointer active:scale-[0.96] ${
                  isActive
                    ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-[#161819] shadow-md border border-[#292c2e] dark:border-[#98ff03]"
                    : "bg-[#f3f4f6] dark:bg-white/5 text-[#292c2e] dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200/80 dark:border-white/10"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4">
          {!filteredJobs.length && <>
            <ContentEmptyState kind="careers" />
            {selectedDepartment !== "All" && <button type="button" onClick={() => setSelectedDepartment("All")} className="min-h-11 border border-zinc-200 px-5 py-3 text-sm dark:border-white/15">Show all roles</button>}
          </>}
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.slug}`}
              className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#292c2e] dark:hover:border-[#98ff03] transition-colors relative group block cursor-pointer"
            >
              <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
              <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />
              <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 left-0" />
              <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 right-0" />

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-space text-xs font-semibold text-[#292c2e] dark:text-[#98ff03] uppercase tracking-wider">
                    {job.department}
                  </span>
                  <span className="size-1 rounded-full bg-zinc-300 dark:bg-white/20" />
                  <span className="font-inter text-xs text-zinc-500 dark:text-zinc-400">
                    {job.type}
                  </span>
                </div>
                <h3 className="font-space font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                  {job.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  {job.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-inter text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="size-3.5" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-space font-bold text-[#292c2e] dark:text-white uppercase group-hover:text-black dark:group-hover:text-[#98ff03] transition-colors">
                <span>View Role</span>
                <div className="bg-[#98ff03] p-1.5 text-[#292c2e] transition-transform group-hover:translate-x-1">
                  <TbArrowUpRight className="size-4" strokeWidth={2} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Alternate Career Pathways: Internships & Talent Pool */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-8">
          {/* 1. Internships Card */}
          <div className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-8 sm:p-10 relative flex flex-col justify-between group hover:border-[#292c2e] dark:hover:border-[#98ff03] transition-all">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 left-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 right-0" />

            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-space font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                <TbSchool className="size-4 text-[#292c2e] dark:text-[#98ff03]" strokeWidth={2} />
                <span>Early Career &amp; Fellowships</span>
              </div>
              <h3 className="font-space font-bold text-2xl text-zinc-900 dark:text-white uppercase tracking-tight">
                Matii Fellowship Program
              </h3>
              <p className="font-inter text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Looking for an internship? Join our paid 3-to-6 month fellowship across AI Labs, Fullstack Systems, UI/UX Design, or Cloud SRE. Build production client software with 1-on-1 staff architect mentorship.
              </p>
            </div>

            <Link
              href="/careers/internships"
              className="inline-flex items-center justify-between gap-3 px-5 py-3 bg-[#292c2e] hover:bg-black dark:bg-white/10 dark:hover:bg-[#98ff03] text-white dark:hover:text-black font-space text-xs font-bold uppercase tracking-wider rounded-[2px] active:scale-[0.96] transition-all w-fit group"
            >
              <span>Explore Internships &amp; Fellowships</span>
              <TbArrowUpRight className="size-4 text-[#98ff03] dark:group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
          </div>

          {/* 2. Talent Pool Card */}
          <div className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-8 sm:p-10 relative flex flex-col justify-between group hover:border-[#292c2e] dark:hover:border-[#98ff03] transition-all">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 left-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 right-0" />

            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-space font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                <TbRadar className="size-4 text-[#292c2e] dark:text-[#98ff03]" strokeWidth={2} />
                <span>Priority Talent Network</span>
              </div>
              <h3 className="font-space font-bold text-2xl text-zinc-900 dark:text-white uppercase tracking-tight">
                Join Our Global Talent Pool
              </h3>
              <p className="font-inter text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Don&apos;t see your exact role today? Register in our global talent pool. When new client initiatives, full-time roles, or specialized contract pods open, we contact talent pool members first.
              </p>
            </div>

            <Link
              href="/careers/talent-pool"
              className="inline-flex items-center justify-between gap-3 px-5 py-3 bg-[#292c2e] hover:bg-black dark:bg-white/10 dark:hover:bg-[#98ff03] text-white dark:hover:text-black font-space text-xs font-bold uppercase tracking-wider rounded-[2px] active:scale-[0.96] transition-all w-fit group"
            >
              <span>Join Global Talent Pool</span>
              <TbArrowUpRight className="size-4 text-[#98ff03] dark:group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersSection;
