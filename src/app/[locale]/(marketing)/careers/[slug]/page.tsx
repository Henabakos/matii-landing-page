import React from "react";
import { notFound } from "next/navigation";
import CareerDetailView from "@/components/sections/careers/CareerDetailView";
import { getJobPositionBySlug } from "@/lib/services/career.service";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { Metadata } from "next";

type CareerDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: CareerDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const job = await getJobPositionBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found | Matii Digitals Careers",
      description: "The requested job position could not be found or is no longer active.",
    };
  }

  const localizedTitle = getLocalizedField(job, "title", locale);
  const localizedDesc = getLocalizedField(job, "shortDescription", locale);

  const title = job.seoTitle || `${localizedTitle} | Careers at Matii Digitals`;
  const description = job.seoDescription || localizedDesc;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const url = `${siteUrl}/${locale !== "en" ? `${locale}/` : ""}careers/${job.slug}`;

  return {
    title,
    description,
    keywords: job.seoKeywords ? job.seoKeywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { locale, slug } = await params;
  const job = await getJobPositionBySlug(slug);

  if (!job) {
    notFound();
  }

  const localizedJob = {
    ...job,
    title: getLocalizedField(job, "title", locale),
    department: getLocalizedField(job, "department", locale),
    location: getLocalizedField(job, "location", locale),
    type: getLocalizedField(job, "type", locale),
    experience: getLocalizedField(job, "experience", locale),
    salary: getLocalizedField(job, "salary", locale),
    shortDescription: getLocalizedField(job, "shortDescription", locale),
    content: getLocalizedField(job, "content", locale),
  };

  return <CareerDetailView job={localizedJob} slug={slug} />;
}
