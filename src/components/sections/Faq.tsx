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

export function Faq() {
  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      {/* Hide Scrollbar Cross-Browser */}
      <style jsx global>{`
        .faq-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .faq-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="relative max-w-[1380px] mx-auto pt-10 md:pt-20 bg-white border border-[rgba(174,174,174,0.4)]">
        <div className="hidden md:block absolute -top-1 left-0 w-32 h-26 lg:w-56 lg:h-48">
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

        {/* Headline */}
        <h2 className="font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-[#292c2e] text-center uppercase tracking-tight mb-12 md:mb-16">
          Questions? We Have Answers.
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12  py-16 md:py-24 px-4 md:px-8 gap-8 lg:gap-12 items-center">
          {/* Left Column: Accordion Container (Full Height on Mobile, Scrollable on Desktop) */}
          <div className="lg:col-span-7 w-full relative">
            {/* Bottom Fade Gradient Mask (Desktop Only) */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

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
              priority
            />
          </div>
        </div>
        <div className="relative hidden md:block h-20 border border-[rgba(174,174,174,0.4)]  w-full">
          <div className="absolute bg-[#292c2e] size-1.5 -bottom-0.5 -right-0.5" />
          <div className="absolute bg-[#292c2e] size-1.5 -bottom-0.5 -left-0.5" />
          <div className="absolute bg-[#292c2e] size-1.5 -top-0.5 -right-0.5" />
          <div className="absolute bg-[#292c2e] size-1.5 -top-0.5 -left-0.5" />
        </div>
      </div>
    </section>
  );
}

export default Faq;
