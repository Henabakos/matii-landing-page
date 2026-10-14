import assert from "node:assert/strict";
import { test } from "node:test";
import { getDefaultPillarContent } from "./defaults";
import { pillarContentSchema } from "./schema";
import { getPillarTextFields, localizePillar, validatePillarTranslation } from "./translations";

function translatedContent() {
  const content = structuredClone(getDefaultPillarContent("ai"));
  const fields = getPillarTextFields(content);
  content.translations = { de: {
    source: Object.fromEntries(fields.map(field => [field.key, field.source])),
    fields: Object.fromEntries(fields.map(field => [field.key, `DE: ${field.source}`])),
  } };
  return content;
}

test("translations survive JSON storage and localize nested text without changing technical fields", () => {
  const content = pillarContentSchema.parse(JSON.parse(JSON.stringify(translatedContent())));
  const localized = localizePillar(content, "de");
  assert.equal(localized.headline, `DE: ${content.headline}`);
  assert.equal(localized.listing.items[0], `DE: ${content.listing.items[0]}`);
  assert.equal(localized.products[0].capabilities[0], `DE: ${content.products[0].capabilities[0]}`);
  assert.equal(localized.process[0].description, `DE: ${content.process[0].description}`);
  assert.equal(localized.faqs[0].answer, `DE: ${content.faqs[0].answer}`);
  assert.equal(localized.overview?.workflow[0], `DE: ${content.overview?.workflow[0]}`);
  assert.deepEqual(localized.techStack, content.techStack);
  assert.equal(localized.seo.image, content.seo.image);
  for (let i = 0; i < content.products.length; i++) {
    for (const key of ["id", "demoUrl", "imageSrc", "icon", "wide", "group"] as const) {
      assert.equal(localized.products[i][key], content.products[i][key]);
    }
  }
  assert.deepEqual(localizePillar(content, "en"), content);
  assert.deepEqual(localizePillar(content, "am"), content);
});

test("product translations follow stable IDs through reordering and changed English falls back safely", () => {
  const content = translatedContent();
  content.products.reverse();
  content.headline = "Updated English headline";
  const firstName = content.products[0].name;
  const localized = localizePillar(content, "de");
  assert.equal(localized.products[0].name, `DE: ${firstName}`);
  assert.equal(localized.headline, content.headline);
  assert.equal(localized.description, `DE: ${content.description}`);
});

test("AI results must contain complete nonempty strings and obey SEO limits", () => {
  const content = getDefaultPillarContent("enterprise");
  content.seo.title = "English title";
  const fields = getPillarTextFields(content).filter(field => field.key === "seo.title");
  for (const value of [null, [], {}, { "seo.title": 42 }, { "seo.title": " " }, { "seo.title": "x".repeat(201) }]) {
    assert.throws(() => validatePillarTranslation(fields, value));
  }
  assert.deepEqual(validatePillarTranslation(fields, { "seo.title": " Deutscher Titel ", demoUrl: "https://untrusted.example" }), { "seo.title": "Deutscher Titel" });
});
