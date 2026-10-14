import "next/dist/server/node-environment-baseline";
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildMetadata, localizedUrl, publishedLocales, languageAlternates, missingMetadata } from "./seo";
import { siteConfig, productionOrigin, isProductionIndexable, normalizeBrandName } from "./site-config";
import { serializeJsonLd, generateOrganizationSchema } from "@/components/common/JsonLd";
import { staticSeoPaths, staticPageMetadata } from "./seo-pages";
import { getDefaultPillarContent } from "./pillars/defaults";
import { pillarLocales } from "./seo-cms";
import { withCmsFallback, isFallbackContent } from "./services/cms-fallback";

test("canonical URLs follow as-needed prefixes and never use localhost", () => {
  assert.equal(productionOrigin("http://localhost:3000"), "https://matiitechnologies.com");
  assert.equal(localizedUrl("/services/ai", "en"), `${siteConfig.url}/services/ai`);
  assert.equal(localizedUrl("/services/ai", "de"), `${siteConfig.url}/de/services/ai`);
  assert.equal(localizedUrl("/", "am"), `${siteConfig.url}/am`);
  assert.throws(() => productionOrigin("https://example.com/path"));
  assert.equal(Object.keys(languageAlternates("/about")).length, 6);
});
test("indexing requires explicit production approval and excludes host previews", () => {
  assert.equal(isProductionIndexable({ NODE_ENV: "production", SEO_INDEXING_ENABLED: "true" }), true);
  assert.equal(isProductionIndexable({ NODE_ENV: "production", SEO_INDEXING_ENABLED: "true", VERCEL_ENV: "preview" }), false);
  assert.equal(isProductionIndexable({ NODE_ENV: "production", SEO_INDEXING_ENABLED: "true", CONTEXT: "deploy-preview" }), false);
  assert.equal(isProductionIndexable({ NODE_ENV: "development", SEO_INDEXING_ENABLED: "true" }), false);
  assert.equal(isProductionIndexable({ NODE_ENV: "production" }), false);
});
test("metadata does not claim missing translations or repeat the brand", () => {
  const meta = buildMetadata({ title: "AI | Matii Digitals", description: "Published description", path: "/services/ai", locale: "de", locales: ["en"] });
  assert.deepEqual(meta.title, { absolute: "AI | MATII TECHNOLOGIES" });
  assert.equal(meta.alternates?.canonical, `${siteConfig.url}/services/ai`);
  assert.equal(meta.openGraph?.locale, "en_US");
  assert.ok(meta.twitter && "card" in meta.twitter && meta.twitter.card === "summary_large_image");
  assert.deepEqual(publishedLocales({ de: { title: "Titel" }, pl: { title: "Tytuł", content: "Treść" } }, ["title", "content"]), ["en", "pl"]);
  assert.deepEqual(pillarLocales(getDefaultPillarContent("cloud")), ["en"]);
  assert.deepEqual(missingMetadata().robots, { index: false, follow: false });
});
test("all static routes and supported locales have complete, unique metadata", async () => {
  for (const locale of ["en", "om", "am", "de", "pl"]) {
    const titles = new Set(); const descriptions = new Set();
    for (const path of staticSeoPaths) {
      const metadata = await staticPageMetadata(path, { params: Promise.resolve({ locale }) });
      const title = (metadata.title as { absolute: string }).absolute;
      assert.ok(title.includes(siteConfig.name));
      assert.ok(metadata.description && metadata.description.length > 30);
      assert.ok(metadata.openGraph?.images);
      assert.ok(metadata.twitter);
      titles.add(title); descriptions.add(metadata.description);
    }
    assert.equal(titles.size, staticSeoPaths.length, locale);
    assert.equal(descriptions.size, staticSeoPaths.length, locale);
  }
});
test("JSON-LD escapes CMS script injection and excludes unverified profiles", () => {
  const malicious = { name: '</script><script>alert("x")</script>' };
  const serialized = serializeJsonLd(malicious);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), malicious);
  const organization = generateOrganizationSchema(siteConfig.url);
  assert.equal(organization.name, siteConfig.name);
  assert.ok(!("sameAs" in organization));
  assert.equal(organization.logo, `${siteConfig.url}/header-logo.svg`);
  assert.equal(normalizeBrandName("Matii Digitals at https://Matiidigitals.com"), "MATII TECHNOLOGIES at https://Matiidigitals.com");
  assert.equal(normalizeBrandName("Guide | Motion Blog"), "Guide | MATII TECHNOLOGIES Blog");
  assert.equal(normalizeBrandName("Motion animation and https://motion.dev"), "Motion animation and https://motion.dev");
});
test("outage records can be excluded from search without suppressing visible fallback content", async () => {
  const data = await withCmsFallback(async () => { throw new Error("offline"); }, () => [{ title: "Saved article" }], "test");
  assert.equal(data.length, 1);
  assert.ok(isFallbackContent(data));
  assert.ok(isFallbackContent(data[0]));
  assert.equal(isFallbackContent({ title: "Live article" }), false);
});
