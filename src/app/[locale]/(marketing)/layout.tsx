import { JsonLd, generateOrganizationSchema, generateWebsiteSchema } from "@/components/common/JsonLd";
import { siteConfig } from "@/lib/site-config";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { getAllNavMenus } from "@/lib/services/navigation.service";



export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const navMenus = await getAllNavMenus();

  return (
    <div className="min-h-screen text-[#292c2e] dark:text-[#ededed]">
      <JsonLd data={generateOrganizationSchema(siteConfig.url)} />
      <JsonLd data={generateWebsiteSchema()} />
      <Header initialMenus={navMenus} />
      <main id="main-content">{children}</main>
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  );
}
