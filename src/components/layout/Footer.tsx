
"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { useLocale, useTranslations } from "next-intl";
import { isExternalHref, localizeFooter, type FooterContent } from "@/lib/footer/schema";
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
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

function FooterLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (!isExternalHref(href)) return <Link href={href} className={className}>{children}</Link>;
  const web = /^https?:/.test(href);
  return <a href={href} className={className} {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
}

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
  if (hostname === "x.com" || hostname.includes("twitter")) {
    return <FaXTwitter className="size-4" aria-hidden="true" />;
  }
  if (hostname.includes("youtube")) {
    return <FaYoutube className="size-4" aria-hidden="true" />;
  }
  if (hostname.includes("tiktok")) {
    return <FaTiktok className="size-4" aria-hidden="true" />;
  }
  return <Globe className="size-4" aria-hidden="true" />;
}

export function Footer({ content }: { content: FooterContent }) {
  const tCommon = useTranslations("common");
  const footer = localizeFooter(content, useLocale());
  const { contact } = footer;

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
            {footer.groups.filter(group => group.links.length > 0).map((group) => (
              <div key={group.id} className="min-w-0">
                <h3 className="mb-6 font-space text-sm font-semibold tracking-tight text-[#292c2e] dark:text-white">
                  {group.title}
                </h3>

                <ul className="flex flex-col gap-4">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <FooterLink
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 font-inter text-sm text-[#444445]/75 transition-colors hover:text-[#292c2e] dark:text-zinc-400 dark:hover:text-[#98ff03]"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CONTACT COLUMN */}
            {(contact.email || contact.phone || contact.address || contact.ctaLabel) && (
              <div className="min-w-0">
                {contact.title && (
                  <h3 className="mb-6 font-space text-sm font-semibold text-[#292c2e] dark:text-white">
                    {contact.title}
                  </h3>
                )}

                <div className="flex flex-col gap-4 font-inter text-sm text-[#444445]/75 dark:text-zinc-400">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all transition-colors hover:text-[#292c2e] dark:hover:text-[#98ff03]"
                    >
                      {contact.email}
                    </a>
                  )}

                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}
                      className="transition-colors hover:text-[#292c2e] dark:hover:text-[#98ff03]"
                    >
                      {contact.phone}
                    </a>
                  )}

                  {contact.address && (
                    <address className="whitespace-pre-line not-italic leading-relaxed">{contact.address}</address>
                  )}

                  {contact.ctaLabel && contact.ctaHref && (
                    <FooterLink
                      href={contact.ctaHref}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[#292c2e] dark:hover:text-[#98ff03]"
                    >
                      {contact.ctaLabel}
                      <ArrowUpRight className="size-3.5" />
                    </FooterLink>
                  )}
                </div>
              </div>
            )}
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
           

            {footer.tagline && (
              <p className="mt-2 font-inter text-sm leading-relaxed text-[#444445]/75 dark:text-zinc-400">
                {footer.tagline}
              </p>
            )}

            <p className="mt-5 font-inter text-xs text-[#444445]/65 dark:text-zinc-500">
              © {new Date().getFullYear()} {footer.copyrightName || siteConfig.name}.{" "}
              {tCommon("allRightsReserved")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap items-center gap-2.5">
              {footer.socialLinks.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${siteConfig.name} on ${new URL(url).hostname.replace(/^www\./, "")}`}
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
              {footer.backToTopLabel || "Back to top"}
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
