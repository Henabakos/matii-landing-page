// Production domain confirmed by the company owner. Email and booking accounts
// remain unchanged until their replacements are separately verified.
const existingOrigin = "https://matiitechnologies.com";

export function productionOrigin(value = process.env.NEXT_PUBLIC_SITE_URL): string {
  if (!value) return existingOrigin;
  const url = new URL(value);
  // Existing local .env files may point at the development server. Canonicals
  // still use the owner-confirmed public domain; preview indexing stays disabled.
  if (/^(localhost|127\.|0\.|\[::1\])/.test(url.hostname)) return existingOrigin;
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be the public HTTPS production origin, even in preview environments.");
  }
  if (url.pathname !== "/" || url.search || url.hash) throw new Error("NEXT_PUBLIC_SITE_URL must not include a path, query, or fragment.");
  return url.origin;
}

export const siteConfig = {
  name: "MATII TECHNOLOGIES",
  shortName: "MATII",
  description: "MATII TECHNOLOGIES is an Ethiopian technology company building enterprise software, AI and data platforms, BPO solutions, and managed cloud services.",
  // Only spellings the company actually uses. Misspellings such as "Mati
  // Technologies" belong to unrelated companies and blur the brand entity.
  alternateNames: ["Matii Technologies", "Matii Tech", "Matii Digitals"],
  url: productionOrigin(),
  logo: "/header-logo.svg",
  colors: { background: "#292c2e", accent: "#98ff03", foreground: "#ffffff" },
  // Add only verified company profiles: this also supplies Organization.sameAs.
  socialProfiles: [
    "https://www.linkedin.com/company/matii-technologies",
    "https://www.facebook.com/people/Matii-Technologies/61594521985176/",
    "https://x.com/matiitechnology",
    "https://www.youtube.com/@matiitechnologies",
    "https://www.tiktok.com/@matii.technologies",
  ],
};

export function isProductionIndexable(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.NODE_ENV !== "production") return false;
  if (env.VERCEL_ENV && env.VERCEL_ENV !== "production") return false;
  if (env.VERCEL_TARGET_ENV && env.VERCEL_TARGET_ENV !== "production") return false;
  if (env.CONTEXT && env.CONTEXT !== "production") return false;
  const override = env.SEO_INDEXING_ENABLED?.trim().toLowerCase();
  if (override && override !== "auto") return override === "true";
  // Known hosting production environments are public by default. Unknown hosts
  // still require an explicit opt-in; NODE_ENV alone also describes staging.
  return env.VERCEL_ENV === "production" || env.CONTEXT === "production";
}

export function normalizeBrandName(value: string): string {
  return value
    .replace(/\bMatii\s+(?:Digitals?|Technologies)\b/gi, siteConfig.name)
    // These specific template-company labels also occur in the saved CMS data.
    // Do not replace the Motion animation package, ordinary prose, or URLs.
    .replace(/\bMotion Digitals\b|\bMotion(?= Blog\b| Expands Global Footprint\b)/g, siteConfig.name);
}
