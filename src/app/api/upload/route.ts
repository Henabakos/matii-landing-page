import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let file: File | null = null;
    let url: string | null = null;
    let svgCode: string | null = null;
    let folder = "Matii_cms";

    if (contentType.includes("application/json")) {
      const json = await req.json();
      url = json.url || null;
      svgCode = json.svg || null;
      folder = json.folder || folder;
    } else {
      const formData = await req.formData();
      file = formData.get("file") as File | null;
      url = (formData.get("url") as string) || null;
      svgCode = (formData.get("svg") as string) || null;
      folder = (formData.get("folder") as string) || folder;
    }

    // 1. Direct SVG Code Input (e.g. copied from Logoipsum or vector libraries)
    if (svgCode && svgCode.trim().startsWith("<svg")) {
      const buffer = Buffer.from(svgCode.trim(), "utf-8");
      const result = await uploadImageToCloudinary(buffer, folder, "image/svg+xml");
      return NextResponse.json({
        success: true,
        url: result.url,
        public_id: result.public_id,
      });
    }

    // 2. Remote Web URL or Local Asset Path
    if (url && url.trim()) {
      const trimmedUrl = url.trim();

      // If user pasted raw SVG code into the URL field
      if (trimmedUrl.startsWith("<svg")) {
        const buffer = Buffer.from(trimmedUrl, "utf-8");
        const result = await uploadImageToCloudinary(buffer, folder, "image/svg+xml");
        return NextResponse.json({
          success: true,
          url: result.url,
          public_id: result.public_id,
        });
      }

      // If already a local asset or Cloudinary URL, accept directly
      if (trimmedUrl.startsWith("/") || trimmedUrl.includes("res.cloudinary.com")) {
        return NextResponse.json({
          success: true,
          url: trimmedUrl,
          public_id: "local_or_cdn",
        });
      }

      // Clean file:/// URIs (local browser copy)
      if (trimmedUrl.startsWith("file:///")) {
        throw new Error("Local file:/// paths cannot be read directly by web browsers. Please use the 'Upload Image' tab to select this file from your device.");
      }

      // Fetch external web asset
      const webRes = await fetch(trimmedUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "image/*,text/html,*/*",
        },
      });

      if (!webRes.ok) {
        throw new Error(`Unable to fetch URL (HTTP ${webRes.status}). Please check that the URL is public and accessible.`);
      }

      const resContentType = (webRes.headers.get("content-type") || "").toLowerCase();

      // Case A: Direct image or SVG file
      if (
        resContentType.startsWith("image/") ||
        trimmedUrl.endsWith(".svg") ||
        trimmedUrl.endsWith(".png") ||
        trimmedUrl.endsWith(".jpg") ||
        trimmedUrl.endsWith(".jpeg") ||
        trimmedUrl.endsWith(".webp")
      ) {
        const arrayBuffer = await webRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeType = resContentType.split(";")[0] || (trimmedUrl.endsWith(".svg") ? "image/svg+xml" : "image/png");
        const result = await uploadImageToCloudinary(buffer, folder, mimeType);
        return NextResponse.json({
          success: true,
          url: result.url,
          public_id: result.public_id,
        });
      }

      // Case B: Webpage containing embedded SVG logo (e.g. Logoipsum.com/artwork/440)
      if (resContentType.includes("text/html")) {
        const html = await webRes.text();
        
        // Check for Logoipsum or explicit default logo
        const logoMatch =
          html.match(/<svg[^>]*aria-label="Default logo"[\s\S]*?<\/svg>/i) ||
          html.match(/<svg[^>]*class="[^"]*logo[^"]*"[\s\S]*?<\/svg>/i) ||
          html.match(/<svg[\s\S]*?<\/svg>/i);

        if (logoMatch && logoMatch[0]) {
          const buffer = Buffer.from(logoMatch[0], "utf-8");
          const result = await uploadImageToCloudinary(buffer, folder, "image/svg+xml");
          return NextResponse.json({
            success: true,
            url: result.url,
            public_id: result.public_id,
            source: "extracted_svg",
          });
        }

        // Check for OpenGraph image tag
        const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        if (ogImage && ogImage[1]) {
          const imgUrl = ogImage[1].startsWith("http") ? ogImage[1] : new URL(ogImage[1], trimmedUrl).toString();
          const imgRes = await fetch(imgUrl);
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            const result = await uploadImageToCloudinary(buffer, folder, "image/png");
            return NextResponse.json({
              success: true,
              url: result.url,
              public_id: result.public_id,
              source: "og_image",
            });
          }
        }

        throw new Error(
          "The provided link is an HTML webpage, and no logo could be automatically extracted. Please right-click the logo image on the site and choose 'Copy Image Address', or copy the SVG code directly."
        );
      }

      throw new Error(`Unsupported content type: ${resContentType}. Please provide a direct link to an image file (SVG, PNG, JPG, WebP).`);
    }

    // 3. File Upload via Multipart FormData
    if (!file) {
      return NextResponse.json(
        { error: "No image file or URL provided" },
        { status: 400 }
      );
    }

    // Validate mime type: images, PDFs, and Word documents
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const isAllowed =
      file.type.startsWith("image/") ||
      allowedMimeTypes.includes(file.type) ||
      file.name.endsWith(".svg") ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx");

    if (!isAllowed) {
      return NextResponse.json(
        { error: "Only image files (SVG, PNG, JPG, WebP) and documents are supported" },
        { status: 400 }
      );
    }

    // Limit file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.name.endsWith(".svg") ? "image/svg+xml" : file.type;

    const result = await uploadImageToCloudinary(buffer, folder, mimeType);

    return NextResponse.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.error("Cloudinary upload API route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process image" },
      { status: 400 }
    );
  }
}
