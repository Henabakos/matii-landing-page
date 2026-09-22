import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Calendar, Clock, ExternalLink } from "lucide-react";
import { getAllNewsArticles, getFeaturedNews } from "@/lib/services/news.service";
import PageHeader from "@/components/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsroom & Press Releases | Matii Digitals",
  description:
    "Latest announcements, product releases, company milestones, and engineering insights from Matii Digitals.",
  openGraph: {
    title: "Newsroom & Press Releases | Matii Digitals",
    description:
      "Latest announcements, product releases, company milestones, and engineering insights from Matii Digitals.",
    images: ["/images/solutions-1.png"],
  },
};

export default async function NewsPage() {
  const [allNews, featured] = await Promise.all([
    getAllNewsArticles().catch(() => []),
    getFeaturedNews().catch(() => null),
  ]);

  const nonFeaturedNews = featured
    ? allNews.filter((n) => n.id !== featured.id)
    : allNews;

  return (
    <main className="w-full min-h-screen text-zinc-900 dark:text-zinc-100 px-4 sm:px-6 lg:px-12 py-8 md:py-12">
      <div className="max-w-[1380px] mx-auto space-y-12">
        <PageHeader
          tag="PRESS & DISPATCHES"
          title={
            <>
              News, Milestones
              <br />
              & Engineering Updates.
            </>
          }
          description="Read official press releases, product studio launches, and industry benchmarks published by the Matii team."
        />

        {/* Featured Top News Hero */}
        {featured ? (
          <div className="relative bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 overflow-hidden group hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
              <div className="lg:col-span-7 p-6 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-space text-xs font-bold uppercase tracking-wider text-black bg-[#98ff03] px-2.5 py-0.5 rounded-[2px]">
                    {featured.category}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-inter">
                    {featured.date}
                  </span>
                </div>

                <Link href={`/news/${featured.slug}`} className="block group">
                  <h2 className="font-space font-bold text-2xl sm:text-3xl md:text-4xl text-[#292c2e] dark:text-white leading-tight group-hover:text-zinc-700 dark:group-hover:text-[#98ff03] transition-colors">
                    {featured.title}
                  </h2>
                </Link>

                <p className="font-inter text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={`/news/${featured.slug}`}
                    className="inline-flex items-center gap-2 font-space font-medium text-sm text-[#292c2e] dark:text-white hover:text-black dark:hover:text-[#98ff03] uppercase tracking-wider transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  {featured.source ? (
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-inter">
                      Source: {featured.source}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-full min-h-[300px] bg-zinc-100 dark:bg-zinc-800 border-l border-zinc-100 dark:border-white/10">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* News Grid */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-white/10 pb-3 flex items-center justify-between">
            <h2 className="font-space font-bold text-xl text-[#292c2e] dark:text-white uppercase tracking-wider">
              Recent Dispatches ({nonFeaturedNews.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {nonFeaturedNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="group flex flex-col justify-between p-5 bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-colors space-y-4"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-white/10">
                    <Image
                      src={news.coverImage}
                      alt={news.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-space font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      <span>{news.category}</span>
                      <span className="text-zinc-400 dark:text-zinc-500">{news.date}</span>
                    </div>

                    <h3 className="font-space font-bold text-lg text-[#292c2e] dark:text-white group-hover:text-zinc-700 dark:group-hover:text-[#98ff03] leading-snug transition-colors">
                      {news.title}
                    </h3>

                    <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {news.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs font-inter text-zinc-400 dark:text-zinc-500">
                  <span>{news.readTime}</span>
                  <ArrowUpRight className="size-4 text-zinc-400 dark:text-zinc-500 group-hover:text-[#98ff03] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
