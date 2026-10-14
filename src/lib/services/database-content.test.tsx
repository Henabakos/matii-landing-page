import assert from "node:assert/strict";
import { test, type TestContext } from "node:test";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";
import { db } from "@/lib/db";
import { fetchNavMenusFromDb } from "./navigation.service";
import { getPublishedPillar } from "./pillar.service";
import { getDefaultPillarContent } from "@/lib/pillars/defaults";
import BlogPage from "@/components/pages/BlogPage";
import Testimonials from "@/components/sections/Testimonials";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import PartnerLogos from "@/components/sections/hero/PartnerLogos";
import ProjectGallery from "@/components/sections/project/ProjectGallery";
import ProjectResults from "@/components/sections/project/ProjectResults";
import ProjectMeta from "@/components/sections/project/ProjectMeta";
import ProjectExploreMore from "@/components/sections/project/ProjectExploreMore";
import AboutUs from "@/components/common/AboutUs";
import CareersSection from "@/components/sections/careers/CareersSection";

function render(content: ReactNode) {
  return renderToStaticMarkup(<NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">{content}</NextIntlClientProvider>);
}

// Prisma delegates are proxies, so Node's descriptor-based method mock cannot wrap them.
function stub(t: TestContext, target: object, name: string, implementation: () => Promise<unknown>) {
  const original = Reflect.get(target, name);
  Reflect.set(target, name, implementation);
  t.after(() => { Reflect.set(target, name, original); });
}

test("empty database collections render empty states without sample records", () => {
  const cases = [
    [<BlogPage initialPosts={[]} />, "No articles published yet"],
    [<Testimonials testimonials={[]} />, "No testimonials published yet"],
    [<SolutionsWeBuilt projects={[]} />, "No projects published yet"],
    [<PartnerLogos partners={[]} />, "No partners listed yet"],
    [<ProjectGallery items={[]} />, "No images published yet"],
    [<AboutUs kpis={[]} />, "No results published yet"],
    [<CareersSection initialJobs={[]} />, "No open roles here right now"],
  ] as const;
  for (const [component, title] of cases) {
    const html = render(component);
    assert.ok(html.includes(title), title);
    assert.doesNotMatch(html, /Ragnarok|Nexis SaaS|Liyana Care|Kiya Kebe/);
  }
});

test("partial project records never invent metrics, clients or related projects", () => {
  assert.match(render(<ProjectResults />), /No results published yet/);
  const results = render(<ProjectResults higherEngagement="0" />);
  assert.match(results, /Higher Engagement/);
  assert.doesNotMatch(results, /Demo Click Growth|Pipeline Influence|Qualified Leads|13\.2|80K/);
  assert.equal(render(<ProjectMeta />), "");
  assert.equal(render(<ProjectExploreMore />), "");
});

test("database-provided content is displayed without sample substitutions", () => {
  const html = render(<ProjectExploreMore projects={[{
    title: "Published database project", description: "Saved project description", slug: "published",
    category: "Engineering", year: "2026", statLabel: "",
  }]} />);
  assert.match(html, /Published database project/);
  assert.doesNotMatch(html, /Digital Wallet|Liyana Care|Conversion Lift|ai-automation\.png/);
});

test("reading an empty navigation table does not seed it", async t => {
  stub(t, db.navMenu, "findMany", async () => []);
  let writes = 0;
  stub(t, db.navMenu, "createMany", async () => { writes++; throw new Error("Unexpected write"); });
  assert.deepEqual(await fetchNavMenusFromDb(), []);
  assert.equal(writes, 0);
});

test("database outages propagate instead of returning sample navigation", async t => {
  stub(t, db.navMenu, "findMany", async () => { throw new Error("Database unavailable"); });
  await assert.rejects(fetchNavMenusFromDb, /Database unavailable/);
});

test("missing and draft-only services remain unpublished", async t => {
  let record: { published: null } | null = null;
  stub(t, db.servicePillar, "findUnique", async () => record);
  assert.equal(await getPublishedPillar("ai"), null);
  record = { published: null };
  assert.equal(await getPublishedPillar("ai"), null);
});

test("published service content is read from the database", async t => {
  const content = getDefaultPillarContent("cloud");
  content.name = "Database service title";
  content.translations = { de: { source: { name: content.name }, fields: { name: "Gespeicherter Dienst" } } };
  stub(t, db.servicePillar, "findUnique", async () => ({ published: JSON.stringify(content) }));
  assert.equal((await getPublishedPillar("cloud"))?.name, "Database service title");
  assert.equal((await getPublishedPillar("cloud", "de"))?.name, "Gespeicherter Dienst");
  assert.equal((await getPublishedPillar("cloud", "am"))?.name, "Database service title");
});
