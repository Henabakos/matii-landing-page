# MATII TECHNOLOGIES: search setup and growth guide

Prepared 14 October 2026 for the owner-confirmed website **https://matiitechnologies.com**. The domain is spelled `matii` with two consecutive **i** characters; use this exact spelling. The company name remains **MATII TECHNOLOGIES**.

## Before submitting the site

For the day-to-day CMS workflow, image selection, publishing checklist and Google submission steps, start with [Blog SEO and Google indexing](BLOG-SEO-AND-GOOGLE-INDEXING-GUIDE.md).

Ask your developer or hosting administrator to complete these checks:

1. Connect the confirmed domain to the production deployment and enable HTTPS. Decide whether `www` is used; the implementation uses the non-www domain. Redirect HTTP and www traffic to the HTTPS non-www equivalent, preserving the path and query. Do not redirect arbitrary third-party domains. If you own the former domain, arrange a path-preserving permanent redirect there after checking old-to-new page mappings.
2. Set `NEXT_PUBLIC_SITE_URL=https://matiitechnologies.com` in production. Remove conflicting legacy values from hosting configuration. This setting is embedded in client bundles, so **rebuild after changing it**.
3. Set `SEO_INDEXING_ENABLED=true` **only in production**, then rebuild and deploy. Confirmed Vercel/Netlify production now also defaults to indexing when this override is absent or `auto`; explicit `false` still blocks it. Preview contexts remain blocked even if the flag is true. On other hosts keep the flag false for staging and use host-level password protection for private previews. See [production indexing recovery](PRODUCTION-INDEXING-FIX.md) if the live site returns noindex or an empty sitemap.
4. Open `/robots.txt`: production should allow `/`, exclude admin/API paths and name the sitemap. Open `/sitemap.xml`: it should contain canonical pages and published CMS records. A development/preview build intentionally has a disallow-all robots file and an empty sitemap.
5. Confirm important CMS records are published. Service pillars have separate draft and published documents; saving a draft does not publish it. An intentionally empty CMS stays empty. During an outage the website can show saved fallback content, but those detail records are noindex and are omitted from sitemap discovery.
6. Confirm the homepage, contact form, four service pages, and a real case study work on mobile. Test contact submissions using an owner-approved test message, then remove the test inquiry through the normal CMS workflow.

Robots directives are not access control. Existing admin authentication remains in place. Do not put confidential documents in public assets or CMS public content.

## A. Google Search Console

### Add and verify ownership

1. Open [Google Search Console](https://search.google.com/search-console) and sign in with a company-controlled Google account. Enable two-step verification and keep at least two trusted administrators.
2. Choose **Add property**. A **Domain property**, entered as `matiitechnologies.com` without `https://`, covers protocols and subdomains. This is the recommended company-wide view. A **URL-prefix property**, entered as `https://matiitechnologies.com/`, covers that specific prefix and supports more verification methods.
3. For the Domain property, copy Google's DNS TXT value. Open your domain provider's DNS management page, add a new TXT record at the root (`@`, or the provider's root-name convention), paste the value, and save. Do not overwrite SPF, email, or other existing TXT records.
4. Return to Search Console and click **Verify**. DNS changes may take time to propagate. Keep the verification record after success. Google's [ownership verification instructions](https://support.google.com/webmasters/answer/9008080) explain the property types and supported verification methods.

If DNS access is unavailable, use a URL-prefix property and the HTML-tag method. Give the developer only the verification token to set as `GOOGLE_SITE_VERIFICATION`, then rebuild. This code outputs the tag; it does not need an analytics tracker to verify ownership.

### Submit and inspect

1. Select the verified property, open **Sitemaps**, enter `https://matiitechnologies.com/sitemap.xml`, and submit. Confirm a successful read after deployment.
2. Paste the homepage URL into **URL Inspection**. Review crawl availability, user-declared canonical, Google-selected canonical, and indexing status. Use **Test live URL** to check the current page rather than only Google's older copy.
3. Request indexing for the homepage and each published canonical service: `/services/enterprise`, `/services/bpo`, `/services/ai`, `/services/cloud`. Also inspect `/about`, `/contact`, and your strongest genuine project case study. Do not submit service aliases such as `/services/ai-data` separately.
4. Inspect one translated static page, such as `/de/about`. English URLs do not use `/en`. An untranslated CMS detail page canonicals to English; this is intentional until a sufficiently complete translation is published.

See Google's [URL Inspection guidance](https://support.google.com/webmasters/answer/12482179?hl=en) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Submission helps discovery; it does **not** guarantee indexing, rich results, ranking, or a deadline.

### Weekly checks

Use **Page indexing** to separate intentional exclusions from problems. Admin/login exclusions, unpublished records, aliases and untranslated duplicates are expected. Investigate unexpected noindex, blocked marketing pages, 5xx errors, redirect loops, soft 404s and wrong canonicals. A noindex public page may mean the production indexing flag is missing, a service's published noindex setting is enabled, or a CMS outage fallback was served.

In **Performance → Search results**, review clicks, impressions, CTR and average position by page, query, country and device. Compare equivalent periods, separating branded searches (MATII, MATII TECHNOLOGIES) from service queries. More impressions with low CTR can justify a more specific title; low impressions can mean weak relevance, discovery or competition. Do not interpret average position as a guaranteed ranking.

Review **Experience → Core Web Vitals** for mobile and desktop field data. New or low-traffic sites may lack sufficient data. Use PageSpeed Insights for diagnostics, but distinguish lab tests from real-user reporting. Track the requested 75th-percentile goals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. See [Core Web Vitals guidance](https://web.dev/articles/vitals).

## B. Bing Webmaster Tools

Open [Bing Webmaster Tools](https://www.bing.com/webmasters). Use **Import** to connect the verified Google Search Console property, or **Add site** and follow the verification method offered. The website also supports a `BING_SITE_VERIFICATION` token for the HTML meta-tag method. Rebuild after configuring it. Bing documents [site verification and Search Console import](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b).

Submit the same production sitemap. Review URL Inspection, crawl/indexing issues and Search Performance for the homepage and services. Imported ownership can depend on continued Search Console authorization; retain company access.

IndexNow is optional. It is **not installed automatically**. If publishing frequency increases, add a host-verified key and server-side notifications only after successful publish, update or delete operations. Never send draft URLs or private records. Queue retries outside the visitor request and deduplicate notifications. See the [IndexNow protocol](https://www.indexnow.org/documentation). It notifies participating engines of changes; it is not a Google indexing API or a ranking guarantee.

## C. Google Business Profile

First confirm eligibility with the owner. MATII's visible website references Addis Ababa, but its repository has no owner-confirmed street address. Do not treat the map's city overview as an exact office. Google generally requires in-person customer contact; online-only businesses do not qualify under the normal Business Profile rules. Check [Google's eligibility guidelines](https://support.google.com/business/answer/13763036?hl=en-en).

If eligible, use [Google Business Profile](https://www.google.com/business/) to claim or add the real business. Follow the verification method Google offers; do not promise postal, phone or video verification in advance. Select the closest available category matching the actual business, such as software company if offered and accurate. Use the legal/public trading name MATII TECHNOLOGIES without extra search keywords.

Enter accurate telephone, operating hours, website and customer-facing address or genuine service area. Hide an address where required for a service-area business. Do not create listings at virtual offices or the website's unverified overseas hub cities. Write a factual description of enterprise software, AI/data, BPO and cloud services. Request voluntary reviews from real customers without incentives, gating, fabricated testimonials or employee reviews. Reply professionally without exposing client information.

## D. Analytics and conversion measurement

No tracking scripts were installed by this task. Choose the privacy/consent approach and retention policy before activation; ask qualified local advice where needed. A privacy-conscious alternative may be suitable if aggregate reporting is sufficient.

For GA4, sign in to [Google Analytics](https://analytics.google.com/), create a company account/property with the appropriate time zone, and add a Web data stream for the confirmed production origin. Give the developer the measurement ID. Install one tracking method: a consent-controlled Google tag directly, or Google Tag Manager if a nontechnical team needs to manage several tags. Do not install both in ways that double-count page views. Follow the [GA4 setup instructions](https://support.google.com/analytics/answer/9304153).

In GA4 Admin, link the matching Search Console property under the Search Console product link settings using authorized accounts. See [Google's account and integration guidance](https://support.google.com/analytics/answer/9679158). Validate Realtime/DebugView and exclude internal testing from business reporting.

Define conversions around actual outcomes: `generate_lead` after a successful persisted inquiry, a separately named demo-link click, and a confirmed booking event only if the booking provider supports it. A click is not a completed booking. Keep job applications separate from sales leads. Never send names, emails, phone numbers, CV URLs, cover notes, project descriptions or message contents in analytics parameters. Test consent rejection as well as acceptance; tracking must respect the chosen policy.

## Publishing and safe brand correction

The developer ran `pnpm exec tsx scripts/review-cms-brand.ts` in review mode. It found 14 affected fields across career titles, blog/project SEO and the published AI pillar, including older template-company labels. `artifacts/cms-brand-review.json` contains exact before/after values, not an applied migration.

Review every proposal, especially quoted text and historical statements. Remove any proposal you do not approve. After backup and review, the developer can apply that file with `pnpm exec tsx scripts/review-cms-brand.ts --apply artifacts/cms-brand-review.json`. This uses a transaction and refuses updates if the original value has changed. It never copies a draft into a published field. Refresh/redeploy content caches afterward. Review corresponding drafts in the CMS so a later publish does not reintroduce old branding. Do not run the destructive legacy `prisma/seed.ts` for this purpose.

## 7 / 30 / 60 / 90-day roadmap

### First 7 days: foundation

Enable indexing on production, verify the domain, test canonical and language alternates, submit the sitemap, inspect actual published pages, validate JSON-LD and share previews, and check form delivery. Confirm company profiles, contact details and evidence behind public claims. Use the implementation report's release checklist before requesting indexing.

### First 30 days: intent and content

Use Search Console and customer conversations to research service-specific language. Map enterprise/ERP/fintech inquiries to `/services/enterprise`, operations outsourcing to `/services/bpo`, data platforms and AI to `/services/ai`, and cloud/DevOps/SRE to `/services/cloud`. Improve each page with owner-approved scope, deliverables, prerequisites and useful proof. Add descriptive contextual links from published articles and case studies. Establish consistent company details across owned profiles. Do not publish separate geographic or keyword pages without distinct, useful content.

### Days 30–60: evidence and discovery

Publish permission-cleared case studies describing the problem, constraints, implementation and measured outcome. Replace unsupported sample claims with real evidence. Write practical articles by the engineers doing the work. Complete company profiles, share useful material with relevant professional communities, and seek editorial links through real partnerships or project coverage. Never buy spam links, exchange mass links or copy competitor case studies.

### Days 60–90: refinement

Compare Search Console query/page trends and qualified inquiries. Improve titles for pages earning relevant impressions but few clicks; investigate poor conversions separately from rankings. Review exclusions, mobile usability, field performance and stale CMS content. Refresh pages based on real buyer questions. Track branded and non-branded demand separately. Search is competitive; no responsible plan guarantees a position or a fixed ranking timeframe.

## Preview testing and external validation

Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) on deployed canonical URLs. For X, try [Card Validator](https://cards-dev.twitter.com/validator) if available to your account; otherwise paste the URL into a draft composer and inspect the card. Validator availability and legacy documentation links change. Use authorized Slack, Discord, WhatsApp and Telegram test conversations without publishing promotional messages automatically.

See [SOCIAL-MEDIA-ASSET-GUIDE.md](SOCIAL-MEDIA-ASSET-GUIDE.md) for dimensions, caches and platform-specific banners. Use [Google Rich Results Test](https://search.google.com/test/rich-results) for eligible types and [Schema.org Validator](https://validator.schema.org/) for general syntax/vocabulary. Service and WebPage markup does not promise a Google rich-result feature. Run URL-based tests after deployment; local validation alone cannot demonstrate crawler access to production.
