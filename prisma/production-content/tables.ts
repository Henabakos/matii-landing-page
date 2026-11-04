// Shared by export-production-content.ts and seed-production.ts.
// "core" files are real site content and are published as written.
// "templates" files are starter records and are always seeded hidden.

export type Group = "core" | "templates";

export type TableConfig = {
  group: Group;
  file: string;
  table: string;
  delegate: string;
  // Fields that identify an existing record; a match is never overwritten.
  keys: string[];
  // Field forced to false for templates so they never appear publicly.
  hiddenFlag?: "isActive" | "isPublished";
};

export const tableConfigs: TableConfig[] = [
  { group: "core", file: "service-pillars.json", table: "ServicePillar", delegate: "servicePillar", keys: ["id"] },
  { group: "core", file: "nav-menus.json", table: "NavMenu", delegate: "navMenu", keys: ["key"] },
  { group: "core", file: "project-categories.json", table: "ProjectCategory", delegate: "projectCategory", keys: ["slug"] },
  { group: "core", file: "kpis.json", table: "Kpi", delegate: "kpi", keys: ["key"] },
  { group: "core", file: "footer.json", table: "FooterContent", delegate: "footerContent", keys: ["id"] },
  { group: "templates", file: "job-positions.json", table: "JobPosition", delegate: "jobPosition", keys: ["slug"], hiddenFlag: "isActive" },
  { group: "templates", file: "blog-posts.json", table: "BlogPost", delegate: "blogPost", keys: ["slug"], hiddenFlag: "isPublished" },
  { group: "templates", file: "news-articles.json", table: "NewsArticle", delegate: "newsArticle", keys: ["slug"], hiddenFlag: "isPublished" },
  { group: "templates", file: "testimonials.json", table: "Testimonial", delegate: "testimonial", keys: ["authorName", "authorRole"], hiddenFlag: "isActive" },
  { group: "templates", file: "partners.json", table: "Partner", delegate: "partner", keys: ["name"], hiddenFlag: "isActive" },
  // Projects have no visibility flag, so this template is only seeded with --with-project-template.
  { group: "templates", file: "projects.json", table: "Project", delegate: "project", keys: ["slug"] },
];

// Columns that store JSON as text. Files keep them as real JSON for easier editing.
export const jsonTextFields = new Set([
  "draft",
  "published",
  "categories",
  "translations",
  "challenge",
  "solution",
  "gallery",
  "metrics",
]);
