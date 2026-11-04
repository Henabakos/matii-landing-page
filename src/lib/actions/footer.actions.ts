"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";
import { footerContentSchema } from "@/lib/footer/schema";
import { FOOTER_ID } from "@/lib/services/footer.service";

export async function saveFooterAction(input: unknown, revision: number) {
  if (!(await isAdminAuthenticated())) return { error: "Please sign in before editing the footer." };
  const parsed = footerContentSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues.map(issue => `${issue.path.join(" → ")}: ${issue.message}`).join("; ") };
  }
  if (!Number.isInteger(revision) || revision < 0) return { error: "Invalid revision." };

  const content = JSON.stringify(parsed.data);
  try {
    const saved = await db.$transaction(async tx => {
      const existing = await tx.footerContent.findUnique({ where: { id: FOOTER_ID } });
      if (!existing) {
        if (revision !== 0) return false;
        await tx.footerContent.create({ data: { id: FOOTER_ID, content, revision: 1 } });
        return true;
      }
      const result = await tx.footerContent.updateMany({ where: { id: FOOTER_ID, revision }, data: { content, revision: { increment: 1 } } });
      return result.count > 0;
    });
    if (!saved) return { error: "The footer changed in another session. Reload before saving to avoid overwriting those changes." };
  } catch (error) {
    console.error("Unable to save footer", error);
    return { error: "The footer could not be saved. Your edits are still here; please try again." };
  }

  revalidateTag("footer", { expire: 0 });
  revalidatePath("/", "layout");
  return { success: true, revision: revision + 1 };
}
