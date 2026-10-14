import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "./site-config";

export async function renderSocialImage(title: string, label = "SOFTWARE • SYSTEMS • SOLUTIONS") {
  const logo = await readFile(join(process.cwd(), "public/header-logo.svg"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: siteConfig.colors.background, color: "white", padding: "64px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
        {/* ImageResponse needs an embedded image, not next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={siteConfig.name} src={`data:image/svg+xml;base64,${logo.toString("base64")}`} width={240} height={72} style={{ objectFit: "contain", objectPosition: "left" }} />
        <div style={{ display: "flex", color: siteConfig.colors.accent, fontSize: 19, letterSpacing: 2 }}>{label}</div>
      </div>
      <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: siteConfig.colors.accent, marginBottom: 24 }}>{siteConfig.name}</div>
      <div style={{ display: "flex", maxWidth: 1020, fontSize: title.length > 62 ? 49 : 62, lineHeight: 1.12, letterSpacing: -2 }}>{title.slice(0, 110)}</div>
      <div style={{ display: "flex", marginTop: "auto", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #626566", paddingTop: 24, fontSize: 22 }}>
        <div style={{ display: "flex" }}>{new URL(siteConfig.url).hostname}</div>
        <div style={{ width: 96, height: 8, background: siteConfig.colors.accent }} />
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
