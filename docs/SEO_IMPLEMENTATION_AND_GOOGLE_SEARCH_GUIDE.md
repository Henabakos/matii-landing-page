# MATII TECHNOLOGIES SEO implementation and Google Search guide

Production: https://matiitechnologies.com. Reviewed 15 October 2026 against the current source and live HTTP responses. This is an implementation record, not a claim of Google indexing, rankings, or guaranteed sitelinks. Local changes have not been deployed.

## Production baseline

The homepage returned 200 with index/follow metadata and no blocking X-Robots-Tag. Robots.txt returned 200, allowed public crawling, excluded admin/API, and advertised the correct sitemap. The sitemap returned 200 with 67 URLs. HTTP redirected to HTTPS with 308. The www host redirected to the apex with **307**, a temporary redirect that should become permanent in Vercel domain settings.

The initial 24-route sample found a missing H1 on `/contact`. A subsequent crawl of 79 internal route links found no failures. `/services/ai-data` returned 200 rather than redirecting to `/services/ai`. Requests to `/` with German Accept-Language and `/about` with a German locale cookie returned 307 redirects to German URLs. The initial verification script did not flag these canonical-discovery issues.

Baseline evidence is saved locally in `artifacts/seo-production-before.json` and `artifacts/internal-link-validation.json`. Artifacts are ignored by Git. Production observations are distinct from validation of the modified local build.

## Implemented fixes

### High priority: identity and canonical consistency

- Removed four invented social account URLs from the shared configuration. They appeared in both footer links and Organization.sameAs. The existing schema regression test failed before this correction. Add real accounts only after verifying ownership.
- Added 308 redirects for all 19 service aliases, both unprefixed and with supported locale prefixes. Query parameters remain handled by Next.js redirects. Existing canonical service slugs and the sitemap remain the targets. `/en` continues to normalize through next-intl, so an English-prefixed alias can involve a second redirect.
- Preserved existing browser/cookie locale detection and explicit locale links. Headerless crawler requests resolve to English. Language-specific requests may redirect to the selected language; this is existing functionality, not an indexing block. The earlier proposed locale-detection change was withdrawn to preserve production behavior.
- Required current translations of service text fields beyond the three hero fields before advertising an alternate language. Partial translations can remain visible but canonicalize to English. CMS paragraph-array translation checks now reject blank or non-string entries. Sitemap and metadata share these checks.
- Normalized unsupported-locale homepage URL generation to the same English URL form.
- Updated the English homepage to the requested title, `MATII TECHNOLOGIES | Software & Digital Solutions`, and description, `MATII TECHNOLOGIES develops enterprise software, modern digital platforms, and innovative technology solutions for businesses.` Services, Projects, About and Contact have concise, distinct English titles. Other languages retain their existing translated titles and descriptions.
- Consolidated identical 48×48 favicon files into `public/favicon.ico` and updated the existing generator to write that location. Root icon metadata now declares the actual ICO dimensions and the existing 192×192 PNG alternative. The Apple icon remains 180×180. No logo or imagery was generated or redesigned.

### Medium priority: headings, discovery, and loading

- Gave the contact route an H1 through an explicit component prop. The shared contact block continues to use H2 on other pages, avoiding multiple page-level headings.
- Added Blog, Internships, and Talent pool to persistent footer navigation. Empty navigation groups are omitted. About, Services, Projects, Careers, News, and Contact already have crawlable links; service detail pages already link to related published services.
- Repaired the empty mobile booking href using the same existing Calendly account as desktop.
- Removed eager loading/preload flags from the About illustration, FAQ illustration, and below-fold solution images. They retain Next Image sizing and optimization. This reduces competing initial image requests; no measured Core Web Vitals improvement is claimed.

### Verification tooling

The HTTP checker now discovers every URL from the sitemap, checks self-canonicals, rejects public noindex, asserts expected statuses and redirect targets, verifies missing pages return 404, rejects placeholder organization profiles, checks robots/sitemap availability and origins, and verifies the existing browser-language/cookie redirects. Requests have timeouts. It retains title, description, H1, main, language, social-card, and JSON-LD syntax checks.

## Existing architecture verified

- Next.js App Router renders page metadata on the server. All ten static marketing routes and CMS detail route families have metadata generators. Titles use one normalized company identity; descriptions and social cards are centrally generated.
- English is unprefixed; Oromo, Amharic, German, and Polish have explicit prefixes. English-only news index, internships, and talent-pool pages point to English. Missing CMS translations are omitted from hreflang. Automatic HTTP hreflang headers are disabled to avoid conflicts with actual publication coverage.
- Sitemaps include published blog/news, active jobs, projects, and published services. Service aliases, admin/API routes, drafts, and explicitly excluded services are omitted. Reliable CMS timestamps supply lastmod; static pages do not invent freshness dates.
- Vercel production defaults to indexing unless explicitly disabled. Preview/development and custom staging contexts remain blocked. Tests exercise these environment combinations. A production build on an unknown host needs the explicit indexing opt-in.
- Organization, WebSite, WebPage/AboutPage/ContactPage, Service, Article, NewsArticle, CreativeWork, and BreadcrumbList markup already exist. JSON-LD escapes script-closing input. No ratings, address, job eligibility details, or unsupported search actions were invented.
- Missing records call notFound; unpublished blog/news and inactive jobs are excluded by public readers. Bundled outage fallback records remain noindex and are excluded from the sitemap. This avoids advertising unconfirmed content, but sustained database outages can reduce indexable coverage; monitor CMS availability.
- Font optimization, responsive images, language attributes, mobile layouts, and basic semantic landmarks exist. The build still downloads five Google font families. Build-time connectivity is a deployment dependency.

## Sitelinks approach

The owner's preferred navigation candidates are **Our Services, Our Projects, About Us, Careers, and Contact Us**. These are descriptive destination pages with stable URLs, unique metadata, and persistent crawlable anchors. Blog, News and the career child pages are secondary destinations. Keep CMS menu labels concise and relevant, and use contextual links from articles and case studies to the appropriate service page.

Google selects sitelinks algorithmically. There is no sitelinks submission API or schema property that forces these destinations, labels, or ordering. WebSite markup supports site identity; BreadcrumbList describes hierarchy. The retired sitelinks search box is not a reason to add SearchAction to a site without search. See [Google sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks) and [the search-box retirement](https://developers.google.com/search/blog/2024/10/sitelinks-search-box).

## Remaining production and editorial work

1. Deploy the reviewed code, then rerun `node scripts/verify-seo.mjs https://matiitechnologies.com` and `node scripts/check-internal-links.mjs`. Confirm the Vercel production origin and indexing variables match `.env.example`.
2. Change the Vercel www-to-apex redirect from 307 to 308 while preserving paths and queries. This edge-level redirect was observed live; app code cannot reliably override a redirect issued before the request reaches Next.js.
3. In an owner-controlled Search Console domain property, submit `/sitemap.xml`. Inspect the homepage and principal destination pages; confirm Google's selected canonical and rendered HTML. Request indexing after deployment where appropriate. Search Console access was not provided, so coverage, manual actions, crawl statistics, and Google-selected canonicals were not inspected.
4. Validate deployed article, organization, and breadcrumb examples using Google's Rich Results Test. JSON parsing and local tests do not replace Google's eligibility checks.
5. Review CMS content for original case studies, substantiated claims, current authorship and dates, and legacy template text. Metadata normalization does not replace editing visible content. Review translations with native speakers before expanding alternate-language coverage; some service UI labels and footer labels still use English.
6. Add verified social profiles to `siteConfig.socialProfiles`. Do not infer ownership from a plausible handle. Keep the existing email and booking account until replacements are confirmed.
7. Measure mobile and desktop LCP/INP/CLS with PageSpeed Insights and Search Console field data. No Lighthouse run or CrUX dataset was available in this audit; HTTP timing is not a Core Web Vital. Investigate font payloads, animation/client JavaScript, and database latency based on those measurements.
8. Career detail pages currently lack JobPosting markup. Add it only when the CMS supplies accurate required job details and a reliable expiration/removal workflow. Article modified-date markup and fully localized visible breadcrumbs are useful subsequent refinements, not prerequisites for ordinary indexing.

## Validation

- TypeScript check passed before the production build.
- 15 targeted SEO, indexing, sitemap, translation, and CMS fallback tests passed, including new redirect and incomplete-translation regressions.
- Live baseline internal-link crawl: 79 links, zero failures.
- Final production build passed, including compilation, TypeScript and 191 generated entries. It logged intermittent CMS connection failures and used existing fallback handling during generation. The middleware/proxy and Prisma config deprecation warnings are pre-existing.
- Final standalone `pnpm exec tsc --noEmit` and `git diff --check` passed.
- Local production HTTP verification passed **78 route checks**, including all **67 sitemap URLs**, canonical primary pages, actual CMS detail pages, expected redirects, admin restrictions, and intentional missing-route probes. All reported issue arrays were empty. This is a local build result, not a deployment claim.
- Local sitemap XML parsed successfully: 67 URLs, zero incorrect origins. Live production sitemap independently parsed as 200 application/xml with 67 URLs.
- Final local internal-link verification passed **155 links, zero failures**. The earlier live-production baseline checked 79 links without failures; the larger local set comes from crawling all sitemap pages, not simply adding footer links.
- Asset checks passed: ICO 200 at 48×48, PNG alternative 200 at 192×192, Apple PNG 200 at 180×180, homepage social PNG 200 at 1200×630. Homepage checks confirmed the exact requested description, one Organization, one WebSite, one WebPage, the two intended icon declarations, and no snippet restriction.
- A query-preservation check passed: `/services/ai-data?source=audit` returned 308 to `/services/ai?source=audit`.
- Targeted ESLint on the changed SEO/configuration/content files passed with no output. Header.tsx was checked separately: its pre-existing state-in-effect and explicit-any errors remain; this patch changes only its empty booking href. Repository-wide `pnpm lint` **failed: 104 errors and 96 warnings**. No claim of a clean repository lint run is made.
- Not tested: browser interaction/visual regression suite, measured LCP/INP/CLS, per-page transferred JavaScript, Google's Rich Results Test execution, and authenticated Search Console reports. No design/class changes were introduced except omitting an empty footer navigation group; responsive visual verification remains a deployment review item.
- Requires production verification: deployed new titles/icons/redirects, Vercel 308 domain setting, Google's recrawl/canonical/snippet/favicon updates and actual sitelinks. The owner's Search Console results were supplied evidence, not independently accessed.

Evidence: `artifacts/seo-http-validation.json`, `artifacts/seo-local-http.log`, `artifacts/internal-link-validation.json`, `artifacts/seo-home-assets.json`, `artifacts/seo-production-googlebot.json`, `artifacts/seo-production-sitemap.xml`, `artifacts/seo-eslint-final.txt`, and `artifacts/seo-targeted-eslint.txt`. The 78-route run preceded the final checker additions for snippet restrictions/icon endpoints; those additions were separately exercised by the homepage and icon checks. Artifacts are local and Git-ignored.

Commands: `pnpm exec tsc --noEmit`; `pnpm exec tsx --test src/lib/seo.test.ts src/lib/indexing.test.ts src/lib/seo-sitemap.test.ts src/lib/pillars/translations.test.ts src/lib/services/cms-fallback.test.ts`; `pnpm build`; `node scripts/verify-seo.mjs http://localhost:3100`; `node scripts/check-internal-links.mjs`.

The working tree already contained changes to root favicon metadata, an untracked public favicon, and `docs/PRODUCTION-INDEXING-FIX.md`. The favicon work was incorporated into the consolidation; unrelated edits were preserved.

## Reference guidance

- [Google crawlable link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google localized versions and reciprocal hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [next-intl locale detection configuration](https://next-intl.dev/docs/routing/configuration#locale-detection)

## Audit findings and root causes

| Issue | Severity | Root cause | Resolution |
|---|---|---|---|
| URL-only www result and no page information | High | Google could not crawl the content used for that result. A prior disallow-all/noindex incident is documented; the current www indexed snapshot was not accessible to this audit. | Current apex robots/HTML allow crawling. Inspect both hosts, make the www redirect permanent, then request recrawling. Do not label this merely a missing-description issue. |
| www uses temporary redirect | High | Live Vercel response is 307, including robots and favicon. | Change the existing domain redirect to 308 in Vercel; no competing application host redirect added. |
| Placeholder social identities | High | Four placeholder handles were emitted as Organization.sameAs and footer links. | Removed placeholders; retain the existing shared profile configuration for verified values. |
| Favicon globe | Medium | Current icon is valid. Prior crawl blocking, stale hostname identity, or delayed icon processing remain plausible; Google-side cause is unverified. Duplicate local icon locations also existed. | Preserve official artwork, one public ICO path, accurate size metadata and existing high-resolution PNG alternative; recrawl after deployment. |
| Sitemap discovery processing error | Informational pending Google verification | URL Inspection can report a temporary failure retrieving sitemap reporting data. It is distinct from a malformed sitemap. | Live XML parsed successfully with 67 canonical-host entries. Preserve implementation and check Sitemaps report status/Last read. |
| Duplicate service alias pages | Medium | Aliases rendered HTTP 200 with canonical tags instead of redirecting. | 38 permanent redirect rules cover 19 aliases and their supported locale prefixes. |
| Missing contact H1 | Medium | A shared H2 component was reused as the contact route's primary heading. | Route-specific heading-level prop; shared usage remains H2. |
| Incomplete service translations in alternates | Medium | Only hero fields determined locale publication eligibility. | Require current translated service content fields; keep partial-translation rendering and locale selection functional. |
| Homepage title differs from preferred wording | Low | Existing English SEO copy targeted enterprise software and AI. | Adopt the requested software/digital-solutions title and description through the existing utility. |
| Missing footer destinations / mobile empty href | Low | Blog was omitted; mobile booking anchor had no destination. | Add useful existing destinations and repair booking URL. |
| Noncritical image preloads | Low | Below-fold illustrations and solution cards were eager. | Remove eager hints, retaining layout, images, sizes, and lazy loading defaults. |
| Large homepage HTML | Medium, measure before refactoring | Live smartphone-user-agent response was 6,066,997 decoded bytes. This includes HTML and serialized server data, not a measured JS bundle or compressed transfer size. | Record for a dedicated payload investigation; no broad client/animation refactor in this SEO patch. |
| CMS availability during local build | Medium operational | Repeated database connection errors trigger the existing bundled fallback policy. | Build still succeeds; fallback noindex is intentional. Verify real published routes with a healthy CMS after deployment. |
| Repository ESLint debt | Existing maintenance issue | Existing explicit-any, hook, ref, and other violations across the repository. | Report separately; do not change unrelated application logic to make this SEO task appear fully green. |

## Search Console setup and operation

1. Select **Add property → Domain**, enter `matiitechnologies.com` without a protocol or path, and copy Google's provided DNS TXT token to the domain's DNS provider. Do not invent a token. Preserve other DNS records, wait for propagation, then verify. A Domain property covers HTTP/HTTPS and www/non-www. Existing verified ownership can be reused.
2. A URL-prefix property is an alternative, but `https://matiitechnologies.com/` does not cover `https://www.matiitechnologies.com/`. The existing `GOOGLE_SITE_VERIFICATION` variable supports HTML verification for a matching URL-prefix property; DNS verification is used for the Domain property.
3. Open **Sitemaps**, submit `https://matiitechnologies.com/sitemap.xml`, and inspect status, Last read, and discovered URLs. Compare the submitted host with the canonical host. Do not repeatedly delete working sitemap submissions in response to URL Inspection's separate temporary reporting error.
4. Use **URL Inspection** on both `https://matiitechnologies.com/` and `https://www.matiitechnologies.com/`. Compare indexed data, last crawl, crawl permission, fetch result, user-declared canonical, and Google-selected canonical. The owner's supplied report establishes the indexed apex result only; it does not establish the latest www state.
5. Use **Test live URL** to check current accessibility. Examine tested-page HTML and screenshot. A live test is not proof of index inclusion and does not predict the final selected canonical. Confirm the apex is 200 and www redirects to it.
6. After deployment, request indexing for the apex homepage and a few important changed pages. Submit the sitemap for broader discovery. Requests do not guarantee indexing, a deadline, snippets, or sitelinks.
7. In **Page indexing**, examine unexpected exclusions and representative examples. Redirected aliases and intentionally unpublished pages should not be indexed as standalone pages. Investigate public pages marked blocked, noindex, duplicate with an unexpected canonical, or soft 404.
8. In **Performance → Search results**, filter branded queries such as `MATII TECHNOLOGIES` and compare the Pages, Queries, device, and country dimensions. Record impressions, clicks, CTR and average position over comparable periods. Search appearance varies by query, geography, device, and date; one manual search is not a complete measurement.

Sources: [URL Inspection documentation](https://support.google.com/webmasters/answer/9012289), [Sitemaps report](https://support.google.com/webmasters/answer/7451001), [Search Console ownership verification](https://support.google.com/webmasters/answer/9008080).

## Favicon troubleshooting

The retained ICO contains one **48×48** image. The existing 192×192 PNG is square and a multiple of 48; the 180×180 Apple touch icon is retained for its separate purpose. The current Google guidance requires square icons of at least 8×8 and recommends larger than 48×48; the supplied 192×192 alternative satisfies that recommendation. ICO, PNG, GIF, JPEG, BMP, PPM and TIFF are supported by the current documentation. No new art is needed here.

Live `/favicon.ico` returned **200**, `image/vnd.microsoft.icon`, 570 bytes, and `Cache-Control: public, max-age=0, must-revalidate`, with no X-Robots-Tag. Both local ICO copies had identical hashes before consolidation. The 192×192 official symbol was visually inspected. The stable metadata now points to `/favicon.ico` and `/icons/matii-192.png`; there is no app-file/public-file route collision. Include `public/favicon.ico` when committing or deploying, because it was previously untracked.

Googlebot must be able to crawl the homepage; Googlebot-Image must be able to crawl the favicon. Verify both paths through the preferred hostname and confirm www redirects correctly. A browser successfully opening an icon does not prove Google has fetched it or associated it with the selected search hostname. Do not keep changing the icon URL, use unsupported authentication, or block image crawling. Cache revalidation is currently enabled; there is no evidence that an excessive icon cache lifetime causes this incident.

A generic globe can persist while Google uses an old result, has not recrawled the homepage/icon, cannot access the selected host, or has not selected the favicon. After deploying, inspect the homepage and request recrawling once. Allow processing time; favicon display is not guaranteed. [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search).

## Search-result troubleshooting procedure

### “No information is available for this page”

Google's documented explanation is inability to crawl page content, commonly because of robots.txt. Such a URL can still be indexed through links. Inspect the **exact displayed URL**, including www, and its robots.txt. Also check WAF/protection rules, HTTP status, and past crawl timing. Do not add more keywords or remove all private-route restrictions as a remedy. [Google's explanation](https://support.google.com/webmasters/answer/7489871).

This repository records a previous global noindex header, disallow-all robots, and empty sitemap caused by production indexing configuration. Those historical restrictions are a plausible explanation for stale results, not proof of what Google last saw on www. Current live apex responses and the owner-reported successful apex inspection show recovery. The remaining tasks are permanent host consolidation, inspection of www's indexed state, and recrawl processing.

### Missing or rewritten titles/descriptions

Inspect the server response, not only the client DOM. Check one meaningful title, a unique accurate description, a descriptive H1, and no `nosnippet` or `max-snippet:0`. Check canonical selection and whether Google last crawled before the fix. The live smartphone-user-agent check returned a real title/description, one H1 and main landmark, and no snippet restriction. It is a simulated user-agent request, not a verified request from Google's IP ranges.

Google can rewrite title links and use page text instead of the meta description for a particular query. The requested wording is supplied as a preference, not an exact-display promise. See [title links](https://developers.google.com/search/docs/appearance/title-link) and [snippets](https://developers.google.com/search/docs/appearance/snippet).

### Canonical or www confusion

Check all four protocol/hostname combinations with redirects disabled, then follow the chain. Preserve the path and query. HTTPS apex must serve content; HTTPS www must redirect permanently to the same path on apex. HTTP-to-HTTPS may add an edge hop; avoid app rules that redirect apex back to www. All metadata and sitemap URLs derive from `siteConfig.url`. Keep `NEXT_PUBLIC_SITE_URL` set to the public apex HTTPS origin even for previews, which independently remain noindex.

### Sitemap processing errors

First distinguish **URL Inspection → Discovery → Temporary processing error** from an error in the **Sitemaps report**. Google defines the former as a temporary issue retrieving sitemap reporting data and suggests inspecting again. The live sitemap's 200 response and valid XML do not establish that Google's reporting has refreshed. [Official distinction](https://support.google.com/webmasters/answer/9012289).

If Sitemaps itself says it cannot fetch, verify the exact submitted URL, response status, TLS, public access, XML MIME type, valid XML, namespace, canonical URLs, and CMS availability. Check Vercel access/firewall logs and Google's last-read timestamp. Do not regenerate lastmod on every request or add unrelated URLs to chase the error. This implementation already uses appropriate published sources and meaningful timestamps.

## SEO coverage report

“Yes” below describes the code paths. Runtime CMS availability and publication flags can intentionally affect coverage; final execution results are reported separately.

| Page / route family | Unique title and description | Canonical / robots | Structured data | Sitemap | Internal discovery |
|---|---|---|---|---|---|
| `/` | Requested English copy; translated alternatives | Apex home; production index | Organization, WebSite, WebPage | Yes, eligible locales | Header logo, footer, page links |
| `/services` | Our Services / dedicated service description | Page-specific; production index | Shared identity, WebPage, BreadcrumbList | Yes, eligible locales | Header/footer and home CTA |
| `/services/[slug]` | Published service SEO or content fallback | Canonical pillar slug; noindex if excluded/outage | Shared identity, Service, BreadcrumbList | Published, indexable services and complete locales only | Service list and related services |
| `/projects` | Our Projects / project-specific description | Page-specific; production index | Shared identity, WebPage, BreadcrumbList | Yes, eligible locales | Header/footer and home |
| `/projects/[slug]` | CMS title/subtitle or SEO override | Record-specific; outage noindex | Shared identity, CreativeWork, BreadcrumbList | Public projects and complete locales | Project list and related projects |
| `/about` | About Us / about description | Page-specific; production index | Shared identity, AboutPage, BreadcrumbList | Yes, eligible locales | Header/footer |
| `/careers` | Careers / careers description | Page-specific; production index | Shared identity, WebPage, BreadcrumbList | Yes, eligible locales | Header/footer |
| `/careers/[slug]` | CMS job title/description or SEO override | Active record canonical; outage noindex | Shared Organization/WebSite; no JobPosting asserted | Active jobs and complete locales | Careers list |
| `/contact` | Contact Us / contact description | Page-specific; production index | Shared identity, ContactPage, BreadcrumbList | Yes, eligible locales | Header/footer, service/project CTAs |
| `/blog`, `/news` | Distinct index descriptions and titles | Per-index canonical; news English only | Shared identity, WebPage, BreadcrumbList | Appropriate index locales | Header/footer and content links |
| `/blog/[slug]`, `/news/[slug]` | Published CMS SEO or content fallback | Record canonical; outage noindex | Article or NewsArticle, BreadcrumbList, shared identity | Published records and complete locales | Index/detail links |
| Career internships / talent pool | Distinct English copy | English canonical on untranslated variants | Shared identity, WebPage, BreadcrumbList | English only | Careers and footer |
| Admin / API | Not search destinations | Intentional noindex headers; admin metadata | No marketing schema | Excluded | Not public navigation destinations |

CMS editors can still enter duplicate titles; the architecture supplies distinct defaults but cannot guarantee editorial uniqueness indefinitely. No page assigns the homepage canonical to unrelated routes. Missing routes return notFound rather than rendering a homepage substitute.

## Developer maintenance examples

Reuse the existing helpers; do not add a second root SEO system. The root title template remains intact, while `buildMetadata` uses absolute branded titles to avoid doubling the suffix.

For an existing static page:

```tsx
import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/about", props);
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;
  return <>
    <PageStructuredData path="/about" locale={locale} />
    {/* Keep the existing page body and its single primary heading here. */}
  </>;
}
```

For a new public static route, first implement the actual page, then add its path to `staticSeoPaths`, its translated copy in all supported message dictionaries (or explicitly limit `staticPageLocales`), and a relevant visible link. Confirm its body and metadata describe the same thing. Do not add nonexistent pages to the sitemap.

For an existing CMS blog detail, the repository already uses this pattern:

```tsx
import { cmsMetadata } from "@/lib/seo-cms";
import { missingMetadata } from "@/lib/seo";
import { getBlogPostBySlug } from "@/lib/services/blog.service";

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return missingMetadata();
  return cmsMetadata(post, "blog", "excerpt", locale, ["title", "excerpt", "content"]);
}
```

- **Services:** keep `PILLARS_LIST` slugs/aliases stable; publish content through the pillar CMS. Use `pillarLocales`, `buildMetadata`, `generateServiceSchema` and `generateBreadcrumbSchema`. A draft does not become public merely because its slug exists. Service noindex belongs to the published SEO state.
- **Projects:** use `getProjectBySlug`, `cmsMetadata(record, "projects", "subtitle", locale, ["title", "subtitle", "challengeParagraphs", "solutionParagraphs"])`, and the existing CreativeWork schema. All stored projects are public under the current data model; do not assume a draft flag exists.
- **Careers:** use the existing active-job reader and `cmsMetadata(record, "careers", "shortDescription", locale, ["title", "shortDescription", "content"])`. Deactivate closed roles and invalidate the existing caches. Do not invent JobPosting dates, salary, address, or remote eligibility.
- **Blog/news:** publish using `isPublished`; use the existing Article/NewsArticle generators. Keep author identity, dates and images accurate. Never derive publication dates from request time.
- **All dynamic pages:** use `notFound()` for unavailable/unpublished records; use `localizedUrl` for canonical identifiers and breadcrumbs. Keep the metadata and sitemap translation requirements aligned. Feed schema through the existing `JsonLd` serializer, which escapes inline-script hazards.
- **Images:** reuse HTTPS CMS images or `socialImageUrl`, whose generated cards are 1200×630. Do not assert those dimensions for arbitrary uploads. Existing PNG fallback and icons remain in `public`.
- **Indexing environments:** reuse `isProductionIndexable` everywhere. Public Vercel production defaults to indexable unless explicitly disabled; previews stay blocked even if the override is true. Do not bypass this helper in individual pages.

## Exact Vercel actions and deployment checklist

The local `.vercel/project.json` identifies the linked `motion-landing-page` project. It does not contain remote domain settings. No dashboard credentials or domain configuration were changed by this task.

1. Review the changes, including the favicon relocation; ensure the new public ICO is included in version control. Keep the existing design assets and root font configuration.
2. Open Vercel → the project's **Settings → Domains**. Confirm `matiitechnologies.com` is assigned to the Production environment and serves the production deployment.
3. Edit `www.matiitechnologies.com`. Set **Redirect to** `matiitechnologies.com` and the redirect status to **308 Permanent Redirect**. Save. Do not configure an apex-to-www redirect. Do not create a competing host redirect in Next.js.
4. Confirm DNS entries match the exact records Vercel supplies for those domains and that both have valid TLS. Do not replace existing DNS blindly or change mail-related records.
5. In **Settings → Environment Variables**, confirm Production has `NEXT_PUBLIC_SITE_URL=https://matiitechnologies.com`. `SEO_INDEXING_ENABLED=auto` (or no override) uses the verified production context; `true` also enables approved production. Remove an unintended `false`. Preserve preview/staging restrictions and real Vercel system environment values.
6. Deploy the reviewed source with a fresh production build; headers and robots can be generated at build time. Keep the CMS reachable. Do not assume a build completed with fallback data proves all live content is indexable.
7. Check these responses and their full chains:

```powershell
curl.exe -I https://matiitechnologies.com/
curl.exe -I 'https://www.matiitechnologies.com/about?seo_check=1'
curl.exe -I 'http://matiitechnologies.com/about?seo_check=1'
curl.exe -i https://matiitechnologies.com/robots.txt
curl.exe -I https://matiitechnologies.com/favicon.ico
curl.exe -I https://matiitechnologies.com/icons/matii-192.png
node scripts/verify-seo.mjs https://matiitechnologies.com
node scripts/check-internal-links.mjs
```

8. Expected: apex 200; www 308 to the same apex path/query; HTTP upgrades to HTTPS; no loops; robots allows intended public routes; no public noindex/nosnippet; sitemap 200 XML; icon 200 image; admin/API remain restricted. Check homepage title, description, canonical, icon links, H1, and one instance of each relevant schema.
9. Validate deployed schema in [Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/). Ordinary Service/CreativeWork markup does not guarantee a Google rich result.
10. Submit/inspect the canonical sitemap and both homepage host variants in Search Console. Request indexing of changed public pages, then monitor updated crawl dates, canonical selection, branded search results and favicon processing. There is no manual sitelinks enable switch.

[Vercel domain redirect documentation](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

## Modified-file inventory

- `next.config.ts`: permanent canonical service-alias redirects; existing environment and private-route headers preserved.
- `src/lib/seo-pages.ts`: preferred homepage copy and concise English primary-page titles through the existing metadata builder.
- `src/lib/site-config.ts`: remove unverified social profiles from footer and Organization markup.
- `src/lib/seo.ts`: normalize unknown-locale home URL and reject empty translated paragraph arrays.
- `src/lib/seo-cms.ts`: substantive, current service translation eligibility shared by metadata/sitemap.
- `src/lib/seo.test.ts`: regressions for aliases, translation completeness and normalized locale fallback.
- `src/app/layout.tsx`: actual ICO dimensions and existing 192px alternative; preserves earlier root metadata work.
- `src/app/favicon.ico` → `public/favicon.ico`: consolidate byte-identical icon, preserving the public URL and artwork.
- `scripts/generate-brand-icons.cjs`: maintain the consolidated public ICO location on future regeneration.
- `src/app/[locale]/(marketing)/contact/page.tsx`: request H1 for the contact page only.
- `src/components/sections/ContactSectionWhite.tsx`: semantic heading prop, default H2, and removal of an unused translation binding.
- `src/components/layout/Header.tsx`: repair mobile booking href only; navigation layout and behavior retained.
- `src/components/layout/Footer.tsx`: add existing Blog/Internships/Talent pool links and omit empty groups.
- `src/components/common/AboutUs.tsx`: remove forced eager image loading.
- `src/components/sections/Faq.tsx`: remove below-fold image preload.
- `src/components/sections/solutions/SolutionCard.tsx`: remove forced eager image loading.
- `scripts/verify-seo.mjs`: stronger status, canonical, sitemap, identity, and localization validation with timeouts.
- `docs/SEO_IMPLEMENTATION_AND_GOOGLE_SEARCH_GUIDE.md`: audit, root-cause distinctions, coverage, maintenance examples, validation and manual actions.
- `docs/PRODUCTION-INDEXING-FIX.md`: existing user edits retained; any follow-up clarification is explicitly dated.

No dependencies, new public pages, database migrations, business workflows, or replacement SEO architecture were added. Existing next-intl routing behavior is unchanged.
