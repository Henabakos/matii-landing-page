import type { BlogPost, JobPosition, Kpi, NavMenu, NewsArticle, Partner, Project, ProjectCategory, Testimonial } from "@prisma/client";
import snapshot from "@/data/cms-fallback.json";

type Content = {
  BlogPost: BlogPost[]; JobPosition: JobPosition[]; Kpi: Kpi[]; NavMenu: NavMenu[];
  NewsArticle: NewsArticle[]; Partner: Partner[]; Project: Project[];
  ProjectCategory: ProjectCategory[]; Testimonial: Testimonial[];
};

// The export script normalizes Prisma booleans and dates; revive dates on the server.
export function fallbackRows<Key extends keyof Content>(key: Key): Content[Key] {
  const rows = snapshot[key].map(row => Object.fromEntries(
    Object.entries(row).map(([field, value]) => [
      field, ["createdAt", "updatedAt", "publishedAt"].includes(field) && typeof value === "string" ? new Date(value) : value,
    ]),
  ));
  return rows as Content[Key];
}
