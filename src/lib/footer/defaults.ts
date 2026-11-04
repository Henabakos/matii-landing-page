import { siteConfig } from "@/lib/site-config";
import type { FooterContent } from "./schema";

// Starting content for the footer editor and the public footer when no record
// is saved yet. Matches the footer before it moved into the CMS.
export const defaultFooterContent: FooterContent = {
  groups: [
    {
      id: "company",
      title: "Company",
      links: [
        { id: "about", label: "About us", href: "/about" },
        { id: "projects", label: "Our projects", href: "/projects" },
        { id: "careers", label: "Careers", href: "/careers" },
        { id: "internships", label: "Internships", href: "/careers/internships" },
        { id: "talent-pool", label: "Talent pool", href: "/careers/talent-pool" },
        { id: "contact", label: "Contact", href: "/contact" },
      ],
    },
    {
      id: "services",
      title: "Services",
      links: [{ id: "our-services", label: "Our services", href: "/services" }],
    },
    {
      id: "resources",
      title: "Resources",
      links: [
        { id: "blog", label: "Blog", href: "/blog" },
        { id: "news", label: "News & insights", href: "/news" },
      ],
    },
    // Columns without links are hidden; add legal links once their pages exist.
    { id: "legal", title: "Legal", links: [] },
  ],
  contact: {
    title: "Contact",
    email: "contact@matii.tech",
    phone: "",
    address: "",
    ctaLabel: "Get in touch",
    ctaHref: "/contact",
  },
  tagline: "Engineering Core Systems, Powering Progress.",
  copyrightName: siteConfig.name,
  backToTopLabel: "Back to top",
  socialLinks: [...siteConfig.socialProfiles],
  translations: {},
};
