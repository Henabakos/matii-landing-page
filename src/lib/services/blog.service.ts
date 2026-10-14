import { db } from "@/lib/db";
import { cachedCmsRead } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

export interface FormattedBlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorAvatar: string | null;
  authorRole: string | null;
  coverImage: string;
  readTime: string;
  date: string;
  publishedAt: Date;
  updatedAt?: Date;
  isMainHero: boolean;
  isSideFeatured: boolean;
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  translations?: Record<string, {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
  }>;
}

function formatBlogPost(post: any): FormattedBlogPost {
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  let translations: Record<string, any> = {};
  try {
    translations = post.translations ? (typeof post.translations === "string" ? JSON.parse(post.translations) : post.translations) : {};
  } catch {
    translations = {};
  }

  return {
    ...post,
    date: dateFormatted,
    translations,
  };
}

export const getAllBlogPosts = cachedCmsRead(
  async (): Promise<FormattedBlogPost[]> => {
    const raw = await db.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return raw.map(formatBlogPost);
  },
  ["blogs-all"],
  { tags: ["blogs"], revalidate: 3600 },
  () => fallbackRows("BlogPost").sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()).map(formatBlogPost)
);

export async function getAdminAllBlogPosts(): Promise<FormattedBlogPost[]> {
  const raw = await db.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return raw.map(formatBlogPost);
}

export const getBlogPostBySlug = cachedCmsRead(
  async (slug: string): Promise<FormattedBlogPost | null> => {
    const raw = await db.blogPost.findUnique({
      where: { slug },
    });
    if (!raw || !raw.isPublished) return null;
    return formatBlogPost(raw);
  },
  ["blog-by-slug"],
  { tags: ["blogs"], revalidate: 3600 },
  (slug) => { const row = fallbackRows("BlogPost").find(row => row.slug === slug); return row ? formatBlogPost(row) : null; }
);

export const getRelatedBlogPosts = cachedCmsRead(
  async (category: string, currentSlug: string): Promise<FormattedBlogPost[]> => {
    const raw = await db.blogPost.findMany({
      where: {
        category,
        isPublished: true,
        slug: { not: currentSlug },
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
    });
    return raw.map(formatBlogPost);
  },
  ["blogs-related"],
  { tags: ["blogs"], revalidate: 3600 },
  (category, currentSlug) => fallbackRows("BlogPost").filter(row => row.category === category && row.slug !== currentSlug).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()).slice(0, 3).map(formatBlogPost)
);
