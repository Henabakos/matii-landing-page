"use client";

import React from "react";
import { ArrowRight, Layers, Trophy, Heart, Globe, Clock } from "lucide-react";
import SectionTag from "@/components/common/SectionTag";

interface AboutHeroProps {
  onNavigateToTools?: () => void;
}

export function AboutHero({ onNavigateToTools }: AboutHeroProps) {
  const stats = [
    { label: "Projects Delivered", value: "140+", icon: Trophy },
    { label: "Happy Clients", value: "98%", icon: Heart },
    { label: "Countries Served", value: "18+", icon: Globe },
    { label: "Years Experience", value: "8+", icon: Clock },
  ];

  return (
    <section className="relative w-full bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.4)] py-8 md:py-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#98ff03]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bg-[#292c2e] size-1.5 bottom-0 right-0 z-10" />
      <div className="absolute bg-[#292c2e] size-1.5 bottom-0 left-0 z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 p-8 md:p-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          {/* Top Badge */}
          <SectionTag title="ABOUT OUR COMPANY" />

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-medium tracking-tight text-[#292c2e] dark:text-white leading-[1.2]">
            Building scalable software, AI solutions, and digital products that
            help businesses grow.
          </h1>

          {/* Value Prop Intro */}
          <p className="text-base sm:text-lg font-inter text-[#797f8b] dark:text-zinc-400 font-normal leading-relaxed max-w-2xl">
            We are a team of senior engineers and designers dedicated to
            engineering fast, reliable, and intelligent software applications
            for modern startups and enterprises worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#contact-section"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#292c2e] hover:bg-black text-white text-sm font-space uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Schedule a Call</span>
              <ArrowRight className="w-4 h-4 text-[#98ff03]" />
            </a>

            {onNavigateToTools && (
              <button
                onClick={onNavigateToTools}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#f3f4f6] hover:bg-zinc-200 text-[#292c2e] text-sm font-space uppercase tracking-wider border border-[rgba(174,174,174,0.3)] transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#98ff03]" />
                <span>Explore Tech Stack</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Visual Image Card */}
        <div className="lg:col-span-5 relative ">
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(174,174,174,0.3)] shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Tech Studio Workspace"
              className="w-full h-72 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292c2e]/80 via-[#292c2e]/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] uppercase font-space font-bold tracking-wider text-[#98ff03] block">
                  LIVE STUDIO ENVIRONMENT
                </span>
                <span className="text-xs font-inter font-semibold text-[#292c2e] dark:text-white">
                  High-Performance Digital Engineering
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#98ff03] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative mt-12 pt-8 px-8 md:px-12 border-t border-[rgba(174,174,174,0.3)] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="absolute bg-[#292c2e] size-1.5 top-0 right-0 z-10" />
        <div className="absolute bg-[#292c2e] size-1.5 top-0 left-0 z-10" />

        {stats.map((stat, i) => {
          const IconComp = stat.icon;
          return (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <IconComp className="w-4 h-4 text-[#797f8b]" />
                <span className="text-3xl font-space font-bold tracking-tight text-[#292c2e] dark:text-white">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs font-inter font-medium text-[#797f8b]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AboutHero;
