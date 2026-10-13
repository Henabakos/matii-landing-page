"use client";

import svgPaths from "@/lib/svgPaths";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ContactForm from "../sections/contact/ContactForm";
import { useTranslations } from "next-intl";

import FooterLogo from "./FooterLogo";

export function Footer() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full">
      <div className="max-w-[1380px] mx-auto relative border border-[rgba(174,174,174,0.4)] dark:border-white/10 bg-white/40 dark:bg-[#161819]/60 flex flex-col justify-between min-h-[300px] md:min-h-[400px] transition-colors duration-200">
        {/* Top Nav Links Row */}
        <div className="border-b border-[rgba(174,174,174,0.3)] dark:border-white/10">
          <nav className="flex flex-wrap justify-between items-center w-full gap-6 md:gap-8 p-8 md:p-14">
            <Link
              href="/services"
              className="text-[#292c2e] hover:text-black dark:text-zinc-300 dark:hover:text-white font-space font-medium text-base md:text-lg tracking-widest uppercase transition-colors"
            >
              <span>{tNav("services")}</span>
            </Link>
            <div className="hidden sm:block bg-[#292c2e] dark:bg-white/40 size-1.5 rounded-full" />
            <Link
              href="/projects"
              className="text-[#292c2e] hover:text-black dark:text-zinc-300 dark:hover:text-white font-space font-medium text-base md:text-lg tracking-widest uppercase transition-colors"
            >
              <span>{tNav("projects")}</span>
            </Link>
            <div className="hidden sm:block bg-[#292c2e] dark:bg-white/40 size-1.5 rounded-full" />
            <Link
              href="/about"
              className="text-[#292c2e] hover:text-black dark:text-zinc-300 dark:hover:text-white font-space font-medium text-base md:text-lg tracking-widest uppercase transition-colors"
            >
              <span>{tNav("about")}</span>
            </Link>
            <div className="hidden sm:block bg-[#292c2e] dark:bg-white/40 size-1.5 rounded-full" />
            <Link
              href="/news"
              className="text-[#292c2e] hover:text-black dark:text-zinc-300 dark:hover:text-white font-space font-medium text-base md:text-lg tracking-widest uppercase transition-colors"
            >
              <span>{tNav("news")}</span>
            </Link>
            <div className="hidden sm:block bg-[#292c2e] dark:bg-white/40 size-1.5 rounded-full" />
            <Link
              href="/careers"
              className="text-[#292c2e] hover:text-black dark:text-zinc-300 dark:hover:text-white font-space font-medium text-base md:text-lg tracking-widest uppercase transition-colors"
            >
              <span>{tNav("careers")}</span>
            </Link>
          </nav>
        </div>

        {/* Middle Brand Showcase - Full Width Logo Fading Out to Bottom */}
        <div className="w-full relative h-[280px] sm:h-[360px] md:h-[460px] flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 select-none">
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 right-0 z-10" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 bottom-0 left-0 z-10" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 right-0 z-10" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-1.5 top-0 left-0 z-10" />

          {/* <div className="hidden md:block absolute top-0 left-0 w-32 h-24 lg:w-56 lg:h-48 dark:opacity-80 z-10 pointer-events-none">
            <Image
              src="/shapes/footer-shape.svg"
              alt="footer-shape"
              className="object-contain"
              fill
            />
          </div>

          <div className="hidden md:block absolute bottom-0 right-0 w-32 h-24 lg:w-56 lg:h-48 dark:opacity-80 z-10 pointer-events-none">
            <Image
              src="/shapes/footer-shape.svg"
              alt="footer-shape"
              className="rotate-180 object-contain"
              fill
            />
          </div> */}

          <div
            className="w-full max-w-[1100px] flex items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Image
              src="/images/matii-footer-logo.svg"
              alt="footer-logo"
              width={1300}
              height={425}
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom Bar (Socials, Copyright, Back to Top) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-8 border-t border-[rgba(174,174,174,0.3)] dark:border-white/10">
          {/* Social Channels & Copyright */}
          <div className="flex flex-wrap items-center gap-8 md:gap-12 text-[#292c2e] dark:text-zinc-300">
            {/* Social Channels */}
            <div className="flex items-center gap-6 font-inter font-medium text-base capitalize">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 dark:hover:text-white transition-colors"
              >
                instagram
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 dark:hover:text-white transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 dark:hover:text-white transition-colors"
              >
                tiktok
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black/60 dark:hover:text-white transition-colors"
              >
                youtube
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 font-inter font-medium text-sm md:text-base text-[#444445]/70 dark:text-zinc-400">
              <div className="size-4 relative shrink-0">
                <svg
                  className="block size-full"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d={svgPaths.pbaf2440}
                    fill="currentColor"
                    className="text-[#444445] dark:text-zinc-400"
                    fillOpacity="0.7"
                  />
                </svg>
              </div>
              <span>2026 Matii Technologies. {tCommon("allRightsReserved")}</span>
            </div>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 font-inter font-medium text-base md:text-lg text-[#292c2e] dark:text-zinc-200 hover:text-[#98ff03] dark:hover:text-[#98ff03] transition-colors group cursor-pointer"
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
