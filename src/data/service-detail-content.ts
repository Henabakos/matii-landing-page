import type { PillarData } from "./pillars-data";

interface ServiceDetailContent {
  headline: string;
  description: string;
  outcome: string;
  capabilities: { title: string; description: string }[];
  process: { title: string; description: string }[];
}

// Reader-facing summaries; technical source data remains in pillars-data.
export const SERVICE_DETAIL_CONTENT: Record<PillarData["id"], ServiceDetailContent> = {
  enterprise: {
    headline: "Software built around your business.",
    description: "From core banking to everyday operations, we design and build reliable platforms that connect your systems and grow with your business.",
    outcome: "Complex operations. One connected platform.",
    capabilities: [
      { title: "Banking & financial platforms", description: "Connect payments, accounts, settlement, and reporting in systems built for your financial workflows." },
      { title: "Custom business software", description: "Bring inventory, logistics, billing, and resource planning together around the way your team works." },
      { title: "APIs & system integration", description: "Connect applications and data through secure APIs and services that work together." },
      { title: "Legacy modernization", description: "Upgrade existing software in stages, with security, audit trails, and continuity built into the plan." },
    ],
    process: [
      { title: "Understand", description: "Map your workflows, existing systems, and business requirements." },
      { title: "Design", description: "Define the architecture, integrations, and a practical delivery roadmap." },
      { title: "Build & test", description: "Deliver in focused sprints, with testing and feedback at every stage." },
      { title: "Launch & support", description: "Prepare for production, monitor performance, and improve as you grow." },
    ],
  },
  bpo: {
    headline: "Give your team room to grow.",
    description: "Keep your business moving with dedicated support teams, dependable back-office operations, and technology that makes everyday work easier.",
    outcome: "The right people. A smoother operation.",
    capabilities: [
      { title: "Customer & technical support", description: "Support your customers across channels and languages, with coverage shaped around their needs." },
      { title: "Back-office operations", description: "Keep essential administration, reconciliation, and reporting running consistently." },
      { title: "Data processing & annotation", description: "Turn raw information into structured, quality-checked data for your business and AI teams." },
      { title: "Dedicated talent teams", description: "Extend your team with people trained in your tools, workflows, and standards." },
    ],
    process: [
      { title: "Map the work", description: "Understand your workflows and agree on service and quality expectations." },
      { title: "Build your team", description: "Select and train people around your systems and customer experience." },
      { title: "Start together", description: "Shadow your team and transition work gradually with quality checks." },
      { title: "Keep improving", description: "Review performance together and refine the operation as needs change." },
    ],
  },
  cloud: {
    headline: "A stronger foundation for what comes next.",
    description: "Move, manage, and improve your cloud infrastructure with a team focused on reliability, security, and keeping your business running.",
    outcome: "Less infrastructure friction. More momentum.",
    capabilities: [
      { title: "Cloud architecture & migration", description: "Plan your cloud environment and move workloads in manageable, carefully tested stages." },
      { title: "Managed operations", description: "Monitor services, manage incidents, and keep infrastructure maintained with dedicated support." },
      { title: "DevOps & delivery automation", description: "Make releases repeatable with automated pipelines, containers, and infrastructure as code." },
      { title: "Cost, security & resilience", description: "Review spending, strengthen access controls, and prepare backup and recovery plans." },
    ],
    process: [
      { title: "Assess", description: "Review your infrastructure, costs, performance, and security needs." },
      { title: "Plan", description: "Design the target environment and agree on the migration approach." },
      { title: "Migrate & validate", description: "Move workloads progressively and test reliability before switching over." },
      { title: "Manage & improve", description: "Monitor operations and regularly review costs, patches, and performance." },
    ],
  },
  ai: {
    headline: "Put your data to work.",
    description: "Turn scattered information into useful insights and practical AI. We build connected data platforms and intelligent tools around real business needs.",
    outcome: "From information to informed action.",
    capabilities: [
      { title: "AI agents & automation", description: "Automate multi-step tasks with tools connected to your systems and human oversight where it matters." },
      { title: "Knowledge search & custom AI", description: "Help teams find answers in company knowledge, with retrieval and models tailored to your domain." },
      { title: "Connected data platforms", description: "Bring data sources together through reliable pipelines, storage, and quality checks." },
      { title: "Analytics & responsible AI", description: "Build useful dashboards and forecasts, with evaluation, access controls, and data safeguards." },
    ],
    process: [
      { title: "Find the use case", description: "Review your data and choose a problem where AI can make a useful difference." },
      { title: "Prove the approach", description: "Test a focused prototype for accuracy, usefulness, and safety." },
      { title: "Build for production", description: "Connect data pipelines, deploy models, and validate the complete workflow." },
      { title: "Evaluate & improve", description: "Monitor output quality and refine the system as your data and needs evolve." },
    ],
  },
};
