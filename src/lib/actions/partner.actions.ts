"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

export async function savePartnerAction(data: {
  id?: string;
  name: string;
  logoUrl?: string;
  svgContent?: string;
  websiteUrl?: string;
  order: number;
  isActive: boolean;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  let partner;
  if (data.id) {
    partner = await db.partner.update({
      where: { id: data.id },
      data: {
        name: data.name,
        logoUrl: data.logoUrl || null,
        svgContent: data.svgContent || null,
        websiteUrl: data.websiteUrl || null,
        order: Number(data.order),
        isActive: data.isActive,
      },
    });
  } else {
    partner = await db.partner.create({
      data: {
        name: data.name,
        logoUrl: data.logoUrl || null,
        svgContent: data.svgContent || null,
        websiteUrl: data.websiteUrl || null,
        order: Number(data.order),
        isActive: data.isActive,
      },
    });
  }

  revalidateTag("partners", "default");
  revalidatePath("/");
  revalidatePath("/admin/partners");
  return { success: true, partner };
}

export async function deletePartnerAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.partner.delete({ where: { id } });
  revalidateTag("partners", "default");
  revalidatePath("/");
  revalidatePath("/admin/partners");
  return { success: true };
}
