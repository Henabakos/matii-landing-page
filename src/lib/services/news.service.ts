import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

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
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
}

function formatNews(item: any): FormattedNewsArticle {
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(item.publishedAt));

  return {
    ...item,
    date: dateFormatted,
  };
}

export const getAllNewsArticles = unstable_cache(
  async (): Promise<FormattedNewsArticle[]> => {
    const raw = await db.newsArticle.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return raw.map(formatNews);
  },
  ["news-all"],
  { tags: ["news"], revalidate: 3600 }
);

export async function getAdminAllNewsArticles(): Promise<FormattedNewsArticle[]> {
  const raw = await db.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return raw.map(formatNews);
}

export const getFeaturedNews = unstable_cache(
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
  { tags: ["news"], revalidate: 3600 }
);

export const getNewsArticleBySlug = unstable_cache(
  async (slug: string): Promise<FormattedNewsArticle | null> => {
    const raw = await db.newsArticle.findUnique({
      where: { slug },
    });
    if (!raw || !raw.isPublished) return null;
    return formatNews(raw);
  },
  ["news-by-slug"],
  { tags: ["news"], revalidate: 3600 }
);
