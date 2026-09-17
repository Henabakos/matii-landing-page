import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // 2. Dynamic Projects
    const projects = await db.project.findMany({
      select: { slug: true, updatedAt: true },
    });
    const projectRoutes: MetadataRoute.Sitemap = projects.map((proj) => ({
      url: `${siteUrl}/projects/${proj.slug}`,
      lastModified: proj.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    // 3. Dynamic Blog Posts
    const blogPosts = await db.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // 4. Dynamic News Articles
    const newsArticles = await db.newsArticle.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((item) => ({
      url: `${siteUrl}/news/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...newsRoutes];
  } catch (e) {
    console.error("Error generating sitemap:", e);
    return staticRoutes;
  }
}
