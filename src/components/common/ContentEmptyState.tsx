"use client";

import { ArrowUpRight, FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export type ContentKind = "projects" | "testimonials" | "partners" | "metrics" | "services" | "blog" | "careers" | "gallery" | "news";

export default function ContentEmptyState({ kind, compact = false }: { kind: ContentKind; compact?: boolean }) {
  const t = useTranslations("emptyContent");
  return (
    <div className={`relative col-span-full w-full overflow-hidden border border-zinc-200 bg-white text-center dark:border-white/10 dark:bg-[#161819] ${compact ? "px-6 py-10" : "px-6 py-16 sm:py-20"}`}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#98ff03] to-transparent" />
      <div aria-hidden="true" className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-[#98ff03]">
        <FolderOpen className="size-6" strokeWidth={1.5} />
      </div>
      <h2 className="font-urbanist text-2xl font-medium tracking-tight text-[#292c2e] dark:text-white sm:text-3xl">{t(`${kind}.title`)}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t(`${kind}.description`)}</p>
      {!compact && <Link href="/contact" className="mt-7 inline-flex min-h-11 items-center justify-center gap-3 border border-zinc-200 px-5 py-3 text-sm font-medium text-[#292c2e] transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-600 dark:border-white/15 dark:text-white dark:hover:bg-white/5">
        {t("contact")}<ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>}
    </div>
  );
}
