"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import svgPaths from "@/lib/svgPaths";
import ContactFormWhite from "./contact/ContactFormWhite";

function LineiconsGoogleMeet({ className }: { className?: string } = {}) {
  return (
    <div
      className={`relative shrink-0 size-[20px] ${className || ""}`}
      data-name="lineicons:google-meet"
    >
      <svg
        className="absolute inset-0 size-full"
        fill="none"
        height="24"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        width="24"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          d={svgPaths.p2a901680}
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

export function ContactSectionWhite({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const tCta = useTranslations("ctaBanner");

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="max-w-345 mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Direct Contact Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
           
            <div className="relative isolate flex min-h-[420px] overflow-hidden border border-[rgba(174,174,174,0.4)] bg-[#161819] p-7 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:min-h-[480px] sm:p-10 lg:min-h-full lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 h-[420px] w-36 rotate-45 bg-gradient-to-b from-[#98ff03]/45 via-[#98ff03]/15 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -right-20 h-56 w-72 rotate-45 bg-gradient-to-tr from-[#98ff03]/40 via-[#98ff03]/10 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 left-24 h-44 w-24 rotate-45 bg-[#98ff03]/30"
              />
              {/* <div className="absolute left-0 top-0 size-1.5 bg-white" />
              <div className="absolute right-0 top-0 size-1.5 bg-white" />
              <div className="absolute bottom-0 left-0 size-1.5 bg-white" />
              <div className="absolute bottom-0 right-0 size-1.5 bg-white" /> */}

              <div className="relative z-10 flex h-full flex-col items-start gap-7 sm:gap-8">
                <Image
                  src="/icon-logo.svg"
                  alt="Matii"
                  width={30}
                  height={30}
                  className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                />

                <Heading className="max-w-[400px] font-urbanist text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                  {tCta("titlePrefix")}{" "}
                  <span className="text-[#90dd25]">{tCta("titleHighlight")}</span>{" "}
                  {tCta("titleSuffix")}
                </Heading>

                <p className="max-w-[340px] font-urbanist text-sm leading-[1.7] text-white/70 sm:text-base">
                  {tCta("description")}
                </p>

                <Link
                  target="_blank"
                  href="https://calendly.com/Matiidigitals/30min"
                  className="inline-flex h-[42px] w-fit self-start items-center justify-start gap-2 rounded-[4px] border border-[#292c2e] bg-white px-5 font-inter text-xs font-medium text-[#292c2e] shadow-sm transition-all hover:bg-zinc-100 active:scale-[0.98] sm:text-[13px]"
                >
                  <LineiconsGoogleMeet className="size-4" />
                  <span className="whitespace-nowrap">{tCta("scheduleMeeting")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* White Theme Form Column */}
          <div className="lg:col-span-7 h-full">
            <ContactFormWhite />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactSectionWhite;
