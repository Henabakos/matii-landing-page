import { PrismaClient } from "@prisma/client";
import { getDefaultPillarContent } from "../src/lib/pillars/defaults";
import { pillarContentSchema } from "../src/lib/pillars/schema";

const db = new PrismaClient();
async function main() {
  for (const id of ["enterprise", "bpo", "ai", "cloud"] as const) {
    const content = JSON.stringify(pillarContentSchema.parse(getDefaultPillarContent(id)));
    await db.servicePillar.upsert({ where: { id }, update: {}, create: { id, draft: content, published: content, publishedAt: new Date() } });
  }
  console.log("Four pillars initialized. Existing edits were preserved.");
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
