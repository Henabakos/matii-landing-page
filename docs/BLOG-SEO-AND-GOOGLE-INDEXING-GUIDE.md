# Blog SEO and Google indexing: administrator workflow

For **MATII TECHNOLOGIES**, at **https://matiitechnologies.com**. Last checked against the CMS and Google's official guidance: 14 October 2026.

Use this guide each time you publish an article. Search Console registration is a one-time setup; article review and performance monitoring are ongoing.

## 1. The complete flow

Choose a real customer question → write and review the article → prepare its image → complete CMS SEO fields → publish → check the public page and sitemap → inspect the URL in Google Search Console → monitor results.

Publishing makes a page available on the website. Google must then discover, crawl and decide whether to index it. Indexing does not guarantee a high ranking. Neither submitting a sitemap nor repeatedly requesting indexing guarantees inclusion. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## 2. Prepare a useful article

1. Choose one question relevant to a real service: ERP implementation, business-process outsourcing, AI/data platforms, or cloud operations.
2. Write a clear answer supported by actual experience. Get permission before naming customers or publishing screenshots, numbers or project details.
3. Use a descriptive article title. Organize the body with H2 sections and H3 subsections; the page already renders the article title as its H1.
4. Link naturally to the relevant service: `/services/enterprise`, `/services/bpo`, `/services/ai`, or `/services/cloud`. Include a relevant case study if one is published.
5. Provide a real author, accurate category and realistic reading time. Remove template author names and unsupported claims.

For example, an article answering how to prepare for an ERP migration could use:

- Article title: `How to Prepare for an ERP Migration`
- URL slug: `erp-migration-checklist`
- SEO Meta Title: `ERP Migration Checklist`
- Meta Description: `Plan an ERP migration with practical checks for data quality, integrations, staff training, testing, and rollout before replacing your current system.`
- Relevant service link: `/services/enterprise`

These are editorial examples, not an existing article. Use them only if the final article actually covers these points. The site adds the company name to the SEO title automatically.

## 3. Add the article and SEO in the CMS

1. Sign in at `https://matiitechnologies.com/admin/login` and open the blog manager at `/admin/blog`. Create an article or edit an existing one.
2. **Before saving an unfinished new article, uncheck `Published Live`.** New articles currently start with this option checked. The button still says `Save & Publish Article` when unchecked; the checkbox determines whether the saved record is public.
3. Fill in **Article Title**, **URL Slug**, category, author details, reading time, excerpt and article body. The excerpt is the short visible summary, and also supplies the metadata description when the SEO description is blank.
4. Choose the **Article Hero Cover Image** as described below.
5. Find **Search Engine Optimization (SEO) & Social Cards**. Enter a unique **SEO Meta Title** and **Meta Description**. A blank SEO title uses the article title; a blank SEO description uses the excerpt.
6. Review the Google desktop/mobile preview and social preview. Aim for concise text; the editor's length indicators are guidance, not Google limits or ranking scores. The brand suffix counts toward the displayed title length.
7. Treat keywords as optional editorial labels. Google's search ranking does not use the keywords meta tag. Do not repeat keywords artificially in the article. See [Google's supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags).
8. Add and review translations only where real translated content exists. The current supported locales are English, Afaan Oromo (`om`), Amharic (`am`), German (`de`) and Polish (`pl`). English SEO fields are not separate per-language SEO overrides; localized metadata uses translated visible fields.
9. Save with **Published Live** unchecked while preparing a new draft. When reviewed and ready, check it, save, and wait for a successful response.

**Existing published articles:** saving changes while `Published Live` is checked updates the public record immediately. Blogs do not have the service-pillar editor's separate draft/published versions. Unchecking the box takes the article out of public listings and discovery. Prepare substantial revisions outside the live editor if the current article must stay available during review.

Choose a stable slug before publication. Changing it changes the public URL, and the blog save action does not create an automatic redirect from the old slug. Ask the developer to add a permanent redirect if a published URL genuinely needs changing.

## 4. Use the social images already in this repository

The current files are in **`public/social/`**, rather than `public/images/social/`. Next.js serves files in `public` without the `public` prefix:

- `public/social/matii-blog.png` → `https://matiitechnologies.com/social/matii-blog.png`
- `public/social/matii-ai.png` → `https://matiitechnologies.com/social/matii-ai.png`
- `public/social/matii-cloud.png` → `https://matiitechnologies.com/social/matii-cloud.png`
- `public/social/matii-bpo.png` → `https://matiitechnologies.com/social/matii-bpo.png`
- `public/social/matii-default.png` → `https://matiitechnologies.com/social/matii-default.png`

For a general blog card, use the first URL after the file has been deployed. Prefer a relevant article-specific image when available. Aim for a 1200 × 630 PNG or JPEG with readable text, the approved logo/colors, and generous margins. Check each supplied file's actual dimensions before use; a filename alone does not establish its size or suitability.

In **Article Hero Cover Image**, use an uploaded image or the full public HTTPS image URL. The same cover serves the article and its custom sharing metadata; there is currently no separate blog-only OG image field.

**Important current behavior:** the blog metadata helper accepts a custom cover as its sharing image only when the stored value starts with `https://`. A value such as `/social/matii-blog.png` can display as an article cover, but the actual sharing metadata uses the generated article card instead. Use `https://matiitechnologies.com/social/matii-blog.png` if you want that specific file in the sharing card. The CMS preview is a guide; check the published page to confirm the actual result.

Adding files to the folder does not automatically assign them to every page. File additions require deployment; selecting an already deployed image in the CMS only requires saving the article. If you later create `public/images/social/example.png`, its public URL will be `/images/social/example.png`.

Open the image URL in a signed-out browser to confirm it loads without a login. Test the article URL with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). These inspect sharing previews, not Google indexing. When replacing an image, use a new descriptive filename and update its CMS URL if old cached previews persist. More asset guidance: [Social media asset guide](SOCIAL-MEDIA-ASSET-GUIDE.md).

## 5. Check each article after publishing

- Open `https://matiitechnologies.com/blog/your-slug` while signed out. Check title, content, image, mobile layout and links.
- Confirm it appears on `/blog` and in `https://matiitechnologies.com/sitemap.xml`. Search the sitemap for the exact slug. Do not manually edit the generated sitemap.
- Use browser **View page source** to find `<title>`, `name="description"`, `rel="canonical"`, `og:image` and `twitter:card`. The canonical should be the production article URL. English does not use `/en`.
- Confirm there is no unexpected `noindex` directive in page metadata or response headers. Ask the developer to inspect headers if needed.
- Check the real social preview after publication; preview tools and social apps can retain earlier copies.

The code generates canonicals, social metadata, language alternates, Article structured data and published sitemap entries. You do not need to paste HTML meta tags or JSON-LD into the article body.

If the backend is unavailable, the website can show bundled fallback content. Those fallback detail records are deliberately noindex and excluded from sitemap discovery. A successful empty database response stays empty. Restore CMS connectivity before asking Google to index a fallback page.

## 6. One-time production readiness check

Ask the hosting administrator to confirm the deployed production settings:

```dotenv
NEXT_PUBLIC_SITE_URL=https://matiitechnologies.com
SEO_INDEXING_ENABLED=true
```

Rebuild and deploy after changing these values. Keep staging/preview indexing disabled. The production domain must load publicly over HTTPS, with the preferred non-www URLs. Authentication or a hosting password must not block marketing pages.

Open these deployed URLs:

- `https://matiitechnologies.com/robots.txt`: public crawling should be allowed and the production sitemap listed.
- `https://matiitechnologies.com/sitemap.xml`: canonical public URLs should be present.

If robots says `Disallow: /` or the sitemap is empty, resolve the production environment or CMS issue before submission. Do not remove private/admin protections to solve a public-page indexing issue.

## 7. Add MATII TECHNOLOGIES to Google Search Console

### Step A: verify the domain

1. Open [Google Search Console](https://search.google.com/search-console) with a company-controlled Google account.
2. Choose **Add property**, select **Domain**, and enter `matiitechnologies.com` without a protocol or path. This covers its protocols and subdomains. A URL-prefix property instead covers the specific prefix entered, such as `https://matiitechnologies.com/`.
3. Copy the TXT verification value Google supplies. At your DNS provider, add a new root-domain TXT record using its root-name convention, commonly `@`. Keep existing email and other TXT records intact.
4. Save, return to Search Console and select **Verify**. If DNS has not propagated, wait and retry. Retain the verification record afterward.

Without DNS access, choose a URL-prefix property and HTML-tag verification. Give the developer the token from the tag's `content` value to configure as `GOOGLE_SITE_VERIFICATION`, rebuild and deploy, then verify. This alternative does not verify a Domain property. Follow [Google's ownership verification instructions](https://support.google.com/webmasters/answer/9008080).

### Step B: submit the sitemap

1. Select the verified property, then open **Sitemaps**.
2. Submit `https://matiitechnologies.com/sitemap.xml`. If the form already supplies the origin, enter only `sitemap.xml` in the remaining field.
3. Check that Google can fetch it successfully. If it cannot, confirm the exact domain, public access, HTTPS and server availability.
4. Keep this sitemap submitted. Published articles are added by the application; you do not need a new sitemap submission for each article.

### Step C: request indexing of important URLs

1. Paste `https://matiitechnologies.com/` into the **URL Inspection** bar.
2. Review indexing status and the reported canonical. Select **Test live URL** to check Google's access to the current page.
3. If the page is available and intended for search, select **Request indexing** when offered.
4. Repeat for the four canonical service URLs and the new published article's exact URL. Submit `/services/ai`, not its alias `/services/ai-data`.
5. Record the URL and request date. Allow time for processing; repeatedly submitting the same page does not accelerate crawling, and requests have limits.

The live test checks current accessibility; it does not prove the page is already indexed. See [Google's URL Inspection help](https://support.google.com/webmasters/answer/9012289) and [recrawl instructions](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## 8. Troubleshoot and monitor

- **Excluded by noindex:** check the production indexing setting and whether an outage fallback was returned. Private/admin exclusions are expected.
- **Blocked by robots.txt:** check the deployed environment; public production pages should be crawlable. Keep preview sites excluded.
- **Not found / 404:** verify the slug and Published Live checkbox. If an old published URL changed, arrange its redirect.
- **Server error / 5xx:** have the developer investigate hosting and CMS connectivity before requesting another crawl.
- **Duplicate or alternate canonical:** inspect both the declared and Google-selected canonical. Aliases and incomplete translated variants can intentionally consolidate to another URL.
- **Discovered or crawled, currently not indexed:** check useful original content, internal links and duplication. A technically accessible page is not automatically selected for indexing.

Weekly, review **Page indexing** and **Performance → Search results**. Filter by the new article URL and track queries, impressions, clicks and CTR. Improve a title when it fails to describe what the article actually answers; do not rewrite it simply to stuff keywords. Search engines can choose different titles and descriptions from the preview. See [Google's snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

Use URL Inspection as the primary page-status check rather than relying only on a `site:` search. Record content changes and compare meaningful periods; new sites may initially have little data. Review Core Web Vitals when sufficient field data becomes available.

## 9. Repeatable publishing checklist

- [ ] Article answers one relevant question and all claims are reviewed.
- [ ] Stable slug, correct author, useful excerpt and logical headings.
- [ ] Unique SEO title and description; preview checked.
- [ ] Cover image deployed and its public HTTPS URL loads.
- [ ] Relevant internal service/case-study links work.
- [ ] Translations reviewed where provided.
- [ ] Published Live enabled only when ready; save succeeded.
- [ ] Signed-out public article and sitemap checked.
- [ ] Canonical, indexing directives and actual social image checked.
- [ ] Important new URL inspected in Search Console; request date recorded.
- [ ] Follow-up review scheduled to assess indexing and search performance.

For Bing, analytics, Google Business Profile eligibility and the broader roadmap, continue with [SEO setup and growth guide](SEO-SETUP-AND-GROWTH-GUIDE.md). For article ideas, see [SEO content strategy](SEO-CONTENT-STRATEGY.md).
