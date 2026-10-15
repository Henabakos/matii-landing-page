import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { isProductionIndexable } from "./src/lib/site-config";
import { PILLARS_LIST } from "./src/data/pillars-data";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return PILLARS_LIST.flatMap(pillar => pillar.aliases.flatMap(alias => [
      { source: `/services/${alias}`, destination: `/services/${pillar.slug}`, permanent: true },
      { source: `/:locale(en|om|am|de|pl)/services/${alias}`, destination: `/:locale/services/${pillar.slug}`, permanent: true },
    ]));
  },
  async headers() {
    return [
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      ...(!isProductionIndexable() ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
    ];
  },
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.102"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
