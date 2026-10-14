import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Clear existing data
  await prisma.kpi.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.testimonial.deleteMany();

  // 2. Seed KPIs
  console.log("📊 Seeding KPIs...");
  await prisma.kpi.createMany({
    data: [
      {
        key: "products_designed_built",
        label: "Digital Products",
        value: "50+",
        unit: "+",
        description: "Digital products designed and built across diverse industries.",
        category: "HERO_ABOUT",
        order: 1,
        isActive: true,
      },
      {
        key: "industries_transformed",
        label: "Industries Transformed",
        value: "10+",
        unit: "+",
        description: "Industries transformed through thoughtful design and technology.",
        category: "HERO_ABOUT",
        order: 2,
        isActive: true,
      },
      {
        key: "possibilities_created",
        label: "Digital Possibilities",
        value: "∞",
        unit: "",
        description: "Possibilities created by turning ambitious ideas into digital reality.",
        category: "HERO_ABOUT",
        order: 3,
        isActive: true,
      },
      {
        key: "client_retention_rate",
        label: "Client Retention",
        value: "98.4%",
        unit: "%",
        description: "Average multi-year client retention rate across all enterprise partnerships.",
        category: "GENERAL",
        order: 4,
        isActive: true,
      },
      {
        key: "average_conversion_lift",
        label: "Demo Clicks Lift",
        value: "+13.2x",
        unit: "x",
        description: "Average customer demo growth lift following our digital product revamp.",
        category: "GENERAL",
        order: 5,
        isActive: true,
      },
    ],
  });

  // 3. Seed Trusted Partners
  console.log("🤝 Seeding Trusted Partners...");
  await prisma.partner.createMany({
    data: [
      {
        name: "Acme Tech Systems",
        logoUrl: "/shapes/hero-shape.svg",
        websiteUrl: "https://acme.tech",
        order: 1,
        isActive: true,
      },
      {
        name: "Global Nexus Logistics",
        logoUrl: "/shapes/white-shape.svg",
        websiteUrl: "https://nexuslogistics.global",
        order: 2,
        isActive: true,
      },
      {
        name: "Stripe Ecosystem",
        logoUrl: "/shapes/solution-shape.svg",
        websiteUrl: "https://stripe.com",
        order: 3,
        isActive: true,
      },
      {
        name: "Amazon Web Services",
        logoUrl: "/shapes/faq-shape.svg",
        websiteUrl: "https://aws.amazon.com",
        order: 4,
        isActive: true,
      },
      {
        name: "Apex Financial",
        logoUrl: "/shapes/project-shape.svg",
        websiteUrl: "https://apexfinance.io",
        order: 5,
        isActive: true,
      },
      {
        name: "Veritas AI Labs",
        logoUrl: "/shapes/footer-shape.svg",
        websiteUrl: "https://veritas.ai",
        order: 6,
        isActive: true,
      },
    ],
  });

  // 4. Seed Projects
  console.log("🚀 Seeding Projects...");
  const projectsData = [
    {
      slug: "ragnarok-ai",
      title: "Ragnarok AI Agent Platform",
      subtitle:
        "AI-driven automation system improving engagement and conversion clarity for high-growth SaaS startups.",
      category: "AI Automation",
      year: "2025",
      clientName: "Ragnarok AI",
      clientLogoText: "R",
      liveUrl: "https://calendly.com/Matiidigitals/30min",
      timeline: "3 Months",
      services: "NLP Solutions • AI Automation • AI Integration",
      coverImage: "/images/ai-automation.png",
      challenge: JSON.stringify([
        "Ragnarok needed to position itself as the premium choice for automation startups while entering a crowded AI market filled with similar solutions and competing messaging.",
        "The product had strong positioning potential but lacked clear structure and messaging that communicated its value to both technical users and business decision makers. Ragnarok needed a clear identity to stand out while competing against established automation platforms.",
      ]),
      solution: JSON.stringify([
        "We designed a premium conversion-focused experience that clarified positioning, strengthened messaging, and helped Ragnarok communicate value clearly within the automation market.",
        "We designed a high-conversion layout focused on clarity, authority, and structured storytelling to help users understand value quickly. The new experience aligned visual direction with product strategy, improving engagement and supporting stronger positioning in the AI space.",
      ]),
      gallery: JSON.stringify([
        {
          id: "1",
          title: "AI Workflow & Node Dashboard Design",
          imageUrl: "/images/ai-automation.png",
        },
        {
          id: "2",
          title: "Brand Architecture & Swiss Style System",
          imageUrl: "/images/solutions-1.png",
        },
        {
          id: "3",
          title: "Mobile Application & Real-time Logs UI",
          imageUrl: "/images/faq-illustration.png",
        },
        {
          id: "4",
          title: "High Conversion Landing Page Architecture",
          imageUrl: "/images/about-illustration.png",
        },
      ]),
      metrics: JSON.stringify({
        demoClickGrowth: "13.2",
        higherEngagement: "42",
        pipelineInfluence: "$80K",
        qualifiedLeads: "77",
        stat1Value: "+13.2x",
        stat1Label: "demo clicks",
      }),
      isFeatured: true,
      isSolutionsBuilt: true,
      order: 1,
      seoTitle: "Ragnarok AI Agent Platform | MATII TECHNOLOGIES Case Study",
      seoDescription:
        "How MATII TECHNOLOGIES engineered an AI-driven automation platform yielding +13.2x demo clicks and 42% higher engagement.",
    },
    {
      slug: "liyana-care",
      title: "Liyana Care Patient Portal",
      subtitle:
        "Thoughtful clinical portal designed to eliminate patient communication bottlenecks and simplify healthcare records.",
      category: "Healthcare SaaS",
      year: "2025",
      clientName: "Liyana Health",
      clientLogoText: "L",
      liveUrl: "https://calendly.com/Matiidigitals/30min",
      timeline: "4 Months",
      services: "HIPAA Cloud • UI/UX Architecture • Patient CRM",
      coverImage: "/images/solutions-1.png",
      challenge: JSON.stringify([
        "Medical staff and patients were hindered by fragmented record access, unintuitive appointment booking, and non-compliant messaging tools.",
        "The system required stringent HIPAA security without sacrificing speed or patient accessibility across mobile and desktop devices.",
      ]),
      solution: JSON.stringify([
        "We architected an integrated clinical dashboard and patient mobile portal with encrypted messaging and instant calendar synchronization.",
        "Streamlined navigation and accessibility compliance (WCAG AAA) reduced patient support tickets by 64% in the first quarter.",
      ]),
      gallery: JSON.stringify([
        {
          id: "1",
          title: "Doctor Patient Consultation Flow",
          imageUrl: "/images/solutions-1.png",
        },
        {
          id: "2",
          title: "Prescription and Diagnostics Telehealth View",
          imageUrl: "/images/ai-automation.png",
        },
        {
          id: "3",
          title: "Real-time Clinic Triage Board",
          imageUrl: "/images/about-illustration.png",
        },
        {
          id: "4",
          title: "Patient Mobile Accessibility View",
          imageUrl: "/images/faq-illustration.png",
        },
      ]),
      metrics: JSON.stringify({
        demoClickGrowth: "9.4",
        higherEngagement: "58",
        pipelineInfluence: "$120K",
        qualifiedLeads: "89",
        stat1Value: "40%",
        stat1Label: "fast completion",
        stat2Value: "25%",
        stat2Label: "user engagement",
        stat3Value: "4.8",
        stat3Label: "star rating",
      }),
      isFeatured: true,
      isSolutionsBuilt: true,
      order: 2,
      seoTitle: "Liyana Care Patient Portal | Healthcare SaaS Case Study",
      seoDescription:
        "Case study on Liyana Care: 40% faster clinic completion times and 98.4% user retention through intuitive digital design.",
    },
    {
      slug: "nexis-saas-platform",
      title: "Nexis SaaS Enterprise Platform",
      subtitle:
        "Automated cloud workspace streamlining internal operations across 10+ global enterprise locations.",
      category: "Cloud Operations",
      year: "2025",
      clientName: "Nexis Cloud",
      clientLogoText: "N",
      liveUrl: "https://calendly.com/Matiidigitals/30min",
      timeline: "5 Months",
      services: "Kubernetes • Multi-tenant Cloud • Microservices",
      coverImage: "/images/faq-illustration.png",
      challenge: JSON.stringify([
        "Global teams faced massive latency and configuration drift across distributed multi-region cloud infrastructures.",
        "Legacy consoles caused user errors, slow incident resolution, and high developer onboarding churn.",
      ]),
      solution: JSON.stringify([
        "Engineered an automated cloud workspace with unified observability, automated CI/CD guardrails, and role-based permissions.",
        "Modernized the entire web platform using Next.js and distributed edge caching to deliver sub-100ms global response times.",
      ]),
      gallery: JSON.stringify([
        {
          id: "1",
          title: "Global Cluster Architecture Map",
          imageUrl: "/images/faq-illustration.png",
        },
        {
          id: "2",
          title: "Edge Metrics & Real-time Logs Monitor",
          imageUrl: "/images/solutions-1.png",
        },
        {
          id: "3",
          title: "Workspace Deployment Automations",
          imageUrl: "/images/ai-automation.png",
        },
        {
          id: "4",
          title: "Enterprise Multi-tenant Role Manager",
          imageUrl: "/images/about-illustration.png",
        },
      ]),
      metrics: JSON.stringify({
        demoClickGrowth: "11.1",
        higherEngagement: "60",
        pipelineInfluence: "$210K",
        qualifiedLeads: "94",
        stat1Value: "60%",
        stat1Label: "speed increase",
        stat2Value: "3.5x",
        stat2Label: "scale capacity",
        stat3Value: "4.9",
        stat3Label: "star rating",
      }),
      isFeatured: true,
      isSolutionsBuilt: true,
      order: 3,
      seoTitle: "Nexis SaaS Enterprise Platform | Cloud Architecture Case Study",
      seoDescription:
        "Explore how Nexis achieved +60% speed increase and 3.5x scale capacity with modern Next.js cloud engineering.",
    },
    {
      slug: "apex-mobile-app",
      title: "Apex Mobile Asset Wallet",
      subtitle:
        "High-performance mobile banking and asset wallet built for instant digital transactions.",
      category: "Fintech & Mobile",
      year: "2025",
      clientName: "Apex Finance",
      clientLogoText: "A",
      liveUrl: "https://calendly.com/Matiidigitals/30min",
      timeline: "3.5 Months",
      services: "React Native • Biometrics • Instant Settlement",
      coverImage: "/images/about-illustration.png",
      challenge: JSON.stringify([
        "Users demanded millisecond transaction confirmations, biometric hardware security, and offline support for currency conversions.",
      ]),
      solution: JSON.stringify([
        "Created an ultra-responsive native-feel client with offline ledger caching, zero-friction KYC onboarding, and cryptographic security.",
      ]),
      gallery: JSON.stringify([
        {
          id: "1",
          title: "Biometric Auth & Portfolio View",
          imageUrl: "/images/about-illustration.png",
        },
        {
          id: "2",
          title: "Cross-border Instant Transfer Terminal",
          imageUrl: "/images/ai-automation.png",
        },
        {
          id: "3",
          title: "High-Frequency Asset Exchange Graph",
          imageUrl: "/images/solutions-1.png",
        },
        {
          id: "4",
          title: "Dark Theme Minimalist Hardware Wallet Mode",
          imageUrl: "/images/faq-illustration.png",
        },
      ]),
      metrics: JSON.stringify({
        demoClickGrowth: "15.0",
        higherEngagement: "52",
        pipelineInfluence: "$150K",
        qualifiedLeads: "82",
        stat1Value: "100k+",
        stat1Label: "downloads",
        stat2Value: "99.9%",
        stat2Label: "uptime",
        stat3Value: "5.0",
        stat3Label: "star rating",
      }),
      isFeatured: true,
      isSolutionsBuilt: true,
      order: 4,
      seoTitle: "Apex Mobile Asset Wallet | Fintech Engineering Case Study",
      seoDescription:
        "Over 100k downloads and 99.9% uptime: Apex Mobile Asset Wallet designed and deployed by MATII TECHNOLOGIES.",
    },
    {
      slug: "digital-wallet",
      title: "Digital Asset & Exchange Web App",
      subtitle:
        "Responsive financial trading interface designed for clarity, security, and high performance.",
      category: "Fintech & Mobile",
      year: "2024",
      clientName: "Veloce Trading",
      clientLogoText: "V",
      liveUrl: "https://calendly.com/Matiidigitals/30min",
      timeline: "2.5 Months",
      services: "Web3 Integration • Orderbook UI • High Frequency",
      coverImage: "/images/ai-automation.png",
      challenge: JSON.stringify([
        "Complex trading terminals often intimidate retail investors while lacking the speed required by seasoned institutional traders.",
      ]),
      solution: JSON.stringify([
        "Designed a dual-mode interface offering simple swap workflows for beginners and deep book charting for advanced professionals.",
      ]),
      gallery: JSON.stringify([
        {
          id: "1",
          title: "Orderbook & Candlestick Depth Chart",
          imageUrl: "/images/ai-automation.png",
        },
        {
          id: "2",
          title: "One-Click Liquidity Pool Staking",
          imageUrl: "/images/solutions-1.png",
        },
      ]),
      metrics: JSON.stringify({
        demoClickGrowth: "8.5",
        higherEngagement: "39",
        pipelineInfluence: "$65K",
        qualifiedLeads: "68",
        stat1Value: "+65%",
        stat1Label: "conversion lift",
      }),
      isFeatured: false,
      isSolutionsBuilt: false,
      order: 5,
      seoTitle: "Digital Asset & Exchange Web App | Case Study",
      seoDescription:
        "Conversion lift of +65% achieved with our responsive financial trading interface.",
    },
    {
      slug: "workflow-orchestration",
      title: "Smart Workflow Orchestration",
      subtitle:
        "Custom AI workflow agents automating complex enterprise data pipelines seamlessly.",
      category: "AI Automation",
      year: "2024",
      clientName: "Synapse Systems",
      clientLogoText: "S",
      liveUrl: "https://calendly.com/Matiidigitals/30min",
      timeline: "4 Months",
      services: "Agentic Workflows • Vector DB • LangGraph",
      coverImage: "/images/solutions-1.png",
      challenge: JSON.stringify([
        "Manual invoice reconciliation and multi-tier procurement approvals were costing enterprise teams thousands of hours monthly.",
      ]),
      solution: JSON.stringify([
        "Implemented autonomous multi-agent validation that parses documents, detects discrepancies, and routes exceptions automatically.",
      ]),
      gallery: JSON.stringify([
        {
          id: "1",
          title: "Autonomous Agent DAG Execution Visualizer",
          imageUrl: "/images/solutions-1.png",
        },
        {
          id: "2",
          title: "Vector Retrieval & Knowledge Graph View",
          imageUrl: "/images/faq-illustration.png",
        },
      ]),
      metrics: JSON.stringify({
        demoClickGrowth: "12.0",
        higherEngagement: "48",
        pipelineInfluence: "$95K",
        qualifiedLeads: "75",
        stat1Value: "45%",
        stat1Label: "time saved",
      }),
      isFeatured: false,
      isSolutionsBuilt: false,
      order: 6,
      seoTitle: "Smart Workflow Orchestration | Enterprise AI Case Study",
      seoDescription:
        "45% time saved across enterprise pipelines with custom autonomous AI agent orchestration.",
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }

  // 5. Seed Blog Posts
  console.log("✍️ Seeding Blog Posts...");
  const blogPostsData = [
    {
      slug: "product-discovery-playbook",
      title: "Product Discovery Playbook for Fast-Moving Teams",
      category: "Product",
      excerpt:
        "A practical framework for validating ideas quickly, reducing waste, and shipping what users actually need.",
      content: `### Why Fast Product Discovery Matters

In competitive software markets, velocity without validation is simply building waste faster. High-performing teams do not spend months crafting intricate PRDs before testing hypotheses. Instead, they operate with structured, rapid discovery loops.

### Step 1: Clarify the Problem Before the Feature

Every discovery loop begins by ruthlessly isolating the friction point. Resist the temptation to jump immediately into UI wireframing or backend architecture:

- **What specific friction is the customer experiencing?**
- **How are they addressing this currently (workarounds, spreadsheets, competitor tools)?**
- **What is the measurable business impact of solving this friction?**

### Step 2: Prototype Low-Fidelity First

When validating workflows, build interactive prototypes in code or Figma that can be tested in 48 hours. Gather 5 qualitative user interviews. Patterns appear remarkably fast—usually after the third interview.

### Step 3: Define Clear Success Metrics

Before writing a single production line of code, establish the KPI that proves the experiment succeeded. Whether it is a 25% lift in onboarding completion or a 50% drop in dropoff rates, having clear success parameters prevents endless scope creep.`,
      authorName: "Matthias Vance",
      authorRole: "Head of Product Strategy",
      authorAvatar: "/images/about-illustration.png",
      readTime: "7 min read",
      isMainHero: true,
      isSideFeatured: false,
      isPublished: true,
      coverImage: "/images/about-illustration.png",
      seoTitle: "Product Discovery Playbook for Fast-Moving Teams | Matii Blog",
      seoDescription:
        "A practical framework for validating ideas quickly, reducing waste, and shipping what users actually need.",
      seoKeywords: "product discovery, agile strategy, MVP validation, UX research",
    },
    {
      slug: "design-systems-at-scale",
      title: "Design Systems at Scale: What Actually Works",
      category: "Design",
      excerpt:
        "How we structure tokens, components, and documentation to keep consistency without slowing delivery.",
      content: `### The Problem With Over-Engineered Design Systems

Most design systems fail not because of a lack of components, but because of excessive ceremony. When engineers have to navigate dozens of wrapper abstractions to render a simple button, they start writing ad-hoc styles.

### Semantic Tokens vs. Color Primitives

A resilient design system isolates color values into two distinct layers:

1. **Primitives**: Pure hue definitions like \`gray-900\` or \`brand-lime-500\`.
2. **Semantic Tokens**: Role-based assignments like \`bg-surface\`, \`border-subtle\`, and \`text-primary\`.

By mapping all UI components to semantic tokens, dark mode and rebranding become simple config adjustments rather than sweeping multi-file refactors.

### Optical Alignment Over Geometry

Never rely purely on geometric center alignment. Asymmetric icons, play buttons, and badge labels require optical offsets to appear balanced to human perception.`,
      authorName: "Sarah Jenkins",
      authorRole: "Lead Design Engineer",
      authorAvatar: "/images/ai-automation.png",
      readTime: "6 min read",
      isMainHero: false,
      isSideFeatured: true,
      isPublished: true,
      coverImage: "/images/ai-automation.png",
      seoTitle: "Design Systems at Scale: What Actually Works | Matii Blog",
      seoDescription:
        "How we structure tokens, components, and documentation to keep consistency without slowing delivery.",
      seoKeywords: "design systems, design tokens, UI architecture, frontend scaling",
    },
    {
      slug: "nextjs-performance-checklist",
      title: "A Next.js Performance Checklist We Use in Production",
      category: "Engineering",
      excerpt:
        "From image strategy to route-level rendering decisions, this checklist helps keep pages fast and reliable.",
      content: `### 1. Leverage Server Components First

Keep client bundles minimal by rendering static sections on the server. Reserve \`"use client"\` strictly for leaves of the component tree that need browser events, state, or hooks.

### 2. Next.js Image Optimization

Always specify \`sizes\` on \`next/image\` components using \`fill\`. Without responsive sizes, the browser downloads desktop-resolution assets on mobile viewports:

\`\`\`tsx
<Image
  src="/hero.png"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  priority
/>
\`\`\`

### 3. Tagged Cache & On-Demand Revalidation

Avoid arbitrary time-based revalidation when data updates unpredictably. Tag your backend queries with \`next: { tags: ['kpis', 'projects'] }\` and purge them precisely when modifications occur using \`revalidateTag()\`.`,
      authorName: "Alex Rivera",
      authorRole: "Principal Fullstack Engineer",
      authorAvatar: "/images/solutions-1.png",
      readTime: "8 min read",
      isMainHero: false,
      isSideFeatured: true,
      isPublished: true,
      coverImage: "/images/solutions-1.png",
      seoTitle: "Next.js Production Performance Checklist | Matii Blog",
      seoDescription:
        "Essential performance checklist for Next.js App Router applications in production.",
      seoKeywords: "nextjs performance, react server components, image optimization, web vitals",
    },
    {
      slug: "shipping-mvp-with-confidence",
      title: "Shipping an MVP With Confidence in 30 Days",
      category: "Strategy",
      excerpt:
        "A milestone-by-milestone roadmap for teams that need to launch quickly while managing risk.",
      content: `### The 30-Day Launch Framework

Building an MVP in 30 days requires uncompromising focus on the core value proposition. Here is the exact cadence we use with founders:

- **Week 1: Core User Journey & Tech Spine**: Define the single primary path a user takes to receive value. Establish database schemas, auth, and hosting deployment pipelines.
- **Week 2: Critical Interactions**: Implement the primary interface. Skip secondary settings, billing tiers, or complex edge cases.
- **Week 3: Polish & Error Boundaries**: Add loading skeletons, robust form validation, and transactional emails.
- **Week 4: Beta User Onboarding & Analytics**: Put the software in front of 20 prospective buyers and observe without steering them.`,
      authorName: "Matthias Vance",
      authorRole: "Head of Product Strategy",
      authorAvatar: "/images/faq-illustration.png",
      readTime: "5 min read",
      isMainHero: false,
      isSideFeatured: true,
      isPublished: true,
      coverImage: "/images/faq-illustration.png",
      seoTitle: "Shipping an MVP With Confidence in 30 Days | Matii Blog",
      seoDescription:
        "Milestone-by-milestone roadmap for founders and tech leads shipping ambitious software in 30 days.",
      seoKeywords: "MVP launch, startup roadmap, rapid software development",
    },
    {
      slug: "accessibility-as-default",
      title: "Accessibility as a Default, Not an Afterthought",
      category: "Design",
      excerpt:
        "Patterns we bake into every UI to improve usability and compliance from day one.",
      content: `### Accessibility is Architecture

Accessibility (a11y) is frequently treated as a checklist item right before launch. In reality, retrofitting accessibility into poorly structured DOM trees is tenfold harder than building it correctly from the start.

### Core Rules We Follow:

1. **Semantic HTML**: Use native buttons, links, and headings. A \`<div>\` with an \`onClick\` requires keyboard listeners, focus management, and ARIA attributes that native elements provide for free.
2. **Minimum Hit Targets**: Interactive targets must measure at least \`44x44px\` to guarantee effortless touch screen tapability.
3. **Color Contrast**: Test measured text contrast against the actual rendered background. Aim for WCAG AA (4.5:1 for body text) minimum across all themes.`,
      authorName: "Elena Rostova",
      authorRole: "Accessibility & Design Systems Specialist",
      authorAvatar: "/images/about-illustration.png",
      readTime: "6 min read",
      isMainHero: false,
      isSideFeatured: false,
      isPublished: true,
      coverImage: "/images/about-illustration.png",
      seoTitle: "Accessibility as a Default, Not an Afterthought | Matii Blog",
      seoDescription:
        "Learn how baking accessibility into design systems creates better experiences for every user.",
      seoKeywords: "accessibility, a11y, WCAG compliance, web design standards",
    },
    {
      slug: "api-contracts-for-better-collaboration",
      title: "API Contracts That Improve Team Collaboration",
      category: "Engineering",
      excerpt:
        "How clear contracts between frontend and backend reduce regressions and unblock parallel work.",
      content: `### Stop Guessing API Payloads

When frontend engineers have to guess whether an ID is a number or a UUID string, development grinds to a halt. Establishing strict TypeScript contracts and runtime validation with Zod bridges the gap.

### The Power of End-to-End Type Safety

By declaring schemas that validate both client input and database outputs, you eliminate entire categories of production bugs:

- Runtime input parsing prevents malicious or malformed payloads.
- TypeScript types derived directly from schemas keep frontend components synchronized with backend models.`,
      authorName: "Alex Rivera",
      authorRole: "Principal Fullstack Engineer",
      authorAvatar: "/images/ai-automation.png",
      readTime: "7 min read",
      isMainHero: false,
      isSideFeatured: false,
      isPublished: true,
      coverImage: "/images/ai-automation.png",
      seoTitle: "API Contracts That Improve Team Collaboration | Matii Blog",
      seoDescription:
        "How clear contracts between frontend and backend reduce regressions and unblock parallel work.",
      seoKeywords: "API design, Zod, TypeScript, backend contracts, fullstack architecture",
    },
  ];

  for (const post of blogPostsData) {
    await prisma.blogPost.create({ data: post });
  }

  // 6. Seed News & Press Releases
  console.log("📰 Seeding News Articles...");
  const newsData = [
    {
      slug: "Matii-unveils-autonomous-ai-agent-product-studio",
      title: "Matii Unveils Autonomous AI Agent Product Studio for Enterprise SaaS",
      category: "Product Update",
      excerpt:
        "Announcing our dedicated enterprise engineering practice specializing in autonomous agent workflows and mission-critical multi-model integrations.",
      content: `**SAN FRANCISCO & LONDON** — MATII TECHNOLOGIES today announced the public launch of its Autonomous AI Agent Product Studio, expanding its engineering capabilities to help mid-market and enterprise SaaS organizations integrate production-ready AI agents into their core workflows.

The new practice integrates deeply with existing infrastructure, delivering self-healing data pipelines, automated document understanding, and real-time conversational agents backed by rigorous evaluation benchmarks.

"Organizations are moving rapidly beyond surface-level chatbots," said Matthias Vance, Head of Product Strategy at Matii. "They need resilient, observable agents that take decisive action inside complex databases and workflows without hallucinating."

Early studio client partners have already reported up to 45% reduction in manual data reconciliation and +13.2x engagement improvements across user-facing automation tools.`,
      source: "Matii Press Room",
      sourceUrl: "https://Matiidigitals.com/press",
      coverImage: "/images/ai-automation.png",
      readTime: "3 min read",
      isFeatured: true,
      isPublished: true,
      seoTitle: "Matii Unveils Autonomous AI Agent Product Studio | News",
      seoDescription:
        "Matii announces new enterprise AI practice delivering autonomous agent workflows and resilient integrations.",
    },
    {
      slug: "portfolio-founders-secure-45m-growth-capital",
      title: "Matii Partner Companies Close Over $45M in Growth Capital Throughout Q3",
      category: "Milestone",
      excerpt:
        "Twelve venture-backed startups engineered in collaboration with Matii successfully closed Series A and growth financings this quarter.",
      content: `**NEW YORK** — MATII TECHNOLOGIES celebrated a major milestone today as portfolio startup partners reached an aggregate of over $45 million in institutional capital raised in the third quarter alone.

From healthcare software like Liyana Care to cloud infrastructure systems like Nexis SaaS, Matii’s engineering and product design squads have partnered closely with visionary founders from inception through high-scale adoption.

"Great design paired with uncompromising technical performance gives founders a critical edge during due diligence," remarked Alex Rivera, Principal Engineer at Matii. "Investors immediately recognize the caliber of products built on solid foundations."`,
      source: "VentureBeat & Matii Media",
      sourceUrl: "https://venturebeat.com",
      coverImage: "/images/solutions-1.png",
      readTime: "4 min read",
      isFeatured: false,
      isPublished: true,
      seoTitle: "Matii Partner Companies Secure $45M in Growth Capital | Milestone",
      seoDescription:
        "Startups built in partnership with MATII TECHNOLOGIES close $45M+ in combined growth rounds.",
    },
    {
      slug: "scalable-cloud-cost-reduction-architecture-guide",
      title: "Why Lean Architecture is the Key to Enterprise Cloud Cost Reduction",
      category: "Industry Insights",
      excerpt:
        "New research released by Matii’s systems team reveals how multi-tenant Next.js and edge routing drop infrastructure bills by 40%.",
      content: `Cloud bills have ballooned across enterprise tech. In response, Matii’s engineering research group has published an architectural blueprint for migrating legacy monoliths to modern edge-first frameworks.

Key findings include:
- **Serverless Edge Caching**: Reducing roundtrips to core databases by up to 80% with tagged cache revalidation.
- **Asset Optimization**: Eliminating redundant bundle bloat to drastically reduce egress bandwidth costs.
- **Database Connection Pooling**: Preventing database thread exhaustion using Prisma and lightweight connection proxies.

The complete whitepaper is available to technical leaders and enterprise teams starting today.`,
      source: "Matii Tech Insights",
      sourceUrl: "https://Matiidigitals.com/insights",
      coverImage: "/images/faq-illustration.png",
      readTime: "5 min read",
      isFeatured: false,
      isPublished: true,
      seoTitle: "Enterprise Cloud Cost Reduction Architectural Guide | News",
      seoDescription:
        "Discover architectural blueprints for cutting cloud infrastructure spend through edge caching and modern frameworks.",
    },
    {
      slug: "Matii-honored-for-design-engineering-excellence",
      title: "Matii Recognized in Global Digital Product Design & Engineering Awards",
      category: "Press Release",
      excerpt:
        "Matii received premier honors for bridging Swiss architectural design standards with high-performance web systems.",
      content: `**LONDON** — The International Digital Craft Jury has honored MATII TECHNOLOGIES with top recognition in the 2026 Web Engineering & Visual Excellence category.

The jury commended Matii's distinctive design identity—characterized by crisp geometric typography, subtle architectural corner accents, and lightning-fast page transitions—as a benchmark for modern digital agencies.

"We believe software should feel intentional, precise, and alive," said Sarah Jenkins, Lead Design Engineer. "This award reflects our obsession with every pixel and every millisecond."`,
      source: "Design & Tech Guild",
      sourceUrl: "https://Matiidigitals.com",
      coverImage: "/images/about-illustration.png",
      readTime: "3 min read",
      isFeatured: false,
      isPublished: true,
      seoTitle: "Matii Honored for Design & Engineering Excellence | Awards",
      seoDescription:
        "MATII TECHNOLOGIES receives international recognition for digital product design and software engineering.",
    },
  ];

  // 7. Seed Testimonials
  console.log("💬 Seeding Testimonials...");
  await prisma.testimonial.createMany({
    data: [
      {
        quote:
          "Matii Technologies turned our core banking vision into a high-performance, ultra-resilient platform in record time. Their strategic thinking and engineering execution exceeded every expectation.",
        authorName: "Kiya Kebe",
        authorRole: "CEO & Co-founder at Liyana Care",
        avatarUrl: "/avatars/avatar-1.png",
        rating: 5,
        order: 1,
        isActive: true,
      },
      {
        quote:
          "Working with Matii felt like adding a senior systems engineering team overnight. They simplified complex institutional workflows and delivered a flawless infrastructure.",
        authorName: "Abebe Tadesse",
        authorRole: "Head of Product at TechMove Global",
        avatarUrl: "/avatars/avatar-2.png",
        rating: 5,
        order: 2,
        isActive: true,
      },
      {
        quote:
          "Their AI & data platform transformed our operations. We cut data processing latency by 60% within the first month of deployment.",
        authorName: "Sara Haile",
        authorRole: "Founder at Nexis AI Solutions",
        avatarUrl: "/avatars/avatar-3.png",
        rating: 5,
        order: 3,
        isActive: true,
      },
      {
        quote:
          "From cloud migration to managed SRE operations, Matii Technologies brought unmatched clarity, uptime, and engineering rigor to our entire ecosystem.",
        authorName: "Michael Bekele",
        authorRole: "Managing Director at Apex Capital",
        avatarUrl: "/avatars/avatar-1.png",
        rating: 5,
        order: 4,
        isActive: true,
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
