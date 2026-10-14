/**
 * AI Translation Service for Dynamic CMS & Database Contents
 *
 * Automatically localizes dynamic content (Projects, Blog Posts, Careers, KPIs)
 * into target locales (am, om, de, pl) via Google Gemini (Free) or OpenAI.
 */

export interface TranslationInput {
  text: string;
  targetLocale: string;
  sourceLocale?: string;
  context?: string;
}

export interface BatchTranslationInput {
  fields: Record<string, string>;
  targetLocale: string;
  sourceLocale?: string;
  strict?: boolean;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  am: "Amharic (አማርኛ)",
  om: "Afaan Oromoo (Oromo)",
  de: "German (Deutsch)",
  pl: "Polish (Polski)",
};

/**
 * Translates multiple fields of an object using Google Gemini or OpenAI.
 */
export async function translateFields({
  fields,
  targetLocale,
  sourceLocale = "en",
  strict = false,
}: BatchTranslationInput): Promise<Record<string, string>> {
  if (targetLocale === sourceLocale || Object.keys(fields).length === 0) {
    return fields;
  }

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  const targetLangName = LANGUAGE_NAMES[targetLocale] || targetLocale;

  // 1. Try Google Gemini API (Free tier available at aistudio.google.com)
  if (geminiKey) {
    const candidateModels = [
      "gemini-3-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.0-flash",
      "gemini-3.1-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
      "gemini-flash",
      "gemini-pro",
    ];

    const prompt = `You are a professional technical translator for a high-end software engineering studio (MATII TECHNOLOGIES).
Translate all string values in the following JSON into ${targetLangName}.
Keep all JSON keys identical. Preserve any HTML tags or code blocks unmodified.
Return ONLY valid JSON matching the input schema.

Input JSON:
${JSON.stringify(fields, null, 2)}`;

    for (const modelName of candidateModels) {
      try {
        console.log(`[Translate API] 🌐 Translating via Gemini (${modelName}) for ${targetLangName}...`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            signal: AbortSignal.timeout(30_000),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          // If 404 (model name changed or unavailable), try next model candidate
          if (response.status === 404) {
            continue;
          }
          console.error(`[Translate API] Gemini API error (${response.status}):`, errText);
          break;
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          console.log(`[Translate API] ✅ Gemini (${modelName}) successfully translated into ${targetLangName}`);
          return parsed;
        }
      } catch (err: any) {
        console.error(`[Translate API] Gemini translation failed with ${modelName} for ${targetLangName}:`, err.message);
      }
    }
  }

  // 2. Try OpenAI API (gpt-4o-mini)
  if (openAiKey) {
    try {
      console.log(`[Translate API] 🌐 Translating via OpenAI (gpt-4o-mini) for ${targetLangName}...`);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal: AbortSignal.timeout(30_000),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are a professional technical translator for MATII TECHNOLOGIES. Translate all field values in the provided JSON into ${targetLangName}. Keep the JSON keys identical. Preserve HTML formatting tags. Return ONLY the valid JSON object.`,
            },
            {
              role: "user",
              content: JSON.stringify(fields),
            },
          ],
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Translate API] OpenAI API error (${response.status}):`, errText);
        if (strict) throw new Error("The translation provider could not complete the request. Check its API key and quota, then try again.");
        return fields;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        console.log(`[Translate API] ✅ OpenAI successfully translated into ${targetLangName}`);
        return parsed;
      }
    } catch (error: any) {
      console.error(`[Translate API] OpenAI translation failed for ${targetLangName}:`, error.message);
      if (strict) throw new Error("Translation failed. Check the translation provider's API key and quota, then try again.");
      return fields;
    }
  }

  if (strict) throw new Error("Translation is unavailable. Configure a working GEMINI_API_KEY or OPENAI_API_KEY on the server and try again.");
  // 3. Fallback when no API key is provided
  console.warn(
    `[Translate API] ⚠️ No API key found in .env. To enable real translations, add GEMINI_API_KEY (Free at aistudio.google.com) or OPENAI_API_KEY to your .env file.`
  );
  return fields;
}

/**
 * Translates a single text string.
 */
export async function translateText({
  text,
  targetLocale,
  sourceLocale = "en",
}: TranslationInput): Promise<string> {
  const result = await translateFields({
    fields: { text },
    targetLocale,
    sourceLocale,
  });
  return result.text || text;
}
