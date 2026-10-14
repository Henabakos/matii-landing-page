# MATII TECHNOLOGIES social assets

The site uses the existing approved logo, charcoal `#292c2e`, lime `#98ff03`, and white. No replacement logo or unrelated technology illustration was created. Keep the established site typography and layouts unchanged. The sharing renderer uses Next's bundled Geist font, already part of the site's font family set, with the original SVG wordmark embedded directly.

## Website link-sharing images

All generated cards are **1200 × 630 PNG**, about 1.91:1. This is the default website sharing format for Open Graph consumers such as LinkedIn, Facebook, WhatsApp, Telegram, Discord and Slack, plus X's `summary_large_image` metadata. Actual presentation remains platform-controlled.

Checked-in assets:

- `public/social/matii-default.png`: reliable default if dynamic rendering fails.
- `public/social/matii-home.png`: homepage campaign/export artwork.
- `public/social/matii-services.png`: services overview campaign/export artwork.

The reusable endpoint is `/social-image?path=/services/ai&locale=en&v=1`. Metadata generates absolute production URLs automatically. It supports homepage and static marketing pages, four services and their aliases, project/solution details, blog/news articles and career details. It accepts known paths rather than arbitrary user-entered banner text. A published CMS upload can be used directly; generated cards cover records without a suitable custom image. Service default illustrations use generated cards, while a custom service SEO image path/HTTPS URL is respected.

Product cards currently exist inside service pages. Share the service URL plus a meaningful product anchor; a fragment does not produce a separate social preview. There are no invented standalone product URLs or product sitemap entries.

During CMS outages the image endpoint can use the same public fallback content as the page, without caching that image response. A renderer failure redirects to the checked-in default PNG. The image endpoint and assets must remain accessible without authentication in production.

Amharic metadata remains localized. Image artwork currently uses English for `am` because no licensed Ethiopic font is bundled with the image renderer. This is deliberate and avoids runtime remote-font dependencies or missing glyphs. Commission a reviewed Amharic card/font package before switching the artwork language; do not substitute machine-generated unreviewed brand copy.

### Layout and naming

Keep important content inside the renderer's 72px horizontal and 64px vertical margins. Use one short heading, the official name, and the canonical domain. Avoid tiny technical labels, dense lists, exaggerated claims or screenshots with unreadable UI. Long CMS titles are capped for artwork; the page's full title remains in its HTML metadata.

Use lowercase hyphenated filenames, for example `matii-services-v2.png` or `matii-enterprise-case-study-client-approved.png`. Store website assets under `public/social/`, not inside arbitrary component folders. A file at `public/social/name.png` is served at `/social/name.png`.

Regenerate the three static cards with `pnpm exec tsx scripts/generate-social-assets.tsx`. Their implementation lives in `src/lib/social-image.tsx`. Review the exported PNG at full size and as a small mobile preview before committing it.

## Social account graphics are different assets

A link-sharing card is fetched from a webpage's metadata. A profile picture or account cover is uploaded to an account's settings. Do not stretch a 1200 × 630 card into every cover slot.

- **Square master:** `public/icons/matii-1080.png`, 1080 × 1080 PNG, rasterized from the existing symbol with breathing room. Export smaller versions as the target platform requires; verify that circular cropping does not clip the mark.
- **LinkedIn company cover:** current official company Page guidance recommends **1512 × 256**, PNG/JPEG, maximum 3MB. Its current logo recommendation is **400 × 400**. These are company Page dimensions, not personal-profile or advertising specifications. Recheck [LinkedIn's official image specifications](https://www.linkedin.com/help/lms/answer/a563309) before upload; verified during this task on 14 October 2026. Keep content away from avatar overlays and preview the mobile crop.
- **X header:** **1500 × 500**. X warns that approximately 60px at the top/bottom can be cropped, so keep text in the central band. The recommended profile image is 400 × 400, under 2MB. See [X's official upload guidance](https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo).
- **Facebook cover:** use the current recommendations presented in Facebook Page settings and [Meta's cover guidance](https://www.facebook.com/help/125379114252045). The official page required login/blocked automated access during this task, so an exact current dimension is **not claimed verified**. Confirm the desktop/mobile crop and profile-photo overlay in the account before creating a cover.

LinkedIn, Facebook and X cover files were not uploaded or invented for unverified accounts. The website's previous links to generic social-platform homepages were removed from the footer and organization schema. Add only owner-verified profile URLs to `siteConfig.socialProfiles`; the footer will then render those links.

## Browser and app identity assets

`scripts/generate-brand-icons.cjs` rasterizes the existing symbol without changing its geometry. Outputs are `public/icons/matii-32.png`, `matii-48.png`, `matii-180.png`, `matii-192.png`, `matii-512.png`, and `matii-1080.png`. A 48px PNG-backed ICO replaces the previous favicon at `src/app/favicon.ico`.

The 180px asset is the Apple touch icon. Manifest icons are 192px and 512px and declare `purpose: any`, not maskable: no maskable safety claim is made. `/manifest.webmanifest` uses the official brand name and current colors. It does not add a service worker or offline application behavior. Run `node scripts/generate-brand-icons.cjs` to regenerate these assets using the Sharp dependency already supplied by Next.js.

## Test and refresh previews

1. Deploy the new code/assets. Visit the canonical page while signed out. Inspect `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`, `og:image` and all Twitter card tags in the HTML. The image URL must be HTTPS, publicly accessible and return PNG/JPEG rather than an error page.
2. Run [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and request a new scrape. Account access may be required. Inspect the selected URL/image, not just the page title.
3. Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to request a fresh inspection. Paste the same canonical URL into a draft post afterward.
4. Use [X Card Validator](https://cards-dev.twitter.com/validator) if available, or test in X's composer. The former X card-documentation URL redirected to its general developer portal during verification; do not rely on old screenshots of the validator as current instructions.
5. Test a draft or authorized private message in WhatsApp, Telegram, Slack and Discord. Do not send promotional messages automatically as part of testing. Generic Open Graph inspection tools can check tag presence but cannot guarantee each platform's crop or cache behavior.

Social platforms maintain separate caches from Next.js and the CDN. The dynamic image uses short browser caching and up to an hour of shared caching for normal content. After a design change, increment the `v` value in `socialImageUrl` or use a new static filename, redeploy, then re-inspect the page. Do not change canonical page URLs merely to refresh a preview. Never promise that a cached card already posted elsewhere will update immediately.
