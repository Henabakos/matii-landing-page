"use client";

import Link from "next/link";
import TrustBadge from "./hero/TrustBadge";
import PartnerLogos from "./hero/PartnerLogos";
import ArrowForwardIcon from "./hero/ArrowForwardIcon";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full  px-4 md:px-8 overflow-hidden">
      <div className="relative max-w-[1380px] mx-auto pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="hidden md:block absolute top-0 left-0 w-32 h-32 lg:w-56 lg:h-56">
          <Image
            src="/shapes/hero-shape.svg"
            alt="hero-shape"
            className="object-contain"
            fill
          />
        </div>

        <div className="hidden md:block absolute bottom-0 right-0 w-32 h-32 lg:w-56 lg:h-56">
          <Image
            src="/shapes/hero-shape.svg"
            alt="hero-shape"
            className="rotate-180 object-contain"
            fill
          />
        </div>
        <div className="flex flex-col items-center text-center">
          {/* Top Trust Badge */}
          <div className="mb-6 md:mb-8">
            <TrustBadge />
          </div>

          {/* Main Headline */}
          <h1 className="font-space text-4xl sm:text-6xl lg:text-[80px] font-bold text-[#292c2e] leading-[1.12] md:leading-[1.2] max-w-[760px] tracking-tight mb-6">
            Turning Ideas Into Digital Momentum.
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-base md:text-[18px] text-[#444445] leading-[1.6] max-w-[520px] mb-8 md:mb-10 font-normal">
            From ambitious ideas to powerful digital products, we design and
            build experiences, systems, and technology that move businesses
            forward.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-24">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#292c2e] hover:bg-[#1a1c1d] text-white font-inter font-medium text-sm md:text-[14px] pl-5 pr-2 py-2 rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] inline-flex items-center justify-center gap-2 border border-[#292c2e] transition-all group"
            >
              <span>Start Project</span>
              <div className="bg-[#98ff03] p-2 rounded-[4px] border border-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowForwardIcon color="#292C2E" />
              </div>
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto bg-white hover:bg-[#fafafa] text-[rgba(42,42,42,0.8)] hover:text-[#2a2a2b] font-inter font-medium text-sm md:text-[14px] pl-5 pr-2 py-2 rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.08)] inline-flex items-center justify-center gap-2 border border-[#eee] transition-all group"
            >
              <span>Explore Services</span>
              <div className="bg-[#f3f3f3] p-2 rounded-[4px] border border-[#eee] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowForwardIcon color="black" />
              </div>
            </Link>
          </div>

          {/* Trusted Partners Section */}
          <div className="w-full flex flex-col items-center">
            <p className="font-space uppercase text-xs md:text-sm font-medium tracking-[0.1em] text-[#2a2a2b] mb-8">
              OUR TRUSTED PARTNERS
            </p>
            <PartnerLogos />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
