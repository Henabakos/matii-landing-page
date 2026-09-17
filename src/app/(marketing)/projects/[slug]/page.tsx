import React from "react";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/pages/ProjectDetailPage";
import { getProjectBySlug } from "@/lib/services/project.service";
import { JsonLd, generateProjectSchema, generateBreadcrumbSchema } from "@/components/common/JsonLd";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Matii Digitals",
      description: "The requested project case study could not be found.",
    };
  }

  const title = project.seoTitle || `${project.title} | Matii Digitals`;
  const description = project.seoDescription || project.subtitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const url = `${siteUrl}/projects/${project.slug}`;

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
          alt: project.title,
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
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const projectUrl = `${siteUrl}/projects/${project.slug}`;

  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.subtitle,
    url: projectUrl,
    image: project.coverImage,
    clientName: project.clientName,
    siteUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Projects", url: `${siteUrl}/projects` },
    { name: project.title, url: projectUrl },
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
        title={project.title}
        subtitle={project.subtitle}
        coverImage={project.coverImage}
        clientName={project.clientName || undefined}
        clientLogoText={project.clientLogoText || undefined}
        liveUrl={project.liveUrl || undefined}
        timeline={project.timeline || undefined}
        services={project.services || undefined}
        challengeParagraphs={project.challengeParagraphs}
        solutionParagraphs={project.solutionParagraphs}
        galleryItems={project.galleryItems}
        resultsProps={resultsProps}
      />
    </>
  );
}
