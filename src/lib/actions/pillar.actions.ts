"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";
import { pillarContentSchema, pillarIdSchema } from "@/lib/pillars/schema";
import { Prisma } from "@prisma/client";
import { localizePillar, pillarLanguages } from "@/lib/pillars/translations";

export async function savePillarAction(id: unknown, input: unknown, revision: number, publish: boolean) {
  if (!(await isAdminAuthenticated())) return { error: "Please sign in before editing pillars." };
  const parsedId = pillarIdSchema.safeParse(id);
  const parsed = pillarContentSchema.safeParse(input);
  if (!parsedId.success || !parsed.success || !Number.isInteger(revision) || revision < 0 || typeof publish !== "boolean") {
    return { error: !parsed.success ? parsed.error.issues.map(issue => `${issue.path.join(" → ")}: ${issue.message}`).join("; ") : "Invalid pillar or revision." };
  }
  if (parsedId.data === "ai" && !parsed.data.overview) return { error: "The AI platform overview is required." };
  try {
    for (const locale of Object.keys(pillarLanguages)) localizePillar(parsed.data, locale);
  } catch {
    return { error: "A translation exceeds the field limits. Review the translated text before saving." };
  }
  const document = JSON.stringify(parsed.data);
  try {
    await db.$transaction(async tx => {
      const existing = await tx.servicePillar.findUnique({ where: { id: parsedId.data } });
      const data = { draft: document, ...(publish ? { published: document, publishedAt: new Date() } : {}) };
      if (!existing) {
        if (revision !== 0) throw new Error("CONFLICT");
        await tx.servicePillar.create({ data: { id: parsedId.data, ...data, revision: 1 } });
      } else {
        const result = await tx.servicePillar.updateMany({ where: { id: parsedId.data, revision }, data: { ...data, revision: { increment: 1 } } });
        if (!result.count) throw new Error("CONFLICT");
      }
    });
  } catch (error) {
    if ((error instanceof Error && error.message === "CONFLICT") || (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")) {
      return { error: "This pillar changed in another session. Reload before saving to avoid overwriting those changes." };
    }
    console.error("Unable to save pillar", error);
    return { error: "The pillar could not be saved. Your edits are still here; please try again." };
  }
  if (publish) revalidatePath("/", "layout");
  revalidatePath("/admin/pillars");
  return { success: true, revision: revision + 1 };
}
