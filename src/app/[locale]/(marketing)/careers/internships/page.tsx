import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import React from "react";
import InternshipsView from "@/components/sections/careers/InternshipsView";


export default async function InternshipsPage({ params }: LocalePageProps) {
  return (<>
    <PageStructuredData path="/careers/internships" locale={(await params).locale} />
    <div className="w-full">
      <InternshipsView />
    </div>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/careers/internships", props);
}
