# Production indexing incident and recovery

## Diagnosis: 14 October 2026

The live response supplied by the owner includes `X-Robots-Tag: noindex, nofollow`. Earlier live checks also found a disallow-all robots file and an empty XML sitemap. The sitemap exists as `src/app/sitemap.ts`; Next.js serves it at `/sitemap.xml`. No static XML file is needed.

The application adds the global header in `next.config.ts` when `isProductionIndexable()` returns false. The same helper controls page metadata, robots and sitemap contents. Previously, even a confirmed Vercel production deployment required `SEO_INDEXING_ENABLED` to be exactly `true`. A missing/false value or non-production hosting context disabled everything. The response proves indexing is disabled, but does not reveal which private hosting variable caused it.

The fix makes Vercel/Netlify production indexable when the override is absent, empty or `auto`. An explicit `false` still disables indexing. Preview, development and Vercel custom staging environments stay blocked even with `true`. Unknown hosts still require explicit `true`. Admin/API noindex remains intact.

Vercel exposes its environment at build and runtime; see [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables). Google honors the noindex response header; see [Google's robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Required Vercel deployment steps

1. In Project Settings → Environment Variables, set `SEO_INDEXING_ENABLED=true` for **Production**. In particular, replace any existing `false` value; the fix intentionally respects explicit disabling. Do not add literal quote characters in the dashboard value.
2. Set `NEXT_PUBLIC_SITE_URL=https://matiitechnologies.com` for Production. Enable access to Vercel's system environment variables. Do not manually fake `VERCEL_ENV` or `VERCEL_TARGET_ENV`; use a real Production deployment.
3. In Domains, configure `matiitechnologies.com` to serve Production and redirect `www.matiitechnologies.com` to it. The observed deployment currently redirects in the opposite direction. If the owner deliberately chooses www instead, change the production site URL to `https://www.matiitechnologies.com` and submit that host's sitemap consistently.
4. Deploy the changed source with a **fresh production build**. The Next.js headers manifest and robots route can be generated at build time; changing a runtime variable or promoting an old preview artifact is not sufficient.
5. Run the checks below. Do not request indexing until they succeed.

```powershell
curl.exe -I https://matiitechnologies.com/
curl.exe -i https://matiitechnologies.com/robots.txt
curl.exe -i https://matiitechnologies.com/sitemap.xml
curl.exe -I https://www.matiitechnologies.com/
```

Expected: canonical homepage returns 200 without a noindex response header; robots allows `/` and lists the sitemap; sitemap returns 200 XML containing `<url>` entries; www redirects to the preferred host. Also inspect homepage HTML for any remaining robots meta noindex. Admin/login should retain noindex.

If blocking persists, confirm the production alias points to the new deployment and inspect its build settings. Check explicit false values, unexpected preview/custom environment context, hosting protection, and any separately configured response-header rules. Do not remove admin protections.

Once corrected, submit the final, nonredirecting sitemap URL in Search Console, run URL Inspection → Test live URL on the homepage, and request indexing. Re-crawling and indexing are not immediate or guaranteed. [Google sitemap troubleshooting](https://support.google.com/webmasters/answer/7451001).

## Local verification

`pnpm exec tsc --noEmit` passed after correcting a literal type in the new test. A fresh production build and live verification must follow deployment; the earlier deployed build remains unchanged.

`pnpm exec tsx --test src/lib/indexing.test.ts src/lib/seo-sitemap.test.ts`: three tests passed. They verify production without the override, explicit disable, preview/staging protection, actual Next.js header rules, robots output, and published sitemap generation during normal reads and outages. No hosting settings were changed and no deployment was performed from this workspace.
