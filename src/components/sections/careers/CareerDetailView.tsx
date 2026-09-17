"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  Send,
  UploadCloud,
  FileText,
  Loader2,
  AlertCircle,
  Globe,
  Briefcase,
  Check,
  X,
} from "lucide-react";
import { normalizeToHtml, sanitizeContent } from "@/lib/content";
import { submitJobApplicationAction } from "@/lib/actions/career.actions";
import type { FormattedJobPosition } from "@/lib/services/career.service";
import { jobPositions } from "@/data/careers-data";

interface CareerDetailViewProps {
  job?: FormattedJobPosition;
  slug?: string;
}

export function CareerDetailView({ job: propJob, slug }: CareerDetailViewProps) {
  // Find job from prop or fallback
  const fallbackJob = jobPositions.find((j) => j.slug === slug) || jobPositions[0];

  const job = propJob || {
    id: fallbackJob.id,
    slug: fallbackJob.slug,
    title: fallbackJob.title,
    department: fallbackJob.department,
    location: fallbackJob.location,
    type: fallbackJob.type,
    experience: fallbackJob.experience,
    salary: fallbackJob.salary,
    shortDescription: fallbackJob.shortDescription,
    content: `<h2>About the Role</h2><p>${fallbackJob.aboutRole}</p><h3>Responsibilities</h3><ul>${fallbackJob.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul><h3>Requirements</h3><ul>${fallbackJob.requirements.map((r) => `<li>${r}</li>`).join("")}</ul><h3>Benefits</h3><ul>${fallbackJob.benefits.map((b) => `<li>${b}</li>`).join("")}</ul>`,
    order: 1,
    isActive: true,
    isFeatured: false,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    coverNote: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setErrorMsg(null);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "Matii_resumes");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setFormData((prev) => ({ ...prev, resumeUrl: json.url }));
        setResumeFileName(file.name);
      } else {
        setErrorMsg(json.error || "Failed to upload resume. You can also paste a link below.");
      }
    } catch (err: any) {
      console.error("Resume upload error:", err);
      setErrorMsg("Network error uploading file. You can paste a link below.");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setErrorMsg("Full Name and Email Address are required.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await submitJobApplicationAction({
        jobId: job.id,
        jobTitle: job.title,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        resumeUrl: formData.resumeUrl || undefined,
        portfolioUrl: formData.portfolioUrl || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
        coverNote: formData.coverNote || undefined,
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setFormSubmitted(true);
      }
    } catch (err: any) {
      console.error("Application submission failed:", err);
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Normalize rich text content to semantic HTML and sanitize
  const normalizedHtml = normalizeToHtml(job.content || "");
  const sanitizedHtml = sanitizeContent(normalizedHtml);

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 overflow-hidden">
      <div className="max-w-345 mx-auto relative text-[#292c2e] dark:text-zinc-100">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#98ff03] transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to All Careers</span>
          </Link>
        </div>

        {/* Section Header Tag */}
        <div className="mb-6">
          <div className="inline-flex gap-2.5 items-center bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 px-2.5 py-1">
            <div className="bg-[#98ff03] size-3 shrink-0" />
            <span className="font-space font-normal text-xs md:text-sm text-black dark:text-white uppercase tracking-wider whitespace-nowrap">
              CAREERS // {job.department.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Hero Title & Teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 md:mb-14">
          <div className="lg:col-span-8">
            <h1 className="font-space font-bold text-3xl sm:text-5xl md:text-[54px] leading-[1.15] text-[#292c2e] dark:text-white tracking-tight">
              {job.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="font-inter text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {job.shortDescription}
            </p>
          </div>
        </div>

        {/* METADATA BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 mb-12">
          <div className="flex flex-col gap-1">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Department
            </span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e] dark:text-white">
              {job.department}
            </span>
          </div>
          <div className="flex flex-col gap-1 md:border-l md:border-zinc-200 dark:md:border-white/10 md:pl-6">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Location
            </span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e] dark:text-white">
              {job.location}
            </span>
          </div>
          <div className="flex flex-col gap-1 md:border-l md:border-zinc-200 dark:md:border-white/10 md:pl-6">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Experience
            </span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e] dark:text-white">
              {job.experience}
            </span>
          </div>
          <div className="flex flex-col gap-1 md:border-l md:border-zinc-200 dark:md:border-white/10 md:pl-6">
            <span className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Type / Comp
            </span>
            <span className="font-space font-bold text-base md:text-lg text-[#292c2e] dark:text-white">
              {job.type} • {job.salary}
            </span>
          </div>
        </div>

        {/* 2-COLUMN CONTENT & APPLICATION FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Rich Text Content */}
          <div className="lg:col-span-7 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 p-6 md:p-10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />

            {/* Semantic Rich Text Rendering */}
            <div
              className="Matii-prose prose prose-zinc dark:prose-invert max-w-none prose-headings:font-space prose-headings:uppercase prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-6 prose-h3:mt-5 prose-p:font-inter prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-li:font-inter prose-li:text-zinc-700 dark:prose-li:text-zinc-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-5 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 md:p-8 relative shadow-lg sticky top-24">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />

            <div className="mb-6">
              <h3 className="font-space font-bold text-2xl text-[#292c2e] dark:text-white uppercase mb-1">
                Apply for this Position
              </h3>
              <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Submit your profile and our technical team will review your application within 48 hours.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-[2px] text-xs font-inter text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {formSubmitted ? (
              <div className="bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-8 text-center space-y-4">
                <div className="size-12 bg-[#98ff03] text-[#292c2e] rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="size-7" />
                </div>
                <h4 className="font-space font-bold text-xl text-[#292c2e] dark:text-white uppercase">
                  Application Received!
                </h4>
                <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Thank you for applying for{" "}
                  <span className="font-bold text-black dark:text-white">{job.title}</span>.
                  Your application has been logged into our talent pipeline.
                </p>
                <div className="pt-2">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 font-space text-xs font-semibold uppercase tracking-wider text-[#292c2e] dark:text-[#98ff03] hover:underline"
                  >
                    <span>Browse other open roles</span>
                    <ArrowLeft className="size-3 rotate-180" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-sm text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-sm text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+251 9..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-sm text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>
                </div>

                {/* Resume Upload & Link */}
                <div className="space-y-2">
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 font-semibold">
                    Resume / CV (Upload or Link)
                  </label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                  />

                  {resumeFileName ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-[2px] text-xs font-inter text-emerald-800 dark:text-emerald-300">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="size-4 shrink-0 text-emerald-600" />
                        <span className="truncate">{resumeFileName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResumeFileName(null);
                          setFormData({ ...formData, resumeUrl: "" });
                        }}
                        className="text-zinc-400 hover:text-red-500 p-1"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={uploadingResume}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 px-4 border border-dashed border-zinc-300 dark:border-white/20 bg-[#f8f9fa] dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-space flex items-center justify-center gap-2 rounded-[2px] transition-colors cursor-pointer"
                    >
                      {uploadingResume ? (
                        <>
                          <Loader2 className="size-4 animate-spin text-zinc-600 dark:text-zinc-400" />
                          <span>Uploading Resume...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="size-4 text-[#98ff03]" />
                          <span>Upload PDF or Document</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Optional Resume / Drive URL */}
                  <input
                    type="url"
                    placeholder="Or paste Google Drive / Dropbox link..."
                    value={formData.resumeUrl}
                    onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1 font-semibold">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1 font-semibold">
                      Portfolio / GitHub
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1 font-semibold">
                    Cover Note / Elevator Pitch
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly tell us why you are excited to join Matii Digitals and what you bring to the table..."
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-sm text-[#292c2e] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-[#161819] py-3.5 px-6 font-space font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <div className="bg-[#98ff03] dark:bg-[#161819] p-1 text-[#292c2e] dark:text-[#98ff03] transition-transform group-hover:translate-x-0.5">
                        <Send className="size-3.5" />
                      </div>
                    </>
                  )}
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
