"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

export async function saveTestimonialAction(data: {
  id?: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl?: string;
  rating: number;
  order: number;
  isActive: boolean;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  let testimonial;
  if (data.id) {
    testimonial = await db.testimonial.update({
      where: { id: data.id },
      data: {
        quote: data.quote,
        authorName: data.authorName,
        authorRole: data.authorRole,
        avatarUrl: data.avatarUrl || "/avatars/avatar-1.png",
        rating: Number(data.rating || 5),
        order: Number(data.order || 0),
        isActive: data.isActive,
      },
    });
  } else {
    testimonial = await db.testimonial.create({
      data: {
        quote: data.quote,
        authorName: data.authorName,
        authorRole: data.authorRole,
        avatarUrl: data.avatarUrl || "/avatars/avatar-1.png",
        rating: Number(data.rating || 5),
        order: Number(data.order || 0),
        isActive: data.isActive,
      },
    });
  }

  revalidateTag("testimonials", "default");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true, testimonial };
}

export async function deleteTestimonialAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.testimonial.delete({ where: { id } });
  revalidateTag("testimonials", "default");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function toggleTestimonialActiveAction(id: string, currentState: boolean) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.testimonial.update({
    where: { id },
    data: { isActive: !currentState },
  });
  revalidateTag("testimonials", "default");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
