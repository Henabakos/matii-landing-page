"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">Marketing</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">Something went wrong</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white"
      >
        Try again
      </button>
    </section>
  );
}
