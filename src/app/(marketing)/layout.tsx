import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Motion Landing Page",
  description: "A marketing site built with Next.js.",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a href="/" className="text-lg font-semibold tracking-tight">
            Motion
          </a>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
            <a href="/about" className="transition hover:text-zinc-950">
              About
            </a>
            <a href="/services" className="transition hover:text-zinc-950">
              Services
            </a>
            <a href="/industries" className="transition hover:text-zinc-950">
              Industries
            </a>
            <a href="/portfolio" className="transition hover:text-zinc-950">
              Portfolio
            </a>
            <a href="/blog" className="transition hover:text-zinc-950">
              Blog
            </a>
            <a href="/careers" className="transition hover:text-zinc-950">
              Careers
            </a>
            <a href="/contact" className="transition hover:text-zinc-950">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">{children}</main>
    </div>
  );
}
