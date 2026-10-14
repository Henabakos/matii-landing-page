import { cmsMetadata } from "@/lib/seo-cms";
import { missingMetadata } from "@/lib/seo";
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
  if (!job) return missingMetadata();
  return cmsMetadata(job, "careers", "shortDescription", locale, ["title", "shortDescription", "content"]);
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
