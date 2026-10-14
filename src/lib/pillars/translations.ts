import { pillarContentSchema, type PillarContent, type PillarLocale } from "./schema";

export const pillarLanguages = { om: "Afaan Oromoo", am: "Amharic", de: "German", pl: "Polish" } as const;
export type PillarTranslation = NonNullable<PillarContent["translations"]>[PillarLocale];
type Section = "Overview" | "Product cards" | "Process & FAQs" | "SEO";
type TextField = { key: string; label: string; section: Section; source: string; maxLength: number };

// One explicit allowlist is shared by the editor, AI request, and public rendering.
function mapText(content: PillarContent, visit: (field: TextField) => string): PillarContent {
  const field = (key: string, source: string, label: string, section: Section = "Overview", maxLength = 12000) => visit({ key, source, label, section, maxLength });
  return {
    ...content,
    name: field("name", content.name, "Pillar name"),
    headline: field("headline", content.headline, "Hero headline"),
    description: field("description", content.description, "Hero description"),
    outcome: field("outcome", content.outcome, "Outcome"),
    portfolioHeading: field("portfolioHeading", content.portfolioHeading, "Portfolio heading"),
    portfolioDescription: field("portfolioDescription", content.portfolioDescription, "Portfolio introduction"),
    listing: {
      ...content.listing,
      title: field("listing.title", content.listing.title, "Listing title"),
      description: field("listing.description", content.listing.description, "Listing description"),
      items: content.listing.items.map((item, i) => field(`listing.items.${i}`, item, `Listing highlight ${i + 1}`)),
    },
    products: content.products.map(product => {
      const key = `products.${product.id}`;
      const label = product.name;
      return { ...product,
        name: field(`${key}.name`, product.name, `${label} · Name`, "Product cards"),
        category: field(`${key}.category`, product.category, `${label} · Category`, "Product cards"),
        description: field(`${key}.description`, product.description, `${label} · Description`, "Product cards"),
        tags: product.tags.map((value, i) => field(`${key}.tags.${i}`, value, `${label} · Tag ${i + 1}`, "Product cards")),
        capabilities: product.capabilities.map((value, i) => field(`${key}.capabilities.${i}`, value, `${label} · Capability ${i + 1}`, "Product cards")),
      };
    }),
    process: content.process.map((step, i) => ({
      title: field(`process.${i}.title`, step.title, `Step ${i + 1} · Title`, "Process & FAQs"),
      description: field(`process.${i}.description`, step.description, `Step ${i + 1} · Description`, "Process & FAQs"),
    })),
    faqs: content.faqs.map((faq, i) => ({
      question: field(`faqs.${i}.question`, faq.question, `FAQ ${i + 1} · Question`, "Process & FAQs"),
      answer: field(`faqs.${i}.answer`, faq.answer, `FAQ ${i + 1} · Answer`, "Process & FAQs"),
    })),
    ...(content.overview ? { overview: { ...content.overview,
      positioning: field("overview.positioning", content.overview.positioning, "Platform positioning"),
      example: field("overview.example", content.overview.example, "Platform example"),
      applications: field("overview.applications", content.overview.applications, "Platform applications"),
      workflow: content.overview.workflow.map((value, i) => field(`overview.workflow.${i}`, value, `Workflow step ${i + 1}`)),
    } } : {}),
    seo: { ...content.seo,
      title: field("seo.title", content.seo.title, "SEO title", "SEO", 200),
      description: field("seo.description", content.seo.description, "SEO description", "SEO", 500),
    },
  };
}

export function getPillarTextFields(content: PillarContent): TextField[] {
  const fields: TextField[] = [];
  mapText(content, field => { if (field.source.trim()) fields.push(field); return field.source; });
  return fields;
}

export function currentTranslation(translation: PillarTranslation, key: string, source: string) {
  return translation?.source[key]?.trim() === source.trim() ? translation?.fields[key]?.trim() : undefined;
}

export function localizePillar(content: PillarContent, locale: string): PillarContent {
  const translation = content.translations?.[locale as PillarLocale];
  if (!translation) return content;
  const localized = mapText(content, field => currentTranslation(translation, field.key, field.source) || field.source);
  return pillarContentSchema.parse(localized);
}

export function validatePillarTranslation(fields: TextField[], output: unknown): Record<string, string> {
  if (!output || typeof output !== "object" || Array.isArray(output)) throw new Error("The translation service returned an invalid response. Please try again.");
  const response = output as Record<string, unknown>;
  const result: Record<string, string> = {};
  for (const field of fields) {
    const value = response[field.key];
    if (typeof value !== "string" || !value.trim() || value.length > field.maxLength) {
      throw new Error(`Translation missing or too long for ${field.label}. Please try again.`);
    }
    result[field.key] = value.trim();
  }
  return result;
}
