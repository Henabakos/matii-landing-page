"use client";

import { useEffect, useState, useTransition } from "react";
import { savePillarAction } from "@/lib/actions/pillar.actions";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import PillarTranslationEditor from "@/components/admin/PillarTranslationEditor";
import type { PillarContent, PillarId } from "@/lib/pillars/schema";

type Entry = { id: PillarId; content: PillarContent; revision: number; publishedAt: string | null; hasDraft: boolean };
const fieldClass = "mt-2 w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:outline-2 focus:outline-lime-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
const buttonClass = "min-h-10 border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800";

function Field({ label, value, onChange, multiline = false, optional = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; optional?: boolean }) {
  return <label className="block text-sm font-medium">{label}{optional && <span className="font-normal text-zinc-500"> (optional)</span>}
    {multiline ? <textarea className={fieldClass} rows={4} value={value} onChange={event => onChange(event.target.value)} /> : <input className={fieldClass} value={value} onChange={event => onChange(event.target.value)} />}
  </label>;
}
function Lines({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return <Field label={`${label} — one per line`} multiline value={value.join("\n")} onChange={value => onChange(value.split("\n"))} />;
}
function cleanLines(content: PillarContent): PillarContent {
  const clean = (values: string[]) => values.map(v => v.trim()).filter(Boolean);
  return { ...content, listing: { ...content.listing, items: clean(content.listing.items) }, techStack: clean(content.techStack), products: content.products.map(p => ({ ...p, tags: clean(p.tags), capabilities: clean(p.capabilities) })), ...(content.overview ? { overview: { ...content.overview, workflow: clean(content.overview.workflow) } } : {}) };
}

export default function PillarManager({ initialPillars }: { initialPillars: Entry[] }) {
  const [entries, setEntries] = useState(initialPillars);
  const [selected, setSelected] = useState(0);
  const [content, setContent] = useState(initialPillars[0].content);
  const [section, setSection] = useState("Overview");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [translating, setTranslating] = useState(false);
  const busy = pending || translating;
  const entry = entries[selected];
  const dirty = JSON.stringify(content) !== JSON.stringify(entry.content);
  useEffect(() => {
    if (!dirty) return;
    const prevent = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", prevent);
    return () => window.removeEventListener("beforeunload", prevent);
  }, [dirty]);
  const update = <K extends keyof PillarContent>(key: K, value: PillarContent[K]) => { setContent(current => ({ ...current, [key]: value })); setMessage(""); setError(""); };
  const productUpdate = (index: number, values: Partial<PillarContent["products"][number]>) => update("products", content.products.map((p, i) => i === index ? { ...p, ...values } : p));
  function save(publish: boolean) {
    setMessage(""); setError("");
    startTransition(async () => {
      try {
        const normalized = cleanLines(content);
        const result = await savePillarAction(entry.id, normalized, entry.revision, publish);
        if (result.error) { setError(result.error); return; }
        setContent(normalized);
        setEntries(previous => previous.map((p, i) => i === selected ? { ...p, content: normalized, revision: result.revision!, hasDraft: !publish, publishedAt: publish ? new Date().toISOString() : p.publishedAt } : p));
        setMessage(publish ? "Published. The homepage, services listing, and detail page now use this content." : "Draft saved. The live website is unchanged.");
      } catch { setError("Unable to save. Your edits are still here; please try again."); }
    });
  }
  const sections = ["Overview", "Product cards", "Process & FAQs", "SEO", "Translations"];
  return <div className="space-y-7 font-inter">
    <div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Content studio</p><h1 className="mt-2 font-urbanist text-3xl font-bold">Service pillars</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">Manage all four pillars and their product cards. Save a private draft, then publish it to the website when ready.</p></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Select a pillar">
      {entries.map((p, i) => <button key={p.id} disabled={busy} aria-pressed={selected === i} onClick={() => {
        if (i === selected || (dirty && !window.confirm("Discard your unsaved edits and switch pillars?"))) return;
        setSelected(i); setContent(p.content); setMessage(""); setError("");
      }} className={`border p-4 text-left ${selected === i ? "border-lime-600 bg-lime-500/10" : "border-zinc-300 dark:border-zinc-700"}`}><span className="block text-xs uppercase tracking-widest text-zinc-500">0{i + 1} / {p.hasDraft ? "Draft available" : p.publishedAt ? "Published" : "Original content"}</span><span className="mt-2 block font-urbanist text-lg font-semibold">{p.content.listing.title}</span></button>)}
    </div>
    <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-[#161819]">
      <div className="text-sm"><strong>{content.name}</strong><p className="mt-1 text-xs text-zinc-500">{dirty ? "Unsaved changes" : entry.hasDraft ? "Saved draft · not published" : "No unsaved changes"}</p></div>
      <div className="flex flex-wrap gap-2"><a href={`/services/${entry.id}`} target="_blank" rel="noopener noreferrer" className={buttonClass}>View live page ↗</a><button disabled={busy} className={buttonClass} onClick={() => save(false)}>Save draft</button><button disabled={busy} className="min-h-10 bg-[#98ff03] px-5 py-2 text-sm font-semibold text-[#161819] disabled:opacity-50" onClick={() => save(true)}>{pending ? "Saving…" : "Publish changes"}</button></div>
    </div>
    {message && <p role="status" className="border border-lime-600 bg-lime-500/10 p-4 text-sm">{message}</p>}
    {error && <p role="alert" className="border border-red-500 bg-red-500/10 p-4 text-sm">{error}</p>}
    <div className="flex flex-wrap gap-2" aria-label="Editor sections">{sections.map(item => <button key={item} disabled={busy} aria-pressed={section === item} onClick={() => setSection(item)} className={`${buttonClass} ${section === item ? "bg-zinc-200 dark:bg-zinc-800" : ""}`}>{item}</button>)}</div>
    <fieldset disabled={busy} className="min-w-0 space-y-8 border border-zinc-300 bg-white p-5 sm:p-8 dark:border-zinc-700 dark:bg-[#161819]">
      <legend className="sr-only">{section}</legend>
      {section === "Translations" && <PillarTranslationEditor key={entry.id} content={content} onChange={value => update("translations", value)} onBusyChange={setTranslating} />}
      {section === "Overview" && <>
        <div className="grid gap-5 md:grid-cols-2"><Field label="Pillar name" value={content.name} onChange={v => update("name", v)} /><Field label="Hero headline" value={content.headline} onChange={v => update("headline", v)} /><Field label="Hero description" multiline value={content.description} onChange={v => update("description", v)} /></div>
        <section className="space-y-5 border-t border-zinc-300 pt-6 dark:border-zinc-700"><h2 className="text-xl font-semibold">Homepage & services listing</h2><Field label="Card title" value={content.listing.title} onChange={v => update("listing", { ...content.listing, title: v })} /><Field label="Short description" multiline value={content.listing.description} onChange={v => update("listing", { ...content.listing, description: v })} /><Lines label="Highlights" value={content.listing.items} onChange={v => update("listing", { ...content.listing, items: v })} /></section>
        <section className="grid gap-5 border-t border-zinc-300 pt-6 dark:border-zinc-700 md:grid-cols-2"><Field label="Portfolio heading (line breaks supported)" multiline value={content.portfolioHeading} onChange={v => update("portfolioHeading", v)} /><Field label="Portfolio introduction" multiline value={content.portfolioDescription} onChange={v => update("portfolioDescription", v)} /></section>
        {content.overview && <section className="space-y-5 border-t border-zinc-300 pt-6 dark:border-zinc-700"><h2 className="text-xl font-semibold">Data & AI platform overview</h2><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={content.overview.visible} onChange={event => update("overview", { ...content.overview!, visible: event.target.checked })} />Show overview on the detail page</label>{([['positioning', 'Positioning'], ['example', 'Bank example'], ['applications', 'Other applications']] as const).map(([key, label]) => <Field key={key} label={label} multiline value={content.overview![key]} onChange={v => update("overview", { ...content.overview!, [key]: v })} />)}<Lines label="Platform workflow" value={content.overview.workflow} onChange={v => update("overview", { ...content.overview!, workflow: v })} /></section>}
        <Lines label="Tools & technologies" value={content.techStack} onChange={v => update("techStack", v)} />
      </>}
      {section === "Product cards" && <>
        <div><h2 className="text-xl font-semibold">{content.products.length} product cards</h2><p className="mt-2 text-sm text-zinc-500">Edit illustrations, capabilities, and demo destinations. Wide cards use the established bento layout.</p></div>
        {content.products.map((product, index) => <details key={product.id} className="group border border-zinc-300 dark:border-zinc-700"><summary className="cursor-pointer p-5 font-semibold">{String(index + 1).padStart(2, "0")} · {product.name}<span className="ms-3 text-xs font-normal text-zinc-500">{product.category}</span></summary><div className="space-y-5 border-t border-zinc-300 p-5 dark:border-zinc-700">
          <div className="flex flex-wrap gap-2">{([-1, 1] as const).map(direction => <button key={direction} type="button" className={buttonClass} disabled={index + direction < 0 || index + direction >= content.products.length} onClick={() => { const reordered = [...content.products]; [reordered[index], reordered[index + direction]] = [reordered[index + direction], reordered[index]]; update("products", reordered); }}>{direction < 0 ? "Move up" : "Move down"}</button>)}<button type="button" className={buttonClass} disabled={content.products.length === 1} onClick={() => { if (window.confirm(`Remove ${product.name} from this draft?`)) update("products", content.products.filter((_, i) => i !== index)); }}>Remove card</button></div>
          <div className="grid gap-5 md:grid-cols-2"><Field label="Product name" value={product.name} onChange={v => productUpdate(index, { name: v })} /><Field label="Category" value={product.category} onChange={v => productUpdate(index, { category: v })} /></div>
          <Field label="Description" multiline value={product.description} onChange={v => productUpdate(index, { description: v })} />
          <CloudinaryUploadButton value={product.imageSrc} onChange={v => productUpdate(index, { imageSrc: v })} label="Product illustration" folder="matii/pillars" objectFit="contain" />
          <Field label="Illustration path or HTTPS URL" value={product.imageSrc} onChange={v => productUpdate(index, { imageSrc: v })} />
          <Field label="Book a demo URL" value={product.demoUrl} onChange={v => productUpdate(index, { demoUrl: v })} />
          <div className="grid gap-5 md:grid-cols-2"><Lines label="Tags" value={product.tags} onChange={v => productUpdate(index, { tags: v })} /><Lines label="Capabilities" value={product.capabilities} onChange={v => productUpdate(index, { capabilities: v })} /></div>
          <div className="flex flex-wrap items-center gap-6"><label className="text-sm">Icon<select className={fieldClass} value={product.icon} onChange={event => productUpdate(index, { icon: event.target.value as typeof product.icon })}>{["Cable", "Database", "Search", "ChartNoAxesCombined", "Network", "FlaskConical", "Cpu", "Workflow", "PanelsTopLeft"].map(icon => <option key={icon}>{icon}</option>)}</select></label>{entry.id === "ai" && <label className="text-sm">Portfolio filter<select className={fieldClass} value={product.group ?? "foundation"} onChange={event => productUpdate(index, { group: event.target.value as typeof product.group })}><option value="foundation">Data foundation</option><option value="insights">Intelligence & insights</option><option value="development">AI development</option></select></label>}<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={product.wide} onChange={event => productUpdate(index, { wide: event.target.checked })} />Wide card</label></div>
        </div></details>)}
        <button type="button" className={buttonClass} onClick={() => update("products", [...content.products, { id: `${entry.id}-${crypto.randomUUID()}`, name: "New product", category: content.name, description: "Describe this product.", tags: [], capabilities: ["Add a capability."], imageSrc: content.products[0].imageSrc, demoUrl: content.products[0].demoUrl, icon: "PanelsTopLeft", wide: false, ...(entry.id === "ai" ? { group: "development" as const } : {}) }])}>Add product card</button>
      </>}
      {section === "Process & FAQs" && <>
        <section className="space-y-5"><h2 className="text-xl font-semibold">How we work</h2>{content.process.map((step, index) => <div key={index} className="space-y-4 border border-zinc-300 p-5 dark:border-zinc-700"><Field label={`Step ${index + 1} title`} value={step.title} onChange={v => update("process", content.process.map((s, i) => i === index ? { ...s, title: v } : s))} /><Field label="Step description" multiline value={step.description} onChange={v => update("process", content.process.map((s, i) => i === index ? { ...s, description: v } : s))} /><button className={buttonClass} disabled={content.process.length === 1} onClick={() => update("process", content.process.filter((_, i) => i !== index))}>Remove step {index + 1}</button></div>)}<button className={buttonClass} onClick={() => update("process", [...content.process, { title: "New step", description: "Describe this step." }])}>Add step</button></section>
        <section className="space-y-5"><h2 className="text-xl font-semibold">Frequently asked questions</h2>{content.faqs.map((faq, index) => <div key={index} className="space-y-4 border border-zinc-300 p-5 dark:border-zinc-700"><Field label={`Question ${index + 1}`} value={faq.question} onChange={v => update("faqs", content.faqs.map((f, i) => i === index ? { ...f, question: v } : f))} /><Field label="Answer" multiline value={faq.answer} onChange={v => update("faqs", content.faqs.map((f, i) => i === index ? { ...f, answer: v } : f))} /><button className={buttonClass} onClick={() => update("faqs", content.faqs.filter((_, i) => i !== index))}>Remove question {index + 1}</button></div>)}<button className={buttonClass} onClick={() => update("faqs", [...content.faqs, { question: "New question", answer: "Add an answer." }])}>Add question</button></section>
      </>}
      {section === "SEO" && <><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={content.seo.noindex ?? false} onChange={event => update("seo", { ...content.seo, noindex: event.target.checked })} />Exclude this service from search results after publishing</label><p className="text-sm text-zinc-500">Leave title and description blank to use the pillar name and description. Existing URLs and aliases stay intact.</p><Field label="SEO title" optional value={content.seo.title} onChange={v => update("seo", { ...content.seo, title: v })} /><Field label="SEO description" multiline optional value={content.seo.description} onChange={v => update("seo", { ...content.seo, description: v })} /><CloudinaryUploadButton label="Social sharing image" value={content.seo.image} onChange={v => update("seo", { ...content.seo, image: v })} folder="matii/pillars" /><Field label="Social sharing image path or HTTPS URL" value={content.seo.image} onChange={v => update("seo", { ...content.seo, image: v })} /></>}
    </fieldset>
  </div>;
}
