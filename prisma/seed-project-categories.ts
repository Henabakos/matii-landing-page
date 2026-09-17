import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialCategories = [
  {
    name: "AI Automation",
    slug: "ai-automation",
    description: "Autonomous LLM agents, intelligent workflow orchestration, and custom machine learning pipelines.",
    order: 1,
    isActive: true,
  },
  {
    name: "Healthcare SaaS",
    slug: "healthcare-saas",
    description: "Clinical patient portals, HIPAA-compliant communication tools, and medical data platforms.",
    order: 2,
    isActive: true,
  },
  {
    name: "Cloud Operations",
    slug: "cloud-operations",
    description: "Multi-cloud infrastructure, DevOps reliability, Kubernetes clusters, and automated enterprise workspaces.",
    order: 3,
    isActive: true,
  },
  {
    name: "Fintech & Mobile",
    slug: "fintech-mobile",
    description: "High-performance digital wallets, asset exchange portals, and cross-platform mobile apps.",
    order: 4,
    isActive: true,
  },
];

async function main() {
  console.log("🌱 Seeding Project Categories...");

  for (const cat of initialCategories) {
    await prisma.projectCategory.upsert({
      where: { name: cat.name },
      update: {
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
        isActive: cat.isActive,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
        isActive: cat.isActive,
      },
    });
    console.log(`✓ Seeded category: ${cat.name} (${cat.slug})`);
  }

  const count = await prisma.projectCategory.count();
  console.log(`✅ Finished seeding project categories! Total: ${count}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding categories failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
