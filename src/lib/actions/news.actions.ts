"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { sanitizeContent, normalizeToHtml } from "@/lib/content";
import { addLinkToNavbar, removeLinkFromNavbar } from "@/lib/services/navigation.service";

export async function saveNewsAction(data: {
  id?: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  source?: string;
  sourceUrl?: string;
  coverImage: string;
  readTime: string;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  translations?: Record<string, any>;
  navbarIntegration?: {
    enabled: boolean;
    menuKey: string;
    categoryId: string;
    groupTitle: string;
    badge?: string;
    oldHref?: string;
    removeIfExists?: boolean;
  };
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const newsPayload: any = {
    slug: data.slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    content: sanitizeContent(normalizeToHtml(data.content)),
    source: data.source || "Matii Press Room",
    sourceUrl: data.sourceUrl || null,
    coverImage: data.coverImage || "/images/solutions-1.png",
    readTime: data.readTime || "3 min read",
    isFeatured: data.isFeatured,
    isPublished: data.isPublished,
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    translations: data.translations ? JSON.stringify(data.translations) : null,
  };

  if (data.seoKeywords && data.seoKeywords.trim()) {
    newsPayload.seoKeywords = data.seoKeywords.trim();
  }

  try {
    if (data.id) {
      await db.newsArticle.update({
        where: { id: data.id },
        data: newsPayload,
      });
    } else {
      await db.newsArticle.create({
        data: newsPayload,
      });
    }
  } catch (err: any) {
    if (newsPayload.seoKeywords) {
      delete newsPayload.seoKeywords;
      if (data.id) {
        await db.newsArticle.update({
          where: { id: data.id },
          data: newsPayload,
        });
      } else {
        await db.newsArticle.create({
          data: newsPayload,
        });
      }
    } else {
      throw err;
    }
  }

  if (data.navbarIntegration) {
    try {
      if (data.navbarIntegration.removeIfExists || (!data.navbarIntegration.enabled && data.navbarIntegration.oldHref)) {
        await removeLinkFromNavbar([data.navbarIntegration.oldHref || "", `/news/${data.slug}`]);
      } else if (data.navbarIntegration.enabled) {
        await addLinkToNavbar({
          oldHref: data.navbarIntegration.oldHref,
          menuKey: data.navbarIntegration.menuKey || "resources",
          categoryTitleOrId: data.navbarIntegration.categoryId || "resources",
          groupTitle: data.navbarIntegration.groupTitle || "News & Press",
          title: data.title,
          href: `/news/${data.slug}`,
          badge: data.navbarIntegration.badge || undefined,
        });
      }
    } catch (navErr) {
      console.warn("Could not synchronize news article into navigation:", navErr);
    }
  }

  revalidateTag("news", "default");
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath(`/news/${data.slug}`);
  revalidatePath("/admin/news");
  return { success: true };
}

export async function deleteNewsAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const existing = await db.newsArticle.findUnique({ where: { id } });
  if (existing?.slug) {
    try {
      await removeLinkFromNavbar(`/news/${existing.slug}`);
    } catch {}
  }

  await db.newsArticle.delete({ where: { id } });

  revalidateTag("news", "default");
  revalidatePath("/");
  revalidatePath("/news");
  if (existing?.slug) {
    revalidatePath(`/news/${existing.slug}`);
  }
  revalidatePath("/admin/news");
  return { success: true };
}
