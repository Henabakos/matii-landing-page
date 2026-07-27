import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Motion Landing Page",
  description: "A marketing site built with Next.js.",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">{children}</main>
    </div>
  );
}
