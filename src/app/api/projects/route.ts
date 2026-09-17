import { NextResponse } from "next/server";
import { getAllProjects, getSolutionsBuiltProjects } from "@/lib/services/project.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const solutionsOnly = searchParams.get("solutions") === "true";

    const projects = solutionsOnly
      ? await getSolutionsBuiltProjects()
      : await getAllProjects();

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("API /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
