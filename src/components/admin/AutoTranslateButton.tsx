"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Check } from "lucide-react";

interface AutoTranslateButtonProps {
  sourceTexts?: Record<string, string>;
  sourceFields?: Record<string, string>;
  sourceLang?: string;
  targetLangs?: string[];
  onTranslated: (translations: Record<string, Record<string, string>>) => void;
  className?: string;
}

export function AutoTranslateButton({
  sourceTexts,
  sourceFields,
  sourceLang = "en",
  targetLangs = ["om", "am", "de", "pl"],
  onTranslated,
  className = "",
}: AutoTranslateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveTexts = sourceTexts || sourceFields || {};

  const handleTranslate = async () => {
    // Check if there are any non-empty source texts
    const validEntries = Object.entries(effectiveTexts).filter(
      ([_, val]) => val && val.trim().length > 0
    );

    if (validEntries.length === 0) {
      setError("Please fill in English fields first before auto-translating.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceTexts: effectiveTexts,
          sourceLang,
          targetLangs,
        }),
      });

      const data = await response.json();

      if (data.success && data.translations) {
        onTranslated(data.translations);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(data.error || "Failed to auto-translate content");
      }
    } catch (err: any) {
      setError(err.message || "Translation failed. Check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-flex flex-col gap-1.5">
      <button
        type="button"
        onClick={handleTranslate}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#98ff03]/15 hover:bg-[#98ff03]/25 text-black dark:text-[#98ff03] border border-[#98ff03]/30 rounded-[4px] font-space text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer ${className}`}
        title="Automatically translate English fields into Afaan Oromoo, Amharic, German & Polish"
      >
        {loading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : success ? (
          <Check className="size-3.5 text-green-600 dark:text-[#98ff03]" />
        ) : (
          <Sparkles className="size-3.5 text-black dark:text-[#98ff03]" />
        )}
        <span>{loading ? "Translating (5 Languages)..." : success ? "Translated!" : "AI Auto-Translate"}</span>
      </button>

      {error && (
        <span className="text-[11px] text-red-500 font-inter max-w-xs">{error}</span>
      )}
    </div>
  );
}

export default AutoTranslateButton;
