export type TechCategory = 'frontend' | 'backend' | 'design' | 'devops' | 'ai' | 'database';

export interface TechTool {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  badgeBg?: string;
  iconName: string;
  accentColor: string;
  websiteUrl?: string;
  popularFor?: string;
}

export const row1Tools: TechTool[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    iconName: 'react',
    description: 'A JavaScript library for building interactive user interfaces with components.',
    accentColor: '#61DAFB',
    websiteUrl: 'https://react.dev',
    popularFor: 'UI Component Architecture'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    iconName: 'typescript',
    description: 'Strongly typed programming language that builds on JavaScript for robust applications.',
    accentColor: '#3178C6',
    websiteUrl: 'https://www.typescriptlang.org',
    popularFor: 'Static Type Checking'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    iconName: 'nextjs',
    description: 'React framework for server-rendered, static, and hybrid web applications.',
    accentColor: '#000000',
    websiteUrl: 'https://nextjs.org',
    popularFor: 'Full-stack Web Framework'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'frontend',
    iconName: 'tailwindcss',
    description: 'Utility-first CSS framework for rapid UI development and fluid custom styling.',
    accentColor: '#38BDF8',
    websiteUrl: 'https://tailwindcss.com',
    popularFor: 'Utility-first Styling'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    iconName: 'nodejs',
    description: 'Cross-platform JavaScript runtime environment for scalable network server applications.',
    accentColor: '#5FA04E',
    websiteUrl: 'https://nodejs.org',
    popularFor: 'Server-side JavaScript'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    iconName: 'python',
    description: 'High-level programming language renowned for AI, data science, and web backends.',
    accentColor: '#3776AB',
    websiteUrl: 'https://www.python.org',
    popularFor: 'AI & Data Backend'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    iconName: 'figma',
    description: 'Collaborative web-based vector graphics and interface design platform.',
    accentColor: '#F24E1E',
    websiteUrl: 'https://www.figma.com',
    popularFor: 'UI/UX Collaborative Design'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    iconName: 'postgresql',
    description: 'Powerful open-source object-relational database system with high reliability.',
    accentColor: '#336791',
    websiteUrl: 'https://www.postgresql.org',
    popularFor: 'Relational Database Engine'
  }
];

export const row2Tools: TechTool[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'ai',
    iconName: 'gemini',
    description: 'Advanced multimodal AI model family built from the ground up by Google DeepMind.',
    accentColor: '#1BA0F2',
    websiteUrl: 'https://ai.google.dev',
    popularFor: 'Multimodal Intelligence'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    iconName: 'docker',
    description: 'Platform for developing, shipping, and running applications inside isolated containers.',
    accentColor: '#2496ED',
    websiteUrl: 'https://www.docker.com',
    popularFor: 'Containerization Standard'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'devops',
    iconName: 'aws',
    description: 'Comprehensive cloud platform providing scalable compute, storage, and serverless APIs.',
    accentColor: '#FF9900',
    websiteUrl: 'https://aws.amazon.com',
    popularFor: 'Global Cloud Infrastructure'
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    iconName: 'graphql',
    description: 'Query language for APIs that lets client apps request exactly the data they need.',
    accentColor: '#E10098',
    websiteUrl: 'https://graphql.org',
    popularFor: 'Flexible API Data Fetching'
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'ai',
    iconName: 'openai',
    description: 'Cutting-edge artificial intelligence endpoints for GPT-4o, embeddings, and vision.',
    accentColor: '#10A37F',
    websiteUrl: 'https://openai.com',
    popularFor: 'Generative Language Models'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    iconName: 'redis',
    description: 'In-memory data structure store used as a distributed cache, database, and message broker.',
    accentColor: '#DC382D',
    websiteUrl: 'https://redis.io',
    popularFor: 'Ultra-fast Caching'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    iconName: 'vue',
    description: 'Progressive JavaScript framework for building user interfaces with clean syntax.',
    accentColor: '#41B883',
    websiteUrl: 'https://vuejs.org',
    popularFor: 'Intuitive Reactive UI'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'devops',
    iconName: 'vite',
    description: 'Next generation frontend tooling with instant HMR and lightning-fast ES module bundling.',
    accentColor: '#BD34FE',
    websiteUrl: 'https://vite.dev',
    popularFor: 'Ultra-fast Frontend Bundler'
  }
];

export const row3Tools: TechTool[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'devops',
    iconName: 'vercel',
    description: 'Frontend cloud platform designed for instant edge deployment and serverless architecture.',
    accentColor: '#000000',
    websiteUrl: 'https://vercel.com',
    popularFor: 'Automated Frontend Deployments'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    iconName: 'supabase',
    description: 'Open-source Firebase alternative featuring real-time Postgres, auth, and edge functions.',
    accentColor: '#3ECF8E',
    websiteUrl: 'https://supabase.com',
    popularFor: 'Postgres Backend Platform'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'backend',
    iconName: 'stripe',
    description: 'Financial infrastructure for internet payment processing, subscriptions, and billing.',
    accentColor: '#635BFF',
    websiteUrl: 'https://stripe.com',
    popularFor: 'Global Payment Workflows'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'devops',
    iconName: 'git',
    description: 'Distributed version control system designed for tracking source code changes efficiently.',
    accentColor: '#F05032',
    websiteUrl: 'https://git-scm.com',
    popularFor: 'Distributed Version Control'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'devops',
    iconName: 'postman',
    description: 'API platform for building, testing, documenting, and collaborating on web requests.',
    accentColor: '#FF6C37',
    websiteUrl: 'https://www.postman.com',
    popularFor: 'API Testing & Workspaces'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    iconName: 'kubernetes',
    description: 'Production-grade container orchestration for automated deployment and scaling.',
    accentColor: '#326CE5',
    websiteUrl: 'https://kubernetes.io',
    popularFor: 'Container Orchestration'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    iconName: 'mongodb',
    description: 'Document-based NoSQL database designed for high availability and schema flexibility.',
    accentColor: '#47A248',
    websiteUrl: 'https://www.mongodb.com',
    popularFor: 'Document Data Model'
  },
  {
    id: 'golang',
    name: 'Go',
    category: 'backend',
    iconName: 'golang',
    description: 'Open-source programming language supported by Google for fast, concurrent systems.',
    accentColor: '#00ADD8',
    websiteUrl: 'https://go.dev',
    popularFor: 'High-Performance Microservices'
  }
];

export const allTools = [...row1Tools, ...row2Tools, ...row3Tools];
