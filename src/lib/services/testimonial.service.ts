import { db } from "@/lib/db";
import { cachedCmsRead } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

export const getActiveTestimonials = cachedCmsRead(
  () => db.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
  ["testimonials-active-db-only"],
  { tags: ["testimonials"], revalidate: 3600 },
  () => fallbackRows("Testimonial").sort((a, b) => a.order - b.order)
);

export async function getAllTestimonials() {
  try {
    const items = await db.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return items;
  } catch (error) {
    console.error("Error fetching all testimonials for admin:", error);
    return [];
  }
}

export type TestimonialItem = Awaited<ReturnType<typeof getActiveTestimonials>>[number];
