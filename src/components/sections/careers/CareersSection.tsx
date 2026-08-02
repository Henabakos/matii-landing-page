"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
} from "lucide-react";
import { jobPositions } from "@/data/careers-data";

export function CareersSection() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Engineering", "AI & Data", "Design"];

  const filteredJobs =
    selectedDepartment === "All"
      ? jobPositions
      : jobPositions.filter((job) => job.department === selectedDepartment);

  return (
    <section className="relative w-full pt-12 md:pt-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-345 mx-auto relative">
        {/* Decorative Shape */}
        <div className="hidden md:block absolute top-0 right-0 w-32 h-26 lg:w-56 lg:h-48 pointer-events-none">
          <Image
            src="/shapes/project-shape.svg"
            alt="hero-shape"
            className="object-contain"
            fill
          />
        </div>

        {/* Section Header Tag */}
        <div className="mb-6">
          <div className="inline-flex gap-2.5 items-center bg-white px-2.5 py-1">
            <div className="bg-[#98ff03] size-4 shrink-0" />
            <span className="font-space font-normal text-base md:text-lg text-black uppercase tracking-wider whitespace-nowrap">
              CAREERS & OPEN ROLES
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <h1 className="font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black tracking-tight uppercase">
              BUILD THE FUTURE OF DIGITAL PRODUCTS &amp; AI WITH US.
            </h1>
          </div>
        </div>

        {/* Perks / Culture Banner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="border border-zinc-200 bg-white p-6 relative">
            <div className="size-2 bg-[#292c2e] absolute top-0 left-0" />
            <h3 className="font-space font-bold text-lg text-[#292c2e] uppercase mb-2">
              Senior Culture
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Work alongside senior craftspeople with high autonomy and no
              bureaucracy.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-6 relative">
            <div className="size-2 bg-[#292c2e] absolute top-0 left-0" />
            <h3 className="font-space font-bold text-lg text-[#292c2e] uppercase mb-2">
              Flexible &amp; Remote
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Remote-first or hybrid options in Addis Ababa with flexible
              working hours.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-6 relative">
            <div className="size-2 bg-[#292c2e] absolute top-0 left-0" />
            <h3 className="font-space font-bold text-lg text-[#292c2e] uppercase mb-2">
              Continuous Growth
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Annual budgets for learning, conferences, cutting-edge AI
              subscriptions, and top hardware.
            </p>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {departments.map((dept) => {
            const isActive = selectedDepartment === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDepartment(dept)}
                className={`font-space text-xs md:text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#292c2e] text-white shadow-md border border-[#292c2e]"
                    : "bg-[#f3f4f6] text-[#292c2e] hover:bg-zinc-200 border border-transparent"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Open Positions List */}
        <div className="flex flex-col gap-6 mb-16">
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.slug}`}
              className="group relative border border-zinc-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#98ff03] transition-all block"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#f3f4f6] border border-zinc-200 text-[#292c2e] font-space font-semibold text-xs px-2.5 py-1 uppercase">
                    {job.department}
                  </span>
                  <span className="text-zinc-400 text-xs font-mono">
                    • {job.type}
                  </span>
                </div>

                <h3 className="font-space font-bold text-xl sm:text-2xl text-[#292c2e] group-hover:text-black transition-colors">
                  {job.title}
                </h3>

                <p className="font-inter text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {job.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-inter text-zinc-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#292c2e]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#292c2e]" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="size-3.5 text-[#292c2e]" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-space font-bold text-[#292c2e] uppercase group-hover:text-black">
                <span>View Role</span>
                <div className="bg-[#98ff03] p-1.5 text-[#292c2e] transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareersSection;
