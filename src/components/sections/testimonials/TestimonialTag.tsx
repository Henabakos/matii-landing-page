"use client";

import { useTranslations } from "next-intl";

export function TestimonialTag() {
  const t = useTranslations("testimonials");
  return (
    <div className="inline-flex gap-2.5 items-center bg-[#f3f4f6] dark:bg-[#161819] border border-transparent dark:border-white/10 px-2.5 py-1 transition-colors">
      <div className="bg-[#98ff03] size-4 shrink-0" />
      <span className="font-urbanist font-medium text-base md:text-lg text-[#292c2e] dark:text-white uppercase tracking-wider whitespace-nowrap">
        {t("tag")}
      </span>
    </div>
  );
}

export default TestimonialTag;
