"use client";

import Image from "next/image";
import FaqTag from "./faq/FaqTag";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "Have an idea but don't know where to start?",
    answer:
      "That’s exactly where we come in. We help shape your idea, understand the problem, define the right solution, and turn it into a clear digital product.",
  },
  {
    id: "item-2",
    question: "What kind of projects do you work on?",
    answer:
      "We specialize in full-stack web applications, SaaS platforms, custom AI automation agents, and mobile applications for iOS & Android.",
  },
  {
    id: "item-3",
    question: "How do you start a project?",
    answer:
      "We begin with a discovery phase to align on goals, technical scope, and design strategy. From there, we work in rapid sprints with full transparency.",
  },
  {
    id: "item-4",
    question: "How long does a typical project take?",
    answer:
      "Initial MVPs and core web platforms typically take 4 to 8 weeks, depending on complexity and feature scope.",
  },
  {
    id: "item-5",
    question: "Do you provide post-launch support and scaling?",
    answer:
      "Yes, we offer continuous maintenance, cloud infrastructure monitoring, feature expansion, and performance scaling.",
  },
  {
    id: "item-6",
    question: "Can you integrate AI capabilities into existing platforms?",
    answer:
      "Absolutely. We build custom AI workflows, intelligent agents, and predictive integrations seamlessly into existing backend architectures.",
  },
];

export function Faq() {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 overflow-hidden">
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

      <div className="max-w-[1380px] mx-auto pt-10 md:pt-20 relative bg-white">
        <div className="hidden md:block absolute top-0 left-0 w-32 h-26 lg:w-56 lg:h-48">
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
