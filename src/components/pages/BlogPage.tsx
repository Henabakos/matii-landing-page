"use client";

import { useMemo, useState } from "react";
import { BLOG_POSTS, BlogPost } from "@/data/blogPosts";
import { BlogCategoryFilters } from "@/components/sections/blog/BlogCategoryFilters";
import { BlogEmptyState } from "@/components/sections/blog/BlogEmptyState";
import { BlogGridSection } from "@/components/sections/blog/BlogGridSection";
import { BlogHeroSection } from "@/components/sections/blog/BlogHeroSection";
import { BlogTopBar } from "@/components/sections/blog/BlogTopBar";
import PageHeader from "@/components/common/PageHeader";
import Image from "next/image";
import type { FormattedBlogPost } from "@/lib/services/blog.service";

import { useTranslations } from "next-intl";

interface BlogPageProps {
  initialPosts?: FormattedBlogPost[];
}

export default function BlogPage({ initialPosts }: BlogPageProps) {
  const t = useTranslations("pages.blog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const posts = useMemo(() => {
    if (initialPosts && initialPosts.length > 0) {
      return initialPosts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        image: p.coverImage || "/images/about-illustration.png",
        isMainHero: p.isMainHero,
        isSideFeatured: p.isSideFeatured,
      }));
    }
    return BLOG_POSTS;
  }, [initialPosts]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(posts.map((post) => post.category)),
    );

    return ["ALL", ...uniqueCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const normalizedQuery = searchQuery.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === "ALL" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const mainHeroPost = useMemo(() => {
    return posts.find((post) => post.isMainHero) || posts[0];
  }, [posts]);

  const sideFeaturedPosts = useMemo(() => {
    return posts.filter((post) => post.isSideFeatured).slice(0, 3);
  }, [posts]);

  const lowerGridPosts = useMemo(() => {
    if (searchQuery || selectedCategory !== "ALL") {
      return filteredPosts;
    }

    const heroIds = new Set([
      mainHeroPost.id,
      ...sideFeaturedPosts.map((post) => post.id),
    ]);

    return posts.filter((post) => !heroIds.has(post.id));
  }, [
    posts,
    filteredPosts,
    searchQuery,
    selectedCategory,
    mainHeroPost,
    sideFeaturedPosts,
  ]);

  const isFiltering = Boolean(searchQuery) || selectedCategory !== "ALL";

  return (
    <main className="w-full min-h-screen text-[#292c2e] dark:text-[#ededed] px-4 sm:px-6 lg:px-12 py-8 md:py-12 transition-colors">
      <div className="max-w-[1380px] mx-auto space-y-10">
        <PageHeader
          tag={t("tag")}
          title={t("title")}
          description={t("description")}
        />

        <div className="relative bg-white dark:bg-[#161819] border border-zinc-200/80 dark:border-white/10 transition-colors">
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -left-[3px] z-10 transition-colors" />
          <div className="absolute bg-[#292c2e] dark:bg-white size-[6px] -bottom-[3px] -right-[3px] z-10 transition-colors" />

          <div className="p-6 md:p-8 space-y-10">
            <div className="hidden md:block absolute -top-1 right-0 w-32 h-26 lg:w-56 lg:h-48 dark:opacity-80">
              <Image
                src="/shapes/faq-shape.svg"
                alt="hero-shape"
                className="object-contain"
                fill
              />
            </div>

            <BlogTopBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery("")}
            />

            <BlogCategoryFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {filteredPosts.length === 0 ? (
              <BlogEmptyState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onReset={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                }}
              />
            ) : null}

            {!isFiltering && mainHeroPost ? (
              <BlogHeroSection
                mainHeroPost={mainHeroPost}
                sideFeaturedPosts={sideFeaturedPosts}
              />
            ) : null}
          </div>
          <div className="min-h-20 relative border-t border-zinc-200/80">
            <div className="absolute bg-[#292c2e] size-[6px] -top-1 -left-[3px] z-10" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-1 -right-[3px] z-10" />
          </div>
        </div>

        {lowerGridPosts.length > 0 ? (
          <BlogGridSection posts={lowerGridPosts} isFiltered={isFiltering} />
        ) : null}
      </div>
    </main>
  );
}
