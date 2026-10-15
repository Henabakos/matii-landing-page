import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const base = process.argv[2];
if (!base) throw new Error('Usage: node scripts/verify-seo.mjs http://localhost:3100');
const origin = 'https://matiitechnologies.com';
const paths = ['/', '/about', '/services', '/services/ai', '/services/enterprise', '/services/cloud', '/services/bpo', '/services/ai-data', '/de/services/ai-data', '/projects', '/blog', '/news', '/careers', '/careers/internships', '/careers/talent-pool', '/contact', '/de', '/am', '/om', '/pl', '/de/services/ai', '/services/definitely-missing', '/blog/definitely-missing', '/news/definitely-missing', '/projects/definitely-missing', '/careers/definitely-missing', '/definitely-missing', '/admin', '/admin/login'];
const redirects = { '/services/ai-data': '/services/ai', '/de/services/ai-data': '/de/services/ai', '/admin': '/admin/login' };
const request = (url, options = {}) => fetch(url, { signal: AbortSignal.timeout(45000), redirect: 'manual', ...options });
const results = [];
const internalLinks = new Set();
const decode = value => value?.replaceAll('&amp;', '&').replaceAll('&quot;', '"') || '';
const sitemapResponse = await request(new URL('/sitemap.xml', base));
const sitemapBody = await sitemapResponse.text();
const canonicalPaths = new Set();
for (const match of sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(decode(match[1]));
  if (url.origin !== origin) continue;
  canonicalPaths.add(url.pathname);
  if (!paths.includes(url.pathname)) paths.push(url.pathname);
}
for (const path of paths) {
  const start = performance.now();
  const response = await request(new URL(path, base), { headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
  const html = await response.text();
  const meta = name => decode(html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1]);
  const canonical = decode(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/g)].length;
  const mainCount = [...html.matchAll(/<main(?:\s|>)/g)].length;
  const issues = [];
  const expectedStatus = path.includes('definitely-missing') ? 404 : redirects[path] ? path === '/admin' ? 307 : 308 : 200;
  if (response.status !== expectedStatus) issues.push(`expected HTTP ${expectedStatus}, got ${response.status}`);
  if (redirects[path] && new URL(response.headers.get('location') || '/', base).pathname !== redirects[path]) issues.push('incorrect redirect target');
  if (response.status === 200 && !path.startsWith('/admin')) {
    if (!title.includes('MATII TECHNOLOGIES')) issues.push('brand missing in title');
    if (!canonical || new URL(canonical).origin !== origin) issues.push('incorrect canonical origin');
    if (canonicalPaths.has(path) && (!canonical || new URL(canonical).href !== new URL(path, origin).href)) issues.push('sitemap page is not self-canonical');
    if (meta('robots').includes('noindex') || response.headers.get('x-robots-tag')?.includes('noindex')) issues.push('public page is noindex');
    if (/nosnippet|max-snippet:\s*0/.test(`${meta('robots')} ${meta('googlebot')} ${response.headers.get('x-robots-tag') || ''}`)) issues.push('public snippets are restricted');
    if (!meta('description')) issues.push('missing description');
    if (!meta('og:image').startsWith('https://')) issues.push('missing absolute OG image');
    if (meta('twitter:card') !== 'summary_large_image') issues.push('missing Twitter card');
    if (h1Count !== 1) issues.push(`${h1Count} H1 elements`);
    if (mainCount !== 1) issues.push(`${mainCount} main elements`);
    if (!html.includes('hrefLang=') && !html.includes('hreflang=')) issues.push('missing alternates');
    if (!html.match(/<html[^>]*lang="[a-z]+"/)) issues.push('missing html language');
    if (schemas.some(schema => schema.sameAs?.some(url => url.includes('placeholder')))) issues.push('placeholder organization profile');
  }
  if (path.startsWith('/admin') && !response.headers.get('x-robots-tag')?.includes('noindex')) issues.push('admin lacks X-Robots-Tag');
  for (const match of html.matchAll(/<a[^>]*href="(\/[^"?#]*)/g)) {
    if (!match[1].startsWith('//') && !match[1].startsWith('/admin') && !match[1].includes('.')) internalLinks.add(decode(match[1]));
  }
  results.push({ path, status: response.status, location: response.headers.get('location'), title, canonical, robots: meta('robots'), ogImage: meta('og:image'), h1Count, mainCount, schemaTypes: schemas.map(item => item['@type']), elapsedMs: Math.round(performance.now() - start), issues });
  console.log(`${response.status} ${path}: ${issues.length ? issues.join('; ') : 'OK'}`);
}
const routes = {};
for (const path of ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/social-image?path=%2Fservices%2Fai', '/social/matii-default.png', '/favicon.ico', '/icons/matii-192.png', '/icons/matii-180.png', '/en/about']) {
  const response = await request(new URL(path, base));
  const contentType = response.headers.get('content-type');
  routes[path] = { status: response.status, contentType, location: response.headers.get('location'), ...(contentType?.includes('text') || contentType?.includes('xml') ? { body: await response.text() } : {}) };
}
const routeIssues = [];
for (const [path, result] of Object.entries(routes)) {
  if (result.status !== (path === '/en/about' ? 307 : 200)) routeIssues.push(`${path}: unexpected HTTP ${result.status}`);
}
if (!routes['/robots.txt'].body?.includes(`Sitemap: ${origin}/sitemap.xml`) || /Disallow:\s*\/\s*$/m.test(routes['/robots.txt'].body || '')) routeIssues.push('production robots blocks crawl or omits sitemap');
const sitemapUrls = [...(routes['/sitemap.xml'].body || '').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
if (!sitemapUrls.length) routeIssues.push('empty sitemap');
if (new Set(sitemapUrls).size !== sitemapUrls.length) routeIssues.push('duplicate sitemap URLs');
for (const url of sitemapUrls) {
  if (new URL(url).origin !== origin || /\/(admin|api|en)(\/|$)/.test(new URL(url).pathname)) routeIssues.push(`invalid sitemap URL: ${url}`);
}
const localeChecks = [];
for (const headers of [{ 'Accept-Language': 'de' }, { Cookie: 'NEXT_LOCALE=de' }]) {
  const response = await request(new URL('/about', base), { headers });
  localeChecks.push({ headers, status: response.status, location: response.headers.get('location') });
  if (response.status !== 307 || new URL(response.headers.get('location') || '/', base).pathname !== '/de/about') routeIssues.push('existing locale detection behavior changed');
}
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/seo-http-validation.json', JSON.stringify({ base, checkedAt: new Date().toISOString(), results, routes, routeIssues, sitemapUrls, localeChecks, internalLinks: [...internalLinks] }, null, 2));
for (const issue of routeIssues) console.error(issue);
if (results.some(row => row.issues.length) || routeIssues.length) process.exitCode = 1;
