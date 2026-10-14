import { db } from "@/lib/db";
import { cachedCmsRead } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

export const getActivePartners = cachedCmsRead(
  async () => {
    return await db.partner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  },
  ["partners-active"],
  { tags: ["partners"], revalidate: 3600 },
  () => fallbackRows("Partner").sort((a, b) => a.order - b.order)
);

export type PartnerItem = Awaited<ReturnType<typeof getActivePartners>>[number];
