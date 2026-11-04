"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Check, ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { saveFooterAction } from "@/lib/actions/footer.actions";
import { footerLocales, footerTranslatableFields, type FooterContent, type FooterGroup } from "@/lib/footer/schema";

const localeNames: Record<(typeof footerLocales)[number], string> = {
  om: "Afaan Oromoo",
  am: "አማርኛ (Amharic)",
  de: "Deutsch",
  pl: "Polski",
};

const fieldLabels: Record<string, string> = {
  tagline: "Tagline",
  contactTitle: "Contact column title",
  ctaLabel: "Contact button",
  backToTopLabel: "Back to top",
};

const inputClass = "w-full border border-zinc-300 dark:border-white/10 px-3 py-2 rounded-[3px] text-xs text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#121417] focus:outline-none focus:border-[#292c2e] dark:focus:border-[#98ff03]";
const labelClass = "block font-space text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400 mb-1";
const iconButton = "p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-[3px] transition-colors disabled:opacity-30 disabled:pointer-events-none";

function slugify(value: string, taken: Set<string>) {
  const base = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "item";
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  return id;
}

function move<T>(items: T[], index: number, offset: number) {
  const next = [...items];
  const [item] = next.splice(index, 1);
  next.splice(index + offset, 0, item);
  return next;
}

function Panel({ title, description, children, action }: { title: string; description: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-[#16181b] border border-zinc-200/80 dark:border-white/10 rounded-[4px] p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-100 dark:border-white/10 pb-3">
        <div>
          <h3 className="font-space font-medium text-base text-[#292c2e] dark:text-zinc-100">{title}</h3>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function FooterManager({ initialContent, initialRevision, saved }: { initialContent: FooterContent; initialRevision: number; saved: boolean }) {
  const [content, setContent] = useState<FooterContent>(initialContent);
  const [savedContent, setSavedContent] = useState(JSON.stringify(initialContent));
  const [revision, setRevision] = useState(initialRevision);
  const [isSaved, setIsSaved] = useState(saved);
  const [locale, setLocale] = useState<(typeof footerLocales)[number]>("om");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const dirty = JSON.stringify(content) !== savedContent;
  const sourceFields = useMemo(() => footerTranslatableFields(content), [content]);
  const takenIds = useMemo(() => new Set(content.groups.flatMap(group => [group.id, ...group.links.map(link => link.id)])), [content.groups]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const updateGroup = (index: number, group: FooterGroup) =>
    setContent(prev => ({ ...prev, groups: prev.groups.map((item, i) => (i === index ? group : item)) }));
  const updateContact = (field: keyof FooterContent["contact"], value: string) =>
    setContent(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));

  const handleSave = () => {
    setFeedback(null);
    startTransition(async () => {
      const result = await saveFooterAction(content, revision);
      if ("error" in result && result.error) {
        setFeedback({ type: "error", message: result.error });
        return;
      }
      if (result.revision !== undefined) setRevision(result.revision);
      setSavedContent(JSON.stringify(content));
      setIsSaved(true);
      setFeedback({ type: "success", message: "Footer saved. The live site now shows these changes." });
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#16181b] p-6 border border-zinc-200/80 dark:border-white/10 shadow-sm relative">
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -top-[3px] -right-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -left-[3px]" />
        <div className="absolute bg-[#292c2e] dark:bg-[#98ff03] size-[6px] -bottom-[3px] -right-[3px]" />
        <div>
          <h2 className="font-space font-medium text-xl text-[#292c2e] dark:text-zinc-100 tracking-tight">Site Footer</h2>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Link columns, contact details, tagline and social links shown at the bottom of every public page.
          </p>
          {!isSaved && (
            <p className="font-inter text-xs text-amber-700 dark:text-amber-400 mt-2">
              Not saved yet: the site is showing the default footer below. Save to make it editable content.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-space uppercase tracking-wider text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 rounded-[4px] hover:bg-zinc-100 dark:hover:bg-white/5">
            <ExternalLink className="size-3.5" />
            View site
          </a>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending || (!dirty && isSaved)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#292c2e] hover:bg-black dark:bg-[#98ff03] dark:hover:bg-[#8ae600] text-white dark:text-black text-xs font-space font-semibold uppercase tracking-wider rounded-[4px] transition-all active:scale-[0.96] shadow-sm disabled:opacity-50"
          >
            <Save className="size-4 text-[#98ff03] dark:text-black" />
            {isPending ? "Saving..." : dirty || !isSaved ? "Save footer" : "Saved"}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          className={`p-3 border text-xs font-inter rounded-[4px] flex items-start gap-2 ${feedback.type === "success" ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300" : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"}`}
        >
          {feedback.type === "success" ? <Check className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
          <span className="break-words">{feedback.message}</span>
        </div>
      )}

      {/* Link Columns */}
      <Panel
        title="Link columns"
        description="Each column has a title and its links. Columns without links are hidden. Use site paths like /about, or full https:// links."
        action={
          <button
            type="button"
            disabled={content.groups.length >= 8}
            onClick={() => setContent(prev => ({ ...prev, groups: [...prev.groups, { id: slugify("column", takenIds), title: "New column", links: [] }] }))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space uppercase tracking-wider border border-zinc-300 dark:border-white/15 rounded-[3px] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40"
          >
            <Plus className="size-3.5" /> Add column
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {content.groups.map((group, groupIndex) => (
            <div key={group.id} className="border border-zinc-200 dark:border-white/10 rounded-[4px] p-4 space-y-3 bg-zinc-50/60 dark:bg-white/[0.02]">
              <div className="flex items-end gap-2">
                <div className="flex-1 min-w-0">
                  <label className={labelClass} htmlFor={`group-${group.id}`}>Column title</label>
                  <input id={`group-${group.id}`} className={inputClass} value={group.title} maxLength={60} onChange={e => updateGroup(groupIndex, { ...group, title: e.target.value })} />
                </div>
                <button type="button" className={iconButton} aria-label="Move column up" disabled={groupIndex === 0} onClick={() => setContent(prev => ({ ...prev, groups: move(prev.groups, groupIndex, -1) }))}><ArrowUp className="size-3.5" /></button>
                <button type="button" className={iconButton} aria-label="Move column down" disabled={groupIndex === content.groups.length - 1} onClick={() => setContent(prev => ({ ...prev, groups: move(prev.groups, groupIndex, 1) }))}><ArrowDown className="size-3.5" /></button>
                <button
                  type="button"
                  className={`${iconButton} hover:!text-red-600`}
                  aria-label={`Delete column ${group.title}`}
                  onClick={() => confirm(`Delete the "${group.title}" column and its links?`) && setContent(prev => ({ ...prev, groups: prev.groups.filter((_, i) => i !== groupIndex) }))}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              {group.links.length === 0 && <p className="text-[11px] font-inter text-zinc-500 dark:text-zinc-400">No links yet. This column is hidden on the site.</p>}

              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => {
                  const setLinks = (links: FooterGroup["links"]) => updateGroup(groupIndex, { ...group, links });
                  return (
                    <li key={link.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                      <input aria-label="Link label" placeholder="Label" className={inputClass} value={link.label} maxLength={80} onChange={e => setLinks(group.links.map((item, i) => (i === linkIndex ? { ...item, label: e.target.value } : item)))} />
                      <input aria-label="Link URL" placeholder="/about or https://" className={`${inputClass} font-mono`} value={link.href} maxLength={500} onChange={e => setLinks(group.links.map((item, i) => (i === linkIndex ? { ...item, href: e.target.value } : item)))} />
                      <div className="flex items-center">
                        <button type="button" className={iconButton} aria-label="Move link up" disabled={linkIndex === 0} onClick={() => setLinks(move(group.links, linkIndex, -1))}><ArrowUp className="size-3.5" /></button>
                        <button type="button" className={iconButton} aria-label="Move link down" disabled={linkIndex === group.links.length - 1} onClick={() => setLinks(move(group.links, linkIndex, 1))}><ArrowDown className="size-3.5" /></button>
                        <button type="button" className={`${iconButton} hover:!text-red-600`} aria-label={`Delete link ${link.label}`} onClick={() => setLinks(group.links.filter((_, i) => i !== linkIndex))}><Trash2 className="size-3.5" /></button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                disabled={group.links.length >= 20}
                onClick={() => updateGroup(groupIndex, { ...group, links: [...group.links, { id: slugify(`${group.id}-link`, takenIds), label: "", href: "/" }] })}
                className="inline-flex items-center gap-1.5 text-[11px] font-space uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#98ff03] disabled:opacity-40"
              >
                <Plus className="size-3.5" /> Add link
              </button>
            </div>
          ))}
        </div>
      </Panel>

      {/* Contact */}
      <Panel title="Contact column" description="Leave a field empty to hide it. The whole column is hidden when every field is empty.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="contact-title">Column title</label>
            <input id="contact-title" className={inputClass} value={content.contact.title} maxLength={60} onChange={e => updateContact("title", e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" className={inputClass} value={content.contact.email} maxLength={200} onChange={e => updateContact("email", e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="contact-phone">Phone</label>
            <input id="contact-phone" type="tel" placeholder="+44 7763 823269" className={inputClass} value={content.contact.phone} maxLength={40} onChange={e => updateContact("phone", e.target.value)} />
          </div>
          <div className="sm:row-span-2">
            <label className={labelClass} htmlFor="contact-address">Address</label>
            <textarea id="contact-address" rows={4} className={inputClass} value={content.contact.address} maxLength={300} onChange={e => updateContact("address", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass} htmlFor="contact-cta">Button label</label>
              <input id="contact-cta" className={inputClass} value={content.contact.ctaLabel} maxLength={60} onChange={e => updateContact("ctaLabel", e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-cta-href">Button link</label>
              <input id="contact-cta-href" className={`${inputClass} font-mono`} value={content.contact.ctaHref} maxLength={500} onChange={e => updateContact("ctaHref", e.target.value)} />
            </div>
          </div>
        </div>
      </Panel>

      {/* Brand */}
      <Panel title="Brand line" description="Shown under the logo, with the copyright year added automatically.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            <label className={labelClass} htmlFor="tagline">Tagline</label>
            <input id="tagline" className={inputClass} value={content.tagline} maxLength={200} onChange={e => setContent(prev => ({ ...prev, tagline: e.target.value }))} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="copyright">Copyright name</label>
            <input id="copyright" className={inputClass} value={content.copyrightName} maxLength={100} onChange={e => setContent(prev => ({ ...prev, copyrightName: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass} htmlFor="back-to-top">Back to top label</label>
            <input id="back-to-top" className={inputClass} value={content.backToTopLabel} maxLength={40} onChange={e => setContent(prev => ({ ...prev, backToTopLabel: e.target.value }))} />
          </div>
        </div>
      </Panel>

      {/* Social */}
      <Panel
        title="Social links"
        description="Full https:// profile links. The icon is picked from the site (LinkedIn, Facebook, X, YouTube, TikTok, Instagram, GitHub); others show a globe."
        action={
          <button
            type="button"
            disabled={content.socialLinks.length >= 12}
            onClick={() => setContent(prev => ({ ...prev, socialLinks: [...prev.socialLinks, "https://"] }))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space uppercase tracking-wider border border-zinc-300 dark:border-white/15 rounded-[3px] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40"
          >
            <Plus className="size-3.5" /> Add link
          </button>
        }
      >
        <ul className="space-y-2">
          {content.socialLinks.map((url, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                aria-label={`Social link ${index + 1}`}
                className={`${inputClass} font-mono`}
                value={url}
                maxLength={300}
                onChange={e => setContent(prev => ({ ...prev, socialLinks: prev.socialLinks.map((item, i) => (i === index ? e.target.value : item)) }))}
              />
              <button type="button" className={iconButton} aria-label="Move up" disabled={index === 0} onClick={() => setContent(prev => ({ ...prev, socialLinks: move(prev.socialLinks, index, -1) }))}><ArrowUp className="size-3.5" /></button>
              <button type="button" className={iconButton} aria-label="Move down" disabled={index === content.socialLinks.length - 1} onClick={() => setContent(prev => ({ ...prev, socialLinks: move(prev.socialLinks, index, 1) }))}><ArrowDown className="size-3.5" /></button>
              <button type="button" className={`${iconButton} hover:!text-red-600`} aria-label="Delete social link" onClick={() => setContent(prev => ({ ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== index) }))}><Trash2 className="size-3.5" /></button>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Translations */}
      <Panel
        title="Translations"
        description="Column titles, link labels and short texts for each language. Empty fields show the English text."
        action={
          <AutoTranslateButton
            sourceFields={sourceFields}
            onTranslated={translated =>
              setContent(prev => ({
                ...prev,
                translations: Object.fromEntries(
                  footerLocales.map(code => [code, { ...translated[code], ...Object.fromEntries(Object.entries(prev.translations[code] || {}).filter(([, value]) => value)) }]),
                ),
              }))
            }
          />
        }
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Translation language">
          {footerLocales.map(code => {
            const filled = Object.keys(sourceFields).filter(key => content.translations[code]?.[key]).length;
            return (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={locale === code}
                onClick={() => setLocale(code)}
                className={`px-2.5 py-1 rounded text-[11px] font-space font-medium whitespace-nowrap transition-colors ${locale === code ? "bg-[#292c2e] dark:bg-[#98ff03] text-white dark:text-black" : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
              >
                {localeNames[code]} · {filled}/{Object.keys(sourceFields).length}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] font-inter text-zinc-500 dark:text-zinc-400">Auto-translate fills only empty fields; clear a field to translate it again.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          {Object.entries(sourceFields).map(([key, source]) => {
            const kind = key.split(".")[0];
            const label = kind === "group" ? "Column title" : kind === "link" ? "Link" : fieldLabels[key];
            return (
              <div key={key}>
                <label className="block text-[10px] font-space font-medium text-zinc-600 dark:text-zinc-400 mb-0.5" htmlFor={`tr-${key}`}>
                  {label}: <span className="text-zinc-400 dark:text-zinc-500">{source}</span>
                </label>
                <input
                  id={`tr-${key}`}
                  className={inputClass}
                  placeholder={source}
                  maxLength={300}
                  value={content.translations[locale]?.[key] || ""}
                  onChange={e => setContent(prev => ({ ...prev, translations: { ...prev.translations, [locale]: { ...prev.translations[locale], [key]: e.target.value } } }))}
                />
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

export default FooterManager;
