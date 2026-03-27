import { NextResponse, type NextRequest } from "next/server";
import { proxyUtils } from "./utils/proxy.util";

const { handleTokenRefresh, handleAuthRouteGuard, handleAccessControl } =
  proxyUtils;

export async function proxy(request: NextRequest) {
  try {
    console.debug(
      `📍 [Proxy File] Processing: ${request.method} ${request.nextUrl.pathname}`,
    );

    // 1. Token refresh if expired or expiring soon
    const refreshResponse = await handleTokenRefresh(request);
    if (refreshResponse) {
      console.debug("✅ [Proxy File] Token refresh response returned");
      return refreshResponse;
    }

    // 2. Prevent logged-in users from visiting auth pages
    const authResponse = await handleAuthRouteGuard(request);
    if (authResponse) {
      console.debug("✅ [Proxy File] Auth guard response returned");
      return authResponse;
    }

    // 3. Access control for (public, role, userTypes, and status)
    const accessResponse = await handleAccessControl(request);
    if (accessResponse) {
      console.debug("✅ [Proxy File] Access control response returned");
      return accessResponse;
    }

    // All checks passed → allow request
    console.debug("✅ [Proxy File] All checks passed, allowing request");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ [Proxy File] Critical error in middleware:", error);
    // On unexpected error, allow the request through (fail open)
    return NextResponse.next();
  }
}

export const config = {
  // Exclude API routes, Next.js internals, and all static files (e.g. .png, .css, .js)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
