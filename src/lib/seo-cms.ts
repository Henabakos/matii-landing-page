import type { PillarContent, PillarLocale } from "./pillars/schema";
import { currentTranslation } from "./pillars/translations";
import { routing } from "@/i18n/routing";
import { buildMetadata, publishedLocales } from "./seo";
import { getLocalizedField } from "./i18n-helpers";
import { isFallbackContent } from "./services/cms-fallback";

export function pillarLocales(content: PillarContent) {
  return routing.locales.filter(locale => locale === "en" || ["name", "description", "headline"].every(key => {
    const translation = content.translations?.[locale as PillarLocale];
    return translation && currentTranslation(translation, key, content[key as "name" | "description" | "headline"]);
  }));
}

type SeoRecord = {
  excerpt?: string; subtitle?: string; shortDescription?: string;
  title: string; slug: string; seoTitle?: string | null; seoDescription?: string | null;
  coverImage?: string; publishedAt?: Date; updatedAt?: Date;
  translations?: Record<string, Record<string, unknown>>;
};
export function cmsMetadata(record: SeoRecord, section: string, descriptionField: "excerpt" | "subtitle" | "shortDescription", locale: string, requiredFields: string[]) {
  const title = locale === "en" ? record.seoTitle || record.title : getLocalizedField(record, "title", locale);
  const description = locale === "en" && record.seoDescription ? record.seoDescription : getLocalizedField(record, descriptionField, locale);
  return buildMetadata({ title, description, path: `/${section}/${record.slug}`, locale,
    locales: publishedLocales(record.translations, requiredFields),
    noindex: isFallbackContent(record),
    // Existing approved uploads are supported; generated cards are the default.
    image: record.coverImage?.startsWith("https://") ? record.coverImage : undefined,
    type: ["blog", "news"].includes(section) ? "article" : "website",
    publishedTime: record.publishedAt ? new Date(record.publishedAt).toISOString() : undefined,
    modifiedTime: record.updatedAt ? new Date(record.updatedAt).toISOString() : undefined,
  });
}
