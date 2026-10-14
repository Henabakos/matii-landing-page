import { JsonLd, generateBreadcrumbSchema } from "./JsonLd";
import { staticPageCopy, staticPageLocales, type StaticSeoPath } from "@/lib/seo-pages";
import { localizedUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export default async function PageStructuredData({ path, locale }: { path: StaticSeoPath; locale: string }) {
  const language = staticPageLocales(path).includes(locale) ? locale : "en";
  const { title, description } = await staticPageCopy(path, language);
  const url = localizedUrl(path, language);
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": path === "/contact" ? "ContactPage" : path === "/about" ? "AboutPage" : "WebPage",
      "@id": `${url}#webpage`, url, name: title, description, inLanguage: language,
      isPartOf: { "@id": `${siteConfig.url}/#website` }, about: { "@id": `${siteConfig.url}/#organization` } }} />
    {path !== "/" && <JsonLd data={generateBreadcrumbSchema([{ name: siteConfig.shortName, url: localizedUrl("/", language) }, { name: title, url }])} />}
  </>;
}
