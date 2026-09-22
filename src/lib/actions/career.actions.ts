"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

function safeRevalidate(slug?: string) {
  try {
    revalidateTag("careers", "default");
    revalidateTag("career-by-slug", "default");
    revalidatePath("/careers");
    if (slug) revalidatePath(`/careers/${slug}`);
    revalidatePath("/admin/careers");
    revalidatePath("/admin");
  } catch {}
}

export interface SaveJobPositionInput {
  id?: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  shortDescription: string;
  content: string;
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  translations?: Record<string, any>;
}

export async function saveJobPositionAction(data: SaveJobPositionInput) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const normalizedSlug = (data.slug || data.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  if (!normalizedSlug || !data.title || !data.content) {
    throw new Error("Title, slug, and content are required.");
  }

  const payload: any = {
    slug: normalizedSlug,
    title: data.title,
    department: data.department || "Engineering",
    location: data.location || "Addis Ababa, Ethiopia / Remote",
    type: data.type || "Full-Time",
    experience: data.experience || "3+ Years",
    salary: data.salary || "Competitive",
    shortDescription: data.shortDescription || "",
    content: data.content,
    order: Number(data.order || 0),
    isActive: Boolean(data.isActive ?? true),
    isFeatured: Boolean(data.isFeatured ?? false),
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    seoKeywords: data.seoKeywords || null,
    translations: data.translations ? JSON.stringify(data.translations) : null,
  };

  if (data.id) {
    await db.jobPosition.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.jobPosition.create({
      data: payload,
    });
  }

  safeRevalidate(normalizedSlug);
  return { success: true, slug: normalizedSlug };
}

export async function deleteJobPositionAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.jobPosition.delete({ where: { id } });
  safeRevalidate();
  return { success: true };
}

export interface SubmitApplicationInput {
  jobId?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  coverNote?: string;
}

export async function submitJobApplicationAction(data: SubmitApplicationInput) {
  if (!data.fullName || !data.email) {
    return { error: "Full Name and Email Address are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: "Please provide a valid email address." };
  }

  const created = await db.jobApplication.create({
    data: {
      jobId: data.jobId || null,
      jobTitle: data.jobTitle || "General Application",
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      resumeUrl: data.resumeUrl?.trim() || null,
      portfolioUrl: data.portfolioUrl?.trim() || null,
      linkedinUrl: data.linkedinUrl?.trim() || null,
      coverNote: data.coverNote?.trim() || null,
      status: "NEW",
    },
  });

  safeRevalidate();
  return { success: true, applicationId: created.id };
}

export async function updateJobApplicationStatusAction(id: string, status: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.jobApplication.update({
    where: { id },
    data: { status },
  });

  safeRevalidate();
  return { success: true };
}

export async function deleteJobApplicationAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.jobApplication.delete({ where: { id } });
  safeRevalidate();
  return { success: true };
}
