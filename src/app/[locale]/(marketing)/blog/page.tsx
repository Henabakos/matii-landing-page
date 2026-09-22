import BlogPage from "@/components/pages/BlogPage";
import { getAllBlogPosts } from "@/lib/services/blog.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering & Product Insights | Matii Digitals Blog",
  description:
    "Explore actionable playbooks, architecture checklists, and design frameworks from our software engineering team.",
  openGraph: {
    title: "Engineering & Product Insights | Matii Digitals Blog",
    description:
      "Explore actionable playbooks, architecture checklists, and design frameworks from our software engineering team.",
    images: ["/images/about-illustration.png"],
  },
};

export default async function Blog() {
  const posts = await getAllBlogPosts().catch(() => []);
  return <BlogPage initialPosts={posts} />;
}
