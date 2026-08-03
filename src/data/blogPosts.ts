export type BlogPost = {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  image: string
  isMainHero?: boolean
  isSideFeatured?: boolean
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'product-discovery-playbook',
    title: 'Product Discovery Playbook for Fast-Moving Teams',
    category: 'Product',
    excerpt:
      'A practical framework for validating ideas quickly, reducing waste, and shipping what users actually need.',
    date: 'July 21, 2026',
    readTime: '7 min read',
    image: '/images/about-illustration.png',
    isMainHero: true,
  },
  {
    id: 'blog-2',
    slug: 'design-systems-at-scale',
    title: 'Design Systems at Scale: What Actually Works',
    category: 'Design',
    excerpt:
      'How we structure tokens, components, and documentation to keep consistency without slowing delivery.',
    date: 'July 15, 2026',
    readTime: '6 min read',
    image: '/images/ai-automation.png',
    isSideFeatured: true,
  },
  {
    id: 'blog-3',
    slug: 'nextjs-performance-checklist',
    title: 'A Next.js Performance Checklist We Use in Production',
    category: 'Engineering',
    excerpt:
      'From image strategy to route-level rendering decisions, this checklist helps keep pages fast and reliable.',
    date: 'July 10, 2026',
    readTime: '8 min read',
    image: '/images/solutions-1.png',
    isSideFeatured: true,
  },
  {
    id: 'blog-4',
    slug: 'shipping-mvp-with-confidence',
    title: 'Shipping an MVP With Confidence in 30 Days',
    category: 'Strategy',
    excerpt:
      'A milestone-by-milestone roadmap for teams that need to launch quickly while managing risk.',
    date: 'July 6, 2026',
    readTime: '5 min read',
    image: '/images/faq-illustration.png',
    isSideFeatured: true,
  },
  {
    id: 'blog-5',
    slug: 'accessibility-as-default',
    title: 'Accessibility as a Default, Not an Afterthought',
    category: 'Design',
    excerpt:
      'Patterns we bake into every UI to improve usability and compliance from day one.',
    date: 'June 29, 2026',
    readTime: '6 min read',
    image: '/images/about-illustration.png',
  },
  {
    id: 'blog-6',
    slug: 'api-contracts-for-better-collaboration',
    title: 'API Contracts That Improve Team Collaboration',
    category: 'Engineering',
    excerpt:
      'How clear contracts between frontend and backend reduce regressions and unblock parallel work.',
    date: 'June 25, 2026',
    readTime: '7 min read',
    image: '/images/ai-automation.png',
  },
  {
    id: 'blog-7',
    slug: 'measuring-what-matters-in-growth',
    title: 'Measuring What Matters in Early-Stage Growth',
    category: 'Growth',
    excerpt:
      'A simple way to choose metrics that inform decisions instead of creating dashboard noise.',
    date: 'June 19, 2026',
    readTime: '5 min read',
    image: '/images/solutions-1.png',
  },
  {
    id: 'blog-8',
    slug: 'content-ops-for-marketing-teams',
    title: 'Content Ops for Lean Marketing Teams',
    category: 'Marketing',
    excerpt:
      'A repeatable publishing workflow that improves quality and cadence without adding overhead.',
    date: 'June 13, 2026',
    readTime: '6 min read',
    image: '/images/faq-illustration.png',
  },
]
