import { NextRequest, NextResponse } from "next/server";
import { translateText, translateFields } from "@/lib/services/ai-translate.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fields = body.sourceTexts || body.sourceFields || body.fields;
    const targetLangs = body.targetLangs || body.targetLocales;
    const sourceLocale = body.sourceLang || body.sourceLocale || "en";

    // Batch translation across multiple target languages (used by AutoTranslateButton)
    if (fields && typeof fields === "object" && Array.isArray(targetLangs) && targetLangs.length > 0) {
      const translations: Record<string, Record<string, string>> = {};

      await Promise.all(
        targetLangs.map(async (lang) => {
          const translated = await translateFields({
            fields,
            targetLocale: lang,
            sourceLocale,
          });
          translations[lang] = translated;
        })
      );

      return NextResponse.json({
        success: true,
        translations,
        data: translations,
      });
    }

    // Single language batch translation
    if (fields && typeof fields === "object" && body.targetLocale) {
      const translated = await translateFields({
        fields,
        targetLocale: body.targetLocale,
        sourceLocale,
      });
      return NextResponse.json({ success: true, data: translated });
    }

    // Single text translation
    if (body.text && body.targetLocale) {
      const translated = await translateText({
        text: body.text,
        targetLocale: body.targetLocale,
        sourceLocale,
        context: body.context,
      });
      return NextResponse.json({ success: true, data: translated });
    }

    return NextResponse.json(
      { success: false, error: "Invalid translation payload" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Translation error" },
      { status: 500 }
    );
  }
}
