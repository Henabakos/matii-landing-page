"use server";

import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

export async function saveKpiAction(data: {
  id?: string;
  key: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  category: string;
  order: number;
  isActive: boolean;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  if (data.id) {
    await db.kpi.update({
      where: { id: data.id },
      data: {
        key: data.key,
        label: data.label,
        value: data.value,
        unit: data.unit || "",
        description: data.description,
        category: data.category,
        order: Number(data.order),
        isActive: data.isActive,
      },
    });
  } else {
    await db.kpi.create({
      data: {
        key: data.key,
        label: data.label,
        value: data.value,
        unit: data.unit || "",
        description: data.description,
        category: data.category,
        order: Number(data.order),
        isActive: data.isActive,
      },
    });
  }

  revalidateTag("kpis", "default");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/kpis");
  return { success: true };
}

export async function deleteKpiAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await db.kpi.delete({ where: { id } });
  revalidateTag("kpis", "default");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/kpis");
  return { success: true };
}
