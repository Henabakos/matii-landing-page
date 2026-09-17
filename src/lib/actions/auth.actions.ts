"use server";

import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession, verifyAdminPassword } from "@/lib/auth";

export async function loginAdminAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password is required" };
  }

  if (!verifyAdminPassword(password)) {
    return { error: "Invalid admin password. Please try again." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
