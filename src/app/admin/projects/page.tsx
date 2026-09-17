import React from "react";
import { getAllProjects, getAdminAllProjectCategories } from "@/lib/services/project.service";
import ProjectClientManager from "./ProjectClientManager";

export const metadata = {
  title: "Projects & Case Studies Manager | Matii CMS",
};

export default async function AdminProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getAdminAllProjectCategories(),
  ]);

  return (
    <ProjectClientManager
      initialProjects={projects}
      initialCategories={categories}
    />
  );
}
