"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import svgPaths from "@/lib/svgPaths";
import WorldMap from "@/components/ui/world-map";

function TypcnMinus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="typcn:minus">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="typcn:minus">
          <path
            d={svgPaths.p1dfa7b80}
            fill="var(--fill-0, #98FF03)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}


function LineiconsGoogleMeet({ className }: { className?: string } = {}) {
  return (
    <div
      className={`relative shrink-0 size-[27px] ${className || ""}`}
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

function Frame73() {
  return (
    <div className="bg-[#292c2e] drop-shadow-[0px_4px_3.4px_rgba(42,42,43,0.25)] h-[34px] relative rounded-[6px] shrink-0 w-[36px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[24px] pl-[26px] pr-[27px] pt-[23px] relative size-full">
          <TypcnMinus />
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex gap-[162px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] capitalize font-['Urbanist:SemiBold',sans-serif] font-semibold leading-[1.25] relative shrink-0 text-[#292c2e] text-[20px] text-center whitespace-nowrap">{`Have an idea but don't know where to start?`}</p>
      <Frame73 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[607px]">
      <Frame72 />
      <p className="[word-break:break-word] font-['Urbanist:Medium',sans-serif] font-medium leading-[1.25] lowercase relative shrink-0 text-[#797f8b] text-[16px] w-full">
        That’s exactly where we come in. We help shape your idea, understand the
        problem, define the right solution, and turn it into a clear digital
        product.
      </p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-[#f3f4f6] col-1 content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-col h-[136px] items-start ml-0 mt-0 pb-[27px] pl-[36px] pr-[30px] pt-[25px] relative rounded-[2px] row-1 w-[673px]">
      <Frame71 />
    </div>
  );
}

function Group29() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#f3f4f6] col-1 h-[136px] ml-[21px] mt-[32px] relative rounded-[10px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[673px]" />
      <div className="bg-[#292c2e] col-1 h-[136px] ml-[11px] mt-[17px] relative rounded-[4px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[673px]" />
      <Frame70 />
    </div>
  );
}

const mapDots = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    end: { lat: 47.3769, lng: 8.5417, label: "Zurich" },
  },
  {
    start: { lat: 47.3769, lng: 8.5417, label: "Zurich" },
    end: { lat: -1.9441, lng: 30.0619, label: "Kigali" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: 40.7128, lng: -74.006, label: "New York" },
    end: { lat: -1.9441, lng: 30.0619, label: "Kigali" },
  },
  {
    start: { lat: -1.9441, lng: 30.0619, label: "Kigali" },
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
];

const bars = [
  "h-[280px] xl:h-[354px]",
  "h-[190px] xl:h-[239px]",
  "h-[95px] xl:h-[125px]",
];

import { useTranslations } from "next-intl";

export function CtaBanner() {
  const tCta = useTranslations("ctaBanner");

  return (
    <section className="relative w-full pt-12 md:pt-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1380px] mx-auto relative border border-[rgba(174,174,174,0.4)] dark:border-white/10 bg-white dark:bg-[#161819] h-auto flex flex-col items-center justify-between p-6 md:p-12 transition-colors duration-200">
        {/* 4 Corner Rectangle Accent Markers */}
        <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-0.5 -left-0.5 z-20 transition-colors" />
        <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-0.5 -right-0.5 z-20 transition-colors" />
        <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-0.5 -left-0.5 z-20 transition-colors" />
        <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-0.5 -right-0.5 z-20 transition-colors" />

        {/* World Map added on top with matching background */}
        <div className="w-full max-w-full relative pointer-events-none select-none  h-[340px] sm:h-[400px] md:h-[480px] z-0">
          <WorldMap
            dots={mapDots}
            lineColor="#98ff03"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#161819]" />
        </div>

        {/* Bottom Accent Bars from original banner */}
        {/* <div className="absolute inset-x-0 -bottom-10 hidden lg:flex items-end pointer-events-none opacity-90 z-0">
          {[...bars, ...bars].map((height, index) => {
            const reversedIndex = index >= bars.length ? 5 - index : index;

            return (
              <div
                key={index}
                className={`flex-1 bg-[#98ff03] ${bars[reversedIndex]}`}
              />
            );
          })}
        </div> */}

        {/* CTA Content with auto-adjusting height, optical spacing, and accessible Link */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[850px] mx-auto px-4 py-10 sm:py-14 md:py-16">
          <h2 suppressHydrationWarning className="group relative font-space font-semibold text-[2rem] sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.08] tracking-tight mb-6">
            <span suppressHydrationWarning className="relative z-10 bg-gradient-to-r from-[#292c2e] via-[#484c4f] to-[#848e94] dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_6s_ease-in-out_infinite]">
              {tCta("titlePrefix")}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#98ff03] via-[#c4ff5c] to-[#98ff03] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite]">
                  {tCta("titleHighlight")}
                </span>
                {/* Underline flourish */}
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3 text-[#98ff03]/70"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 50 2, 150 2, 198 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              {tCta("titleSuffix")}
            </span>
          </h2>

          {/* Description with refined typography */}
          <p className="relative font-urbanist text-base md:text-[18px] leading-[1.7] text-[#555] dark:text-zinc-300 max-w-[640px] mb-8 md:mb-10">
            {tCta("description")}
          </p>

          <div className="flex flex-col gap-2 pt-5 mt-2 font-inter normal-case tracking-normal">
            <Link
              target="_blank"
              href="https://calendly.com/Matiidigitals/30min"
              className="font-inter text-[14px] font-medium bg-[#292c2e] text-white hover:bg-[#1a1c1d] dark:bg-white dark:text-[#161819] dark:hover:bg-zinc-200 rounded-[4px] px-10 py-4 flex items-center justify-center gap-2 shadow-sm transition-colors border border-[#292c2e] dark:border-white"
            >
              <LineiconsGoogleMeet />
              <span>{tCta("scheduleMeeting")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;

