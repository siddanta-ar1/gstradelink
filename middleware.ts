import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware: Protect /admin/* routes server-side.
 * Checks for a valid Supabase session cookie before the page renders,
 * preventing the brief flash of admin UI that the client-side useEffect redirect causes.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes, not on /admin/login itself
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Supabase v2 stores the session in a cookie named sb-<project-ref>-auth-token
    const hasSession = request.cookies
      .getAll()
      .some(
        (cookie) =>
          cookie.name.startsWith("sb-") &&
          cookie.name.endsWith("-auth-token"),
      );

    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
