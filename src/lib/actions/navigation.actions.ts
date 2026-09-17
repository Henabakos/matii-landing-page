"use server";

import { isAdminAuthenticated } from "@/lib/auth";
import { 
  getAllNavMenus, 
  upsertNavMenu, 
  deleteNavMenu, 
  addLinkToNavbar,
  findLinkInNavbar,
  removeLinkFromNavbar
} from "@/lib/services/navigation.service";
import type { MegaMenuConfig } from "@/data/navigation-data";

export async function addLinkToNavbarAction(data: {
  oldHref?: string;
  menuKey: string;
  categoryTitleOrId?: string;
  groupTitle?: string;
  title: string;
  href: string;
  badge?: string;
  description?: string;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  return await addLinkToNavbar(data);
}

export async function findLinkInNavbarAction(hrefs: string | string[]) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  return await findLinkInNavbar(hrefs);
}

export async function removeLinkFromNavbarAction(hrefs: string | string[]) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  return await removeLinkFromNavbar(hrefs);
}

export async function getNavbarMenusAction() {
  return await getAllNavMenus();
}
