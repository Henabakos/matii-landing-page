
"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  ArrowUp,
  Globe,
} from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Our services", href: "/services" },
      // Add your actual service routes here.
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News & insights", href: "/news" },
    ],
  },
  
  {
    title: "Legal",
    links: [
      // Add legal links once their pages exist.
    ],
  },
];

function SocialIcon({ url }: { url: string }) {
  const hostname = new URL(url).hostname.toLowerCase();

  if (hostname.includes("linkedin")) {
    return <FaLinkedinIn className="size-4" aria-hidden="true" />;
  }
  if (hostname.includes("instagram")) {
    return <FaInstagram className="size-4" aria-hidden="true" />;
  }
  if (hostname.includes("facebook")) {
    return <FaFacebookF className="size-4" aria-hidden="true" />;
  }
  if (hostname.includes("github")) {
    return <FaGithub className="size-4" aria-hidden="true" />;
  }
  return <Globe className="size-4" aria-hidden="true" />;
}

export function Footer() {
  const tCommon = useTranslations("common");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full">
      <div className="relative mx-auto flex w-full max-w-[1380px] flex-col overflow-hidden border border-[rgba(174,174,174,0.4)] bg-white/40 transition-colors duration-200 dark:border-white/10 dark:bg-[#161819]/60">

        {/* NAVIGATION COLUMNS */}
        <div className="px-6 pb-12 pt-14 sm:px-10 md:px-14 md:pb-16 md:pt-20">
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-10"
          >
            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="mb-6 font-space text-sm font-semibold tracking-tight text-[#292c2e] dark:text-white">
                  {group.title}
                </h3>

                <ul className="flex flex-col gap-4">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 font-inter text-sm text-[#444445]/75 transition-colors hover:text-[#292c2e] dark:text-zinc-400 dark:hover:text-[#98ff03]"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CONTACT COLUMN */}
            <div className="min-w-0">
              <h3 className="mb-6 font-space text-sm font-semibold text-[#292c2e] dark:text-white">
                Contact
              </h3>

              <div className="flex flex-col gap-4 font-inter text-sm text-[#444445]/75 dark:text-zinc-400">
                <a
                  href="mailto:contact@matii.tech"
                  className="break-all transition-colors hover:text-[#292c2e] dark:hover:text-[#98ff03]"
                >
                  contact@matii.tech
                </a>

                {/* Add verified phone and address here. */}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#292c2e] dark:hover:text-[#98ff03]"
                >
                  Get in touch
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* DIVIDER */}
        <div className="mx-6 border-t border-[rgba(174,174,174,0.3)] sm:mx-10 md:mx-14 dark:border-white/10" />

        {/* COMPANY DETAILS AND SOCIALS */}
        <div className="flex flex-col justify-between gap-8 px-6 py-8 sm:px-10 md:flex-row md:items-start md:px-14 md:py-10">
          <div className="max-w-md">
            <Image
              src="/header-logo.svg"
              alt="MATII TECHNOLOGIES"
              width={180}
              height={48}
              className="h-auto w-44 invert dark:invert-0"
            />
           

            <p className="mt-2 font-inter text-sm leading-relaxed text-[#444445]/75 dark:text-zinc-400">
              Engineering Core Systems, Powering Progress.
            </p>

            <p className="mt-5 font-inter text-xs text-[#444445]/65 dark:text-zinc-500">
              © {new Date().getFullYear()} MATII TECHNOLOGIES.{" "}
              {tCommon("allRightsReserved")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap items-center gap-2.5">
              {siteConfig.socialProfiles.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${new URL(url).hostname}`}
                  className="flex size-9 items-center justify-center rounded-full border border-[#292c2e]/15 text-[#292c2e] transition-all duration-200 hover:border-[#292c2e] hover:bg-[#292c2e] hover:text-white dark:border-white/20 dark:text-zinc-300 dark:hover:border-[#98ff03] dark:hover:bg-[#98ff03] dark:hover:text-[#161819]"
                >
                  <SocialIcon url={url} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex cursor-pointer items-center gap-2 font-inter text-xs font-medium text-[#292c2e] transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-[#98ff03]"
            >
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* OVERSIZED BRAND WORDMARK */}
        <div className="relative flex h-[115px] w-full items-end justify-center overflow-hidden px-4 sm:h-[170px] sm:px-8 md:h-[230px] lg:h-[285px] lg:px-10">
          <div
            className="pointer-events-none relative flex w-full max-w-[1300px] translate-y-[8%] items-end justify-center select-none"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
            }}
          >
            <Image
              src="/images/matii-footer-logo-light.svg"
              alt="MATII TECHNOLOGIES"
              width={1300}
              height={425}
              sizes="(max-width: 768px) 100vw, 1300px"
              className="block h-auto w-full object-contain opacity-25 dark:hidden"
            />

            <Image
              src="/images/matii-footer-logo.svg"
              alt="MATII TECHNOLOGIES"
              width={1300}
              height={425}
              sizes="(max-width: 768px) 100vw, 1300px"
              className="hidden h-auto w-full object-contain opacity-20 dark:block"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
