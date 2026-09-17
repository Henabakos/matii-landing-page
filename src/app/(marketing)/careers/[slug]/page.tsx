import React from "react";
import { notFound } from "next/navigation";
import CareerDetailView from "@/components/sections/careers/CareerDetailView";
import { getJobPositionBySlug } from "@/lib/services/career.service";
import type { Metadata } from "next";

type CareerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobPositionBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found | Matii Digitals Careers",
      description: "The requested job position could not be found or is no longer active.",
    };
  }

  const title = job.seoTitle || `${job.title} | Careers at Matii Digitals`;
  const description = job.seoDescription || job.shortDescription;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const url = `${siteUrl}/careers/${job.slug}`;

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
  const { slug } = await params;
  const job = await getJobPositionBySlug(slug);

  if (!job) {
    notFound();
  }

  return <CareerDetailView job={job} slug={slug} />;
}
