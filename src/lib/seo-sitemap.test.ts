import "next/dist/server/node-environment-baseline";
import { test } from "node:test";
import assert from "node:assert/strict";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { db } from "./db";
import { getDefaultPillarContent } from "./pillars/defaults";
import { fallbackRows } from "./services/cms-fallback-content";
import { siteConfig } from "./site-config";

test("production sitemap uses only current public records, real dates and canonical locales", async t => {
  for (const [key, value] of Object.entries({ NODE_ENV: "production", SEO_INDEXING_ENABLED: "true", VERCEL_ENV: "production", CONTEXT: "production" })) {
    const original = process.env[key]; process.env[key] = value;
    t.after(() => { if (original === undefined) delete process.env[key]; else process.env[key] = original; });
  }
  const previous = Reflect.get(globalThis, "__incrementalCache");
  Reflect.set(globalThis, "__incrementalCache", { generateSimpleCacheKey: async (key: string) => key, get: async () => null, set: async () => {} });
  t.after(() => Reflect.set(globalThis, "__incrementalCache", previous));
  let unavailable = false;
  const pillar = getDefaultPillarContent("ai");
  const project = fallbackRows("Project")[0];
  const blog = fallbackRows("BlogPost")[0];
  const job = fallbackRows("JobPosition")[0];
  const targets: [object, string, (args: { where?: Record<string, unknown> }) => unknown][] = [
    [db.project, "findMany", () => [project]],
    [db.blogPost, "findMany", args => { assert.equal(args.where?.isPublished, true); return [blog]; }],
    [db.newsArticle, "findMany", args => { assert.equal(args.where?.isPublished, true); return []; }],
    [db.jobPosition, "findMany", args => { assert.equal(args.where?.isActive, true); return [job]; }],
    [db.servicePillar, "findUnique", args => args.where?.id === "ai" ? { published: JSON.stringify(pillar) } : { published: null }],
  ];
  for (const [target, method, read] of targets) {
    const original = Reflect.get(target, method);
    Reflect.set(target, method, async (args: { where?: Record<string, unknown> }) => { if (unavailable) throw new Error("offline"); return read(args); });
    t.after(() => Reflect.set(target, method, original));
  }
  const result = await sitemap();
  assert.ok(result.some(row => row.url === `${siteConfig.url}/services/ai`));
  assert.ok(!result.some(row => row.url.includes("/services/cloud") || row.url.includes("/services/ai-data") || row.url.includes("/admin")));
  assert.ok(!result.some(row => row.url.includes(`/de/blog/${blog.slug}`)));
  const projectEntry = result.find(row => row.url === `${siteConfig.url}/projects/${project.slug}`);
  assert.equal(new Date(projectEntry!.lastModified!).toISOString(), project.updatedAt.toISOString());
  assert.ok(!result.find(row => row.url === `${siteConfig.url}/about`)?.lastModified);
  assert.ok(result.find(row => row.url === `${siteConfig.url}/de/about`)?.alternates?.languages?.am);
  assert.equal(robots().sitemap, `${siteConfig.url}/sitemap.xml`);
  pillar.seo.noindex = true;
  assert.ok(!(await sitemap()).some(row => row.url.includes("/services/ai")));
  unavailable = true;
  assert.ok(!(await sitemap()).some(row => /\/(blog|projects|services|careers)\/(?!internships|talent-pool)/.test(new URL(row.url).pathname)));
  process.env.VERCEL_ENV = "preview";
  assert.deepEqual(await sitemap(), []);
  assert.deepEqual(robots().rules, { userAgent: "*", disallow: "/" });
});
