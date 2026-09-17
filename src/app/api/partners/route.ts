import { NextResponse } from "next/server";
import { getActivePartners } from "@/lib/services/partner.service";

export async function GET() {
  try {
    const partners = await getActivePartners();
    return NextResponse.json({ success: true, data: partners });
  } catch (error) {
    console.error("API /api/partners error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}
