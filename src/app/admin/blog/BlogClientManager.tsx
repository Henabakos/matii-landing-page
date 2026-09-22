"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Check, X, ExternalLink, BookOpen } from "lucide-react";
import { saveBlogPostAction, deleteBlogPostAction } from "@/lib/actions/blog.actions";
import type { FormattedBlogPost } from "@/lib/services/blog.service";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { SeoMetaFields } from "@/components/admin/SeoMetaFields";
import { normalizeToHtml, getWordAndCharStats } from "@/lib/content";
import { AddToNavbarSelector, AddToNavbarConfig } from "@/components/admin/AddToNavbarSelector";
import { LanguageTabSelector } from "@/components/admin/LanguageTabSelector";

interface BlogClientManagerProps {
  initialPosts: FormattedBlogPost[];
}

export function BlogClientManager({ initialPosts }: BlogClientManagerProps) {
  const [posts, setPosts] = useState<FormattedBlogPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Partial<FormattedBlogPost> | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  // Navbar Integration State
  const [navbarConfig, setNavbarConfig] = useState<AddToNavbarConfig>({
    enabled: false,
    menuKey: "resources",
    categoryId: "resources",
    groupTitle: "Blog & Insights",
    badge: "",
  });
  const [originalSlug, setOriginalSlug] = useState<string>("");

  const handleOpenEdit = (post: FormattedBlogPost) => {
    setActiveLocale("en");
    setEditingPost({
      ...post,
      content: normalizeToHtml(post.content),
    });
    setOriginalSlug(post.slug);
    setNavbarConfig({
      enabled: false,
      menuKey: "resources",
      categoryId: "resources",
      groupTitle: "Blog & Insights",
      badge: "",
      oldHref: `/blog/${post.slug}`,
    });
    setIsNew(false);
    setFeedback(null);
  };

  const handleOpenNew = () => {
    setActiveLocale("en");
    setOriginalSlug("");
    setEditingPost({
      slug: "",
      title: "",
      category: "Engineering",
      excerpt: "",
      content: `<h2>Executive Summary</h2><p>Provide the strategic overview and key insights for this article...</p><h3>Technical Architecture</h3><p>Detail the implementation, code choices, and performance metrics.</p>`,
      authorName: "Matii Engineering Team",
      authorRole: "Core Architect",
      authorAvatar: "/images/about-illustration.png",
      coverImage: "/images/about-illustration.png",
      readTime: "5 min read",
      isMainHero: false,
      isSideFeatured: false,
      isPublished: true,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "Next.js, Architecture, High Performance",
    });
    setNavbarConfig({
      enabled: false,
      menuKey: "resources",
      categoryId: "resources",
      groupTitle: "Blog & Insights",
      badge: "",
    });
    setIsNew(true);
    setFeedback(null);
  };

  const handleClose = () => {
    setEditingPost(null);
    setIsNew(false);
    setOriginalSlug("");
    setActiveLocale("en");
  };

  const getBlogTranslatedField = (field: "title" | "excerpt" | "content", locale: string): string => {
    if (locale === "en") {
      return (editingPost as any)?.[field] || "";
    }
    return editingPost?.translations?.[locale]?.[field] || "";
  };

  const setBlogTranslatedField = (field: "title" | "excerpt" | "content", value: string, locale: string) => {
    if (locale === "en") {
      setEditingPost((prev) => (prev ? { ...prev, [field]: value } : null));
      return;
    }
    setEditingPost((prev) => {
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

  const handleCopyBlogFromSource = (targetLocale: string) => {
    if (targetLocale === "en" || !editingPost) return;
    setEditingPost((prev) => {
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
    if (!editingPost?.slug || !editingPost?.title || !editingPost?.content) return;

    const normalizedContent = normalizeToHtml(editingPost.content);
    const calculatedReadTime = getWordAndCharStats(normalizedContent).readTime;

    startTransition(async () => {
      try {
        await saveBlogPostAction({
          id: editingPost.id,
          slug: editingPost.slug!,
          title: editingPost.title!,
          category: editingPost.category || "Engineering",
          excerpt: editingPost.excerpt || "",
          content: normalizedContent,
          authorName: editingPost.authorName || "Matii Engineering Team",
          authorRole: editingPost.authorRole || undefined,
          authorAvatar: editingPost.authorAvatar || undefined,
          coverImage: editingPost.coverImage || "/images/about-illustration.png",
          readTime: editingPost.readTime || calculatedReadTime,
          isMainHero: Boolean(editingPost.isMainHero),
          isSideFeatured: Boolean(editingPost.isSideFeatured),
          isPublished: Boolean(editingPost.isPublished ?? true),
          seoTitle: editingPost.seoTitle || undefined,
          seoDescription: editingPost.seoDescription || undefined,
          seoKeywords: editingPost.seoKeywords || undefined,
          translations: editingPost.translations,
          navbarIntegration: navbarConfig.enabled ? navbarConfig : undefined,
        });

        setFeedback("Blog article saved and revalidated successfully!");
        setTimeout(() => setFeedback(null), 4000);
        handleClose();
      } catch (err) {
        console.error("Failed to save blog post:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    startTransition(async () => {
      try {
        await deleteBlogPostAction(id);
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setFeedback("Blog post deleted successfully!");
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        console.error("Failed to delete blog post:", err);
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
            Blog Articles &amp; Editorial Studio
          </h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Write rich technical playbooks, manage Cloudinary media, and configure Google SERP metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#86e200] text-white dark:text-zinc-950 text-xs font-space font-bold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03] dark:text-black" />
          <span>Write Article</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>{feedback}</span>
        </div>
      ) : null}

      {/* Blog Posts Table */}
      <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse font-inter text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/10 font-space text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              <th className="p-4">Article Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Read Time</th>
              <th className="p-4">Placement</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100">
                    {post.title}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    /blog/{post.slug}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-space font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                    {post.category}
                  </span>
                </td>
                <td className="p-4 font-inter text-zinc-700 dark:text-zinc-300">
                  {post.authorName}
                </td>
                <td className="p-4 text-zinc-500 dark:text-zinc-400 font-space tabular-nums">
                  {post.readTime}
                </td>
                <td className="p-4">
                  {post.isMainHero ? (
                    <span className="text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#98ff03] text-black">
                      Main Hero
                    </span>
                  ) : post.isSideFeatured ? (
                    <span className="text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-200 dark:bg-white/10 text-zinc-800 dark:text-zinc-200">
                      Side Feature
                    </span>
                  ) : (
                    <span className="text-[10px] font-space text-zinc-400 dark:text-zinc-500">Standard Grid</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white rounded-[3px] transition-colors"
                      title="View Public Article"
                    >
                      <ExternalLink className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] transition-colors"
                      title="Edit Article"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-[3px] transition-colors"
                      title="Delete Article"
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

      {/* Edit / Create Blog Post Modal */}
      {editingPost ? (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#16181b] border border-zinc-300 dark:border-white/10 w-full max-w-4xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-4 mb-6">
              <div>
                <h3 className="font-space font-medium text-xl text-[#292c2e] dark:text-white">
                  {isNew ? "Write New Blog Article" : `Edit Article: ${editingPost.title}`}
                </h3>
                <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Publish to the official Matii Digitals engineering &amp; design blog.
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
                translations={editingPost.translations}
                sourceTexts={{
                  title: editingPost.title || "",
                  excerpt: editingPost.excerpt || "",
                  content: editingPost.content || "",
                }}
                onCopyFromSource={handleCopyBlogFromSource}
                onTranslated={(translations) => {
                  setEditingPost((prev) =>
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

              {/* Basic Details: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                    <span>
                      Article Title {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`} *
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
                    value={getBlogTranslatedField("title", activeLocale)}
                    onChange={(e) => setBlogTranslatedField("title", e.target.value, activeLocale)}
                    placeholder={activeLocale === "en" ? "e.g. Modernizing Microservices with High-Speed Go and Next.js" : `Article Title in ${activeLocale.toUpperCase()}...`}
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
                    value={editingPost.slug || ""}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
                      })
                    }
                    placeholder="e.g. modernizing-microservices-nextjs"
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              {/* Meta: Category, Author, Read Time, Author Role */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.category || "Engineering"}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.authorName || ""}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        authorName: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Author Role
                  </label>
                  <input
                    type="text"
                    placeholder="Core Architect"
                    value={editingPost.authorRole || ""}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        authorRole: e.target.value,
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
                    placeholder="5 min read"
                    value={editingPost.readTime || ""}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
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
                    Article Excerpt / Lead Summary {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={getBlogTranslatedField("excerpt", activeLocale)}
                  onChange={(e) => setBlogTranslatedField("excerpt", e.target.value, activeLocale)}
                  placeholder={activeLocale === "en" ? "Concise, compelling teaser shown on blog archive cards and hero sections..." : `Excerpt in ${activeLocale.toUpperCase()}...`}
                  className="w-full bg-white dark:bg-[#121417] border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-800 dark:text-zinc-100 focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none leading-relaxed"
                />
              </div>

              {/* Cloudinary Media: Cover Image & Author Avatar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/50 dark:bg-white/[0.02] p-4 border border-zinc-200/80 dark:border-white/10 rounded-[4px]">
                <CloudinaryUploadButton
                  label="Article Hero Cover Image"
                  hint="High-resolution banner displayed in header and social cards"
                  value={editingPost.coverImage || ""}
                  onChange={(url) => setEditingPost({ ...editingPost, coverImage: url })}
                  aspectRatio="wide"
                  folder="Matii_blogs"
                />

                <CloudinaryUploadButton
                  label="Author Profile Avatar"
                  hint="Square headshot or avatar displayed beside author byline"
                  value={editingPost.authorAvatar || ""}
                  onChange={(url) => setEditingPost({ ...editingPost, authorAvatar: url })}
                  aspectRatio="square"
                  folder="Matii_authors"
                />
              </div>

              {/* Rich Text Editor for Article Body */}
              <div className="space-y-1.5">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>
                    Article Body (Rich Text Editor) {activeLocale !== "en" && `(${activeLocale.toUpperCase()})`}
                  </span>
                  <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-500">
                    Supports H2-H4, Code blocks, Lists, Links, Quotes, and Cloudinary Images
                  </span>
                </label>
                <RichTextEditor
                  key={`blog-editor-${activeLocale}`}
                  content={getBlogTranslatedField("content", activeLocale)}
                  onChange={(html) => setBlogTranslatedField("content", html, activeLocale)}
                  placeholder={activeLocale === "en" ? "Start writing the full story..." : `Article content in ${activeLocale.toUpperCase()}...`}
                />
              </div>

              {/* Dedicated SEO Metadata Section with Live SERP & Social Previews */}
              <SeoMetaFields
                seoTitle={editingPost.seoTitle || ""}
                setSeoTitle={(val) => setEditingPost({ ...editingPost, seoTitle: val })}
                seoDescription={editingPost.seoDescription || ""}
                setSeoDescription={(val) => setEditingPost({ ...editingPost, seoDescription: val })}
                seoKeywords={editingPost.seoKeywords || ""}
                setSeoKeywords={(val) => setEditingPost({ ...editingPost, seoKeywords: val })}
                defaultTitle={editingPost.title || ""}
                defaultDescription={editingPost.excerpt || ""}
                slug={editingPost.slug || ""}
                coverImage={editingPost.coverImage}
                sectionPath="blog"
              />

              {/* Add to Navigation Mega Menu */}
              <div className="border-t border-zinc-100 dark:border-white/10 pt-3">
                <AddToNavbarSelector
                  slug={editingPost.slug || ""}
                  title={editingPost.title || ""}
                  contentType="blog"
                  value={navbarConfig}
                  onChange={setNavbarConfig}
                  originalSlug={originalSlug}
                />
              </div>

              {/* Placement & Status Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-100 dark:border-white/10">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingPost.isMainHero ?? false}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        isMainHero: e.target.checked,
                      })
                    }
                    className="size-4 text-[#292c2e] dark:accent-[#98ff03] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Featured as Main Blog Hero
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingPost.isSideFeatured ?? false}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        isSideFeatured: e.target.checked,
                      })
                    }
                    className="size-4 text-[#292c2e] dark:accent-[#98ff03] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Side Featured List
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingPost.isPublished ?? true}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
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

              {/* Actions Footer */}
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
                  {isPending ? "Saving Article..." : "Save & Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BlogClientManager;
