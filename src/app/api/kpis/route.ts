import { NextResponse } from "next/server";
import { getKpis, getKpisByCategory } from "@/lib/services/kpi.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const kpis = category
      ? await getKpisByCategory(category)
      : await getKpis();

    return NextResponse.json({ success: true, data: kpis });
  } catch (error) {
    console.error("API /api/kpis error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch KPIs" },
      { status: 500 }
    );
  }
}
