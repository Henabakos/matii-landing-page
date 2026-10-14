
import { Clock3, MapPin, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import {
  FlagEthiopia,
  FlagPoland,
  FlagUK,
  FlagUSA,
} from "@/components/common/CountryFlags";

type Office = {
  country: string;
  flag: ReactNode;
  type: string;
  city: string;
  address: string;
  timezone: string;
  image: string;
  headquarters?: boolean;
};

const offices: Office[] = [
  {
    country: "United States",
    flag: <FlagUSA className="h-4 w-6" />,
    type: "Americas Hub",
    city: "New York, NY",
    address: "New York, United States",
    timezone: "EST · UTC-5",
    image: "/images/offices/us.jpg",
  },
  {
    country: "United Kingdom",
    flag: <FlagUK className="h-4 w-6" />,
    type: "EMEA Hub",
    city: "London",
    address: "London, United Kingdom",
    timezone: "GMT · UTC+0",
    image: "/images/offices/uk.jpg",
  },
  {
    country: "Poland",
    flag: <FlagPoland className="h-4 w-6" />,
    type: "European Engineering",
    city: "Warsaw",
    address: "Warsaw, Poland",
    timezone: "CET · UTC+1",
    image: "/images/offices/eu.jpg",
  },
  {
    country: "Ethiopia",
    flag: <FlagEthiopia className="h-4 w-6" />,
    type: "Headquarters",
    city: "Addis Ababa",
    address: "Addis Ababa, Ethiopia",
    timezone: "EAT · UTC+3",
    image: "/images/offices/et.jpg",
    headquarters: true,
  },
];

function OfficeCard({ office }: { office: Office }) {
  const imageStyle = {
    "--office-image": `url("${office.image}")`,
  } as CSSProperties;

  return (
    <article
      style={imageStyle}
      className="
        group relative flex min-h-[290px] flex-col
        overflow-hidden rounded-none
        border border-[rgba(174,174,174,0.4)] dark:border-white/10
        bg-[#161819]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#98FF03]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
      "
    >
     

      {/* Skyline background */}
      <div
        className="
          absolute inset-0
          bg-[image:var(--office-image)]
          bg-cover bg-center
          opacity-80
          transition-all duration-500
          group-hover:scale-105 group-hover:opacity-90
        "
      />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#161819] via-[#161819]/90 via-45% to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#161819]/70 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
        {/* Country */}
        <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="shrink-0 leading-none">
              {office.flag}
            </span>

            <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
              {office.country}
            </h3>
          </div>

          <ArrowUpRight
            size={16}
            className="text-white/30 transition-colors group-hover:text-[#98FF03]"
            aria-hidden="true"
          />
        </div>

        {/* Hub label */}
        <div className="mt-3 pl-1">
          <span
            className={
              office.headquarters
                ? "inline-flex rounded border border-[#98FF03]/20 bg-[#98FF03]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#98FF03]"
                : "inline-flex rounded border border-white/5 bg-white/[0.06] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400"
            }
          >
            {office.type}
          </span>
        </div>

        {/* Address */}
        <div className="mt-5 flex items-start gap-2.5">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 text-[#98FF03]"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-200">
              {office.city}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              {office.address}
            </p>
          </div>
        </div>

        {/* Timezone */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <Clock3 size={14} aria-hidden="true" />
          <span>{office.timezone}</span>
        </div>
      </div>
    </article>
  );
}

export default function GlobalOfficeCards() {
  return (
    <section
      aria-labelledby="global-presence-title"
      className="w-full px-4 py-12 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-[850px] text-center">

          <h2
            id="global-presence-title"
            className="font-urbanist text-[2rem] font-semibold leading-[1.08] tracking-tight text-[#292c2e] dark:text-white sm:text-5xl md:text-6xl"
          >
            <span className="bg-[#292c2e] dark:bg-[#ffffff]  from-[#292c2e] via-[#484c4f] to-[#848e94] bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-400">
              Our Global Presence
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[640px] font-urbanist text-base leading-[1.7] text-[#555] dark:text-zinc-300 md:text-[18px]">
            Connecting businesses with engineering expertise
            through our international network.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {offices.map((office) => (
            <OfficeCard key={office.country} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
}
