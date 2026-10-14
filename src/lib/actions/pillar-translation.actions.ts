"use server";

import { isAdminAuthenticated } from "@/lib/auth";
import { pillarContentSchema, pillarLocaleSchema } from "@/lib/pillars/schema";
import { currentTranslation, getPillarTextFields, validatePillarTranslation } from "@/lib/pillars/translations";
import { translateFields } from "@/lib/services/ai-translate.service";

export async function translatePillarAction(input: unknown, target: unknown) {
  if (!(await isAdminAuthenticated())) return { error: "Please sign in before translating pillars." };
  const parsed = pillarContentSchema.safeParse(input);
  const locale = pillarLocaleSchema.safeParse(target);
  if (!parsed.success || !locale.success) return { error: "Save valid English content and select a supported language before translating." };
  const content = parsed.data;
  const existing = content.translations?.[locale.data];
  const fields = getPillarTextFields(content).filter(field => !currentTranslation(existing, field.key, field.source));
  if (fields.reduce((sum, field) => sum + field.source.length, 0) > 150_000) return { error: "This pillar is too large to translate in one request. Shorten the English content and try again." };
  const translation = { source: { ...existing?.source }, fields: { ...existing?.fields } };
  try {
    // Smaller batches prevent truncated JSON responses for large product portfolios.
    const batches: typeof fields[] = [];
    for (const field of fields) {
      let batch = batches[batches.length - 1];
      if (!batch || batch.length >= 24 || batch.reduce((sum, item) => sum + item.source.length, 0) + field.source.length > 14000) {
        batch = []; batches.push(batch);
      }
      batch.push(field);
    }
    for (const batch of batches) {
      const source = Object.fromEntries(batch.map(field => [field.key, field.source]));
      const output = await translateFields({ fields: source, targetLocale: locale.data, strict: true });
      Object.assign(translation.fields, validatePillarTranslation(batch, output));
      Object.assign(translation.source, source);
    }
    return { translation, translated: fields.length };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Translation failed. Your draft has not changed; please try again." };
  }
}
