import { NextResponse } from "next/server";
import { getAllNewsArticles, getFeaturedNews } from "@/lib/services/news.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";

    if (featuredOnly) {
      const featured = await getFeaturedNews();
      return NextResponse.json({ success: true, data: featured });
    }

    const news = await getAllNewsArticles();
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("API /api/news error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news articles" },
      { status: 500 }
    );
  }
}
