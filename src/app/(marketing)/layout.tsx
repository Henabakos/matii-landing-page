import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Motion Digitals",
  description: "A marketing site built with Next.js.",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  text-zinc-900">
      <Header />

      <main>{children}</main>
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  );
}
