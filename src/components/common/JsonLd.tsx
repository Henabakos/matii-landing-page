import React from "react";
import { siteConfig } from "@/lib/site-config";
import { absoluteImage } from "@/lib/seo";
import type { PillarContent } from "@/lib/pillars/schema";
import { routing } from "@/i18n/routing";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export function generateOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.logo}`,
    description: siteConfig.description,
    ...(siteConfig.socialProfiles.length ? { sameAs: siteConfig.socialProfiles } : {}),
    address: { "@type": "PostalAddress", addressCountry: "ET" },
    knowsAbout: ["Enterprise software", "Fintech engineering", "Artificial intelligence", "Data platforms", "Business process outsourcing", "Managed cloud services"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: `${siteUrl}/contact`,
    },
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  authorName,
  siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  authorName: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: absoluteImage(image),
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateNewsSchema({
  title,
  description,
  url,
  image,
  datePublished,
  siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: absoluteImage(image),
    datePublished: datePublished,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateProjectSchema({
  title,
  description,
  url,
  image,
  siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  clientName?: string | null;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    headline: title,
    description: description,
    image: absoluteImage(image),
    url: url,
    creator: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
    },

  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(content: PillarContent, url: string, locale: string) {
  return {
    "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`,
    name: content.name, description: content.description, url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url, inLanguage: locale },
  };
}
export function generateWebsiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteConfig.url}/#website`,
    url: `${siteConfig.url}/`, name: siteConfig.name, alternateName: [siteConfig.shortName, ...siteConfig.alternateNames],
    inLanguage: routing.locales, publisher: { "@id": `${siteConfig.url}/#organization` } };
}
// The FAQ section renders this same English copy on every locale.
export function generateFaqSchema(items: { question: string; answer: string }[], url: string) {
  return { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: "en",
    mainEntity: items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}
