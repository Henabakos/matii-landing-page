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
    "/news": { title: "Company News & Product Announcements", description: "Company announcements, product releases, partnerships, and engineering milestones from our team in Addis Ababa." },
    "/careers/internships": { title: "Software Engineering Internships & Fellowships", description: "A hands-on fellowship for aspiring engineers, researchers, and designers who want to build production software alongside experienced architects." },
    "/careers/talent-pool": { title: "Join Our Talent Pool for Future Tech Roles", description: "Share your engineering, design, or research experience and be considered first when new project teams and roles open." },
  };
  if (special[path]) return special[path]!;
  if (path === "/") return locale === "en"
    ? { title: `${siteConfig.name} | Software, AI & BPO Company in Ethiopia`, description: "Ethiopian technology company building enterprise and core banking software, AI and data platforms, BPO operations, and managed cloud services for banks, government, and growing businesses." }
    : { title: messages.hero.headline, description: messages.hero.subtitle };
  const key = path.slice(1);
  // English titles lead with the search terms each page should rank for.
  const english: Partial<Record<StaticSeoPath, { title: string; description?: string }>> = {
    "/about": { title: `About ${siteConfig.name} – Ethiopian Software Company` },
    "/services": { title: "Enterprise Software, AI, BPO & Cloud Services", description: "Four service lines under one team: enterprise and fintech software engineering, business process outsourcing, AI and data platforms, and managed cloud infrastructure." },
    "/projects": { title: "Case Studies: Enterprise, Fintech & AI Projects" },
    "/blog": { title: "Software Engineering & AI Insights Blog" },
    "/contact": { title: "Contact Our Engineering Team" },
    "/careers": { title: "Careers – Tech Jobs in Addis Ababa" },
  };
  if (locale === "en" && english[path]) return { title: english[path]!.title, description: english[path]!.description ?? messages.pages[key].description };
  return { title: messages.nav[key], description: messages.pages[key].description };
}
export async function staticPageMetadata(path: StaticSeoPath, { params }: LocalePageProps) {
  const { locale } = await params;
  return buildMetadata({ ...await staticPageCopy(path, locale), path, locale, locales: staticPageLocales(path) });
}
