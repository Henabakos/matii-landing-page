import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import React from "react";
import CareersSection from "@/components/sections/careers/CareersSection";
import { getAllJobPositions } from "@/lib/services/career.service";


export default async function CareersPage({ params }: LocalePageProps) {
  const jobs = await getAllJobPositions();

  return (<>
    <PageStructuredData path="/careers" locale={(await params).locale} />
    <div className="w-full">
      <CareersSection initialJobs={jobs} />
    </div>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/careers", props);
}
