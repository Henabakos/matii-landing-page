import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getKpis = unstable_cache(
  async () => {
    return await db.kpi.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  },
  ["kpis-all"],
  { tags: ["kpis"], revalidate: 3600 }
);

export const getKpisByCategory = unstable_cache(
  async (category: string) => {
    return await db.kpi.findMany({
      where: { category, isActive: true },
      orderBy: { order: "asc" },
    });
  },
  ["kpis-by-category"],
  { tags: ["kpis"], revalidate: 3600 }
);

export type KpiItem = Awaited<ReturnType<typeof getKpis>>[number];
