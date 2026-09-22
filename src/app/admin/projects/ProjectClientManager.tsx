"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  Briefcase,
  Image as ImageIcon,
  FolderTree,
  Tag,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  saveProjectAction,
  deleteProjectAction,
  saveProjectCategoryAction,
  deleteProjectCategoryAction,
} from "@/lib/actions/project.actions";
import type { ParsedProject, FormattedProjectCategory } from "@/lib/services/project.service";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { SeoMetaFields } from "@/components/admin/SeoMetaFields";
import { CaseStudyGalleryManager } from "@/components/admin/CaseStudyGalleryManager";
import { AddToNavbarSelector, AddToNavbarConfig } from "@/components/admin/AddToNavbarSelector";
import { LanguageTabSelector } from "@/components/admin/LanguageTabSelector";

interface ProjectClientManagerProps {
  initialProjects: ParsedProject[];
  initialCategories?: FormattedProjectCategory[];
}

export function ProjectClientManager({
  initialProjects,
  initialCategories = [],
}: ProjectClientManagerProps) {
  const [projects, setProjects] = useState<ParsedProject[]>(initialProjects);
  const [categories, setCategories] = useState<FormattedProjectCategory[]>(initialCategories);
  const [editingProject, setEditingProject] = useState<Partial<ParsedProject> | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  // Category Manager States
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<FormattedProjectCategory> | null>(null);
  const [catFeedback, setCatFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>("All");

  // Navbar Integration State
  const [navbarConfig, setNavbarConfig] = useState<AddToNavbarConfig>({
    enabled: false,
    menuKey: "projects",
    categoryId: "",
    groupTitle: "Featured",
    badge: "",
  });
  const [originalSlug, setOriginalSlug] = useState<string>("");

  // Form states for multi-line fields
  const [challengeText, setChallengeText] = useState("");
  const [solutionText, setSolutionText] = useState("");

  const handleOpenEdit = (project: ParsedProject) => {
    setActiveLocale("en");
    setEditingProject({
      ...project,
      galleryItems: project.galleryItems || [],
    });
    setChallengeText(project.challengeParagraphs.join("\n\n"));
    setSolutionText(project.solutionParagraphs.join("\n\n"));
    setOriginalSlug(project.slug);
    setNavbarConfig({
      enabled: false,
      menuKey: "projects",
      categoryId: project.category || categories[0]?.name || "AI Automation",
      groupTitle: "Featured",
      badge: "",
      oldHref: `/projects/${project.slug}`,
    });
    setIsNew(false);
    setFeedback(null);
  };

  const handleOpenNew = () => {
    setActiveLocale("en");
    const defaultCat = categories[0]?.name || "AI Automation";
    setOriginalSlug("");
    setEditingProject({
      slug: "",
      title: "",
      subtitle: "",
      category: defaultCat,
      year: "2025",
      clientName: "",
      clientLogoText: "",
      liveUrl: "",
      timeline: "3 Months",
      services: "AI Automation • Fullstack Engineering",
      coverImage: "/images/ai-automation.png",
      galleryItems: [
        {
          id: `gallery-${Date.now()}-1`,
          title: "AI Workflow & Node Dashboard",
          imageUrl: "/images/ai-automation.png",
        },
        {
          id: `gallery-${Date.now()}-2`,
          title: "Brand Architecture & Swiss Style System",
          imageUrl: "/images/solutions-1.png",
        },
      ],
      metrics: {
        demoClickGrowth: "12.0",
        higherEngagement: "45",
        pipelineInfluence: "$90K",
        qualifiedLeads: "80",
        stat1Value: "+12x",
        stat1Label: "demo clicks",
      },
      isFeatured: true,
      isSolutionsBuilt: true,
      order: projects.length + 1,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setChallengeText("Describe the user and client challenge here.");
    setSolutionText("Describe the architectural and design solution here.");
    setNavbarConfig({
      enabled: false,
      menuKey: "projects",
      categoryId: defaultCat,
      groupTitle: "Featured",
      badge: "",
    });
    setIsNew(true);
    setFeedback(null);
  };

  const handleClose = () => {
    setEditingProject(null);
    setIsNew(false);
    setActiveLocale("en");
  };

  const getProjectTranslatedField = (field: "title" | "subtitle" | "challenge" | "solution", locale: string): string => {
    if (locale === "en") {
      if (field === "title") return editingProject?.title || "";
      if (field === "subtitle") return editingProject?.subtitle || "";
      if (field === "challenge") return challengeText;
      if (field === "solution") return solutionText;
    }
    const trans = (editingProject?.translations as Record<string, any> | undefined)?.[locale];
    if (!trans) return "";
    if (field === "challenge") {
      return trans.challenge || (Array.isArray(trans.challengeParagraphs) ? trans.challengeParagraphs.join("\n\n") : "") || "";
    }
    if (field === "solution") {
      return trans.solution || (Array.isArray(trans.solutionParagraphs) ? trans.solutionParagraphs.join("\n\n") : "") || "";
    }
    return trans[field] || "";
  };

  const setProjectTranslatedField = (field: "title" | "subtitle" | "challenge" | "solution", value: string, locale: string) => {
    if (locale === "en") {
      if (field === "title") setEditingProject((prev) => (prev ? { ...prev, title: value } : null));
      if (field === "subtitle") setEditingProject((prev) => (prev ? { ...prev, subtitle: value } : null));
      if (field === "challenge") setChallengeText(value);
      if (field === "solution") setSolutionText(value);
      return;
    }
    setEditingProject((prev) => {
      if (!prev) return null;
      const currentLang = prev.translations?.[locale] || {};
      const updatedLang = {
        ...currentLang,
        [field]: value,
        ...(field === "challenge"
          ? {
              challenge: value,
              challengeParagraphs: value.split("\n\n").map((p: string) => p.trim()).filter(Boolean),
            }
          : {}),
        ...(field === "solution"
          ? {
              solution: value,
              solutionParagraphs: value.split("\n\n").map((p: string) => p.trim()).filter(Boolean),
            }
          : {}),
      };
      return {
        ...prev,
        translations: {
          ...(prev.translations || {}),
          [locale]: updatedLang,
        },
      };
    });
  };

  const handleCopyProjectFromSource = (targetLocale: string) => {
    if (targetLocale === "en" || !editingProject) return;
    setEditingProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        translations: {
          ...(prev.translations || {}),
          [targetLocale]: {
            title: prev.title || "",
            subtitle: prev.subtitle || "",
            challenge: challengeText || "",
            challengeParagraphs: challengeText.split("\n\n").map((p) => p.trim()).filter(Boolean),
            solution: solutionText || "",
            solutionParagraphs: solutionText.split("\n\n").map((p) => p.trim()).filter(Boolean),
          },
        },
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.slug || !editingProject?.title) return;

    startTransition(async () => {
      try {
        const challengeParagraphs = challengeText
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean);
        const solutionParagraphs = solutionText
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean);

        const projectCategory = editingProject.category || categories[0]?.name || "AI Automation";

        await saveProjectAction({
          id: editingProject.id,
          slug: editingProject.slug!,
          title: editingProject.title!,
          subtitle: editingProject.subtitle || "",
          category: projectCategory,
          year: editingProject.year || "2025",
          clientName: editingProject.clientName || undefined,
          clientLogoText: editingProject.clientLogoText || undefined,
          liveUrl: editingProject.liveUrl || undefined,
          timeline: editingProject.timeline || undefined,
          services: editingProject.services || undefined,
          coverImage: editingProject.coverImage || "/images/ai-automation.png",
          challengeParagraphs,
          solutionParagraphs,
          galleryItems: editingProject.galleryItems || [],
          metrics: editingProject.metrics || {},
          isFeatured: Boolean(editingProject.isFeatured),
          isSolutionsBuilt: Boolean(editingProject.isSolutionsBuilt),
          order: Number(editingProject.order || 0),
          seoTitle: editingProject.seoTitle || undefined,
          seoDescription: editingProject.seoDescription || undefined,
          seoKeywords: editingProject.seoKeywords || undefined,
          translations: editingProject.translations,
          navbarIntegration: navbarConfig.enabled ? navbarConfig : undefined,
        });

        setFeedback("Project case study saved successfully!");
        setTimeout(() => setFeedback(null), 4000);
        handleClose();
      } catch (err) {
        console.error("Failed to save project:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    startTransition(async () => {
      try {
        await deleteProjectAction(id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setFeedback("Project deleted successfully.");
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        console.error("Failed to delete project:", err);
      }
    });
  };

  // Category Actions
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat?.name) return;

    const catName = editingCat.name.trim();
    const catId = editingCat.id;
    const catSlug = editingCat.slug;
    const catDesc = editingCat.description;
    const catOrder = editingCat.order;
    const catActive = editingCat.isActive;

    startTransition(async () => {
      try {
        await saveProjectCategoryAction({
          id: catId,
          name: catName,
          slug: catSlug,
          description: catDesc || undefined,
          order: Number(catOrder || categories.length + 1),
          isActive: Boolean(catActive ?? true),
        });

        // Update local state
        if (catId) {
          setCategories((prev) =>
            prev.map((c) => (c.id === catId ? ({ ...c, name: catName, slug: catSlug || catName.toLowerCase().replace(/[^a-z0-9]+/g, "-"), description: catDesc || null, order: catOrder || c.order } as FormattedProjectCategory) : c))
          );
        } else {
          setCategories((prev) => [
            ...prev,
            {
              id: `cat-${Date.now()}`,
              name: catName,
              slug: (catSlug || catName).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              description: catDesc || null,
              order: catOrder || prev.length + 1,
              isActive: true,
              projectCount: 0,
            },
          ]);
        }

        setCatFeedback({ type: "success", message: `Category "${editingCat.name}" saved successfully!` });
        setEditingCat(null);
        setTimeout(() => setCatFeedback(null), 3500);
      } catch (err: any) {
        setCatFeedback({ type: "error", message: err.message || "Failed to save category." });
      }
    });
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) return;

    startTransition(async () => {
      try {
        await deleteProjectCategoryAction(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setCatFeedback({ type: "success", message: `Category "${name}" deleted.` });
        setTimeout(() => setCatFeedback(null), 3500);
      } catch (err: any) {
        setCatFeedback({ type: "error", message: err.message || "Failed to delete category." });
      }
    });
  };

  const filteredProjects =
    activeFilterCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeFilterCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 p-6 rounded-[4px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <div className="inline-flex gap-2 items-center bg-[#f3f4f6] dark:bg-white/10 px-2.5 py-0.5 border border-zinc-200 dark:border-white/10 rounded-[2px] mb-2">
            <div className="bg-[#98ff03] size-2 shrink-0" />
            <span className="font-space font-semibold text-[11px] text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              PORTFOLIO STUDIO
            </span>
          </div>
          <h2 className="font-space font-medium text-xl sm:text-2xl text-[#292c2e] dark:text-white tracking-tight">
            Projects &amp; Case Studies
          </h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage public projects, detail pages (/projects/[slug]), challenge &amp; solutions, and dynamic categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCatModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-zinc-50 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-white/10 text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-xs cursor-pointer"
          >
            <FolderTree className="size-3.5 text-[#292c2e] dark:text-[#98ff03]" />
            <span>Manage Categories ({categories.length})</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-zinc-950 text-xs font-space font-bold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
          >
            <Plus className="size-4 text-[#98ff03] dark:text-black" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>{feedback}</span>
        </div>
      ) : null}

      {/* Dynamic Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilterCategory("All")}
          className={`px-3 py-1.5 rounded-[4px] font-space text-xs uppercase font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeFilterCategory === "All"
              ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-zinc-950"
              : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
          }`}
        >
          <span>All Projects</span>
          <span className="text-[10px] font-mono px-1 py-0.2 bg-black/20 dark:bg-black/30 rounded-full">
            {projects.length}
          </span>
        </button>

        {categories.map((cat) => {
          const count = projects.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
          const isActive = activeFilterCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilterCategory(cat.name)}
              className={`px-3 py-1.5 rounded-[4px] font-space text-xs uppercase font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-zinc-950"
                  : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] font-mono px-1 py-0.2 bg-black/20 dark:bg-black/30 rounded-full">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects List Table */}
      <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse font-inter text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/10 font-space text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              <th className="p-4">Project Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Client</th>
              <th className="p-4">Gallery</th>
              <th className="p-4">Homepage Carousel</th>
              <th className="p-4">Live Link</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
            {filteredProjects.map((proj) => (
              <tr key={proj.id} className="hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100">
                    {proj.title}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    /projects/{proj.slug}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-space font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                    {proj.category}
                  </span>
                </td>
                <td className="p-4 font-space text-zinc-700 dark:text-zinc-300">
                  {proj.clientName || "Internal"}
                </td>
                <td className="p-4 font-space">
                  <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                    <ImageIcon className="size-3 text-zinc-400 dark:text-zinc-500" />
                    {proj.galleryItems.length} images
                  </span>
                </td>
                <td className="p-4">
                  {proj.isSolutionsBuilt ? (
                    <span className="bg-[#98ff03]/30 dark:bg-[#98ff03]/20 text-black dark:text-[#98ff03] text-[10px] font-space font-bold px-2 py-0.5 rounded-[2px]">
                      ACTIVE CAROUSEL
                    </span>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500 font-space text-[10px]">
                      Detail Page Only
                    </span>
                  )}
                </td>
                <td className="p-4 font-mono">
                  <Link
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-[#98ff03] inline-flex items-center gap-1 font-space text-[11px] transition-colors"
                  >
                    <span>Preview</span>
                    <ExternalLink className="size-3" />
                  </Link>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-[3px] transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-zinc-400 dark:text-zinc-500 font-inter">
                  No projects found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CATEGORIES MANAGEMENT MODAL */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#16181b] border border-zinc-200 dark:border-white/10 w-full max-w-2xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3 mb-5">
              <div>
                <h3 className="font-space font-bold text-lg text-[#292c2e] dark:text-white flex items-center gap-2">
                  <FolderTree className="size-4 text-[#98ff03]" />
                  <span>Manage Project Categories</span>
                </h3>
                <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400">
                  Categories control public filter pills and URL synchronization (/projects?category=...).
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCatModalOpen(false);
                  setEditingCat(null);
                  setCatFeedback(null);
                }}
                type="button"
                className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {catFeedback && (
              <div
                className={`p-3 mb-4 rounded-[4px] text-xs font-space flex items-center gap-2 border ${
                  catFeedback.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
                }`}
              >
                {catFeedback.type === "success" ? (
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="size-4 text-red-600 dark:text-red-400 shrink-0" />
                )}
                <span>{catFeedback.message}</span>
              </div>
            )}

            {/* Add / Edit Category Form */}
            <form onSubmit={handleSaveCategory} className="bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 p-4 rounded-[3px] mb-6 space-y-3">
              <span className="font-space font-bold text-xs uppercase text-zinc-700 dark:text-zinc-300 block">
                {editingCat ? `Edit Category: ${editingCat.name}` : "Create New Category"}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-space text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Automation, Cybersecurity"
                    value={editingCat?.name || ""}
                    onChange={(e) => setEditingCat((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-1.5 rounded-[3px] text-xs font-inter text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingCat?.order ?? categories.length + 1}
                    onChange={(e) => setEditingCat((prev) => ({ ...prev, order: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-1.5 rounded-[3px] text-xs font-mono text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-space text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">
                  Description / Subtitle (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Brief description of this domain or solution type..."
                  value={editingCat?.description || ""}
                  onChange={(e) => setEditingCat((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-1.5 rounded-[3px] text-xs font-inter text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                {editingCat && (
                  <button
                    type="button"
                    onClick={() => setEditingCat(null)}
                    className="px-3 py-1 text-xs font-space uppercase text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-1.5 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-zinc-950 text-xs font-space font-semibold uppercase tracking-wider rounded-[3px] shadow-xs cursor-pointer"
                >
                  {isPending ? "Saving..." : editingCat ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>

            {/* Existing Categories Table */}
            <div className="border border-zinc-200 dark:border-white/10 rounded-[3px] overflow-hidden">
              <table className="w-full text-left font-inter text-xs">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-white/5 font-space text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    <th className="p-3">Order</th>
                    <th className="p-3">Category Name</th>
                    <th className="p-3">Slug (URL)</th>
                    <th className="p-3">Projects</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                  {categories.map((cat) => {
                    const count = projects.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;

                    return (
                      <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
                        <td className="p-3 font-mono font-bold text-zinc-500 dark:text-zinc-400">
                          {cat.order}
                        </td>
                        <td className="p-3 font-space font-semibold text-zinc-800 dark:text-zinc-200">
                          {cat.name}
                        </td>
                        <td className="p-3 font-mono text-zinc-400 dark:text-zinc-500">
                          {cat.slug}
                        </td>
                        <td className="p-3 font-space">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                            {count} project{count !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingCat(cat)}
                              className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                              title="Edit Category"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat.id, cat.name)}
                              className="p-1 text-zinc-400 hover:text-red-600"
                              title="Delete Category"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Project Drawer / Modal */}
      {editingProject ? (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#16181b] border border-[rgba(174,174,174,0.4)] dark:border-white/10 w-full max-w-4xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3 mb-6">
              <h3 className="font-space font-medium text-xl text-[#292c2e] dark:text-white">
                {isNew ? "Create New Project" : `Edit Project: ${editingProject.title}`}
              </h3>
              <button
                onClick={handleClose}
                type="button"
                className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 font-inter text-xs">
              {/* Multi-Language & AI Auto-Translation Switcher */}
              <LanguageTabSelector
                activeLocale={activeLocale}
                onChangeLocale={setActiveLocale}
                translations={editingProject.translations}
                sourceTexts={{
                  title: editingProject.title || "",
                  subtitle: editingProject.subtitle || "",
                  challenge: challengeText || "",
                  solution: solutionText || "",
                }}
                onCopyFromSource={handleCopyProjectFromSource}
                onTranslated={(translations) => {
                  const formattedTrans: Record<string, any> = {};
                  for (const [lang, obj] of Object.entries(translations)) {
                    formattedTrans[lang] = {
                      title: obj.title || "",
                      subtitle: obj.subtitle || "",
                      challenge: obj.challenge || "",
                      solution: obj.solution || "",
                      challengeParagraphs: obj.challenge
                        ? obj.challenge.split("\n\n").map((p) => p.trim()).filter(Boolean)
                        : [],
                      solutionParagraphs: obj.solution
                        ? obj.solution.split("\n\n").map((p) => p.trim()).filter(Boolean)
                        : [],
                    };
                  }
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          translations: {
                            ...(prev.translations || {}),
                            ...formattedTrans,
                          },
                        }
                      : null
                  );
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                    <span>
                      Project Title {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} *
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
                    value={getProjectTranslatedField("title", activeLocale)}
                    onChange={(e) => setProjectTranslatedField("title", e.target.value, activeLocale)}
                    placeholder={activeLocale === "en" ? "e.g. Intelligent Care Orchestrator" : `Title in ${activeLocale.toUpperCase()}...`}
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                    Slug (/projects/[slug]) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                  <span>
                    Subtitle / Elevator Pitch {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={getProjectTranslatedField("subtitle", activeLocale)}
                  onChange={(e) => setProjectTranslatedField("subtitle", e.target.value, activeLocale)}
                  placeholder={activeLocale === "en" ? "Elevator pitch..." : `Subtitle in ${activeLocale.toUpperCase()}...`}
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* DYNAMIC CATEGORY DROPDOWN */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                      Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCat({ name: "", order: categories.length + 1, isActive: true });
                        setIsCatModalOpen(true);
                      }}
                      className="text-[10px] text-[#98ff03] bg-[#292c2e] hover:bg-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-[#98ff03] px-1.5 py-0.5 rounded-[2px] font-space font-semibold uppercase cursor-pointer"
                    >
                      + New
                    </button>
                  </div>
                  <select
                    value={editingProject.category || (categories[0]?.name || "AI Automation")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                    {/* Fallback if project category doesn't match predefined */}
                    {editingProject.category &&
                      !categories.some((c) => c.name.toLowerCase() === editingProject.category?.toLowerCase()) && (
                        <option value={editingProject.category}>
                          {editingProject.category}
                        </option>
                      )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.clientName || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        clientName: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                    Client Logo Initial (e.g. "R", "L")
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={editingProject.clientLogoText || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        clientLogoText: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                    Delivery Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || "2025"}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        year: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                    Project Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Months"
                    value={editingProject.timeline || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        timeline: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                    Live Demo / Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editingProject.liveUrl || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        liveUrl: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-zinc-50/50 dark:bg-white/[0.02] p-3.5 border border-zinc-200/80 dark:border-white/10 rounded-[4px]">
                <CloudinaryUploadButton
                  label="Cover Image"
                  hint="Banner image displayed on project cards and case study showcase"
                  value={editingProject.coverImage || ""}
                  onChange={(url: string) =>
                    setEditingProject((prev) => (prev ? { ...prev, coverImage: url } : null))
                  }
                  aspectRatio="wide"
                  folder="Matii_projects"
                />
              </div>

              {/* Key Services Tags */}
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                  Key Services (Bullet Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. NLP Solutions • AI Automation • Integration"
                  value={editingProject.services || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      services: e.target.value,
                    })
                  }
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              {/* Challenge Paragraphs */}
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                  <span>
                    The Challenge {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} (Double enter / separate paragraphs)
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={getProjectTranslatedField("challenge", activeLocale)}
                  onChange={(e) => setProjectTranslatedField("challenge", e.target.value, activeLocale)}
                  placeholder={activeLocale === "en" ? "Describe challenge..." : `Challenge in ${activeLocale.toUpperCase()}...`}
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              {/* Solution Paragraphs */}
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                  <span>
                    The Solution &amp; Engineering Strategy {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} (Double enter / separate paragraphs)
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={getProjectTranslatedField("solution", activeLocale)}
                  onChange={(e) => setProjectTranslatedField("solution", e.target.value, activeLocale)}
                  placeholder={activeLocale === "en" ? "Describe solution..." : `Solution in ${activeLocale.toUpperCase()}...`}
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              {/* Interactive Multi-Image Gallery Manager */}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/10">
                <CaseStudyGalleryManager
                  items={editingProject.galleryItems || []}
                  onChange={(updatedGallery) =>
                    setEditingProject({
                      ...editingProject,
                      galleryItems: updatedGallery,
                    })
                  }
                />
              </div>

              {/* Add to Navigation Mega Menu */}
              <div className="border-t border-zinc-100 dark:border-white/10 pt-3">
                <AddToNavbarSelector
                  slug={editingProject.slug || ""}
                  title={editingProject.title || ""}
                  contentType="project"
                  value={navbarConfig}
                  onChange={setNavbarConfig}
                  originalSlug={originalSlug}
                />
              </div>

              {/* SEO Meta Fields */}
              <div className="border-t border-zinc-100 dark:border-white/10 pt-4">
                <SeoMetaFields
                  seoTitle={editingProject.seoTitle || ""}
                  setSeoTitle={(val) =>
                    setEditingProject({ ...editingProject, seoTitle: val })
                  }
                  seoDescription={editingProject.seoDescription || ""}
                  setSeoDescription={(val) =>
                    setEditingProject({ ...editingProject, seoDescription: val })
                  }
                  seoKeywords={editingProject.seoKeywords || ""}
                  setSeoKeywords={(val) =>
                    setEditingProject({ ...editingProject, seoKeywords: val })
                  }
                  defaultTitle={editingProject.title || "Case Study"}
                  defaultDescription={
                    editingProject.subtitle || "Enterprise digital transformation"
                  }
                  slug={editingProject.slug || "project"}
                  coverImage={editingProject.coverImage}
                  sectionPath="projects"
                />
              </div>

              {/* Settings / Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured ?? true}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="size-4 accent-[#292c2e] dark:accent-[#98ff03]"
                  />
                  <span className="font-space text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Featured Project
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isSolutionsBuilt ?? true}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        isSolutionsBuilt: e.target.checked,
                      })
                    }
                    className="size-4 accent-[#292c2e] dark:accent-[#98ff03]"
                  />
                  <span className="font-space text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Homepage Showcase Carousel
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-700 dark:text-zinc-200 font-space text-xs uppercase font-medium rounded-[3px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2.5 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-zinc-950 font-space text-xs uppercase font-bold rounded-[3px] active:scale-[0.96] shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectClientManager;
