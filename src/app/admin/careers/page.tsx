import React from "react";
import { getAdminAllJobPositions, getAdminAllApplications } from "@/lib/services/career.service";
import CareerClientManager from "./CareerClientManager";

export const metadata = {
  title: "Careers & Applications CMS | Matii CMS",
};

export default async function AdminCareersPage() {
  const [jobs, applications] = await Promise.all([
    getAdminAllJobPositions(),
    getAdminAllApplications(),
  ]);

  return (
    <CareerClientManager
      initialJobs={jobs}
      initialApplications={applications}
    />
  );
}
