import { asLocale, buildMetadata } from "./seo";
import { routing } from "@/i18n/routing";
import { siteConfig } from "./site-config";

export const staticSeoPaths = ["/", "/about", "/services", "/projects", "/blog", "/news", "/contact", "/careers", "/careers/internships", "/careers/talent-pool"] as const;
export type StaticSeoPath = typeof staticSeoPaths[number];
export type LocalePageProps = { params: Promise<{ locale: string }> };

// These three page bodies currently have English copy, not translated editions.
export function staticPageLocales(path: string): readonly string[] {
  return ["/news", "/careers/internships", "/careers/talent-pool"].includes(path) ? ["en"] : routing.locales;
}
export async function staticPageCopy(path: StaticSeoPath, requestedLocale: string) {
  const locale = staticPageLocales(path).includes(requestedLocale) ? asLocale(requestedLocale) : "en";
  const messages = (await import(`../messages/${locale}.json`)).default;
  const special: Partial<Record<StaticSeoPath, { title: string; description: string }>> = {
    "/news": { title: "Company News & Updates", description: "Read published company announcements, product releases, and engineering updates from MATII TECHNOLOGIES." },
    "/careers/internships": { title: "Engineering Internships & Fellowships", description: "Explore the MATII TECHNOLOGIES fellowship for aspiring engineers, researchers, and designers building production systems with experienced architects." },
    "/careers/talent-pool": { title: "Join Our Talent Pool", description: "Share your engineering, design, or research experience with MATII TECHNOLOGIES for consideration as future project teams and roles open." },
  };
  if (special[path]) return special[path]!;
  if (path === "/") return locale === "en"
    ? { title: `${siteConfig.name} | Software & Digital Solutions`, description: "MATII TECHNOLOGIES develops enterprise software, modern digital platforms, and innovative technology solutions for businesses." }
    : { title: messages.hero.headline, description: messages.hero.subtitle };
  const key = path.slice(1);
  if (locale === "en" && path === "/services") return { title: "Our Services", description: "Explore enterprise systems and fintech engineering, business process outsourcing, AI and data platforms, and managed cloud services from MATII TECHNOLOGIES." };
  const englishTitles: Partial<Record<StaticSeoPath, string>> = { "/projects": "Our Projects", "/about": "About Us", "/contact": "Contact Us" };
  if (locale === "en" && englishTitles[path]) return { title: englishTitles[path]!, description: messages.pages[key].description };
  return { title: messages.nav[key], description: messages.pages[key].description };
}
export async function staticPageMetadata(path: StaticSeoPath, { params }: LocalePageProps) {
  const { locale } = await params;
  return buildMetadata({ ...await staticPageCopy(path, locale), path, locale, locales: staticPageLocales(path) });
}
