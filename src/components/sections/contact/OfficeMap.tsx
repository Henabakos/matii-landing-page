"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { officeAddresses, type OfficeId } from "@/data/office-addresses";
import { FlagUSA, FlagUK, FlagPoland, FlagEthiopia } from "@/components/common/CountryFlags";

// City-area views deliberately have no office marker until an address is verified.
const regions = {
  et: { label: "locationEthiopiaCity", country: "locationEthiopia", latitude: 9.03, longitude: 38.75, Flag: FlagEthiopia },
  us: { label: "locationUsaCity", country: "locationUsa", latitude: 40.71, longitude: -74.01, Flag: FlagUSA },
  uk: { label: "locationUkCity", country: "locationUk", latitude: 51.51, longitude: -0.13, Flag: FlagUK },
  pl: { label: "locationPolandCity", country: "locationPoland", latitude: 52.23, longitude: 21.01, Flag: FlagPoland },
} as const;

export default function OfficeMap({ light }: { light: boolean }) {
  const t = useTranslations("contactSection");
  const [selected, setSelected] = useState<OfficeId>("et");
  const mapId = useId();
  const region = regions[selected];
  const office = officeAddresses[selected];
  const { latitude, longitude } = office || region;
  const [city, role] = t(region.label).split("·").map(part => part.trim());
  const radius = office ? 0.006 : 0.12;
  const params = new URLSearchParams({
    bbox: [longitude - radius, latitude - radius, longitude + radius, latitude + radius].join(","),
    layer: "mapnik",
  });
  if (office) params.set("marker", `${latitude},${longitude}`);
  const mapUrl = `https://www.openstreetmap.org/${office ? `?mlat=${latitude}&mlon=${longitude}` : ""}#map=${office ? 17 : 12}/${latitude}/${longitude}`;
  const foreground = light ? "text-[#292c2e] dark:text-zinc-100" : "text-zinc-100";
  const muted = light ? "text-zinc-600 dark:text-zinc-400" : "text-zinc-400";
  const border = light ? "border-zinc-200 dark:border-white/10" : "border-white/10";

  return (
    <div className={`grid overflow-hidden rounded-xl border @[48rem]:grid-cols-[minmax(15rem,0.85fr)_minmax(0,2fr)] ${border} ${light ? "bg-white dark:bg-[#161819]" : "bg-[#161819]"}`}>
      <div className={`min-w-0 border-b p-3 @[48rem]:border-b-0 @[48rem]:border-e @[48rem]:p-5 ${border} ${light ? "bg-zinc-50 dark:bg-white/[0.02]" : "bg-white/[0.02]"}`}>
        <p className={`px-3 pb-4 pt-2 font-space text-xs ${muted}`}>{t("mapChooseCity")}</p>
        <div className="grid grid-cols-1 gap-2 @[20rem]:grid-cols-2 @[48rem]:grid-cols-1" role="group" aria-label={t("mapChooseCity")}>
          {(Object.entries(regions) as [OfficeId, typeof regions[OfficeId]][]).map(([id, item]) => {
            const active = selected === id;
            const Flag = item.Flag;
            return <button
              key={id} type="button" aria-pressed={active} aria-controls={mapId}
              onClick={() => setSelected(id)}
              className={`group flex min-h-20 min-w-0 items-center gap-3 rounded-lg border p-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${active ? light ? "border-lime-700/30 bg-lime-100/70 dark:border-[#98ff03]/35 dark:bg-[#98ff03]/10" : "border-[#98ff03]/35 bg-[#98ff03]/10" : light ? "border-transparent hover:border-zinc-200 hover:bg-white dark:hover:border-white/10 dark:hover:bg-white/5" : "border-transparent hover:border-white/10 hover:bg-white/5"}`}
            >
              <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-full ${light ? "bg-white dark:bg-white/10" : "bg-white/10"}`}><Flag className="h-4 w-6" /></span>
              <span className="min-w-0 flex-1">
                <span className={`block break-words font-space text-sm font-medium leading-snug ${foreground}`}>{t(item.label).split("·")[0].trim()}</span>
                <span className={`mt-1 block font-inter text-xs leading-relaxed ${muted}`}>{t(item.country)}</span>
              </span>
              <ChevronRight aria-hidden="true" className={`hidden size-4 shrink-0 rtl:rotate-180 @[48rem]:block ${active ? light ? "text-lime-800 dark:text-[#98ff03]" : "text-[#98ff03]" : "text-zinc-500"}`} />
            </button>;
          })}
        </div>
      </div>

      <div id={mapId} className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-5 sm:px-6" aria-live="polite" aria-atomic="true">
          <div className="min-w-0">
            <h4 className={`break-words font-urbanist text-2xl font-semibold leading-tight ${foreground}`}>{city}</h4>
            <p className={`mt-1.5 font-inter text-xs leading-relaxed ${muted}`}>{role}</p>
          </div>
          {selected === "et" && <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-space text-[10px] font-medium tracking-wide ${light ? "bg-lime-100 text-lime-900 dark:bg-[#98ff03]/10 dark:text-[#98ff03]" : "bg-[#98ff03]/10 text-[#98ff03]"}`}><MapPin aria-hidden="true" className="size-3" />{t("hqBadge")}</span>}
        </div>
        <iframe
          key={selected} title={t("mapTitle", { city })}
          src={`https://www.openstreetmap.org/export/embed.html?${params}`}
          loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
          className="block h-64 w-full flex-none border-0 bg-zinc-100 @[48rem]:min-h-80 @[48rem]:flex-1" allowFullScreen
        />
        <div className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t px-5 py-4 sm:px-6 ${border}`}>
          <div className={`min-w-0 max-w-sm font-inter text-xs leading-relaxed ${muted}`} aria-live="polite">
            {office ? <address className="whitespace-pre-line not-italic">{office.address}</address> : <p>{t("mapCityOnly", { city })}</p>}
          </div>
          <a href={office ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}` : mapUrl}
            target="_blank" rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 font-inter text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${light ? "border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-white/20 dark:text-zinc-100 dark:hover:bg-white/5" : "border-white/20 text-zinc-100 hover:bg-white/5"}`}
          >{t(office ? "mapDirections" : "mapOpen")}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></a>
        </div>
      </div>
    </div>
  );
}
