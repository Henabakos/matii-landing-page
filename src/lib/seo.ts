import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { isProductionIndexable, normalizeBrandName, siteConfig } from "./site-config";

export const ogLocales: Record<Locale, string> = { en: "en_US", om: "om_ET", am: "am_ET", de: "de_DE", pl: "pl_PL" };
export function asLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale) ? locale as Locale : routing.defaultLocale;
}
export function localizedUrl(path = "/", locale: string = "en"): string {
  const language = asLocale(locale);
  const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${siteConfig.url}${language === "en" ? "" : `/${language}`}${clean || (language === "en" ? "/" : "")}`;
}
export function languageAlternates(path: string, locales: readonly string[] = routing.locales) {
  return Object.fromEntries([...locales.map(locale => [locale, localizedUrl(path, locale)]), ["x-default", localizedUrl(path)]]);
}
export function socialImageUrl(path = "/", locale = "en") {
  return `${siteConfig.url}/social-image?${new URLSearchParams({ path, locale: asLocale(locale), v: "1" })}`;
}
export function absoluteImage(value?: string | null): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, siteConfig.url);
    if (url.protocol !== "https:" || value.startsWith("//")) return undefined;
    return url.href;
  } catch { return undefined; }
}
export function plainDescription(value: string): string {
  return normalizeBrandName(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()).slice(0, 300);
}
export function brandedTitle(value: string): string {
  const title = normalizeBrandName(value).trim();
  // Google already shows the full site name above each result, so inner pages
  // carry only the short brand and keep the title for page-specific keywords.
  return new RegExp(`\\b${siteConfig.shortName}\\b`, "i").test(title) ? title : `${title} | ${siteConfig.shortName}`;
}
type SeoInput = {
  title: string; description: string; path: string; locale: string;
  locales?: readonly string[]; image?: string | null; noindex?: boolean;
  type?: "website" | "article"; publishedTime?: string; modifiedTime?: string;
};
export function buildMetadata(input: SeoInput): Metadata {
  const locale = asLocale(input.locale);
  const locales = input.locales ?? routing.locales;
  // Do not claim English-only CMS content is a translated edition.
  const canonicalLocale = locales.includes(locale) ? locale : "en";
  const url = localizedUrl(input.path, canonicalLocale);
  const title = brandedTitle(input.title);
  const description = plainDescription(input.description);
  const customImage = absoluteImage(input.image);
  const image = customImage || socialImageUrl(input.path, canonicalLocale);
  const index = isProductionIndexable() && !input.noindex;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: languageAlternates(input.path, locales) },
    robots: { index, follow: true, ...(index ? { googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } } : {}) },
    openGraph: {
      title, description, url, siteName: siteConfig.name, type: input.type ?? "website",
      locale: ogLocales[asLocale(canonicalLocale)], alternateLocale: locales.filter(item => item !== canonicalLocale).map(item => ogLocales[asLocale(item)]),
      images: [{ url: image, alt: title, ...(!customImage ? { width: 1200, height: 630, type: "image/png" } : {}) }],
      ...(input.type === "article" ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: title }] },
  };
}

export function publishedLocales(translations: unknown, requiredFields: string[]): Locale[] {
  if (!translations || typeof translations !== "object") return ["en"];
  const values = translations as Record<string, Record<string, unknown>>;
  return routing.locales.filter(locale => locale === "en" || requiredFields.every(field => {
    const value = values[locale]?.[field];
    return typeof value === "string" ? value.trim().length > 0 : Array.isArray(value) && value.length > 0 && value.every(item => typeof item === "string" && item.trim().length > 0);
  }));
}

export function missingMetadata(): Metadata {
  return { title: { absolute: `Page not found | ${siteConfig.name}` }, robots: { index: false, follow: false } };
}
