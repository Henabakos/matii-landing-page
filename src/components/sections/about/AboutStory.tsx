"use client";

import React from "react";
import Image from "next/image";
import { Compass, Target, CheckCircle2, Award, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export function AboutStory() {
  const t = useTranslations("aboutStory");

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-[1380px] mx-auto border border-[#AEAEAE]/40 dark:border-white/10 bg-white dark:bg-[#161819] relative pt-12 md:pt-20 transition-colors duration-200">
        {/* Section Tag Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2.5 items-center bg-white dark:bg-white/5 border border-transparent dark:border-white/10 px-2.5 py-1 transition-colors">
            <div className="bg-[#98ff03] size-4 shrink-0" />
            <span className="font-space font-normal text-base md:text-lg text-black dark:text-white uppercase tracking-wider whitespace-nowrap">
              {t("originTag")}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="lg:col-span-6 font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black dark:text-white tracking-tight max-w-4xl mx-auto text-center mb-12 sm:mb-16 transition-colors">
          {t("originHeading")}
        </h2>

        {/* 2-Column Main Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12 p-6 md:p-8">
          {/* Left Column: Image & Highlight Stats */}
          <div className="lg:col-span-6 flex flex-col justify-between border border-[#AEAEAE]/30 dark:border-white/10 p-6 md:p-8 bg-white dark:bg-white/5 relative transition-colors">
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px] z-10 transition-colors" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px] z-10 transition-colors" />

            <div className="relative w-full h-64 sm:h-80 overflow-hidden mb-6 group border border-[#AEAEAE]/30 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Engineering Team Collaboration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-space uppercase tracking-wider text-white bg-[#292c2e]/90 px-3 py-1.5 border border-white/10">
                  {t("studioBadge")}
                </span>
                <span className="text-xs font-inter font-medium text-[#98ff03]">
                  {t("estYear")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#AEAEAE]/30 dark:border-white/10">
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl md:text-3xl text-[#292c2e] dark:text-white transition-colors">
                  {t("yearsActiveCount")}
                </span>
                <span className="font-inter text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider mt-1">
                  {t("yearsActiveLabel")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl md:text-3xl text-[#292c2e] dark:text-white transition-colors">
                  {t("seniorTeamCount")}
                </span>
                <span className="font-inter text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider mt-1">
                  {t("seniorTeamLabel")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl md:text-3xl text-[#292c2e] dark:text-white transition-colors">
                  {t("productsShippedCount")}
                </span>
                <span className="font-inter text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider mt-1">
                  {t("productsShippedLabel")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Narrative */}
          <div className="lg:col-span-6 border border-[#AEAEAE]/30 dark:border-white/10 p-6 md:p-8 bg-[#fafafa] dark:bg-white/5 flex flex-col justify-between relative transition-colors">
            <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-[3px] -right-[3px] z-10 transition-colors" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-[3px] -right-[3px] z-10 transition-colors" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="font-space text-xs uppercase tracking-widest text-[#797f8b] dark:text-zinc-400">
                  {t("journeyTag")}
                </span>
              </div>

              <h3 className="font-urbanist font-medium text-xl sm:text-2xl text-[#292c2e] dark:text-white leading-snug transition-colors">
                {t("journeyTitle")}
              </h3>

              <div className="space-y-4 font-inter text-sm md:text-base text-[#555] dark:text-zinc-300 leading-relaxed transition-colors">
                <p>
                  {t("storyP1")}
                </p>
                <p>
                  {t("storyP2")}
                </p>
                <p>
                  {t("storyP3")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Twin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Mission Card */}
          <div className="border border-[#AEAEAE]/40 dark:border-white/10 p-8 bg-white dark:bg-white/5 relative flex flex-col justify-between transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10">
                  <Compass className="w-6 h-6 text-[#98ff03]" />
                </div>
                <span className="font-space text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider">
                  {t("missionTag")}
                </span>
              </div>

              <h4 className="font-urbanist font-medium text-xl sm:text-2xl text-[#292c2e] dark:text-white uppercase tracking-tight transition-colors">
                {t("missionTitle")}
              </h4>

              <p className="font-inter text-sm sm:text-base text-[#555] dark:text-zinc-300 leading-relaxed transition-colors">
                {t("missionDesc")}
              </p>

              <div className="pt-4 border-t border-[#AEAEAE]/20 dark:border-white/10 space-y-2">
                <p className="font-inter font-medium text-xs sm:text-sm text-[#292c2e] dark:text-zinc-200 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#98ff03]" /> {t("missionPoint1")}
                </p>
                <p className="font-inter font-medium text-xs sm:text-sm text-[#292c2e] dark:text-zinc-200 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#98ff03]" /> {t("missionPoint2")}
                </p>
                <p className="font-inter font-medium text-xs sm:text-sm text-[#292c2e] dark:text-zinc-200 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#98ff03]" /> {t("missionPoint3")}
                </p>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="border border-[#AEAEAE]/40 dark:border-white/10 p-8 bg-white dark:bg-white/5 relative flex flex-col justify-between transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10">
                  <Target className="w-6 h-6 text-[#98ff03]" />
                </div>
                <span className="font-space text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider">
                  {t("visionTag")}
                </span>
              </div>

              <h4 className="font-urbanist font-medium text-xl sm:text-2xl text-[#292c2e] dark:text-white uppercase tracking-tight transition-colors">
                {t("visionTitle")}
              </h4>

              <p className="font-inter text-sm sm:text-base text-[#555] dark:text-zinc-300 leading-relaxed transition-colors">
                {t("visionDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;

