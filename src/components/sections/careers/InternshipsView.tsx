"use client";

import React, { useState, useRef } from "react";
import { Link } from "@/i18n/routing";
import PageHeader from "@/components/common/PageHeader";
import {
  TbTerminal2,
  TbBrain,
  TbPalette,
  TbServerBolt,
  TbClockCode,
  TbCurrencyDollar,
  TbUsersGroup,
  TbTargetArrow,
  TbBinaryTree,
  TbSchool,
  TbUpload,
  TbFileText,
  TbSend,
  TbCircleCheck,
  TbAlertCircle,
  TbLoader2,
} from "react-icons/tb";
import { submitJobApplicationAction } from "@/lib/actions/career.actions";

const INTERNSHIP_TRACKS = [
  {
    id: "fullstack",
    title: "Fullstack Systems & Web Architecture",
    icon: TbTerminal2,
    badge: "ENGINEERING",
    duration: "3 - 6 Months",
    desc: "Build mission-critical web platforms, high-throughput APIs, and reactive interfaces using Next.js, TypeScript, Node.js, and PostgreSQL.",
    skills: ["TypeScript", "Next.js", "React 19", "Node.js", "PostgreSQL", "TailwindCSS"],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning Systems",
    icon: TbBrain,
    badge: "AI LABS",
    duration: "3 - 6 Months",
    desc: "Design and implement autonomous LLM workflows, retrieval-augmented generation (RAG), vector database indexes, and custom fine-tuning pipelines.",
    skills: ["Python", "PyTorch", "LangChain", "Vector DBs", "FastAPI", "OpenAI / Anthropic"],
  },
  {
    id: "product-design",
    title: "UI/UX & Design Systems",
    icon: TbPalette,
    badge: "DESIGN",
    duration: "3 - 6 Months",
    desc: "Craft high-craft digital interfaces, interactive prototypes, Swiss typography layouts, and comprehensive multi-brand design systems in Figma.",
    skills: ["Figma", "Design Systems", "Prototyping", "Design-to-Code", "Information Architecture"],
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & SRE",
    icon: TbServerBolt,
    badge: "DEVOPS",
    duration: "3 - 6 Months",
    desc: "Deploy resilient Kubernetes clusters, automate GitOps CI/CD pipelines, optimize observability, and design zero-downtime microservice meshes.",
    skills: ["Docker", "Kubernetes", "AWS / GCP", "Terraform", "GitHub Actions", "Prometheus"],
  },
];

export function InternshipsView() {
  const [selectedTrack, setSelectedTrack] = useState<string>("fullstack");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    portfolioUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    projectHighlight: "",
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
      const activeTrack = INTERNSHIP_TRACKS.find((t) => t.id === selectedTrack)?.title || "General";
      const combinedNote = [
        `TRACK: ${activeTrack}`,
        formData.education ? `EDUCATION/BACKGROUND: ${formData.education}` : "",
        formData.projectHighlight ? `PROJECT HIGHLIGHT:\n${formData.projectHighlight}` : "",
        formData.coverNote ? `MOTIVATION NOTE:\n${formData.coverNote}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await submitJobApplicationAction({
        jobTitle: `Internship Fellowship - ${activeTrack}`,
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
    } catch (err: any) {
      console.error("Internship application failed:", err);
      setErrorMsg("Submission failed. Please try again or reach out to careers@Matiidigitals.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 space-y-16">
      <div className="max-w-345 mx-auto space-y-16">
        {/* Hero Header */}
        <PageHeader
          tag="EARLY CAREER & FELLOWSHIPS"
          title={
            <>
              Launch Your
              <br />
              Engineering Craft.
            </>
          }
          description="A paid, high-velocity 3-to-6 month fellowship for aspiring engineers, researchers, and designers to build production-grade systems alongside principal architects."
        />

        {/* Program Core Metrics / Highlights Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="flex items-center gap-2 mb-2 text-[#292c2e] dark:text-[#98ff03]">
              <TbClockCode className="size-4.5" strokeWidth={1.75} />
              <span className="font-space text-xs font-semibold uppercase tracking-wider">Duration</span>
            </div>
            <div className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white tabular-nums">
              3 - 6 Months
            </div>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Cohort-based, flexible for university schedules.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="flex items-center gap-2 mb-2 text-[#292c2e] dark:text-[#98ff03]">
              <TbCurrencyDollar className="size-4.5" strokeWidth={1.75} />
              <span className="font-space text-xs font-semibold uppercase tracking-wider">Compensation</span>
            </div>
            <div className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white tabular-nums">
              Paid Stipend
            </div>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Monthly stipend + hardware and learning allowance.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="flex items-center gap-2 mb-2 text-[#292c2e] dark:text-[#98ff03]">
              <TbUsersGroup className="size-4.5" strokeWidth={1.75} />
              <span className="font-space text-xs font-semibold uppercase tracking-wider">Mentorship</span>
            </div>
            <div className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white tabular-nums">
              1-on-1 Pairing
            </div>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Assigned senior architect for weekly code reviews.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 relative">
            <div className="size-2 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
            <div className="flex items-center gap-2 mb-2 text-[#292c2e] dark:text-[#98ff03]">
              <TbTargetArrow className="size-4.5" strokeWidth={1.75} />
              <span className="font-space text-xs font-semibold uppercase tracking-wider">Offer Pipeline</span>
            </div>
            <div className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white tabular-nums">
              85% Hire Rate
            </div>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Fast-track transition to full-time associate engineer.
            </p>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-space font-bold uppercase text-[#292c2e] dark:text-[#98ff03] mb-1">
                <TbBinaryTree className="size-3.5" strokeWidth={2} />
                <span>Specialized Fellowship Paths</span>
              </div>
              <h2 className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                Choose Your Focus Track
              </h2>
            </div>
            <p className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
              Select the area that matches your technical passion. You can also explore cross-functional contributions across systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERNSHIP_TRACKS.map((track) => {
              const IconComp = track.icon;
              const isSelected = selectedTrack === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`p-6 sm:p-8 rounded-[2px] border transition-all cursor-pointer relative active:scale-[0.99] ${
                    isSelected
                      ? "bg-white dark:bg-[#161819] border-[#292c2e] dark:border-[#98ff03] shadow-md"
                      : "bg-zinc-50/70 dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-10 rounded-[2px] flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#292c2e] text-[#98ff03] dark:bg-[#98ff03] dark:text-black"
                            : "bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <IconComp className="size-5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <span className="font-space font-bold text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block">
                          {track.badge}
                        </span>
                        <h3 className="font-space font-bold text-lg text-zinc-900 dark:text-white">
                          {track.title}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div
                        className={`size-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#292c2e] dark:border-[#98ff03] bg-[#292c2e] dark:bg-[#98ff03]"
                            : "border-zinc-300 dark:border-zinc-700"
                        }`}
                      >
                        {isSelected && <div className="size-2 rounded-full bg-white dark:bg-black" />}
                      </div>
                    </div>
                  </div>

                  <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
                    {track.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-white/5">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form Section */}
        <div id="apply-now" className="scroll-mt-24">
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
                  Fellowship Application Received!
                </h3>
                <p className="font-inter text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Thank you for applying to the Matii Fellowship Program. Our senior engineering review panel examines every submission. Qualified candidates will receive an invitation for an initial technical conversation within 5 business days.
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
                        education: "",
                        portfolioUrl: "",
                        linkedinUrl: "",
                        resumeUrl: "",
                        projectHighlight: "",
                        coverNote: "",
                      });
                      setResumeFileName(null);
                    }}
                    className="px-5 py-2.5 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-800 dark:text-white font-space text-xs uppercase font-semibold rounded-[2px] active:scale-[0.96] transition-transform"
                  >
                    Submit Another Application
                  </button>
                  <Link
                    href="/careers"
                    className="px-5 py-2.5 bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black font-space text-xs uppercase font-semibold rounded-[2px] active:scale-[0.96] transition-transform"
                  >
                    Back to All Careers
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-space font-bold uppercase text-[#292c2e] dark:text-[#98ff03] mb-1">
                    <TbSchool className="size-4" strokeWidth={2} />
                    <span>Apply for the Fellowship</span>
                  </div>
                  <h3 className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                    Submit Your Application
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Selected Track:{" "}
                    <strong className="text-zinc-900 dark:text-[#98ff03] font-space">
                      {INTERNSHIP_TRACKS.find((t) => t.id === selectedTrack)?.title}
                    </strong>
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-[2px] flex items-center gap-3 text-red-700 dark:text-red-300 text-xs font-inter">
                    <TbAlertCircle className="size-4 shrink-0" strokeWidth={2} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+251 91 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                    />
                  </div>

                  {/* Education / Background */}
                  <div className="space-y-1.5">
                    <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                      School, Bootcamp, or Background
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Addis Ababa University / Computer Science (Year 4)"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                    />
                  </div>

                  {/* Portfolio / GitHub */}
                  <div className="space-y-1.5">
                    <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                      GitHub or Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourhandle"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-1.5">
                    <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                    />
                  </div>
                </div>

                {/* Resume Upload / URL */}
                <div className="space-y-2 p-5 bg-zinc-50/70 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2px]">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Resume / CV (PDF or Word, max 10MB)
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
                      <span>{uploadingResume ? "Uploading File..." : "Upload Document"}</span>
                    </button>

                    <span className="text-xs text-zinc-400 font-inter">or paste a cloud document URL below:</span>
                  </div>

                  {resumeFileName && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300 rounded-[2px]">
                      <TbFileText className="size-3.5" strokeWidth={2} />
                      <span>{resumeFileName}</span>
                    </div>
                  )}

                  <input
                    type="url"
                    placeholder="https://drive.google.com/your-resume.pdf"
                    value={formData.resumeUrl}
                    onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 px-3.5 py-2 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                {/* Project Highlight */}
                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Proudest Project or System Built *
                  </label>
                  <p className="text-[11px] font-inter text-zinc-400">
                    Tell us briefly what it does, what tech stack you used, and an engineering hurdle you overcame.
                  </p>
                  <textarea
                    rows={4}
                    required
                    placeholder="I built an open-source real-time markdown editor with WebSocket sync..."
                    value={formData.projectHighlight}
                    onChange={(e) => setFormData({ ...formData, projectHighlight: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 p-3.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                {/* Motivation / Why Matii */}
                <div className="space-y-1.5">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
                    Why MATII TECHNOLOGIES? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What about our engineering standards or AI focus interests you?"
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black/30 p-3.5 text-xs text-zinc-900 dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none rounded-[2px]"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-100 dark:border-white/10">
                  <p className="font-inter text-xs text-zinc-400">
                    We review all applications internally without automated rejection filters.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-lime-400 text-white dark:text-black font-space text-xs uppercase font-bold tracking-wider rounded-[2px] active:scale-[0.96] shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <TbLoader2 className="size-4 animate-spin" strokeWidth={2} />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <TbSend className="size-4" strokeWidth={2} />
                        <span>Submit Fellowship Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternshipsView;
