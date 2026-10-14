import type { MetadataRoute } from "next";
import { siteConfig, isProductionIndexable } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
