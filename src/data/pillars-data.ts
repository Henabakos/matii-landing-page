export interface PillarSpec {
  label: string;
  value: string;
  description?: string;
}

export interface PillarCapability {
  title: string;
  description: string;
  metrics?: string;
  tags?: string[];
}

export interface PillarArchitectureStep {
  step: string;
  title: string;
  description: string;
  techBadge: string;
}

export interface PillarCaseStudyTeaser {
  client: string;
  industry: string;
  headline: string;
  impactMetrics: string[];
  quote?: string;
}

export interface PillarData {
  id: "enterprise" | "bpo" | "cloud" | "ai";
  slug: string;
  aliases: string[];
  index: string;
  systemCode: string;
  title: string;
  shortTitle: string;
  headline: string;
  subtitle: string;
  tag: string;
  figureName: "EnterpriseSoftwareFigure" | "BpoSolutionsFigure" | "AiDataPlatformFigure" | "ManagedCloudFigure";
  bgImage: string;
  specs: PillarSpec[];
  capabilities: PillarCapability[];
  architectureSteps: PillarArchitectureStep[];
  caseStudy: PillarCaseStudyTeaser;
  techStack: string[];
  lifecycle: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const PILLARS_LIST: PillarData[] = [
  // 01. ENTERPRISE SOFTWARE
  {
    id: "enterprise",
    slug: "enterprise",
    aliases: ["enterprise-software", "software", "core-systems", "enterprise-platforms"],
    index: "01",
    systemCode: "SYS.01 // CORE ARCHITECTURE",
    title: "Enterprise Software Engineering",
    shortTitle: "Enterprise Software",
    headline: "Mission-Critical Core Platforms Built For Zero Downtime & Maximum Scale",
    subtitle:
      "We design, build, and modernize robust banking systems, transactional backbones, and custom enterprise platforms capable of processing millions of concurrent events with provable resilience.",
    tag: "PILLAR.01 // CORE PLATFORMS & FINTECH",
    figureName: "EnterpriseSoftwareFigure",
    bgImage: "/images/enterprise-software.jpg",
    specs: [
      { label: "Throughput", value: "24,500+ tx/s", description: "Validated peak concurrent throughput" },
      { label: "P99 Latency", value: "< 1.2ms", description: "Deterministic sub-millisecond roundtrips" },
      { label: "Consensus", value: "Zero-Lock ACID", description: "Distributed synchronous ledger balance" },
      { label: "Compliance", value: "SOC2 · ISO 27001", description: "PCI-DSS certified security boundaries" },
    ],
    capabilities: [
      {
        title: "Core Banking & Financial Settlement",
        description:
          "High-throughput transactional ledgers, real-time settlement rails, multi-currency wallets, and regulatory reporting systems engineered for tier-1 financial institutions.",
        metrics: "99.999% Financial Ledger Integrity",
        tags: ["Fintech", "Settlement", "Ledgers", "ISO 20022"],
      },
      {
        title: "Enterprise ERP & Operations Backbones",
        description:
          "Bespoke resource management engines that unify supply chains, cross-border logistics, inventory forecasting, and corporate billing into cohesive microservices.",
        metrics: "40% Lower Operational Friction",
        tags: ["ERP", "Logistics", "Billing", "Real-Time"],
      },
      {
        title: "Distributed Microservices & Event Meshes",
        description:
          "Zero-downtime, independently scalable service clusters orchestrated across event-driven message backbones with Kafka, NATS, and gRPC contracts.",
        metrics: "Sub-2ms Service-to-Service P99",
        tags: ["Kafka", "gRPC", "NATS", "Microservices"],
      },
      {
        title: "Zero-Trust API Ingress & Gateways",
        description:
          "Cryptographically verified API perimeter security, automated token validation, mTLS inter-service encryption, and dynamic threat mitigation.",
        metrics: "DDoS Hardened Perimeter",
        tags: ["mTLS", "Zero-Trust", "OAuth2", "Rate Limiting"],
      },
      {
        title: "Legacy Monolith Modernization",
        description:
          "Strangler-fig pattern system rewrites and transactional database migrations ensuring continuous operations with zero user-facing service interruptions.",
        metrics: "Zero Downtime Cutover",
        tags: ["Refactoring", "Database Sharding", "Strangler Pattern"],
      },
      {
        title: "Auditability & Immutable Cryptographic Trails",
        description:
          "Tamper-proof chronological state history logging, append-only verification trees, and automated compliance reporting ready for institutional audits.",
        metrics: "100% Audit Readiness",
        tags: ["Immutable Logs", "SOC 2 Type II", "Cryptographic Signatures"],
      },
    ],
    architectureSteps: [
      {
        step: "01",
        title: "API Ingress & Edge Triage",
        description: "Zero-trust edge gateway enforces cryptographic rate limits, mTLS handshakes, and route segregation before passing requests to internal VPC nodes.",
        techBadge: "Envoy / Cloudflare / Rust Proxy",
      },
      {
        step: "02",
        title: "Event-Driven State Engine",
        description: "Asynchronous CQRS pipeline publishes state mutations to partitioned Kafka logs, enabling high-velocity parallel processing without database row lockouts.",
        techBadge: "Apache Kafka / Go / NATS JetStream",
      },
      {
        step: "03",
        title: "Synchronous Transactional Vault",
        description: "Clustered high-availability relational persistence with multi-AZ read replicas and write-ahead cryptographic audit verifications.",
        techBadge: "PostgreSQL HA / CockroachDB / Redis Cluster",
      },
    ],
    caseStudy: {
      client: "Tier-1 Regional Financial Institution",
      industry: "Fintech & Banking",
      headline: "Scalable settlement architecture processing $180M+ daily transactions without a single dropped packet.",
      impactMetrics: ["24.5k peak tx/s", "0.8ms average latency", "Zero transaction discrepancies over 18 months"],
      quote: "Matii's architectural rigor and zero-tolerance for latency transformed our core transaction infrastructure into a bulletproof competitive moat.",
    },
    techStack: ["Go", "Rust", "Java / Spring Boot", "TypeScript", "PostgreSQL", "Kafka", "Redis", "Kubernetes", "gRPC", "Docker", "OpenTelemetry"],
    lifecycle: [
      { step: "01", title: "Domain Discovery", desc: "Detailed boundary mapping, data-flow audit, and institutional compliance requirements modeling." },
      { step: "02", title: "Architecture Blueprint", desc: "Specification of distributed state engines, latency thresholds, and disaster-recovery topologies." },
      { step: "03", title: "Incremental Sprint Delivery", desc: "Continuous integration, comprehensive unit/integration test suites, and staged canary verification." },
      { step: "04", title: "Production Hardening & SLA", desc: "Chaos engineering, penetration tests, multi-region load testing, and 24/7 reliability monitoring." },
    ],
    faqs: [
      {
        question: "How do you guarantee zero downtime during core platform upgrades?",
        answer: "We utilize blue/green deployments, automated canary routing, and the strangler-fig pattern with backward-compatible database schemas to ensure migrations happen without service disruption.",
      },
      {
        question: "Can Matii's enterprise software integrate with our existing legacy databases?",
        answer: "Yes. We regularly build high-performance change-data-capture (CDC) pipelines and abstraction layers that connect modern microservices with legacy systems like AS/400, Oracle, and mainframes.",
      },
      {
        question: "What compliance standards do your systems adhere to?",
        answer: "Our software engineering standards comply with PCI-DSS Level 1, SOC 2 Type II, ISO 27001, GDPR, and HIPAA data privacy mandates.",
      },
    ],
  },

  // 02. BPO SOLUTIONS
  {
    id: "bpo",
    slug: "bpo",
    aliases: ["bpo-solutions", "business-process", "operations", "outsourcing", "contact-center"],
    index: "02",
    systemCode: "SYS.02 // GLOBAL BPO MESH",
    title: "BPO Solutions & Intelligent Operations",
    shortTitle: "BPO Solutions",
    headline: "Tech-Enabled Business Process Outsourcing & 24/7 Global Specialist Pods",
    subtitle:
      "We combine AI triage turnstiles with highly trained human-in-the-loop operational squads, delivering frictionless customer experiences, accurate data processing, and 24/7 technical back-office execution.",
    tag: "PILLAR.02 // GLOBAL BUSINESS PROCESS",
    figureName: "BpoSolutionsFigure",
    bgImage: "/images/bpo-solutions.jpg",
    specs: [
      { label: "Response SLA", value: "< 45s Contact", description: "Real-time inbound response across channels" },
      { label: "FCR Rate", value: "94.2% Resolution", description: "First Contact Resolution verified benchmark" },
      { label: "CSAT Score", value: "4.9 / 5.0", description: "Consistently audited client satisfaction" },
      { label: "Global Pods", value: "420+ Teams", description: "Multilingual domain specialist coverage" },
    ],
    capabilities: [
      {
        title: "Omnichannel Customer Experience (CX)",
        description:
          "24/7 live chat, voice, email, and social customer support managed by dedicated, brand-trained customer success specialists delivering empathetic and rapid resolutions.",
        metrics: "< 45s Average Speed of Answer",
        tags: ["Live Voice", "Chat", "Omnichannel", "Ticketing"],
      },
      {
        title: "Technical Back-Office Operations",
        description:
          "Complex workflow execution, tier-2 account verifications, KYC/AML identity checks, exception handling, and enterprise claims processing.",
        metrics: "99.8% Process Accuracy",
        tags: ["Back-Office", "KYC / AML", "Data Validation", "Escalations"],
      },
      {
        title: "AI Training Data Processing & Annotation",
        description:
          "High-precision human-in-the-loop data labeling, RLHF prompt evaluation, multilingual translation QA, and visual object segmentation for AI engineering teams.",
        metrics: "Millions of Labeled Tokens / Day",
        tags: ["RLHF", "Data Annotation", "Model QA", "Segmentation"],
      },
      {
        title: "Financial Reconciliation & Auditing Pods",
        description:
          "Meticulous invoice matching, payment disputes handling, ledger balancing, and merchant settlement investigations executing with zero margin for error.",
        metrics: "Zero Unreconciled Variance",
        tags: ["Invoicing", "Disputes", "Settlements", "Audits"],
      },
      {
        title: "Dedicated Talent & Team Augmentation",
        description:
          "Exclusive, full-time specialist squads aligned with your timezone, culture, and toolchain—seamlessly managed with daily telemetry and KPI dashboards.",
        metrics: "Rapid 14-Day Pod Deployment",
        tags: ["Dedicated Squads", "Staff Augmentation", "SLA Guardrails"],
      },
      {
        title: "Multilingual 24/7 Technical Support",
        description:
          "Around-the-clock software troubleshooting, hardware ticketing, developer API support, and bug triage in English, Polish, German, and major global languages.",
        metrics: "24/7/365 Continuous Coverage",
        tags: ["Tech Support", "API Support", "Multilingual", "Bug Triage"],
      },
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Inbound Channel Multiplexing",
        description: "Unified ingestion layer aggregates customer voice, ticketing, email, and social messaging streams into a single synchronized operational queue.",
        techBadge: "Zendesk / Salesforce / Custom Telephony",
      },
      {
        step: "02",
        title: "Intelligent AI Triage & Routing",
        description: "Natural language classifiers categorize intent, evaluate sentiment, and route requests instantly to the optimal tier of specialist squad.",
        techBadge: "NLP Intent Engine / Skill-Based Routing",
      },
      {
        step: "03",
        title: "Human-in-the-Loop Execution",
        description: "Specialists resolve cases backed by real-time knowledge copilots, automated QA scoring, and strict supervisor oversight protocols.",
        techBadge: "Copilot Assist / Real-Time QA Dashboard",
      },
    ],
    caseStudy: {
      client: "Global E-Commerce & Logistics Platform",
      industry: "Retail & Supply Chain",
      headline: "Scaling global customer support from 10k to 140k monthly interactions while raising CSAT from 4.1 to 4.9.",
      impactMetrics: ["94.2% First Contact Resolution", "38s average response time", "62% reduction in escalations"],
      quote: "Matii's BPO teams didn't just answer tickets; they integrated with our engineering team to systematically eliminate recurring customer friction points.",
    },
    techStack: ["Zendesk", "Salesforce Service Cloud", "Intercom", "Jira Service Management", "Genesys", "Label Studio", "Looker", "Python Automation", "Slack / Teams"],
    lifecycle: [
      { step: "01", title: "Workflow Deep-Dive", desc: "Standard Operating Procedure (SOP) mapping, KPI benchmark alignment, and security compliance setup." },
      { step: "02", title: "Pod Recruitment & Training", desc: "Rigorous domain selection, brand tone calibration, and comprehensive sandbox simulation exams." },
      { step: "03", title: "Shadowing & Staged Ramp", desc: "Live operational shadowing alongside your team with dual-sign-off quality gates." },
      { step: "04", title: "Autonomous SLA Delivery", desc: "Full ownership of queue management with real-time KPI dashboards, weekly governance reviews, and continuous QA." },
    ],
    faqs: [
      {
        question: "How do you ensure data security and customer privacy?",
        answer: "All operations are conducted on secure, access-controlled virtual desktop infrastructures with strict DLP (Data Loss Prevention) rules, zero local storage, and full SOC 2 / GDPR compliance.",
      },
      {
        question: "How quickly can a dedicated BPO pod be deployed?",
        answer: "Standard pods can be fully onboarded, trained on your custom SOPs, and operating in production within 14 business days.",
      },
      {
        question: "Can we scale pod headcount up or down based on seasonal demand?",
        answer: "Yes. Our agile operational contracts provide dynamic elasticity, allowing you to scale up for peak seasons and scale down during normalized periods.",
      },
    ],
  },

  // 03. MANAGED CLOUD SERVICES
  {
    id: "cloud",
    slug: "cloud",
    aliases: ["managed-cloud", "cloud-services", "devops", "sre", "infrastructure"],
    index: "03",
    systemCode: "SYS.03 // CLOUD FABRIC & SRE",
    title: "Managed Cloud Services & SRE",
    shortTitle: "Managed Cloud",
    headline: "High-Availability Multi-Cloud Infrastructure & 24/7 Automated SRE Watch",
    subtitle:
      "We design, automate, and manage hybrid and multi-cloud environments with 99.995% uptime SLAs, self-healing Kubernetes clusters, GitOps deployment rails, and continuous cost optimization.",
    tag: "PILLAR.03 // CLOUD INFRASTRUCTURE & SRE",
    figureName: "ManagedCloudFigure",
    bgImage: "/images/ai-automation.png",
    specs: [
      { label: "Availability SLA", value: "99.995%", description: "Guaranteed enterprise uptime SLA" },
      { label: "Auto-Failover", value: "< 180ms", description: "Hot-standby multi-region recovery" },
      { label: "Edge PoPs", value: "280+ Nodes", description: "Global Anycast low-latency network" },
      { label: "SRE Protocol", value: "24/7/365 Watch", description: "Automated incident remediation engine" },
    ],
    capabilities: [
      {
        title: "Multi-Cloud Architecture & Migration",
        description:
          "Seamless architectural design and zero-downtime workload migration across AWS, Google Cloud, and Microsoft Azure tailored for regulatory and sovereignty requirements.",
        metrics: "Zero-Downtime Live Cutover",
        tags: ["AWS", "Google Cloud", "Azure", "Hybrid Cloud"],
      },
      {
        title: "24/7/365 Site Reliability Engineering (SRE)",
        description:
          "Continuous telemetry monitoring, automated anomaly detection, synthetic user health checks, and rapid remediation protocols preventing production outages before they impact users.",
        metrics: "< 5 Min Mean Time to Resolve",
        tags: ["SRE", "Observability", "Prometheus", "Datadog"],
      },
      {
        title: "Kubernetes & Container Orchestration",
        description:
          "Production-grade EKS, GKE, and bare-metal Kubernetes topologies configured with Istio service mesh, auto-scaling horizontal pods, and zero-trust mTLS network policies.",
        metrics: "Sub-Second Autoscaling",
        tags: ["Kubernetes", "EKS / GKE", "Istio", "Docker"],
      },
      {
        title: "GitOps & Automated CI/CD Rails",
        description:
          "Declarative Infrastructure as Code (IaC) with Terraform, automated canary deployment validation, automated rollback triggers, and comprehensive security vulnerability scanning.",
        metrics: "Daily Zero-Risk Deployments",
        tags: ["Terraform", "ArgoCD", "GitHub Actions", "CI/CD"],
      },
      {
        title: "FinOps & Cloud Cost Optimization",
        description:
          "Deep architectural auditing, spot instance optimization, resource right-sizing, and reservation commitments reducing unnecessary cloud expenditures by 30% to 50%.",
        metrics: "Average 38% Cloud Spend Savings",
        tags: ["FinOps", "Cost Reduction", "Spot Fleets", "Right-Sizing"],
      },
      {
        title: "Disaster Recovery & Data Resilience",
        description:
          "Active-active and active-passive multi-region database replication, immutable off-site backups, and automated failover tests delivering near-zero RPO and RTO.",
        metrics: "RPO < 1s · RTO < 180ms",
        tags: ["Disaster Recovery", "Multi-Region", "Hot Standby", "Backups"],
      },
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Global Anycast Edge Layer",
        description: "Global edge routing inspects traffic, mitigates volumetric DDoS attacks, terminates SSL, and directs users to the geographically optimal cloud region.",
        techBadge: "Cloudflare Enterprise / AWS CloudFront",
      },
      {
        step: "02",
        title: "Multi-Region Kubernetes Mesh",
        description: "Hardened Kubernetes clusters with automated horizontal pod autoscalers, service mesh telemetry, and container vulnerability scanning.",
        techBadge: "Kubernetes / Istio / Cilium eBPF",
      },
      {
        step: "03",
        title: "Automated SRE & Telemetry Watch",
        description: "Centralized Prometheus, Grafana, and OpenTelemetry instrumentation triggering automated remediation runs upon metric anomalies.",
        techBadge: "OpenTelemetry / Prometheus / Grafana / PagerDuty",
      },
    ],
    caseStudy: {
      client: "SaaS Enterprise Communication Network",
      industry: "Enterprise Software",
      headline: "Achieving 99.999% availability while reducing monthly AWS infrastructure spend by $42,000.",
      impactMetrics: ["99.999% actual uptime over 2 years", "41% cloud spend reduction", "4-minute average incident resolution"],
      quote: "Matii's SRE team manages our multi-region cloud like clockwork. We went from panic-inducing weekly alerts to total infrastructure calm.",
    },
    techStack: ["AWS", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD", "Docker", "Prometheus", "Grafana", "Datadog", "Cloudflare", "OpenTelemetry", "Ansible"],
    lifecycle: [
      { step: "01", title: "Infrastructure Audit", desc: "Comprehensive vulnerability, performance bottleneck, and cloud cost assessment of existing estates." },
      { step: "02", title: "IaC Topology Definition", desc: "Codifying all compute, network, database, and security policies cleanly into modular Terraform repositories." },
      { step: "03", title: "Staged Workload Migration", desc: "Live shadow routing, dual-write validations, and progressive traffic shifts ensuring zero service degradation." },
      { step: "04", title: "24/7 Managed Operations", desc: "Ongoing SLA governance, continuous cost optimizations, monthly patch audits, and dedicated SRE escalation coverage." },
    ],
    faqs: [
      {
        question: "Do we retain full ownership of our cloud accounts?",
        answer: "Absolutely. All infrastructure is deployed directly into your own AWS, GCP, or Azure organizational accounts. You retain 100% root ownership and access keys.",
      },
      {
        question: "How does your team handle 2am critical production incidents?",
        answer: "Our global SRE team operates follow-the-sun 24/7/365 monitoring. Automated alert triggers page dedicated tier-3 engineers with a guaranteed 5-minute response SLA.",
      },
      {
        question: "Can Matii assist with compliance audits like SOC 2 or HIPAA on cloud environments?",
        answer: "Yes. We configure automated compliance policies, IAM least-privilege roles, audit logs, and encryption at rest/transit to pass SOC 2, ISO 27001, and HIPAA audits.",
      },
    ],
  },

  // 04. AI & DATA PLATFORM
  {
    id: "ai",
    slug: "ai",
    aliases: ["ai-data", "ai-data-platform", "artificial-intelligence", "machine-learning", "data-platform"],
    index: "04",
    systemCode: "SYS.04 // NEURAL PIPELINES",
    title: "AI & Data Platform Engineering",
    shortTitle: "AI & Data Platform",
    headline: "Centralized Streaming Lakehouses, Production RAG & Autonomous AI Agents",
    subtitle:
      "We build enterprise-grade data intelligence backbones, high-performance vector retrieval architectures, and autonomous AI pipelines that turn massive telemetry into decisive, automated business momentum.",
    tag: "PILLAR.04 // ARTIFICIAL INTELLIGENCE & DATA",
    figureName: "AiDataPlatformFigure",
    bgImage: "/images/ai-data-platform.jpg",
    specs: [
      { label: "Ingestion Velocity", value: "1.2M events/s", description: "Real-time streaming lakehouse speed" },
      { label: "Vector Search", value: "1536-dim HNSW", description: "Sub-10ms semantic cosine retrieval" },
      { label: "Inference Speed", value: "4,800 tok/s", description: "Accelerated LLM model serving" },
      { label: "Context Window", value: "128k Tokens", description: "Full-corpus document understanding" },
    ],
    capabilities: [
      {
        title: "Autonomous AI Agents & Multi-Tool Execution",
        description:
          "Production-ready autonomous software agents capable of multi-step reasoning, external tool execution, deterministic validation, and continuous error self-correction.",
        metrics: "96.4% Multi-Step Task Success",
        tags: ["AI Agents", "Tool Calling", "Autonomous Workflows", "LangGraph"],
      },
      {
        title: "Enterprise RAG & Hybrid Vector Search",
        description:
          "Enterprise retrieval-augmented generation architectures fusing dense semantic vectors with BM25 keyword search, reciprocal rank fusion (RRF), and cross-encoder re-ranking.",
        metrics: "< 12ms Semantic Retrieval P95",
        tags: ["Vector DB", "Hybrid Search", "RAG", "Embeddings"],
      },
      {
        title: "Streaming Lakehouse & Real-Time ETL",
        description:
          "Scalable data platforms processing high-velocity telemetry streams into unified Delta Parquet and Iceberg storage with automated schema validation and zero-copy queries.",
        metrics: "1.2M Events / Second Ingestion",
        tags: ["Lakehouse", "Delta Lake", "Apache Spark", "Iceberg"],
      },
      {
        title: "Custom LLM Fine-Tuning & Model Distillation",
        description:
          "Domain-specific fine-tuning (LoRA, QLoRA), instruction alignment, and model distillation converting multi-billion parameter models into lean, cost-effective private endpoints.",
        metrics: "70% Lower Inference Operating Cost",
        tags: ["Fine-Tuning", "LoRA", "Model Distillation", "vLLM"],
      },
      {
        title: "Data Intelligence, BI & Predictive Forecasting",
        description:
          "Automated executive dashboards, cohort churn modeling, demand forecasting, and real-time anomaly detection providing clear quantitative operational guidance.",
        metrics: "Real-Time Telemetry Insights",
        tags: ["Predictive Analytics", "Forecasting", "BI Dashboards", "MLOps"],
      },
      {
        title: "Enterprise AI Security & Private Guardrails",
        description:
          "Strict PII redacting proxies, prompt injection firewalls, hallucination validation gates, and private on-premises GPU deployments preventing proprietary data leaks.",
        metrics: "Zero Enterprise Data Leakage",
        tags: ["Safety Guardrails", "PII Redaction", "Private AI", "Governance"],
      },
    ],
    architectureSteps: [
      {
        step: "01",
        title: "High-Throughput Lakehouse Ingestion",
        description: "Zero-copy streaming pipeline consumes operational telemetry, enriches payloads, and writes immutable Delta Parquet files to centralized object stores.",
        techBadge: "Kafka / Apache Spark / Delta Lake",
      },
      {
        step: "02",
        title: "Neural Vector Index & Hybrid Retrieval",
        description: "Dense 1536-dimensional embeddings indexed via HNSW graphs paired with sparse keyword indices for lightning-fast sub-10ms semantic retrieval.",
        techBadge: "Qdrant / Milvus / Pinecone / Cohere Re-rank",
      },
      {
        step: "03",
        title: "Agent Execution Sandbox & Safety Gates",
        description: "Isolated containerized sandboxes execute LLM agent tool calls safely with automated schema validation, hallucination checks, and PII masking.",
        techBadge: "vLLM / LangChain / Guardrails AI / Python",
      },
    ],
    caseStudy: {
      client: "Enterprise FinTech & Regulatory Advisory",
      industry: "Financial Intelligence",
      headline: "Automating 92% of regulatory compliance document analysis with sub-second semantic retrieval across 4.8M legal filings.",
      impactMetrics: ["4.8M documents indexed", "92% automated triage rate", "18x faster regulatory review velocity"],
      quote: "Matii's AI team deployed a custom RAG architecture that completely transformed how our analysts digest complex regulatory filings.",
    },
    techStack: ["Python", "PyTorch", "vLLM", "Hugging Face", "LangChain", "Qdrant", "Apache Spark", "Delta Lake", "Snowflake", "Docker", "FastAPI"],
    lifecycle: [
      { step: "01", title: "Data Audit & Use-Case Scoping", desc: "Assessment of existing data assets, quality validation, latency budgets, and ROI feasibility modeling." },
      { step: "02", title: "Architecture & POC Sandbox", desc: "Rapid prototyping of vector retrieval accuracy, fine-tuning baselines, and safety guardrail validation." },
      { step: "03", title: "Production Pipeline Hardening", desc: "Streaming ETL ingestion setup, high-throughput model serving deployment, and CI/CD evaluation test harnesses." },
      { step: "04", title: "Continuous MLOps & Telemetry", desc: "Live drift monitoring, hallucination rate tracking, automated dataset retraining loops, and 24/7 SLA support." },
    ],
    faqs: [
      {
        question: "Is our proprietary company data used to train public AI models?",
        answer: "Never. All AI pipelines, RAG systems, and fine-tuned models run inside your private, isolated virtual private cloud (VPC) with strict zero-retention API contracts.",
      },
      {
        question: "Can your AI agents safely interact with our existing internal APIs?",
        answer: "Yes. Our autonomous agent frameworks execute tool calls inside sandboxed environments with strict schema validation, deterministic fallback logic, and human approval gates.",
      },
      {
        question: "How do you evaluate and prevent hallucinations in production RAG systems?",
        answer: "We deploy multi-stage verification pipelines including citation attribution checks, ground-truth hallucination scoring, and cross-encoder re-ranking before delivering answers to users.",
      },
    ],
  },
];

export function getPillarBySlug(slug: string): PillarData | undefined {
  const normalized = slug.toLowerCase().trim();
  return PILLARS_LIST.find(
    (p) => p.slug === normalized || p.id === normalized || p.aliases.includes(normalized)
  );
}

export function getAllPillarSlugs(): string[] {
  return PILLARS_LIST.map((p) => p.slug);
}
