import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import Services from "@/components/sections/Services";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import PageHeader from "@/components/common/PageHeader";
import { getTranslations } from "next-intl/server";
import { getSolutionsBuiltProjects } from "@/lib/services/project.service";

export default async function ServicesPage({ params }: LocalePageProps) {
  const t = await getTranslations("pages.services");
  const projects = await getSolutionsBuiltProjects();

  return (<>
    <PageStructuredData path="/services" locale={(await params).locale} />
    <div className="w-full px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-345 mx-auto space-y-16">
        <PageHeader
          tag={t("tag")}
          title={t("title")}
          description={t("description")}
        />
        <Services />
        <SolutionsWeBuilt projects={projects} />
      </div>
    </div>
  </>);
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/services", props);
}
