"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import svgPaths from "@/lib/svgPaths";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { MegaMenuDropdown } from "@/components/layout/MegaMenuDropdown";
import { defaultNavMenus, MegaMenuConfig } from "@/data/navigation-data";

function LineiconsGoogleMeet({ className }: { className?: string } = {}) {
  return (
    <div
      className={`relative shrink-0 size-[20px] ${className || ""}`}
      data-name="lineicons:google-meet"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="24"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        width="24"
      >
        <g id="lineicons:google-meet">
          <path
            clipRule="evenodd"
            d={svgPaths.p2a901680}
            fill="currentColor"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

interface HeaderProps {
  initialMenus?: MegaMenuConfig[];
}

export function Header({ initialMenus }: HeaderProps = {}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menus, setMenus] = useState<MegaMenuConfig[]>(
    initialMenus && initialMenus.length > 0 ? initialMenus : defaultNavMenus
  );
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  // Sync with DB if custom menus configured
  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setMenus(res.data);
        }
      })
      .catch(() => { });
  }, []);

  // Close menus on path change
  useEffect(() => {
    setActiveMenuKey(null);
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuKey(null);
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(e.target as Node)
      ) {
        setActiveMenuKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenuKey(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenuKey(null);
    }, 180);
  };

  const activeMenu = menus.find((m) => m.key === activeMenuKey);

  // Mega menu items vs direct links
  const megaMenuKeys = ["services", "projects", "careers", "resources"];

  return (
    <header className="z-50 w-full pt-3 px-4 md:px-8 relative">
      <div ref={headerContainerRef} className="max-w-[1380px] mx-auto relative">
        {/* Framed Outer Container matching template design structure */}
        <div className="relative bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] dark:shadow-none h-[72px] md:h-[80px] flex items-center justify-between px-3 sm:px-4 md:px-5 xl:px-6 transition-colors duration-200">
          {/* Architectural Corner Accents from Template */}
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px] transition-colors duration-200" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px] transition-colors duration-200" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px] transition-colors duration-200" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px] transition-colors duration-200" />

          {/* Logo Section */}
          <div className="flex items-center h-full pr-3.5 xl:pr-5 2xl:pr-6 border-r border-[rgba(174,174,174,0.2)] dark:border-white/10 relative transition-colors duration-200 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 xl:gap-3 font-space text-lg md:text-xl font-medium tracking-tight text-[#292c2e] dark:text-white"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10 rounded-[4px] flex items-center justify-center text-[#98ff03] font-bold text-sm md:text-base shadow-sm shrink-0">
                M
              </div>
              <span
                translate="no"
                className="notranslate font-space uppercase tracking-[0.1em] text-sm md:text-base font-semibold text-[#292c2e] dark:text-white"
              >
                Matii
              </span>
            </Link>
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px] transition-colors duration-200" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px] transition-colors duration-200" />
          </div>

          {/* Desktop Navigation Section */}
          <nav className="hidden xl:flex items-center justify-center flex-1 px-2 xl:px-3 2xl:px-6 min-w-0">
            <ul className="flex items-center justify-center gap-0.5 xl:gap-1.5 2xl:gap-3.5 flex-nowrap">
              {menus
                .filter((m) => m.isActive)
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((menu) => {
                  const hasDropdown = Boolean(menu.categories && menu.categories.length > 0);

                  if (hasDropdown) {
                    return (
                      <li
                        key={menu.key}
                        className="relative shrink-0"
                        onMouseEnter={() => handleMouseEnter(menu.key)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          href={menu.href}
                          className={`group inline-flex h-8 xl:h-9 items-center justify-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 2xl:px-3.5 py-1.5 font-space text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] uppercase tracking-[0.03em] 2xl:tracking-[0.06em] whitespace-nowrap rounded-[3px] transition-colors ${
                            activeMenuKey === menu.key
                              ? "text-black dark:text-white font-medium bg-black/[0.03] dark:bg-white/[0.04]"
                              : "text-[#2a2a2b] dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.03] font-normal"
                          }`}
                        >
                          <span>{menu.label}</span>
                          <ChevronDown
                            className={`size-2.5 xl:size-3 shrink-0 transition-transform duration-200 ${
                              activeMenuKey === menu.key
                                ? "rotate-180 text-black dark:text-[#98ff03]"
                                : "text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={menu.key} className="shrink-0">
                      <Link
                        href={menu.href}
                        className={`inline-flex h-8 xl:h-9 items-center justify-center px-2 xl:px-2.5 2xl:px-3.5 py-1.5 font-space text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] uppercase tracking-[0.03em] 2xl:tracking-[0.06em] whitespace-nowrap rounded-[3px] transition-colors ${
                          pathname === menu.href
                            ? "text-black dark:text-white font-medium bg-black/[0.03] dark:bg-white/[0.04]"
                            : "text-[#2a2a2b] dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.03] font-normal"
                        }`}
                      >
                        {menu.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>

          {/* Desktop Action Buttons matching Template */}
          <div className="hidden xl:flex items-center gap-2 xl:gap-2.5 2xl:gap-3 pl-3.5 xl:pl-4 2xl:pl-6 border-l border-[rgba(174,174,174,0.2)] dark:border-white/10 h-full relative transition-colors duration-200 shrink-0">
            <LanguageSelector />
            <ThemeToggle />
            <Link
              target="_blank"
              href="https://calendly.com/Matiidigitals/30min"
              className="font-inter text-xs xl:text-[13px] 2xl:text-[14px] font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] dark:bg-white dark:text-[#161819] dark:hover:bg-zinc-200 rounded-[4px] h-[36px] xl:h-[38px] px-2.5 xl:px-3.5 2xl:px-4 inline-flex items-center gap-1.5 xl:gap-2 shadow-sm transition-all border border-[#292c2e] dark:border-white cursor-pointer active:scale-[0.96] whitespace-nowrap shrink-0"
            >
              <LineiconsGoogleMeet className="size-4 shrink-0" />
              <span className="whitespace-nowrap">Book A Call</span>
            </Link>
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px] transition-colors duration-200" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px] transition-colors duration-200" />
          </div>

          {/* Mobile / Tablet Menu Toggle Button */}
          <div className="xl:hidden flex items-center gap-1.5 sm:gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-[4px] p-2 text-[#292c2e] dark:text-zinc-200 hover:bg-[#f3f4f6] dark:hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Dynamic Mega Menu Dropdown Container */}
        {activeMenu && (
          <div
            className="hidden xl:block absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenuDropdown
              menu={activeMenu}
              onClose={() => setActiveMenuKey(null)}
            />
          </div>
        )}

        {/* Mobile Navigation Drawer with Accordions */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen
            ? "max-h-[85vh] opacity-100 mt-2 translate-y-0"
            : "max-h-0 opacity-0 mt-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <div className="bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 p-4 shadow-lg rounded-[4px] transition-colors duration-200 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-2 font-space uppercase text-[13.5px] tracking-[0.08em] text-[#2a2a2b] dark:text-zinc-300">
              {/* Accordion Sections for Mega Menus and Direct Links */}
              {menus
                .filter((m) => m.isActive)
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((menu) => {
                  const hasDropdown = Boolean(menu.categories && menu.categories.length > 0);
                  const isExpanded = mobileExpandedSection === menu.key;

                  if (!hasDropdown) {
                    return (
                      <Link
                        key={menu.key}
                        href={menu.href}
                        className="px-3 py-2 rounded-[4px] hover:bg-[#f3f4f6] dark:hover:bg-white/5 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {menu.label}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={menu.key}
                      className="border-b border-zinc-100 dark:border-white/5 pb-2"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={menu.href}
                          className="px-3 py-2 font-medium hover:text-black dark:hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {menu.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedSection(
                              isExpanded ? null : menu.key
                            )
                          }
                          className="p-2 text-zinc-500 hover:text-black dark:hover:text-white cursor-pointer"
                          aria-label={`Toggle ${menu.label} sub-items`}
                        >
                          <ChevronDown
                            className={`size-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#98ff03]" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="pl-3 pr-2 py-2 space-y-3 normal-case tracking-normal animate-in fade-in duration-200">
                          {menu.categories.map((category) => (
                            <div key={category.id} className="space-y-1.5">
                              <span className="font-space text-xs font-semibold text-[#161819] dark:text-white uppercase tracking-wider block">
                                {category.title}
                              </span>
                              <div className="grid grid-cols-1 gap-1 pl-2 text-xs text-zinc-600 dark:text-zinc-400">
                                {category.groups.flatMap((g) => g.items).slice(0, 4).map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="py-1 hover:text-black dark:hover:text-[#98ff03] transition-colors flex items-center justify-between"
                                  >
                                    <span>{item.title}</span>
                                    <ArrowRight className="size-3 opacity-40" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          <Link
                            href={menu.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-space font-semibold uppercase text-black dark:text-[#98ff03] pt-1"
                          >
                            <span>Explore All {menu.label} →</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}

              {/* Call to Action */}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-[rgba(174,174,174,0.2)] dark:border-white/10 font-inter normal-case tracking-normal">
                <Link
                  target="_blank"
                  href="https://calendly.com/Matiidigitals/30min"
                  className="font-inter text-[14px] font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] dark:bg-white dark:text-[#161819] dark:hover:bg-zinc-200 rounded-[4px] px-4 py-2.5 flex items-center justify-center gap-2 shadow-sm transition-colors border border-[#292c2e] dark:border-white"
                  onClick={() => setIsOpen(false)}
                >
                  <LineiconsGoogleMeet />
                  <span>Book A Call</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
