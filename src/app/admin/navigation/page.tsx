import React from "react";
import { getAdminNavMenus } from "@/lib/services/navigation.service";
import NavigationClientManager from "./NavigationClientManager";

export const metadata = {
  title: "Navigation & Mega Menus | Matii CMS",
};

export default async function AdminNavigationPage() {
  const menus = await getAdminNavMenus();
  return <NavigationClientManager initialMenus={menus} />;
}
