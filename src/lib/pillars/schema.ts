import { z } from "zod";

export const pillarIdSchema = z.enum(["enterprise", "bpo", "ai", "cloud"]);
const text = z.string().trim().min(1).max(12000);
const lines = z.array(text).max(80);
const url = z.string().max(2048).refine(value => /^\/(?!\/)[^\s\\]*$/.test(value) || /^https:\/\/[^\s\\]+$/.test(value), "Use a local path or an HTTPS URL.");
export const pillarLocaleSchema = z.enum(["om", "am", "de", "pl"]);
const translationFields = z.record(z.string().max(240), z.string().max(12000)).refine(value => Object.keys(value).length <= 6000, "Too many translation fields.");
export const pillarTranslationSchema = z.object({ source: translationFields, fields: translationFields });
export const pillarContentSchema = z.object({
  name: text,
  listing: z.object({ title: text, description: text, items: lines }),
  headline: text, description: text, outcome: text,
  portfolioHeading: text, portfolioDescription: text,
  products: z.array(z.object({
    id: z.string().regex(/^[a-z0-9-]+$/).max(80),
    name: text, category: text, description: text,
    tags: lines, capabilities: lines.min(1), imageSrc: url,
    demoUrl: url,
    icon: z.enum(["Cable", "Database", "Search", "ChartNoAxesCombined", "Network", "FlaskConical", "Cpu", "Workflow", "PanelsTopLeft"]),
    wide: z.boolean(),
    group: z.enum(["foundation", "insights", "development"]).optional(),
  })).min(1).max(40).refine(items => new Set(items.map(item => item.id)).size === items.length, "Product IDs must be unique."),
  process: z.array(z.object({ title: text, description: text })).min(1).max(12),
  faqs: z.array(z.object({ question: text, answer: text })).max(40),
  techStack: lines,
  overview: z.object({ visible: z.boolean().default(false), positioning: text, example: text, applications: text, workflow: lines.min(1) }).optional(),
  seo: z.object({ title: z.string().max(200), description: z.string().max(500), image: url, noindex: z.boolean().optional() }),
  translations: z.object({
    om: pillarTranslationSchema.optional(), am: pillarTranslationSchema.optional(),
    de: pillarTranslationSchema.optional(), pl: pillarTranslationSchema.optional(),
  }).optional(),
});
export type PillarContent = z.infer<typeof pillarContentSchema>;
export type PillarId = z.infer<typeof pillarIdSchema>;
export type PillarLocale = z.infer<typeof pillarLocaleSchema>;
