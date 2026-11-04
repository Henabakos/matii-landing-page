import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { footerContentSchema } from "../src/lib/footer/schema";
import { pillarContentSchema } from "../src/lib/pillars/schema";
import { tableConfigs } from "./production-content/tables";

// Seeds prisma/production-content into a production database.
// - Inserts only records that do not exist yet; it never updates or deletes.
// - Template records are always inserted hidden (isActive/isPublished = false).
// - Applications and inquiries are never touched.
// Flags: --dry-run (report, then roll back), --core-only, --with-project-template,
// --if-empty (skip entirely once any core content exists; used on every deploy)
type Row = Record<string, unknown>;
type Delegate = {
  findFirst(args: { where?: Row }): Promise<{ id: string } | null>;
  create(args: { data: Row }): Promise<{ id: string }>;
};

const dryRun = process.argv.includes("--dry-run");
const ifEmpty = process.argv.includes("--if-empty");
const coreOnly = process.argv.includes("--core-only");
const withProjectTemplate = process.argv.includes("--with-project-template");

class DryRunRollback extends Error {}

function loadRows(group: string, file: string): Row[] {
  const path = join("prisma/production-content", group, file);
  if (!existsSync(path)) return [];
  const rows = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(rows)) throw new Error(`${path} must contain a JSON array`);
  return rows;
}

// Text columns hold JSON; files keep it as structured JSON.
function toData(row: Row, hiddenFlag?: string) {
  const data: Row = {};
  for (const [field, value] of Object.entries(row)) {
    if (field.startsWith("_")) continue; // _note fields are editing hints only
    data[field] = value !== null && typeof value === "object" ? JSON.stringify(value) : value;
  }
  if (hiddenFlag) data[hiddenFlag] = false;
  return data;
}

async function main() {
  if (existsSync(".env")) process.loadEnvFile(".env");
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString || !/^postgres(ql)?:\/\//.test(connectionString)) {
    throw new Error("Set DIRECT_URL (or DATABASE_URL) to the PostgreSQL database to seed.");
  }

  const configs = tableConfigs.filter(config => {
    if (coreOnly && config.group !== "core") return false;
    if (config.table === "Project" && !withProjectTemplate) return false;
    return true;
  });
  const source = configs.map(config => ({ ...config, rows: loadRows(config.group, config.file) }));
  for (const row of source.find(item => item.table === "ServicePillar")?.rows ?? []) {
    for (const field of ["draft", "published"]) if (row[field]) pillarContentSchema.parse(row[field]);
  }
  for (const row of source.find(item => item.table === "FooterContent")?.rows ?? []) footerContentSchema.parse(row.content);

  const prisma = new PrismaClient({ datasourceUrl: connectionString, log: [] });
  const report: { table: string; inserted: string[]; skipped: number }[] = [];
  try {
    await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(20261104)`;
      if (ifEmpty) {
        for (const config of tableConfigs.filter(config => config.group === "core")) {
          if (await (tx[config.delegate as keyof typeof tx] as unknown as Delegate).findFirst({})) {
            console.log(`Seed skipped: ${config.table} already has content.`);
            return;
          }
        }
      }
      for (const { table, delegate, keys, hiddenFlag, rows } of source) {
        const model = tx[delegate as keyof typeof tx] as unknown as Delegate;
        const result = { table, inserted: [] as string[], skipped: 0 };
        for (const row of rows) {
          const data = toData(row, hiddenFlag);
          if (table === "ServicePillar" && data.published) data.publishedAt = new Date();
          const identity = Object.fromEntries(keys.map(key => [key, data[key]]));
          const alternatives: Row[] = [identity];
          if (table === "ProjectCategory") alternatives.push({ name: data.name });
          if (await model.findFirst({ where: { OR: alternatives } })) {
            result.skipped++;
          } else {
            await model.create({ data });
            result.inserted.push(keys.map(key => String(data[key])).join(" / "));
          }
        }
        report.push(result);
      }
      if (dryRun) throw new DryRunRollback();
    }, { timeout: 180_000, maxWait: 30_000 });
  } catch (error) {
    if (!(error instanceof DryRunRollback)) throw error;
  } finally {
    await prisma.$disconnect();
  }

  if (!report.length) return;
  for (const { table, inserted, skipped } of report) {
    console.log(`${table}: ${dryRun ? "would insert" : "inserted"} ${inserted.length}, kept ${skipped} existing${inserted.length ? ` (${inserted.join(", ")})` : ""}`);
  }
  console.log(dryRun ? "Dry run: nothing was written." : "Production content seeded. Templates are hidden until you activate them in /admin.");
}

main().catch(error => {
  console.error("Production seed failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
