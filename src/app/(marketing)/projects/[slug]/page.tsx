import React from "react";
import ProjectDetailPage from "@/components/pages/ProjectDetailPage";

export const metadata = {
  title: "Project Showcase | Motion Digitals",
  description: "Detailed case study and showcase of our engineering and design work.",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}
