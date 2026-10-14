import { db } from "@/lib/db";
import type { NavMenu } from "@prisma/client";
import { unstable_cache, revalidateTag } from "next/cache";
import type { MegaMenuConfig, MegaMenuCategory, MegaMenuItem } from "@/data/navigation-data";
import { withCmsFallback } from "./cms-fallback";
import { fallbackRows } from "./cms-fallback-content";

function parseNavMenu(raw: NavMenu): MegaMenuConfig {
  let categories: MegaMenuCategory[] = [];
  try {
    categories = JSON.parse(raw.categories);
  } catch {
    categories = [];
  }

  let translations: Record<string, { label?: string; footerLabel?: string; footerCtaLabel?: string }> | undefined;
  if (raw.translations) {
    try {
      translations = typeof raw.translations === "string" ? JSON.parse(raw.translations) : raw.translations;
    } catch {
      translations = undefined;
    }
  }

  return {
    id: raw.id,
    key: raw.key,
    label: raw.label,
    href: raw.href || "#",
    order: raw.order ?? 0,
    isActive: Boolean(raw.isActive),
    footer:
      raw.footerLabel && raw.footerCtaLabel
        ? {
            label: raw.footerLabel,
            href: raw.footerHref || "#",
            ctaLabel: raw.footerCtaLabel,
            ctaHref: raw.footerCtaHref || "#",
          }
        : undefined,
    categories,
    translations,
  };
}

function navMenuData(menu: Omit<MegaMenuConfig, "id">) {
  return {
    key: menu.key,
    label: menu.label,
    href: menu.href,
    order: menu.order,
    isActive: menu.isActive,
    footerLabel: menu.footer?.label || null,
    footerHref: menu.footer?.href || null,
    footerCtaLabel: menu.footer?.ctaLabel || null,
    footerCtaHref: menu.footer?.ctaHref || null,
    categories: JSON.stringify(menu.categories || []),
    translations: menu.translations ? JSON.stringify(menu.translations) : null,
  };
}

export async function fetchNavMenusFromDb(): Promise<MegaMenuConfig[]> {
  const rows = await db.navMenu.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  return rows.map(parseNavMenu);
}

export async function getAdminNavMenus(): Promise<MegaMenuConfig[]> {
  const rows = await db.navMenu.findMany({ orderBy: { order: "asc" } });
  return rows.map(parseNavMenu);
}

const getCachedNavMenus = unstable_cache(
  fetchNavMenusFromDb,
  ["nav-menus-active-db-only"],
  { tags: ["navigation"], revalidate: 60 }
);

export async function getAllNavMenus(): Promise<MegaMenuConfig[]> {
  try {
    return await getCachedNavMenus();
  } catch {
    // Also supports scripts outside Next's cache context; admin reads stay strict.
    return withCmsFallback(fetchNavMenusFromDb,
      () => fallbackRows("NavMenu").sort((a, b) => a.order - b.order).map(parseNavMenu),
      "navigation");
  }
}

export async function upsertNavMenu(
  menu: Omit<MegaMenuConfig, "id"> & { id?: string }
): Promise<MegaMenuConfig> {
  const data = navMenuData(menu);
  const saved = await db.navMenu.upsert({
    where: { key: menu.key },
    create: { ...data, ...(menu.id ? { id: menu.id } : {}) },
    update: data,
  });

  try {
    revalidateTag("navigation", { expire: 0 });
  } catch {}

  return parseNavMenu(saved);
}

export async function deleteNavMenu(key: string): Promise<boolean> {
  try {
    await db.navMenu.deleteMany({ where: { key } });
    try {
      revalidateTag("navigation", { expire: 0 });
    } catch {}
    return true;
  } catch (error) {
    console.error("Error deleting NavMenu:", error);
    return false;
  }
}

export async function findLinkInNavbar(hrefs: string | string[]): Promise<{
  found: boolean;
  menuKey?: string;
  menuLabel?: string;
  categoryId?: string;
  categoryTitle?: string;
  groupTitle?: string;
  item?: MegaMenuItem;
}> {
  const targets = (Array.isArray(hrefs) ? hrefs : [hrefs]).filter(Boolean);
  if (targets.length === 0) return { found: false };

  const menus = await fetchNavMenusFromDb();
  for (const menu of menus) {
    for (const cat of menu.categories || []) {
      for (const grp of cat.groups || []) {
        const item = (grp.items || []).find((it) => targets.includes(it.href));
        if (item) {
          return {
            found: true,
            menuKey: menu.key,
            menuLabel: menu.label,
            categoryId: cat.id,
            categoryTitle: cat.title,
            groupTitle: grp.title,
            item,
          };
        }
      }
    }
  }

  return { found: false };
}

export async function removeLinkFromNavbar(
  hrefs: string | string[]
): Promise<{ success: boolean; totalRemoved: number }> {
  try {
    const targets = (Array.isArray(hrefs) ? hrefs : [hrefs]).filter(Boolean);
    if (targets.length === 0) return { success: true, totalRemoved: 0 };

    const menus = await fetchNavMenusFromDb();
    let totalRemoved = 0;

    for (const menu of menus) {
      let menuModified = false;
      const updatedCategories = (menu.categories || []).map((cat) => {
        let catModified = false;
        const updatedGroups = (cat.groups || []).map((grp) => {
          const initialLen = grp.items?.length || 0;
          const filteredItems = (grp.items || []).filter(
            (it) => !targets.includes(it.href)
          );
          if (filteredItems.length !== initialLen) {
            totalRemoved += initialLen - filteredItems.length;
            catModified = true;
            menuModified = true;
          }
          return { ...grp, items: filteredItems };
        });

        if (catModified) {
          return { ...cat, groups: updatedGroups };
        }
        return cat;
      });

      if (menuModified) {
        await upsertNavMenu({
          ...menu,
          categories: updatedCategories,
        });
      }
    }

    try {
      revalidateTag("navigation", { expire: 0 });
    } catch {}

    return { success: true, totalRemoved };
  } catch (err: any) {
    console.error("removeLinkFromNavbar error:", err);
    return { success: false, totalRemoved: 0 };
  }
}

export async function addLinkToNavbar({
  oldHref,
  menuKey,
  categoryTitleOrId,
  groupTitle,
  title,
  href,
  badge,
  description,
}: {
  oldHref?: string;
  menuKey: string;
  categoryTitleOrId?: string;
  groupTitle?: string;
  title: string;
  href: string;
  badge?: string;
  description?: string;
}): Promise<{ success: boolean; menu?: MegaMenuConfig; error?: string }> {
  try {
    // 1. Clean up any existing instances across all menus/categories first to prevent duplicates when moving or re-slugging
    const targetsToClean = [oldHref, href].filter((h): h is string => Boolean(h));
    if (targetsToClean.length > 0) {
      await removeLinkFromNavbar(targetsToClean);
    }

    const menus = await fetchNavMenusFromDb();
    let targetMenu = menus.find((m) => m.key === menuKey);

    if (!targetMenu) {
      targetMenu = {
        key: menuKey,
        label: menuKey.charAt(0).toUpperCase() + menuKey.slice(1),
        href: `/${menuKey}`,
        order: menus.length + 1,
        isActive: true,
        categories: [],
      };
    }

    const categories = [...(targetMenu.categories || [])];

    // Match or create category
    let category = categories.find(
      (c) =>
        c.id.toLowerCase() === (categoryTitleOrId || "").toLowerCase() ||
        c.title.toLowerCase() === (categoryTitleOrId || "").toLowerCase()
    );

    if (!category) {
      if (categories.length > 0 && !categoryTitleOrId) {
        category = categories[0];
      } else {
        const catTitle = categoryTitleOrId || "Featured";
        const catId = catTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        category = {
          id: catId,
          title: catTitle,
          iconName: "Sparkles",
          groups: [],
        };
        categories.push(category);
      }
    }

    const groups = [...(category.groups || [])];
    const grpTitle = groupTitle || "Featured";
    let group = groups.find((g) => g.title.toLowerCase() === grpTitle.toLowerCase());

    if (!group) {
      group = {
        title: grpTitle,
        href: targetMenu.href,
        items: [],
      };
      groups.push(group);
    }

    // Check if item already exists by href
    const items = [...(group.items || [])];
    const existingIndex = items.findIndex((i) => i.href === href || (oldHref && i.href === oldHref));
    const newItem = {
      title,
      href,
      badge: badge || undefined,
      description: description || undefined,
    };

    if (existingIndex >= 0) {
      items[existingIndex] = { ...items[existingIndex], ...newItem };
    } else {
      items.push(newItem);
    }

    group.items = items;
    category.groups = groups;

    const updatedMenu: MegaMenuConfig = {
      ...targetMenu,
      categories,
    };

    const saved = await upsertNavMenu(updatedMenu);
    return { success: true, menu: saved };
  } catch (error: any) {
    console.error("addLinkToNavbar error:", error);
    return { success: false, error: error.message || "Failed to add link to navbar" };
  }
}
