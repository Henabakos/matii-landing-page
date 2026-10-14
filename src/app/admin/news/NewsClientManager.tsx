"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Check, X, ExternalLink, Newspaper } from "lucide-react";
import { saveNewsAction, deleteNewsAction } from "@/lib/actions/news.actions";
import type { FormattedNewsArticle } from "@/lib/services/news.service";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { SeoMetaFields } from "@/components/admin/SeoMetaFields";
import { normalizeToHtml, getWordAndCharStats } from "@/lib/content";
import { AddToNavbarSelector, AddToNavbarConfig } from "@/components/admin/AddToNavbarSelector";
import { LanguageTabSelector } from "@/components/admin/LanguageTabSelector";

interface NewsClientManagerProps {
  initialNews: FormattedNewsArticle[];
}

export function NewsClientManager({ initialNews }: NewsClientManagerProps) {
  const [newsList, setNewsList] = useState<FormattedNewsArticle[]>(initialNews);
  const [editingNews, setEditingNews] = useState<Partial<FormattedNewsArticle> | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  // Navbar Integration State
  const [navbarConfig, setNavbarConfig] = useState<AddToNavbarConfig>({
    enabled: false,
    menuKey: "resources",
    categoryId: "resources",
    groupTitle: "News & Press",
    badge: "",
  });
  const [originalSlug, setOriginalSlug] = useState<string>("");

  const handleOpenEdit = (item: FormattedNewsArticle) => {
    setActiveLocale("en");
    setEditingNews({
      ...item,
      content: normalizeToHtml(item.content),
    });
    setOriginalSlug(item.slug);
    setNavbarConfig({
      enabled: false,
      menuKey: "resources",
      categoryId: "resources",
      groupTitle: "News & Press",
      badge: "",
      oldHref: `/news/${item.slug}`,
    });
    setIsNew(false);
    setFeedback(null);
  };

  const handleOpenNew = () => {
    setActiveLocale("en");
    setOriginalSlug("");
    setEditingNews({
      slug: "",
      title: "",
      category: "Company News",
      excerpt: "",
      content: `<h2>Official Announcement</h2><p>MATII TECHNOLOGIES announces...</p><h3>Strategic Milestones</h3><p>Key highlights and architectural benefits include:</p><ul><li>Enterprise deployment speed increase</li><li>Next-generation real-time telemetry</li></ul>`,
      source: "Matii Press",
      sourceUrl: "https://matiitechnologies.com",
      coverImage: "/images/solutions-1.png",
      readTime: "3 min read",
      isFeatured: false,
      isPublished: true,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "Matii, News, Architecture, AI",
    });
    setNavbarConfig({
      enabled: false,
      menuKey: "resources",
      categoryId: "resources",
      groupTitle: "News & Press",
      badge: "",
    });
    setIsNew(true);
    setFeedback(null);
  };

  const handleClose = () => {
    setEditingNews(null);
    setIsNew(false);
    setOriginalSlug("");
    setActiveLocale("en");
  };

  const getNewsTranslatedField = (field: "title" | "excerpt" | "content", locale: string): string => {
    if (locale === "en") {
      return (editingNews as any)?.[field] || "";
    }
    return editingNews?.translations?.[locale]?.[field] || "";
  };

  const setNewsTranslatedField = (field: "title" | "excerpt" | "content", value: string, locale: string) => {
    if (locale === "en") {
      setEditingNews((prev) => (prev ? { ...prev, [field]: value } : null));
      return;
    }
    setEditingNews((prev) => {
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

  const handleCopyNewsFromSource = (targetLocale: string) => {
    if (targetLocale === "en" || !editingNews) return;
    setEditingNews((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        translations: {
          ...(prev.translations || {}),
          [targetLocale]: {
            title: prev.title || "",
            excerpt: prev.excerpt || "",
            content: prev.content || "",
          },
        },
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?.slug || !editingNews?.title || !editingNews?.content) return;

    const normalizedContent = normalizeToHtml(editingNews.content);
    const calculatedReadTime = getWordAndCharStats(normalizedContent).readTime;

    startTransition(async () => {
      try {
        await saveNewsAction({
          id: editingNews.id,
          slug: editingNews.slug!,
          title: editingNews.title!,
          category: editingNews.category || "Company News",
          excerpt: editingNews.excerpt || "",
          content: normalizedContent,
          source: editingNews.source || undefined,
          sourceUrl: editingNews.sourceUrl || undefined,
          coverImage: editingNews.coverImage || "/images/solutions-1.png",
          readTime: editingNews.readTime || calculatedReadTime,
          isFeatured: Boolean(editingNews.isFeatured),
          isPublished: Boolean(editingNews.isPublished ?? true),
          seoTitle: editingNews.seoTitle || undefined,
          seoDescription: editingNews.seoDescription || undefined,
          seoKeywords: editingNews.seoKeywords || undefined,
          translations: editingNews.translations,
          navbarIntegration: navbarConfig.enabled ? navbarConfig : undefined,
        });

        setFeedback("News dispatch saved and published successfully!");
        setTimeout(() => setFeedback(null), 4000);
        handleClose();
      } catch (err) {
        console.error("Failed to save news:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this news dispatch?")) return;

    startTransition(async () => {
      try {
        await deleteNewsAction(id);
        setNewsList((prev) => prev.filter((n) => n.id !== id));
        setFeedback("News dispatch deleted successfully!");
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        console.error("Failed to delete news:", err);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#16181b] p-6 border border-zinc-200/80 dark:border-white/10 shadow-sm relative">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] dark:text-white tracking-tight">
            Newsroom &amp; Press Dispatches Studio
          </h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Publish official company announcements, funding rounds, and release updates with rich media and live SEO.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-zinc-950 text-xs font-space font-bold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03] dark:text-black" />
          <span>New Dispatch</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>{feedback}</span>
        </div>
      ) : null}

      <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse font-inter text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/10 font-space text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              <th className="p-4">Headline</th>
              <th className="p-4">Category</th>
              <th className="p-4">Source</th>
              <th className="p-4">Date</th>
              <th className="p-4">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
            {newsList.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100">
                    {item.title}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    /news/{item.slug}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-space font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                    {item.category}
                  </span>
                </td>
                <td className="p-4 text-zinc-600 dark:text-zinc-300 font-inter">
                  {item.source || "Matii Press"}
                </td>
                <td className="p-4 text-zinc-400 dark:text-zinc-500 font-space">{item.date}</td>
                <td className="p-4">
                  {item.isFeatured ? (
                    <span className="text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#98ff03] text-black">
                      Top Hero
                    </span>
                  ) : (
                    <span className="text-[10px] font-space text-zinc-400 dark:text-zinc-500">Standard</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/news/${item.slug}`}
                      target="_blank"
                      className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px] transition-colors"
                      title="View Dispatch"
                    >
                      <ExternalLink className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] transition-colors cursor-pointer"
                      title="Edit Dispatch"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-[3px] transition-colors cursor-pointer"
                      title="Delete Dispatch"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Create News Modal */}
      {editingNews ? (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#16181b] border border-zinc-300 dark:border-white/10 w-full max-w-4xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-4 mb-6">
              <div>
                <h3 className="font-space font-medium text-xl text-[#292c2e] dark:text-white">
                  {isNew ? "Create News Dispatch" : `Edit Dispatch: ${editingNews.title}`}
                </h3>
                <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Publish to the official MATII TECHNOLOGIES Press Room.
                </p>
              </div>
              <button
                onClick={handleClose}
                type="button"
                className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px] hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 font-inter text-xs">
              {/* Multi-Language & AI Auto-Translation Switcher */}
              <LanguageTabSelector
                activeLocale={activeLocale}
                onChangeLocale={setActiveLocale}
                translations={editingNews.translations}
                sourceTexts={{
                  title: editingNews.title || "",
                  excerpt: editingNews.excerpt || "",
                  content: editingNews.content || "",
                }}
                onCopyFromSource={handleCopyNewsFromSource}
                onTranslated={(translations) => {
                  setEditingNews((prev) =>
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

              {/* Title and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                    <span>
                      Headline / Title {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} *
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
                    value={getNewsTranslatedField("title", activeLocale)}
                    onChange={(e) => setNewsTranslatedField("title", e.target.value, activeLocale)}
                    placeholder={activeLocale === "en" ? "e.g. MATII TECHNOLOGIES Secures Series A Funding" : `Headline in ${activeLocale.toUpperCase()}...`}
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-sm font-bold text-[#292c2e] dark:text-white focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingNews.slug || ""}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
                      })
                    }
                    placeholder="e.g. Matii-secures-series-a"
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              {/* Category, Source, Source URL, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingNews.category || "Company News"}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Source / Outlet
                  </label>
                  <input
                    type="text"
                    placeholder="Matii Press Room"
                    value={editingNews.source || ""}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        source: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Source URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://techcrunch.com/..."
                    value={editingNews.sourceUrl || ""}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        sourceUrl: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="3 min read"
                    value={editingNews.readTime || ""}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        readTime: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>
                    Lead Summary / Teaser {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={getNewsTranslatedField("excerpt", activeLocale)}
                  onChange={(e) => setNewsTranslatedField("excerpt", e.target.value, activeLocale)}
                  placeholder={activeLocale === "en" ? "Official opening paragraph or press excerpt..." : `Teaser in ${activeLocale.toUpperCase()}...`}
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none leading-relaxed"
                />
              </div>

              {/* Cloudinary Media: Cover Image */}
              <div className="bg-zinc-50/50 dark:bg-white/[0.02] p-4 border border-zinc-200/80 dark:border-white/10 rounded-[4px]">
                <CloudinaryUploadButton
                  label="Press Dispatch Cover Image"
                  hint="Banner image displayed on the newsroom index and social preview cards"
                  value={editingNews.coverImage || ""}
                  onChange={(url) => setEditingNews({ ...editingNews, coverImage: url })}
                  aspectRatio="wide"
                  folder="Matii_news"
                />
              </div>

              {/* Rich Text Editor for Dispatch Content */}
              <div className="space-y-1.5">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>
                    Full Dispatch Content (Rich Text Editor) {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`}
                  </span>
                  <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-500">
                    Supports H2-H4, Code blocks, Lists, Links, Quotes, and Cloudinary Images
                  </span>
                </label>
                <RichTextEditor
                  key={`news-editor-${activeLocale}`}
                  content={getNewsTranslatedField("content", activeLocale)}
                  onChange={(html) => setNewsTranslatedField("content", html, activeLocale)}
                  placeholder={activeLocale === "en" ? "Write the full press dispatch..." : `Dispatch content in ${activeLocale.toUpperCase()}...`}
                />
              </div>

              {/* Dedicated SEO Metadata Section with Live SERP & Social Previews */}
              <SeoMetaFields
                seoTitle={editingNews.seoTitle || ""}
                setSeoTitle={(val) => setEditingNews({ ...editingNews, seoTitle: val })}
                seoDescription={editingNews.seoDescription || ""}
                setSeoDescription={(val) => setEditingNews({ ...editingNews, seoDescription: val })}
                seoKeywords={editingNews.seoKeywords || ""}
                setSeoKeywords={(val) => setEditingNews({ ...editingNews, seoKeywords: val })}
                defaultTitle={editingNews.title || ""}
                defaultDescription={editingNews.excerpt || ""}
                slug={editingNews.slug || ""}
                coverImage={editingNews.coverImage}
                sectionPath="news"
              />

              {/* Add to Navigation Mega Menu */}
              <div className="border-t border-zinc-100 dark:border-white/10 pt-3">
                <AddToNavbarSelector
                  slug={editingNews.slug || ""}
                  title={editingNews.title || ""}
                  contentType="news"
                  value={navbarConfig}
                  onChange={setNavbarConfig}
                  originalSlug={originalSlug}
                />
              </div>

              {/* Feature & Publish Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-100 dark:border-white/10">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingNews.isFeatured ?? false}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="size-4 text-[#292c2e] dark:accent-[#98ff03] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Feature as Lead Top Story Banner
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingNews.isPublished ?? true}
                    onChange={(e) =>
                      setEditingNews({
                        ...editingNews,
                        isPublished: e.target.checked,
                      })
                    }
                    className="size-4 text-[#292c2e] dark:accent-[#98ff03] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Published Live
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-700 dark:text-zinc-200 font-space text-xs uppercase font-medium rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-zinc-950 font-space text-xs uppercase font-bold rounded-[3px] active:scale-[0.96] shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isPending ? "Publishing..." : "Save & Publish Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NewsClientManager;
