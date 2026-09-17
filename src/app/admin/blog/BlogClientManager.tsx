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

interface BlogClientManagerProps {
  initialPosts: FormattedBlogPost[];
}

export function BlogClientManager({ initialPosts }: BlogClientManagerProps) {
  const [posts, setPosts] = useState<FormattedBlogPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Partial<FormattedBlogPost> | null>(null);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-zinc-200/80 shadow-sm relative">
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] tracking-tight">
            Blog Articles & Editorial Studio
          </h2>
          <p className="font-inter text-xs text-zinc-500 mt-1">
            Write rich technical playbooks, manage Cloudinary media, and configure Google SERP metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm cursor-pointer"
        >
          <Plus className="size-4 text-[#98ff03]" />
          <span>Write Article</span>
        </button>
      </div>

      {feedback ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-inter rounded-[4px] flex items-center gap-2">
          <Check className="size-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      ) : null}

      {/* Blog Posts Table */}
      <div className="bg-white border border-zinc-200/80 rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse font-inter text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-zinc-200 font-space text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
              <th className="p-4">Article Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Read Time</th>
              <th className="p-4">Placement</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-50/70 transition-colors">
                <td className="p-4">
                  <div className="font-space font-bold text-sm text-[#292c2e]">
                    {post.title}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400">
                    /blog/{post.slug}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-space font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-100 text-zinc-700">
                    {post.category}
                  </span>
                </td>
                <td className="p-4 font-inter text-zinc-700">
                  {post.authorName}
                </td>
                <td className="p-4 text-zinc-500 font-space tabular-nums">
                  {post.readTime}
                </td>
                <td className="p-4">
                  {post.isMainHero ? (
                    <span className="text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#98ff03] text-black">
                      Main Hero
                    </span>
                  ) : post.isSideFeatured ? (
                    <span className="text-[10px] font-space font-bold uppercase px-2 py-0.5 rounded-[2px] bg-zinc-200 text-zinc-800">
                      Side Feature
                    </span>
                  ) : (
                    <span className="text-[10px] font-space text-zinc-400">Standard Grid</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 text-zinc-400 hover:text-black rounded-[3px] transition-colors"
                      title="View Public Article"
                    >
                      <ExternalLink className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-[3px] transition-colors"
                      title="Edit Article"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-[3px] transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-zinc-300 w-full max-w-4xl p-6 sm:p-8 rounded-[4px] shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
              <div>
                <h3 className="font-space font-medium text-xl text-[#292c2e]">
                  {isNew ? "Write New Blog Article" : `Edit Article: ${editingPost.title}`}
                </h3>
                <p className="font-inter text-xs text-zinc-400 mt-0.5">
                  Publish to the official Matii Digitals engineering & design blog.
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
              {/* Basic Details: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ""}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    placeholder="e.g. Modernizing Microservices with High-Speed Go and Next.js"
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
                    value={editingPost.slug || ""}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
                      })
                    }
                    placeholder="e.g. modernizing-microservices-nextjs"
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>
              </div>

              {/* Meta: Category, Author, Read Time, Author Role */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700">
                  Article Excerpt / Lead Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingPost.excerpt || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  placeholder="Concise, compelling teaser shown on blog archive cards and hero sections..."
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] text-xs text-zinc-800 focus:border-[#292c2e] outline-none leading-relaxed"
                />
              </div>

              {/* Cloudinary Media: Cover Image & Author Avatar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/50 p-4 border border-zinc-200/80 rounded-[4px]">
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
                <label className="font-space text-[11px] uppercase font-bold text-zinc-700 flex items-center justify-between">
                  <span>Article Body (Rich Text Editor)</span>
                  <span className="text-[10px] font-normal text-zinc-400">
                    Supports H2-H4, Code blocks, Lists, Links, Quotes, and Cloudinary Images
                  </span>
                </label>
                <RichTextEditor
                  content={editingPost.content || ""}
                  onChange={(html) => setEditingPost({ ...editingPost, content: html })}
                  placeholder="Start writing the full story, including architecture breakdowns, embedded media, and code snippets..."
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
              <div className="border-t border-zinc-100 pt-3">
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
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-100">
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
                    className="size-4 text-[#292c2e] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="size-4 text-[#292c2e] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700">
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
                    className="size-4 text-[#292c2e] rounded-[2px]"
                  />
                  <span className="font-space text-[11px] uppercase font-bold text-zinc-700">
                    Published Live
                  </span>
                </label>
              </div>

              {/* Actions Footer */}
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
