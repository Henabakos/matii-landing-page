"use client";

import React from "react";
import ContactFormWhite from "./contact/ContactFormWhite";
import SectionTag from "../common/SectionTag";

export function ContactSectionWhite() {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1380px] mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Cards / Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="inline-flex gap-2.5 items-center bg-white px-2.5 py-1 rounded-[2px]">
                <div className="bg-[#98ff03] size-4 shrink-0" />
                <span className="font-space font-normal text-base md:text-lg text-black uppercase tracking-wider whitespace-nowrap">
                  Contact
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-inter font-bold text-3xl sm:text-4xl text-black uppercase tracking-tight">
                LET&apos;S TALK ABOUT YOUR NEXT BIG IDEA.
              </h2>
              <p className="font-inter text-base text-[#555] leading-relaxed">
                Whether you need a full digital product design, backend
                architecture, or custom AI agent automation, we are ready to
                partner with you.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <a
                href="mailto:contact@motiondigitals.com"
                className="group border border-[#AEAEAE]/40 p-6 bg-white hover:bg-[#292c2e] transition-all duration-300 flex items-center justify-between relative"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-space text-xs text-[#797F8B] uppercase tracking-wider group-hover:text-[#98ff03] transition-colors">
                    // Direct Email
                  </span>
                  <span className="font-inter font-semibold text-lg text-black group-hover:text-white transition-colors">
                    contact@motiondigitals.com
                  </span>
                </div>
                <div className="size-8 bg-[#f3f4f6] group-hover:bg-[#98ff03] rounded-full flex items-center justify-center transition-colors">
                  <span className="text-[#292c2e] font-bold">→</span>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href="tel:+251945014531"
                className="group border border-[#AEAEAE]/40 p-6 bg-white hover:bg-[#292c2e] transition-all duration-300 flex items-center justify-between relative"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-space text-xs text-[#797F8B] uppercase tracking-wider group-hover:text-[#98ff03] transition-colors">
                    // Phone / WhatsApp
                  </span>
                  <span className="font-inter font-semibold text-lg text-black group-hover:text-white transition-colors">
                    +(251)-945-014-531
                  </span>
                </div>
                <div className="size-8 bg-[#f3f4f6] group-hover:bg-[#98ff03] rounded-full flex items-center justify-center transition-colors">
                  <span className="text-[#292c2e] font-bold">→</span>
                </div>
              </a>

              {/* Office Location */}
              <div className="border border-[#AEAEAE]/40 p-6 bg-white flex flex-col gap-1 relative">
                <span className="font-space text-xs text-[#797F8B] uppercase tracking-wider">
                  // Headquarter Location
                </span>
                <span className="font-inter font-semibold text-base text-black">
                  Addis Ababa, Ethiopia
                </span>
              </div>
            </div>
          </div>

          {/* White Theme Form Column */}
          <div className="lg:col-span-7">
            <ContactFormWhite />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSectionWhite;
