import React from "react";
import { getAdminAllBlogPosts } from "@/lib/services/blog.service";
import BlogClientManager from "./BlogClientManager";

export const metadata = {
  title: "Blog Content Studio | Matii CMS",
};

export default async function AdminBlogPage() {
  const posts = await getAdminAllBlogPosts();

  return <BlogClientManager initialPosts={posts} />;
}
