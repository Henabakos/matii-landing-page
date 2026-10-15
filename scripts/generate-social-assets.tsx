import { mkdir, writeFile } from "node:fs/promises";
import { renderSocialImage } from "../src/lib/social-image";

async function main() {
  await mkdir("public/social", { recursive: true });
  const cards = {
    "matii-default": "Software Development & Outsourcing Comapny",
    "matii-home": "Engineering Core Systems. Powering Progress.",
    "matii-services": "Enterprise Software. AI. BPO. Cloud.",
    "matii-contact": "Contact MATII TECHNOLOGIES",
    "matii-careers": "Join Our Team. Shape the Future.",
    "matii-about": "Engineering Core Systems. Powering Progress.",
    "matii-privacy": "Privacy Policy - MATII TECHNOLOGIES",
    "matii-terms": "Terms of Service - MATII TECHNOLOGIES",
    "matii-faq": "Frequently Asked Questions - MATII TECHNOLOGIES",
    "matii-products": "Explore Our Products - MATII TECHNOLOGIES",
    "matii-solutions": "Discover Our Solutions - MATII TECHNOLOGIES",
    "matii-bpo": "Business Process Outsourcing - MATII TECHNOLOGIES",
    "matii-ai": "Data & AI Solutions - MATII TECHNOLOGIES",
    "matii-cloud": "Cloud Services - MATII TECHNOLOGIES",
    "matii-news": "News & Insights - MATII TECHNOLOGIES",
    "matii-projects": "Our Projects - MATII TECHNOLOGIES",
    "matii-blog": "Blog - MATII TECHNOLOGIES"
  };
  for (const [name, title] of Object.entries(cards)) {
    const response = await renderSocialImage(title);
    await writeFile(`public/social/${name}.png`, Buffer.from(await response.arrayBuffer()));
    console.log(`Created ${name}.png (1200 × 630)`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
