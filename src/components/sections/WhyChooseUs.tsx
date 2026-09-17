"use client";

import svgPaths from "@/lib/svgPaths";
import WhyUsTag from "./why-choose-us/WhyUsTag";
import WhyUsCard from "./why-choose-us/WhyUsCard";

import Image from "next/image";

export function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto border border-[rgba(174,174,174,0.4)] dark:border-white/10 bg-white dark:bg-[#161819] relative py-16 transition-colors duration-200">
        <div className="hidden md:block absolute top-0 right-0 w-32 h-26 lg:w-56 lg:h-48 dark:opacity-80">
          <Image
            src="/shapes/white-shape.svg"
            alt="hero-shape"
            className="object-contain"
            fill
          />
        </div>

        <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 -right-1" />
        <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 -left-1" />

        {/* Headline and Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8 p-6 md:px-12">
          <div>
            <WhyUsTag />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12 lg:mb-16 p-6 md:p-12">
          <div className="flex flex-col mb-8s">
            <h2 className="font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-[#292c2e] dark:text-white tracking-tight lowercase transition-colors">
              Built to Solve. Designed to Move.
            </h2>
          </div>
          <p className="font-urbanist font-normal text-base md:text-[18px] leading-[1.4] text-[#444445] dark:text-zinc-300 lg:pt-2 transition-colors">
            We combine strategic thinking, intuitive design, and engineering
            precision to build digital products that move businesses forward.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 -right-1" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 -right-1" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 -left-1" />

          <WhyUsCard
            iconPath={svgPaths.p4a047c0}
            title="Strategic Thinking"
            description="We look beyond the brief to understand the problem, the users, and the bigger opportunity."
          />
          <WhyUsCard
            iconPath={svgPaths.p320c0700}
            title="Creative Direction"
            description="We turn complex ideas into clear, memorable digital experiences that feel purposeful."
          />
          <WhyUsCard
            iconPath={svgPaths.pfe08280}
            title="Technical Excellence"
            description="We build reliable, scalable technology with the engineering foundation to grow with your ambitions."
          />
          <WhyUsCard
            iconPath={svgPaths.p3d195180}
            title="Built for Impact"
            description="We focus on creating solutions that solve real problems and deliver meaningful, measurable value."
          />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
