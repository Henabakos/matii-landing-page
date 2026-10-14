import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { Prisma, PrismaClient } from "@prisma/client";
import { pillarContentSchema } from "../src/lib/pillars/schema";

// Only public content is restored. Applications and inquiries are never copied or deleted.
const tables = [
  { table: "Kpi", delegate: "kpi", keys: ["key"] },
  { table: "Partner", delegate: "partner", keys: ["name"] },
  { table: "Project", delegate: "project", keys: ["slug"] },
  { table: "BlogPost", delegate: "blogPost", keys: ["slug"] },
  { table: "NewsArticle", delegate: "newsArticle", keys: ["slug"] },
  { table: "Testimonial", delegate: "testimonial", keys: ["authorName", "authorRole"] },
  { table: "NavMenu", delegate: "navMenu", keys: ["key"] },
  { table: "JobPosition", delegate: "jobPosition", keys: ["slug"] },
  { table: "ProjectCategory", delegate: "projectCategory", keys: ["slug"] },
  { table: "ServicePillar", delegate: "servicePillar", keys: ["id"] },
] as const;

type Row = Record<string, unknown>;
type Delegate = {
  findFirst(args: { where: Row }): Promise<{ id: string } | null>;
  create(args: { data: Row }): Promise<{ id: string }>;
  count(): Promise<number>;
};
type SqliteDatabase = {
  prepare(sql: string): { all(): Row[] };
  exec(sql: string): void;
  close(): void;
};

function readPreviousContent(path: string) {
  if (!existsSync(path)) throw new Error(`SQLite source not found: ${path}`);
  const require = createRequire(resolve("package.json"));
  const { DatabaseSync } = require("node:sqlite") as {
    DatabaseSync: new (path: string, options: { readOnly: boolean }) => SqliteDatabase;
  };
  const sqlite = new DatabaseSync(path, { readOnly: true });
  try {
    sqlite.exec("BEGIN");
    const available = new Set(sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map(row => row.name));
    return tables.map(config => {
      if (!available.has(config.table)) return { ...config, rows: [] as Row[] };
      const model = Prisma.dmmf.datamodel.models.find(model => model.name === config.table)!;
      const rows = sqlite.prepare(`SELECT * FROM "${config.table}"`).all().map(source => {
        const data: Row = {};
        for (const field of model.fields) {
          if (field.kind !== "scalar" || !(field.name in source)) continue;
          const value = source[field.name];
          if (value !== null && field.type === "Boolean") data[field.name] = Boolean(value);
          else if (value !== null && field.type === "DateTime") {
            const date = new Date(value as string | number);
            if (Number.isNaN(date.getTime())) throw new Error(`Invalid date in ${config.table}.${field.name}`);
            data[field.name] = date;
          } else data[field.name] = value;
        }
        if (config.table === "ServicePillar") {
          for (const field of ["draft", "published"]) {
            if (data[field]) pillarContentSchema.parse(JSON.parse(data[field] as string));
          }
        }
        return data;
      });
      return { ...config, rows };
    });
  } finally {
    sqlite.close();
  }
}

async function main() {
  if (existsSync(".env")) process.loadEnvFile(".env");
  const sourcePath = resolve(process.env.SEED_SQLITE_PATH || "prisma/dev.db");
  const source = readPreviousContent(sourcePath);
  console.log("Previous public content:", Object.fromEntries(source.map(({ table, rows }) => [table, rows.length])));
  if (process.argv.includes("--dry-run")) {
    console.log("Dry run passed. No connection or writes were made to Neon.");
    return;
  }

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString || !/^postgres(ql)?:\/\//.test(connectionString) || connectionString.includes("YOUR-ENDPOINT")) {
    throw new Error("Set DIRECT_URL (or DATABASE_URL) to your real PostgreSQL connection string.");
  }
  const url = new URL(connectionString);
  if (!url.searchParams.has("connect_timeout")) url.searchParams.set("connect_timeout", "30");
  const prisma = new PrismaClient({ datasourceUrl: url.toString(), log: [] });
  try {
    // One transaction prevents partially restored sites. Reruns preserve existing edits.
    const report = await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(20261013)`;
      const result: { table: string; inserted: number; preserved: number; total: number }[] = [];
      for (const { table, delegate, keys, rows } of source) {
        const model = tx[delegate] as unknown as Delegate;
        let inserted = 0;
        let preserved = 0;
        for (const data of rows) {
          const identity = Object.fromEntries(keys.map(key => [key, data[key]]));
          const alternatives: Row[] = [{ id: data.id }, identity];
          if (table === "ProjectCategory") alternatives.push({ name: data.name });
          if (await model.findFirst({ where: { OR: alternatives } })) {
            preserved++;
          } else {
            await model.create({ data });
            inserted++;
          }
        }
        result.push({ table, inserted, preserved, total: await model.count() });
      }
      return result;
    }, { timeout: 180_000, maxWait: 30_000 });
    for (const item of report) console.log(`${item.table}: inserted ${item.inserted}, preserved ${item.preserved}, total ${item.total}`);
    console.log("Seed committed. Existing records, applications and inquiries were preserved.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(error => {
  console.error("Previous-content seed failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
