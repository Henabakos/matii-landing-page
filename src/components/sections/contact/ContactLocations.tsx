"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  FlagUSA,
  FlagUK,
  FlagPoland,
  FlagEthiopia,
} from "@/components/common/CountryFlags";

interface ContactLocationsProps {
  variant?: "dark" | "light";
  className?: string;
}

export function ContactLocations({
  variant = "dark",
  className = "",
}: ContactLocationsProps) {
  const t = useTranslations("contactSection");

  const locations = [
    {
      id: "us",
      index: "01",
      country: t("locationUsa"),
      city: t("locationUsaCity"),
      flag: <FlagUSA className="w-[24px] h-[16px]" />,
      timezone: "EST · UTC-5",
      isHq: false,
    },
    {
      id: "uk",
      index: "02",
      country: t("locationUk"),
      city: t("locationUkCity"),
      flag: <FlagUK className="w-[24px] h-[16px]" />,
      timezone: "GMT · UTC+0",
      isHq: false,
    },
    {
      id: "pl",
      index: "03",
      country: t("locationPoland"),
      city: t("locationPolandCity"),
      flag: <FlagPoland className="w-[24px] h-[16px]" />,
      timezone: "CET · UTC+1",
      isHq: false,
    },
    {
      id: "et",
      index: "04",
      country: t("locationEthiopia"),
      city: t("locationEthiopiaCity"),
      flag: <FlagEthiopia className="w-[24px] h-[16px]" />,
      timezone: "EAT · UTC+3",
      isHq: true,
    },
  ];

  const isLight = variant === "light";

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Category Header */}
      <div
        className={`flex items-center justify-between w-full pt-4 border-t ${isLight
          ? "border-[rgba(174,174,174,0.3)] dark:border-white/10"
          : "border-white/10"
          }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-[#98ff03] font-space text-xs font-bold">//</span>
          <span
            className={`font-space font-medium text-xs md:text-sm tracking-wider uppercase ${isLight ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-300"
              }`}
          >
            {t("locationsTitle")}
          </span>
        </div>
        <span
          className={`font-space text-[11px] uppercase tracking-widest hidden sm:inline-block ${isLight ? "text-[#797F8B] dark:text-zinc-400" : "text-[#797F8B]"
            }`}
        >
          {t("locationsSubtitle")}
        </span>
      </div>

      {/* Locations 2x2 Grid */}
      <ul
        role="list"
        aria-label={t("locationsTitle")}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
      >
        {locations.map((loc) => (
          <li
            key={loc.id}
            className={`group relative rounded-[2px] p-3.5 transition-all duration-200 flex flex-col justify-between gap-2.5 overflow-hidden border ${isLight
              ? "bg-white dark:bg-[#161819] border-[rgba(174,174,174,0.35)] dark:border-white/10 hover:border-[#98ff03] dark:hover:border-[#98ff03] hover:shadow-[0_2px_12px_rgba(152,255,3,0.12)]"
              : "bg-[#161819]/90 hover:bg-[#1c1f21] border-white/10 hover:border-[#98ff03]/60 hover:shadow-[0_2px_16px_rgba(152,255,3,0.08)]"
              } hover:-translate-y-0.5`}
          >
            {/* Top row: Flag + Country Name + Live Status Ping */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                  {loc.flag}
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`font-space font-medium text-sm sm:text-base tracking-tight truncate transition-colors ${isLight
                      ? "text-black dark:text-white group-hover:text-black dark:group-hover:text-[#98ff03]"
                      : "text-white group-hover:text-[#98ff03]"
                      }`}
                  >
                    {loc.country}
                  </span>
                </div>
              </div>

              {/* Pulsing Active Indicator */}
              {/* <div
                className="flex items-center gap-1.5 shrink-0"
                title={t("activeStatus")}
                aria-label={t("activeStatus")}
              >
                <span className="relative flex size-2">
                  <span className="motion-reduce:animate-none animate-ping absolute inline-flex h-full w-full rounded-full bg-[#98ff03] opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-[#98ff03]" />
                </span>
              </div> */}
            </div>

            {/* Bottom row: City/Role + Timezone/HQ Badge */}
            <div className="flex items-center justify-between text-xs font-inter pt-0.5 gap-2">
              <span
                className={`truncate transition-colors ${isLight
                  ? "text-[#797F8B] dark:text-zinc-400 group-hover:text-black dark:group-hover:text-zinc-200"
                  : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
              >
                {loc.city}
              </span>

              {loc.isHq ? (
                <span className="shrink-0 font-space text-[10px] text-[#98ff03] bg-[#98ff03]/10 px-2 py-0.5 rounded-[4px] border border-[#98ff03]/30 font-semibold tracking-wider">
                  {t("hqBadge")}
                </span>
              ) : (
                <span
                  className={`shrink-0 font-space text-[10px] px-1.5 py-0.5 rounded-[4px] border tracking-wider ${isLight
                    ? "text-zinc-600 dark:text-zinc-400 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"
                    : "text-zinc-400 bg-white/5 border-white/10"
                    }`}
                >
                  {loc.timezone}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactLocations;
