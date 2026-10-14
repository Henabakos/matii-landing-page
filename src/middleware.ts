import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Authentication logic
  if (pathname.startsWith("/admin")) {
    const adminCookie = request.cookies.get("Matii_admin_auth")?.value;
    const isAuthenticated =
      adminCookie === "authenticated_Matii_admin_session_valid";

    if (pathname !== "/admin/login" && !isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/admin/login" && isAuthenticated) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }

    return NextResponse.next();
  }

  // 2. Ignore API routes and public static files
  if (pathname.startsWith("/api") || pathname === "/social-image") {
    return NextResponse.next();
  }

  // 3. Run next-intl localized routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - if they start with `/api`, `/_next` or `/_vercel`
    // - the ones containing a dot (e.g. `favicon.ico`, `images/`, `shapes/`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/admin/:path*",
  ],
};
