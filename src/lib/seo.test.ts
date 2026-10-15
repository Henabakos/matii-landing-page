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
import { getPillarTextFields } from "./pillars/translations";
import nextConfig from "../../next.config";

test("canonical URLs follow as-needed prefixes and never use localhost", () => {
  assert.equal(productionOrigin("http://localhost:3000"), "https://matiitechnologies.com");
  assert.equal(localizedUrl("/services/ai", "en"), `${siteConfig.url}/services/ai`);
  assert.equal(localizedUrl("/services/ai", "de"), `${siteConfig.url}/de/services/ai`);
  assert.equal(localizedUrl("/", "am"), `${siteConfig.url}/am`);
  assert.equal(localizedUrl("/", "unsupported"), `${siteConfig.url}/`);
  assert.throws(() => productionOrigin("https://example.com/path"));
  assert.equal(Object.keys(languageAlternates("/about")).length, 6);
});

test("service aliases permanently redirect in every supported language", async () => {
  const redirects = await nextConfig.redirects!();
  assert.ok(redirects.some(rule => rule.source === "/services/ai-data" && rule.destination === "/services/ai" && rule.permanent));
  assert.ok(redirects.some(rule => rule.source === "/:locale(en|om|am|de|pl)/services/ai-data" && rule.destination === "/:locale/services/ai" && rule.permanent));
});

test("hreflang requires translated body content, not only service headings", () => {
  const content = getDefaultPillarContent("cloud");
  const fields = getPillarTextFields(content).filter(field => field.section !== "SEO");
  const translation = { source: {} as Record<string, string>, fields: {} as Record<string, string> };
  for (const field of fields.filter(field => ["name", "headline", "description"].includes(field.key))) {
    translation.source[field.key] = field.source;
    translation.fields[field.key] = `Translated ${field.source}`;
  }
  content.translations = { de: translation };
  assert.deepEqual(pillarLocales(content), ["en"]);
  for (const field of fields) {
    translation.source[field.key] = field.source;
    translation.fields[field.key] = `Translated ${field.source}`;
  }
  assert.deepEqual(pillarLocales(content), ["en", "de"]);
  content.description += " updated";
  assert.deepEqual(pillarLocales(content), ["en"]);
  assert.deepEqual(publishedLocales({ de: { paragraphs: [" "] } }, ["paragraphs"]), ["en"]);
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
