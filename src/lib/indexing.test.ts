import assert from "node:assert/strict";
import { test } from "node:test";
import { isProductionIndexable } from "./site-config";
import robots from "@/app/robots";
import nextConfig from "../../next.config";

test("known production defaults to indexing; explicit disable and previews stay blocked", () => {
  const production = { NODE_ENV: "production", VERCEL_ENV: "production" } as const;
  for (const value of [undefined, "", "auto", "true", " TRUE "]) {
    assert.equal(isProductionIndexable({ ...production, SEO_INDEXING_ENABLED: value }), true);
  }
  for (const value of ["false", " FALSE ", "invalid"]) {
    assert.equal(isProductionIndexable({ ...production, SEO_INDEXING_ENABLED: value }), false);
  }
  for (const override of [undefined, "true", "auto"]) {
    assert.equal(isProductionIndexable({ ...production, SEO_INDEXING_ENABLED: override, VERCEL_ENV: "preview" }), false);
    assert.equal(isProductionIndexable({ ...production, SEO_INDEXING_ENABLED: override, VERCEL_TARGET_ENV: "staging" }), false);
    assert.equal(isProductionIndexable({ ...production, SEO_INDEXING_ENABLED: override, CONTEXT: "deploy-preview" }), false);
  }
  assert.equal(isProductionIndexable({ NODE_ENV: "development", VERCEL_ENV: "production", SEO_INDEXING_ENABLED: "true" }), false);
  assert.equal(isProductionIndexable({ NODE_ENV: "production" }), false);
  assert.equal(isProductionIndexable({ NODE_ENV: "production", SEO_INDEXING_ENABLED: "true" }), true);
  assert.equal(isProductionIndexable({ NODE_ENV: "production", CONTEXT: "production" }), true);
});

test("production headers and robots allow public crawl without an override; preview blocks it", async t => {
  for (const [key, value] of Object.entries({ NODE_ENV: "production", VERCEL_ENV: "production", VERCEL_TARGET_ENV: "production", CONTEXT: "production", SEO_INDEXING_ENABLED: "" })) {
    const original = process.env[key];
    process.env[key] = value;
    t.after(() => { if (original === undefined) delete process.env[key]; else process.env[key] = original; });
  }
  const headers = await nextConfig.headers!();
  assert.ok(!headers.some(rule => rule.source === "/:path*"));
  assert.ok(headers.some(rule => rule.source === "/admin/:path*"));
  assert.ok(headers.some(rule => rule.source === "/api/:path*"));
  assert.deepEqual(robots().rules, { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] });
  assert.ok(robots().sitemap);
  process.env.VERCEL_ENV = "preview";
  assert.ok((await nextConfig.headers!()).some(rule => rule.source === "/:path*"));
  assert.deepEqual(robots().rules, { userAgent: "*", disallow: "/" });
});
