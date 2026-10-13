"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import {
  EnterpriseSoftwareFigure,
  BpoSolutionsFigure,
  AiDataPlatformFigure,
  ManagedCloudFigure,
} from "../../figures/pillar-figures";

const PILLARS_DATA = [
  {
    id: "enterprise",
    index: "01",
    title: "Enterprise Software",
    category: "Mission-Critical Core Systems",
    description:
      "Engineered for high-volume banking institutions, transactional settlement, and enterprise resource operations. Features zero-lock concurrency, immutable audit logging, and cryptographic consensus.",
    figure: <EnterpriseSoftwareFigure />,
    specs: [
      { label: "Throughput", value: "24,500+ tx/sec" },
      { label: "P99 Latency", value: "< 1.2ms" },
      { label: "Consensus", value: "Zero-Lock ACID" },
      { label: "Compliance", value: "PCI-DSS · SOC 2 · ISO 27001" },
    ],
    architecture: [
      "Zero-trust API ingress gateway with rate limiting and automated DDoS mitigation",
      "Event-driven microservice state engine with Kafka/NATS distributed message bus",
      "Multi-AZ synchronous transactional vault with immutable cryptographic audit trail",
    ],
  },
  {
    id: "bpo",
    index: "02",
    title: "BPO Solutions",
    category: "Global Operations & Intelligent CX",
    description:
      "Tech-enabled business process outsourcing integrating intelligent triage turnstiles with 24/7 dedicated human-in-the-loop specialist pods across multiple languages and geographies.",
    figure: <BpoSolutionsFigure />,
    specs: [
      { label: "Response SLA", value: "< 45 Seconds" },
      { label: "FCR Rate", value: "94.2% First Call" },
      { label: "CSAT Score", value: "4.9 / 5.0" },
      { label: "Global Nodes", value: "420+ Specialist Pods" },
    ],
    architecture: [
      "Omnichannel ingress multiplexer routing voice, messaging, and ticket streams",
      "AI triage classifier assigning intent and prioritizing SLA urgencies",
      "Specialized agent pods equipped with automated assist and real-time QA governance",
    ],
  },
  {
    id: "ai-data",
    index: "03",
    title: "AI & Data Platform",
    category: "Neural Inference & Centralized Lakehouse",
    description:
      "Scalable intelligence platform transforming raw operational telemetry into decisive automated action. Integrates high-throughput lakehouse ingestion with 1536-dim vector indices and autonomous agents.",
    figure: <AiDataPlatformFigure />,
    specs: [
      { label: "Ingestion Velocity", value: "1.2M events/sec" },
      { label: "Vector Index", value: "1536-dim HNSW" },
      { label: "Inference Speed", value: "4,800 tok/sec" },
      { label: "Context Window", value: "128k Tokens" },
    ],
    architecture: [
      "Zero-copy streaming lakehouse with automated schema enforcement and delta parquet storage",
      "High-dimensional vector embeddings with sub-10ms cosine proximity retrieval",
      "Autonomous agent execution sandbox with secure multi-tool orchestration",
    ],
  },
  {
    id: "managed-cloud",
    index: "04",
    title: "Managed Cloud Services",
    category: "Multi-Region Mesh & 24/7 SRE Watch",
    description:
      "Enterprise infrastructure management ensuring 99.995% uptime across hybrid and multi-cloud topologies. Automated zero-downtime rolling deployments, edge caching, and self-healing cluster failover.",
    figure: <ManagedCloudFigure />,
    specs: [
      { label: "Availability SLA", value: "99.995% Uptime" },
      { label: "Auto-Failover", value: "< 180ms" },
      { label: "Edge PoPs", value: "280+ Global Locations" },
      { label: "SRE Protocol", value: "24/7 Automated Remediation" },
    ],
    architecture: [
      "Anycast global edge routing mesh balancing load dynamically across regions",
      "Multi-region Kubernetes clusters with hot-standby replicas and instant failover",
      "Automated CI/CD deployment rails with automated canary validation and rollback",
    ],
  },
];

export function PillarsArchitectureInspector() {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const current = PILLARS_DATA[selectedPillar]!;

  return (
    <div className="w-full mt-12 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-[#0c0d0f] p-5 sm:p-8 shadow-2xl transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Interactive System Inspector
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-zinc-900 dark:text-white mt-1">
            4 Core Architectural Pillars
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-200/70 dark:bg-white/5 border border-zinc-300/50 dark:border-white/10">
          {PILLARS_DATA.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => setSelectedPillar(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-tight transition-all ${
                selectedPillar === idx
                  ? "bg-white dark:bg-[#202227] text-zinc-900 dark:text-white shadow-sm font-semibold border border-zinc-300/60 dark:border-white/15"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {pillar.index} · {pillar.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
        {/* Left: Interactive Isometric Stage */}
        <div className="lg:col-span-7">
          <div className="w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0a0a0c] p-2 shadow-inner">
            {current.figure}
          </div>
          <p className="mt-2 text-[11px] font-mono text-zinc-500 text-center">
            * Interactive 3D hairline model: hover elements to trigger state changes and telemetry callouts.
          </p>
        </div>

        {/* Right: Technical Spec & Subsystem Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
              {current.category}
            </span>
            <h4 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-1">
              {current.title}
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 gap-3">
            {current.specs.map((spec) => (
              <div
                key={spec.label}
                className="p-3 rounded-lg border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-white/[0.02]"
              >
                <div className="font-mono text-[10px] uppercase text-zinc-500">
                  {spec.label}
                </div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Key Subsystem Highlights */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/10">
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Subsystem Topology
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              {current.architecture.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dedicated Pillar Page Link Action */}
          <div className="pt-2">
            <Link
              href={
                current.id === "ai-data"
                  ? "/services/ai"
                  : current.id === "managed-cloud"
                  ? "/services/cloud"
                  : `/services/${current.id}`
              }
              className="w-full py-2.5 px-4 rounded-lg bg-[#292c2e] hover:bg-black text-white dark:bg-[#98ff03] dark:hover:bg-[#86e200] dark:text-[#161819] font-space text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Explore {current.title} Detail Page</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillarsArchitectureInspector;
