"use client";

import { useMemo, useState } from "react";

import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogCategoryFilters } from "@/components/sections/blog/BlogCategoryFilters";
import { BlogEmptyState } from "@/components/sections/blog/BlogEmptyState";
import { BlogGridSection } from "@/components/sections/blog/BlogGridSection";
import { BlogHeroSection } from "@/components/sections/blog/BlogHeroSection";
import { BlogTopBar } from "@/components/sections/blog/BlogTopBar";

import Image from "next/image";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(BLOG_POSTS.map((post) => post.category)),
    );

    return ["ALL", ...uniqueCategories];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const normalizedQuery = searchQuery.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === "ALL" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const mainHeroPost = useMemo(() => {
    return BLOG_POSTS.find((post) => post.isMainHero) || BLOG_POSTS[0];
  }, []);

  const sideFeaturedPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => post.isSideFeatured).slice(0, 3);
  }, []);

  const lowerGridPosts = useMemo(() => {
    if (searchQuery || selectedCategory !== "ALL") {
      return filteredPosts;
    }

    const heroIds = new Set([
      mainHeroPost.id,
      ...sideFeaturedPosts.map((post) => post.id),
    ]);

    return BLOG_POSTS.filter((post) => !heroIds.has(post.id));
  }, [
    filteredPosts,
    searchQuery,
    selectedCategory,
    mainHeroPost,
    sideFeaturedPosts,
  ]);

  const isFiltering = Boolean(searchQuery) || selectedCategory !== "ALL";

  return (
    <main className="w-full min-h-screen text-zinc-900 px-4 sm:px-6 lg:px-12 py-8 md:py-12">
      <div className="max-w-[1380px] mx-auto space-y-10">
        <div className="relative bg-white ">
          <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px] z-10" />
          <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px] z-10" />

          <div className="p-6 md:p-8 space-y-10">
            <div className="hidden md:block absolute -top-1 right-0 w-32 h-26 lg:w-56 lg:h-48">
              <Image
                src="/shapes/faq-shape.svg"
                alt="hero-shape"
                className="object-contain "
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

            {!isFiltering ? (
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
