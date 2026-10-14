import assert from "node:assert/strict";
import { test } from "node:test";
import { getDefaultPillarContent } from "./defaults";
import { pillarContentSchema } from "./schema";

test("all four existing pillars remain valid CMS documents", () => {
  for (const id of ["enterprise", "bpo", "ai", "cloud"] as const) {
    const content = pillarContentSchema.parse(getDefaultPillarContent(id));
    assert.equal(content.products.length, id === "ai" ? 9 : 4);
    assert.equal(content.listing.items.length, 4);
  }
  assert.equal(getDefaultPillarContent("ai").products.flatMap(p => p.capabilities).length, 63);
});

test("CMS rejects unsafe destinations, duplicate anchors and unknown icons", () => {
  for (const url of ["javascript:alert(1)", "//untrusted.example/image.svg", "data:text/html,test", "/\\untrusted.example", "http://insecure.example"]) {
    const content = structuredClone(getDefaultPillarContent("ai"));
    content.products[0].demoUrl = url;
    assert.equal(pillarContentSchema.safeParse(content).success, false, url);
  }
  const duplicate = structuredClone(getDefaultPillarContent("ai"));
  duplicate.products[1].id = duplicate.products[0].id;
  assert.equal(pillarContentSchema.safeParse(duplicate).success, false);
  const content = getDefaultPillarContent("ai");
  assert.equal(pillarContentSchema.safeParse({ ...content, products: [{ ...content.products[0], icon: "MissingIcon" }] }).success, false);
});
