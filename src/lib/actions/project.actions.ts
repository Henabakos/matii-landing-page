"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { addLinkToNavbar, removeLinkFromNavbar } from "@/lib/services/navigation.service";

export async function saveProjectAction(data: {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  clientName?: string;
  clientLogoText?: string;
  liveUrl?: string;
  timeline?: string;
  services?: string;
  coverImage?: string;
  challengeParagraphs: string[];
  solutionParagraphs: string[];
  galleryItems: { id: string; title: string; imageUrl: string }[];
  metrics: Record<string, string>;
  isFeatured: boolean;
  isSolutionsBuilt: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
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

  const projectPayload: any = {
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle,
    category: data.category,
    year: data.year,
    clientName: data.clientName || null,
    clientLogoText: data.clientLogoText || null,
    liveUrl: data.liveUrl || null,
    timeline: data.timeline || null,
    services: data.services || null,
    coverImage: data.coverImage || "/images/ai-automation.png",
    challenge: JSON.stringify(data.challengeParagraphs || []),
    solution: JSON.stringify(data.solutionParagraphs || []),
    gallery: JSON.stringify(data.galleryItems || []),
    metrics: JSON.stringify(data.metrics || {}),
    isFeatured: data.isFeatured,
    isSolutionsBuilt: data.isSolutionsBuilt,
    order: Number(data.order || 0),
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
  };

  if (data.seoKeywords && data.seoKeywords.trim()) {
    projectPayload.seoKeywords = data.seoKeywords.trim();
  }

  try {
    if (data.id) {
      await db.project.update({
        where: { id: data.id },
        data: projectPayload,
      });
    } else {
      await db.project.create({
        data: projectPayload,
      });
    }
  } catch (err: any) {
    if (projectPayload.seoKeywords) {
      delete projectPayload.seoKeywords;
      if (data.id) {
        await db.project.update({
          where: { id: data.id },
          data: projectPayload,
        });
      } else {
        await db.project.create({
          data: projectPayload,
        });
      }
    } else {
      throw err;
    }
  }

  if (data.navbarIntegration) {
    try {
      if (data.navbarIntegration.removeIfExists || (!data.navbarIntegration.enabled && data.navbarIntegration.oldHref)) {
        await removeLinkFromNavbar([data.navbarIntegration.oldHref || "", `/projects/${data.slug}`]);
      } else if (data.navbarIntegration.enabled) {
        await addLinkToNavbar({
          oldHref: data.navbarIntegration.oldHref,
          menuKey: data.navbarIntegration.menuKey || "projects",
          categoryTitleOrId: data.navbarIntegration.categoryId || data.category || "Projects",
          groupTitle: data.navbarIntegration.groupTitle || "All Projects",
          title: data.title,
          href: `/projects/${data.slug}`,
          badge: data.navbarIntegration.badge || undefined,
        });
      }
    } catch (navErr) {
      console.warn("Could not synchronize project in navigation:", navErr);
    }
  }

  revalidateTag("projects", "default");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const existing = await db.project.findUnique({ where: { id } });
  if (existing?.slug) {
    try {
      await removeLinkFromNavbar(`/projects/${existing.slug}`);
    } catch {}
  }

  await db.project.delete({ where: { id } });

  revalidateTag("projects", "default");
  revalidatePath("/");
  revalidatePath("/projects");
  if (existing?.slug) {
    revalidatePath(`/projects/${existing.slug}`);
  }
  revalidatePath("/admin/projects");
  return { success: true };
}

export interface SaveProjectCategoryInput {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
}

export async function saveProjectCategoryAction(data: SaveProjectCategoryInput) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const name = data.name.trim();
  if (!name) throw new Error("Category name is required.");

  const slug = (data.slug || name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  if (data.id) {
    const existing = await db.projectCategory.findUnique({ where: { id: data.id } });
    if (existing && existing.name !== name) {
      await db.project.updateMany({
        where: { category: existing.name },
        data: { category: name },
      });
    }

    await db.projectCategory.update({
      where: { id: data.id },
      data: {
        name,
        slug,
        description: data.description || null,
        order: Number(data.order || 0),
        isActive: Boolean(data.isActive ?? true),
      },
    });
  } else {
    await db.projectCategory.upsert({
      where: { name },
      update: {
        slug,
        description: data.description || null,
        order: Number(data.order || 0),
        isActive: Boolean(data.isActive ?? true),
      },
      create: {
        name,
        slug,
        description: data.description || null,
        order: Number(data.order || 0),
        isActive: Boolean(data.isActive ?? true),
      },
    });
  }

  try {
    revalidateTag("projects", "default");
    revalidateTag("project-categories", "default");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  } catch {}

  return { success: true };
}

export async function deleteProjectCategoryAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const category = await db.projectCategory.findUnique({ where: { id } });
  if (!category) return { success: true };

  const count = await db.project.count({ where: { category: category.name } });
  if (count > 0) {
    throw new Error(
      `Cannot delete "${category.name}" because ${count} project(s) are assigned to it. Reassign or delete those projects first.`
    );
  }

  await db.projectCategory.delete({ where: { id } });

  try {
    revalidateTag("projects", "default");
    revalidateTag("project-categories", "default");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  } catch {}

  return { success: true };
}

export async function reorderProjectCategoriesAction(items: { id: string; order: number }[]) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await Promise.all(
    items.map((item) =>
      db.projectCategory.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );

  try {
    revalidateTag("projects", "default");
    revalidateTag("project-categories", "default");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  } catch {}

  return { success: true };
}

