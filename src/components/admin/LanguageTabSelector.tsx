"use client";

import React from "react";
import { Globe, Sparkles, Check, AlertCircle } from "lucide-react";
import { AutoTranslateButton } from "./AutoTranslateButton";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName?: string;
  flag?: string;
  isSource?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", isSource: true },
  { code: "om", name: "Oromo", nativeName: "Afaan Oromoo", flag: "🌳" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
];

interface LanguageTabSelectorProps {
  activeLocale: string;
  onChangeLocale: (locale: string) => void;
  translations?: Record<string, any>;
  sourceTexts?: Record<string, string>;
  onTranslated: (translations: Record<string, Record<string, string>>) => void;
  onCopyFromSource?: (targetLocale: string) => void;
  title?: string;
  description?: string;
  className?: string;
}

export function LanguageTabSelector({
  activeLocale,
  onChangeLocale,
  translations = {},
  sourceTexts = {},
  onTranslated,
  onCopyFromSource,
  title = "Content Language & AI Translations",
  description = "Switch languages to view, inspect, or edit translations. Use AI Auto-Translate to generate all languages.",
  className = "",
}: LanguageTabSelectorProps) {
  const isTargetLanguage = activeLocale !== "en";
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === activeLocale) || SUPPORTED_LANGUAGES[0];

  return (
    <div className={`bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[6px] p-3.5 space-y-3 ${className}`}>
      {/* Header with Title and AutoTranslate */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200/80 dark:border-white/10 pb-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-[4px] bg-[#292c2e] text-[#98ff03] dark:bg-[#98ff03]/20 dark:text-[#98ff03] shrink-0 mt-0.5">
            <Globe className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-space text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                {title}
              </h4>
              <span className="text-[10px] font-space font-semibold px-2 py-0.5 rounded bg-[#98ff03]/20 text-black dark:text-[#98ff03] border border-[#98ff03]/40">
                {Object.keys(translations || {}).filter(
                  (k) => translations[k] && Object.values(translations[k]).some((v) => Boolean(v))
                ).length + 1}{" "}
                / 5 Languages
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-inter">
              {description}
            </p>
          </div>
        </div>

        <AutoTranslateButton
          sourceTexts={sourceTexts}
          onTranslated={onTranslated}
        />
      </div>

      {/* Language Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = activeLocale === lang.code;
          const hasTranslation =
            lang.code === "en"
              ? true
              : Boolean(
                  translations?.[lang.code] &&
                    Object.values(translations[lang.code]).some(
                      (val) => val && (typeof val === "string" ? val.trim().length > 0 : Array.isArray(val) ? val.length > 0 : true)
                    )
                );

          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onChangeLocale(lang.code)}
              className={`group px-3 py-1.5 rounded-[4px] font-space text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? "bg-[#292c2e] text-white dark:bg-[#98ff03] dark:text-black shadow-sm"
                  : "bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-700/60"
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.code.toUpperCase()}</span>
              <span className={`text-[10px] font-normal lowercase tracking-normal ${isActive ? (isActive && "dark:text-black/80 text-zinc-300") : "text-zinc-400"}`}>
                ({lang.nativeName || lang.name})
              </span>

              {lang.code === "en" ? (
                <span className={`text-[9px] font-mono px-1 py-0.2 rounded ${isActive ? "bg-white/20 text-white dark:bg-black/20 dark:text-black" : "bg-zinc-100 text-zinc-500"}`}>
                  Source
                </span>
              ) : hasTranslation ? (
                <span
                  title="Translation available"
                  className="size-2 rounded-full bg-[#98ff03] border border-black/20 dark:border-white/20"
                />
              ) : (
                <span
                  title="Empty translation"
                  className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Target Language Context Banner */}
      {isTargetLanguage && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-[4px] text-[11px] font-inter text-amber-800 dark:text-amber-200">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>
              Currently editing <strong>{currentLang.nativeName} ({currentLang.name})</strong> translation. Changes apply specifically to this language.
            </span>
          </div>
          {onCopyFromSource && (
            <button
              type="button"
              onClick={() => onCopyFromSource(activeLocale)}
              className="text-[10px] font-space font-semibold uppercase tracking-wider underline hover:text-amber-900 dark:hover:text-amber-100 shrink-0 cursor-pointer"
            >
              Copy English
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default LanguageTabSelector;
