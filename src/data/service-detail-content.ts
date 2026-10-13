import type { PillarData } from "./pillars-data";

interface ServiceDetailContent {
  name: string;
  headline: string;
  intro: string;
  overview: string;
  outcomes: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  workflow: string[];
  phases: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICE_DETAIL_CONTENT: Record<
  PillarData["id"],
  ServiceDetailContent
> = {
  bpo: {
    name: "Business Process Outsourcing",
    headline: "Your operations.\nOur shared focus.",
    intro:
      "Give your team room to grow. We bring people, processes, and technology together to support your customers and keep everyday operations moving.",
    overview:
      "Great outsourcing feels like an extension of your business. We start with your workflows, customer expectations, and quality standards, then shape a service that fits how you work. Clear ownership and regular reporting keep you in control as your needs evolve.",
    outcomes: [
      {
        title: "More capacity",
        description:
          "Adapt support and operational coverage to changing demand.",
      },
      {
        title: "Consistent quality",
        description:
          "Build repeatable processes with clear standards and review points.",
      },
      {
        title: "Customer confidence",
        description:
          "Keep conversations connected across your support channels.",
      },
      {
        title: "Better visibility",
        description: "Understand performance through agreed service measures.",
      },
    ],
    capabilities: [
      {
        title: "Customer experience & support",
        description:
          "Connected email, chat, and voice support, with escalation paths and a tone of voice aligned to your brand.",
      },
      {
        title: "Back-office operations",
        description:
          "Document processing, record maintenance, order administration, and the daily workflows that keep your business organized.",
      },
      {
        title: "Data processing & annotation",
        description:
          "Structured data preparation and annotation workflows with review guidelines and quality checks for your use case.",
      },
      {
        title: "Finance operations support",
        description:
          "Reconciliation and reporting support with documented responsibilities, access controls, and exception handling.",
      },
      {
        title: "Dedicated operational teams",
        description:
          "Teams trained around your tools and domain, with onboarding, knowledge transfer, and a defined governance rhythm.",
      },
      {
        title: "Technical & multilingual support",
        description:
          "Support coverage planned around your audiences, service hours, technical needs, and available language requirements.",
      },
    ],
    deliverables: [
      "Documented workflows and escalation paths",
      "Role-specific training and knowledge base",
      "Quality review framework",
      "Service reporting and governance plan",
    ],
    workflow: ["Your channels", "Specialist team", "Quality review"],
    phases: [
      "Map your workflows, volumes, service expectations, and data handling requirements.",
      "Define roles, recruit and train the team, and agree quality measures.",
      "Pilot the service alongside your team, review exceptions, and refine the handover.",
      "Review delivery regularly, share performance reporting, and improve the workflow.",
    ],
    faqs: [
      {
        question: "Can we start with a single workflow?",
        answer:
          "Yes. A focused pilot is a useful way to validate the handover, quality standards, and reporting before expanding the scope.",
      },
      {
        question: "How will the team learn our business?",
        answer:
          "We plan onboarding around your processes, tools, brand guidance, and examples of good outcomes. Knowledge transfer and a staged handover are part of the engagement.",
      },
      {
        question: "How are service levels and data access agreed?",
        answer:
          "Coverage, response targets, reporting, access permissions, and data handling responsibilities are agreed during scoping and documented for the engagement.",
      },
    ],
  },
  cloud: {
    name: "Cloud Services",
    headline: "A stronger foundation.\nA clearer path forward.",
    intro:
      "Build infrastructure that supports your next move. We help you design, migrate, automate, and operate cloud environments with reliability and cost in view.",
    overview:
      "Your cloud should make progress easier. Whether you are moving your first workload or improving an established platform, we connect architecture decisions to your business priorities. We work across deployment, observability, security, and recovery so your team can operate with confidence.",
    outcomes: [
      {
        title: "Reliable operations",
        description:
          "Plan for failures with monitoring, recovery, and clear ownership.",
      },
      {
        title: "Safer releases",
        description:
          "Make deployments repeatable with automated delivery workflows.",
      },
      {
        title: "Cost clarity",
        description:
          "Connect resource usage to budgets and optimization opportunities.",
      },
      {
        title: "Room to scale",
        description: "Match infrastructure design to changing workload needs.",
      },
    ],
    capabilities: [
      {
        title: "Cloud architecture & migration",
        description:
          "Assess dependencies, choose a suitable cloud approach, and plan phased migrations with validation and rollback paths.",
      },
      {
        title: "DevOps & delivery automation",
        description:
          "Version-controlled infrastructure and CI/CD pipelines that make changes traceable, testable, and repeatable.",
      },
      {
        title: "Containers & platform engineering",
        description:
          "Container platforms and developer workflows designed around your applications and operational capabilities.",
      },
      {
        title: "Monitoring & reliability",
        description:
          "Actionable telemetry, alerting, incident runbooks, and service objectives aligned with the workloads you operate.",
      },
      {
        title: "Security & access foundations",
        description:
          "Identity controls, secrets management, network boundaries, and configuration reviews integrated into your platform.",
      },
      {
        title: "FinOps & disaster recovery",
        description:
          "Cost analysis, capacity planning, backup policies, and recovery exercises based on agreed business priorities.",
      },
    ],
    deliverables: [
      "Current-state assessment and migration roadmap",
      "Version-controlled infrastructure configuration",
      "Monitoring dashboards and operational runbooks",
      "Recovery and cost management plan",
    ],
    workflow: ["Your workloads", "Cloud platform", "Observability"],
    phases: [
      "Review workloads, dependencies, security needs, operating costs, and recovery priorities.",
      "Design the target platform and agree migration stages, service objectives, and acceptance criteria.",
      "Build the infrastructure and delivery pipelines, then validate workloads in controlled stages.",
      "Transfer runbooks and knowledge, establish monitoring, and review reliability and spend.",
    ],
    faqs: [
      {
        question: "Can you work with our existing cloud provider?",
        answer:
          "We assess your current environment and requirements before recommending changes. The goal is to improve the platform you need, rather than move providers unnecessarily.",
      },
      {
        question: "How do you manage migration risk?",
        answer:
          "We map dependencies, test the migration approach, agree maintenance windows where needed, and define validation and rollback steps before changing production workloads.",
      },
      {
        question: "Does an engagement include ongoing management?",
        answer:
          "It can. Project delivery, platform support, and ongoing operational coverage are scoped separately, with ownership, availability targets, and service hours agreed in advance.",
      },
    ],
  },
  ai: {
    name: "AI & Data Automation",
    headline: "Turn your data\ninto useful action.",
    intro:
      "Move beyond disconnected dashboards and manual tasks. We build data foundations and practical AI workflows that help your people make better decisions and get work done.",
    overview:
      "Useful AI starts with a clear problem and dependable data. We help you identify the right opportunities, connect your information, and build automation with evaluation and human oversight built in. From an internal knowledge assistant to a reporting pipeline, the focus stays on measurable business value.",
    outcomes: [
      {
        title: "Connected information",
        description: "Bring fragmented data into consistent, usable workflows.",
      },
      {
        title: "Less repetitive work",
        description: "Automate routine tasks with clear exception handling.",
      },
      {
        title: "Better decisions",
        description: "Make relevant insights easier to find and act on.",
      },
      {
        title: "Responsible adoption",
        description:
          "Evaluate quality and keep people in control of critical actions.",
      },
    ],
    capabilities: [
      {
        title: "Data pipelines & integration",
        description:
          "Connect operational systems, transform data, and build reliable ingestion workflows with validation and monitoring.",
      },
      {
        title: "Analytics & business intelligence",
        description:
          "Shared reporting models and dashboards that translate your data into useful measures for business teams.",
      },
      {
        title: "Knowledge assistants & search",
        description:
          "Search and retrieval workflows that help teams navigate approved documents and trace answers back to their sources.",
      },
      {
        title: "AI agents & workflow automation",
        description:
          "Task-focused assistants and integrations with permission boundaries, approval steps, and fallback behavior.",
      },
      {
        title: "Prediction & machine learning",
        description:
          "Models for scoped forecasting or classification problems, evaluated against baselines and the available data.",
      },
      {
        title: "Evaluation & data governance",
        description:
          "Quality checks, access policies, model evaluation, and operational monitoring to support maintainable AI systems.",
      },
    ],
    deliverables: [
      "Use-case assessment and evaluation criteria",
      "Documented data flows and integrations",
      "Working pilot with human review controls",
      "Monitoring, handover, and improvement plan",
    ],
    workflow: ["Trusted data", "Intelligence layer", "Human-led action"],
    phases: [
      "Choose a focused use case, review data availability, and define success and risk criteria.",
      "Design the data flows, model approach, access boundaries, and human review points.",
      "Build and evaluate a pilot against representative examples before expanding its scope.",
      "Integrate the workflow, monitor quality and costs, and help your team adopt the system.",
    ],
    faqs: [
      {
        question: "Do we need perfectly organized data to begin?",
        answer:
          "No. We start by assessing what you have and identifying the preparation needed for a useful pilot. Data quality and access gaps become part of the delivery plan.",
      },
      {
        question: "How do you handle sensitive company information?",
        answer:
          "Data access, hosting, retention, and third-party model policies are reviewed during scoping. We agree the appropriate boundaries before connecting sensitive information to a workflow.",
      },
      {
        question: "Can AI automate decisions without human approval?",
        answer:
          "The level of autonomy depends on the task and its risk. We define approval points, permissions, evaluation criteria, and fallback behavior, particularly for actions that affect customers or business records.",
      },
    ],
  },
  enterprise: {
    name: "Enterprise Software",
    headline: "Software built around\nthe way you work.",
    intro:
      "Connect your teams, simplify complex workflows, and build for the long term. We design and deliver enterprise software shaped around your business, not the other way around.",
    overview:
      "When essential systems no longer fit, everyday work becomes harder than it should be. We help you modernize existing platforms or build new ones with a clear understanding of your users, operations, and integrations. Delivery happens in reviewable stages, with maintainability and handover considered from the start.",
    outcomes: [
      {
        title: "Connected workflows",
        description:
          "Bring business processes and systems into a cohesive experience.",
      },
      {
        title: "Better usability",
        description:
          "Design around the people who rely on your software every day.",
      },
      {
        title: "Easier evolution",
        description:
          "Create clear interfaces and a maintainable technical foundation.",
      },
      {
        title: "Confident delivery",
        description:
          "Validate the solution in stages with agreed acceptance criteria.",
      },
    ],
    capabilities: [
      {
        title: "Custom business applications",
        description:
          "Purpose-built platforms for the workflows, permissions, and business rules that off-the-shelf tools cannot accommodate.",
      },
      {
        title: "ERP & operational platforms",
        description:
          "Connected tools for inventory, billing, resource planning, and reporting, designed around your operational processes.",
      },
      {
        title: "APIs & systems integration",
        description:
          "Well-defined interfaces that connect existing software and reduce duplicate data entry across your organization.",
      },
      {
        title: "Legacy modernization",
        description:
          "A staged approach to replacing fragile components, improving architecture, and managing transition risk.",
      },
      {
        title: "Transactional & financial systems",
        description:
          "Domain-driven workflows with validation, traceable records, and access controls tailored to your requirements.",
      },
      {
        title: "Quality & long-term support",
        description:
          "Testing, documentation, release practices, and support planning that help your team operate and evolve the product.",
      },
    ],
    deliverables: [
      "Product requirements and solution architecture",
      "Reviewable releases and acceptance checks",
      "Integration and operational documentation",
      "Team handover and support roadmap",
    ],
    workflow: ["Your business", "Connected platform", "Everyday users"],
    phases: [
      "Understand your users, business rules, existing systems, and the outcomes that matter.",
      "Define the solution architecture, user journeys, integrations, and a prioritized delivery plan.",
      "Build in reviewable increments with demonstrations, tests, and acceptance checks.",
      "Prepare the rollout, document operations, transfer knowledge, and agree ongoing support.",
    ],
    faqs: [
      {
        question: "Should we modernize our existing system or build a new one?",
        answer:
          "We assess the current system, its constraints, and your business needs first. The recommendation may be a targeted improvement, a phased replacement, or a new platform.",
      },
      {
        question: "Can the software integrate with tools we already use?",
        answer:
          "Integration requirements are part of discovery. We review available APIs, data formats, access permissions, and vendor constraints before agreeing the approach.",
      },
      {
        question: "What happens after the software is delivered?",
        answer:
          "Documentation, operational handover, and training are planned into delivery. We can also agree a separate support and improvement engagement based on your team's needs.",
      },
    ],
  },
};
