"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative size-9 rounded-[4px] border border-[rgba(174,174,174,0.3)] bg-white dark:border-white/10 dark:bg-[#161819] opacity-50",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-[4px]",
        "border border-[rgba(174,174,174,0.3)] bg-white text-[#292c2e]",
        "hover:border-[#98ff03] hover:text-black",
        "dark:border-white/10 dark:bg-[#161819] dark:text-zinc-200 dark:hover:border-[#98ff03] dark:hover:text-[#98ff03]",
        "active:scale-[0.96] transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98ff03]",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative size-4.5 flex items-center justify-center">
        {/* Dark Mode Icon (Moon) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-[opacity,filter,transform] duration-300",
            "ease-[cubic-bezier(0.2,0,0,1)]",
            isDark
              ? "scale-100 opacity-100 blur-0 rotate-0"
              : "scale-[0.25] opacity-0 blur-[4px] -rotate-90 pointer-events-none"
          )}
        >
          <Moon className="size-4 text-[#98ff03]" strokeWidth={1.75} />
        </div>

        {/* Light Mode Icon (Sun) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-[opacity,filter,transform] duration-300",
            "ease-[cubic-bezier(0.2,0,0,1)]",
            isDark
              ? "scale-[0.25] opacity-0 blur-[4px] rotate-90 pointer-events-none"
              : "scale-100 opacity-100 blur-0 rotate-0"
          )}
        >
          <Sun className="size-4 text-[#292c2e]" strokeWidth={1.75} />
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;
