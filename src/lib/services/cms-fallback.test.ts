import "next/dist/server/node-environment-baseline";
import assert from "node:assert/strict";
import { test } from "node:test";
import { db } from "@/lib/db";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "./blog.service";
import { getAllJobPositions, getJobPositionBySlug } from "./career.service";
import { getAllNewsArticles, getFeaturedNews, getNewsArticleBySlug } from "./news.service";
import { getAllProjects, getSolutionsBuiltProjects, getProjectBySlug, getAllProjectCategories, getAdminAllProjects } from "./project.service";
import { getActivePartners } from "./partner.service";
import { getActiveTestimonials } from "./testimonial.service";
import { getKpis, getKpisByCategory } from "./kpi.service";
import { getAllNavMenus, getAdminNavMenus } from "./navigation.service";
import { getPublishedPillar } from "./pillar.service";
import { cachedCmsRead } from "./cms-fallback";

test("all public CMS readers handle outages, preserve empty responses, and recover", async t => {
  // Exercise Next's real cache wrapper with an in-memory cache adapter.
  const entries = new Map<string, unknown>();
  const previousCache = Reflect.get(globalThis, "__incrementalCache");
  Reflect.set(globalThis, "__incrementalCache", {
    generateSimpleCacheKey: async (key: string) => key,
    get: async (key: string) => entries.has(key) ? { value: entries.get(key), isStale: false } : null,
    set: async (key: string, value: unknown) => { entries.set(key, value); },
  });
  t.after(() => Reflect.set(globalThis, "__incrementalCache", previousCache));
  let failing = true;
  for (const delegate of [db.blogPost, db.jobPosition, db.newsArticle, db.project, db.projectCategory, db.partner, db.testimonial, db.kpi, db.navMenu, db.servicePillar]) {
    for (const method of ["findMany", "findUnique", "findFirst", "count"]) {
      const original = Reflect.get(delegate, method);
      Reflect.set(delegate, method, async () => {
        if (failing) throw new Error("Backend unavailable");
        return method === "findMany" ? [] : method === "count" ? 0 : null;
      });
      t.after(() => Reflect.set(delegate, method, original));
    }
  }

  const lists = [getAllBlogPosts, getAllJobPositions, getAllProjects, getSolutionsBuiltProjects,
    getAllProjectCategories, getActivePartners, getActiveTestimonials, getKpis, getAllNavMenus];
  for (const read of lists) assert.ok((await read()).length > 0);
  assert.equal(entries.size, 0, "failures must never write fallback data into the cache");
  const post = (await getAllBlogPosts())[0];
  assert.equal((await getBlogPostBySlug(post.slug))?.slug, post.slug);
  assert.ok((await getRelatedBlogPosts(post.category, post.slug)).every(row => row.category === post.category && row.slug !== post.slug));
  const project = (await getAllProjects())[0];
  assert.equal((await getProjectBySlug(project.slug))?.slug, project.slug);
  const job = (await getAllJobPositions())[0];
  assert.equal((await getJobPositionBySlug(job.slug))?.slug, job.slug);
  assert.ok((await getKpisByCategory("HERO_ABOUT")).length > 0);
  assert.deepEqual(await getKpisByCategory("unknown"), []);
  assert.deepEqual(await getAllNewsArticles(), []);
  assert.equal(await getFeaturedNews(), null);
  assert.equal(await getNewsArticleBySlug("unknown"), null);
  assert.equal(await getBlogPostBySlug("unknown"), null);
  assert.equal(await getProjectBySlug("unknown"), null);
  assert.equal(await getJobPositionBySlug("unknown"), null);
  for (const id of ["ai", "cloud", "enterprise", "bpo"] as const) assert.ok(await getPublishedPillar(id));
  await assert.rejects(getAdminAllProjects, /Backend unavailable/);
  await assert.rejects(getAdminNavMenus, /Backend unavailable/);

  failing = false;
  for (const read of [...lists, getAllNewsArticles]) assert.deepEqual(await read(), []);
  assert.equal(await getBlogPostBySlug(post.slug), null);
  assert.equal(await getProjectBySlug(project.slug), null);
  assert.equal(await getJobPositionBySlug(job.slug), null);
  assert.equal(await getPublishedPillar("ai"), null);
  assert.deepEqual(await getKpisByCategory("HERO_ABOUT"), []);
  assert.deepEqual(await getRelatedBlogPosts(post.category, post.slug), []);
  assert.equal(await getFeaturedNews(), null);

  let unavailable = true;
  const read = cachedCmsRead(async () => {
    if (unavailable) throw new Error("Missing backend");
    return ["Live CMS content"];
  }, ["recovery-test"], { revalidate: 60 }, () => ["Fallback content"]);
  assert.deepEqual(await read(), ["Fallback content"]);
  unavailable = false;
  assert.deepEqual(await read(), ["Live CMS content"]);
});
