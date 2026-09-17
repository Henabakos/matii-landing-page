import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { getAllNavMenus } from "@/lib/services/navigation.service";
import { defaultNavMenus } from "@/data/navigation-data";

export const metadata: Metadata = {
  title: "Matii Digitals",
  description: "A marketing site built with Next.js.",
};

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const navMenus = await getAllNavMenus().catch(() => defaultNavMenus);

  return (
    <div className="min-h-screen text-[#292c2e] dark:text-[#ededed]">
      <Header initialMenus={navMenus} />
      <main>{children}</main>
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  );
}
