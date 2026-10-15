"use client";

import Image from "next/image";
import FaqTag from "./faq/FaqTag";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq-data";
import { useTranslations } from "next-intl";

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative max-w-[1380px] mx-auto pt-10 md:pt-20 bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.4)] dark:border-white/10 transition-colors duration-200">
        <div className="hidden md:block absolute -top-1 left-0 w-32 h-24 lg:w-56 lg:h-48 dark:opacity-80" style={{ position: "absolute" }}>
          <Image
            src="/shapes/faq-shape.svg"
            alt="faq-shape"
            className="object-contain"
            fill
          />
        </div>
        {/* Top Tag Badge */}
        <div className="flex items-center justify-center mb-6">
          <FaqTag />
        </div>

        {/* Headline - Subheadline: Urbanist Medium */}
        <h2 className="font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-[#292c2e] dark:text-white text-center lowercase tracking-tight mb-12 md:mb-16 transition-colors">
          {t("heading")}
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 py-16 md:py-24 px-4 md:px-8 gap-8 lg:gap-12 items-center">
          {/* Left Column: Accordion Container (Full Height on Mobile, Scrollable on Desktop) */}
          <div className="lg:col-span-7 w-full relative">
            {/* Bottom Fade Gradient Mask (Desktop Only) */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-[#161819] via-white/80 dark:via-[#161819]/80 to-transparent pointer-events-none z-10 transition-colors" />

            {/* Accordion Container */}
            <div className="max-h-none overflow-visible lg:max-h-[520px] lg:overflow-y-auto lg:pb-16 faq-scroll">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="flex flex-col gap-4 w-full"
              >
                {faqItems.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Column: Illustration Image */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full">
            <Image
              src="/images/faq-illustration.png"
              alt="FAQ Illustration"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="relative hidden md:block h-20 border border-[rgba(174,174,174,0.4)] dark:border-white/10 w-full transition-colors">
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-0.5 -right-0.5 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -bottom-0.5 -left-0.5 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-0.5 -right-0.5 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 -top-0.5 -left-0.5 transition-colors" />
        </div>
      </div>
    </section>
  );
}

export default Faq;
