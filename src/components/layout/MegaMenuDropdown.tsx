"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
  Brain,
  Code2,
  Cloud,
  Users2,
  RefreshCw,
  Bot,
  Building2,
  Cpu,
  TrendingUp,
  CreditCard,
  HeartPulse,
  BookOpen,
  Newspaper,
  Briefcase,
  Compass,
  Palette,
  Server,
  Layers,
  ShieldCheck,
  Terminal,
  Activity,
  Award,
  Sparkles,
  Zap,
  Globe,
  GraduationCap,
  Users,
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import {
  TbTerminal2,
  TbBrain,
  TbPalette,
  TbServerBolt,
  TbHeartHandshake,
  TbRadar,
  TbSchool,
  TbNetwork,
  TbCompass,
  TbAward,
} from "react-icons/tb";
import { MegaMenuConfig } from "@/data/navigation-data";

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number | string }>;

// Dynamic Icon Map for Icon Names
const ICON_MAP: Record<string, IconType> = {
  Brain,
  Code2,
  Cloud,
  Users2,
  RefreshCw,
  Bot,
  Building2,
  Cpu,
  TrendingUp,
  CreditCard,
  HeartPulse,
  BookOpen,
  Newspaper,
  Briefcase,
  Compass,
  Palette,
  Server,
  Layers,
  ShieldCheck,
  Terminal,
  Activity,
  Award,
  Zap,
  Globe,
  GraduationCap,
  Users,
  HeartHandshake,
  // Tabler / Unique icon aliases
  TbTerminal2,
  TbBrain,
  TbPalette,
  TbServerBolt,
  TbHeartHandshake,
  TbRadar,
  TbSchool,
  TbNetwork,
  // Graceful alias: map legacy "Sparkles" to clean HeartHandshake / Award
  Sparkles: TbHeartHandshake,
};

function DynamicIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const IconComponent = (name && ICON_MAP[name]) || TbCompass;
  return <IconComponent className={className || "w-4 h-4"} strokeWidth={1.8} />;
}

interface MegaMenuDropdownProps {
  menu: MegaMenuConfig;
  onClose?: () => void;
}

export function MegaMenuDropdown({ menu, onClose }: MegaMenuDropdownProps) {
  const locale = useLocale();
  const categories = menu.categories || [];
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id || ""
  );

  // Sync active category if menu changes
  useEffect(() => {
    if (categories.length > 0 && !categories.some((c) => c.id === activeCategoryId)) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  if (!activeCategory) return null;

  const footerLabel = menu.translations?.[locale]?.footerLabel || menu.footer?.label;
  const footerCtaLabel = menu.translations?.[locale]?.footerCtaLabel || menu.footer?.ctaLabel;

  return (
    <div
      className="relative w-[880px] bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 shadow-[0px_20px_50px_rgba(0,0,0,0.14)] dark:shadow-[0px_25px_60px_rgba(0,0,0,0.7)] rounded-[4px] transition-colors duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Invisible Hover Bridge above the dropdown */}
      <div className="absolute -top-3 left-0 right-0 h-3 pointer-events-auto" />

      {/* Signature Architectural Corner Accents from Matii Design System */}
      <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px] z-30 transition-colors duration-200" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px] z-30 transition-colors duration-200" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px] z-30 transition-colors duration-200" />
      <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px] z-30 transition-colors duration-200" />

      {/* Main Split Layout: Left Sidebar (~280px) + Right Content */}
      <div className="flex min-h-[390px]">
        {/* Left Sidebar Category Tabs */}
        <div className="w-[280px] shrink-0 border-r border-[rgba(174,174,174,0.2)] dark:border-white/10 p-3.5 flex flex-col gap-1.5 bg-[#f8fafc] dark:bg-[#121415] select-none rounded-l-[4px]">
          {categories.map((category) => {
            const isActive = category.id === activeCategory.id;
            const categoryTitle = category.translations?.[locale]?.title || category.title;
            return (
              <button
                key={category.id}
                type="button"
                onMouseEnter={() => setActiveCategoryId(category.id)}
                onClick={() => setActiveCategoryId(category.id)}
                className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-[4px] text-left transition-all duration-150 cursor-pointer ${isActive
                  ? "bg-white dark:bg-[#1f2224] text-[#161819] dark:text-white border border-[rgba(174,174,174,0.3)] dark:border-white/10 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-white/5 hover:text-black dark:hover:text-zinc-200 border border-transparent"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {/* Category Icon Badge */}
                  <div
                    className={`size-8 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 ${isActive
                      ? "bg-[#98ff03] text-[#161819] shadow-xs"
                      : "bg-zinc-200/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 group-hover:bg-[#98ff03]/25 group-hover:text-[#161819] dark:group-hover:text-[#98ff03]"
                      }`}
                  >
                    <DynamicIcon name={category.iconName} className="size-4" />
                  </div>

                  {/* Category Title */}
                  <span
                    className={`font-space text-[13px] tracking-tight transition-colors ${isActive
                      ? "font-semibold text-black dark:text-white"
                      : "font-normal"
                      }`}
                  >
                    {categoryTitle}
                  </span>
                </div>

                {/* Right Arrow Indicator */}
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-black dark:text-white shrink-0 animate-in fade-in duration-150" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 p-6 flex flex-col justify-start overflow-y-auto max-h-[420px]">
          <div
            key={activeCategory.id}
            className="animate-in fade-in duration-150 space-y-6"
          >
            {activeCategory.groups.map((group, groupIdx) => {
              const groupTitle = group.translations?.[locale]?.title || group.title;
              return (
                <div key={groupIdx} className="space-y-3">
                  {/* Group Heading with Arrow */}
                  <Link
                    href={group.href || menu.href}
                    onClick={onClose}
                    className="group/hdr inline-flex items-center gap-2 text-zinc-900 dark:text-white hover:text-black dark:hover:text-[#98ff03] transition-colors"
                  >
                    <div className="size-6 rounded-[4px] bg-[#98ff03]/15 dark:bg-[#98ff03]/20 text-[#161819] dark:text-[#98ff03] flex items-center justify-center shrink-0">
                      <DynamicIcon name={group.iconName} className="size-3.5" />
                    </div>
                    <h4 className="font-space font-semibold text-[13.5px] uppercase tracking-wide group-hover/hdr:translate-x-0.5 transition-transform">
                      {groupTitle}
                    </h4>
                    <ArrowRight className="size-3.5 text-zinc-400 group-hover/hdr:text-black dark:group-hover/hdr:text-[#98ff03] group-hover/hdr:translate-x-1 transition-all" />
                  </Link>

                  {/* 2-Column Grid of Links */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-8">
                    {group.items.map((item, itemIdx) => {
                      const itemTitle = item.translations?.[locale]?.title || item.title;
                      const itemBadge = item.translations?.[locale]?.badge || item.badge;
                      return (
                        <Link
                          key={itemIdx}
                          href={item.href}
                          onClick={onClose}
                          className="group/item flex items-center justify-between text-[13px] text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors py-1 relative"
                        >
                          <span className="truncate flex items-center gap-2 group-hover/item:translate-x-1 group-hover/item:text-black dark:group-hover/item:text-[#98ff03] transition-all">
                            <span className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-600 group-hover/item:bg-[#98ff03] shrink-0 transition-colors" />
                            <span className="truncate">{itemTitle}</span>
                          </span>
                          {itemBadge && (
                            <span className="text-[10px] uppercase font-space font-semibold px-1.5 py-0.5 rounded bg-[#98ff03]/20 text-[#161819] dark:text-[#98ff03] shrink-0 ml-2">
                              {itemBadge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-Width Bottom Action Bar */}
      {menu.footer && (
        <div className="border-t border-[rgba(174,174,174,0.2)] dark:border-white/10 bg-[#f4f6f8] dark:bg-[#101213] px-6 py-3 flex items-center justify-between rounded-b-[4px]">
          <Link
            href={menu.footer.href}
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-space text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#98ff03] transition-colors"
          >
            <span>{footerLabel}</span>
          </Link>

          <Link
            href={menu.footer.ctaHref}
            onClick={onClose}
            className="font-space text-[12px] font-semibold uppercase tracking-[0.08em] text-[#161819] dark:text-[#98ff03] hover:underline flex items-center gap-1.5 transition-colors"
          >
            <span>{footerCtaLabel}</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MegaMenuDropdown;
