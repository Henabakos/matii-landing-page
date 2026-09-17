import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getActivePartners = unstable_cache(
  async () => {
    return await db.partner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  },
  ["partners-active"],
  { tags: ["partners"], revalidate: 3600 }
);

export type PartnerItem = Awaited<ReturnType<typeof getActivePartners>>[number];
