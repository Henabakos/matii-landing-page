import assert from "node:assert/strict";
import { test } from "node:test";
import { translateFields } from "./ai-translate.service";

test("strict translation reports unavailable providers instead of returning English", async t => {
  const keys = ["GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENAI_API_KEY"] as const;
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  t.after(() => {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  });
  for (const key of keys) delete process.env[key];
  const request = { fields: { headline: "Hello" }, targetLocale: "de", strict: true };
  await assert.rejects(translateFields(request), /unavailable/);
  process.env.OPENAI_API_KEY = "test-only-key";
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response("Quota exceeded", { status: 429 }));
  await assert.rejects(translateFields(request), /Translation failed/);
  fetchMock.mock.mockImplementation(async () => new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ headline: "Hallo" }) } }] }), { status: 200 }));
  assert.deepEqual(await translateFields(request), { headline: "Hallo" });
  fetchMock.mock.mockImplementation(async () => new Response(JSON.stringify({ choices: [] }), { status: 200 }));
  await assert.rejects(translateFields(request), /unavailable/);
});
