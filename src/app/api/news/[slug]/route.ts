import { NextResponse } from "next/server";
import { getNewsArticleBySlug } from "@/lib/services/news.service";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const news = await getNewsArticleBySlug(slug);

    if (!news) {
      return NextResponse.json(
        { success: false, error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("API /api/news/[slug] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news article" },
      { status: 500 }
    );
  }
}
