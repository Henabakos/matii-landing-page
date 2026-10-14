import { cache } from "react";
import { db } from "@/lib/db";
import { getDefaultPillarContent } from "@/lib/pillars/defaults";
import { pillarContentSchema, type PillarId } from "@/lib/pillars/schema";
import { localizePillar } from "@/lib/pillars/translations";
import { withCmsFallback } from "./cms-fallback";

export const getPublishedPillar = cache(async (id: PillarId, locale = "en") => {
  return withCmsFallback(async () => {
    const record = await db.servicePillar.findUnique({ where: { id } });
    return record?.published
      ? localizePillar(pillarContentSchema.parse(JSON.parse(record.published)), locale)
      : null;
  }, () => localizePillar(getDefaultPillarContent(id), locale), `service:${id}`);
});

export async function getPillarDraft(id: PillarId) {
  const record = await db.servicePillar.findUnique({ where: { id } });
  return {
    id,
    content: record ? pillarContentSchema.parse(JSON.parse(record.draft)) : getDefaultPillarContent(id),
    revision: record?.revision ?? 0,
    publishedAt: record?.publishedAt?.toISOString() ?? null,
    hasDraft: record ? record.draft !== record.published : false,
  };
}
