import React from "react";
import ProjectsSection from "@/components/sections/project/ProjectsSection";

export const metadata = {
  title: "Projects | Motion Digitals",
  description:
    "Explore our featured projects and digital solutions built across diverse industries.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full">
      <ProjectsSection />
    </main>
  );
}
