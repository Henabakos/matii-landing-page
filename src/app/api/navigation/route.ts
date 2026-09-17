import { NextResponse } from "next/server";
import { getAllNavMenus, upsertNavMenu, deleteNavMenu } from "@/lib/services/navigation.service";

export async function GET() {
  try {
    const menus = await getAllNavMenus();
    return NextResponse.json({ success: true, data: menus });
  } catch (error) {
    console.error("API /api/navigation GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch navigation menus" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.key || !body.label) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: key and label are required" },
        { status: 400 }
      );
    }

    const categories = Array.isArray(body.categories) ? body.categories : [];
    const saved = await upsertNavMenu({ ...body, categories });
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error("API /api/navigation POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save navigation menu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    if (!key) {
      return NextResponse.json(
        { success: false, error: "Missing 'key' parameter" },
        { status: 400 }
      );
    }

    const success = await deleteNavMenu(key);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("API /api/navigation DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete navigation menu" },
      { status: 500 }
    );
  }
}
