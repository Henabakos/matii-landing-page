import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ExternalLink } from "lucide-react";
import { getNewsArticleBySlug } from "@/lib/services/news.service";
import { JsonLd, generateNewsSchema, generateBreadcrumbSchema } from "@/components/common/JsonLd";
import { normalizeToHtml, sanitizeContent } from "@/lib/content";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { Metadata } from "next";

type NewsDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const news = await getNewsArticleBySlug(slug);

  if (!news) {
    return {
      title: "Dispatch Not Found | Matii Digitals",
      description: "The requested news dispatch could not be found.",
    };
  }

  const localizedTitle = getLocalizedField(news, "title", locale);
  const localizedExcerpt = getLocalizedField(news, "excerpt", locale);

  const title = news.seoTitle || `${localizedTitle} | Matii Newsroom`;
  const description = news.seoDescription || localizedExcerpt;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const url = `${siteUrl}/${locale !== "en" ? `${locale}/` : ""}news/${news.slug}`;

  return {
    title,
    description,
    keywords: news.seoKeywords ? news.seoKeywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: new Date(news.publishedAt).toISOString(),
      images: [
        {
          url: news.coverImage,
          width: 1200,
          height: 630,
          alt: localizedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [news.coverImage],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const news = await getNewsArticleBySlug(slug);

  if (!news) {
    notFound();
  }

  const localizedTitle = getLocalizedField(news, "title", locale);
  const localizedExcerpt = getLocalizedField(news, "excerpt", locale);
  const localizedContent = getLocalizedField(news, "content", locale);
  const localizedCategory = getLocalizedField(news, "category", locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://Matiidigitals.com";
  const newsUrl = `${siteUrl}/${locale !== "en" ? `${locale}/` : ""}news/${news.slug}`;

  const newsSchema = generateNewsSchema({
    title: localizedTitle,
    description: localizedExcerpt,
    url: newsUrl,
    image: news.coverImage,
    datePublished: new Date(news.publishedAt).toISOString(),
    siteUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Newsroom", url: `${siteUrl}/news` },
    { name: localizedTitle, url: newsUrl },
  ]);

  // Normalize legacy markdown or structured HTML, then strictly sanitize
  const normalizedHtml = normalizeToHtml(localizedContent || news.content);
  const sanitizedHtml = sanitizeContent(normalizedHtml);

  return (
    <>
      <JsonLd data={newsSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="w-full px-4 md:px-8 py-8 md:py-14 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-[1040px] mx-auto space-y-10">
          <div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-space uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#98ff03] transition-colors active:scale-[0.96]"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Newsroom</span>
            </Link>
          </div>

          <div className="relative bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 p-6 md:p-12">
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -top-[3px] -right-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px]" />

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="font-space text-xs font-bold uppercase tracking-wider text-black bg-[#98ff03] px-2.5 py-0.5 rounded-[2px]">
                {localizedCategory || news.category}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-inter">
                Official Dispatch
              </span>
            </div>

            <h1 className="font-space font-medium text-3xl sm:text-5xl md:text-[52px] leading-[1.14] text-[#292c2e] dark:text-white tracking-tight mb-6">
              {localizedTitle}
            </h1>

            <p className="font-inter text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mb-8">
              {localizedExcerpt}
            </p>

            <div className="pt-6 border-t border-zinc-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-inter text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <span>{news.date}</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="tabular-nums">{news.readTime}</span>
                </span>
              </div>

              {news.source ? (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <span>Source: {news.source}</span>
                  {news.sourceUrl ? (
                    <a
                      href={news.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white dark:hover:text-[#98ff03] hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink className="size-3" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative w-full aspect-video md:aspect-[21/9] border border-zinc-200 dark:border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={news.coverImage}
              alt={localizedTitle}
              fill
              priority
              sizes="(max-width: 1040px) 100vw, 1040px"
              className="object-cover object-center"
            />
          </div>

          <div className="bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 p-6 md:p-12 relative">
            <div
              className="max-w-3xl mx-auto Matii-prose prose prose-zinc prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
