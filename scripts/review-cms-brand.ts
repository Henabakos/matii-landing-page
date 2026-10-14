import { readFile, writeFile, mkdir } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";
import { normalizeBrandName } from "../src/lib/site-config";

// Review only by default. No drafts, identities, URLs, testimonials, applications,
// inquiries or credentials are included. Applying requires the reviewed JSON file.
const scope = {
  blogPost: ["title", "excerpt", "content", "seoTitle", "seoDescription", "translations"],
  newsArticle: ["title", "excerpt", "content", "seoTitle", "seoDescription", "translations"],
  project: ["title", "subtitle", "challenge", "solution", "seoTitle", "seoDescription", "translations"],
  jobPosition: ["title", "shortDescription", "content", "seoTitle", "seoDescription", "translations"],
  navMenu: ["label", "footerLabel", "footerCtaLabel", "categories", "translations"],
  servicePillar: ["published"],
} as const;
type Change = { model: keyof typeof scope; id: string; field: string; before: string; after: string };
type Delegate = {
  findMany(args: { where: object }): Promise<Record<string, unknown>[]>;
  updateMany(args: { where: object; data: object }): Promise<{ count: number }>;
};

async function main() {
  if (process.env.DATABASE_URL === undefined) {
    try { process.loadEnvFile(".env"); } catch { /* Normal for hosted environments. */ }
  }
  const prisma = new PrismaClient();
  try {
    const applyPath = process.argv[process.argv.indexOf("--apply") + 1];
    if (process.argv.includes("--apply")) {
      if (!applyPath || applyPath.startsWith("--")) throw new Error("Pass the reviewed JSON filename after --apply.");
      const changes: Change[] = JSON.parse(await readFile(applyPath, "utf8"));
      if (!Array.isArray(changes)) throw new Error("Expected an array of reviewed changes.");
      for (const change of changes) {
        if (!scope[change.model]?.some(field => field === change.field) || typeof change.id !== "string" || typeof change.before !== "string" || change.after !== normalizeBrandName(change.before)) {
          throw new Error("Review file contains a change outside the allowed brand replacement scope.");
        }
      }
      await prisma.$transaction(async tx => {
        for (const change of changes) {
          const delegate = tx[change.model] as unknown as Delegate;
          const data = { [change.field]: change.after, ...(change.model === "servicePillar" ? { revision: { increment: 1 } } : {}) };
          const result = await delegate.updateMany({ where: { id: change.id, [change.field]: change.before }, data });
          if (result.count !== 1) throw new Error(`Content changed since review: ${change.model}/${change.id}. Entire transaction rolled back.`);
        }
      });
      console.log(`Applied ${changes.length} reviewed field updates. Redeploy/revalidate the website cache. Drafts were not published.`);
      return;
    }
    const changes: Change[] = [];
    for (const [model, fields] of Object.entries(scope)) {
      const where = model === "blogPost" || model === "newsArticle" ? { isPublished: true }
        : model === "jobPosition" || model === "navMenu" ? { isActive: true }
        : model === "servicePillar" ? { published: { not: null } } : {};
      const delegate = prisma[model as keyof typeof scope] as unknown as Delegate;
      for (const row of await delegate.findMany({ where })) for (const field of fields) {
        const before = row[field];
        if (typeof before !== "string") continue;
        const after = normalizeBrandName(before);
        if (after !== before) changes.push({ model: model as keyof typeof scope, id: String(row.id), field, before, after });
      }
    }
    await mkdir("artifacts", { recursive: true });
    await writeFile("artifacts/cms-brand-review.json", JSON.stringify(changes, null, 2) + "\n");
    console.log(`Review ready: ${changes.length} proposed field updates in artifacts/cms-brand-review.json. No writes made.`);
  } finally { await prisma.$disconnect(); }
}
main().catch(error => { console.error(error instanceof Error ? error.message : "CMS review failed"); process.exitCode = 1; });
