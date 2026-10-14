"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("emptyContent");
  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-10 shadow-sm">
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">{t("errorTitle")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {t("errorDescription")}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-zinc-950 dark:bg-[#98ff03] dark:text-[#161819] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer active:scale-[0.98]"
      >
        {t("retry")}
      </button>
    </section>
  );
}
