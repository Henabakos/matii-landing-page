# Pillar CMS

Open `/admin/pillars` after signing into the existing admin workspace.

- **Overview:** hero copy, homepage/services cards, portfolio headings, AI platform overview and workflow, technology list.
- **Product cards:** add, remove, reorder and edit products, capabilities, tags, illustrations, demo URLs, filter groups and card widths. Existing Cloudinary uploads are supported, along with local image paths and HTTPS image URLs.
- **Process & FAQs:** edit, add and remove delivery steps and questions.
- **SEO:** page title, description and social image. Empty titles/descriptions use the pillar copy.
- **Translations:** AI translation into Afaan Oromoo, Amharic, German and Polish, with editable translations beside the English source. Translate one language or all four, including nested product cards, process steps, FAQs and SEO.

The AI platform overview is optional: enable **Show overview on the detail page** to display its positioning, use cases and workflow. It starts hidden to preserve the current page layout.

**Save draft** stores changes privately, including translations. **Publish changes** saves and publishes the current form, invalidating the public pages in every locale. **View live page** opens published content, not a draft preview. Published detail pages, metadata and service cards use the matching saved translation. Existing pillar routes and aliases remain fixed.

Translation uses the existing server-side `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) or `OPENAI_API_KEY`. Requests require an admin session. Review generated text before saving or publishing; generating translations does not write to the database. Missing keys or provider failures display an error. Existing translations are preserved and only missing or outdated fields are generated. Clear a translated field to regenerate it. Changing the English source marks that field's translation outdated; public pages use the saved English text until its translation is updated. URLs, images, product IDs, technology names and layout settings remain unchanged. Existing English-only documents require no migration.

The editor checks revisions before saving. If another editor saved first, reload to get their version before retrying. Unsaved edits prompt before leaving the page or switching pillars.

## Database setup

This repository uses Prisma PostgreSQL with Neon. Configure `DATABASE_URL` and `DIRECT_URL` as described in the root README, then apply the migrations and generate the client before starting the application:

```sh
npm run db:deploy
npx prisma generate
npx tsx prisma/seed-pillars.ts
```

Stop the development server before generating Prisma on Windows if the query-engine DLL is locked. No reset or data-loss flag is needed. The optional seed is idempotent and never overwrites existing records; run it only when you intentionally want to publish the starter content. Public pages display only published database records. Missing or draft-only pillars are omitted from service listings and return a not-found page at their detail URL. An empty service list displays an empty state. Checked-in defaults remain available only as an editing starting point in the admin workspace.

Pillars use validated structured JSON documents in `ServicePillar.draft` and `ServicePillar.published`. Mutations require the existing admin session, validate content and URL protocols on the server, and perform revision checks in a database transaction. The existing site admin authentication and Cloudinary configuration are reused.

Brand layout, hero diagrams and shared section labels remain code-controlled so editors cannot accidentally change the visual system. Product illustrations and their captions are generated from the editable product name/category.
