import React from "react";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Matii Digitals",
    url: siteUrl,
    logo: `${siteUrl}/images/about-illustration.png`,
    sameAs: [
      "https://instagram.com",
      "https://t.me",
      "https://tiktok.com",
      "https://youtube.com",
    ],
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
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Matii Digitals",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/about-illustration.png`,
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
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    datePublished: datePublished,
    publisher: {
      "@type": "Organization",
      name: "Matii Digitals",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/about-illustration.png`,
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
  clientName,
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
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    url: url,
    creator: {
      "@type": "Organization",
      name: "Matii Digitals",
    },
    ...(clientName ? { sponsor: { "@type": "Organization", name: clientName } } : {}),
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
