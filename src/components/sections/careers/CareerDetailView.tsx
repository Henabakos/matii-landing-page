"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, Briefcase, Clock, DollarSign, Send } from "lucide-react";
import { jobPositions, JobPosition } from "@/data/careers-data";

interface CareerDetailViewProps {
  slug: string;
}

export function CareerDetailView({ slug }: CareerDetailViewProps) {
  const job: JobPosition | undefined = jobPositions.find(
    (j) => j.slug === slug
  ) || jobPositions[0];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    portfolioUrl: "",
    linkedinUrl: "",
    coverNote: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 overflow-hidden">
      <div className="max-w-345 mx-auto relative text-[#292c2e]">
        
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-space text-xs uppercase tracking-wider text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to All Careers</span>
          </Link>
        </div>

        {/* Section Header Tag */}
        <div className="mb-6">
          <div className="inline-flex gap-2.5 items-center bg-white px-2.5 py-1">
            <div className="bg-[#98ff03] size-4 shrink-0" />
            <span className="font-space font-normal text-base md:text-lg text-black uppercase tracking-wider whitespace-nowrap">
              CAREER // {job.department.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Hero Title & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 md:mb-14">
          <div className="lg:col-span-8">
            <h1 className="font-space font-bold text-3xl sm:text-5xl md:text-[56px] leading-[1.15] text-[#292c2e] tracking-tight">
              {job.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="font-inter text-sm sm:text-base text-zinc-600 leading-relaxed">
              {job.shortDescription}
            </p>
          </div>
        </div>

        {/* METADATA BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-6 bg-white border border-zinc-200 mb-12">
          <div className="flex flex-col gap-1">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 font-semibold">Department</span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e]">{job.department}</span>
          </div>
          <div className="flex flex-col gap-1 md:border-l md:border-zinc-200 md:pl-6">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 font-semibold">Location</span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e]">{job.location}</span>
          </div>
          <div className="flex flex-col gap-1 md:border-l md:border-zinc-200 md:pl-6">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 font-semibold">Experience</span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e]">{job.experience}</span>
          </div>
          <div className="flex flex-col gap-1 md:border-l md:border-zinc-200 md:pl-6">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 font-semibold">Type</span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e]">{job.type}</span>
          </div>
        </div>

        {/* 2-COLUMN CONTENT & APPLICATION FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Job Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* About Role */}
            <div className="space-y-4">
              <h2 className="font-space font-bold text-xl md:text-2xl text-[#292c2e] uppercase">
                About the Role
              </h2>
              <p className="font-inter text-sm md:text-base text-zinc-700 leading-relaxed">
                {job.aboutRole}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="space-y-4 border-t border-zinc-200 pt-8">
              <h2 className="font-space font-bold text-xl md:text-2xl text-[#292c2e] uppercase">
                Responsibilities
              </h2>
              <ul className="space-y-3 font-inter text-sm md:text-base text-zinc-700">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="size-2 bg-[#98ff03] border border-zinc-400/40 shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-4 border-t border-zinc-200 pt-8">
              <h2 className="font-space font-bold text-xl md:text-2xl text-[#292c2e] uppercase">
                Requirements &amp; Qualifications
              </h2>
              <ul className="space-y-3 font-inter text-sm md:text-base text-zinc-700">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="size-2 bg-[#98ff03] border border-zinc-400/40 shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="space-y-4 border-t border-zinc-200 pt-8">
              <h2 className="font-space font-bold text-xl md:text-2xl text-[#292c2e] uppercase">
                What We Offer
              </h2>
              <ul className="space-y-3 font-inter text-sm md:text-base text-zinc-700">
                {job.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="size-2 bg-[#98ff03] border border-zinc-400/40 shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Application Form Box */}
          <div className="lg:col-span-5 border border-zinc-200 bg-white p-6 md:p-8 relative shadow-lg sticky top-24">
            <div className="size-2 bg-[#292c2e] absolute top-0 left-0" />
            <div className="size-2 bg-[#292c2e] absolute top-0 right-0" />

            <h3 className="font-space font-bold text-2xl text-[#292c2e] uppercase mb-2">
              Apply for this Position
            </h3>
            <p className="font-inter text-xs sm:text-sm text-zinc-600 mb-6">
              Submit your details below and our team will get back to you within 48 hours.
            </p>

            {formSubmitted ? (
              <div className="bg-[#f3f4f6] border border-zinc-200 p-6 text-center space-y-3">
                <div className="size-10 bg-[#98ff03] text-[#292c2e] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-6" />
                </div>
                <h4 className="font-space font-bold text-lg text-[#292c2e] uppercase">
                  Application Received!
                </h4>
                <p className="font-inter text-xs sm:text-sm text-zinc-600">
                  Thank you for applying for <span className="font-semibold text-black">{job.title}</span>. We will review your profile and reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] border border-zinc-200 font-inter text-sm text-[#292c2e] focus:outline-none focus:border-[#292c2e]"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 mb-1 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] border border-zinc-200 font-inter text-sm text-[#292c2e] focus:outline-none focus:border-[#292c2e]"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 mb-1 font-semibold">
                    Portfolio / Github URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/janedoe"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] border border-zinc-200 font-inter text-sm text-[#292c2e] focus:outline-none focus:border-[#292c2e]"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 mb-1 font-semibold">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/janedoe"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] border border-zinc-200 font-inter text-sm text-[#292c2e] focus:outline-none focus:border-[#292c2e]"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 mb-1 font-semibold">
                    Cover Note / Intro
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly tell us why you are a great fit..."
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] border border-zinc-200 font-inter text-sm text-[#292c2e] focus:outline-none focus:border-[#292c2e]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#292c2e] hover:bg-black text-white py-3 px-6 font-space font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group transition-all"
                >
                  <span>Submit Application</span>
                  <div className="bg-[#98ff03] p-1 text-[#292c2e] transition-transform group-hover:translate-x-0.5">
                    <Send className="size-3.5" />
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CareerDetailView;
