"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  CheckCircle2,
  Trash2,
  Edit3,
  AlertTriangle,
} from "lucide-react";
import type { MegaMenuConfig, MegaMenuItem } from "@/data/navigation-data";
import { removeLinkFromNavbarAction } from "@/lib/actions/navigation.actions";

export interface AddToNavbarConfig {
  enabled: boolean;
  menuKey: string;
  categoryId: string;
  groupTitle: string;
  badge: string;
  oldHref?: string;
  removeIfExists?: boolean;
  isExistingInNavbar?: boolean;
}

interface ExistingNavbarMatch {
  menuKey: string;
  menuLabel: string;
  categoryId: string;
  categoryTitle: string;
  groupTitle: string;
  item: MegaMenuItem;
}

interface AddToNavbarSelectorProps {
  slug: string;
  title: string;
  contentType: "project" | "blog" | "news" | "service";
  value: AddToNavbarConfig;
  onChange: (config: AddToNavbarConfig) => void;
  originalSlug?: string;
}

export function AddToNavbarSelector({
  slug,
  title,
  contentType,
  value,
  onChange,
  originalSlug,
}: AddToNavbarSelectorProps) {
  const [menus, setMenus] = useState<MegaMenuConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryTitle, setCustomCategoryTitle] = useState("");
  const [existingMatch, setExistingMatch] = useState<ExistingNavbarMatch | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removalSuccess, setRemovalSuccess] = useState(false);

  // Default menuKey by contentType
  const defaultMenuKey =
    contentType === "project"
      ? "projects"
      : contentType === "blog" || contentType === "news"
      ? "resources"
      : "services";

  // Target route prefix
  const routePrefix =
    contentType === "project"
      ? "/projects"
      : contentType === "blog"
      ? "/blog"
      : contentType === "news"
      ? "/news"
      : "/services";

  const targetHref = `${routePrefix}/${slug || ""}`;
  const effectiveOriginalSlug = originalSlug || slug;
  const originalHref = effectiveOriginalSlug ? `${routePrefix}/${effectiveOriginalSlug}` : "";

  // Helper to scan menus for existing link
  const scanForExistingLink = (menusList: MegaMenuConfig[]) => {
    if (!slug && !originalSlug) return null;

    const testHrefs = [
      targetHref,
      originalHref,
      originalHref ? `${originalHref}/` : "",
      targetHref ? `${targetHref}/` : "",
    ].filter(Boolean);

    for (const menu of menusList) {
      for (const cat of menu.categories || []) {
        for (const grp of cat.groups || []) {
          const match = (grp.items || []).find((it) => testHrefs.includes(it.href));
          if (match) {
            return {
              menuKey: menu.key,
              menuLabel: menu.label,
              categoryId: cat.id,
              categoryTitle: cat.title,
              groupTitle: grp.title,
              item: match,
            };
          }
        }
      }
    }
    return null;
  };

  // Load active navigation menus
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const navMenus: MegaMenuConfig[] = res.data;
          setMenus(navMenus);

          const found = scanForExistingLink(navMenus);
          if (found) {
            setExistingMatch(found);
            // Pre-populate value with existing navbar configuration
            onChange({
              enabled: true,
              menuKey: found.menuKey,
              categoryId: found.categoryId,
              groupTitle: found.groupTitle,
              badge: found.item.badge || "",
              oldHref: found.item.href,
              isExistingInNavbar: true,
              removeIfExists: false,
            });
          } else {
            setExistingMatch(null);
            if (!value.menuKey) {
              const initialMenuKey =
                navMenus.find((m) => m.key === defaultMenuKey)?.key ||
                navMenus[0]?.key ||
                defaultMenuKey;
              const targetMenu = navMenus.find((m) => m.key === initialMenuKey);
              const firstCat = targetMenu?.categories?.[0];
              const firstGroup = firstCat?.groups?.[0];

              onChange({
                ...value,
                menuKey: initialMenuKey,
                categoryId: firstCat?.id || firstCat?.title || "",
                groupTitle: firstGroup?.title || "Featured",
                isExistingInNavbar: false,
              });
            }
          }
        }
      })
      .catch((err) => console.error("Failed to load nav menus:", err))
      .finally(() => setIsLoading(false));
  }, [slug, originalSlug]);

  const selectedMenu = menus.find((m) => m.key === (value.menuKey || defaultMenuKey));
  const availableCategories = selectedMenu?.categories || [];
  const selectedCategory = availableCategories.find(
    (c) => c.id === value.categoryId || c.title === value.categoryId
  );
  const availableGroups = selectedCategory?.groups || [];

  const handleMenuChange = (menuKey: string) => {
    const targetMenu = menus.find((m) => m.key === menuKey);
    const firstCat = targetMenu?.categories?.[0];
    const firstGroup = firstCat?.groups?.[0];
    onChange({
      ...value,
      menuKey,
      categoryId: firstCat?.id || firstCat?.title || "",
      groupTitle: firstGroup?.title || "Featured",
    });
  };

  const handleCategoryChange = (catVal: string) => {
    if (catVal === "__custom__") {
      setIsCustomCategory(true);
      return;
    }
    setIsCustomCategory(false);
    const foundCat = availableCategories.find((c) => c.id === catVal || c.title === catVal);
    const firstGroup = foundCat?.groups?.[0];
    onChange({
      ...value,
      categoryId: catVal,
      groupTitle: firstGroup?.title || value.groupTitle || "Featured",
    });
  };

  // Immediate removal button
  const handleRemoveImmediately = async () => {
    if (!confirm("Are you sure you want to remove this link from the navbar immediately?")) {
      return;
    }

    setIsRemoving(true);
    try {
      const hrefsToRemove = [originalHref, targetHref, value.oldHref].filter((h): h is string =>
        Boolean(h)
      );
      await removeLinkFromNavbarAction(hrefsToRemove);
      setExistingMatch(null);
      setRemovalSuccess(true);
      onChange({
        ...value,
        enabled: false,
        oldHref: undefined,
        removeIfExists: false,
        isExistingInNavbar: false,
      });
      // Refresh menus
      const refreshed = await fetch("/api/navigation").then((r) => r.json());
      if (refreshed.success && Array.isArray(refreshed.data)) {
        setMenus(refreshed.data);
      }
      setTimeout(() => setRemovalSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to remove navbar item immediately:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  const isExisting = Boolean(existingMatch);
  const hasModifications =
    isExisting &&
    (value.menuKey !== existingMatch?.menuKey ||
      value.categoryId !== existingMatch?.categoryId ||
      value.groupTitle !== existingMatch?.groupTitle ||
      (value.badge || "") !== (existingMatch?.item.badge || ""));

  return (
    <div
      className={`rounded-[4px] border p-4 space-y-3 transition-colors ${
        isExisting
          ? "bg-[#98ff03]/5 dark:bg-[#98ff03]/10 border-[#98ff03]/40 dark:border-[#98ff03]/30"
          : "bg-zinc-50/70 dark:bg-white/[0.02] border-zinc-200/90 dark:border-white/10"
      }`}
    >
      {/* Header & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`addToNavbarToggle-${contentType}`}
            checked={value.enabled}
            onChange={(e) => {
              const checked = e.target.checked;
              onChange({
                ...value,
                enabled: checked,
                removeIfExists: !checked && isExisting,
              });
            }}
            className="mt-0.5 rounded border-zinc-300 dark:border-zinc-600 text-[#292c2e] focus:ring-[#98ff03] size-4 cursor-pointer accent-[#98ff03]"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <label
                htmlFor={`addToNavbarToggle-${contentType}`}
                className="font-space text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Menu className="size-3.5 text-[#292c2e] dark:text-[#98ff03]" />
                <span>
                  {isExisting ? "Navbar Integration Active" : `Add this ${contentType} to Site Navbar`}
                </span>
              </label>

              {/* Status Pill: ADDED */}
              {isExisting && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-[#98ff03] text-black font-space font-bold text-[10px] uppercase tracking-wider shadow-2xs">
                  <CheckCircle2 className="size-3 text-black" />
                  Added to Navbar
                </span>
              )}

              {/* Status Pill: EDITED */}
              {hasModifications && value.enabled && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700 font-space font-semibold text-[10px] uppercase tracking-wider">
                  <Edit3 className="size-3" />
                  Edited (Updates on Save)
                </span>
              )}
            </div>

            <p className="font-inter text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isExisting ? (
                <span>
                  Currently in{" "}
                  <strong className="text-zinc-800 dark:text-zinc-200 font-space">
                    {existingMatch?.menuLabel} &gt; {existingMatch?.categoryTitle} &gt;{" "}
                    {existingMatch?.groupTitle}
                  </strong>
                  . You can edit its placement, sub-group, or badge below.
                </span>
              ) : (
                "Automatically place a direct navigation link into the dropdown menu under the chosen category."
              )}
            </p>
          </div>
        </div>

        {/* Quick Removal Button if already in navbar */}
        {isExisting && (
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleRemoveImmediately}
              disabled={isRemoving}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-space font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-[3px] transition-all cursor-pointer disabled:opacity-50"
              title="Remove this link from the navbar immediately"
            >
              <Trash2 className="size-3" />
              <span>{isRemoving ? "Removing..." : "Remove from Navbar"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Immediate removal feedback */}
      {removalSuccess && (
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-[3px] text-xs font-space text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 animate-in fade-in duration-150">
          <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Successfully removed link from the site navigation.</span>
        </div>
      )}

      {/* Pending Uncheck Warning */}
      {isExisting && !value.enabled && (
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-[3px] text-xs font-space text-amber-800 dark:text-amber-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Link is unchecked: It will be removed from the navbar when you save.</span>
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...value, enabled: true, removeIfExists: false })}
            className="text-[10px] font-bold underline hover:text-amber-950 dark:hover:text-amber-200 uppercase"
          >
            Keep in Navbar
          </button>
        </div>
      )}

      {/* Expanded Configuration & Editing Section */}
      {value.enabled && (
        <div className="pt-3 border-t border-zinc-200/70 dark:border-white/10 space-y-3 animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Target Nav Menu */}
            <div className="space-y-1">
              <label className="font-space text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Target Navigation Menu</span>
                {isExisting && value.menuKey !== existingMatch?.menuKey && (
                  <span className="text-[9px] text-sky-600 dark:text-sky-400 font-mono">Moving Menu</span>
                )}
              </label>
              <select
                value={value.menuKey || defaultMenuKey}
                onChange={(e) => handleMenuChange(e.target.value)}
                className="w-full border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] font-space text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#16181b] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
              >
                {menus.length > 0 ? (
                  menus.map((menu) => (
                    <option key={menu.key} value={menu.key}>
                      {menu.label} (/{menu.key})
                    </option>
                  ))
                ) : (
                  <option value={defaultMenuKey}>
                    {defaultMenuKey.charAt(0).toUpperCase() + defaultMenuKey.slice(1)}
                  </option>
                )}
              </select>
            </div>

            {/* 2. Target Category */}
            <div className="space-y-1">
              <label className="font-space text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Category in Mega-Menu</span>
                {isExisting && value.categoryId !== existingMatch?.categoryId && (
                  <span className="text-[9px] text-sky-600 dark:text-sky-400 font-mono">Moving Category</span>
                )}
              </label>
              {isCustomCategory ? (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Enter custom category name"
                    value={customCategoryTitle}
                    onChange={(e) => {
                      setCustomCategoryTitle(e.target.value);
                      onChange({ ...value, categoryId: e.target.value });
                    }}
                    className="flex-1 border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] font-space text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#16181b] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="px-2 py-1 text-[10px] font-space uppercase font-bold bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200 rounded-[3px]"
                  >
                    List
                  </button>
                </div>
              ) : (
                <select
                  value={value.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] font-space text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#16181b] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                >
                  {availableCategories.length > 0 ? (
                    availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))
                  ) : (
                    <option value="Featured">Featured Highlights</option>
                  )}
                  <option value="__custom__">+ Custom Category...</option>
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 3. Sub-Group Title */}
            <div className="space-y-1">
              <label className="font-space text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Sub-Group Header</span>
                {isExisting && value.groupTitle !== existingMatch?.groupTitle && (
                  <span className="text-[9px] text-sky-600 dark:text-sky-400 font-mono">Moving Group</span>
                )}
              </label>
              <input
                type="text"
                list={`groups-list-${contentType}`}
                placeholder="e.g. Featured, Case Studies, Recent"
                value={value.groupTitle || ""}
                onChange={(e) => onChange({ ...value, groupTitle: e.target.value })}
                className="w-full border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] font-space text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#16181b] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
              />
              <datalist id={`groups-list-${contentType}`}>
                {availableGroups.map((g, idx) => (
                  <option key={idx} value={g.title} />
                ))}
              </datalist>
            </div>

            {/* 4. Optional Badge */}
            <div className="space-y-1">
              <label className="font-space text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400 block">
                Link Badge / Tag (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. NEW, HOT, 2026"
                value={value.badge || ""}
                onChange={(e) => onChange({ ...value, badge: e.target.value })}
                className="w-full border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] font-space text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-[#16181b] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none uppercase"
              />
            </div>
          </div>

          {/* Live Slug & Link Preview */}
          <div className="p-2.5 bg-white dark:bg-[#16181b] border border-zinc-200 dark:border-white/10 rounded-[3px] flex items-center justify-between gap-2 shadow-2xs">
            <div className="min-w-0 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#98ff03] shrink-0" />
              <div className="truncate">
                <span className="font-space font-semibold text-xs text-zinc-900 dark:text-zinc-100 mr-2">
                  {title || "Link Title"}
                </span>
                <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                  {targetHref}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {value.badge && (
                <span className="text-[9px] font-space uppercase font-bold px-1.5 py-0.2 bg-[#98ff03]/25 text-black dark:text-[#98ff03] border border-[#98ff03]/40 rounded">
                  {value.badge}
                </span>
              )}
              {isExisting && (
                <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
                  (In Navbar)
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToNavbarSelector;
