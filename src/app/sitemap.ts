import type { MetadataRoute } from "next";
import { staticSeoPaths, staticPageLocales } from "@/lib/seo-pages";
import { languageAlternates, localizedUrl, publishedLocales } from "@/lib/seo";
import { pillarLocales } from "@/lib/seo-cms";
import { getAllProjects } from "@/lib/services/project.service";
import { getAllBlogPosts } from "@/lib/services/blog.service";
import { getAllNewsArticles } from "@/lib/services/news.service";
import { getAllJobPositions } from "@/lib/services/career.service";
import { getPublishedPillar } from "@/lib/services/pillar.service";
import { isFallbackContent } from "@/lib/services/cms-fallback";
import { PILLARS_LIST } from "@/data/pillars-data";
import { isProductionIndexable } from "@/lib/site-config";

// Cache the published queries, not a partially generated sitemap after an outage.
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProductionIndexable()) return [];
  const entries: MetadataRoute.Sitemap = [];
  function add(path: string, locales: readonly string[], updatedAt?: Date) {
    const date = updatedAt ? new Date(updatedAt) : undefined;
    for (const locale of locales) entries.push({
      url: localizedUrl(path, locale),
      alternates: { languages: languageAlternates(path, locales) },
      ...(date && !Number.isNaN(date.getTime()) ? { lastModified: date } : {}),
    });
  }
  for (const path of staticSeoPaths) add(path, staticPageLocales(path));
  const [projects, blogs, news, jobs, pillars] = await Promise.all([
    getAllProjects(), getAllBlogPosts(), getAllNewsArticles(), getAllJobPositions(),
    Promise.all(PILLARS_LIST.map(async pillar => ({ pillar, content: await getPublishedPillar(pillar.id) }))),
  ]);
  for (const row of projects) if (!isFallbackContent(row)) add(`/projects/${row.slug}`, publishedLocales(row.translations, ["title", "subtitle", "challengeParagraphs", "solutionParagraphs"]), row.updatedAt);
  for (const row of blogs) if (!isFallbackContent(row)) add(`/blog/${row.slug}`, publishedLocales(row.translations, ["title", "excerpt", "content"]), row.updatedAt);
  for (const row of news) if (!isFallbackContent(row)) add(`/news/${row.slug}`, publishedLocales(row.translations, ["title", "excerpt", "content"]), row.updatedAt);
  for (const row of jobs) if (!isFallbackContent(row)) add(`/careers/${row.slug}`, publishedLocales(row.translations, ["title", "shortDescription", "content"]), row.updatedAt);
  // Draft updates do not supply a service page lastmod. Aliases are not canonical URLs.
  for (const { pillar, content } of pillars) if (content && !content.seo.noindex && !isFallbackContent(content)) add(`/services/${pillar.slug}`, pillarLocales(content));
  return entries;
}
