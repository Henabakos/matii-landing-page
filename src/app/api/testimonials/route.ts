import { NextResponse } from "next/server";
import { getActiveTestimonials } from "@/lib/services/testimonial.service";

export async function GET() {
  try {
    const testimonials = await getActiveTestimonials();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("API /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
