import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

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
  createdAt: Date;
  updatedAt: Date;
}

function parseProjectFields(project: any): ParsedProject {
  let challengeParagraphs: string[] = [];
  let solutionParagraphs: string[] = [];
  let galleryItems: { id: string; title: string; imageUrl: string }[] = [];
  let metrics: Record<string, string> = {};

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

  return {
    ...project,
    challengeParagraphs,
    solutionParagraphs,
    galleryItems,
    metrics,
  };
}

export const getAllProjects = unstable_cache(
  async (): Promise<ParsedProject[]> => {
    const raw = await db.project.findMany({
      orderBy: { order: "asc" },
    });
    return raw.map(parseProjectFields);
  },
  ["projects-all"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getSolutionsBuiltProjects = unstable_cache(
  async (): Promise<ParsedProject[]> => {
    const raw = await db.project.findMany({
      where: { isSolutionsBuilt: true },
      orderBy: { order: "asc" },
    });
    return raw.map(parseProjectFields);
  },
  ["projects-solutions-built"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<ParsedProject | null> => {
    const raw = await db.project.findUnique({
      where: { slug },
    });
    if (!raw) return null;
    return parseProjectFields(raw);
  },
  ["project-by-slug"],
  { tags: ["projects"], revalidate: 3600 }
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

export const getAllProjectCategories = unstable_cache(
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
  { tags: ["project-categories"], revalidate: 3600 }
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

