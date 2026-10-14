"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  Mail,
  Phone,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  AlertCircle,
  Eye,
  Check,
  X,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SeoMetaFields } from "@/components/admin/SeoMetaFields";
import { normalizeToHtml } from "@/lib/content";
import { LanguageTabSelector } from "@/components/admin/LanguageTabSelector";
import {
  saveJobPositionAction,
  deleteJobPositionAction,
  updateJobApplicationStatusAction,
  deleteJobApplicationAction,
} from "@/lib/actions/career.actions";
import type { FormattedJobPosition, FormattedJobApplication } from "@/lib/services/career.service";

interface CareerClientManagerProps {
  initialJobs: FormattedJobPosition[];
  initialApplications: FormattedJobApplication[];
}

export default function CareerClientManager({
  initialJobs,
  initialApplications,
}: CareerClientManagerProps) {
  const [activeTab, setActiveTab] = useState<"roles" | "applications">("roles");
  const [jobs, setJobs] = useState<FormattedJobPosition[]>(initialJobs);
  const [applications, setApplications] = useState<FormattedJobApplication[]>(initialApplications);
  const [editingJob, setEditingJob] = useState<Partial<FormattedJobPosition> | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Filters for applications
  const [selectedAppJobId, setSelectedAppJobId] = useState<string>("ALL");
  const [selectedAppStatus, setSelectedAppStatus] = useState<string>("ALL");
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Role Form handlers
  const handleOpenNewJob = () => {
    setActiveLocale("en");
    setEditingJob({
      title: "",
      slug: "",
      department: "Engineering",
      location: "Addis Ababa, Ethiopia / Remote",
      type: "Full-Time",
      experience: "3+ Years",
      salary: "Competitive + Equity",
      shortDescription: "",
      content: `<h2>About the Role</h2>
<p>Describe the overarching mission and impact of this role within our product engineering team...</p>

<h3>Responsibilities</h3>
<ul>
  <li>Lead feature architecture and end-to-end implementation with Next.js and TypeScript.</li>
  <li>Ensure high code quality, security audits, and optimal runtime performance.</li>
  <li>Collaborate closely with UI/UX designers and technical product managers.</li>
</ul>

<h3>Requirements & Qualifications</h3>
<ul>
  <li>3+ years of professional engineering experience in modern full-stack web applications.</li>
  <li>Demonstrated mastery of React, TypeScript, APIs, and cloud infrastructure.</li>
  <li>Strong ownership mentality, problem-solving skills, and self-directed drive.</li>
</ul>

<h3>What We Offer</h3>
<ul>
  <li>Competitive compensation package with performance incentives.</li>
  <li>Flexible remote / hybrid work culture with high autonomy.</li>
  <li>Comprehensive healthcare and annual continuous learning stipends.</li>
</ul>`,
      order: jobs.length + 1,
      isActive: true,
      isFeatured: false,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setIsNew(true);
    setFeedback(null);
  };

  const handleOpenEditJob = (job: FormattedJobPosition) => {
    setActiveLocale("en");
    setEditingJob({
      ...job,
      content: normalizeToHtml(job.content),
    });
    setIsNew(false);
    setFeedback(null);
  };

  const handleCloseJobModal = () => {
    setEditingJob(null);
    setIsNew(false);
    setActiveLocale("en");
  };

  const getCareerTranslatedField = (field: "title" | "department" | "shortDescription" | "content", locale: string): string => {
    if (locale === "en") {
      return (editingJob as any)?.[field] || "";
    }
    return editingJob?.translations?.[locale]?.[field] || "";
  };

  const setCareerTranslatedField = (field: "title" | "department" | "shortDescription" | "content", value: string, locale: string) => {
    if (locale === "en") {
      setEditingJob((prev) => (prev ? { ...prev, [field]: value } : null));
      return;
    }
    setEditingJob((prev) => {
      if (!prev) return null;
      const currentLang = prev.translations?.[locale] || {};
      return {
        ...prev,
        translations: {
          ...(prev.translations || {}),
          [locale]: {
            ...currentLang,
            [field]: value,
          },
        },
      };
    });
  };

  const handleCopyCareerFromSource = (targetLocale: string) => {
    if (targetLocale === "en" || !editingJob) return;
    setEditingJob((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        translations: {
          ...(prev.translations || {}),
          [targetLocale]: {
            title: prev.title || "",
            department: prev.department || "",
            shortDescription: prev.shortDescription || "",
            content: prev.content || "",
          },
        },
      };
    });
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.title || !editingJob?.content) {
      setFeedback({ type: "error", message: "Title and role description content are required." });
      return;
    }

    const calculatedSlug =
      editingJob.slug ||
      editingJob.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    startTransition(async () => {
      try {
        const res = await saveJobPositionAction({
          id: editingJob.id,
          title: editingJob.title!,
          slug: calculatedSlug,
          department: editingJob.department || "Engineering",
          location: editingJob.location || "Addis Ababa, Ethiopia / Remote",
          type: editingJob.type || "Full-Time",
          experience: editingJob.experience || "3+ Years",
          salary: editingJob.salary || "Competitive",
          shortDescription: editingJob.shortDescription || "",
          content: normalizeToHtml(editingJob.content!),
          order: Number(editingJob.order || 0),
          isActive: Boolean(editingJob.isActive ?? true),
          isFeatured: Boolean(editingJob.isFeatured ?? false),
          seoTitle: editingJob.seoTitle || undefined,
          seoDescription: editingJob.seoDescription || undefined,
          seoKeywords: editingJob.seoKeywords || undefined,
          translations: editingJob.translations,
        });

        if (res.success) {
          setFeedback({
            type: "success",
            message: `Job position "${editingJob.title}" saved successfully!`,
          });
          handleCloseJobModal();
          // Optimistically update local list
          if (editingJob.id) {
            setJobs((prev) =>
              prev.map((j) => (j.id === editingJob.id ? ({ ...j, ...editingJob, slug: res.slug } as FormattedJobPosition) : j))
            );
          } else {
            setJobs((prev) => [
              ...prev,
              {
                ...editingJob,
                id: `temp-${Date.now()}`,
                slug: res.slug,
                applicationCount: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
              } as FormattedJobPosition,
            ]);
          }
          setTimeout(() => setFeedback(null), 5000);
        }
      } catch (err: any) {
        setFeedback({ type: "error", message: err.message || "Failed to save job position." });
      }
    });
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the job opening "${title}"?`)) return;

    startTransition(async () => {
      try {
        await deleteJobPositionAction(id);
        setJobs((prev) => prev.filter((j) => j.id !== id));
        setFeedback({ type: "success", message: `Deleted job opening "${title}".` });
        setTimeout(() => setFeedback(null), 4000);
      } catch (err: any) {
        setFeedback({ type: "error", message: err.message || "Failed to delete job." });
      }
    });
  };

  // Application handlers
  const handleUpdateAppStatus = (appId: string, newStatus: string) => {
    startTransition(async () => {
      try {
        await updateJobApplicationStatusAction(appId, newStatus);
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
        );
        setFeedback({ type: "success", message: `Updated candidate status to ${newStatus}.` });
        setTimeout(() => setFeedback(null), 3000);
      } catch (err: any) {
        setFeedback({ type: "error", message: err.message || "Failed to update status." });
      }
    });
  };

  const handleDeleteApplication = (appId: string, candidateName: string) => {
    if (!confirm(`Are you sure you want to delete the application from ${candidateName}?`)) return;

    startTransition(async () => {
      try {
        await deleteJobApplicationAction(appId);
        setApplications((prev) => prev.filter((a) => a.id !== appId));
        setFeedback({ type: "success", message: `Deleted application from ${candidateName}.` });
        setTimeout(() => setFeedback(null), 3000);
      } catch (err: any) {
        setFeedback({ type: "error", message: err.message || "Failed to delete application." });
      }
    });
  };

  // Filtered applications
  const filteredApplications = applications.filter((app) => {
    const matchesJob = selectedAppJobId === "ALL" || app.jobId === selectedAppJobId || app.jobTitle === selectedAppJobId;
    const matchesStatus = selectedAppStatus === "ALL" || app.status === selectedAppStatus;
    const matchesSearch =
      !searchTerm ||
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesStatus && matchesSearch;
  });

  const newApplicationsCount = applications.filter((a) => a.status === "NEW").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div>
          <div className="inline-flex gap-2 items-center bg-[#f3f4f6] dark:bg-white/5 px-2.5 py-0.5 border border-zinc-200 dark:border-white/10 rounded-[2px] mb-2">
            <div className="bg-[#98ff03] size-2 shrink-0" />
            <span className="font-space font-semibold text-[11px] text-zinc-900 dark:text-white uppercase tracking-wider">
              TALENT &amp; HIRING STUDIO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-space font-bold text-zinc-900 dark:text-white tracking-tight">
            Careers &amp; Job Applications
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Publish open opportunities with rich formatted descriptions and manage candidate applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#98ff03] border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 rounded-[4px] transition-colors"
          >
            <span>Live Careers</span>
            <ExternalLink className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleOpenNewJob}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-[#161819] font-space font-bold text-xs uppercase tracking-wider rounded-[4px] shadow-sm transition-all active:scale-[0.97] cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-[4px] text-xs font-space flex items-center gap-2.5 border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40"
              : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/40"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="size-4 text-red-500 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("roles")}
          className={`pb-3 font-space text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors relative cursor-pointer ${
            activeTab === "roles"
              ? "text-zinc-900 dark:text-white border-b-2 border-[#98ff03]"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Briefcase className="size-4" />
          <span>Open Roles ({jobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("applications")}
          className={`pb-3 font-space text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors relative cursor-pointer ${
            activeTab === "applications"
              ? "text-zinc-900 dark:text-white border-b-2 border-[#98ff03]"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Users className="size-4" />
          <span>Applications Inbox ({applications.length})</span>
          {newApplicationsCount > 0 && (
            <span className="bg-[#98ff03] text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {newApplicationsCount} new
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: OPEN ROLES */}
      {activeTab === "roles" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 p-5 sm:p-6 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-space font-semibold text-[11px] px-2 py-0.5 uppercase">
                      {job.department}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500 text-xs font-mono">
                      • {job.type}
                    </span>
                    <span
                      className={`text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] ${
                        job.isActive
                          ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {job.isActive ? "Active Listing" : "Draft / Inactive"}
                    </span>
                    {job.isFeatured && (
                      <span className="bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px]">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="font-space font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
                    {job.title}
                  </h3>

                  <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {job.shortDescription || "No short teaser specified."}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-inter text-zinc-500 dark:text-zinc-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-zinc-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-zinc-400" />
                      {job.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="size-3.5 text-zinc-400" />
                      {job.salary}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-4 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f3f4f6] dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[3px] text-xs font-space text-zinc-700 dark:text-zinc-300">
                    <Users className="size-3.5 text-[#98ff03]" />
                    <span className="font-bold tabular-nums">{job.applicationCount ?? 0}</span>
                    <span className="text-zinc-500">applicants</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/careers/${job.slug}`}
                      target="_blank"
                      className="p-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-[4px] transition-colors"
                      title="Preview on live site"
                    >
                      <Eye className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEditJob(job)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-[#161819] text-xs font-space font-bold uppercase rounded-[4px] transition-colors cursor-pointer"
                    >
                      <Edit2 className="size-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border border-zinc-200 dark:border-white/10 rounded-[4px] transition-colors cursor-pointer"
                      title="Delete Job"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="p-12 text-center border border-dashed border-zinc-300 dark:border-white/10 rounded-[4px]">
                <Briefcase className="size-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="font-space font-bold text-zinc-800 dark:text-white uppercase text-base">
                  No Job Openings Found
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto mb-5">
                  Start drafting career positions with our rich text editor to attract top candidates.
                </p>
                <button
                  type="button"
                  onClick={handleOpenNewJob}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#98ff03] text-black font-space font-bold text-xs uppercase tracking-wider rounded-[4px]"
                >
                  <Plus className="size-4" />
                  <span>Create First Job</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATIONS INBOX */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 p-4 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="size-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate or job..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[3px] text-xs font-inter text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              <select
                value={selectedAppJobId}
                onChange={(e) => setSelectedAppJobId(e.target.value)}
                className="px-3 py-1.5 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[3px] text-xs font-space text-zinc-700 dark:text-zinc-300 focus:outline-none"
              >
                <option value="ALL">All Roles ({applications.length})</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["ALL", "NEW", "REVIEWING", "INTERVIEW", "OFFER", "REJECTED"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedAppStatus(st)}
                  className={`text-[11px] font-space font-semibold uppercase px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer ${
                    selectedAppStatus === st
                      ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-[#161819]"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const isExpanded = expandedAppId === app.id;

              return (
                <div
                  key={app.id}
                  className="bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 rounded-[4px] overflow-hidden transition-all shadow-sm"
                >
                  {/* Summary Bar */}
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-space font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                          {app.fullName}
                        </span>
                        <span className="text-zinc-400 text-xs font-mono">• {app.date}</span>
                        <span
                          className={`text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] ${
                            app.status === "NEW"
                              ? "bg-[#98ff03] text-black"
                              : app.status === "INTERVIEW"
                              ? "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300"
                              : app.status === "OFFER"
                              ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                              : app.status === "REJECTED"
                              ? "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300"
                              : "bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-inter text-zinc-600 dark:text-zinc-400">
                        <span className="font-space font-semibold text-zinc-800 dark:text-zinc-200">
                          Role: {app.jobTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="size-3 text-zinc-400" />
                          <a href={`mailto:${app.email}`} className="hover:underline text-blue-600 dark:text-blue-400">
                            {app.email}
                          </a>
                        </span>
                        {app.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="size-3 text-zinc-400" />
                            {app.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions & Status Select */}
                    <div className="flex items-center gap-3 shrink-0">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                        className="px-2.5 py-1.5 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-space font-semibold rounded-[3px] text-zinc-800 dark:text-zinc-200 focus:outline-none"
                      >
                        <option value="NEW">Status: NEW</option>
                        <option value="REVIEWING">Status: REVIEWING</option>
                        <option value="INTERVIEW">Status: INTERVIEW</option>
                        <option value="OFFER">Status: OFFER</option>
                        <option value="REJECTED">Status: REJECTED</option>
                        <option value="ARCHIVED">Status: ARCHIVED</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-xs font-space font-medium rounded-[3px] text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Details" : "View Application"}</span>
                        {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteApplication(app.id, app.fullName)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-[3px] transition-colors cursor-pointer"
                        title="Delete application"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/20 p-5 sm:p-6 space-y-5">
                      {/* Candidate Links & Resume */}
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#292c2e] hover:bg-black text-white dark:bg-white dark:text-zinc-900 font-space text-xs uppercase font-semibold rounded-[3px] shadow-sm transition-all"
                          >
                            <FileText className="size-3.5 text-[#98ff03] dark:text-emerald-600" />
                            <span>Download / View Resume</span>
                            <ExternalLink className="size-3" />
                          </a>
                        ) : (
                          <span className="text-xs font-space text-zinc-400 italic">No resume file attached</span>
                        )}

                        {app.linkedinUrl && (
                          <a
                            href={app.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 text-xs font-space rounded-[3px] transition-colors"
                          >
                            <FaLinkedin className="size-3.5 text-blue-600" />
                            <span>LinkedIn Profile</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}

                        {app.portfolioUrl && (
                          <a
                            href={app.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 text-xs font-space rounded-[3px] transition-colors"
                          >
                            <Globe className="size-3.5 text-emerald-600" />
                            <span>Portfolio / GitHub</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}

                        <a
                          href={`mailto:${app.email}?subject=Application for ${encodeURIComponent(app.jobTitle)} at MATII TECHNOLOGIES`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 text-xs font-space rounded-[3px] transition-colors ml-auto"
                        >
                          <Mail className="size-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>

                      {/* Candidate Cover Note */}
                      <div className="space-y-1.5">
                        <span className="font-space text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold block">
                          Candidate Pitch / Cover Note
                        </span>
                        <div className="p-4 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 rounded-[3px] font-inter text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                          {app.coverNote || "No cover note provided by candidate."}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredApplications.length === 0 && (
              <div className="p-12 text-center border border-dashed border-zinc-300 dark:border-white/10 rounded-[4px]">
                <Users className="size-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="font-space font-bold text-zinc-800 dark:text-white uppercase text-base">
                  No Applications Found
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Applications submitted on the public website will appear here in real-time.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* JOB OPENING EDIT / CREATE MODAL */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 rounded-[6px] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-space font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="size-4 text-[#98ff03]" />
                  {isNew ? "Create New Job Opening" : `Edit: ${editingJob.title}`}
                </h2>
                <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400">
                  Format the role with the rich text editor to showcase responsibilities, requirements, and benefits.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseJobModal}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-[4px] cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveJob} className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Multi-Language & AI Auto-Translation Switcher */}
              <LanguageTabSelector
                activeLocale={activeLocale}
                onChangeLocale={setActiveLocale}
                translations={editingJob.translations}
                sourceTexts={{
                  title: editingJob.title || "",
                  department: editingJob.department || "",
                  shortDescription: editingJob.shortDescription || "",
                  content: editingJob.content || "",
                }}
                onCopyFromSource={handleCopyCareerFromSource}
                onTranslated={(translations) => {
                  setEditingJob((prev) =>
                    prev
                      ? {
                          ...prev,
                          translations: {
                            ...(prev.translations || {}),
                            ...translations,
                          },
                        }
                      : null
                  );
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1 flex items-center justify-between">
                    <span>
                      Job Title {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} *
                    </span>
                    {activeLocale !== "en" && (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-normal">
                        Translating into {activeLocale.toUpperCase()}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    required={activeLocale === "en"}
                    placeholder={activeLocale === "en" ? "e.g. Senior Full-Stack Engineer" : `Job Title in ${activeLocale.toUpperCase()}...`}
                    value={getCareerTranslatedField("title", activeLocale)}
                    onChange={(e) => setCareerTranslatedField("title", e.target.value, activeLocale)}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#98ff03]"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="senior-full-stack-engineer (auto-generated if empty)"
                    value={editingJob.slug || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, slug: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-mono text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#98ff03]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Department
                  </label>
                  <select
                    value={editingJob.department || "Engineering"}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-space text-xs text-zinc-900 dark:text-white focus:outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    placeholder="Full-Time / Contract"
                    value={editingJob.type || "Full-Time"}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5+ Years"
                    value={editingJob.experience || "3+ Years"}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Salary / Compensation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Competitive + Equity"
                    value={editingJob.salary || "Competitive"}
                    onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Addis Ababa, Ethiopia / Remote"
                  value={editingJob.location || "Addis Ababa, Ethiopia / Remote"}
                  onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold mb-1 flex items-center justify-between">
                  <span>
                    Short Teaser Description {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`}
                  </span>
                </label>
                <textarea
                  rows={2}
                  placeholder={activeLocale === "en" ? "Brief 1-2 sentence overview of the opportunity..." : `Short Description in ${activeLocale.toUpperCase()}...`}
                  value={getCareerTranslatedField("shortDescription", activeLocale)}
                  onChange={(e) => setCareerTranslatedField("shortDescription", e.target.value, activeLocale)}
                  className="w-full px-3.5 py-2 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-inter text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              {/* RICH TEXT EDITOR (TipTap) */}
              <div className="space-y-2">
                <label className="block font-space text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-semibold flex items-center justify-between">
                  <span>
                    Detailed Role Description &amp; Requirements (Rich Text) {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} *
                  </span>
                </label>
                <div className="border border-zinc-200 dark:border-white/10 rounded-[4px] overflow-hidden">
                  <RichTextEditor
                    key={`career-editor-${activeLocale}`}
                    content={getCareerTranslatedField("content", activeLocale)}
                    onChange={(html) => setCareerTranslatedField("content", html, activeLocale)}
                    placeholder={activeLocale === "en" ? "Write detailed responsibilities, qualifications, and benefits..." : `Role specs in ${activeLocale.toUpperCase()}...`}
                    minHeight="320px"
                  />
                </div>
              </div>

              {/* Settings & Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-200 dark:border-white/10">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingJob.isActive ?? true}
                    onChange={(e) => setEditingJob({ ...editingJob, isActive: e.target.checked })}
                    className="size-4 accent-[#98ff03]"
                  />
                  <span className="font-space text-xs uppercase font-semibold text-zinc-800 dark:text-zinc-200">
                    Publish Active Listing
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingJob.isFeatured ?? false}
                    onChange={(e) => setEditingJob({ ...editingJob, isFeatured: e.target.checked })}
                    className="size-4 accent-[#98ff03]"
                  />
                  <span className="font-space text-xs uppercase font-semibold text-zinc-800 dark:text-zinc-200">
                    Feature on Homepage
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-space text-xs uppercase font-semibold text-zinc-700 dark:text-zinc-300">
                    Sort Order:
                  </span>
                  <input
                    type="number"
                    value={editingJob.order ?? 0}
                    onChange={(e) => setEditingJob({ ...editingJob, order: Number(e.target.value) })}
                    className="w-16 px-2 py-1 bg-[#f8f9fa] dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-mono text-center rounded-[2px]"
                  />
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="border-t border-zinc-200 dark:border-white/10 pt-4">
                <SeoMetaFields
                  seoTitle={editingJob.seoTitle || ""}
                  setSeoTitle={(val) => setEditingJob((prev) => (prev ? { ...prev, seoTitle: val } : null))}
                  seoDescription={editingJob.seoDescription || ""}
                  setSeoDescription={(val) => setEditingJob((prev) => (prev ? { ...prev, seoDescription: val } : null))}
                  seoKeywords={editingJob.seoKeywords || ""}
                  setSeoKeywords={(val) => setEditingJob((prev) => (prev ? { ...prev, seoKeywords: val } : null))}
                  defaultTitle={`${editingJob.title || "Career Opening"} | Careers at MATII TECHNOLOGIES`}
                  defaultDescription={editingJob.shortDescription || "Join our team of senior software engineers and designers."}
                  slug={editingJob.slug || "role"}
                  sectionPath="careers"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleCloseJobModal}
                  className="px-4 py-2 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-space uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-[#161819] font-space font-bold text-xs uppercase tracking-wider rounded-[4px] shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? "Saving..." : isNew ? "Create Job Opening" : "Update Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
