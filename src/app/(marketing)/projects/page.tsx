import React from "react";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";

export const metadata = {
  title: "Projects | Motion Digitals",
  description: "Explore our featured projects and digital solutions built across diverse industries.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full">
      <SolutionsWeBuilt />
    </main>
  );
}
