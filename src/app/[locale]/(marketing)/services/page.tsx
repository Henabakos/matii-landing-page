import Services from "@/components/sections/Services";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import PageHeader from "@/components/common/PageHeader";
import { getTranslations } from "next-intl/server";

export default async function ServicesPage() {
  const t = await getTranslations("pages.services");

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-345 mx-auto space-y-16">
        <PageHeader
          tag={t("tag")}
          title={t("title")}
          description={t("description")}
        />
        <Services />
        <SolutionsWeBuilt />
      </div>
    </div>
  );
}
