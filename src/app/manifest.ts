import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name, short_name: siteConfig.shortName, description: siteConfig.description,
    start_url: "/", scope: "/", display: "browser",
    background_color: siteConfig.colors.background, theme_color: siteConfig.colors.background,
    icons: [192, 512].map(size => ({ src: `/icons/matii-${size}.png`, sizes: `${size}x${size}`, type: "image/png", purpose: "any" })),
  };
}
