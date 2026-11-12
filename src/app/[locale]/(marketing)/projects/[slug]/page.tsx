import { cmsMetadata } from "@/lib/seo-cms";
import { missingMetadata, localizedUrl, publishedLocales } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import React from "react";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/pages/ProjectDetailPage";
import { getProjectBySlug, getAllProjects, getProjectResults } from "@/lib/services/project.service";
import { addHeadingAnchors, paragraphsToHtml, sanitizeContent } from "@/lib/content";
import { JsonLd, generateProjectSchema, generateBreadcrumbSchema } from "@/components/common/JsonLd";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return missingMetadata();
  return cmsMetadata(project, "projects", "subtitle", locale, ["title", "subtitle", "challengeParagraphs", "solutionParagraphs"]);
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

  const siteUrl = siteConfig.url;
  const projectUrl = localizedUrl(`/projects/${project.slug}`, publishedLocales(project.translations, ["title", "subtitle", "challengeParagraphs", "solutionParagraphs"]).includes(locale as "en") ? locale : "en");

  const projectSchema = generateProjectSchema({
    title: localizedTitle,
    description: localizedSubtitle,
    url: projectUrl,
    image: project.coverImage,
    clientName: project.clientName,
    siteUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: localizedUrl("/", locale) },
    { name: "Projects", url: localizedUrl("/projects", locale) },
    { name: localizedTitle, url: projectUrl },
  ]);

  const relatedProjects = (await getAllProjects()).filter(p => p.id !== project.id).slice(0, 2).map(p => ({
    id: p.id, slug: p.slug, title: getLocalizedField(p, "title", locale), description: getLocalizedField(p, "subtitle", locale),
    category: p.category, year: p.year, imageUrl: p.coverImage,
    statLabel: p.metrics.stat1Value && p.metrics.stat1Label ? `${p.metrics.stat1Label}: ${p.metrics.stat1Value}` : "",
  }));

  // Legacy rows hold plain-text paragraphs, newer rows rich-text HTML; both render through the same sanitizer.
  const challenge = addHeadingAnchors(sanitizeContent(paragraphsToHtml(localizedChallenge)), "challenge");
  const solution = addHeadingAnchors(sanitizeContent(paragraphsToHtml(localizedSolution)), "solution");

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
        category={getLocalizedField(project, "category", locale) || project.category}
        year={project.year}
        challenge={challenge}
        solution={solution}
        galleryItems={project.galleryItems}
        results={getProjectResults(project.metrics)}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
