import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "om", "am", "de", "pl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Page metadata knows which CMS translations are actually published. Avoid a
  // competing HTTP Link header that advertises every configured language.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
