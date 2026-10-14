import { unstable_cache } from "next/cache";
import { cache } from "react";

const outageRecords = new WeakSet<object>();
export function isFallbackContent(value: unknown): boolean {
  return typeof value === "object" && value !== null && outageRecords.has(value);
}

/** Empty arrays and null are successful CMS responses, never outage signals. */
export async function withCmsFallback<T>(read: () => Promise<T>, fallback: () => T, label: string): Promise<T> {
  try {
    return await read();
  } catch {
    console.warn(`[CMS] ${label} unavailable; using bundled public content.`);
    const value = fallback();
    if (value && typeof value === "object") {
      outageRecords.add(value);
      if (Array.isArray(value)) for (const row of value) if (row && typeof row === "object") outageRecords.add(row);
    }
    return value;
  }
}

export function cachedCmsRead<Args extends unknown[], Result>(
  read: (...args: Args) => Promise<Result>,
  keys: string[],
  options: Parameters<typeof unstable_cache>[2],
  fallback: (...args: Args) => Result,
): (...args: Args) => Promise<Result> {
  const cached = unstable_cache(read, keys, options);
  // Catch outside the cache so an outage does not cache fallback data for an hour.
  return cache((...args: Args) => withCmsFallback(() => cached(...args), () => fallback(...args), keys.join(":")));
}
