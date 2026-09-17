import React from "react";
import CareersSection from "@/components/sections/careers/CareersSection";
import { getAllJobPositions } from "@/lib/services/career.service";

export const metadata = {
  title: "Careers & Open Positions | Matii Digitals",
  description: "Join our world-class engineering, AI, and design studio solving high-impact architectural challenges.",
};

export default async function CareersPage() {
  const jobs = await getAllJobPositions();

  return (
    <main className="w-full">
      <CareersSection initialJobs={jobs} />
    </main>
  );
}
