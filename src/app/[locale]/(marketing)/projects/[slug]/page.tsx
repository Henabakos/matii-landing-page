import React from "react";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/pages/ProjectDetailPage";
import { getProjectBySlug } from "@/lib/services/project.service";
import { JsonLd, generateProjectSchema, generateBreadcrumbSchema } from "@/components/common/JsonLd";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Matii Digitals",
      description: "The requested project case study could not be found.",
    };
  }

  const localizedTitle = getLocalizedField(project, "title", locale);
  const localizedSubtitle = getLocalizedField(project, "subtitle", locale);

  const title = project.seoTitle || `${localizedTitle} | Matii Digitals`;
  const description = project.seoDescription || localizedSubtitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const url = `${siteUrl}/${locale !== "en" ? `${locale}/` : ""}projects/${project.slug}`;

  return {
    title,
    description,
    keywords: project.seoKeywords ? project.seoKeywords.split(",").map((k) => k.trim()) : undefined,
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
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: localizedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const localizedTitle = getLocalizedField(project, "title", locale);
  const localizedSubtitle = getLocalizedField(project, "subtitle", locale);
  const localizedChallenge = getLocalizedField(project, "challengeParagraphs", locale) || project.challengeParagraphs;
  const localizedSolution = getLocalizedField(project, "solutionParagraphs", locale) || project.solutionParagraphs;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const projectUrl = `${siteUrl}/${locale !== "en" ? `${locale}/` : ""}projects/${project.slug}`;

  const projectSchema = generateProjectSchema({
    title: localizedTitle,
    description: localizedSubtitle,
    url: projectUrl,
    image: project.coverImage,
    clientName: project.clientName,
    siteUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Projects", url: `${siteUrl}/projects` },
    { name: localizedTitle, url: projectUrl },
  ]);

  const resultsProps = {
    demoClickGrowth: project.metrics.demoClickGrowth || "13.2",
    higherEngagement: project.metrics.higherEngagement || "42",
    pipelineInfluence: project.metrics.pipelineInfluence || "$80K",
    qualifiedLeads: project.metrics.qualifiedLeads || "77",
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProjectDetailPage
        slug={project.slug}
        title={localizedTitle}
        subtitle={localizedSubtitle}
        coverImage={project.coverImage}
        clientName={project.clientName || undefined}
        clientLogoText={project.clientLogoText || undefined}
        liveUrl={project.liveUrl || undefined}
        timeline={project.timeline || undefined}
        services={project.services || undefined}
        challengeParagraphs={Array.isArray(localizedChallenge) ? localizedChallenge : [localizedChallenge]}
        solutionParagraphs={Array.isArray(localizedSolution) ? localizedSolution : [localizedSolution]}
        galleryItems={project.galleryItems}
        resultsProps={resultsProps}
      />
    </>
  );
}
