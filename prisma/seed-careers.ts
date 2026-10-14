import { PrismaClient } from "@prisma/client";
import { jobPositions } from "../src/data/careers-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Job Positions from careers-data.ts...");

  for (let i = 0; i < jobPositions.length; i++) {
    const job = jobPositions[i];
    
    // Build rich semantic HTML content
    const content = `<h2>About the Role</h2>
<p>${job.aboutRole}</p>

<h3>Responsibilities</h3>
<ul>
${job.responsibilities.map((r) => `  <li>${r}</li>`).join("\n")}
</ul>

<h3>Requirements & Qualifications</h3>
<ul>
${job.requirements.map((r) => `  <li>${r}</li>`).join("\n")}
</ul>

<h3>What We Offer</h3>
<ul>
${job.benefits.map((b) => `  <li>${b}</li>`).join("\n")}
</ul>`;

    await prisma.jobPosition.upsert({
      where: { slug: job.slug },
      update: {
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary,
        shortDescription: job.shortDescription,
        content,
        order: i + 1,
        isActive: true,
        isFeatured: i === 0,
        seoTitle: `${job.title} | Careers at MATII TECHNOLOGIES`,
        seoDescription: job.shortDescription,
        seoKeywords: `${job.title}, ${job.department}, Tech Jobs, Careers Addis Ababa`,
      },
      create: {
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary,
        shortDescription: job.shortDescription,
        content,
        order: i + 1,
        isActive: true,
        isFeatured: i === 0,
        seoTitle: `${job.title} | Careers at MATII TECHNOLOGIES`,
        seoDescription: job.shortDescription,
        seoKeywords: `${job.title}, ${job.department}, Tech Jobs, Careers Addis Ababa`,
      },
    });

    console.log(`✓ Seeded job: ${job.title} (${job.slug})`);
  }

  const count = await prisma.jobPosition.count();
  console.log(`✅ Finished seeding! Total active jobs: ${count}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding jobs failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
