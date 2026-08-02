export interface JobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  shortDescription: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const jobPositions: JobPosition[] = [
  {
    id: "1",
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Addis Ababa, Ethiopia / Remote",
    type: "Full-Time",
    experience: "5+ Years",
    salary: "Competitive + Equity",
    shortDescription:
      "Architect and build high-performance web applications, scalable APIs, and reactive frontend experiences using Next.js, Node.js, and TypeScript.",
    aboutRole:
      "We are looking for a Senior Full-Stack Engineer to lead the architecture and development of client platforms. You will work closely with design and product leads to build robust, production-grade applications that scale seamlessly.",
    responsibilities: [
      "Architect and ship end-to-end full-stack web applications with modern frameworks.",
      "Design clean RESTful and GraphQL API schemas with optimal database queries.",
      "Ensure application speed, responsiveness, security, and accessibility.",
      "Collaborate in agile sprints, participating in technical design reviews and code audits.",
      "Mentor junior software engineers and champion best engineering practices.",
    ],
    requirements: [
      "5+ years of software engineering experience with React, Next.js, Node.js, and TypeScript.",
      "Deep understanding of state management, SSR/SSG patterns, and web performance optimization.",
      "Strong proficiency with SQL (PostgreSQL) and NoSQL databases, ORMs (Prisma/Drizzle), and caching (Redis).",
      "Experience with Docker, CI/CD pipelines, and cloud platforms (AWS, Vercel, GCP).",
      "Excellent communication and problem-solving skills in a fast-paced environment.",
    ],
    benefits: [
      "Competitive compensation package with performance-based bonuses.",
      "Flexible remote / hybrid work arrangements.",
      "Health insurance and wellness allowance.",
      "Annual learning stipend for conferences, courses, and certifications.",
      "High-end workstation hardware (MacBook Pro / Ultra-wide monitors).",
    ],
  },
  {
    id: "2",
    slug: "ai-automation-engineer",
    title: "AI Automation Engineer",
    department: "AI & Data",
    location: "Addis Ababa, Ethiopia / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "Competitive",
    shortDescription:
      "Design and deploy production custom AI workflows, intelligent LLM agents, and automated data pipelines for growth enterprises.",
    aboutRole:
      "As an AI Automation Engineer, you will bridge the gap between state-of-the-art AI models and business automation pipelines. You'll build custom LLM agents, tool integrations, and intelligent automation systems.",
    responsibilities: [
      "Develop and deploy autonomous AI agents using LangChain, LlamaIndex, and OpenAI APIs.",
      "Build scalable serverless microservices to process structured and unstructured document data.",
      "Integrate vector databases (Pinecone, Qdrant, Weaviate) for RAG systems.",
      "Monitor AI pipeline accuracy, latency, and cost efficiency in production.",
    ],
    requirements: [
      "3+ years of experience software development with Python, TypeScript, and AI frameworks.",
      "Hands-on experience with LLM orchestration (LangChain, AutoGen) and fine-tuning techniques.",
      "Strong understanding of API integrations, webhooks, and asynchronous message queues.",
      "Familiarity with vector embeddings, semantic search, and RAG architectures.",
    ],
    benefits: [
      "Competitive salary + performance incentive bonuses.",
      "Remote-first work environment with flexible hours.",
      "Comprehensive medical coverage.",
      "Generous hardware and AI tool subscription budgets.",
    ],
  },
  {
    id: "3",
    slug: "senior-ui-ux-designer",
    title: "Senior UI/UX Product Designer",
    department: "Design",
    location: "Addis Ababa, Ethiopia / Hybrid",
    type: "Full-Time",
    experience: "4+ Years",
    salary: "Competitive",
    shortDescription:
      "Craft premium, intuitive user interfaces, design systems, and visual brand experiences for web & mobile digital products.",
    aboutRole:
      "We are seeking a Senior UI/UX Product Designer with a sharp eye for visual aesthetics, typographic hierarchy, micro-interactions, and conversion-focused design systems.",
    responsibilities: [
      "Design high-fidelity UI wireframes, interactive prototypes, and comprehensive design systems in Figma.",
      "Conduct user research, journey mapping, and usability testing to validate product hypotheses.",
      "Partner directly with frontend engineers to ensure design precision during implementation.",
      "Develop branding guidelines, visual identity assets, and component libraries.",
    ],
    requirements: [
      "4+ years of UI/UX product design experience for SaaS, web apps, and mobile applications.",
      "Mastery of Figma, design token systems, auto-layout, and interactive component libraries.",
      "Strong portfolio demonstrating modern visual aesthetics, dark modes, and micro-animations.",
      "Solid understanding of frontend technical constraints (HTML/CSS/Tailwind).",
    ],
    benefits: [
      "Top-tier compensation matching seniority and portfolio strength.",
      "Flexible work schedule with hybrid option.",
      "Health & dental insurance.",
      "Dedicated conference & workshop budget.",
    ],
  },
  {
    id: "4",
    slug: "mobile-app-developer-react-native",
    title: "Mobile App Developer (React Native / Flutter)",
    department: "Engineering",
    location: "Addis Ababa, Ethiopia / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "Competitive",
    shortDescription:
      "Build cross-platform iOS and Android mobile applications crafted for speed, offline reliability, and delightful user interaction.",
    aboutRole:
      "Join our engineering team to build sleek, high-performing mobile apps for fintech, healthcare, and enterprise automation clients using React Native or Flutter.",
    responsibilities: [
      "Develop cross-platform mobile apps for iOS and Android with 60fps performance.",
      "Integrate native device features, push notifications, and biometric authentication.",
      "Implement offline storage caching and secure local state management.",
      "Manage app store releases (App Store Connect & Google Play Console).",
    ],
    requirements: [
      "3+ years of hands-on experience building mobile apps with React Native or Flutter.",
      "Proficiency with native iOS/Android deployment and CI/CD pipelines.",
      "Experience integrating REST/GraphQL APIs and real-time WebSockets.",
      "Solid understanding of mobile UI guidelines (Material Design & Human Interface).",
    ],
    benefits: [
      "Competitive salary package.",
      "Flexible working model.",
      "Full health insurance coverage.",
      "Latest Apple / Android device budget.",
    ],
  },
];
