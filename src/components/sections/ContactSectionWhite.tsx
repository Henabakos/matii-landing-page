"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ContactFormWhite from "./contact/ContactFormWhite";
import ContactLocations from "./contact/ContactLocations";

export function ContactSectionWhite() {
  const t = useTranslations("contactSection");

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="max-w-345 mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Direct Contact Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
            <div className="flex flex-col gap-6">
              <div>
                <div className="inline-flex gap-2.5 items-center bg-white dark:bg-[#161819] px-2.5 py-1 border border-[#AEAEAE]/20 dark:border-white/10">
                  <div className="bg-[#98ff03] size-4 shrink-0" />
                  <span className="font-space font-normal text-base md:text-lg text-black dark:text-white uppercase tracking-wider whitespace-nowrap">
                    {t("tag")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-inter font-bold text-3xl sm:text-4xl text-black dark:text-white uppercase tracking-tight">
                  {t("heading")}
                </h2>
              </div>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Global Office Locations */}
              <ContactLocations variant="light" className="mt-2" />
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
