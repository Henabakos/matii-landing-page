import { db } from "@/lib/db";
import { defaultFooterContent } from "@/lib/footer/defaults";
import { footerContentSchema, type FooterContent } from "@/lib/footer/schema";
import { cachedCmsRead } from "./cms-fallback";

export const FOOTER_ID = "main";

function parseFooter(content: string): FooterContent {
  return footerContentSchema.parse(JSON.parse(content));
}

/** Saved footer, or the defaults when none is saved yet. */
export const getFooterContent = cachedCmsRead(
  async () => {
    const row = await db.footerContent.findUnique({ where: { id: FOOTER_ID } });
    return row ? parseFooter(row.content) : defaultFooterContent;
  },
  ["footer-content"],
  { tags: ["footer"], revalidate: 3600 },
  () => defaultFooterContent,
);

export async function getFooterForAdmin(): Promise<{ content: FooterContent; revision: number; saved: boolean }> {
  const row = await db.footerContent.findUnique({ where: { id: FOOTER_ID } });
  if (!row) return { content: defaultFooterContent, revision: 0, saved: false };
  return { content: parseFooter(row.content), revision: row.revision, saved: true };
}
