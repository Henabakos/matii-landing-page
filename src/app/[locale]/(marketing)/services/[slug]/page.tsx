import { buildMetadata, missingMetadata, localizedUrl } from "@/lib/seo";
import { pillarLocales } from "@/lib/seo-cms";
import { isFallbackContent } from "@/lib/services/cms-fallback";
import { JsonLd, generateServiceSchema, generateBreadcrumbSchema } from "@/components/common/JsonLd";
import React from "react";
import { getPublishedPillar } from "@/lib/services/pillar.service";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PillarDetailPage from "@/components/pages/PillarDetailPage";
import { getPillarBySlug, PILLARS_LIST } from "@/data/pillars-data";

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return PILLARS_LIST.flatMap((p) => [
    { slug: p.slug },
    ...p.aliases.map((alias) => ({ slug: alias })),
  ]);
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return missingMetadata();
  const [source, content] = await Promise.all([getPublishedPillar(pillar.id), getPublishedPillar(pillar.id, locale)]);
  if (!source || !content) return missingMetadata();
  return buildMetadata({ title: content.seo.title || content.name,
    description: content.seo.description || content.description,
    path: `/services/${pillar.slug}`, locale, locales: pillarLocales(source),
    noindex: isFallbackContent(content) || content.seo.noindex,
    image: content.seo.image !== pillar.bgImage ? content.seo.image : undefined,
  });
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { locale, slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const content = await getPublishedPillar(pillar.id, locale);
  if (!content) notFound();
  const published = await Promise.all(PILLARS_LIST.map(async p => {
    const item = await getPublishedPillar(p.id, locale);
    return item ? [{ id: p.id, slug: p.slug, shortTitle: item.listing.title }] : [];
  }));
  const related = published.flat();
  const source = await getPublishedPillar(pillar.id);
  const canonicalLocale = source && pillarLocales(source).includes(locale as "en") ? locale : "en";
  const url = localizedUrl(`/services/${pillar.slug}`, canonicalLocale);
  return <>
    <JsonLd data={generateServiceSchema(content, url, canonicalLocale)} />
    <JsonLd data={generateBreadcrumbSchema([
      { name: "Home", url: localizedUrl("/", locale) },
      { name: "Services", url: localizedUrl("/services", locale) },
      { name: content.name, url },
    ])} />
    <PillarDetailPage pillar={pillar} content={content} related={related} />
  </>;
}
