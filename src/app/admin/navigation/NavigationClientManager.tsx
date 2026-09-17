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
  LucideIcon,
} from "lucide-react";

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
      <div className="bg-white p-6 border border-zinc-200/80 shadow-sm relative rounded-[4px]">
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] size-[6px] -bottom-[3px] -right-[3px]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#292c2e] text-[#98ff03] rounded-[4px]">
                <Menu className="size-4" />
              </div>
              <h1 className="text-xl font-space font-bold tracking-tight text-[#292c2e]">
                Navigation & Mega-Menu Studio
              </h1>
            </div>
            <p className="font-inter text-xs text-zinc-500 mt-1">
              Visually create, customize, and reorder navigation tabs, labels, categories, and dropdown links without writing JSON.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleResetToDefault}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space font-medium border border-zinc-200 hover:bg-zinc-100 rounded-[4px] text-zinc-700 transition-all active:scale-[0.96] cursor-pointer disabled:opacity-50"
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
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space font-medium border border-zinc-200 hover:bg-zinc-100 rounded-[4px] text-zinc-700 transition-all active:scale-[0.96] cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition-all active:scale-[0.96] cursor-pointer"
            >
              <Plus className="size-3.5 text-[#98ff03]" />
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
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <Check className="size-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="size-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Horizontal Navbar Tabs */}
      <div className="bg-white border border-zinc-200/80 p-2 rounded-[4px] flex items-center gap-1.5 overflow-x-auto shadow-2xs">
        {menus.map((menu) => {
          const isSelected = selectedKey === menu.key;
          const hasDropdown = Boolean(menu.categories && menu.categories.length > 0);
          return (
            <button
              key={menu.key}
              onClick={() => handleSelectMenu(menu.key)}
              className={`px-3.5 py-2 text-xs font-space rounded-[3px] transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[#292c2e] text-white font-semibold shadow-xs"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <span>{menu.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? "bg-[#98ff03] text-black font-bold" : "bg-zinc-100 text-zinc-500"
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
        <div className="bg-white border border-zinc-200/80 rounded-[4px] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-space font-bold text-sm text-zinc-900">
                Raw JSON Editor: {currentMenu?.label}
              </h3>
              <p className="font-inter text-xs text-zinc-400">
                Directly view or modify the complete structured schema for this navigation node.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveJson}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase tracking-wider rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer disabled:opacity-50"
            >
              <Save className="size-3.5 text-[#98ff03]" />
              <span>{saving ? "Saving..." : "Save JSON Changes"}</span>
            </button>
          </div>
          <textarea
            value={editingConfigJson}
            onChange={(e) => setEditingConfigJson(e.target.value)}
            rows={24}
            className="w-full font-mono text-xs p-4 rounded-[4px] bg-[#161819] text-zinc-100 border border-zinc-800 focus:outline-none focus:border-[#98ff03] leading-relaxed"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Menu Meta Summary Card */}
          <div className="bg-white border border-zinc-200/80 p-5 rounded-[4px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-space font-bold text-base text-[#292c2e]">
                  {currentMenu?.label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-mono">
                  key: {currentMenu?.key}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-mono">
                  order: #{currentMenu?.order}
                </span>
                <span
                  className={`text-[10px] font-space uppercase px-2 py-0.5 rounded font-bold ${
                    currentMenu?.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {currentMenu?.isActive ? "Active on Site" : "Hidden / Inactive"}
                </span>
              </div>
              <p className="font-inter text-xs text-zinc-500">
                Primary route: <span className="font-mono text-zinc-700">{currentMenu?.href}</span>
                {currentMenu?.footer && (
                  <>
                    {" "}
                    • Footer Banner CTA:{" "}
                    <span className="font-mono text-zinc-700 font-medium">
                      &ldquo;{currentMenu.footer.ctaLabel}&rdquo;
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setMenuModal({
                    isOpen: true,
                    mode: "edit",
                    data: { ...currentMenu },
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-medium border border-zinc-200 hover:bg-zinc-100 rounded-[3px] text-zinc-700 transition-all active:scale-[0.96] cursor-pointer"
              >
                <Edit2 className="size-3 text-zinc-500" />
                <span>Edit Menu Meta</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteMenu(currentMenu.key)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-[3px] transition-all active:scale-[0.96] cursor-pointer"
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
                <h3 className="font-space font-bold text-sm text-[#292c2e] uppercase tracking-wider flex items-center gap-2">
                  <Layers className="size-4 text-[#292c2e]" />
                  <span>Mega-Menu Categories ({currentMenu?.categories?.length || 0})</span>
                </h3>
                <p className="font-inter text-xs text-zinc-400 mt-0.5">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer shadow-2xs"
              >
                <Plus className="size-3.5 text-[#98ff03]" />
                <span>Add Category</span>
              </button>
            </div>

            {(!currentMenu?.categories || currentMenu.categories.length === 0) ? (
              <div className="bg-white border border-dashed border-zinc-300 p-8 rounded-[4px] text-center space-y-3">
                <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <LinkIcon className="size-5" />
                </div>
                <div>
                  <p className="font-space font-bold text-sm text-zinc-800">
                    Direct Navbar Link (No Dropdown)
                  </p>
                  <p className="font-inter text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                    This item links directly to <code className="font-mono text-zinc-600 bg-zinc-100 px-1 py-0.5 rounded">{currentMenu?.href}</code>. If you want it to display a 2-column mega menu, click below to add its first category.
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space font-semibold uppercase rounded-[3px] active:scale-[0.96] transition-transform cursor-pointer shadow-2xs"
                >
                  <Plus className="size-3.5 text-[#98ff03]" />
                  <span>Convert to Mega-Menu & Add Category</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {currentMenu.categories.map((category, catIdx) => (
                  <div
                    key={category.id || catIdx}
                    className="bg-white border border-zinc-200/90 rounded-[4px] shadow-sm overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className="bg-[#f8f9fa] border-b border-zinc-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-[4px] bg-white border border-zinc-200 flex items-center justify-center text-[#292c2e] shadow-2xs shrink-0">
                          <CategoryIconPreview name={category.iconName} className="size-4 text-[#292c2e]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-space font-bold text-sm text-[#292c2e]">
                              {category.title}
                            </h4>
                            <span className="font-mono text-[11px] text-zinc-400 bg-white px-1.5 py-0.2 rounded border border-zinc-200">
                              id: {category.id}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-zinc-400">
                            Icon: <span className="font-mono text-zinc-600">{category.iconName}</span> • {category.groups?.length || 0} sub-groups
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-space font-medium bg-white hover:bg-zinc-50 border border-zinc-200 rounded-[3px] text-zinc-700 active:scale-[0.96] transition-all cursor-pointer shadow-2xs"
                        >
                          <Plus className="size-3 text-[#292c2e]" />
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
                          className="p-1.5 text-zinc-500 hover:text-black hover:bg-white rounded-[3px] transition-colors border border-transparent hover:border-zinc-200 cursor-pointer"
                          title="Edit Category Details"
                        >
                          <Edit2 className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(catIdx)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-[3px] transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sub-Groups inside Category */}
                    <div className="p-4 space-y-4">
                      {(!category.groups || category.groups.length === 0) ? (
                        <p className="font-inter text-xs text-zinc-400 italic py-2">
                          No sub-groups added yet. Click &ldquo;Add Sub-Group&rdquo; to create section headers for links.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {category.groups.map((group, grpIdx) => (
                            <div
                              key={grpIdx}
                              className="border border-zinc-200/80 rounded-[4px] p-3.5 bg-zinc-50/50 space-y-3"
                            >
                              {/* Group Header */}
                              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60">
                                <div className="flex items-center gap-2">
                                  <FolderTree className="size-3.5 text-zinc-500 shrink-0" />
                                  <span className="font-space font-bold text-xs text-zinc-800 uppercase tracking-wider">
                                    {group.title}
                                  </span>
                                  <span className="font-mono text-[10px] text-zinc-400">
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
                                    className="px-2 py-0.5 text-[10px] font-space uppercase font-bold bg-[#292c2e] hover:bg-black text-white rounded-[3px] transition-transform active:scale-[0.96] flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus className="size-2.5 text-[#98ff03]" />
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
                                    className="p-1 text-zinc-400 hover:text-black rounded transition-colors cursor-pointer"
                                    title="Edit Sub-Group"
                                  >
                                    <Edit2 className="size-3" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGroup(catIdx, grpIdx)}
                                    className="p-1 text-zinc-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                                    title="Delete Sub-Group"
                                  >
                                    <Trash2 className="size-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Items List */}
                              <div className="space-y-1.5">
                                {(!group.items || group.items.length === 0) ? (
                                  <p className="font-inter text-[11px] text-zinc-400 italic">
                                    No links in this group yet. Click &ldquo;Add Link&rdquo; above.
                                  </p>
                                ) : (
                                  group.items.map((item, itmIdx) => (
                                    <div
                                      key={itmIdx}
                                      className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-zinc-200/80 hover:border-zinc-300 transition-colors group"
                                    >
                                      <div className="min-w-0 flex-1 pr-2">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-space font-medium text-xs text-[#292c2e] truncate">
                                            {item.title}
                                          </span>
                                          {item.badge && (
                                            <span className="text-[9px] font-space uppercase font-bold px-1.5 py-0.2 bg-[#98ff03]/25 text-black border border-[#98ff03]/40 rounded">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="font-mono text-[10px] text-zinc-400 truncate mt-0.5">
                                          {item.href}
                                          {item.description && (
                                            <span className="font-inter text-zinc-500 ml-1.5">
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
                                          className="p-1 text-zinc-400 hover:text-black rounded cursor-pointer"
                                          title="Edit Link"
                                        >
                                          <Edit2 className="size-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteItem(catIdx, grpIdx, itmIdx)}
                                          className="p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[4px] border border-zinc-200 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900">
                {menuModal.mode === "create" ? "Add New Navbar Item" : "Edit Navbar Item Meta"}
              </h3>
              <button
                type="button"
                onClick={() => setMenuModal({ ...menuModal, isOpen: false })}
                className="text-zinc-400 hover:text-black p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleMenuModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none disabled:bg-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                    className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
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
                    className="rounded border-zinc-300 text-[#292c2e] focus:ring-[#292c2e]"
                  />
                  <label htmlFor="menuIsActive" className="font-space text-xs text-zinc-700 cursor-pointer">
                    Active (Show in Header)
                  </label>
                </div>
              </div>

              {/* Footer CTA configuration */}
              <div className="border-t border-zinc-200/80 pt-3 space-y-2">
                <span className="font-space text-[11px] uppercase font-bold text-zinc-600 block">
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
                    className="border border-zinc-300 px-2.5 py-1.5 rounded-[3px] text-xs font-inter focus:border-[#292c2e] outline-none"
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
                    className="border border-zinc-300 px-2.5 py-1.5 rounded-[3px] text-xs font-mono focus:border-[#292c2e] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setMenuModal({ ...menuModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 hover:bg-zinc-100 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[4px] border border-zinc-200 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900">
                {categoryModal.mode === "create" ? "Add Dropdown Category" : "Edit Category"}
              </h3>
              <button
                type="button"
                onClick={() => setCategoryModal({ ...categoryModal, isOpen: false })}
                className="text-zinc-400 hover:text-black p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCategoryModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
                  Category Icon
                </label>
                <div className="grid grid-cols-6 gap-2 p-2 border border-zinc-200 rounded-[4px] bg-zinc-50 max-h-36 overflow-y-auto">
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
                            ? "bg-[#292c2e] text-[#98ff03] ring-1 ring-[#292c2e]"
                            : "bg-white text-zinc-600 hover:text-black border border-zinc-200"
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

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setCategoryModal({ ...categoryModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 hover:bg-zinc-100 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[4px] border border-zinc-200 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900">
                {groupModal.mode === "create" ? "Add Sub-Group" : "Edit Sub-Group"}
              </h3>
              <button
                type="button"
                onClick={() => setGroupModal({ ...groupModal, isOpen: false })}
                className="text-zinc-400 hover:text-black p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleGroupModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setGroupModal({ ...groupModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 hover:bg-zinc-100 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[4px] border border-zinc-200 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -left-[3px]" />
            <div className="absolute bg-[#292c2e] size-[6px] -top-[3px] -right-[3px]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-space font-bold text-base text-zinc-900">
                {itemModal.mode === "create" ? "Add Link / Item" : "Edit Link"}
              </h3>
              <button
                type="button"
                onClick={() => setItemModal({ ...itemModal, isOpen: false })}
                className="text-zinc-400 hover:text-black p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleItemModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-xs font-semibold text-zinc-900 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-mono text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-space text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space text-xs uppercase font-bold text-zinc-700">
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
                  className="w-full border border-zinc-300 px-3 py-2 rounded-[3px] font-inter text-xs text-zinc-800 focus:border-[#292c2e] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setItemModal({ ...itemModal, isOpen: false })}
                  className="px-3 py-1.5 text-xs font-space text-zinc-600 hover:bg-zinc-100 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#292c2e] hover:bg-black text-white text-xs font-space uppercase font-bold rounded-[3px] transition-transform active:scale-[0.96] cursor-pointer disabled:opacity-50"
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
