import { readFile, writeFile } from 'node:fs/promises';
const report = JSON.parse(await readFile('artifacts/seo-http-validation.json', 'utf8'));
const queue = [...report.internalLinks];
const results = [];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    try {
      const response = await fetch(new URL(path, report.base), { headers: { 'User-Agent': 'facebookexternalhit/1.1' }, signal: AbortSignal.timeout(45000) });
      const html = await response.text();
      const error = response.status >= 400 || /NEXT_HTTP_ERROR_FALLBACK;404/.test(html);
      results.push({ path, status: response.status, error });
      if (error) console.log(`${response.status} ${path}`);
    } catch (error) { results.push({ path, error: String(error) }); }
  }
}));
await writeFile('artifacts/internal-link-validation.json', JSON.stringify(results, null, 2));
console.log(`Checked ${results.length} internal route links; ${results.filter(row => row.error).length} failures.`);
if (results.some(row => row.error)) process.exitCode = 1;
