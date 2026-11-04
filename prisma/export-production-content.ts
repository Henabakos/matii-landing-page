import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { pillarContentSchema } from "../src/lib/pillars/schema";
import { jsonTextFields, tableConfigs } from "./production-content/tables";

// Refreshes the core content files from the local SQLite database. Templates are
// hand-written and never touched. Usage: npm run content:export
type Row = Record<string, unknown>;
type SqliteDatabase = { prepare(sql: string): { all(): Row[] }; close(): void };

// Database-generated columns; production assigns its own.
const generated = new Set(["createdAt", "updatedAt", "publishedAt"]);

function toFileRow(table: string, source: Row) {
  const row: Row = {};
  for (const [field, value] of Object.entries(source)) {
    if (generated.has(field) || (field === "id" && table !== "ServicePillar")) continue;
    if (field === "isActive" || field === "isPublished") row[field] = Boolean(value);
    else if (jsonTextFields.has(field) && typeof value === "string") row[field] = value ? JSON.parse(value) : null;
    else row[field] = value;
  }
  if (table === "ServicePillar") {
    for (const field of ["draft", "published"]) if (row[field]) pillarContentSchema.parse(row[field]);
  }
  return row;
}

const sourcePath = resolve(process.env.SEED_SQLITE_PATH || "prisma/dev.db");
if (!existsSync(sourcePath)) throw new Error(`SQLite source not found: ${sourcePath}`);
const require = createRequire(resolve("package.json"));
const { DatabaseSync } = require("node:sqlite") as {
  DatabaseSync: new (path: string, options: { readOnly: boolean }) => SqliteDatabase;
};
const sqlite = new DatabaseSync(sourcePath, { readOnly: true });
try {
  for (const config of tableConfigs.filter(config => config.group === "core")) {
    const order = config.table === "ServicePillar" ? "id" : '"order"';
    const rows = sqlite.prepare(`SELECT * FROM "${config.table}" ORDER BY ${order}`).all().map(row => toFileRow(config.table, row));
    const dir = join("prisma/production-content", config.group);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, config.file), `${JSON.stringify(rows, null, 2)}\n`);
    console.log(`${config.table}: exported ${rows.length} to ${join(dir, config.file)}`);
  }
} finally {
  sqlite.close();
}
