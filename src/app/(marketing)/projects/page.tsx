import React from "react";
import ProjectsSection from "@/components/sections/project/ProjectsSection";
import { getAllProjects, getAllProjectCategories } from "@/lib/services/project.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Engineering Case Studies | Matii Digitals",
  description:
    "Explore our featured projects, AI platforms, and enterprise digital solutions built across diverse industries.",
  openGraph: {
    title: "Projects & Engineering Case Studies | Matii Digitals",
    description:
      "Explore our featured projects, AI platforms, and enterprise digital solutions built across diverse industries.",
    images: ["/images/ai-automation.png"],
  },
};

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects().catch(() => []),
    getAllProjectCategories().catch(() => []),
  ]);

  return (
    <main className="w-full">
      <ProjectsSection
        initialProjects={projects}
        initialCategories={categories}
      />
    </main>
  );
}
