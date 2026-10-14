"use client";

import ContentEmptyState from "@/components/common/ContentEmptyState";

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
import { useTranslations } from "next-intl";
import type { TestimonialItem } from "@/lib/services/testimonial.service";

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations("testimonials");
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  const displayTestimonials = testimonials ?? [];
  if (!displayTestimonials.length) return <ContentEmptyState kind="testimonials" />;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-345 mx-auto border border-[rgba(174,174,174,0.4)] dark:border-white/10 p-6 md:p-12 relative bg-white dark:bg-[#161819] overflow-hidden transition-colors">
        {/* Top Tag Badge */}
        <div className="flex items-center justify-center mb-6">
          <TestimonialTag />
        </div>

        {/* Headline - Subheadline: Urbanist Medium */}
        <h2 className="font-urbanist font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-[#292c2e] dark:text-white text-center lowercase tracking-tight mb-12 md:mb-16 transition-colors">
          {t("heading")}
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
            {displayTestimonials.map((item, index) => (
              <CarouselItem
                key={item.id || index}
                className="md:basis-1/2 flex m-0 flex-col rounded-0"
              >
                <TestimonialCard
                  quote={item.quote}
                  authorName={item.authorName}
                  authorRole={item.authorRole}
                  avatarUrl={item.avatarUrl}
                  rating={item.rating}
                />
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
