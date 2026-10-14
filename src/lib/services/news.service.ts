import { db } from "@/lib/db";
import { cachedCmsRead } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

export interface FormattedNewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  source: string | null;
  sourceUrl: string | null;
  coverImage: string;
  readTime: string;
  date: string;
  publishedAt: Date;
  updatedAt?: Date;
  isFeatured: boolean;
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

function formatNews(item: any): FormattedNewsArticle {
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(item.publishedAt));

  let translations: Record<string, any> = {};
  try {
    translations = item.translations ? (typeof item.translations === "string" ? JSON.parse(item.translations) : item.translations) : {};
  } catch {
    translations = {};
  }

  return {
    ...item,
    date: dateFormatted,
    translations,
  };
}

export const getAllNewsArticles = cachedCmsRead(
  async (): Promise<FormattedNewsArticle[]> => {
    const raw = await db.newsArticle.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return raw.map(formatNews);
  },
  ["news-all"],
  { tags: ["news"], revalidate: 3600 },
  () => fallbackRows("NewsArticle").sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()).map(formatNews)
);

export async function getAdminAllNewsArticles(): Promise<FormattedNewsArticle[]> {
  const raw = await db.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return raw.map(formatNews);
}

export const getFeaturedNews = cachedCmsRead(
  async (): Promise<FormattedNewsArticle | null> => {
    const raw = await db.newsArticle.findFirst({
      where: { isFeatured: true, isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    if (!raw) {
      const fallback = await db.newsArticle.findFirst({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
      });
      return fallback ? formatNews(fallback) : null;
    }
    return formatNews(raw);
  },
  ["news-featured"],
  { tags: ["news"], revalidate: 3600 },
  () => { const rows = fallbackRows("NewsArticle").sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()); const row = rows.find(row => row.isFeatured) ?? rows[0]; return row ? formatNews(row) : null; }
);

export const getNewsArticleBySlug = cachedCmsRead(
  async (slug: string): Promise<FormattedNewsArticle | null> => {
    const raw = await db.newsArticle.findUnique({
      where: { slug },
    });
    if (!raw || !raw.isPublished) return null;
    return formatNews(raw);
  },
  ["news-by-slug"],
  { tags: ["news"], revalidate: 3600 },
  (slug) => { const row = fallbackRows("NewsArticle").find(row => row.slug === slug); return row ? formatNews(row) : null; }
);
