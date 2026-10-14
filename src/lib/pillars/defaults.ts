import { PILLARS_LIST } from '@/data/pillars-data';
import { SERVICE_DETAIL_CONTENT } from '@/data/service-detail-content';
import { MATII_AI_PLATFORM, MATII_AI_PRODUCTS, MATII_AI_WORKFLOW } from '@/data/matii-ai-platform';
import type { PillarContent, PillarId } from './schema';
const listings = [
  { index: "01", title: "Enterprise software", href: "/services/enterprise", description: "Connected platforms and business-critical systems, built around your operations.", items: ["Core Banking & Fintech", "Enterprise ERP Systems", "Custom System Architecture", "Secure API & Integrations"] },
  { index: "02", title: "BPO solutions", href: "/services/bpo", description: "Dedicated people and dependable processes that give your team room to grow.", items: ["Customer Experience & CX", "Back-Office Operations", "Data Processing & Annotation", "Dedicated Talent Teams"] },
  { index: "03", title: "AI & data platform", href: "/services/ai", description: "Practical AI and connected data that turn information into informed action.", items: ["Data Warehousing & ETL", "Predictive Analytics & BI", "Custom LLM & AI Agents", "Intelligent Automation"] },
  { index: "04", title: "Managed cloud services", href: "/services/cloud", description: "Reliable infrastructure, smoother releases, and support for what comes next.", items: ["Cloud Migration & Architecture", "24/7 SRE & Monitoring", "DevOps & CI/CD Pipelines", "Security & Compliance Audits"] },
];
const configurations = {
  enterprise: {
    heading: "Connected systems.\nBuilt around your business.",
    description: "Explore the foundations of your enterprise software: financial platforms, business operations, secure integrations, and modernization, shaped around your existing systems.",
    groups: [[0], [1], [2, 3], [4, 5]],
    icons: ["Database", "PanelsTopLeft", "Cable", "Workflow"],
  },
  bpo: {
    heading: "Dedicated people.\nConnected operations.",
    description: "Explore customer support, back-office operations, data services, and dedicated teams. Choose the expertise you need to keep work moving and give your team room to grow.",
    groups: [[0, 5], [1, 3], [2], [4]],
    icons: ["Network", "Workflow", "Database", "PanelsTopLeft"],
  },
  cloud: {
    heading: "Reliable infrastructure.\nRoom to grow.",
    description: "Explore cloud migration, managed operations, delivery automation, and resilience. Build a connected foundation for your applications, with security and cost visibility throughout.",
    groups: [[0], [1], [2, 3], [4, 5]],
    icons: ["Network", "ChartNoAxesCombined", "Workflow", "Database"],
  },
} as const;
const treatments = {
  connect: { icon: "Cable", wide: true, tags: ["Database connectors", "Live pipelines", "CDC"] },
  lakehouse: { icon: "Database", wide: false, tags: ["Open storage", "SQL", "Iceberg"] },
  catalog: { icon: "Search", wide: false, tags: ["Discovery", "Lineage", "Access policies"] },
  analytics: { icon: "ChartNoAxesCombined", wide: true, tags: ["Dashboards", "Natural-language SQL", "Forecasting"] },
  knowledge: { icon: "Network", wide: true, tags: ["Knowledge graphs", "Hybrid search", "RAG"] },
  ml: { icon: "FlaskConical", wide: false, tags: ["Experiments", "Model registry", "Drift detection"] },
  models: { icon: "Cpu", wide: false, tags: ["AI gateway", "Model routing", "Usage metering"] },
  agents: { icon: "Workflow", wide: false, tags: ["AI assistants", "Tool calling", "Human approval"] },
  studio: { icon: "PanelsTopLeft", wide: false, tags: ["Notebooks", "Collaboration", "Deployments"] },
} as const;
export function getDefaultPillarContent(id: PillarId): PillarContent {
 const pillar = PILLARS_LIST.find(p => p.id === id)!;
 const detail = SERVICE_DETAIL_CONTENT[id];
 const listing = listings.find(s => s.href.endsWith('/' + id))!;
 const config = id === 'ai' ? null : configurations[id];
 const products: PillarContent['products'] = id === 'ai' ? MATII_AI_PRODUCTS.map((product, index) => ({
  ...product, ...treatments[product.id as keyof typeof treatments],
  tags: [...treatments[product.id as keyof typeof treatments].tags],
  imageSrc: '/images/products/matii-' + product.id + '.svg',
  demoUrl: 'https://calendly.com/Matiidigitals/30min?utm_source=matii&utm_medium=product-demo&utm_content=' + product.id,
  group: index < 3 ? 'foundation' : index < 6 ? 'insights' : 'development',
 })) : detail.capabilities.map((capability,index) => {
  const sources = config!.groups[index].map(i => pillar.capabilities[i]);
  return {id: id + '-' + (index + 1), name: capability.title, category: pillar.shortTitle, description: capability.description,
   tags: [...new Set(sources.flatMap(s => s.tags ?? []))].slice(0,3), capabilities: sources.map(s => s.title + ': ' + s.description),
   imageSrc: '/images/products/' + id + '-' + (index + 1) + '.svg', icon: config!.icons[index], wide: index === 0 || index === 3,
   demoUrl: 'https://calendly.com/Matiidigitals/30min?utm_source=matii&utm_medium=product-demo&utm_content=' + id + '-' + (index + 1)};
 });
 return {
  name: id === 'ai' ? MATII_AI_PLATFORM.name : pillar.shortTitle,
  listing: {title: listing.title, description: listing.description, items: listing.items},
  headline: id === 'ai' ? MATII_AI_PLATFORM.headline : detail.headline,
  description: id === 'ai' ? MATII_AI_PLATFORM.description : detail.description,
  outcome: detail.outcome, products,
  portfolioHeading: config?.heading ?? 'Nine products.\nOne connected platform.',
  portfolioDescription: config?.description ?? 'Explore every layer: data integration and governance, analytics and machine learning, model serving and AI applications, all brought together in MATII Studio.',
  process: detail.process, faqs: pillar.faqs, techStack: pillar.techStack,
  seo: {title: '', description: '', image: pillar.bgImage},
  ...(id === 'ai' ? {overview: {visible: false, positioning: MATII_AI_PLATFORM.positioning,
   example: 'Imagine a bank with customer records in PostgreSQL, transactions in another system, documents stored as PDFs, reports in Excel, and internal policies spread across files. MATII Data & AI brings these sources into a connected, governed environment.',
   applications: 'The same platform can support a government institution analyzing census data, a telecom company forecasting demand, or a corporation automating document-heavy processes.',
   workflow: MATII_AI_WORKFLOW}} : {}),
 };
}
