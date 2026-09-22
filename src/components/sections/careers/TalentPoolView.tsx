"use client";

import React, { useState, useRef } from "react";
import { Link } from "@/i18n/routing";
import PageHeader from "@/components/common/PageHeader";
import {
  TbTerminal2,
  TbServerBolt,
  TbBrain,
  TbGauge,
  TbShieldCode,
  TbPalette,
  TbBriefcase,
  TbNetwork,
  TbUserCode,
  TbRadar,
  TbArrowsShuffle,
  TbShieldLock,
  TbCircleCheck,
  TbSend,
  TbUpload,
  TbFileText,
  TbLoader2,
  TbAlertCircle,
} from "react-icons/tb";
import { submitJobApplicationAction } from "@/lib/actions/career.actions";

const DISCIPLINES = [
  { id: "fullstack", label: "Fullstack Engineering", icon: TbTerminal2 },
  { id: "backend", label: "Backend & Distributed Systems", icon: TbServerBolt },
  { id: "ai-ml", label: "AI & Machine Learning", icon: TbBrain },
  { id: "frontend", label: "Frontend & Performance", icon: TbGauge },
  { id: "devops", label: "Cloud & DevSecOps", icon: TbShieldCode },
  { id: "design", label: "UI/UX & Design Systems", icon: TbPalette },
  { id: "product", label: "Technical Product Management", icon: TbBriefcase },
  { id: "other", label: "Specialized / Advisory", icon: TbNetwork },
];

const SENIORITY_LEVELS = [
  "Junior (1-2 yrs)",
  "Mid-Level (3-5 yrs)",
  "Senior (5-8 yrs)",
  "Staff / Principal (8+ yrs)",
  "Engineering Leadership",
];

const ENGAGEMENT_TYPES = [
  "Full-Time Role",
  "Contract / Freelance",
  "Part-Time Advisory",
  "Open to Either",
];

const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within 2 Weeks",
  "Within 1 Month",
  "Just Exploring / Passive",
];

export function TalentPoolView() {
  const [discipline, setDiscipline] = useState("fullstack");
  const [seniority, setSeniority] = useState("Senior (5-8 yrs)");
  const [engagement, setEngagement] = useState("Full-Time Role");
  const [availability, setAvailability] = useState("Immediately");

  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    portfolioUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    skillsHighlight: "",
    bioMessage: "",
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
        setErrorMsg(json.error || "Failed to upload file. You can also paste a cloud document URL below.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg("Network error uploading resume. You can paste a link below.");
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
      const selectedDisciplineLabel = DISCIPLINES.find((d) => d.id === discipline)?.label || discipline;
      const combinedNote = [
        `PRIMARY DISCIPLINE: ${selectedDisciplineLabel}`,
        `SENIORITY LEVEL: ${seniority}`,
        `DESIRED ENGAGEMENT: ${engagement}`,
        `AVAILABILITY: ${availability}`,
        formData.location ? `LOCATION / TIMEZONE: ${formData.location}` : "",
        formData.skillsHighlight ? `KEY TECHNOLOGIES & EXPERTISE:\n${formData.skillsHighlight}` : "",
        formData.bioMessage ? `PROFILE SUMMARY:\n${formData.bioMessage}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await submitJobApplicationAction({
        jobTitle: `Talent Pool - ${selectedDisciplineLabel} (${seniority})`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        resumeUrl: formData.resumeUrl || undefined,
        portfolioUrl: formData.portfolioUrl || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
        coverNote: combinedNote,
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error("Talent pool submission failed:", err);
      setErrorMsg("Submission failed. Please try again or reach out to talent@Matiidigitals.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 space-y-16">
      <div className="max-w-345 mx-auto space-y-16">
        {/* Page Header */}
        <PageHeader
          tag="PRIORITY TALENT NETWORK"
          title={
            <>
              Shape What Comes Next.
              <br />
              Join The Talent Pool.
            </>
          }
          description="Don't see an open position that fits your exact profile today? Join our priority talent network. We hire dynamically as high-impact client projects, dedicated pods, and architectural sprints scale."
        />

        {/* Why Join Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-8 rounded-[2px] bg-[#292c2e] dark:bg-[#98ff03] text-[#98ff03] dark:text-black flex items-center justify-center mb-4">
              <TbUserCode className="size-4" strokeWidth={1.8} />
            </div>
            <h3 className="font-space font-bold text-base text-zinc-900 dark:text-white uppercase mb-2">
              Direct Architect Review
            </h3>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              No automated keyword parsing bots. Your portfolio and code samples are reviewed directly by practicing engineers.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-8 rounded-[2px] bg-[#292c2e] dark:bg-[#98ff03] text-[#98ff03] dark:text-black flex items-center justify-center mb-4">
              <TbRadar className="size-4" strokeWidth={1.8} />
            </div>
            <h3 className="font-space font-bold text-base text-zinc-900 dark:text-white uppercase mb-2">
              First Project Access
            </h3>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              When new high-scale projects kick off, we tap our verified talent pool members before public job listings go live.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-8 rounded-[2px] bg-[#292c2e] dark:bg-[#98ff03] text-[#98ff03] dark:text-black flex items-center justify-center mb-4">
              <TbArrowsShuffle className="size-4" strokeWidth={1.8} />
            </div>
            <h3 className="font-space font-bold text-base text-zinc-900 dark:text-white uppercase mb-2">
              Flexible Engagements
            </h3>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose between full-time career roles, fractional sprint contracts, or technical advisory pods tailored to your life.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="size-8 rounded-[2px] bg-[#292c2e] dark:bg-[#98ff03] text-[#98ff03] dark:text-black flex items-center justify-center mb-4">
              <TbShieldLock className="size-4" strokeWidth={1.8} />
            </div>
            <h3 className="font-space font-bold text-base text-zinc-900 dark:text-white uppercase mb-2">
              Strictly Confidential
            </h3>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We respect your current professional commitments. Your profile is handled with complete discretion.
            </p>
          </div>
        </div>

        {/* Talent Application Form */}
        <div className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-6 sm:p-10 relative">
          <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
          <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />
          <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 left-0" />
          <div className="size-2 bg-[#292c2e] dark:bg-white absolute bottom-0 right-0" />

          {formSubmitted ? (
            <div className="text-center py-12 space-y-4 max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="size-14 mx-auto rounded-full bg-[#98ff03]/25 flex items-center justify-center text-[#292c2e] dark:text-[#98ff03]">
                <TbCircleCheck className="size-8 text-emerald-600 dark:text-[#98ff03]" strokeWidth={2} />
              </div>
              <h3 className="font-space font-bold text-2xl text-zinc-900 dark:text-white uppercase tracking-tight">
                Welcome To The Talent Pool!
              </h3>
              <p className="font-inter text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your profile has been registered directly with the Matii engineering leadership. We will reach out when a project or role matching your technical strengths and availability opens.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      location: "",
                      portfolioUrl: "",
                      linkedinUrl: "",
                      resumeUrl: "",
                      skillsHighlight: "",
                      bioMessage: "",
                    });
                    setResumeFileName(null);
                  }}
                  className="px-5 py-2.5 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-800 dark:text-white font-space text-xs uppercase font-semibold rounded-[2px] active:scale-[0.96] transition-transform"
                >
                  Submit Another Profile
                </button>
                <Link
                  href="/careers"
                  className="px-5 py-2.5 bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black font-space text-xs uppercase font-semibold rounded-[2px] active:scale-[0.96] transition-transform"
                >
                  Explore Current Roles
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-space font-bold uppercase text-[#292c2e] dark:text-[#98ff03] mb-1">
                  <TbNetwork className="size-4" strokeWidth={2} />
                  <span>Talent Pool Registration</span>
                </div>
                <h3 className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  Join Our Global Craft Network
                </h3>
                <p className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Tell us about your technical depth, favorite tools, and ideal engagement terms.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-[2px] flex items-center gap-3 text-red-700 dark:text-red-300 text-xs font-inter">
                  <TbAlertCircle className="size-4 shrink-0" strokeWidth={2} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Primary Discipline Selection */}
              <div className="space-y-2">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                  Primary Discipline / Specialty *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {DISCIPLINES.map((item) => {
                    const isSelected = discipline === item.id;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDiscipline(item.id)}
                        className={`p-3 rounded-[2px] border text-left flex flex-col gap-1.5 transition-all cursor-pointer active:scale-[0.96] ${
                          isSelected
                            ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-black border-[#292c2e] dark:border-[#98ff03] shadow-xs"
                            : "bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/20"
                        }`}
                      >
                        <IconComp className="size-4 shrink-0" strokeWidth={1.8} />
                        <span className="font-space font-semibold text-xs leading-tight">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Seniority & Engagement Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Experience Level
                  </label>
                  <select
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  >
                    {SENIORITY_LEVELS.map((s) => (
                      <option key={s} value={s} className="dark:bg-[#161819]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Desired Engagement
                  </label>
                  <select
                    value={engagement}
                    onChange={(e) => setEngagement(e.target.value)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  >
                    {ENGAGEMENT_TYPES.map((t) => (
                      <option key={t} value={t} className="dark:bg-[#161819]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  >
                    {AVAILABILITY_OPTIONS.map((a) => (
                      <option key={a} value={a} className="dark:bg-[#161819]">
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Tesfaye"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Phone / Telegram (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+251 92 345 6789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>
              </div>

              {/* 4. Location & Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Location &amp; Timezone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Addis Ababa / GMT+3"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    GitHub / Portfolio URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>
              </div>

              {/* 5. Resume Upload / URL */}
              <div className="space-y-2 p-5 bg-zinc-50/70 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2px]">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                  Resume / Portfolio Document
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingResume}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#161819] border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white text-xs font-space font-semibold uppercase rounded-[2px] transition-all cursor-pointer disabled:opacity-50 active:scale-[0.96]"
                  >
                    {uploadingResume ? (
                      <TbLoader2 className="size-4 animate-spin text-[#292c2e] dark:text-[#98ff03]" strokeWidth={2} />
                    ) : (
                      <TbUpload className="size-4 text-[#292c2e] dark:text-[#98ff03]" strokeWidth={2} />
                    )}
                    <span>{uploadingResume ? "Uploading Document..." : "Upload Resume"}</span>
                  </button>

                  <span className="text-xs text-zinc-400 font-inter">or paste a cloud document link:</span>
                </div>

                {resumeFileName && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300 rounded-[2px]">
                    <TbFileText className="size-3.5" strokeWidth={2} />
                    <span>{resumeFileName}</span>
                  </div>
                )}

                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                />
              </div>

              {/* 6. Skills Highlight */}
              <div className="space-y-1.5">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                  Core Technologies &amp; Architecture Strengths
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Next.js, Distributed Systems, Go, Kubernetes, RAG with Vector DBs, High-throughput Postgres optimization"
                  value={formData.skillsHighlight}
                  onChange={(e) => setFormData({ ...formData, skillsHighlight: e.target.value })}
                  className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 p-3.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                />
              </div>

              {/* 7. Summary Note */}
              <div className="space-y-1.5">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                  Ideal Next Project / Message to Team (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any specific domains (e.g. fintech, AI, healthtech) or challenges that excite you most..."
                  value={formData.bioMessage}
                  onChange={(e) => setFormData({ ...formData, bioMessage: e.target.value })}
                  className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 p-3.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-100 dark:border-white/10">
                <p className="font-inter text-xs text-zinc-400">
                  Submissions are reviewed weekly by practicing technical partners.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-lime-400 text-white dark:text-black font-space text-xs uppercase font-bold tracking-wider rounded-[2px] active:scale-[0.96] shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <TbLoader2 className="size-4 animate-spin" strokeWidth={2} />
                      <span>Registering Profile...</span>
                    </>
                  ) : (
                    <>
                      <TbSend className="size-4" strokeWidth={2} />
                      <span>Join Talent Pool</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TalentPoolView;
