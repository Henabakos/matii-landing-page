import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Motion Landing Page",
  description: "A marketing site built with Next.js.",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  text-zinc-900">
      <Header />

      <main>{children}</main>
    </div>
  );
}
