export interface MegaMenuItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
  translations?: Record<string, { title?: string; badge?: string; description?: string }>;
}

export interface MegaMenuGroup {
  title: string;
  href?: string;
  iconName?: string;
  items: MegaMenuItem[];
  translations?: Record<string, { title?: string }>;
}

export interface MegaMenuCategory {
  id: string;
  title: string;
  iconName: string;
  groups: MegaMenuGroup[];
  translations?: Record<string, { title?: string }>;
}

export interface MegaMenuFooter {
  label: string;
  href: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MegaMenuConfig {
  id?: string;
  key: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  categories: MegaMenuCategory[];
  footer?: MegaMenuFooter;
  translations?: Record<string, { label?: string; footerLabel?: string; footerCtaLabel?: string }>;
}

export const defaultNavMenus: MegaMenuConfig[] = [
  // 1. SERVICES
  {
    key: "services",
    label: "Services",
    href: "/services",
    order: 1,
    isActive: true,
    footer: {
      label: "HOW WE WORK WITH PRODUCT TEAMS →",
      href: "/services",
      ctaLabel: "EXPLORE ALL SERVICES →",
      ctaHref: "/services",
    },
    categories: [
      {
        id: "ai",
        title: "Artificial Intelligence",
        iconName: "Brain",
        groups: [
          {
            title: "Generative AI & LLMs",
            href: "/services",
            iconName: "Bot",
            items: [
              { title: "Custom LLM Engineering", href: "/services#ai" },
              { title: "Enterprise AI Chatbots", href: "/services#ai" },
              { title: "OpenAI & Anthropic Integration", href: "/services#ai" },
              { title: "RAG Architecture Design", href: "/services#ai" },
            ],
          },
          {
            title: "Data Science & ML Engineering",
            href: "/services",
            iconName: "TrendingUp",
            items: [
              { title: "Predictive Analytics Models", href: "/services#ai" },
              { title: "Data Pipeline Engineering", href: "/services#ai" },
              { title: "NLP & Computer Vision", href: "/services#ai" },
              { title: "Workflow Automation Systems", href: "/services#ai" },
            ],
          },
        ],
      },
      {
        id: "software",
        title: "Software Engineering",
        iconName: "Code2",
        groups: [
          {
            title: "Enterprise Platforms",
            href: "/services",
            iconName: "Building2",
            items: [
              { title: "Core Banking & Fintech", href: "/services#software" },
              { title: "Enterprise ERP Systems", href: "/services#software" },
              { title: "Custom System Architecture", href: "/services#software" },
              { title: "High-Scale Microservices", href: "/services#software" },
            ],
          },
          {
            title: "Modern Web & API Systems",
            href: "/services",
            iconName: "Globe",
            items: [
              { title: "Distributed GraphQL & REST", href: "/services#software" },
              { title: "Real-Time WebSockets Engine", href: "/services#software" },
              { title: "Mission-Critical Backend", href: "/services#software" },
              { title: "Database Performance & Indexing", href: "/services#software" },
            ],
          },
        ],
      },
      {
        id: "cloud",
        title: "Cloud Solutions",
        iconName: "Cloud",
        groups: [
          {
            title: "Cloud Architecture & Migration",
            href: "/services",
            iconName: "Layers",
            items: [
              { title: "AWS & GCP Multi-Cloud", href: "/services#cloud" },
              { title: "Kubernetes & Containerization", href: "/services#cloud" },
              { title: "Serverless Infrastructure", href: "/services#cloud" },
              { title: "Zero-Trust Security Arch", href: "/services#cloud" },
            ],
          },
          {
            title: "DevOps & SRE Reliability",
            href: "/services",
            iconName: "Server",
            items: [
              { title: "24/7 SRE Monitoring", href: "/services#cloud" },
              { title: "Automated CI/CD Pipelines", href: "/services#cloud" },
              { title: "High-Availability Disaster Recovery", href: "/services#cloud" },
              { title: "Infrastructure as Code (Terraform)", href: "/services#cloud" },
            ],
          },
        ],
      },
      {
        id: "team",
        title: "Team Engagement",
        iconName: "Users2",
        groups: [
          {
            title: "Dedicated Engineering Teams",
            href: "/services",
            iconName: "Briefcase",
            items: [
              { title: "Embedded Senior Squads", href: "/services#teams" },
              { title: "Full-Stack Team Extension", href: "/services#teams" },
              { title: "Technical Leadership Pods", href: "/services#teams" },
              { title: "Agile Delivery Acceleration", href: "/services#teams" },
            ],
          },
          {
            title: "Tech-Enabled BPO",
            href: "/services",
            iconName: "Activity",
            items: [
              { title: "Customer Experience (CX)", href: "/services#teams" },
              { title: "Data Annotation for AI Models", href: "/services#teams" },
              { title: "Back-Office Operations", href: "/services#teams" },
              { title: "Multilingual Support Hubs", href: "/services#teams" },
            ],
          },
        ],
      },
      {
        id: "modernization",
        title: "Modernization & Support",
        iconName: "RefreshCw",
        groups: [
          {
            title: "Legacy Transformation",
            href: "/services",
            iconName: "Terminal",
            items: [
              { title: "Monolith to Microservices", href: "/services#support" },
              { title: "Codebase Refactoring", href: "/services#support" },
              { title: "Technical Debt Audits", href: "/services#support" },
              { title: "Database Modernization", href: "/services#support" },
            ],
          },
          {
            title: "Enterprise SLA & Security",
            href: "/services",
            iconName: "ShieldCheck",
            items: [
              { title: "24/7 Incident Response", href: "/services#support" },
              { title: "Compliance & Security Audits", href: "/services#support" },
              { title: "99.99% Performance SLAs", href: "/services#support" },
              { title: "Continuous Maintenance", href: "/services#support" },
            ],
          },
        ],
      },
    ],
  },

  // 2. PROJECTS
  {
    key: "projects",
    label: "Projects",
    href: "/projects",
    order: 2,
    isActive: true,
    footer: {
      label: "FEATURED ARCHITECTURES & CLIENT CASE STUDIES →",
      href: "/projects",
      ctaLabel: "VIEW ALL PROJECTS (12+) →",
      ctaHref: "/projects",
    },
    categories: [
      {
        id: "enterprise",
        title: "Enterprise Systems",
        iconName: "Building2",
        groups: [
          {
            title: "Institutional Core Platforms",
            href: "/projects",
            iconName: "Server",
            items: [
              { title: "Core Banking & Fintech Platform", href: "/projects" },
              { title: "Enterprise ERP Architecture", href: "/projects" },
              { title: "Nexis Global SaaS Platform", href: "/projects/nexis-saas-platform" },
              { title: "Institutional Settlement Engine", href: "/projects" },
            ],
          },
          {
            title: "High-Throughput Operations",
            href: "/projects",
            iconName: "Activity",
            items: [
              { title: "Distributed Enterprise Mesh", href: "/projects" },
              { title: "Legacy Core Modernization", href: "/projects" },
              { title: "Multi-Tenant SaaS Workspace", href: "/projects/nexis-saas-platform" },
              { title: "Global Supply Chain Automation", href: "/projects" },
            ],
          },
        ],
      },
      {
        id: "cloud",
        title: "Cloud Solutions",
        iconName: "Cloud",
        groups: [
          {
            title: "Distributed Cloud Infrastructure",
            href: "/projects",
            iconName: "Layers",
            items: [
              { title: "Multi-Region Cloud Operations", href: "/projects/nexis-saas-platform" },
              { title: "Kubernetes HA Cluster Mesh", href: "/projects" },
              { title: "Zero-Downtime Migration", href: "/projects" },
              { title: "Serverless Event Processing", href: "/projects" },
            ],
          },
          {
            title: "DevOps & Cloud Reliability",
            href: "/projects",
            iconName: "ShieldCheck",
            items: [
              { title: "Automated GitOps Pipelines", href: "/projects" },
              { title: "99.99% SLA Cloud Infrastructure", href: "/projects" },
              { title: "Zero-Trust Cloud Perimeter", href: "/projects" },
              { title: "Disaster Recovery Architecture", href: "/projects" },
            ],
          },
        ],
      },
      {
        id: "ai",
        title: "AI & Automation",
        iconName: "Bot",
        groups: [
          {
            title: "Intelligent Agent Systems",
            href: "/projects",
            iconName: "Cpu",
            items: [
              { title: "Ragnarok AI Agent Platform", href: "/projects/ragnarok-ai" },
              { title: "Smart Workflow Orchestration", href: "/projects/workflow-orchestration" },
              { title: "Autonomous Customer Support Agents", href: "/projects/ragnarok-ai" },
              { title: "Enterprise Knowledge Graph RAG", href: "/projects" },
            ],
          },
          {
            title: "Machine Learning at Scale",
            href: "/projects",
            iconName: "TrendingUp",
            items: [
              { title: "Predictive Analytics Models", href: "/projects" },
              { title: "Neural NLP & Computer Vision", href: "/projects" },
              { title: "Real-Time Fraud Detection Engine", href: "/projects" },
              { title: "Enterprise LLM Fine-Tuning", href: "/projects" },
            ],
          },
        ],
      },
      {
        id: "fintech",
        title: "Fintech & Banking",
        iconName: "CreditCard",
        groups: [
          {
            title: "Digital Banking & Wallets",
            href: "/projects",
            iconName: "Zap",
            items: [
              { title: "Apex Mobile Asset Wallet", href: "/projects/apex-mobile-app" },
              { title: "Digital Asset & Exchange Web App", href: "/projects/digital-wallet" },
              { title: "Cross-Border Payment Rails", href: "/projects" },
              { title: "Micro-Lending Risk Engine", href: "/projects" },
            ],
          },
          {
            title: "Fintech Security & Compliance",
            href: "/projects",
            iconName: "ShieldCheck",
            items: [
              { title: "PCI-DSS Tokenization Vault", href: "/projects" },
              { title: "Real-Time Fraud Prevention", href: "/projects" },
              { title: "Biometric Auth Protocol", href: "/projects/apex-mobile-app" },
              { title: "Automated AML Verification", href: "/projects" },
            ],
          },
        ],
      },
      {
        id: "healthcare",
        title: "Healthcare SaaS",
        iconName: "HeartPulse",
        groups: [
          {
            title: "Clinical Systems & Care",
            href: "/projects",
            iconName: "Activity",
            items: [
              { title: "Liyana Care Patient Portal", href: "/projects/liyana-care" },
              { title: "Telehealth Consultation Hub", href: "/projects" },
              { title: "Electronic Health Records (EHR)", href: "/projects" },
              { title: "Smart Appointment Flow", href: "/projects/liyana-care" },
            ],
          },
          {
            title: "Healthcare Data & Security",
            href: "/projects",
            iconName: "ShieldCheck",
            items: [
              { title: "HIPAA-Compliant Data Exchange", href: "/projects/liyana-care" },
              { title: "Medical Imaging Cloud Archive", href: "/projects" },
              { title: "Remote Patient Monitoring", href: "/projects" },
              { title: "Clinical Audit & Consent Records", href: "/projects" },
            ],
          },
        ],
      },
    ],
  },

  // 3. CAREERS
  {
    key: "careers",
    label: "Careers",
    href: "/careers",
    order: 3,
    isActive: true,
    footer: {
      label: "WE ARE HIRING SENIOR CRAFTSPEOPLE ACROSS AFRICA & GLOBALLY →",
      href: "/careers",
      ctaLabel: "VIEW ALL OPEN ROLES (8) →",
      ctaHref: "/careers",
    },
    categories: [
      {
        id: "engineering",
        title: "Engineering",
        iconName: "Code2",
        groups: [
          {
            title: "Full-Stack & Systems",
            href: "/careers",
            iconName: "Server",
            items: [
              { title: "Senior Full-Stack Engineer", href: "/careers/senior-full-stack-engineer" },
              { title: "Backend Systems Lead", href: "/careers" },
              { title: "Distributed Systems Architect", href: "/careers" },
              { title: "Core API Platform Specialist", href: "/careers" },
            ],
          },
          {
            title: "Cloud, DevOps & Mobile",
            href: "/careers",
            iconName: "Terminal",
            items: [
              { title: "DevOps & Cloud Architect", href: "/careers/devops-cloud-architect" },
              { title: "Frontend Performance Specialist", href: "/careers" },
              { title: "Security & DevSecOps Lead", href: "/careers" },
              { title: "Mobile Application Engineer", href: "/careers" },
            ],
          },
        ],
      },
      {
        id: "ai-data",
        title: "AI & Data Science",
        iconName: "Brain",
        groups: [
          {
            title: "Artificial Intelligence",
            href: "/careers",
            iconName: "Bot",
            items: [
              { title: "AI Automation Engineer", href: "/careers/ai-automation-engineer" },
              { title: "Senior Machine Learning Scientist", href: "/careers" },
              { title: "LLM & Prompt Systems Lead", href: "/careers" },
              { title: "Autonomous Agent Architect", href: "/careers" },
            ],
          },
          {
            title: "Data Infrastructure",
            href: "/careers",
            iconName: "Cpu",
            items: [
              { title: "Data Platform Engineer", href: "/careers" },
              { title: "MLOps Pipeline Specialist", href: "/careers" },
              { title: "Big Data ETL Architect", href: "/careers" },
              { title: "Data Governance Analyst", href: "/careers" },
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Product & Design",
        iconName: "Palette",
        groups: [
          {
            title: "Interface & Experience",
            href: "/careers",
            iconName: "Layers",
            items: [
              { title: "Senior Product Designer (UI/UX)", href: "/careers/senior-product-designer" },
              { title: "Design Systems Architect", href: "/careers" },
              { title: "Interaction & Matii Designer", href: "/careers" },
              { title: "UX Researcher & Strategist", href: "/careers" },
            ],
          },
          {
            title: "Product Management",
            href: "/careers",
            iconName: "Compass",
            items: [
              { title: "Technical Product Manager", href: "/careers" },
              { title: "Agile Delivery Pod Lead", href: "/careers" },
              { title: "Design-to-Code Specialist", href: "/careers" },
              { title: "Technical Writer & DevRel", href: "/careers" },
            ],
          },
        ],
      },
      {
        id: "fellowships",
        title: "Fellowships & Talent Pool",
        iconName: "GraduationCap",
        groups: [
          {
            title: "Early Career Fellowships",
            href: "/careers/internships",
            iconName: "GraduationCap",
            items: [
              { title: "Fellowship Overview & Tracks", href: "/careers/internships" },
              { title: "Fullstack Engineering Fellowship", href: "/careers/internships#apply" },
              { title: "AI & Machine Learning Track", href: "/careers/internships#apply" },
              { title: "Product & UI/UX Design Track", href: "/careers/internships#apply" },
            ],
          },
          {
            title: "Global Talent Pool",
            href: "/careers/talent-pool",
            iconName: "Users",
            items: [
              { title: "Priority Talent Network", href: "/careers/talent-pool" },
              { title: "Executive & Specialist Roster", href: "/careers/talent-pool" },
              { title: "Contract & Fractional Opportunities", href: "/careers/talent-pool" },
              { title: "Register Your Profile", href: "/careers/talent-pool#join" },
            ],
          },
        ],
      },
      {
        id: "culture",
        title: "Culture & Benefits",
        iconName: "HeartHandshake",
        groups: [
          {
            title: "Life at Matii",
            href: "/careers",
            iconName: "Award",
            items: [
              { title: "Senior Autonomy & Zero Bureaucracy", href: "/careers" },
              { title: "Africa-Rooted, Global Standards", href: "/careers" },
              { title: "Continuous Learning ($1,500/yr)", href: "/careers" },
              { title: "Flexible Hybrid & Remote Options", href: "/careers" },
            ],
          },
          {
            title: "Perks & Compensation",
            href: "/careers",
            iconName: "Zap",
            items: [
              { title: "Competitive Salary + Equity Options", href: "/careers" },
              { title: "Workstation Hardware (MacBook Pro)", href: "/careers" },
              { title: "Comprehensive Health & Wellness", href: "/careers" },
              { title: "Annual Global Team Retreats", href: "/careers" },
            ],
          },
        ],
      },
    ],
  },

  // 4. RESOURCES (Categorizing News, Blog, Case Studies, Guides)
  {
    key: "resources",
    label: "Resources",
    href: "/blog",
    order: 4,
    isActive: true,
    footer: {
      label: "CURATED ARTICLES, TECHNICAL BLUEPRINTS & CASE STUDIES →",
      href: "/blog",
      ctaLabel: "EXPLORE ALL ARTICLES & GUIDES →",
      ctaHref: "/blog",
    },
    categories: [
      {
        id: "blog",
        title: "Blog & Tech Notes",
        iconName: "BookOpen",
        groups: [
          {
            title: "Engineering Deep Dives",
            href: "/blog",
            iconName: "Code2",
            items: [
              { title: "Scaling Next.js 16 in Production", href: "/blog" },
              { title: "Enterprise RAG with Vector DBs", href: "/blog" },
              { title: "Distributed Event Streaming with Kafka", href: "/blog" },
              { title: "Zero-Trust Cloud Architecture", href: "/blog" },
            ],
          },
          {
            title: "Product & AI Insights",
            href: "/blog",
            iconName: "Sparkles",
            items: [
              { title: "Designing High-Fidelity UI", href: "/blog" },
              { title: "Future of Autonomous AI Agents", href: "/blog" },
              { title: "Micro-Animations & UI Delight", href: "/blog" },
              { title: "Multi-Brand Design Tokens at Scale", href: "/blog" },
            ],
          },
        ],
      },
      {
        id: "news",
        title: "Newsroom & Press",
        iconName: "Newspaper",
        groups: [
          {
            title: "Company Milestones",
            href: "/news",
            iconName: "Activity",
            items: [
              { title: "Matii Expands Global Footprint", href: "/news" },
              { title: "Annual Tech Innovation Report", href: "/news" },
              { title: "Strategic AI Partnerships", href: "/news" },
              { title: "Cloud Center of Excellence", href: "/news" },
            ],
          },
          {
            title: "Press Releases & Media",
            href: "/news",
            iconName: "Terminal",
            items: [
              { title: "Platform Release Notes", href: "/news" },
              { title: "East Africa Tech Talent Initiative", href: "/news" },
              { title: "Executive Interviews & Dispatches", href: "/news" },
              { title: "Media Kit & Press Inquiries", href: "/news" },
            ],
          },
        ],
      },
      {
        id: "case-studies",
        title: "Case Studies",
        iconName: "Briefcase",
        groups: [
          {
            title: "Enterprise Transformation",
            href: "/projects",
            iconName: "Building2",
            items: [
              { title: "Core Banking: 99.99% Uptime", href: "/projects" },
              { title: "Nexis SaaS: +60% Speed Lift", href: "/projects/nexis-saas-platform" },
              { title: "Ragnarok AI: 13.2x Conversion", href: "/projects/ragnarok-ai" },
              { title: "Liyana Care: 98.4% Retention", href: "/projects/liyana-care" },
            ],
          },
          {
            title: "Fintech & Automation",
            href: "/projects",
            iconName: "TrendingUp",
            items: [
              { title: "Apex Mobile: 100k+ Users", href: "/projects/apex-mobile-app" },
              { title: "Digital Asset Exchange", href: "/projects/digital-wallet" },
              { title: "Workflow Orchestration (-45% Time)", href: "/projects/workflow-orchestration" },
              { title: "Cross-Border Settlement Engine", href: "/projects" },
            ],
          },
        ],
      },
      {
        id: "guides",
        title: "Whitepapers & Guides",
        iconName: "Compass",
        groups: [
          {
            title: "Architectural Blueprints",
            href: "/blog",
            iconName: "Layers",
            items: [
              { title: "2026 Enterprise AI Playbook", href: "/blog" },
              { title: "Cloud Migration Architecture", href: "/blog" },
              { title: "Web Performance Benchmark", href: "/blog" },
              { title: "Security & Compliance Guide", href: "/blog" },
            ],
          },
          {
            title: "Developer Resources",
            href: "/blog",
            iconName: "Server",
            items: [
              { title: "Open-Source Production Starters", href: "/blog" },
              { title: "API Schema Design Standards", href: "/blog" },
              { title: "Engineering Principles Handbook", href: "/blog" },
              { title: "Matii UI Token Guidelines", href: "/blog" },
            ],
          },
        ],
      },
    ],
  },
  // 5. ABOUT US (Direct Link)
  {
    key: "about",
    label: "About Us",
    href: "/about",
    order: 5,
    isActive: true,
    categories: [],
  },
  // 6. CONTACT (Direct Link)
  {
    key: "contact",
    label: "Contact",
    href: "/contact",
    order: 6,
    isActive: true,
    categories: [],
  },
];
