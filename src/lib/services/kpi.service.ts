import { db } from "@/lib/db";
import { cachedCmsRead } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

export const getKpis = cachedCmsRead(
  async () => {
    return await db.kpi.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  },
  ["kpis-all"],
  { tags: ["kpis"], revalidate: 3600 },
  () => fallbackRows("Kpi").sort((a, b) => a.order - b.order)
);

export const getKpisByCategory = cachedCmsRead(
  async (category: string) => {
    return await db.kpi.findMany({
      where: { category, isActive: true },
      orderBy: { order: "asc" },
    });
  },
  ["kpis-by-category"],
  { tags: ["kpis"], revalidate: 3600 },
  (category) => fallbackRows("Kpi").filter(row => row.category === category).sort((a, b) => a.order - b.order)
);

export type KpiItem = Awaited<ReturnType<typeof getKpis>>[number];
