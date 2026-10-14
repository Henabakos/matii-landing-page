import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const base = process.argv[2];
if (!base) throw new Error('Usage: node scripts/verify-seo.mjs http://localhost:3100');
const origin = 'https://matiitechnologies.com';
const paths = ['/', '/about', '/services', '/services/ai', '/services/enterprise', '/services/cloud', '/services/bpo', '/services/ai-data', '/projects', '/blog', '/news', '/careers', '/careers/internships', '/careers/talent-pool', '/contact', '/de', '/am', '/om', '/pl', '/de/services/ai', '/blog/product-discovery-playbook', '/services/definitely-missing', '/admin', '/admin/login'];
const results = [];
const internalLinks = new Set();
const decode = value => value?.replaceAll('&amp;', '&').replaceAll('&quot;', '"') || '';
for (const path of paths) {
  const start = performance.now();
  const response = await fetch(new URL(path, base), { headers: { 'User-Agent': 'facebookexternalhit/1.1' }, redirect: 'manual' });
  const html = await response.text();
  const meta = name => decode(html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1]);
  const canonical = decode(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/g)].length;
  const mainCount = [...html.matchAll(/<main(?:\s|>)/g)].length;
  const issues = [];
  if (response.status === 200 && !path.startsWith('/admin')) {
    if (!title.includes('MATII TECHNOLOGIES')) issues.push('brand missing in title');
    if (!canonical.startsWith(origin)) issues.push('incorrect canonical origin');
    if (!meta('description')) issues.push('missing description');
    if (!meta('og:image').startsWith('https://')) issues.push('missing absolute OG image');
    if (meta('twitter:card') !== 'summary_large_image') issues.push('missing Twitter card');
    if (h1Count !== 1) issues.push(`${h1Count} H1 elements`);
    if (mainCount !== 1) issues.push(`${mainCount} main elements`);
    if (!html.includes('hrefLang=') && !html.includes('hreflang=')) issues.push('missing alternates');
    if (!html.match(/<html[^>]*lang="[a-z]+"/)) issues.push('missing html language');
  }
  if (path.startsWith('/admin') && !response.headers.get('x-robots-tag')?.includes('noindex')) issues.push('admin lacks X-Robots-Tag');
  for (const match of html.matchAll(/<a[^>]*href="(\/[^"?#]*)/g)) {
    if (!match[1].startsWith('//') && !match[1].startsWith('/admin') && !match[1].includes('.')) internalLinks.add(decode(match[1]));
  }
  results.push({ path, status: response.status, location: response.headers.get('location'), title, canonical, robots: meta('robots'), ogImage: meta('og:image'), h1Count, mainCount, schemaTypes: schemas.map(item => item['@type']), elapsedMs: Math.round(performance.now() - start), issues });
  console.log(`${response.status} ${path}: ${issues.length ? issues.join('; ') : 'OK'}`);
}
const routes = {};
for (const path of ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/social-image?path=%2Fservices%2Fai', '/social/matii-default.png', '/icons/matii-180.png', '/en/about']) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' });
  const contentType = response.headers.get('content-type');
  routes[path] = { status: response.status, contentType, location: response.headers.get('location'), ...(contentType?.includes('text') || contentType?.includes('xml') ? { body: await response.text() } : {}) };
}
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/seo-http-validation.json', JSON.stringify({ base, results, routes, internalLinks: [...internalLinks] }, null, 2));
if (results.some(row => row.issues.length)) process.exitCode = 1;
