import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import React from "react";
import TalentPoolView from "@/components/sections/careers/TalentPoolView";


export default async function TalentPoolPage({ params }: LocalePageProps) {
  return (<>
    <PageStructuredData path="/careers/talent-pool" locale={(await params).locale} />
    <div className="w-full">
      <TalentPoolView />
    </div>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/careers/talent-pool", props);
}
