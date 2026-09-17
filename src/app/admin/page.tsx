import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  TrendingUp,
  Briefcase,
  BookOpen,
  Newspaper,
  Handshake,
  Inbox,
  ArrowUpRight,
  Plus,
  Sparkles,
  ExternalLink,
  MessageSquareQuote,
  Users,
  UserCheck,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    kpiCount,
    partnerCount,
    projectCount,
    blogCount,
    newsCount,
    inquiryCount,
    testimonialCount,
    jobCount,
    applicationCount,
    recentProjects,
    recentInquiries,
  ] = await Promise.all([
    db.kpi.count(),
    db.partner.count(),
    db.project.count(),
    db.blogPost.count(),
    db.newsArticle.count(),
    db.contactInquiry.count({ where: { status: "NEW" } }),
    db.testimonial.count(),
    db.jobPosition.count({ where: { isActive: true } }),
    db.jobApplication.count({ where: { status: "NEW" } }),
    db.project.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
    db.contactInquiry.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
  ]);

  const statCards = [
    {
      label: "Active Projects",
      value: projectCount,
      href: "/admin/projects",
      icon: Briefcase,
      desc: "Client case studies & showcases",
    },
    {
      label: "Open Job Roles",
      value: jobCount,
      href: "/admin/careers",
      icon: UserCheck,
      desc: "Live job positions hiring now",
    },
    {
      label: "New Job Applications",
      value: applicationCount,
      href: "/admin/careers",
      icon: Users,
      desc: "Candidate submissions awaiting review",
      highlight: applicationCount > 0,
    },
    {
      label: "Blog Articles",
      value: blogCount,
      href: "/admin/blog",
      icon: BookOpen,
      desc: "Published engineering & design essays",
    },
    {
      label: "News Dispatches",
      value: newsCount,
      href: "/admin/news",
      icon: Newspaper,
      desc: "Press releases & milestones",
    },
    {
      label: "Client Testimonials",
      value: testimonialCount,
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      desc: "Endorsements & client reviews",
    },
    {
      label: "Live KPIs",
      value: kpiCount,
      href: "/admin/kpis",
      icon: TrendingUp,
      desc: "Metrics powering homepage & about",
    },
    {
      label: "Trusted Partners",
      value: partnerCount,
      href: "/admin/partners",
      icon: Handshake,
      desc: "Featured partner logos",
    },
    {
      label: "Pending Inquiries",
      value: inquiryCount,
      href: "/admin/inquiries",
      icon: Inbox,
      desc: "Unread leads from contact forms",
      highlight: inquiryCount > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-white border border-zinc-200/80 p-6 sm:p-8 shadow-sm">
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex gap-2 items-center bg-[#f3f4f6] px-2.5 py-0.5 border border-zinc-200 rounded-[2px] mb-3">
              <div className="bg-[#98ff03] size-2.5 shrink-0" />
              <span className="font-space font-semibold text-[11px] text-black uppercase tracking-wider">
                CONTROL CENTER
              </span>
            </div>
            <h2 className="font-space font-medium text-2xl sm:text-3xl text-[#292c2e] tracking-tight">
              Matii Digital Studio CMS
            </h2>
            <p className="font-inter text-xs sm:text-sm text-zinc-500 mt-1">
              Live content updates instantly purge Next.js cached tags and update
              the public site without code deployments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition-all active:scale-[0.96]"
            >
              <Plus className="size-3.5 text-[#98ff03]" />
              <span>Add Project</span>
            </Link>
            <Link
              href="/admin/kpis"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 text-[#292c2e] border border-zinc-300 text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition-all active:scale-[0.96]"
            >
              <TrendingUp className="size-3.5" />
              <span>Update KPIs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`group p-6 bg-white border transition-all relative rounded-[4px] hover:border-[#292c2e] active:scale-[0.98] ${card.highlight
                ? "border-[#98ff03] shadow-[0_0_15px_rgba(152,255,3,0.15)]"
                : "border-zinc-200/80 shadow-sm"
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-space text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {card.label}
                  </span>
                  <div className="font-space font-bold text-3xl sm:text-4xl text-[#292c2e] tabular-nums tracking-tight">
                    {card.value}
                  </div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#f8f9fa] border border-zinc-200 text-[#292c2e] group-hover:bg-[#292c2e] group-hover:text-[#98ff03] transition-colors">
                  <Icon className="size-5" />
                </div>
              </div>

              <p className="font-inter text-xs text-zinc-500 mt-4 leading-normal">
                {card.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-space text-zinc-400 group-hover:text-black transition-colors">
                <span>Manage {card.label}</span>
                <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity / Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Projects */}
        <div className="bg-white border border-zinc-200/80 p-6 rounded-[4px] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-[#292c2e]" />
              <h3 className="font-space font-bold text-sm text-[#292c2e] uppercase tracking-wider">
                Recent Projects
              </h3>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-space uppercase text-zinc-500 hover:text-black transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-space font-semibold text-sm text-[#292c2e]">
                    {p.title}
                  </h4>
                  <span className="text-xs text-zinc-500 font-inter">
                    {p.category} • {p.year}
                  </span>
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  target="_blank"
                  className="text-xs text-zinc-400 hover:text-black font-space flex items-center gap-1"
                >
                  <span>View</span>
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white border border-zinc-200/80 p-6 rounded-[4px] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <Inbox className="size-4 text-[#292c2e]" />
              <h3 className="font-space font-bold text-sm text-[#292c2e] uppercase tracking-wider">
                Latest Contact Submissions
              </h3>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-space uppercase text-zinc-500 hover:text-black transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="max-w-[70%]">
                    <h4 className="font-space font-semibold text-sm text-[#292c2e]">
                      {inq.name}
                    </h4>
                    <p className="text-xs text-zinc-500 font-inter truncate">
                      {inq.email} • {inq.service || "General Inquiry"}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-space font-bold px-2 py-0.5 rounded-[2px] ${inq.status === "NEW"
                      ? "bg-[#98ff03] text-black"
                      : "bg-zinc-100 text-zinc-600"
                      }`}
                  >
                    {inq.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-400 py-6 text-center font-inter">
                No new contact form submissions yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
