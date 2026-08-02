"use client";

import Image from "next/image";
import svgPaths from "@/lib/svgPaths";
import AboutTag from "../sections/about-us/AboutTag";
import MetricCard from "../sections/about-us/MetricCard";

export function AboutUs() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto bg-white py-16 md:py-24 px-4 md:px-8">
        {/* Top Tag Badge */}
        <div className="mb-8">
          <AboutTag />
        </div>

        {/* Headline and Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          <h2 className="lg:col-span-6 font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black tracking-tight">
            built from here.
            <br />
            made for everywhere.
          </h2>
          <p className="lg:col-span-6 font-inter font-normal text-base md:text-[20px] leading-[1.4] text-[#444445] lg:pt-2">
            We build digital products, systems, and experiences that move ideas
            forward. Every line of code, every pixel of design — rooted in where
            we are, built for where we are going.
          </p>
        </div>

        {/* Metrics Cards & Illustration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Metric Cards Stack */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <MetricCard
              iconPath={svgPaths.p35638972}
              number="50+"
              description="Digital products designed and built across diverse industries."
            />
            <MetricCard
              iconPath={svgPaths.p28ab6b00}
              number="10+"
              description="Industries transformed through thoughtful design and technology."
            />
            <MetricCard
              iconPath={svgPaths.p9d06a00}
              number="∞"
              description="Possibilities created by turning ambitious ideas into digital reality."
            />
          </div>

          {/* Right Side Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[320px] sm:h-[400px] md:h-[480px]">
            <Image
              src="/images/about-illustration.png"
              alt="About Us Illustration"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
