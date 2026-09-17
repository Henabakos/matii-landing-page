import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export interface DefaultTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
  rating: number;
  order: number;
  isActive: boolean;
}

export const DEFAULT_TESTIMONIALS: DefaultTestimonial[] = [
  {
    id: "default-1",
    quote:
      "Matii Digitals turned our vision into a high-performance web platform in record time. Their strategic thinking and engineering execution exceeded every expectation.",
    authorName: "Kiya Kebe",
    authorRole: "CEO & Co-founder at Liyana Care",
    avatarUrl: "/avatars/avatar-1.png",
    rating: 5,
    order: 1,
    isActive: true,
  },
  {
    id: "default-2",
    quote:
      "Working with Matii felt like adding a senior product engineering team overnight. They simplified complex workflows and delivered a flawless user experience.",
    authorName: "Abebe Tadesse",
    authorRole: "Head of Product at TechMove Global",
    avatarUrl: "/avatars/avatar-2.png",
    rating: 5,
    order: 2,
    isActive: true,
  },
  {
    id: "default-3",
    quote:
      "Their AI automation and full-stack development transformed our internal operations. We cut processing time by 40% within the first month of deployment.",
    authorName: "Sara Haile",
    authorRole: "Founder at Nexis AI Solutions",
    avatarUrl: "/avatars/avatar-3.png",
    rating: 5,
    order: 3,
    isActive: true,
  },
  {
    id: "default-4",
    quote:
      "From initial product discovery to final mobile launch, Matii Digitals brought clarity, speed, and outstanding design to the entire process.",
    authorName: "Michael Bekele",
    authorRole: "Managing Director at Apex Capital",
    avatarUrl: "/avatars/avatar-1.png",
    rating: 5,
    order: 4,
    isActive: true,
  },
];

export const getActiveTestimonials = unstable_cache(
  async () => {
    try {
      const items = await db.testimonial.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });

      if (!items || items.length === 0) {
        return DEFAULT_TESTIMONIALS;
      }

      return items;
    } catch (error) {
      console.warn("Failed to load testimonials from database, falling back to defaults:", error);
      return DEFAULT_TESTIMONIALS;
    }
  },
  ["testimonials-active"],
  { tags: ["testimonials"], revalidate: 3600 }
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
