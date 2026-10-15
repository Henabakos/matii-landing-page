# Production indexing incident and recovery

## Diagnosis and recovery: 14 October 2026

The owner first observed `X-Robots-Tag: noindex, nofollow`. An earlier live check also found a disallow-all robots file and empty XML sitemap. The sitemap exists as `src/app/sitemap.ts`; Next.js serves it at `/sitemap.xml`. No static XML file is needed.

The application adds the global header in `next.config.ts` when `isProductionIndexable()` returns false. The same helper controls page metadata, robots and sitemap contents. Previously, even a confirmed Vercel production deployment required `SEO_INDEXING_ENABLED` to be exactly `true`. A missing/false value or non-production hosting context disabled everything. The response proves indexing is disabled, but does not reveal which private hosting variable caused it.

The code fix makes Vercel/Netlify production indexable when the override is absent, empty or `auto`. An explicit `false` still disables indexing. Preview, development and Vercel custom staging environments stay blocked even with `true`. Unknown hosts still require explicit `true`. Admin/API noindex remains intact.

**Live check after the owner's redeployment, 14 October 2026:** `https://matiitechnologies.com/robots.txt` returned 200 and allowed `/`; `https://matiitechnologies.com/sitemap.xml` returned 200 `application/xml`, parsed as valid XML and contained 67 URLs. The sitemap response had no X-Robots-Tag. The homepage returned 200 without an X-Robots-Tag. The non-www host currently serves the canonical sitemap. This indicates Google Search Console's earlier “could not be read” report may refer to its previous failed fetch or a different submitted host/property; confirm the latest status after resubmitting the canonical URL.

Vercel exposes its environment at build and runtime; see [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables). Google honors the noindex response header; see [Google's robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Vercel deployment steps

1. In Project Settings → Environment Variables, keep `SEO_INDEXING_ENABLED=true` for **Production** (or remove the override to use the production default). Replace any existing `false` value. Do not add literal quote characters in the dashboard value.
2. Set `NEXT_PUBLIC_SITE_URL=https://matiitechnologies.com` for Production. Enable access to Vercel's system environment variables. Do not manually fake `VERCEL_ENV` or `VERCEL_TARGET_ENV`; use a real Production deployment.
3. In Domains, configure `matiitechnologies.com` to serve Production and redirect `www.matiitechnologies.com` to it. **Updated live check, 15 October 2026:** www now redirects in the correct direction but uses temporary status 307. Edit that existing Vercel domain redirect to use 308 Permanent Redirect, preserving paths and queries. Keep the owner's confirmed non-www canonical domain. See [the complete implementation and Search Console guide](SEO_IMPLEMENTATION_AND_GOOGLE_SEARCH_GUIDE.md).
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

Submit exactly `https://matiitechnologies.com/sitemap.xml` under the matching `matiitechnologies.com` Domain property or `https://matiitechnologies.com/` URL-prefix property. Remove/re-submit any old `www` sitemap entry if it belongs to a separate property. Then open the sitemap row in Search Console and inspect the latest **Last read** and status; the historical error can persist until Google's next successful fetch. If it still reports failure, open that row's details and copy the precise error, then use URL Inspection → Test live URL on the sitemap and verify Page fetch is Successful and Crawl allowed is Yes. Google's [sitemap troubleshooting](https://support.google.com/webmasters/answer/7451001) distinguishes an inaccessible sitemap from errors in URLs listed inside one.

## Local verification

`pnpm exec tsc --noEmit` passed after correcting a literal type in the new test. A fresh production build and live verification must follow deployment; the earlier deployed build remains unchanged.

`pnpm exec tsx --test src/lib/indexing.test.ts src/lib/seo-sitemap.test.ts`: three tests passed. They verify production without the override, explicit disable, preview/staging protection, actual Next.js header rules, robots output, and published sitemap generation during normal reads and outages. Live PowerShell requests verified HTTP status, content type, XML parsing and URL count as stated above. No hosting settings were changed and no deployment was performed from this workspace.
