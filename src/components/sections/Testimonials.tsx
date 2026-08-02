"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import TestimonialTag from "./testimonials/TestimonialTag";
import TestimonialCard from "./testimonials/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "Motion Digitals turned our vision into a high-performance web platform in record time. Their strategic thinking and engineering execution exceeded every expectation.",
    authorName: "Kiya Kebe",
    authorRole: "CEO & Co-founder at Liyana Care",
    avatarUrl: "/avatars/avatar-1.png",
    rating: 5,
  },
  {
    quote:
      "Working with Motion felt like adding a senior product engineering team overnight. They simplified complex workflows and delivered a flawless user experience.",
    authorName: "Abebe Tadesse",
    authorRole: "Head of Product at TechMove Global",
    avatarUrl: "/avatars/avatar-2.png",
    rating: 5,
  },
  {
    quote:
      "Their AI automation and full-stack development transformed our internal operations. We cut processing time by 40% within the first month of deployment.",
    authorName: "Sara Haile",
    authorRole: "Founder at Nexis AI Solutions",
    avatarUrl: "/avatars/avatar-3.png",
    rating: 5,
  },
  {
    quote:
      "From initial product discovery to final mobile launch, Motion Digitals brought clarity, speed, and outstanding design to the entire process.",
    authorName: "Michael Bekele",
    authorRole: "Managing Director at Apex Capital",
    avatarUrl: "/avatars/avatar-1.png",
    rating: 5,
  },
];

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto border border-[rgba(174,174,174,0.4)] p-6 md:p-12 relative bg-white overflow-hidden">
        {/* Top Tag Badge */}
        <div className="flex items-center justify-center mb-6">
          <TestimonialTag />
        </div>

        {/* Headline */}
        <h2 className="font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-[#292c2e] text-center uppercase tracking-tight mb-12 md:mb-16">
          WHAT OUR CLIENTS SAY
        </h2>

        {/* Shadcn Carousel Integration */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="p-0 gap-0">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 flex m-0 flex-col rounded-0"
              >
                <TestimonialCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls & Dots */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[rgba(174,174,174,0.3)]">
            <CarouselDots />
            <div className="flex items-center gap-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
