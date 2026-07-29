"use client";

import svgPaths from "@/lib/svgPaths";
import Image from "next/image";
import ContactForm from "../sections/contact/ContactForm";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full">
      <div className="max-w-[1380px] mx-auto relative border border-[rgba(174,174,174,0.4)] flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
        {/* Top Nav Links Row */}
        <div className="border-b border-[rgba(174,174,174,0.3)]">
          <nav className="flex flex-wrap justify-between items-center w-full gap-6 md:gap-12 p-16">
            <a
              href="#about"
              className="flex items-center gap-6 text-[#292c2e] hover:text-[#98ff03] transition-colors font-space font-medium text-lg md:text-2xl tracking-widest uppercase"
            >
              <span>About us</span>
            </a>
            <div className="hidden sm:block bg-[#292c2e] size-2 rounded-full" />
            <a
              href="#blogs"
              className="flex items-center gap-6 text-[#292c2e] hover:text-[#98ff03] transition-colors font-space font-medium text-lg md:text-2xl tracking-widest uppercase"
            >
              <span>Blogs</span>
            </a>
            <div className="hidden sm:block bg-[#292c2e] size-2 rounded-full" />
            <a
              href="#services"
              className="flex items-center gap-6 text-[#292c2e] hover:text-[#98ff03] transition-colors font-space font-medium text-lg md:text-2xl tracking-widest uppercase"
            >
              <span>Services</span>
            </a>
            <div className="hidden sm:block bg-[#292c2e] size-2 rounded-full" />
            <a
              href="#work"
              className="text-[#292c2e] hover:text-[#98ff03] transition-colors font-space font-medium text-lg md:text-2xl tracking-widest uppercase"
            >
              <span>Work examples</span>
            </a>
          </nav>
        </div>

        <div className="w-full relative h-[460px]">
          <div className="absolute bg-[#292c2e] size-1.5 bottom-0 right-0 z-10" />
          <div className="absolute bg-[#292c2e] size-1.5 bottom-0 left-0  z-10" />
          <div className="absolute bg-[#292c2e] size-1.5 top-0 right-0  z-10" />
          <div className="absolute bg-[#292c2e] size-1.5 top-0 left-0  z-10" />

          <div className="hidden md:block absolute top-0 left-0 w-32 h-26 lg:w-56 lg:h-48">
            <Image
              src="/shapes/footer-shape.svg"
              alt="hero-shape"
              className="object-contain"
              fill
            />
          </div>

          <div className="hidden md:block absolute bottom-0 right-0 w-32 h-26 lg:w-56 lg:h-48">
            <Image
              src="/shapes/footer-shape.svg"
              alt="hero-shape"
              className="rotate-180 object-contain"
              fill
            />
          </div>
        </div>
        {/* Bottom Bar (Socials, Copyright, Back to Top) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-8 border-t">
          {/* Social Channels & Copyright */}
          <div className="flex flex-wrap items-center gap-8 md:gap-12 text-[#292c2e]">
            {/* Social Channels */}
            <div className="flex items-center gap-6 font-inter font-medium text-base md:text-lg capitalize">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 transition-colors"
              >
                instagram
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 transition-colors"
              >
                tiktok
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 transition-colors"
              >
                youtube
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 font-inter font-medium text-sm md:text-base text-[#444445]/70">
              <div className="size-4 relative shrink-0">
                <svg
                  className="block size-full"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d={svgPaths.pbaf2440}
                    fill="#444445"
                    fillOpacity="0.7"
                  />
                </svg>
              </div>
              <span>2026 Motions. All Rights Reserved</span>
            </div>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 font-inter font-medium text-base md:text-lg text-[#292c2e] hover:text-[#98ff03] transition-colors group cursor-pointer"
          >
            <span>
              Back <span className="lowercase">to top</span>
            </span>
            <div className="size-4 relative transform -rotate-90 group-hover:-translate-y-1 transition-transform">
              <svg className="block size-full" fill="none" viewBox="0 0 9 17">
                <path d={svgPaths.p39cfb400} fill="currentColor" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
