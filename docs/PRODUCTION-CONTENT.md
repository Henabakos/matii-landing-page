# Production content seed

Seeds a new production database with the real site content and hidden starter templates, so you don't build the CMS up from nothing. The dummy demo data in `prisma/seed.ts` and `prisma/dev.db` is never copied.

## What gets seeded

Files live in `prisma/production-content/`.

| Folder | File | Table | Behaviour |
| --- | --- | --- | --- |
| `core/` | `service-pillars.json` | ServicePillar | Published as written |
| `core/` | `nav-menus.json` | NavMenu | Published as written |
| `core/` | `project-categories.json` | ProjectCategory | Published as written |
| `core/` | `kpis.json` | Kpi | Published as written |
| `core/` | `footer.json` | FooterContent | Published as written (edit later in `/admin/footer`) |
| `templates/` | `job-positions.json` | JobPosition | Inserted with `isActive: false` |
| `templates/` | `blog-posts.json` | BlogPost | Inserted with `isPublished: false` |
| `templates/` | `news-articles.json` | NewsArticle | Inserted with `isPublished: false` |
| `templates/` | `testimonials.json` | Testimonial | Inserted with `isActive: false` |
| `templates/` | `partners.json` | Partner | Inserted with `isActive: false` |
| `templates/` | `projects.json` | Project | Seeded only with `--with-project-template` |

The seed only inserts records that don't exist yet, matched by slug, key or name. It never updates or deletes anything, so you can rerun it safely, and edits made in `/admin` are kept. Contact inquiries and job applications are never touched.

Templates are always inserted hidden, whatever the file says. To use one, open it in `/admin`, replace the placeholder text, then activate or publish it. Fields starting with `_` (such as `_note`) are editing hints and are not saved.

Projects have no hidden flag, so the project template would appear on the public site as soon as it's seeded. It's skipped by default. The easier route is to create projects in `/admin` and use `projects.json` as a field reference.

## 1. Review the files

Edit the JSON before seeding. Columns that the database stores as JSON text (`draft`, `published`, `categories`, `translations`, `challenge`, `solution`, `gallery`, `metrics`) are plain JSON in the files.

To refresh the `core/` files after editing content locally in `/admin` against `prisma/dev.db`:

```bash
npm run content:export
```

This overwrites only the `core/` files that exist in `dev.db`. `footer.json` is not in `dev.db`, so it's kept as written. Templates are hand-written and never exported.

## 2. Automatic seed on deploy

The `migrate` container runs on every deploy, for both `docker compose up --build` and CI/CD. After applying migrations, it runs `seed-production.ts --if-empty`:

- **Empty database** (first deploy): seeds everything listed above, then `web` starts with the content.
- **Any core content already exists** (pillars, nav menus, project categories or KPIs): skips the seed and logs `Seed skipped: ...`. Records you delete in `/admin` are not recreated on later deploys.

To see what happened: `docker compose --env-file .env.production logs migrate`.

To turn it off, set `SEED_ON_DEPLOY=false` in `.env.production`. Migrations still run.

If the database already has content, for example after importing from Neon, nothing is seeded automatically. Run the seed manually instead (next section) to add only the missing records.

## 3. Seed production manually (Docker)

The `migrate` image contains the source code and `tsx`, and already has the database URL set. Commit the files and deploy first, so the image includes them.

```bash
# Preview: shows what would be inserted, then rolls back
docker compose --env-file .env.production run --rm migrate pnpm exec tsx prisma/seed-production.ts --dry-run

# Seed
docker compose --env-file .env.production run --rm migrate pnpm exec tsx prisma/seed-production.ts

# Clear the CMS cache so the site shows the new content
docker compose --env-file .env.production exec -T web rm -rf /app/.next/cache/fetch-cache
docker compose --env-file .env.production restart web
```

Flags:

- `--dry-run`: report only, nothing is written.
- `--core-only`: skip all templates.
- `--with-project-template`: also insert the project template (visible publicly).

## Seeding from your machine

Point `DIRECT_URL` at the production database (for example over an SSH tunnel), then run:

```bash
npm run db:seed:production -- --dry-run
npm run db:seed:production
```
