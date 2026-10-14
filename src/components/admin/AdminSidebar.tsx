"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Handshake,
  Briefcase,
  BookOpen,
  Newspaper,
  Inbox,
  ExternalLink,
  LogOut,
  ChevronRight,
  MessageSquareQuote,
  Layers,
  Users,
  UserCheck,
} from "lucide-react";
import { logoutAdminAction } from "@/lib/actions/auth.actions";

const navItems = [
  {
    group: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "DATA & METRICS",
    items: [
      {
        name: "KPIs & Stats",
        href: "/admin/kpis",
        icon: TrendingUp,
      },
      {
        name: "Trusted Partners",
        href: "/admin/partners",
        icon: Handshake,
      },
    ],
  },
  {
    group: "CONTENT STUDIO",
    items: [
      {
        name: "Service Pillars",
        href: "/admin/pillars",
        icon: Layers,
      },
      {
        name: "Projects & Case Studies",
        href: "/admin/projects",
        icon: Briefcase,
      },
      {
        name: "Blog Articles",
        href: "/admin/blog",
        icon: BookOpen,
      },
      {
        name: "News & Dispatches",
        href: "/admin/news",
        icon: Newspaper,
      },
      {
        name: "Careers & Open Roles",
        href: "/admin/careers",
        icon: UserCheck,
      },
      {
        name: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquareQuote,
      },
      {
        name: "Mega Menus & Nav",
        href: "/admin/navigation",
        icon: Layers,
      },
    ],
  },
  {
    group: "INBOX",
    items: [
      {
        name: "Contact Inquiries",
        href: "/admin/inquiries",
        icon: Inbox,
      },
      {
        name: "Job Applications",
        href: "/admin/careers",
        icon: Users,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#292c2e] text-white flex flex-col justify-between min-h-screen border-r border-zinc-800 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-18 px-5 flex items-center gap-3 border-b border-zinc-800">
          <div className="size-8 bg-zinc-800 rounded-[4px] flex items-center justify-center text-[#98ff03] font-bold text-base shadow-sm font-space border border-zinc-700">
            M
          </div>
          <div>
            <span className="font-space uppercase tracking-[0.1em] text-sm font-bold text-white block leading-tight">
              Matii CMS
            </span>
            <span className="font-inter text-[11px] text-zinc-400">
              Admin Workspace
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-6">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="font-space text-[10px] uppercase font-bold tracking-widest text-zinc-500 px-3 block">
                {group.group}
              </span>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-space tracking-wide transition-all group active:scale-[0.98] ${isActive
                          ? "bg-zinc-800 text-[#98ff03] font-semibold border-l-2 border-[#98ff03]"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 font-normal"
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-4 shrink-0 transition-transform group-hover:scale-105" />
                          <span>{item.name}</span>
                        </div>
                        {isActive ? (
                          <ChevronRight className="size-3 text-[#98ff03]" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Footer Options */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-space text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ExternalLink className="size-4" />
            <span>View Public Site</span>
          </div>
          <span className="text-[10px] text-[#98ff03] bg-zinc-800 px-1.5 py-0.5 rounded-[2px]">
            LIVE
          </span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-space text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors text-left cursor-pointer active:scale-[0.98]"
          >
            <LogOut className="size-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

export default AdminSidebar;
