import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware: Protect /admin/* routes server-side.
 *
 * Security measures:
 * 1. Cookie name must match Supabase v2 pattern (sb-<ref>-auth-token)
 * 2. Cookie value must be non-empty and substantial length (JWTs are always >100 chars)
 * 3. Cookie value must not be an obviously spoofed short string
 *
 * Note: For a production-grade check, use @supabase/ssr to fully decode and
 * verify the JWT server-side. This layer acts as a first-pass guard to prevent
 * unauthenticated page renders.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes, not on /admin/login itself
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Supabase v2 stores the session in a cookie named sb-<project-ref>-auth-token
    // The value is a base64-encoded JSON payload — always well over 200 characters.
    const hasSession = request.cookies.getAll().some(
      (cookie) =>
        cookie.name.startsWith("sb-") &&
        cookie.name.endsWith("-auth-token") &&
        cookie.value.length > 200, // Real Supabase JWTs are always much larger
    );

    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      // Pass the original path so login can redirect back after auth
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Add security headers to all admin responses
  const response = NextResponse.next();
  if (pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
