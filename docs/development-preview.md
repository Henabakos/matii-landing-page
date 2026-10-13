# Development and browser previews

This app uses Next.js 16 App Router, React 19, Tailwind 4, and Prisma 6 with SQLite.
Marketing pages live under `src/app/[locale]/(marketing)`; their layout supplies
the header, contact sections, and footer. English uses `/`; other locales use
`/om`, `/am`, `/de`, and `/pl`. Admin pages and API routes are separate.

## Preview on your computer

Install Node.js 24 and pnpm 11.25.0. Clone the repository if needed, then run
these commands from its root:

```bash
git switch feat/homepage-polish
bash scripts/setup-dev.sh
export DATABASE_URL=file:../.local/dev.db
npm run dev
```

Open `http://localhost:3000` on the computer running the server. Edits update
automatically. Stop it with Ctrl+C. A cloud server's localhost address is not
accessible from your computer; no public cloud preview URL has been configured.

The setup command respects the lockfile, generates Prisma, and copies the
committed database into ignored `.local/dev.db` only when that copy is absent.
It preserves existing data on subsequent runs. Dependency build approval is
temporary and does not modify the package manifest or lockfile. If you already
have a pnpm workspace configuration, its dependency build policy is preserved.

In the prepared Codex environment, the database also exists at
`/workspace/.matii-setup/dev.db`; set `DATABASE_URL` to
`file:/workspace/.matii-setup/dev.db` to keep using that copy.

Validate with the same `DATABASE_URL` exported:

```bash
npm run build
node_modules/.bin/tsc --noEmit
npm run lint
```

The baseline has existing lint errors. Cloudinary uploads and AI translation
need separate credentials; enter secrets in environment settings, never Git.

## Connect Vercel without deploying production

1. Sign in at `https://vercel.com` with your GitHub account. Grant the Vercel
   GitHub App access to `Henabakos/matii-landing-page` when prompted.
2. On your computer, run `pnpm dlx vercel login`, then `pnpm dlx vercel link`
   from the repository root. Choose the intended Vercel team and create or
   select the Matii project. Linking creates local `.vercel` metadata; it does
   not deploy the website. Do not use **Import → Deploy** for initial setup:
   that flow can create a production deployment.
3. Leave the project's automatic Git deployment connection off initially. Use
   manual Preview deployments in step 6 so linking the project cannot trigger
   an automatic production build. After a preview works, configure automatic PR
   previews in a separate reviewed step with production deployments disabled.
   Keep `main` as the production branch and feature branches for previews.
4. Prepare a hosted database before expecting a full working Vercel preview.
   The current Prisma schema uses SQLite. Local filesystem writes are not a
   durable database on Vercel: contact forms, job applications, and admin edits
   need persistent storage. Merely setting a PostgreSQL `DATABASE_URL` will not
   work with the current SQLite provider. A separate reviewed database migration
   is required, for example to a PostgreSQL provider offered in Vercel's
   Marketplace. Keep preview data separate from production data.
5. After that migration, set the database connection in **Settings → Environment
   Variables → Preview**. Configure Next.js, repository root `.`, Node.js 24,
   pnpm 11.25.0, and a build command that generates Prisma before building:
   `pnpm exec prisma generate && pnpm run build`. Add optional integration
   credentials only if those features are needed.
6. On the feature branch, run `pnpm dlx vercel deploy` for a **Preview** deployment.
   Do not pass `--prod`. Open the returned HTTPS URL in your browser. Once safe
   Git preview deployments are configured, Vercel can attach a preview URL to
   each PR and update it with subsequent commits. The GitHub App's repository
   access and a project's automatic Git deployment connection are separate.

No Vercel project was linked or deployed as part of this iteration. No production
deployment or merge is authorized. Review the exact project settings and database
migration before enabling hosted previews.
