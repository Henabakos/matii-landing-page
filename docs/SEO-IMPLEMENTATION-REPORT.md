# MATII TECHNOLOGIES SEO implementation report

Date: 14 October 2026. Production origin confirmed by the owner: **https://matiitechnologies.com**. Changes are implemented locally; no hosting deployment, search-account registration, analytics installation or database mutation was performed.

The owner's final domain correction supersedes the earlier spelling. Configuration, local site URL, guides, validation scripts and generated sharing images use `matiitechnologies.com`. The production build, all 20 regression tests, 24 HTTP route checks and 79 internal-link checks were rerun after this correction. The served robots sitemap URL and all 67 observed sitemap entries use the corrected origin.

## Initial architecture and findings

The project uses Next.js 16.2.12 App Router, React 19, next-intl 4, Prisma 6 and PostgreSQL/Neon. Public pages are under `src/app/[locale]/(marketing)`. English is unprefixed; supported prefixes are `/om`, `/am`, `/de` and `/pl`. `src/middleware.ts` handles locale routing and existing admin authentication. `next.config.ts` and package scripts use Turbopack; no active Webpack workaround was found and the development command remains unchanged.

Discovered public routes: homepage, about, contact, services, four service pillars plus aliases, projects and project details, blog and article details, news and news details, careers and job details, internships and talent pool. Products are embedded cards/anchors inside service pages; standalone product pages do not exist.

Existing SEO was fragmented: root, marketing layout and page titles repeated the legacy brand; some pages lacked canonicals/social tags; translations were not represented consistently; the sitemap omitted careers/services/locales and assigned artificial current dates; organization schema used an illustration as a logo and generic social-platform URLs as `sameAs`; JSON-LD serialization did not escape script-closing input. Public robots had no preview controls, and admin login lacked a shared noindex policy. Homepage/blog and several route pages nested main landmarks. Blog rendered two H1s and contact rendered none.

The CMS already had SEO title/description/keywords for projects, blogs, news and jobs, plus slugs and timestamps. Articles/news have `isPublished`; jobs have `isActive`. Projects have no draft/publish flag: every stored project is currently public by design. Service pillars have separate draft/published JSON, revision control, SEO title/description/image and translation source tracking. There was already a SERP/social preview component. No destructive schema changes were needed.

## Changes implemented

### Central brand and metadata

`src/lib/site-config.ts` centralizes the official name, short name, description, confirmed origin, approved colors, logo and verified-profile list. Metadata ignores local development origins and never emits localhost canonicals. Non-HTTPS or path-bearing production origins fail validation. Environment overrides must still be set correctly by the deployment owner.

`src/lib/seo.ts` is the single metadata builder for absolute branded titles, clean descriptions, canonicals, language alternates, robots, Open Graph and Twitter cards. Absolute titles prevent repeated brand suffixes. `seo-pages.ts` maps all ten static marketing routes to existing translated copy and refined English metadata. `seo-cms.ts` handles published record metadata and translation eligibility. Dynamic pages call `generateMetadata()` and preserve 404/noindex behavior for missing or unpublished records.

CMS English SEO fields remain supported. Other languages use actual translated visible fields rather than the English SEO title overriding their language. No translated marketing copy was invented. The root HTML now declares the request locale. The redundant marketing-layout title/description and duplicate notranslate meta tag were removed.

### Brand replacement report

Corrected obsolete names in root/page metadata, all five translation dictionaries, admin labels and news defaults, career form prompts/email subject templates, the SEO preview, JSON-LD, AI translation prompts, career/project/news seed copy, and bundled fallback career SEO titles. Existing `Matii Technologies` company-owned labels and alt text were normalized to the official capitalization. Navigation/header and footer alt text/copyright use MATII TECHNOLOGIES. The PWA manifest and browser icons now use the same identity.

Preserved URL identities, Calendly account links, email addresses, database IDs, cookie names, source URLs in legacy seed records, and external testimonial quotations. Source searches now find obsolete spaced names only in deliberate normalization tests. Unspaced legacy domains/handles remain where they are real account references, not company display names.

A read-only live CMS review found **14 field proposals**: four career SEO titles, six blog SEO titles, three project SEO title/description fields, and one published AI pillar document. These include obsolete MATII names, inconsistent capitalization, and narrowly identified Motion template-company labels. Exact record IDs and before/after values are in ignored local artifact `artifacts/cms-brand-review.json`. No update was applied. `scripts/review-cms-brand.ts` provides an explicit review/apply workflow with an allowlist, transaction and original-value comparison. It does not expose private data or publish drafts. Re-review drafts before later publication to avoid restoring old text. Website metadata normalizes legacy title/description branding immediately, even before those stored fields are approved for update.

### International SEO and canonical coverage

English canonicals omit `/en`; the existing prefix redirect is retained. Localized static pages self-canonicalize and emit reciprocal alternates plus x-default. The English-only news index, internships and talent-pool bodies canonicalize to English until real translations exist. CMS detail alternates require substantive translated fields. Pillar alternates require current source-matched name, headline and description translations.

Service aliases remain working URLs but canonicalize to the pillar slug; aliases are excluded from the sitemap. next-intl's automatic alternate HTTP Link headers are disabled because they would otherwise advertise every locale regardless of published translation coverage. Page metadata and the sitemap now share that decision.

### Sitemap, robots and private pages

`/sitemap.xml` contains static canonical routes plus public projects, published blog/news, active jobs and published pillars. Localized entries share language alternates. Only reliable CMS update timestamps are included; static pages and pillars omit lastmod because a draft edit is not a published-content timestamp. There are no invented daily update frequencies or priorities.

Published queries retain their normal cache/revalidation behavior. A temporary failure can use existing cached CMS data; newly returned bundled fallback records are excluded from sitemap discovery and have noindex detail metadata. The sitemap itself is generated dynamically, so a partial outage response is not persisted as an hour-long complete sitemap. A valid empty CMS result remains empty. Successful cached CMS data may remain available during its normal cache window; publication actions invalidate the existing tags/paths.

Production requires `NODE_ENV=production`; confirmed Vercel/Netlify production now defaults to indexing unless explicitly disabled. Other hosts require `SEO_INDEXING_ENABLED=true`. Preview contexts override that flag to remain nonindexable. Admin/API responses have X-Robots-Tag headers, and the admin layout has noindex metadata. Preview responses carry a global noindex header, robots disallow all, and sitemap output is empty. Robots is not an authentication mechanism. Existing authentication/actions were not redesigned. See [the subsequent production indexing fix](PRODUCTION-INDEXING-FIX.md) for the live incident and required redeployment steps.

### Structured data coverage

- Organization and WebSite: shared marketing layout, real name/domain/logo and contact-page URL. No unverified social profiles, street addresses, awards, ratings or dates.
- WebPage, AboutPage, ContactPage: static marketing pages with canonical URLs and language.
- Service: four published pillar pages, plus canonical breadcrumb data for aliases.
- Article and NewsArticle: existing detail pages, using published content and dates.
- CreativeWork: project details. Removed the unsupported inference that a client is necessarily a sponsor.
- BreadcrumbList: static pages and existing article/news/project/service detail trails.

JSON-LD safely escapes `<` and Unicode line separators; injection round-trip tests and live JSON parsing pass. SoftwareApplication/JobPosting/review markup was not added because verified required business/product/job details are insufficient. FAQ content remains visible without promising FAQ rich results. External URL validation in Google's Rich Results Test and Schema.org Validator remains a post-deployment action. Syntax validity is not a rich-result eligibility guarantee. See [Google organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization).

### Social images and identity assets

`/social-image` renders a 1200 × 630 PNG from the existing approved SVG logo and colors. It supports default/home/services and published service/project/article/job headings. Custom service SEO images and CMS HTTPS cover uploads remain usable; dimensions are not falsely asserted for arbitrary uploaded images. A checked-in default PNG covers renderer failure. The default image was visually inspected.

Three 1200 × 630 static exports, six square symbol exports (32, 48, 180, 192, 512, 1080px), a branded favicon, Apple touch icon metadata and manifest icons were created. The 1080px square is a profile master; platform covers are separately specified in the asset guide. Amharic artwork currently uses English until a reviewed Ethiopic font is bundled; its HTML metadata remains localized. No profiles were created or messages posted.

### Semantics, CMS and performance

The marketing layout owns one main landmark. Blog now has one primary H1 even when empty; its secondary bar is H2. Contact's primary heading is H1 with unchanged classes. Rich CMS-body H1 tags are sanitized down to H2 beneath the page title. Decorative hero imagery has empty alt text and an explicit responsive size.

Existing image/font optimization and animations are retained. The below-fold office image no longer forces preload. Noncritical Geist/Geist Mono font preloads are disabled while preserving those fonts. Public CMS readers now use React request memoization around the existing persistent cache to avoid repeating the same read for page content and metadata. No analytics scripts or new runtime dependencies were added.

Service SEO has a backward-compatible optional `noindex` property inside its existing JSON. The CMS editor exposes it; only the published version affects public metadata/sitemap. No database migration is required. Existing SEO preview branding/domain is corrected; keyword tags are described as editorial aids rather than a Google ranking score. Canonicals are deliberately computed from stable routes, avoiding a new arbitrary override that could accidentally deindex content. Separate canonical overrides, custom OG fields and per-record noindex for other models remain possible future additions if a real workflow requires them; existing cover images and publication controls cover current needs.

No before-change browser performance baseline or field dataset was available. HTTP timings are recorded in the local validation artifact, but are not LCP/INP/CLS and do not prove a performance improvement. Neon connectivity was intermittent during build/testing; keep production near its database region and investigate connection latency before attributing slow requests to frontend assets. Five Google font families remain a build-time network dependency. Existing animation-heavy client components warrant a dedicated measured performance pass rather than removal based on a guessed Lighthouse score.

## Files and maintenance entry points

- Configuration/routing: `src/lib/site-config.ts`, `src/i18n/routing.ts`, `src/middleware.ts`, `next.config.ts`, `.env.example`, `.gitignore`, root/admin/marketing layouts.
- Metadata/content: `src/lib/seo.ts`, `seo-pages.ts`, `seo-cms.ts`, every marketing `page.tsx`, blog/news timestamp interfaces, `src/lib/services/cms-fallback.ts`.
- Crawl/social routes: `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`, `social-image/route.tsx`, `favicon.ico`.
- Schema/assets: `src/components/common/JsonLd.tsx`, `PageStructuredData.tsx`, `src/lib/social-image.tsx`, `public/social/*`, `public/icons/*`.
- Semantics/brand: Header, Footer, Hero, OfficeShowcase, BlogPage, BlogTopBar, ContactSectionWhite, career forms, SeoMetaFields, admin labels/defaults, five message dictionaries, relevant seeds/default content. No visual redesign.
- CMS: `src/lib/pillars/schema.ts`, pillar SEO editor, `scripts/review-cms-brand.ts`.
- Verification: `src/lib/seo.test.ts`, `seo-sitemap.test.ts`, existing CMS/pillar regression suites, `scripts/verify-seo.mjs`, `check-internal-links.mjs`, social/icon generation scripts.
- Guides: this report, `SEO-SETUP-AND-GROWTH-GUIDE.md`, `SEO-CONTENT-STRATEGY.md`, `SOCIAL-MEDIA-ASSET-GUIDE.md`.

The working tree contained substantial prior work before this task. Existing edits were preserved; a repository-wide diff also includes that earlier work.

## Executed validation

1. `pnpm exec tsc --noEmit`: passed after fixing two intermediate typing issues in the new code/tests. The final production build also completed its TypeScript phase.
2. `pnpm lint`: executed and failed. Final full ESLint JSON run reports **104 errors and 94 warnings**, largely existing `any` typing, hook/ref rules and unused code across admin/components/services. The new SEO/schema/asset/maintenance modules pass the targeted ESLint run; lint rules were not weakened globally. Full details: local `artifacts/eslint-final.json`.
3. `pnpm build`: **passed with Turbopack**, including a final build with the confirmed production origin and indexing enabled. The initial sandbox run failed downloading Google Fonts; the network-enabled rerun succeeded. Existing Prisma package-config and middleware-convention deprecation warnings remain. Transient Neon failures were logged, but fallback handling kept the build successful. No migration or seed was run.
4. `pnpm exec tsx --test src/lib/seo.test.ts src/lib/seo-sitemap.test.ts src/lib/services/cms-fallback.test.ts src/lib/services/database-content.test.tsx src/lib/pillars/schema.test.ts src/lib/pillars/translations.test.ts`: **20 tests passed**. Covers metadata uniqueness across 50 route/locale combinations, environment indexing, canonical prefixes, translation eligibility, JSON-LD injection safety, sitemap publication filters/dates, optional service noindex, draft isolation, outage recovery and valid empty states.
5. Production server on local port 3100: `node scripts/verify-seo.mjs http://localhost:3100` checked **24 routes with zero assertions failing** after fixes. Includes homepage, all static sections, all four pillars, a service alias, all five locale homepages, localized AI, one blog detail, an unknown-service 404, admin redirect and login noindex headers. All successful marketing samples had one H1, one main, metadata, language/alternates and parseable JSON-LD.
6. `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, a generated social image, static fallback PNG and Apple icon returned 200 with expected content types. Final production robots allowed public crawling and advertised the confirmed sitemap; sitemap contained **67 URLs in that observed database snapshot**. `/en/about` redirected to `/about`. A separate preview run confirmed disallow-all robots and empty sitemap. These counts are observations, not fixed application constants.
7. `node scripts/check-internal-links.mjs`: **79 discovered internal route links checked; zero failures**. This checks routes, not every external URL or fragment anchor. A 404 test explicitly returned 404 rather than a successful generic page.
8. `pnpm exec tsx scripts/review-cms-brand.ts`: live read-only review succeeded, 14 proposed field updates, zero writes. Asset generation scripts succeeded. The default 1200 × 630 PNG was visually inspected locally.

HTTP evidence lives in ignored local artifacts `seo-http-validation.json`, `seo-http-preview.json`, and `internal-link-validation.json`. HTTP round-trip timings are diagnostic only. Google/Bing dashboards, consent analytics, live social account previews, Schema.org/Google URL validation, authenticated admin editing/publishing and contact submission were not claimed tested. CMS schema/localization/read isolation are covered by automated tests; an owner-approved staging publication exercise is still required.

## Release checklist and remaining work

- Set the confirmed origin and enable `SEO_INDEXING_ENABLED=true` only on the intended public production build. Keep staging private/noindex; configure www/HTTPS and any owned former-domain redirects at the host.
- Review/apply the 14 CMS brand proposals using the safe workflow, then refresh caches and review corresponding drafts. No live content was changed automatically.
- Confirm public company claims, customer permissions, exact contact details, genuine job availability and overseas office assertions. No address schema or social profile identity was invented.
- Complete Search Console/Bing verification and sitemap submission; review Google Business Profile eligibility. No rankings or indexing deadlines are promised.
- Add verified social URLs; test deployed previews with platform tools. Confirm current Facebook cover dimensions while logged in.
- Choose analytics/consent policy before installing tags. Instrument only successfully persisted contact/demo outcomes without personal data.
- Run a measured mobile/desktop performance audit and monitor field CWV. No LCP/INP/CLS score or before/after improvement is claimed here.
- Address the repository lint backlog separately. Preserve functionality while resolving the existing hook/ref/type issues. Review the existing authentication design in a dedicated security task; robots headers do not strengthen authorization.
- Test a private draft save and controlled publish on staging, ensuring draft text does not leak into metadata/images/sitemaps, then unpublish the test record. Do not use production sample data for that exercise.

Implementation follows the existing [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) and [metadata/image conventions](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), with company-specific decisions documented above.
