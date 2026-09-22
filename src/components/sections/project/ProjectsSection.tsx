"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProjectCard, {
  ProjectCardProps,
} from "@/components/sections/project/ProjectCard";
import PageHeader from "@/components/common/PageHeader";
import type { ParsedProject, FormattedProjectCategory } from "@/lib/services/project.service";

interface ProjectsSectionProps {
  initialProjects?: ParsedProject[];
  initialCategories?: FormattedProjectCategory[];
}

const fallbackProjects: ProjectCardProps[] = [
  {
    id: "1",
    category: "AI Automation",
    year: "2025",
    title: "Ragnarok AI Agent Platform",
    description:
      "AI-driven automation system improving engagement and conversion clarity for SaaS startups.",
    statLabel: "Demo Clicks: +13.2x",
    slug: "ragnarok-ai",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "2",
    category: "Healthcare SaaS",
    year: "2025",
    title: "Liyana Care Patient Portal",
    description:
      "Thoughtful clinical portal designed to eliminate patient communication bottlenecks efficiently.",
    statLabel: "User Retention: 98.4%",
    slug: "liyana-care",
    imageUrl: "/images/solutions-1.png",
  },
  {
    id: "3",
    category: "Cloud Operations",
    year: "2025",
    title: "Nexis SaaS Enterprise Platform",
    description:
      "Automated cloud workspace streamlining operations across 10+ global enterprise locations.",
    statLabel: "Operation Speed: +60%",
    slug: "nexis-saas-platform",
    imageUrl: "/images/faq-illustration.png",
  },
  {
    id: "4",
    category: "Fintech & Mobile",
    year: "2025",
    title: "Apex Mobile Asset Wallet",
    description:
      "High-performance mobile banking and asset wallet built for instant digital transactions.",
    statLabel: "Downloads: 100k+",
    slug: "apex-mobile-app",
    imageUrl: "/images/about-illustration.png",
  },
  {
    id: "5",
    category: "Fintech & Mobile",
    year: "2024",
    title: "Digital Asset & Exchange Web App",
    description:
      "Responsive financial trading interface designed for clarity, security, and high performance.",
    statLabel: "Conversion Lift: +65%",
    slug: "digital-wallet",
    imageUrl: "/images/ai-automation.png",
  },
  {
    id: "6",
    category: "AI Automation",
    year: "2024",
    title: "Smart Workflow Orchestration",
    description:
      "Custom AI workflow agents automating complex enterprise data pipelines seamlessly.",
    statLabel: "Time Saved: 45%",
    slug: "workflow-orchestration",
    imageUrl: "/images/solutions-1.png",
  },
];

import { useTranslations } from "next-intl";

function ProjectsContent({ initialProjects, initialCategories }: ProjectsSectionProps) {
  const tPages = useTranslations("pages.projects");
  const tCommon = useTranslations("common");
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const projectCards: ProjectCardProps[] = useMemo(() => {
    if (initialProjects && initialProjects.length > 0) {
      return initialProjects.map((p) => {
        let statLabel = "Featured Solution";
        if (p.metrics.stat1Value && p.metrics.stat1Label) {
          statLabel = `${p.metrics.stat1Label}: ${p.metrics.stat1Value}`;
        } else if (p.metrics.demoClickGrowth) {
          statLabel = `Demo Clicks: +${p.metrics.demoClickGrowth}x`;
        }

        return {
          id: p.id,
          category: p.category,
          year: p.year,
          title: p.title,
          description: p.subtitle,
          statLabel,
          slug: p.slug,
          imageUrl: p.coverImage || "/images/ai-automation.png",
        };
      });
    }
    return fallbackProjects;
  }, [initialProjects]);

  // Dynamically compute categories with accurate counts
  const categoriesList = useMemo(() => {
    if (initialCategories && initialCategories.length > 0) {
      return initialCategories.map((c) => {
        const count = projectCards.filter(
          (p) => p.category.toLowerCase() === c.name.toLowerCase()
        ).length;
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          count,
        };
      });
    }

    const uniqueCatNames = Array.from(new Set(projectCards.map((p) => p.category)));
    return uniqueCatNames.map((name) => ({
      id: name,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      count: projectCards.filter((p) => p.category.toLowerCase() === name.toLowerCase()).length,
    }));
  }, [initialCategories, projectCards]);

  // Sync selected category with URL query param
  useEffect(() => {
    if (paramCategory) {
      const match = categoriesList.find(
        (c) =>
          c.slug.toLowerCase() === paramCategory.toLowerCase() ||
          c.name.toLowerCase() === paramCategory.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match.name);
      }
    } else {
      setSelectedCategory("All");
    }
  }, [paramCategory, categoriesList]);

  const handleSelectCategory = (catName: string, catSlug?: string) => {
    setSelectedCategory(catName);
    const params = new URLSearchParams(searchParams.toString());
    if (catName === "All" || !catSlug) {
      params.delete("category");
    } else {
      params.set("category", catSlug);
    }
    const query = params.toString();
    router.replace(`/projects${query ? `?${query}` : ""}`, { scroll: false });
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projectCards
      : projectCards.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="relative w-full pt-8 md:pt-12 px-4 md:px-8 overflow-hidden">
      <div className="max-w-345 mx-auto relative space-y-12">
        <PageHeader
          tag={tPages("tag")}
          title={tPages("title")}
          description={tPages("description")}
        />

        {/* Dynamic Category Filter Tabs with Live Counts & URL Sync */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {/* ALL Tab */}
          <button
            type="button"
            onClick={() => handleSelectCategory("All")}
            className={`font-space text-xs md:text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-none transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              selectedCategory === "All"
                ? "bg-[#292c2e] text-white shadow-md border border-[#292c2e] dark:bg-[#98ff03] dark:text-[#161819] dark:border-[#98ff03]"
                : "bg-[#f3f4f6] dark:bg-[#161819] text-[#292c2e] dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200/80 dark:border-white/10"
            }`}
          >
            <span>{tCommon("all")}</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-none font-mono font-bold ${
                selectedCategory === "All"
                  ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#161819]"
                  : "bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {projectCards.length}
            </span>
          </button>

          {/* Dynamic Category Tabs */}
          {categoriesList.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.name, cat.slug)}
                className={`font-space text-xs md:text-sm font-medium uppercase tracking-wider px-5 py-2.5 rounded-none transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#292c2e] text-white shadow-md border border-[#292c2e] dark:bg-[#98ff03] dark:text-[#161819] dark:border-[#98ff03]"
                    : "bg-[#f3f4f6] dark:bg-[#161819] text-[#292c2e] dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200/80 dark:border-white/10"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-none font-mono font-bold ${
                    isActive
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#161819]"
                      : "bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-zinc-300 dark:border-white/10 rounded-[4px]">
              <p className="font-space text-sm uppercase text-zinc-500 dark:text-zinc-400">
                No projects found in this category yet.
              </p>
              <button
                type="button"
                onClick={() => handleSelectCategory("All")}
                className="mt-3 text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e] dark:text-[#98ff03] hover:underline cursor-pointer"
              >
                Show all projects
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection(props: ProjectsSectionProps) {
  return (
    <Suspense fallback={<div className="w-full py-20 text-center text-xs font-mono">Loading projects...</div>}>
      <ProjectsContent {...props} />
    </Suspense>
  );
}

export default ProjectsSection;
