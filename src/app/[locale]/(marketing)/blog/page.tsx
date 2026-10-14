import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import BlogPage from "@/components/pages/BlogPage";
import { getAllBlogPosts } from "@/lib/services/blog.service";


export default async function Blog({ params }: LocalePageProps) {
  const posts = await getAllBlogPosts();
  return <><PageStructuredData path="/blog" locale={(await params).locale} /><BlogPage initialPosts={posts} /></>;
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/blog", props);
}
