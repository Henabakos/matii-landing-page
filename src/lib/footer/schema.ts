import { z } from "zod";

export const footerLocales = ["om", "am", "de", "pl"] as const;

const text = (max: number) => z.string().trim().max(max);
const id = z.string().trim().regex(/^[a-z0-9-]{1,40}$/, "Use lowercase letters, numbers and dashes");
// Site paths ("/about", not "//host"), web links, email and phone links only.
const href = z.string().trim().max(500).refine(
  value => /^\/(?!\/)/.test(value) || /^https?:\/\/[^\s]+$/.test(value) || /^mailto:[^\s]+$/.test(value) || /^tel:\+?[0-9 ()-]+$/.test(value),
  "Use a site path like /about, an https:// link, mailto: or tel:",
);

export const footerLinkSchema = z.object({
  id,
  label: text(80).min(1, "Link label is required"),
  href,
});

export const footerGroupSchema = z.object({
  id,
  title: text(60).min(1, "Column title is required"),
  links: z.array(footerLinkSchema).max(20),
});

// Translations are flat maps of field key → text, keyed as returned by footerTranslatableFields.
export const footerContentSchema = z.object({
  groups: z.array(footerGroupSchema).max(8),
  contact: z.object({
    title: text(60),
    email: z.union([z.literal(""), z.string().trim().email().max(200)]),
    phone: text(40).refine(value => !value || /^\+?[0-9 ()-]+$/.test(value), "Use digits, spaces, +, ( ) and -"),
    address: text(300),
    ctaLabel: text(60),
    ctaHref: z.union([z.literal(""), href]),
  }),
  tagline: text(200),
  copyrightName: text(100),
  backToTopLabel: text(40),
  socialLinks: z.array(z.string().trim().url().max(300).refine(value => value.startsWith("https://"), "Use an https:// link")).max(12),
  translations: z.partialRecord(z.enum(footerLocales), z.record(z.string(), text(300))).default({}),
}).superRefine((content, ctx) => {
  const ids = new Set<string>();
  content.groups.forEach((group, groupIndex) => {
    for (const [path, value] of [[["groups", groupIndex, "id"], group.id], ...group.links.map((link, linkIndex) => [["groups", groupIndex, "links", linkIndex, "id"], link.id] as const)] as const) {
      if (ids.has(value)) ctx.addIssue({ code: "custom", path: [...path], message: `Duplicate id "${value}"` });
      ids.add(value);
    }
  });
});

export type FooterContent = z.infer<typeof footerContentSchema>;
export type FooterGroup = z.infer<typeof footerGroupSchema>;
export type FooterLink = z.infer<typeof footerLinkSchema>;

/** English source text for every translatable field, keyed for the translations map. */
export function footerTranslatableFields(content: FooterContent): Record<string, string> {
  const fields: Record<string, string> = {
    tagline: content.tagline,
    contactTitle: content.contact.title,
    ctaLabel: content.contact.ctaLabel,
    backToTopLabel: content.backToTopLabel,
  };
  for (const group of content.groups) {
    fields[`group.${group.id}`] = group.title;
    for (const link of group.links) fields[`link.${link.id}`] = link.label;
  }
  return Object.fromEntries(Object.entries(fields).filter(([, value]) => value));
}

/** The footer with every translatable field replaced by its saved translation, when present. */
export function localizeFooter(content: FooterContent, locale: string): FooterContent {
  const t = content.translations[locale as (typeof footerLocales)[number]];
  if (!t) return content;
  const pick = (key: string, fallback: string) => t[key]?.trim() || fallback;
  return {
    ...content,
    tagline: pick("tagline", content.tagline),
    backToTopLabel: pick("backToTopLabel", content.backToTopLabel),
    contact: { ...content.contact, title: pick("contactTitle", content.contact.title), ctaLabel: pick("ctaLabel", content.contact.ctaLabel) },
    groups: content.groups.map(group => ({
      ...group,
      title: pick(`group.${group.id}`, group.title),
      links: group.links.map(link => ({ ...link, label: pick(`link.${link.id}`, link.label) })),
    })),
  };
}

export function isExternalHref(href: string) {
  return !href.startsWith("/");
}
