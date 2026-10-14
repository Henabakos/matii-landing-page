import { db } from "@/lib/db";
import { cachedCmsRead } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

export interface ParsedProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  clientName: string | null;
  clientLogoText: string | null;
  liveUrl: string | null;
  timeline: string | null;
  services: string | null;
  coverImage: string;
  challengeParagraphs: string[];
  solutionParagraphs: string[];
  galleryItems: { id: string; title: string; imageUrl: string }[];
  metrics: Record<string, string>;
  isFeatured: boolean;
  isSolutionsBuilt: boolean;
  order: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  translations?: Record<string, {
    title?: string;
    subtitle?: string;
    category?: string;
    challengeParagraphs?: string[];
    solutionParagraphs?: string[];
  }>;
  createdAt: Date;
  updatedAt: Date;
}

function parseProjectFields(project: any): ParsedProject {
  let challengeParagraphs: string[] = [];
  let solutionParagraphs: string[] = [];
  let galleryItems: { id: string; title: string; imageUrl: string }[] = [];
  let metrics: Record<string, string> = {};
  let translations: Record<string, any> = {};

  try {
    challengeParagraphs = JSON.parse(project.challenge || "[]");
  } catch {
    challengeParagraphs = [project.challenge];
  }

  try {
    solutionParagraphs = JSON.parse(project.solution || "[]");
  } catch {
    solutionParagraphs = [project.solution];
  }

  try {
    galleryItems = JSON.parse(project.gallery || "[]");
  } catch {
    galleryItems = [];
  }

  try {
    metrics = JSON.parse(project.metrics || "{}");
  } catch {
    metrics = {};
  }

  try {
    translations = project.translations ? (typeof project.translations === "string" ? JSON.parse(project.translations) : project.translations) : {};
  } catch {
    translations = {};
  }

  return {
    ...project,
    challengeParagraphs,
    solutionParagraphs,
    galleryItems,
    metrics,
    translations,
  };
}

export const getAllProjects = cachedCmsRead(
  async (): Promise<ParsedProject[]> => {
    const raw = await db.project.findMany({
      orderBy: { order: "asc" },
    });
    return raw.map(parseProjectFields);
  },
  ["projects-all"],
  { tags: ["projects"], revalidate: 3600 },
  () => fallbackRows("Project").sort((a, b) => a.order - b.order).map(parseProjectFields)
);

export async function getAdminAllProjects(): Promise<ParsedProject[]> {
  const raw = await db.project.findMany({ orderBy: { order: "asc" } });
  return raw.map(parseProjectFields);
}

export const getSolutionsBuiltProjects = cachedCmsRead(
  async (): Promise<ParsedProject[]> => {
    const raw = await db.project.findMany({
      where: { isSolutionsBuilt: true },
      orderBy: { order: "asc" },
    });
    return raw.map(parseProjectFields);
  },
  ["projects-solutions-built"],
  { tags: ["projects"], revalidate: 3600 },
  () => fallbackRows("Project").filter(row => row.isSolutionsBuilt).sort((a, b) => a.order - b.order).map(parseProjectFields)
);

export const getProjectBySlug = cachedCmsRead(
  async (slug: string): Promise<ParsedProject | null> => {
    const raw = await db.project.findUnique({
      where: { slug },
    });
    if (!raw) return null;
    return parseProjectFields(raw);
  },
  ["project-by-slug"],
  { tags: ["projects"], revalidate: 3600 },
  (slug) => { const row = fallbackRows("Project").find(row => row.slug === slug); return row ? parseProjectFields(row) : null; }
);

export interface FormattedProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  isActive: boolean;
  projectCount?: number;
}

export const getAllProjectCategories = cachedCmsRead(
  async (): Promise<FormattedProjectCategory[]> => {
    const categories = await db.projectCategory.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    // Compute project counts dynamically for each active category
    const counts = await Promise.all(
      categories.map(async (cat) => {
        const count = await db.project.count({
          where: { category: cat.name },
        });
        return { ...cat, projectCount: count };
      })
    );

    return counts;
  },
  ["project-categories-all"],
  { tags: ["project-categories"], revalidate: 3600 },
  () => fallbackRows("ProjectCategory").sort((a, b) => a.order - b.order).map(row => ({ ...row, projectCount: fallbackRows("Project").filter(project => project.category === row.name).length }))
);

export async function getAdminAllProjectCategories(): Promise<FormattedProjectCategory[]> {
  const categories = await db.projectCategory.findMany({
    orderBy: { order: "asc" },
  });

  const counts = await Promise.all(
    categories.map(async (cat) => {
      const count = await db.project.count({
        where: { category: cat.name },
      });
      return { ...cat, projectCount: count };
    })
  );

  return counts;
}
