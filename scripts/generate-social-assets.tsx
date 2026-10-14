import { mkdir, writeFile } from "node:fs/promises";
import { renderSocialImage } from "../src/lib/social-image";

async function main() {
  await mkdir("public/social", { recursive: true });
  const cards = {
    "matii-default": "Enterprise Software & AI Solutions",
    "matii-home": "Engineering Core Systems. Powering Progress.",
    "matii-services": "Enterprise Software. AI. BPO. Cloud.",
  };
  for (const [name, title] of Object.entries(cards)) {
    const response = await renderSocialImage(title);
    await writeFile(`public/social/${name}.png`, Buffer.from(await response.arrayBuffer()));
    console.log(`Created ${name}.png (1200 × 630)`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
