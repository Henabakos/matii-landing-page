// Refresh the bundled outage content from the saved public SQLite database.
/* eslint-disable @typescript-eslint/no-require-imports -- Node maintenance script. */
// Never export applications, inquiries, credentials, drafts, or inactive records.
const { DatabaseSync } = require('node:sqlite');
const { Prisma } = require('@prisma/client');
const { writeFileSync } = require('node:fs');
const db = new DatabaseSync('prisma/dev.db', { readOnly: true });
const filters = {
  Kpi: 'isActive = 1', Partner: 'isActive = 1', Project: '1 = 1',
  BlogPost: 'isPublished = 1', NewsArticle: 'isPublished = 1',
  Testimonial: 'isActive = 1', NavMenu: 'isActive = 1',
  JobPosition: 'isActive = 1', ProjectCategory: 'isActive = 1',
};
try {
  const content = {};
  for (const [table, filter] of Object.entries(filters)) {
    const model = Prisma.dmmf.datamodel.models.find(model => model.name === table);
    content[table] = db.prepare(`SELECT * FROM "${table}" WHERE ${filter}`).all().map(row =>
      Object.fromEntries(model.fields.filter(field => field.kind === 'scalar').map(field => {
        let value = row[field.name] ?? null;
        if (value !== null && field.type === 'Boolean') value = Boolean(value);
        if (value !== null && field.type === 'DateTime') value = new Date(value).toISOString();
        return [field.name, value];
      })));
    console.log(`${table}: ${content[table].length} public records`);
  }
  writeFileSync('src/data/cms-fallback.json', JSON.stringify(content, null, 2) + '\n');
} finally {
  db.close();
}
