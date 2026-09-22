"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Database, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function AdminHeader() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/admin") return "Overview Dashboard";
    if (pathname.startsWith("/admin/kpis")) return "KPI & Metrics Manager";
    if (pathname.startsWith("/admin/partners")) return "Trusted Partners Manager";
    if (pathname.startsWith("/admin/projects")) return "Projects & Case Studies";
    if (pathname.startsWith("/admin/blog")) return "Blog Content Studio";
    if (pathname.startsWith("/admin/news")) return "Newsroom & Press Dispatches";
    if (pathname.startsWith("/admin/careers")) return "Careers & Applications";
    if (pathname.startsWith("/admin/testimonials")) return "Client Testimonials";
    if (pathname.startsWith("/admin/navigation")) return "Mega Menus & Navigation";
    if (pathname.startsWith("/admin/inquiries")) return "Contact Inquiries Inbox";
    return "Admin CMS";
  };

  return (
    <header className="h-18 bg-white dark:bg-[#16181b] border-b border-zinc-200/80 dark:border-white/10 px-6 sm:px-8 flex items-center justify-between transition-colors sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="font-space font-medium text-lg sm:text-xl text-[#292c2e] dark:text-white tracking-tight">
          {getPageTitle()}
        </h1>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-[11px] font-space font-medium">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live SQLite Sync</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark / Light Mode Switcher */}
        <ThemeToggle />

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f3f4f6] dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-[4px] text-xs font-space font-medium text-[#292c2e] dark:text-zinc-200 transition-colors active:scale-[0.96]"
        >
          <span>Preview Site</span>
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;
