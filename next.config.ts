import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { isProductionIndexable } from "./src/lib/site-config";
import { PILLARS_LIST } from "./src/data/pillars-data";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];
// Public files keep stable names, so allow a day of freshness rather than immutable caching.
const publicAssetCache = { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" };

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return PILLARS_LIST.flatMap(pillar => pillar.aliases.flatMap(alias => [
      { source: `/services/${alias}`, destination: `/services/${pillar.slug}`, permanent: true },
      { source: `/:locale(en|om|am|de|pl)/services/${alias}`, destination: `/:locale/services/${pillar.slug}`, permanent: true },
    ]));
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      ...["icons", "images", "illustrations", "shapes", "avatars", "social"].map(dir => ({ source: `/${dir}/:path*`, headers: [publicAssetCache] })),
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
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
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
