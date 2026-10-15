import { renderSocialImage } from "@/lib/social-image";
import { staticSeoPaths, staticPageCopy, type StaticSeoPath } from "@/lib/seo-pages";
import { asLocale } from "@/lib/seo";
import { getPillarBySlug } from "@/data/pillars-data";
import { getPublishedPillar } from "@/lib/services/pillar.service";
import { getProjectBySlug } from "@/lib/services/project.service";
import { getBlogPostBySlug } from "@/lib/services/blog.service";
import { getNewsArticleBySlug } from "@/lib/services/news.service";
import { getJobPositionBySlug } from "@/lib/services/career.service";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { siteConfig } from "@/lib/site-config";
import { isFallbackContent } from "@/lib/services/cms-fallback";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const path = params.get("path") || "/";
  // Use English artwork for Amharic until a licensed Ethiopic font is bundled.
  // This avoids a runtime dependency on a remote font service; metadata stays localized.
  const locale = asLocale(params.get("locale") || "en");
  const artworkLocale = locale === "am" ? "en" : locale;
  let title = "Software Development & Outsourcing Comapny";
  let outage = false;
  try {
    if ((staticSeoPaths as readonly string[]).includes(path)) {
      title = (await staticPageCopy(path as StaticSeoPath, artworkLocale)).title.replace(`${siteConfig.name} | `, "");
    } else {
      const match = /^\/(services|projects|blog|news|careers)\/([a-zA-Z0-9-]{1,180})$/.exec(path);
      if (match) {
        const [, section, slug] = match;
        if (section === "services") {
          const pillar = getPillarBySlug(slug);
          const content = pillar ? await getPublishedPillar(pillar.id, artworkLocale) : null;
          if (content) { title = content.name; outage = isFallbackContent(content); }
        } else {
          const readers = { projects: getProjectBySlug, blog: getBlogPostBySlug, news: getNewsArticleBySlug, careers: getJobPositionBySlug };
          const content = await readers[section as keyof typeof readers](slug);
          if (content) { title = getLocalizedField(content, "title", artworkLocale); outage = isFallbackContent(content); }
        }
      }
    }
    const response = await renderSocialImage(title);
    response.headers.set("Cache-Control", outage ? "no-store" : "public, max-age=300, s-maxage=3600");
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  } catch {
    // A checked-in PNG remains available even if the image renderer is unavailable.
    return Response.redirect(new URL("/social/matii-default.png", siteConfig.url), 307);
  }
}
