"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { translatePillarAction } from "@/lib/actions/pillar-translation.actions";
import { currentTranslation, getPillarTextFields, pillarLanguages } from "@/lib/pillars/translations";
import type { PillarContent, PillarLocale } from "@/lib/pillars/schema";

const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800";

export default function PillarTranslationEditor({ content, onChange, onBusyChange }: {
  content: PillarContent;
  onChange: (value: PillarContent["translations"]) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const [locale, setLocale] = useState<PillarLocale>("om");
  const [section, setSection] = useState("Overview");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fields = getPillarTextFields(content);
  const translation = content.translations?.[locale];
  const complete = fields.filter(field => currentTranslation(translation, field.key, field.source)).length;

  async function translate(targets: PillarLocale[]) {
    setBusy(true); onBusyChange(true); setError("");
    let translations = { ...content.translations };
    let completed = 0;
    try {
      for (const target of targets) {
        setMessage(`Translating ${pillarLanguages[target]} (${completed + 1}/${targets.length})…`);
        const result = await translatePillarAction({ ...content, translations }, target);
        if (result.error || !result.translation) throw new Error(`${pillarLanguages[target]}: ${result.error || "No translation was returned."}`);
        translations = { ...translations, [target]: result.translation };
        onChange(translations);
        completed++;
      }
      setMessage("Translations are ready to review. Save a draft or publish when ready.");
    } catch (error) {
      setMessage(completed ? `${completed} language(s) completed and kept in this draft.` : "");
      setError(error instanceof Error ? error.message : "Translation failed. Please try again.");
    } finally {
      setBusy(false); onBusyChange(false);
    }
  }

  return <section className="space-y-6" aria-label="Pillar translations">
    <div><h2 className="text-xl font-semibold">AI translations</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500">Translate the current English content, including product cards, process steps, FAQs and SEO. Existing translations are preserved; only missing or outdated fields are generated. URLs, images, IDs and technology names stay unchanged.</p></div>
    <div className="flex flex-wrap gap-2" aria-label="Translation language">
      {(Object.entries(pillarLanguages) as [PillarLocale, string][]).map(([key, label]) => <button key={key} type="button" disabled={busy} aria-pressed={locale === key} className={`${buttonClass} ${locale === key ? "border-lime-600 bg-lime-500/10" : ""}`} onClick={() => { setLocale(key); setError(""); }}>{label}</button>)}
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" disabled={busy} className={buttonClass} onClick={() => translate([locale])}>{busy ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Sparkles aria-hidden="true" className="size-4" />}Translate missing {pillarLanguages[locale]} fields</button>
      <button type="button" disabled={busy} className={buttonClass} onClick={() => translate(Object.keys(pillarLanguages) as PillarLocale[])}>AI translate all four languages</button>
      <span className="text-sm text-zinc-500">{complete} / {fields.length} fields translated</span>
    </div>
    {message && <p role="status" className="border border-lime-600 bg-lime-500/10 p-4 text-sm">{message}</p>}
    {error && <p role="alert" className="border border-red-500 bg-red-500/10 p-4 text-sm">{error}</p>}
    <label className="block text-sm font-medium">Review section<select className="ms-3 max-w-full border border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900" value={section} onChange={event => setSection(event.target.value)}>{["Overview", "Product cards", "Process & FAQs", "SEO"].map(value => <option key={value}>{value}</option>)}</select></label>
    <p className="text-sm text-zinc-500">You can edit every translation below. Empty or outdated fields use the saved English content on the website. Clear a translation to regenerate it.</p>
    <div className="space-y-6">{fields.filter(field => field.section === section).map(field => {
      const value = currentTranslation(translation, field.key, field.source) || "";
      const outdated = translation?.fields[field.key] && translation.source[field.key]?.trim() !== field.source.trim();
      return <div key={field.key} className="grid gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-700 lg:grid-cols-2">
        <div><p className="text-sm font-semibold">{field.label} · English</p><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-500">{field.source}</p></div>
        <label className="block min-w-0 text-sm font-medium">{field.label} · {pillarLanguages[locale]}
          <textarea lang={locale} rows={3} maxLength={field.maxLength} value={value} className="mt-2 w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:outline-2 focus:outline-lime-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" onChange={event => {
            onChange({ ...content.translations, [locale]: { source: { ...translation?.source, [field.key]: field.source }, fields: { ...translation?.fields, [field.key]: event.target.value } } });
            setMessage(""); setError("");
          }} />
          {outdated && <span className="mt-1 block text-xs text-amber-700 dark:text-amber-400">English changed. Review or regenerate this translation.</span>}
        </label>
      </div>;
    })}</div>
    {section === "SEO" && !fields.some(field => field.section === "SEO") && <p className="text-sm text-zinc-500">SEO uses the translated pillar name and description. Add custom English SEO fields to translate them separately.</p>}
  </section>;
}
