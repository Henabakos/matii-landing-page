export const MATII_AI_PLATFORM = {
  name: "MATII Data & AI Platform",
  headline: "Put your data to work.",
  description: "MATII Data & AI enables organizations to connect their data, understand it, analyze it, build AI applications on top of it, and put those applications into production under enterprise security and governance.",
  positioning: "A strategic product of MATII TECHNOLOGIES, designed for banks, government institutions, telecoms, large enterprises, and developers.",
};

export const MATII_AI_WORKFLOW = [
  "Connect all your data sources.",
  "Ingest and clean the data.",
  "Build a searchable, governed view of your information.",
  "Analyze operations through dashboards and natural-language queries.",
  "Build AI assistants that answer questions using authorized information.",
  "Develop predictive models and deploy AI services.",
  "Monitor accuracy, cost, access, and performance in production.",
];

export const MATII_AI_PRODUCTS = [
  {
    id: "connect", name: "MATII Connect", category: "Data Integration",
    description: "Connect data from databases, APIs, files, applications, and streaming systems.",
    capabilities: ["PostgreSQL, MySQL, SQL Server, and other database connectors", "REST APIs and webhooks", "CSV, Excel, JSON, Parquet, and document ingestion", "Batch and incremental synchronization", "Change data capture (CDC)", "Streaming ingestion", "Scheduled pipelines and retry handling"],
  },
  {
    id: "lakehouse", name: "MATII Lakehouse", category: "Data Storage & Processing",
    description: "Store and process large volumes of structured and unstructured data.",
    capabilities: ["Data lake and lakehouse storage", "Object storage integration", "Open table formats such as Apache Iceberg", "SQL query engines", "Batch transformation and distributed processing", "Data retention and lifecycle policies", "Separate raw, cleaned, and curated data zones"],
  },
  {
    id: "catalog", name: "MATII Catalog", category: "Metadata & Governance",
    description: "Help organizations discover, understand, trust, and govern their data.",
    capabilities: ["Searchable data catalog", "Business glossary and technical metadata", "Dataset ownership and classification", "Data lineage and dependency tracking", "Data quality rules and profiling", "Sensitive-data discovery", "Access policies, retention, and audit trails"],
  },
  {
    id: "analytics", name: "MATII Analytics", category: "BI & Decision Intelligence",
    description: "Turn governed data into useful business information.",
    capabilities: ["SQL workspace and query editor", "Interactive dashboards and reports", "KPIs and scheduled reporting", "Business metrics and semantic models", "Natural-language-to-SQL assistance", "Forecasting and anomaly detection", "Report sharing with permission controls"],
  },
  {
    id: "knowledge", name: "MATII Knowledge", category: "Knowledge Graph & Search",
    description: "Organize relationships across enterprise data and documents.",
    capabilities: ["Entity and relationship modeling", "Knowledge graph construction", "Full-text and semantic search", "Vector search and hybrid retrieval", "Document chunking and metadata enrichment", "Entity resolution and deduplication", "Retrieval augmented generation (RAG)"],
  },
  {
    id: "ml", name: "MATII ML", category: "Machine Learning Platform",
    description: "Build, train, evaluate, and deploy predictive models.",
    capabilities: ["Experiment tracking", "Dataset and model versioning", "Model registry", "Training job orchestration", "Feature engineering and reusable feature stores", "Batch and real-time inference", "Model evaluation, drift detection, and monitoring"],
  },
  {
    id: "models", name: "MATII Models", category: "Model Serving & AI Gateway",
    description: "Make AI models accessible through consistent, secure APIs.",
    capabilities: ["Hosted open-weight model inference", "External model-provider integrations", "Unified model gateway", "Embedding and reranking APIs", "Model routing and fallback policies", "Rate limits, quotas, and usage metering", "Latency, token usage, and cost tracking"],
  },
  {
    id: "agents", name: "MATII Agents", category: "AI Applications & Automation",
    description: "Build AI assistants and agents that perform useful, permission-controlled work.",
    capabilities: ["Visual agent and workflow builder", "Knowledge-base assistants", "Tool and API integrations", "Multi-step workflow execution", "Human approval checkpoints", "Conversation and execution tracing", "Evaluation, versioning, and deployment"],
  },
  {
    id: "studio", name: "MATII Studio", category: "Unified Workspace",
    description: "Bring data engineers, analysts, data scientists, and AI developers together.",
    capabilities: ["Projects and collaborative workspaces", "Visual pipeline builder", "SQL and notebook environments", "Dataset exploration", "Model and agent deployment", "Shared permissions and secrets integration", "Central monitoring and usage dashboards"],
  },
];
