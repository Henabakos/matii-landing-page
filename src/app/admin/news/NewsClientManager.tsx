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

interface NewsClientManagerProps {
  initialNews: FormattedNewsArticle[];
}

export function NewsClientManager({ initialNews }: NewsClientManagerProps) {
  const [newsList, setNewsList] = useState<FormattedNewsArticle[]>(initialNews);
  const [editingNews, setEditingNews] = useState<Partial<FormattedNewsArticle> | null>(null);
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
    setOriginalSlug("");
    setEditingNews({
      slug: "",
      title: "",
      category: "Company News",
      excerpt: "",
      content: `<h2>Official Announcement</h2><p>Matii Digitals announces...</p><h3>Strategic Milestones</h3><p>Key highlights and architectural benefits include:</p><ul><li>Enterprise deployment speed increase</li><li>Next-generation real-time telemetry</li></ul>`,
      source: "Matii Press",
      sourceUrl: "https://Matiidigitals.com",
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-zinc-200/80 shadow-sm relative">
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] tracking-tight">
            Newsroom & Press Dispatches Studio
          </h2>
          <p className="font-inter text-xs text-zinc-500 mt-1">
            Publish official company announcements, funding rounds, and release updates with rich media and live SEO.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03]" />
          <span>New Dispatch</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      ) : null}

      <div className="bg-white border border-zinc-200/80 rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse font-inter text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-zinc-200 font-space text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
              <th className="p-4">Headline</th>
              <th className="p-4">Category</th>
              <th className="p-4">Source</th>
              <th className="p-4">Date</th>
              <th className="p-4">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {newsList.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/70 transition-colors">
                <td className="p-4">
                  <div className="font-space font-bold text-sm text-[#292c2e]">
                    {item.title}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400">
                    /news/{item.slug}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-space font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-100 text-zinc-700">
                    {item.category}
                  </span>
                </td>
                <td className="p-4 text-zinc-600 font-inter">
                  {item.source || "Matii Press"}
                </td>
                <td className="p-4 text-zinc-400 font-space">{item.date}</td>
                <td className="p-4">
                  {item.isFeatured ? (
                    <span className="text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#98ff03] text-black">
                      Top Hero
                    </span>
                  ) : (
                    <span className="text-[10px] font-space text-zinc-400">Standard</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/news/${item.slug}`}
                      target="_blank"
                      className="p-1.5 text-zinc-400 hover:text-black rounded-[3px] transition-colors"
                      title="View Dispatch"
                    >
                      <ExternalLink className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-[3px] transition-colors"
                      title="Edit Dispatch"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-[3px] transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-zinc-300 w-full max-w-4xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
              <div>
                <h3 className="font-space font-medium text-xl text-[#292c2e]">
                  {isNew ? "Create News Dispatch" : `Edit Dispatch: ${editingNews.title}`}
                </h3>
                <p className="font-inter text-xs text-zinc-400 mt-0.5">
                  Publish to the official Matii Digitals Press Room.
                </p>
              </div>
              <button
                onClick={handleClose}
                type="button"
                className="p-1.5 text-zinc-400 hover:text-black rounded-[3px] hover:bg-zinc-100 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 font-inter text-xs">
              {/* Title and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingNews.title || ""}
                    onChange={(e) =>
                      setEditingNews({ ...editingNews, title: e.target.value })
                    }
                    placeholder="e.g. Matii Digitals Secures Series A Funding"
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-sm font-bold text-[#292c2e] focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>
              </div>

              {/* Category, Source, Source URL, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
                  Lead Summary / Teaser
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingNews.excerpt || ""}
                  onChange={(e) =>
                    setEditingNews({ ...editingNews, excerpt: e.target.value })
                  }
                  placeholder="Official opening paragraph or press excerpt..."
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none leading-relaxed"
                />
              </div>

              {/* Cloudinary Media: Cover Image */}
              <div className="bg-zinc-50/50 p-4 border border-zinc-200/80 rounded-[4px]">
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
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700 flex items-center justify-between">
                  <span>Full Dispatch Content (Rich Text Editor)</span>
                  <span className="text-[10px] font-normal text-zinc-400">
                    Supports H2-H4, Code blocks, Lists, Links, Quotes, and Cloudinary Images
                  </span>
                </label>
                <RichTextEditor
                  content={editingNews.content || ""}
                  onChange={(html) => setEditingNews({ ...editingNews, content: html })}
                  placeholder="Write the full press dispatch, milestones, quotes from leadership, and technical details..."
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
              <div className="border-t border-zinc-100 pt-3">
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
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-100">
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
                    className="size-4 text-[#292c2e] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="size-4 text-[#292c2e] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700">
                    Published Live
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-space text-xs uppercase font-medium rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-[#292c2e] hover:bg-black text-white font-space text-xs uppercase font-semibold rounded-[3px] active:scale-[0.96] shadow-sm disabled:opacity-50 transition-all cursor-pointer"
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
