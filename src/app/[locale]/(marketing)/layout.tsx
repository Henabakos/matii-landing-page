import { JsonLd, generateOrganizationSchema, generateWebsiteSchema } from "@/components/common/JsonLd";
import { siteConfig } from "@/lib/site-config";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllNavMenus } from "@/lib/services/navigation.service";
import MarketingSharedSections from "@/components/layout/MarketingSharedSections";



export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const navMenus = await getAllNavMenus();

  return (
    <div className="min-h-screen text-[#292c2e] dark:text-[#ededed]">
      <JsonLd data={generateOrganizationSchema(siteConfig.url)} />
      <JsonLd data={generateWebsiteSchema()} />
      <Header initialMenus={navMenus} />
      <main id="main-content">{children}</main>
      <MarketingSharedSections />
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
