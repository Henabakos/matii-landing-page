"use client";

import React from "react";
import Image from "next/image";
import { Compass, Target, CheckCircle2, Award, Users, Zap } from "lucide-react";

export function AboutStory() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-[1380px] mx-auto border border-[#AEAEAE]/40 relative pt-12 md:pt-20">
        {/* Section Tag Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2.5 items-center bg-white px-2.5 py-1 ">
            <div className="bg-[#98ff03] size-4 shrink-0" />
            <span className="font-space font-normal text-base md:text-lg text-black uppercase tracking-wider whitespace-nowrap">
              OUR ORIGIN & PURPOSE
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="lg:col-span-6 font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black tracking-tight max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          built on craftsmanship, Transparency, & uncompromising standards.
        </h2>

        {/* 2-Column Main Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          {/* Left Column: Image & Highlight Stats */}
          <div className="lg:col-span-6 flex flex-col justify-between border border-[#AEAEAE]/30 p-6 md:p-8 bg-white relative">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px] z-10" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px] z-10" />

            <div className="relative w-full h-64 sm:h-80 overflow-hidden mb-6 group border border-[#AEAEAE]/30">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Engineering Team Collaboration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-space uppercase tracking-wider text-white bg-[#292c2e]/90 px-3 py-1.5 border border-white/10">
                  Engineering & Design Studio
                </span>
                <span className="text-xs font-inter font-medium text-[#98ff03]">
                  Est. 2018
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#AEAEAE]/30">
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl md:text-3xl text-[#292c2e]">
                  8+
                </span>
                <span className="font-inter text-xs text-[#797F8B] uppercase tracking-wider mt-1">
                  Years Active
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl md:text-3xl text-[#292c2e]">
                  100%
                </span>
                <span className="font-inter text-xs text-[#797F8B] uppercase tracking-wider mt-1">
                  Senior Team
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl md:text-3xl text-[#292c2e]">
                  50+
                </span>
                <span className="font-inter text-xs text-[#797F8B] uppercase tracking-wider mt-1">
                  Products Shipped
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Narrative */}
          <div className="lg:col-span-6 border border-[#AEAEAE]/30 p-6 md:p-8 bg-[#fafafa] flex flex-col justify-between relative">
            <div className="absolute bg-[#292c2e] size-1.5 -top-[3px] -right-[3px] z-10" />
            <div className="absolute bg-[#292c2e] size-1.5 -bottom-[3px] -right-[3px] z-10" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="font-space text-xs uppercase tracking-widest text-[#797f8b]">
                  // THE JOURNEY
                </span>
              </div>

              <h3 className="font-inter font-semibold text-xl sm:text-2xl text-[#292c2e] leading-snug">
                Why we started Motion Digitals.
              </h3>

              <div className="space-y-4 font-inter text-sm md:text-base text-[#555] leading-relaxed">
                <p>
                  We founded Motion Digitals after seeing too many ambitious
                  teams struggle with slow agencies, bloated engineering
                  overhead, and communication disconnects.
                </p>
                <p>
                  We set out to build a streamlined, senior-led engineering
                  studio—one that treats every client project with the focus,
                  transparency, and architectural rigor of an internal product
                  team.
                </p>
                <p>
                  Today, we collaborate with high-growth startups and
                  enterprises globally, shipping custom full-stack web
                  platforms, scalable mobile applications, and intelligent AI
                  automation systems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Twin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="border border-[#AEAEAE]/40 p-8 bg-white relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#292c2e]">
                  <Compass className="w-6 h-6 text-[#98ff03]" />
                </div>
                <span className="font-space text-xs text-[#797F8B] uppercase tracking-wider">
                  01 // PURPOSE
                </span>
              </div>

              <h4 className="font-space font-bold text-xl sm:text-2xl text-[#292c2e] uppercase tracking-tight">
                OUR MISSION
              </h4>

              <p className="font-inter text-sm sm:text-base text-[#555] leading-relaxed">
                To help businesses turn ambitious ideas into reliable,
                high-performing digital products through modern software
                engineering and cutting-edge AI.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="border border-[#AEAEAE]/40 p-8 bg-white relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#292c2e]">
                  <Target className="w-6 h-6 text-[#98ff03]" />
                </div>
                <span className="font-space text-xs text-[#797F8B] uppercase tracking-wider">
                  02 // FUTURE
                </span>
              </div>

              <h4 className="font-space font-bold text-xl sm:text-2xl text-[#292c2e] uppercase tracking-tight">
                OUR VISION
              </h4>

              <p className="font-inter text-sm sm:text-base text-[#555] leading-relaxed">
                To become the most trusted technology engineering partner for
                growth startups and forward-thinking enterprises worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
