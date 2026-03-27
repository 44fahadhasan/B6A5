import { NextResponse, type NextRequest } from "next/server";
import { proxyUtils } from "./utils/proxy.util";

const { handleTokenRefresh, handleAuthRouteGuard, handleAccessControl } =
  proxyUtils;

export async function proxy(request: NextRequest) {
  try {
    // 1. Token refresh if expired or expiring soon
    const refreshResponse = await handleTokenRefresh(request);
    if (refreshResponse) return refreshResponse;

    // 2. Prevent logged-in users from visiting auth pages
    const authResponse = await handleAuthRouteGuard(request);
    if (authResponse) return authResponse;

    // 3. Access control for (public, role, userTypes, and status)
    const accessResponse = await handleAccessControl(request);
    if (accessResponse) return accessResponse;

    // All checks passed → allow request
    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  // Exclude API routes, Next.js internals, and all static files (e.g. .png, .css, .js)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
