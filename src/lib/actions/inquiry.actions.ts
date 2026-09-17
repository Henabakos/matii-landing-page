"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

export async function submitContactInquiryAction(data: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}) {
  if (!data.name || !data.email || !data.message) {
    return { error: "Name, email, and message are required." };
  }

  await db.contactInquiry.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company || null,
      service: data.service || null,
      budget: data.budget || null,
      message: data.message,
      status: "NEW",
    },
  });

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
