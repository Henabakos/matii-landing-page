export default function NotFound() {
  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161819] p-10 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Marketing</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">Page not found</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist.
      </p>
    </section>
  );
}
