"use client";

import React from "react";
import ContactFormWhite from "./contact/ContactFormWhite";

export function ContactSectionWhite() {
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
                    Contact
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-inter font-bold text-3xl sm:text-4xl text-black dark:text-white uppercase tracking-tight">
                  LET&apos;S TALK ABOUT YOUR NEXT BIG IDEA.
                </h2>
              </div>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <a
                href="mailto:contact@Matiidigitals.com"
                className="group border border-[#AEAEAE]/40 dark:border-white/10 p-6 bg-white dark:bg-[#161819] flex items-center justify-between relative hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-space text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider">
                    // Direct Email
                  </span>
                  <span className="font-inter font-semibold text-lg text-black dark:text-white">
                    contact@Matiidigitals.com
                  </span>
                </div>
                <div className="size-8 bg-[#f3f4f6] dark:bg-white/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                  <span className="text-[#292c2e] dark:text-[#98ff03] font-bold">→</span>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href="tel:+251945014531"
                className="group border border-[#AEAEAE]/40 dark:border-white/10 p-6 bg-white dark:bg-[#161819] flex items-center justify-between relative hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-space text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider">
                    // Phone / WhatsApp
                  </span>
                  <span className="font-inter font-semibold text-lg text-black dark:text-white">
                    +(251)-945-014-531
                  </span>
                </div>
                <div className="size-8 bg-[#f3f4f6] dark:bg-white/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                  <span className="text-[#292c2e] dark:text-[#98ff03] font-bold">→</span>
                </div>
              </a>

              {/* Office Location */}
              <div className="border border-[#AEAEAE]/40 dark:border-white/10 p-6 bg-white dark:bg-[#161819] flex flex-col gap-1 relative">
                <span className="font-space text-xs text-[#797F8B] dark:text-zinc-400 uppercase tracking-wider">
                  // Headquarter Location
                </span>
                <span className="font-inter font-semibold text-base text-black dark:text-white">
                  Addis Ababa, Ethiopia
                </span>
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
