import React from "react";
import { getAdminAllProjects, getAdminAllProjectCategories } from "@/lib/services/project.service";
import ProjectClientManager from "./ProjectClientManager";

export const metadata = {
  title: "Projects & Case Studies Manager | Matii CMS",
};

export default async function AdminProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAdminAllProjects(),
    getAdminAllProjectCategories(),
  ]);

  return (
    <ProjectClientManager
      initialProjects={projects}
      initialCategories={categories}
    />
  );
}
