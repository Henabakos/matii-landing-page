import { cmsMetadata } from "@/lib/seo-cms";
import { missingMetadata, localizedUrl, publishedLocales } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/services/blog.service";
import { JsonLd, generateArticleSchema, generateBreadcrumbSchema } from "@/components/common/JsonLd";
import { normalizeToHtml, sanitizeContent } from "@/lib/content";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { Metadata } from "next";

type BlogDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return missingMetadata();
  return cmsMetadata(post, "blog", "excerpt", locale, ["title", "excerpt", "content"]);
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const localizedTitle = getLocalizedField(post, "title", locale);
  const localizedExcerpt = getLocalizedField(post, "excerpt", locale);
  const localizedContent = getLocalizedField(post, "content", locale);
  const localizedCategory = getLocalizedField(post, "category", locale);

  const relatedPosts = await getRelatedBlogPosts(post.category, post.slug);
  const siteUrl = siteConfig.url;
  const articleUrl = localizedUrl(`/blog/${post.slug}`, publishedLocales(post.translations, ["title", "excerpt", "content"]).includes(locale as "en") ? locale : "en");

  const articleSchema = generateArticleSchema({
    title: localizedTitle,
    description: localizedExcerpt,
    url: articleUrl,
    image: post.coverImage,
    datePublished: new Date(post.publishedAt).toISOString(),
    authorName: post.authorName,
    siteUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: localizedUrl("/", locale) },
    { name: "Blog", url: localizedUrl("/blog", locale) },
    { name: localizedTitle, url: articleUrl },
  ]);

  // Normalize legacy markdown or structured HTML, then strictly sanitize
  const normalizedHtml = normalizeToHtml(localizedContent || post.content);
  const sanitizedHtml = sanitizeContent(normalizedHtml);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="w-full px-4 md:px-8 py-8 md:py-14 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-[1080px] mx-auto space-y-10">
          {/* Back to Blog Navigation */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-space uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#98ff03] transition-colors active:scale-[0.96]"
            >
              <ArrowLeft className="size-4" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header Card */}
          <div className="relative bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 p-6 md:p-12">
            {/* Corner architectural accents */}
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px]" />

            {/* Category tag */}
            <div className="mb-6">
              <div className="inline-flex gap-2.5 items-center bg-[#f3f4f6] dark:bg-white/5 px-3 py-1 border border-zinc-200 dark:border-white/10 rounded-[2px]">
                <div className="bg-[#98ff03] size-3 shrink-0" />
                <span className="font-space font-semibold text-xs text-black dark:text-white uppercase tracking-wider">
                  {localizedCategory || post.category}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-space font-medium text-3xl sm:text-5xl md:text-[54px] leading-[1.14] text-[#292c2e] dark:text-white tracking-tight mb-6">
              {localizedTitle}
            </h1>

            {/* Excerpt */}
            <p className="font-inter text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mb-10">
              {localizedExcerpt}
            </p>

            {/* Author bar & Date */}
            <div className="pt-6 border-t border-zinc-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {post.authorAvatar ? (
                  <div className="relative size-11 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <p className="font-space font-bold text-sm text-[#292c2e] dark:text-white">
                    {post.authorName}
                  </p>
                  <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400">
                    {post.authorRole || "Author"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-inter text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <span>{post.date}</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="tabular-nums">{post.readTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Cover Hero Image */}
          <div className="relative w-full aspect-video md:aspect-[21/9] border border-zinc-200 dark:border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={post.coverImage}
              alt={localizedTitle}
              fill
              priority
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="object-cover object-center"
            />
          </div>

          {/* Main Article Content Body */}
          <div className="bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 p-6 md:p-14 relative">
            <div
              className="max-w-3xl mx-auto Matii-prose prose prose-zinc prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 ? (
            <div className="pt-12 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                <h3 className="font-space font-bold text-xl text-[#292c2e] dark:text-white uppercase tracking-wider">
                  Related in {localizedCategory || post.category}
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-space uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#98ff03] transition-colors"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 p-4 space-y-3 hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-colors"
                  >
                    <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-white/10">
                      <Image
                        src={related.coverImage}
                        alt={getLocalizedField(related, "title", locale)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-space text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-wider">
                      {getLocalizedField(related, "category", locale)}
                    </span>
                    <h4 className="font-space font-bold text-base text-[#292c2e] dark:text-white leading-snug group-hover:text-zinc-700 dark:group-hover:text-[#98ff03] transition-colors">
                      {getLocalizedField(related, "title", locale)}
                    </h4>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/10 text-xs text-zinc-400 dark:text-zinc-500 font-inter">
                      <span>{related.readTime}</span>
                      <ArrowUpRight className="size-4 group-hover:text-[#98ff03] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
}
