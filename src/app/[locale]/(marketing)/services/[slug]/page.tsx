import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PillarDetailPage from "@/components/pages/PillarDetailPage";
import { getPillarBySlug, PILLARS_LIST } from "@/data/pillars-data";
import { SERVICE_DETAIL_CONTENT } from "@/data/service-detail-content";

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return PILLARS_LIST.flatMap((p) => [
    { slug: p.slug },
    ...p.aliases.map((alias) => ({ slug: alias })),
  ]);
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const content = SERVICE_DETAIL_CONTENT[pillar.id];
  const title = `${content.name} | Matii Digitals`;
  const description = content.intro;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const url = `${siteUrl}/${locale !== "en" ? `${locale}/` : ""}services/${pillar.slug}`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      pillar.shortTitle,
      "Enterprise Engineering",
      "Matii Technologies",
      ...pillar.techStack.slice(0, 5),
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: pillar.bgImage,
          width: 1200,
          height: 630,
          alt: pillar.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pillar.bgImage],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  return <PillarDetailPage pillar={pillar} />;
}
