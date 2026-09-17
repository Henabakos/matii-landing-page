import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/services/blog.service";

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("API /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
