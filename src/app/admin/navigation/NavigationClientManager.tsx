"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MegaMenuConfig,
  MegaMenuCategory,
  MegaMenuGroup,
  MegaMenuItem,
  defaultNavMenus,
} from "@/data/navigation-data";
import {
  Menu,
  Layers,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  ExternalLink,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  FolderTree,
  Sparkles,
  Brain,
  Code2,
  Cloud,
  Users2,
  Bot,
  Building2,
  Cpu,
  TrendingUp,
  Server,
  Globe,
  ShieldCheck,
  Briefcase,
  Compass,
  Zap,
  BookOpen,
  Palette,
  Tag,
  Link as LinkIcon,
  X,
  Eye,
  Sliders,
  ArrowRight,
  Loader2,
  LucideIcon,
} from "lucide-react";

import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";

// Available Icon Options for Categories
const ICON_OPTIONS: { name: string; icon: LucideIcon }[] = [
  { name: "Brain", icon: Brain },
  { name: "Code2", icon: Code2 },
  { name: "Cloud", icon: Cloud },
  { name: "Users2", icon: Users2 },
  { name: "Bot", icon: Bot },
  { name: "Building2", icon: Building2 },
  { name: "Cpu", icon: Cpu },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "Layers", icon: Layers },
  { name: "Server", icon: Server },
  { name: "Globe", icon: Globe },
  { name: "ShieldCheck", icon: ShieldCheck },
  { name: "Briefcase", icon: Briefcase },
  { name: "Compass", icon: Compass },
  { name: "Zap", icon: Zap },
  { name: "BookOpen", icon: BookOpen },
  { name: "Palette", icon: Palette },
  { name: "Sparkles", icon: Sparkles },
];

function CategoryIconPreview({ name, className }: { name?: string; className?: string }) {
  const found = ICON_OPTIONS.find((opt) => opt.name === name);
  const IconComp = found?.icon || Sparkles;
  return <IconComp className={className || "size-4"} />;
}

interface NavigationClientManagerProps {
  initialMenus: MegaMenuConfig[];
}

export default function NavigationClientManager({
  initialMenus,
}: NavigationClientManagerProps) {
  const [menus, setMenus] = useState<MegaMenuConfig[]>(
    initialMenus.length > 0 ? initialMenus : defaultNavMenus
  );
  const [selectedKey, setSelectedKey] = useState<string>(menus[0]?.key || "services");
  const [isJsonMode, setIsJsonMode] = useState<boolean>(false);
  const [editingConfigJson, setEditingConfigJson] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [batchTranslating, setBatchTranslating] = useState<boolean>(false);
  
  // Translation tab states for modals
  const [activeMenuTranslationLocale, setActiveMenuTranslationLocale] = useState<string>("om");
  const [activeCatTranslationLocale, setActiveCatTranslationLocale] = useState<string>("om");
  const [activeGrpTranslationLocale, setActiveGrpTranslationLocale] = useState<string>("om");
  const [activeNavTranslationLocale, setActiveNavTranslationLocale] = useState<string>("om");
  
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // Active menu being edited
  const currentMenu = menus.find((m) => m.key === selectedKey) || menus[0];

  // Modals state
  const [menuModal, setMenuModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data: Partial<MegaMenuConfig>;
  }>({
    isOpen: false,
    mode: "create",
    data: {},
  });

  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    index?: number;
    data: Partial<MegaMenuCategory>;
  }>({
    isOpen: false,
    mode: "create",
    data: {},
  });

  const [groupModal, setGroupModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    categoryIndex: number;
    groupIndex?: number;
    data: Partial<MegaMenuGroup>;
  }>({
    isOpen: false,
    mode: "create",
    categoryIndex: 0,
    data: {},
  });

  const [itemModal, setItemModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    categoryIndex: number;
    groupIndex: number;
    itemIndex?: number;
    data: Partial<MegaMenuItem>;
  }>({
    isOpen: false,
    mode: "create",
    categoryIndex: 0,
    groupIndex: 0,
    data: {},
  });

  // Switch selected menu
  const handleSelectMenu = (key: string) => {
    setSelectedKey(key);
    const menu = menus.find((m) => m.key === key);
    if (menu) {
      setEditingConfigJson(JSON.stringify(menu, null, 2));
    }
  };

  // Save full menu config to server
  const handleSaveMenu = async (menuToSave: MegaMenuConfig) => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuToSave),
      });
      const data = await res.json();
      if (data.success) {
        setMenus((prev) => {
          const exists = prev.some((m) => m.key === menuToSave.key);
          if (exists) {
            return prev.map((m) => (m.key === menuToSave.key ? menuToSave : m));
          }
          return [...prev, menuToSave].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        });
        setFeedback({
          type: "success",
          message: `Saved "${menuToSave.label}" navigation settings!`,
        });
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to save menu" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Network error" });
    } finally {
      setSaving(false);
    }
  };

  // Delete a menu
  const handleDeleteMenu = async (key: string) => {
    if (!confirm(`Are you sure you want to delete the "${key}" menu from the navbar?`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/navigation?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        const remaining = menus.filter((m) => m.key !== key);
        setMenus(remaining);
        if (selectedKey === key && remaining.length > 0) {
          setSelectedKey(remaining[0].key);
        }
        setFeedback({ type: "success", message: `Deleted menu "${key}" successfully.` });
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to delete menu" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Network error" });
    } finally {
      setSaving(false);
    }
  };

  // Reset to default seed values
  const handleResetToDefault = async () => {
    if (!confirm("Are you sure you want to reset all menus to seed defaults?")) return;
    setSaving(true);
    try {
      for (const defMenu of defaultNavMenus) {
        await fetch("/api/navigation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(defMenu),
        });
      }
      setMenus(defaultNavMenus);
      setSelectedKey(defaultNavMenus[0].key);
      setFeedback({ type: "success", message: "Reset navigation to seed presets successfully!" });
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to reset presets" });
    } finally {
      setSaving(false);
    }
  };

  // Save Raw JSON
  const handleSaveJson = async () => {
    try {
      const parsed = JSON.parse(editingConfigJson) as MegaMenuConfig;
      await handleSaveMenu(parsed);
    } catch (err: any) {
      setFeedback({ type: "error", message: `Invalid JSON format: ${err.message}` });
    }
  };

  // Helper to batch translate a single menu tree into Oromo, Amharic, German, and Polish
  const translateMenuTree = async (menuToTranslate: MegaMenuConfig): Promise<MegaMenuConfig> => {
    const sourceTexts: Record<string, string> = {};

    if (menuToTranslate.label) sourceTexts["menu_label"] = menuToTranslate.label;
    if (menuToTranslate.footer?.label) sourceTexts["footer_label"] = menuToTranslate.footer.label;
    if (menuToTranslate.footer?.ctaLabel) sourceTexts["footer_cta"] = menuToTranslate.footer.ctaLabel;

    (menuToTranslate.categories || []).forEach((cat, cIdx) => {
      if (cat.title) sourceTexts[`cat_${cIdx}_title`] = cat.title;

      (cat.groups || []).forEach((grp, gIdx) => {
        if (grp.title) sourceTexts[`grp_${cIdx}_${gIdx}_title`] = grp.title;

        (grp.items || []).forEach((itm, iIdx) => {
          if (itm.title) sourceTexts[`itm_${cIdx}_${gIdx}_${iIdx}_title`] = itm.title;
          if (itm.badge) sourceTexts[`itm_${cIdx}_${gIdx}_${iIdx}_badge`] = itm.badge;
          if (itm.description) sourceTexts[`itm_${cIdx}_${gIdx}_${iIdx}_desc`] = itm.description;
        });
      });
    });

    if (Object.keys(sourceTexts).length === 0) return menuToTranslate;

    const targetLangs = ["om", "am", "de", "pl"];
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceTexts,
        sourceLang: "en",
        targetLangs,
      }),
    });

    const data = await res.json();
    if (!data.success || !data.translations) {
      throw new Error(data.error || "Batch translation failed");
    }

    const translationsByLang = data.translations as Record<string, Record<string, string>>;
    const updatedMenu: MegaMenuConfig = JSON.parse(JSON.stringify(menuToTranslate));
    if (!updatedMenu.translations) updatedMenu.translations = {};

    targetLangs.forEach((lang) => {
      const langData = translationsByLang[lang] || {};
      if (!updatedMenu.translations![lang]) updatedMenu.translations![lang] = {};

      if (langData["menu_label"]) updatedMenu.translations![lang].label = langData["menu_label"];
      if (langData["footer_label"]) updatedMenu.translations![lang].footerLabel = langData["footer_label"];
      if (langData["footer_cta"]) updatedMenu.translations![lang].footerCtaLabel = langData["footer_cta"];
    });

    (updatedMenu.categories || []).forEach((cat, cIdx) => {
      if (!cat.translations) cat.translations = {};
      targetLangs.forEach((lang) => {
        const langData = translationsByLang[lang] || {};
        if (!cat.translations![lang]) cat.translations![lang] = {};
        if (langData[`cat_${cIdx}_title`]) {
          cat.translations![lang].title = langData[`cat_${cIdx}_title`];
        }
      });

      (cat.groups || []).forEach((grp, gIdx) => {
        if (!grp.translations) grp.translations = {};
        targetLangs.forEach((lang) => {
          const langData = translationsByLang[lang] || {};
          if (!grp.translations![lang]) grp.translations![lang] = {};
          if (langData[`grp_${cIdx}_${gIdx}_title`]) {
            grp.translations![lang].title = langData[`grp_${cIdx}_${gIdx}_title`];
          }
        });

        (grp.items || []).forEach((itm, iIdx) => {
          if (!itm.translations) itm.translations = {};
          targetLangs.forEach((lang) => {
            const langData = translationsByLang[lang] || {};
            if (!itm.translations![lang]) itm.translations![lang] = {};
            if (langData[`itm_${cIdx}_${gIdx}_${iIdx}_title`]) {
              itm.translations![lang].title = langData[`itm_${cIdx}_${gIdx}_${iIdx}_title`];
            }
            if (langData[`itm_${cIdx}_${gIdx}_${iIdx}_badge`]) {
              itm.translations![lang].badge = langData[`itm_${cIdx}_${gIdx}_${iIdx}_badge`];
            }
            if (langData[`itm_${cIdx}_${gIdx}_${iIdx}_desc`]) {
              itm.translations![lang].description = langData[`itm_${cIdx}_${gIdx}_${iIdx}_desc`];
            }
          });
        });
      });
    });

    return updatedMenu;
  };

  // Batch translate active menu
  const handleBatchTranslateCurrentMenu = async () => {
    if (!currentMenu) return;
    setBatchTranslating(true);
    setFeedback(null);
    try {
      const translated = await translateMenuTree(currentMenu);
      await handleSaveMenu(translated);
      setFeedback({
        type: "success",
        message: `Successfully translated "${translated.label}" and all child categories/links into Oromo, Amharic, German & Polish!`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to batch translate menu" });
    } finally {
      setBatchTranslating(false);
    }
  };

  // Batch translate all menus
  const handleBatchTranslateAllMenus = async () => {
    if (!confirm("This will AI auto-translate ALL navbar menus, categories, groups and links into 4 languages. Proceed?")) return;
    setBatchTranslating(true);
    setFeedback(null);
    try {
      for (const menu of menus) {
        const translated = await translateMenuTree(menu);
        await fetch("/api/navigation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(translated),
        });
      }
      const res = await fetch("/api/navigation");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMenus(data.data);
      }
      setFeedback({
        type: "success",
        message: "Successfully AI-translated all navigation menus and child links into 4 languages!",
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to translate all menus" });
    } finally {
      setBatchTranslating(false);
    }
  };

  // --- Handlers for Form Modals ---

  // 1. Menu Save
  const handleMenuModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = menuModal.data;
    if (!data.label || !data.key || !data.href) return;

    const newMenu: MegaMenuConfig = {
      key: data.key.trim().toLowerCase().replace(/\s+/g, "-"),
      label: data.label.trim(),
      href: data.href.trim(),
      order: Number(data.order || menus.length + 1),
      isActive: data.isActive !== false,
      categories: data.categories || [],
      footer: data.footer,
      translations: data.translations,
    };

    await handleSaveMenu(newMenu);
    setSelectedKey(newMenu.key);
    setMenuModal({ isOpen: false, mode: "create", data: {} });
  };

  // 2. Category Save
  const handleCategoryModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMenu) return;
    const catData = categoryModal.data;
    if (!catData.title || !catData.id) return;

    const updatedCategories = [...(currentMenu.categories || [])];
    const newCategory: MegaMenuCategory = {
      id: catData.id.trim().toLowerCase().replace(/\s+/g, "-"),
      title: catData.title.trim(),
      iconName: catData.iconName || "Sparkles",
      groups: catData.groups || [],
      translations: catData.translations,
    };

    if (categoryModal.mode === "edit" && typeof categoryModal.index === "number") {
      updatedCategories[categoryModal.index] = {
        ...updatedCategories[categoryModal.index],
        ...newCategory,
      };
    } else {
      updatedCategories.push(newCategory);
    }

    const updatedMenu = { ...currentMenu, categories: updatedCategories };
    await handleSaveMenu(updatedMenu);
    setCategoryModal({ isOpen: false, mode: "create", data: {} });
  };

  // Category Delete
  const handleDeleteCategory = async (catIndex: number) => {
    if (!confirm("Are you sure you want to remove this category and all its links?")) return;
    const updatedCategories = currentMenu.categories.filter((_, idx) => idx !== catIndex);
    const updatedMenu = { ...currentMenu, categories: updatedCategories };
    await handleSaveMenu(updatedMenu);
  };

  // 3. Group Save
  const handleGroupModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMenu) return;
    const { categoryIndex, groupIndex, mode, data: grpData } = groupModal;
    if (!grpData.title) return;

    const updatedCategories = [...currentMenu.categories];
    const category = { ...updatedCategories[categoryIndex] };
    const updatedGroups = [...(category.groups || [])];

    const newGroup: MegaMenuGroup = {
      title: grpData.title.trim(),
      href: grpData.href ? grpData.href.trim() : undefined,
      iconName: grpData.iconName,
      items: grpData.items || [],
      translations: grpData.translations,
    };

    if (mode === "edit" && typeof groupIndex === "number") {
      updatedGroups[groupIndex] = { ...updatedGroups[groupIndex], ...newGroup };
    } else {
      updatedGroups.push(newGroup);
    }

    category.groups = updatedGroups;
    updatedCategories[categoryIndex] = category;
    const updatedMenu = { ...currentMenu, categories: updatedCategories };
    await handleSaveMenu(updatedMenu);
    setGroupModal({ isOpen: false, mode: "create", categoryIndex: 0, data: {} });
  };

  // Group Delete
  const handleDeleteGroup = async (categoryIndex: number, groupIndex: number) => {
    if (!confirm("Are you sure you want to remove this group and all its sub-links?")) return;
    const updatedCategories = [...currentMenu.categories];
    const category = { ...updatedCategories[categoryIndex] };
    category.groups = category.groups.filter((_, idx) => idx !== groupIndex);
    updatedCategories[categoryIndex] = category;
    const updatedMenu = { ...currentMenu, categories: updatedCategories };
    await handleSaveMenu(updatedMenu);
  };

  // 4. Item / Link Save
  const handleItemModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMenu) return;
    const { categoryIndex, groupIndex, itemIndex, mode, data: itemData } = itemModal;
    if (!itemData.title || !itemData.href) return;

    const updatedCategories = [...currentMenu.categories];
    const category = { ...updatedCategories[categoryIndex] };
    const updatedGroups = [...category.groups];
    const group = { ...updatedGroups[groupIndex] };
    const updatedItems = [...group.items];

    const newItem: MegaMenuItem = {
      title: itemData.title.trim(),
      href: itemData.href.trim(),
      badge: itemData.badge?.trim() || undefined,
      description: itemData.description?.trim() || undefined,
      translations: itemData.translations,
    };

    if (mode === "edit" && typeof itemIndex === "number") {
      updatedItems[itemIndex] = newItem;
    } else {
      updatedItems.push(newItem);
    }

    group.items = updatedItems;
    updatedGroups[groupIndex] = group;
    category.groups = updatedGroups;
    updatedCategories[categoryIndex] = category;
    const updatedMenu = { ...currentMenu, categories: updatedCategories };
    await handleSaveMenu(updatedMenu);
    setItemModal({ isOpen: false, mode: "create", categoryIndex: 0, groupIndex: 0, data: {} });
  };

  // Item Delete
  const handleDeleteItem = async (categoryIndex: number, groupIndex: number, itemIndex: number) => {
    const updatedCategories = [...currentMenu.categories];
    const category = { ...updatedCategories[categoryIndex] };
    const updatedGroups = [...category.groups];
    const group = { ...updatedGroups[groupIndex] };
    group.items = group.items.filter((_, idx) => idx !== itemIndex);
    updatedGroups[groupIndex] = group;
    category.groups = updatedGroups;
    updatedCategories[categoryIndex] = category;
    const updatedMenu = { ...currentMenu, categories: updatedCategories };
    await handleSaveMenu(updatedMenu);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header with Matii Architectural Corner Accents */}
      <div className="bg-white dark:bg-[#16181b] p-6 border border-zinc-200/80 dark:border-white/10 shadow-sm relative rounded-[4px]">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#292c2e] dark:bg-[#98ff03] text-[#98ff03] dark:text-black rounded-[4px]">
                <Menu className="size-4" />
              </div>
              <h1 className="text-xl font-space font-bold tracking-tight text-[#292c2e] dark:text-zinc-100">
                Navigation & Mega-Menu Studio
              </h1>
            </div>
            <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Visually create, customize, and reorder navigation tabs, labels, categories, and dropdown links without writing JSON.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleBatchTranslateCurrentMenu}
              disabled={batchTranslating || saving || !currentMenu}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space font-semibold bg-[#98ff03]/15 hover:bg-[#98ff03]/25 text-black dark:text-[#98ff03] border border-[#98ff03]/30 rounded-[4px] transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50 shadow-2xs"
              title="AI Auto-Translate this entire active menu (all categories, groups, links & footer) into Oromo, Amharic, German & Polish"
            >
              {batchTranslating ? (
                <Loader2 className="size-3.5 animate-spin text-black dark:text-[#98ff03]" />
              ) : (
                <Sparkles className="size-3.5 text-black dark:text-[#98ff03]" />
              )}
              <span>{batchTranslating ? "Translating Tree..." : "AI Translate Menu"}</span>
            </button>

            <button
              type="button"
              onClick={handleBatchTranslateAllMenus}
              disabled={batchTranslating || saving}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space font-medium border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[4px] text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50"
              title="AI Auto-Translate all navbar menus at once"
            >
              <Sparkles className="size-3.5 text-zinc-500 dark:text-[#98ff03]" />
              <span>Translate All Menus</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              disabled={saving || batchTranslating}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space font-medium border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[4px] text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50"
              title="Reset all menus to system default presets"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset to Seed</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsJsonMode(!isJsonMode);
                if (!isJsonMode && currentMenu) {
                  setEditingConfigJson(JSON.stringify(currentMenu, null, 2));
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space font-medium border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[4px] text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.96] cursor-pointer"
            >
              <Sliders className="size-3.5" />
              <span>{isJsonMode ? "Visual Form Builder" : "Advanced JSON"}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setMenuModal({
                  isOpen: true,
                  mode: "create",
                  data: {
                    label: "",
                    key: "",
                    href: "/",
                    order: menus.length + 1,
                    isActive: true,
                    categories: [],
                  },
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition-all active:scale-[0.96] cursor-pointer"
            >
              <Plus className="size-3.5 text-[#98ff03] dark:text-black" />
              <span>Add New Nav Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Alert Toast */}
      {feedback && (
        <div
          className={`p-3.5 rounded-[4px] flex items-center gap-2.5 text-xs font-inter border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <Check className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="size-4 text-red-600 dark:text-red-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Horizontal Navbar Tabs */}
      <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 p-2 rounded-[4px] flex items-center gap-1.5 overflow-x-auto shadow-2xs">
        {menus.map((menu) => {
          const isSelected = selectedKey === menu.key;
          const hasDropdown = Boolean(menu.categories && menu.categories.length > 0);
          return (
            <button
              key={menu.key}
              onClick={() => handleSelectMenu(menu.key)}
              className={`px-3.5 py-2 text-xs font-space rounded-[3px] transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black font-semibold shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
              }`}
            >
              <span>{menu.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? "bg-[#98ff03] dark:bg-black text-black dark:text-[#98ff03] font-bold" : "bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {hasDropdown ? `${menu.categories.length} Cats` : "Link"}
              </span>
              {!menu.isActive && (
                <span className="size-1.5 rounded-full bg-amber-500" title="Inactive (hidden)" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Visual Form Editor or Advanced JSON */}
      {isJsonMode ? (
        <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-space font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Raw JSON Editor: {currentMenu?.label}
              </h3>
              <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500">
                Directly view or modify the complete structured schema for this navigation node.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveJson}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase tracking-wider rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer disabled:opacity-50"
            >
              <Save className="size-3.5 text-[#98ff03] dark:text-black" />
              <span>{saving ? "Saving..." : "Save JSON Changes"}</span>
            </button>
          </div>
          <textarea
            value={editingConfigJson}
            onChange={(e) => setEditingConfigJson(e.target.value)}
            rows={24}
            className="w-full font-mono text-xs p-4 rounded-[4px] bg-[#161819] dark:bg-[#121417] text-zinc-100 border border-zinc-800 dark:border-white/10 focus:outline-none focus:border-[#98ff03] leading-relaxed"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Menu Meta Summary Card */}
          <div className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 p-5 rounded-[4px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-space font-bold text-base text-[#292c2e] dark:text-zinc-100">
                  {currentMenu?.label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 font-mono">
                  key: {currentMenu?.key}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 font-mono">
                  order: #{currentMenu?.order}
                </span>
                <span
                  className={`text-[10px] font-space uppercase px-2 py-0.5 rounded font-bold ${
                    currentMenu?.isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {currentMenu?.isActive ? "Active on Site" : "Hidden / Inactive"}
                </span>
              </div>
              <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400">
                Primary route: <span className="font-mono text-zinc-700 dark:text-zinc-300">{currentMenu?.href}</span>
                {currentMenu?.footer && (
                  <>
                    {" "}
                    • Footer Banner CTA:{" "}
                    <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">
                      &ldquo;{currentMenu.footer.ctaLabel}&rdquo;
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBatchTranslateCurrentMenu}
                disabled={batchTranslating || saving}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-semibold bg-[#98ff03]/15 hover:bg-[#98ff03]/25 text-black dark:text-[#98ff03] border border-[#98ff03]/30 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50"
                title="AI Auto-Translate this entire menu into Oromo, Amharic, German & Polish"
              >
                {batchTranslating ? (
                  <Loader2 className="size-3 animate-spin text-black dark:text-[#98ff03]" />
                ) : (
                  <Sparkles className="size-3 text-black dark:text-[#98ff03]" />
                )}
                <span>{batchTranslating ? "Translating..." : "AI Translate Tree"}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setMenuModal({
                    isOpen: true,
                    mode: "edit",
                    data: { ...currentMenu },
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-medium border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.96] cursor-pointer"
              >
                <Edit2 className="size-3 text-zinc-500 dark:text-zinc-400" />
                <span>Edit Menu Meta</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteMenu(currentMenu.key)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-800 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer"
              >
                <Trash2 className="size-3" />
                <span>Delete Menu</span>
              </button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="size-4 text-[#292c2e] dark:text-[#98ff03]" />
                  <span>Mega-Menu Categories ({currentMenu?.categories?.length || 0})</span>
                </h3>
                <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Left-sidebar categories and right-column navigation groups shown in the mega dropdown.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCategoryModal({
                    isOpen: true,
                    mode: "create",
                    data: {
                      title: "",
                      id: "",
                      iconName: "Sparkles",
                      groups: [],
                    },
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer shadow-2xs"
              >
                <Plus className="size-3.5 text-[#98ff03] dark:text-black" />
                <span>Add Category</span>
              </button>
            </div>

            {(!currentMenu?.categories || currentMenu.categories.length === 0) ? (
              <div className="bg-white dark:bg-[#16181b] border border-dashed border-zinc-300 dark:border-white/15 p-8 rounded-[4px] text-center space-y-3">
                <div className="size-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center mx-auto text-zinc-400 dark:text-zinc-300">
                  <LinkIcon className="size-5" />
                </div>
                <div>
                  <p className="font-space font-bold text-sm text-zinc-800 dark:text-zinc-100">
                    Direct Navbar Link (No Dropdown)
                  </p>
                  <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-md mx-auto">
                    This item links directly to <code className="font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded">{currentMenu?.href}</code>. If you want it to display a 2-column mega menu, click below to add its first category.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCategoryModal({
                      isOpen: true,
                      mode: "create",
                      data: {
                        title: "",
                        id: "",
                        iconName: "Sparkles",
                        groups: [],
                      },
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer shadow-2xs"
                >
                  <Plus className="size-3.5 text-[#98ff03] dark:text-black" />
                  <span>Convert to Mega-Menu & Add Category</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {currentMenu.categories.map((category, catIdx) => (
                  <div
                    key={category.id || catIdx}
                    className="bg-white dark:bg-[#16181b] border border-zinc-200/90 dark:border-white/10 rounded-[4px] shadow-sm overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className="bg-[#f8f9fa] dark:bg-white/[0.02] border-b border-zinc-200/80 dark:border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-[4px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#292c2e] dark:text-[#98ff03] shadow-2xs shrink-0">
                          <CategoryIconPreview name={category.iconName} className="size-4 text-[#292c2e] dark:text-[#98ff03]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-space font-bold text-sm text-[#292c2e] dark:text-zinc-100">
                              {category.title}
                            </h4>
                            <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-400 bg-white dark:bg-white/5 px-1.5 py-0.2 rounded border border-zinc-200 dark:border-white/10">
                              id: {category.id}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500">
                            Icon: <span className="font-mono text-zinc-600 dark:text-zinc-300">{category.iconName}</span> • {category.groups?.length || 0} sub-groups
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setGroupModal({
                              isOpen: true,
                              mode: "create",
                              categoryIndex: catIdx,
                              data: { title: "", href: "", items: [] },
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-space font-medium bg-white dark:bg-[#1f2224] hover:bg-zinc-50 dark:hover:bg-[#282b2e] border border-zinc-200 dark:border-white/10 rounded-[3px] text-zinc-700 dark:text-zinc-200 active:scale-[0.96] transition-all cursor-pointer shadow-2xs"
                        >
                          <Plus className="size-3 text-[#292c2e] dark:text-[#98ff03]" />
                          <span>Add Sub-Group</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setCategoryModal({
                              isOpen: true,
                              mode: "edit",
                              index: catIdx,
                              data: { ...category },
                            })
                          }
                          className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-[3px] transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-white/10 cursor-pointer"
                          title="Edit Category Details"
                        >
                          <Edit2 className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(catIdx)}
                          className="p-1.5 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-[3px] transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sub-Groups inside Category */}
                    <div className="p-4 space-y-4">
                      {(!category.groups || category.groups.length === 0) ? (
                        <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500 italic py-2">
                          No sub-groups added yet. Click &ldquo;Add Sub-Group&rdquo; to create section headers for links.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {category.groups.map((group, grpIdx) => (
                            <div
                              key={grpIdx}
                              className="border border-zinc-200/80 dark:border-white/10 rounded-[4px] p-3.5 bg-zinc-50/50 dark:bg-white/[0.02] space-y-3"
                            >
                              {/* Group Header */}
                              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-white/10">
                                <div className="flex items-center gap-2">
                                  <FolderTree className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                                  <span className="font-space font-bold text-xs text-zinc-800 dark:text-zinc-100 uppercase tracking-wider">
                                    {group.title}
                                  </span>
                                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                                    ({group.items?.length || 0})
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setItemModal({
                                        isOpen: true,
                                        mode: "create",
                                        categoryIndex: catIdx,
                                        groupIndex: grpIdx,
                                        data: { title: "", href: "", badge: "", description: "" },
                                      })
                                    }
                                    className="px-2 py-0.5 text-[10px] font-space uppercase font-bold bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black rounded-[3px] transition-transform active:scale-[0.96] flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus className="size-2.5 text-[#98ff03] dark:text-black" />
                                    <span>Add Link</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setGroupModal({
                                        isOpen: true,
                                        mode: "edit",
                                        categoryIndex: catIdx,
                                        groupIndex: grpIdx,
                                        data: { ...group },
                                      })
                                    }
                                    className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded transition-colors cursor-pointer"
                                    title="Edit Sub-Group"
                                  >
                                    <Edit2 className="size-3" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGroup(catIdx, grpIdx)}
                                    className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors cursor-pointer"
                                    title="Delete Sub-Group"
                                  >
                                    <Trash2 className="size-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Items List */}
                              <div className="space-y-1.5">
                                {(!group.items || group.items.length === 0) ? (
                                  <p className="font-inter text-[11px] text-zinc-400 dark:text-zinc-500 italic">
                                    No links in this group yet. Click &ldquo;Add Link&rdquo; above.
                                  </p>
                                ) : (
                                  group.items.map((item, itmIdx) => (
                                    <div
                                      key={itmIdx}
                                      className="flex items-center justify-between p-2 rounded-[3px] bg-white dark:bg-[#121417] border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-colors group"
                                    >
                                      <div className="min-w-0 flex-1 pr-2">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-space font-medium text-xs text-[#292c2e] dark:text-zinc-100 truncate">
                                            {item.title}
                                          </span>
                                          {item.badge && (
                                            <span className="text-[9px] font-space uppercase font-bold px-1.5 py-0.2 bg-[#98ff03]/25 text-black dark:text-[#98ff03] border border-[#98ff03]/40 rounded">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                                          {item.href}
                                          {item.description && (
                                            <span className="font-inter text-zinc-500 dark:text-zinc-400 ml-1.5">
                                              • {item.description}
                                            </span>
                                          )}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 shrink-0">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setItemModal({
                                              isOpen: true,
                                              mode: "edit",
                                              categoryIndex: catIdx,
                                              groupIndex: grpIdx,
                                              itemIndex: itmIdx,
                                              data: { ...item },
                                            })
                                          }
                                          className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded cursor-pointer"
                                          title="Edit Link"
                                        >
                                          <Edit2 className="size-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteItem(catIdx, grpIdx, itmIdx)}
                                          className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded cursor-pointer"
                                          title="Delete Link"
                                        >
                                          <Trash2 className="size-3" />
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- FORM MODALS --- */}

      {/* 1. Add / Edit Menu Modal */}
      {menuModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#16181b] rounded-[4px] border border-zinc-200 dark:border-white/10 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900 dark:text-zinc-100">
                {menuModal.mode === "create" ? "Add New Navbar Item" : "Edit Navbar Item Meta"}
              </h3>
              <button
                type="button"
                onClick={() => setMenuModal({ ...menuModal, isOpen: false })}
                className="text-zinc-400 hover:text-black dark:hover:text-white p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleMenuModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Menu Display Label *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Services, Projects, Pricing"
                  value={menuModal.data.label || ""}
                  onChange={(e) => {
                    const label = e.target.value;
                    const autoKey = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    setMenuModal((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        label,
                        key: prev.mode === "create" ? autoKey : prev.data.key,
                        href: prev.mode === "create" ? `/${autoKey}` : prev.data.href,
                      },
                    }));
                  }}
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Key Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={menuModal.mode === "edit"}
                    placeholder="e.g. pricing"
                    value={menuModal.data.key || ""}
                    onChange={(e) =>
                      setMenuModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, key: e.target.value },
                      }))
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none disabled:bg-zinc-100 dark:disabled:bg-white/5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Primary Route / URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/services or /pricing"
                    value={menuModal.data.href || ""}
                    onChange={(e) =>
                      setMenuModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, href: e.target.value },
                      }))
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                    Order Number
                  </label>
                  <input
                    type="number"
                    value={menuModal.data.order ?? 1}
                    onChange={(e) =>
                      setMenuModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, order: Number(e.target.value) },
                      }))
                    }
                    className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="menuIsActive"
                    checked={menuModal.data.isActive !== false}
                    onChange={(e) =>
                      setMenuModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, isActive: e.target.checked },
                      }))
                    }
                    className="rounded border-zinc-300 dark:border-zinc-600 text-[#292c2e] focus:ring-[#98ff03] accent-[#98ff03]"
                  />
                  <label htmlFor="menuIsActive" className="font-space text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    Active (Show in Header)
                  </label>
                </div>
              </div>

              {/* Footer CTA configuration */}
              <div className="border-t border-zinc-200/80 dark:border-white/10 pt-3 space-y-2">
                <span className="font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400 block">
                  Optional Footer CTA Banner (For Mega Dropdown)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="CTA Label (e.g. EXPLORE ALL →)"
                    value={menuModal.data.footer?.ctaLabel || ""}
                    onChange={(e) =>
                      setMenuModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          footer: {
                            label: prev.data.footer?.label || "HOW WE DELIVER VALUE →",
                            href: prev.data.footer?.href || prev.data.href || "/",
                            ctaLabel: e.target.value,
                            ctaHref: prev.data.footer?.ctaHref || prev.data.href || "/",
                          },
                        },
                      }))
                    }
                    className="border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] text-xs font-inter text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CTA Link (e.g. /services)"
                    value={menuModal.data.footer?.ctaHref || ""}
                    onChange={(e) =>
                      setMenuModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          footer: {
                            label: prev.data.footer?.label || "HOW WE DELIVER VALUE →",
                            href: prev.data.footer?.href || prev.data.href || "/",
                            ctaLabel: prev.data.footer?.ctaLabel || "EXPLORE ALL →",
                            ctaHref: e.target.value,
                          },
                        },
                      }))
                    }
                    className="border border-zinc-300 dark:border-white/10 px-2.5 py-1.5 rounded-[3px] text-xs font-mono text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                  />
                </div>
              </div>

              {/* AI Auto-Translation for Navbar Item / Menu */}
              <div className="p-3 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-[4px] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-2">
                  <div>
                    <h4 className="text-[11px] font-space font-bold text-zinc-800 dark:text-zinc-200">
                      Multi-Language Translations
                    </h4>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-inter">
                      Translate menu label & footer banner into Oromo, Amharic, German, Polish.
                    </p>
                  </div>
                  <AutoTranslateButton
                    sourceFields={{
                      label: menuModal.data.label || "",
                      footerLabel: menuModal.data.footer?.label || "",
                      footerCtaLabel: menuModal.data.footer?.ctaLabel || "",
                    }}
                    onTranslated={(newTranslations) => {
                      setMenuModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          translations: {
                            ...(prev.data.translations || {}),
                            ...newTranslations,
                          },
                        },
                      }));
                    }}
                  />
                </div>

                {/* Locale Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { code: "om", name: "Afaan Oromoo" },
                    { code: "am", name: "አማርኛ (Amharic)" },
                    { code: "de", name: "Deutsch" },
                    { code: "pl", name: "Polski" },
                  ].map((loc) => {
                    const isFilled = Boolean(menuModal.data.translations?.[loc.code]?.label);
                    return (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setActiveMenuTranslationLocale(loc.code)}
                        className={`px-2 py-0.5 rounded text-[10px] font-space font-medium transition-colors flex items-center gap-1.5 ${
                          activeMenuTranslationLocale === loc.code
                            ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black font-semibold"
                            : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{loc.name}</span>
                        {isFilled && (
                          <span className="size-1.5 rounded-full bg-[#98ff03]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Locale Fields */}
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                      Label ({activeMenuTranslationLocale.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={menuModal.data.translations?.[activeMenuTranslationLocale]?.label || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMenuModal((prev) => ({
                          ...prev,
                          data: {
                            ...prev.data,
                            translations: {
                              ...(prev.data.translations || {}),
                              [activeMenuTranslationLocale]: {
                                ...(prev.data.translations?.[activeMenuTranslationLocale] || {}),
                                label: val,
                              },
                            },
                          },
                        }));
                      }}
                      placeholder="Menu label translation..."
                      className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                        Footer Banner Text ({activeMenuTranslationLocale.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={menuModal.data.translations?.[activeMenuTranslationLocale]?.footerLabel || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMenuModal((prev) => ({
                            ...prev,
                            data: {
                              ...prev.data,
                              translations: {
                                ...(prev.data.translations || {}),
                                [activeMenuTranslationLocale]: {
                                  ...(prev.data.translations?.[activeMenuTranslationLocale] || {}),
                                  footerLabel: val,
                                },
                              },
                            },
                          }));
                        }}
                        placeholder="Footer text translation..."
                        className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                        Footer CTA ({activeMenuTranslationLocale.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={menuModal.data.translations?.[activeMenuTranslationLocale]?.footerCtaLabel || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMenuModal((prev) => ({
                            ...prev,
                            data: {
                              ...prev.data,
                              translations: {
                                ...(prev.data.translations || {}),
                                [activeMenuTranslationLocale]: {
                                  ...(prev.data.translations?.[activeMenuTranslationLocale] || {}),
                                  footerCtaLabel: val,
                                },
                              },
                            },
                          }));
                        }}
                        placeholder="Footer CTA translation..."
                        className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setMenuModal({ ...menuModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
                >
                  {menuModal.mode === "create" ? "Create Menu Item" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add / Edit Category Modal */}
      {categoryModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#16181b] rounded-[4px] border border-zinc-200 dark:border-white/10 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900 dark:text-zinc-100">
                {categoryModal.mode === "create" ? "Add Dropdown Category" : "Edit Category"}
              </h3>
              <button
                type="button"
                onClick={() => setCategoryModal({ ...categoryModal, isOpen: false })}
                className="text-zinc-400 hover:text-black dark:hover:text-white p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCategoryModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence, Cloud Solutions"
                  value={categoryModal.data.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    setCategoryModal((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        title,
                        id: prev.mode === "create" ? autoId : prev.data.id,
                      },
                    }));
                  }}
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Category ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ai, cloud, enterprise"
                  value={categoryModal.data.id || ""}
                  onChange={(e) =>
                    setCategoryModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, id: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Category Icon
                </label>
                <div className="grid grid-cols-6 gap-2 p-2 border border-zinc-200 dark:border-white/10 rounded-[4px] bg-zinc-50 dark:bg-white/[0.02] max-h-36 overflow-y-auto">
                  {ICON_OPTIONS.map((opt) => {
                    const isSelected = (categoryModal.data.iconName || "Sparkles") === opt.name;
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() =>
                          setCategoryModal((prev) => ({
                            ...prev,
                            data: { ...prev.data, iconName: opt.name },
                          }))
                        }
                        className={`p-2 rounded-[3px] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#292c2e] dark:bg-[#98ff03] text-[#98ff03] dark:text-black ring-1 ring-[#292c2e] dark:ring-[#98ff03]"
                            : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-white/10"
                        }`}
                        title={opt.name}
                      >
                        <IconComp className="size-4" />
                        <span className="text-[8px] font-mono truncate max-w-[40px]">{opt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Auto-Translation for Category */}
              <div className="p-3 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-[4px] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-2">
                  <div>
                    <h4 className="text-[11px] font-space font-bold text-zinc-800 dark:text-zinc-200">
                      Multi-Language Translations
                    </h4>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-inter">
                      Translate category title into Oromo, Amharic, German, Polish.
                    </p>
                  </div>
                  <AutoTranslateButton
                    sourceFields={{
                      title: categoryModal.data.title || "",
                    }}
                    onTranslated={(newTranslations) => {
                      setCategoryModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          translations: {
                            ...(prev.data.translations || {}),
                            ...newTranslations,
                          },
                        },
                      }));
                    }}
                  />
                </div>

                {/* Locale Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { code: "om", name: "Afaan Oromoo" },
                    { code: "am", name: "አማርኛ (Amharic)" },
                    { code: "de", name: "Deutsch" },
                    { code: "pl", name: "Polski" },
                  ].map((loc) => {
                    const isFilled = Boolean(categoryModal.data.translations?.[loc.code]?.title);
                    return (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setActiveCatTranslationLocale(loc.code)}
                        className={`px-2 py-0.5 rounded text-[10px] font-space font-medium transition-colors flex items-center gap-1.5 ${
                          activeCatTranslationLocale === loc.code
                            ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black font-semibold"
                            : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{loc.name}</span>
                        {isFilled && (
                          <span className="size-1.5 rounded-full bg-[#98ff03]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Locale Fields */}
                <div className="pt-1">
                  <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                    Title ({activeCatTranslationLocale.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={categoryModal.data.translations?.[activeCatTranslationLocale]?.title || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCategoryModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          translations: {
                            ...(prev.data.translations || {}),
                            [activeCatTranslationLocale]: {
                              ...(prev.data.translations?.[activeCatTranslationLocale] || {}),
                              title: val,
                            },
                          },
                        },
                      }));
                    }}
                    placeholder="Category title translation..."
                    className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setCategoryModal({ ...categoryModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
                >
                  {categoryModal.mode === "create" ? "Add Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add / Edit Sub-Group Modal */}
      {groupModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#16181b] rounded-[4px] border border-zinc-200 dark:border-white/10 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900 dark:text-zinc-100">
                {groupModal.mode === "create" ? "Add Sub-Group" : "Edit Sub-Group"}
              </h3>
              <button
                type="button"
                onClick={() => setGroupModal({ ...groupModal, isOpen: false })}
                className="text-zinc-400 hover:text-black dark:hover:text-white p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleGroupModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Sub-Group Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Generative AI & LLMs, Enterprise Platforms"
                  value={groupModal.data.title || ""}
                  onChange={(e) =>
                    setGroupModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, title: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Optional Sub-Group Href / Anchor
                </label>
                <input
                  type="text"
                  placeholder="/services#ai or /projects"
                  value={groupModal.data.href || ""}
                  onChange={(e) =>
                    setGroupModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, href: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              {/* AI Auto-Translation for Sub-Group */}
              <div className="p-3 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-[4px] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-2">
                  <div>
                    <h4 className="text-[11px] font-space font-bold text-zinc-800 dark:text-zinc-200">
                      Multi-Language Translations
                    </h4>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-inter">
                      Translate group title into Oromo, Amharic, German, Polish.
                    </p>
                  </div>
                  <AutoTranslateButton
                    sourceFields={{
                      title: groupModal.data.title || "",
                    }}
                    onTranslated={(newTranslations) => {
                      setGroupModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          translations: {
                            ...(prev.data.translations || {}),
                            ...newTranslations,
                          },
                        },
                      }));
                    }}
                  />
                </div>

                {/* Locale Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { code: "om", name: "Afaan Oromoo" },
                    { code: "am", name: "አማርኛ (Amharic)" },
                    { code: "de", name: "Deutsch" },
                    { code: "pl", name: "Polski" },
                  ].map((loc) => {
                    const isFilled = Boolean(groupModal.data.translations?.[loc.code]?.title);
                    return (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setActiveGrpTranslationLocale(loc.code)}
                        className={`px-2 py-0.5 rounded text-[10px] font-space font-medium transition-colors flex items-center gap-1.5 ${
                          activeGrpTranslationLocale === loc.code
                            ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black font-semibold"
                            : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{loc.name}</span>
                        {isFilled && (
                          <span className="size-1.5 rounded-full bg-[#98ff03]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Locale Fields */}
                <div className="pt-1">
                  <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                    Title ({activeGrpTranslationLocale.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={groupModal.data.translations?.[activeGrpTranslationLocale]?.title || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGroupModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          translations: {
                            ...(prev.data.translations || {}),
                            [activeGrpTranslationLocale]: {
                              ...(prev.data.translations?.[activeGrpTranslationLocale] || {}),
                              title: val,
                            },
                          },
                        },
                      }));
                    }}
                    placeholder="Group title translation..."
                    className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setGroupModal({ ...groupModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
                >
                  {groupModal.mode === "create" ? "Add Sub-Group" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add / Edit Navigation Link / Item Modal */}
      {itemModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#16181b] rounded-[4px] border border-zinc-200 dark:border-white/10 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto">
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900 dark:text-zinc-100">
                {itemModal.mode === "create" ? "Add Link / Item" : "Edit Link"}
              </h3>
              <button
                type="button"
                onClick={() => setItemModal({ ...itemModal, isOpen: false })}
                className="text-zinc-400 hover:text-black dark:hover:text-white p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleItemModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Item Label / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom LLM Engineering, Core Banking"
                  value={itemModal.data.title || ""}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, title: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Destination URL / Href *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/services#ai or /projects/digital-wallet"
                  value={itemModal.data.href || ""}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, href: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Optional Badge / Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. NEW, HOT, BETA"
                  value={itemModal.data.badge || ""}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, badge: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-space text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700 dark:text-zinc-300">
                  Optional Subtitle / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous AI workflows and agents"
                  value={itemModal.data.description || ""}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, description: e.target.value },
                    }))
                  }
                  className="w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] font-inter text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121417] focus:border-[#292c2e] dark:focus:border-[#98ff03] outline-none"
                />
              </div>

              {/* AI Auto-Translation for Nav Link */}
              <div className="p-3 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-[4px] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-2">
                  <div>
                    <h4 className="text-[11px] font-space font-bold text-zinc-800 dark:text-zinc-200">
                      Multi-Language Translations
                    </h4>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-inter">
                      Translate item title, badge & description into Oromo, Amharic, German, Polish.
                    </p>
                  </div>
                  <AutoTranslateButton
                    sourceFields={{
                      title: itemModal.data.title || "",
                      badge: itemModal.data.badge || "",
                      description: itemModal.data.description || "",
                    }}
                    onTranslated={(newTranslations) => {
                      setItemModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          translations: {
                            ...(prev.data.translations || {}),
                            ...newTranslations,
                          },
                        },
                      }));
                    }}
                  />
                </div>

                {/* Locale Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { code: "om", name: "Afaan Oromoo" },
                    { code: "am", name: "አማርኛ (Amharic)" },
                    { code: "de", name: "Deutsch" },
                    { code: "pl", name: "Polski" },
                  ].map((loc) => {
                    const isFilled = Boolean(itemModal.data.translations?.[loc.code]?.title);
                    return (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setActiveNavTranslationLocale(loc.code)}
                        className={`px-2 py-0.5 rounded text-[10px] font-space font-medium transition-colors flex items-center gap-1.5 ${
                          activeNavTranslationLocale === loc.code
                            ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black"
                            : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{loc.name}</span>
                        {isFilled && (
                          <span className="size-1.5 rounded-full bg-[#98ff03]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Locale Fields */}
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                      Title ({activeNavTranslationLocale.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={itemModal.data.translations?.[activeNavTranslationLocale]?.title || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setItemModal((prev) => ({
                          ...prev,
                          data: {
                            ...prev.data,
                            translations: {
                              ...(prev.data.translations || {}),
                              [activeNavTranslationLocale]: {
                                ...(prev.data.translations?.[activeNavTranslationLocale] || {}),
                                title: val,
                              },
                            },
                          },
                        }));
                      }}
                      placeholder="Title translation..."
                      className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                        Badge ({activeNavTranslationLocale.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={itemModal.data.translations?.[activeNavTranslationLocale]?.badge || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setItemModal((prev) => ({
                            ...prev,
                            data: {
                              ...prev.data,
                              translations: {
                                ...(prev.data.translations || {}),
                                [activeNavTranslationLocale]: {
                                  ...(prev.data.translations?.[activeNavTranslationLocale] || {}),
                                  badge: val,
                                },
                              },
                            },
                          }));
                        }}
                        placeholder="Badge translation..."
                        className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03] uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                        Description ({activeNavTranslationLocale.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={itemModal.data.translations?.[activeNavTranslationLocale]?.description || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setItemModal((prev) => ({
                            ...prev,
                            data: {
                              ...prev.data,
                              translations: {
                                ...(prev.data.translations || {}),
                                [activeNavTranslationLocale]: {
                                  ...(prev.data.translations?.[activeNavTranslationLocale] || {}),
                                  description: val,
                                },
                              },
                            },
                          }));
                        }}
                        placeholder="Description translation..."
                        className="w-full px-2.5 py-1.5 text-xs font-inter border border-zinc-300 dark:border-white/10 rounded-[3px] bg-white dark:bg-[#121417] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setItemModal({ ...itemModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
                >
                  {itemModal.mode === "create" ? "Add Link" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
