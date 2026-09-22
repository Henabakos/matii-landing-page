"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { sanitizeContent, normalizeToHtml } from "@/lib/content";
import { addLinkToNavbar, removeLinkFromNavbar } from "@/lib/services/navigation.service";

export async function saveBlogPostAction(data: {
  id?: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  coverImage: string;
  readTime: string;
  isMainHero: boolean;
  isSideFeatured: boolean;
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

  const postPayload: any = {
    slug: data.slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    content: sanitizeContent(normalizeToHtml(data.content)),
    authorName: data.authorName || "Matii Editorial",
    authorRole: data.authorRole || "Product Lead",
    authorAvatar: data.authorAvatar || "/images/about-illustration.png",
    coverImage: data.coverImage || "/images/about-illustration.png",
    readTime: data.readTime || "5 min read",
    isMainHero: data.isMainHero,
    isSideFeatured: data.isSideFeatured,
    isPublished: data.isPublished,
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    seoKeywords: data.seoKeywords || null,
    translations: data.translations ? JSON.stringify(data.translations) : null,
  };

  if (data.id) {
    await db.blogPost.update({
      where: { id: data.id },
      data: postPayload,
    });
  } else {
    await db.blogPost.create({
      data: postPayload,
    });
  }

  if (data.navbarIntegration) {
    try {
      if (data.navbarIntegration.removeIfExists || (!data.navbarIntegration.enabled && data.navbarIntegration.oldHref)) {
        await removeLinkFromNavbar([data.navbarIntegration.oldHref || "", `/blog/${data.slug}`]);
      } else if (data.navbarIntegration.enabled) {
        await addLinkToNavbar({
          oldHref: data.navbarIntegration.oldHref,
          menuKey: data.navbarIntegration.menuKey || "resources",
          categoryTitleOrId: data.navbarIntegration.categoryId || "resources",
          groupTitle: data.navbarIntegration.groupTitle || "Blog & Insights",
          title: data.title,
          href: `/blog/${data.slug}`,
          badge: data.navbarIntegration.badge || undefined,
        });
      }
    } catch (navErr) {
      console.warn("Could not synchronize blog into navigation:", navErr);
    }
  }

  revalidateTag("blogs", "default");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/admin/blog");
  return { success: true };
}

export async function deleteBlogPostAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const existing = await db.blogPost.findUnique({ where: { id } });
  if (existing?.slug) {
    try {
      await removeLinkFromNavbar(`/blog/${existing.slug}`);
    } catch {}
  }

  await db.blogPost.delete({ where: { id } });

  revalidateTag("blogs", "default");
  revalidatePath("/");
  revalidatePath("/blog");
  if (existing?.slug) {
    revalidatePath(`/blog/${existing.slug}`);
  }
  revalidatePath("/admin/blog");
  return { success: true };
}
