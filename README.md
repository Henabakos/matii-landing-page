# Matii landing page

Next.js with Prisma 6 and PostgreSQL, configured for Neon.

## Neon database and deployment

1. Create a Neon project and copy both connection strings from its Connect dialog. Use the pooled URL for `DATABASE_URL` and the direct URL for `DIRECT_URL`. Both must point to the same database and include `sslmode=require`. See `.env.example` and the [Neon Prisma guide](https://neon.com/docs/guides/prisma).
2. For local development, copy `.env.example` to `.env` only if `.env` does not already exist. Otherwise update its two database variables, preserving your other settings. Replace the example URLs with your real Neon connection strings. Prisma CLI reads `.env`; avoid conflicting database values in `.env.local`.
3. Install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm db:deploy` and `pnpm db:generate` to initialize an empty Neon database and generate the client.
4. In your deployment host's environment settings, add `DATABASE_URL`, `DIRECT_URL`, a strong `ADMIN_PASSWORD`, and your production `NEXT_PUBLIC_SITE_URL`. Copy the Cloudinary and AI provider settings you use from your local environment. Keep database URLs and API secrets server-only.
5. Set the deployment build command to `pnpm build:deploy`. It applies committed migrations, generates Prisma Client, and builds Next.js. For a Node server, start with `pnpm start`; Vercel uses its Next.js runtime automatically. Ensure the build environment installs dev dependencies because the Prisma CLI is needed.

To self-host everything on a VPS with Docker (Next.js, PostgreSQL and automatic HTTPS via Caddy, no Neon needed), follow [Docker deployment](docs/DOCKER-DEPLOYMENT.md): `docker compose --env-file .env.production up -d --build`. Pushes to `main` deploy automatically through GitHub Actions; see [CI/CD](docs/CI-CD.md).

Use a separate Neon database or branch for preview deployments. If your pipeline runs migrations in a dedicated release step, use `pnpm db:deploy` there and `pnpm build` for the build instead.

On Windows, stop the running development server before `pnpm db:generate` if Prisma reports an `EPERM` error replacing `query_engine-windows.dll.node`.

The initial PostgreSQL migration includes every model, including `ServicePillar`. The old `prisma/dev.db` is preserved as a SQLite source/backup; switching providers does **not** copy its records to Neon. Export/import existing content separately if you need to retain it. Do not run `prisma migrate reset` against a deployed database. The existing `prisma/seed.ts` deletes content and inquiries, so it must not be used to migrate live data or run automatically during deployment. The optional `pnpm exec tsx prisma/seed-pillars.ts` initializes missing pillars without overwriting existing ones.

For later schema changes, run `pnpm db:migrate --name describe_change` against a development database and commit the generated migration. Production applies committed migrations with `pnpm db:deploy`.

### Restore previous site content

With Node.js 22.13+ and the original `prisma/dev.db` available, run `pnpm db:seed --dry-run` to validate the source, then `pnpm db:seed` to restore its public content to Neon. `pnpm exec prisma db seed` uses the same safe script. It reads SQLite without changing it, uses `DIRECT_URL` (or `DATABASE_URL`), and inserts missing records in one transaction. Existing destination records and edits are preserved. Contact inquiries and job applications are excluded. Set `SEED_SQLITE_PATH` to use a different SQLite backup. Restart the development server or rebuild/redeploy afterward to refresh cached pages. Seeding is an explicit one-time operation, not part of the deployment build.

## SEO and public launch

For article editors: [Blog SEO, social images and Google indexing workflow](docs/BLOG-SEO-AND-GOOGLE-INDEXING-GUIDE.md).

The owner-confirmed production origin is `https://matiitechnologies.com`. Set `NEXT_PUBLIC_SITE_URL` to that origin and `SEO_INDEXING_ENABLED=true` only for the production build. Preview/staging must remain false; Vercel/Netlify preview contexts are also excluded automatically. Rebuild after changing these settings. Local development origins never appear in canonical metadata.

See [SEO implementation and validation](docs/SEO-IMPLEMENTATION-REPORT.md), [owner setup and 90-day roadmap](docs/SEO-SETUP-AND-GROWTH-GUIDE.md), [content strategy](docs/SEO-CONTENT-STRATEGY.md), and [social asset guide](docs/SOCIAL-MEDIA-ASSET-GUIDE.md). The site does not install analytics or claim search-account verification automatically.

Public CMS reads use bundled content only when the backend query or content parsing fails (including missing database configuration). Successful empty collections and missing/unpublished records remain empty or return 404. Navigation, services, projects/categories, blogs, news, jobs, partners, testimonials, and KPIs all follow this rule. Admin reads and submissions still require the real backend.

The outage snapshot is `src/data/cms-fallback.json`; service pages use the existing pillar defaults. Refresh the snapshot explicitly with `node scripts/export-public-fallback.cjs` (Node.js 22.13+, saved `prisma/dev.db`, and generated Prisma client required). Only active/published public records are exported. The current saved database has no news articles, so its news fallback is empty. Fallback responses are kept outside the CMS data cache so later requests can retry the backend; existing valid cached CMS results retain their normal revalidation behavior.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Matii-landing-page
