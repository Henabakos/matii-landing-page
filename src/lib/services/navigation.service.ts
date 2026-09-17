import { db } from "@/lib/db";
import { unstable_cache, revalidateTag } from "next/cache";
import { defaultNavMenus, MegaMenuConfig, MegaMenuCategory, MegaMenuItem } from "@/data/navigation-data";

interface RawNavMenu {
  id: string;
  key: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean | number;
  footerLabel: string | null;
  footerHref: string | null;
  footerCtaLabel: string | null;
  footerCtaHref: string | null;
  categories: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

function parseNavMenu(raw: RawNavMenu): MegaMenuConfig {
  let categories: MegaMenuCategory[] = [];
  try {
    categories = JSON.parse(raw.categories);
  } catch {
    categories = [];
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
  };
}

// Auto-seed default menus into DB if table is empty
async function seedDefaultNavMenusIfEmpty(): Promise<MegaMenuConfig[]> {
  try {
    const existing = await db.$queryRawUnsafe<RawNavMenu[]>(
      "SELECT * FROM NavMenu WHERE isActive = 1 ORDER BY `order` ASC"
    );

    if (existing && existing.length > 0) {
      return existing.map(parseNavMenu);
    }

    // Seed defaults
    const now = new Date().toISOString();
    for (const menu of defaultNavMenus) {
      const id = `nav_${menu.key}_${Date.now()}`;
      await db.$queryRawUnsafe(
        `INSERT OR REPLACE INTO NavMenu (
          id, \`key\`, label, href, \`order\`, isActive, footerLabel, footerHref, footerCtaLabel, footerCtaHref, categories, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        id,
        menu.key,
        menu.label,
        menu.href,
        menu.order,
        menu.isActive ? 1 : 0,
        menu.footer?.label || null,
        menu.footer?.href || null,
        menu.footer?.ctaLabel || null,
        menu.footer?.ctaHref || null,
        JSON.stringify(menu.categories),
        now,
        now
      );
    }

    return defaultNavMenus;
  } catch (error) {
    console.error("Error checking/seeding NavMenu in database:", error);
    return defaultNavMenus;
  }
}

export async function fetchNavMenusFromDb(): Promise<MegaMenuConfig[]> {
  try {
    const rows = await db.$queryRawUnsafe<RawNavMenu[]>(
      "SELECT * FROM NavMenu WHERE isActive = 1 ORDER BY `order` ASC"
    );

    if (!rows || rows.length === 0) {
      return await seedDefaultNavMenusIfEmpty();
    }

    return rows.map(parseNavMenu);
  } catch (error) {
    console.warn("Fallback to defaultNavMenus due to DB error:", error);
    return defaultNavMenus;
  }
}

const getCachedNavMenus = unstable_cache(
  fetchNavMenusFromDb,
  ["nav-menus-active"],
  { tags: ["navigation"], revalidate: 60 }
);

export async function getAllNavMenus(): Promise<MegaMenuConfig[]> {
  try {
    return await getCachedNavMenus();
  } catch {
    // If running outside of Next request context (e.g. scripts or test suites)
    return await fetchNavMenusFromDb();
  }
}

export async function upsertNavMenu(
  menu: Omit<MegaMenuConfig, "id"> & { id?: string }
): Promise<MegaMenuConfig> {
  const id = menu.id || `nav_${menu.key}_${Date.now()}`;
  const now = new Date().toISOString();

  await db.$queryRawUnsafe(
    `INSERT INTO NavMenu (
      id, \`key\`, label, href, \`order\`, isActive, footerLabel, footerHref, footerCtaLabel, footerCtaHref, categories, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(\`key\`) DO UPDATE SET
      label = excluded.label,
      href = excluded.href,
      \`order\` = excluded.\`order\`,
      isActive = excluded.isActive,
      footerLabel = excluded.footerLabel,
      footerHref = excluded.footerHref,
      footerCtaLabel = excluded.footerCtaLabel,
      footerCtaHref = excluded.footerCtaHref,
      categories = excluded.categories,
      updatedAt = excluded.updatedAt
    `,
    id,
    menu.key,
    menu.label,
    menu.href,
    menu.order,
    menu.isActive ? 1 : 0,
    menu.footer?.label || null,
    menu.footer?.href || null,
    menu.footer?.ctaLabel || null,
    menu.footer?.ctaHref || null,
    JSON.stringify(menu.categories),
    now,
    now
  );

  try {
    (revalidateTag as any)("navigation");
  } catch {}

  return {
    ...menu,
    id,
  };
}

export async function deleteNavMenu(key: string): Promise<boolean> {
  try {
    await db.$queryRawUnsafe("DELETE FROM NavMenu WHERE `key` = ?", key);
    try {
      (revalidateTag as any)("navigation");
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
      (revalidateTag as any)("navigation");
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
      const def = defaultNavMenus.find((m) => m.key === menuKey);
      if (def) {
        targetMenu = def;
      } else {
        targetMenu = {
          key: menuKey,
          label: menuKey.charAt(0).toUpperCase() + menuKey.slice(1),
          href: `/${menuKey}`,
          order: menus.length + 1,
          isActive: true,
          categories: [],
        };
      }
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
