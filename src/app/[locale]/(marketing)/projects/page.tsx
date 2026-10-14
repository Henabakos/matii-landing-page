import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import React from "react";
import ProjectsSection from "@/components/sections/project/ProjectsSection";
import { getAllProjects, getAllProjectCategories } from "@/lib/services/project.service";


export default async function ProjectsPage({ params }: LocalePageProps) {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getAllProjectCategories(),
  ]);

  return (<>
    <PageStructuredData path="/projects" locale={(await params).locale} />
    <div className="w-full">
      <ProjectsSection
        initialProjects={projects}
        initialCategories={categories}
      />
    </div>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/projects", props);
}
