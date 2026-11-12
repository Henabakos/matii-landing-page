import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

// Configure marked with GitHub Flavored Markdown and line breaks
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Accurately determines if a content string is formatted as rich HTML
 * rather than legacy raw Markdown or plain text.
 */
export function isHtmlContent(content: string): boolean {
  if (!content || typeof content !== "string") return false;
  const trimmed = content.trim();

  // If it starts with standard HTML block tags, it's HTML
  if (/^<(p|h[1-6]|ul|ol|table|blockquote|pre|div|section|article)[\s>]/i.test(trimmed)) {
    return true;
  }

  // If it has multiple closed HTML tags like <p>...</p>, <ul>...</ul>, <h1>...</h1>
  const htmlTagCount = (trimmed.match(/<\/(p|h[1-6]|ul|ol|li|table|tr|td|th|blockquote|pre|code|strong|em|u)>/gi) || []).length;
  if (htmlTagCount >= 2) {
    return true;
  }

  return false;
}

/**
 * Normalizes input content to semantic HTML.
 * If the input is Markdown (e.g., from older database seeds), it compiles it to semantic HTML.
 * If it is already HTML, it ensures clean structure.
 */
export function normalizeToHtml(content: string): string {
  if (!content || typeof content !== "string") return "";
  const trimmed = content.trim();
  if (!trimmed) return "";

  if (isHtmlContent(trimmed)) {
    return trimmed;
  }

  // Compile legacy markdown into semantic HTML
  try {
    const compiled = marked.parse(trimmed, { async: false }) as string;
    return compiled.trim();
  } catch (err) {
    console.error("Error converting markdown to HTML:", err);
    // Fallback: wrap plain paragraphs
    return trimmed
      .split(/\n\n+/)
      .map((p) => `<p>${p.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`)
      .join("");
  }
}

/**
 * Strict production-grade HTML sanitization.
 * Prevents XSS, script injection, dangerous event handlers (e.g. onclick, onerror),
 * and malicious javascript: pseudo-URLs while allowing all rich editor elements.
 */
export function sanitizeContent(html: string): string {
  if (!html || typeof html !== "string") return "";

  const clean = sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "div",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "del",
      "sub",
      "sup",
      "mark",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "hr",
      "br",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
      "colgroup",
      "col",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel", "title", "class"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading", "class"],
      th: ["colspan", "rowspan", "align", "valign", "class", "style"],
      td: ["colspan", "rowspan", "align", "valign", "class", "style"],
      table: ["class", "style", "border", "cellpadding", "cellspacing"],
      code: ["class"],
      pre: ["class"],
      span: ["class", "style"],
      p: ["class", "style"],
      div: ["class", "style"],
      h1: ["class", "style"],
      h2: ["class", "style"],
      h3: ["class", "style"],
      h4: ["class", "style"],
      h5: ["class", "style"],
      h6: ["class", "style"],
      blockquote: ["class", "style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
        "font-weight": [/^\d+$/, /^bold$/],
        "font-style": [/^italic$/],
        "text-decoration": [/^underline$/, /^line-through$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "data"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
      a: ["http", "https", "mailto"],
    },
    transformTags: {
      // The page title owns h1; editor headings belong below it.
      h1: "h2",
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const isExternal = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal
              ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
              : {}),
          },
        };
      },
      table: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          class: (attribs.class ? `${attribs.class} Matii-table` : "Matii-table").trim(),
        },
      }),
    },
  });

  return clean;
}

/**
 * Returns plain text metrics for read-time calculation and admin statistics.
 */
export function getWordAndCharStats(content: string) {
  const plainText = (content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = plainText ? plainText.split(/\s+/).length : 0;
  const chars = plainText.length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    wordCount: words,
    charCount: chars,
    readTime: `${minutes} min read`,
  };
}

/** True when HTML contains readable text or media (an empty editor emits `<p></p>`). */
export function hasVisibleHtml(html: string): boolean {
  if (!html || typeof html !== "string") return false;
  if (/<(img|table|hr)\b/i.test(html)) return true;
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;
}

/**
 * Case-study sections are stored as a JSON string array. Legacy rows hold plain-text paragraphs
 * (one per item); rich-text rows hold a single HTML document. Both become one HTML string here.
 */
export function paragraphsToHtml(paragraphs: string[] | string | null | undefined): string {
  const list = Array.isArray(paragraphs) ? paragraphs : paragraphs ? [paragraphs] : [];
  return list
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => normalizeToHtml(item))
    .join("");
}

/** Inverse of paragraphsToHtml for storage: one HTML document, or nothing when the editor is empty. */
export function htmlToParagraphList(html: string | null | undefined): string[] {
  const trimmed = (html || "").trim();
  return hasVisibleHtml(trimmed) ? [trimmed] : [];
}

export interface HtmlHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Adds stable ids to h2/h3 so long sections can render an in-page outline. Run after sanitizing. */
export function addHeadingAnchors(html: string, idPrefix: string): { html: string; headings: HtmlHeading[] } {
  const headings: HtmlHeading[] = [];
  const used = new Set<string>();
  const output = (html || "").replace(/<(h[23])((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (!text) return match;
    const base = `${idPrefix}-${text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "section"}`;
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    headings.push({ id, text, level: tag.toLowerCase() === "h2" ? 2 : 3 });
    return `<${tag} id="${id}"${attrs.replace(/\sid="[^"]*"/i, "")}>${inner}</${tag}>`;
  });
  return { html: output, headings };
}
