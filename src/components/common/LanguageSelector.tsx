"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { TbChevronDown, TbCheck } from "react-icons/tb";
import { CountryFlag } from "@/components/common/CountryFlags";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageItem[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "om", name: "Afaan Oromoo", nativeName: "Afaan Oromoo" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
];

export function LanguageSelector({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLanguageChange = (nextLocale: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const activeLanguage =
    LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button with Country Flag */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Select site language. Current: ${activeLanguage.name}`}
        className="h-[36px] xl:h-[38px] px-2 xl:px-2.5 rounded-[4px] border border-[rgba(174,174,174,0.3)] dark:border-white/10 bg-white/70 dark:bg-[#161819]/80 hover:border-[#292c2e] dark:hover:border-white/30 text-xs font-space font-semibold text-[#292c2e] dark:text-zinc-200 inline-flex items-center gap-1.5 xl:gap-2 shadow-xs transition-all duration-150 active:scale-[0.96] cursor-pointer shrink-0"
      >
        <CountryFlag code={activeLanguage.code} className="w-[19px] h-[13px] xl:w-[20px] xl:h-[13.5px]" />
        <span className="font-space font-semibold text-xs tracking-tight whitespace-nowrap">
          {activeLanguage.nativeName}
        </span>
        <TbChevronDown
          className={`size-3 text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""
            }`}
          strokeWidth={2}
        />
      </button>

      {/* Language Options Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Language selection options"
          className="absolute right-0 top-[calc(100%+6px)] w-56 bg-white dark:bg-[#161819] border border-zinc-200 dark:border-white/10 rounded-[4px] p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Subtle corner pins matching design system */}
          <div className="size-1.5 bg-[#292c2e] dark:bg-white absolute top-0 left-0" />
          <div className="size-1.5 bg-[#292c2e] dark:bg-white absolute top-0 right-0" />
          <div className="size-1.5 bg-[#292c2e] dark:bg-white absolute bottom-0 left-0" />
          <div className="size-1.5 bg-[#292c2e] dark:bg-white absolute bottom-0 right-0" />

          <div className="px-2.5 py-1.5 mb-1 border-b border-zinc-100 dark:border-white/5">
            <span className="font-space text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Select Language / Afaan
            </span>
          </div>

          <div className="space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = locale === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-2.5 py-2 text-left rounded-[2px] flex items-center justify-between transition-colors cursor-pointer active:scale-[0.98] ${isSelected
                      ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-[#161819]"
                      : "hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CountryFlag code={lang.code} className="w-[22px] h-[15px]" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-space font-semibold text-xs tracking-tight truncate">
                        {lang.nativeName}
                      </span>
                      <span
                        className={`text-[10px] font-inter truncate ${isSelected
                            ? "text-zinc-300 dark:text-zinc-800 font-medium"
                            : "text-zinc-400 dark:text-zinc-500"
                          }`}
                      >
                        {lang.name}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <TbCheck
                      className="size-4 text-[#98ff03] dark:text-black shrink-0 ml-2"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
