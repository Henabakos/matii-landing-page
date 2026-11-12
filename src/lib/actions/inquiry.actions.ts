"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { sendContactInquiryEmail } from "@/lib/email/contact-email";

const singleLine = (max: number) => z.string().trim().max(max).transform(value => value.replace(/\s+/g, " "));
const optional = (max: number) => singleLine(max).optional().transform(value => value || null);

const inquirySchema = z.object({
  name: singleLine(120).pipe(z.string().min(2)),
  email: z.string().trim().max(200).email(),
  phone: optional(40),
  company: optional(160),
  service: optional(120),
  budget: optional(80),
  message: z.string().trim().min(10).max(5000),
});

export async function submitContactInquiryAction(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  hpTrap?: string;
}) {
  // Honeypot: the field is hidden from people, so only bots fill it in.
  if (data?.hpTrap) {
    console.warn("[contact] Honeypot field was filled; inquiry dropped as spam.");
    return { success: true };
  }
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Please check your name, email and message, then try again." };
  }
  const inquiry = parsed.data;

  try {
    await db.contactInquiry.create({ data: { ...inquiry, status: "NEW" } });
  } catch (error) {
    console.error("[contact] Unable to save inquiry:", error);
    return { error: "We couldn't send your message. Please try again or email us directly." };
  }

  // The inquiry is saved; a failed email is logged and still visible in /admin/inquiries.
  await sendContactInquiryEmail(inquiry);

  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function updateInquiryStatusAction(id: string, status: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.contactInquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function deleteInquiryAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.contactInquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
  return { success: true };
}
