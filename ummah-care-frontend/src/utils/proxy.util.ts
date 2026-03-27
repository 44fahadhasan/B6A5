import { TOKEN_CONFIG } from "@/constants/token.const";
import { TokenPayload } from "@/types";
import { type NextRequest, NextResponse } from "next/server";
import { routeRulesUtil } from "./route-rules-util";
import { tokenUtils } from "./token-util";

const {
  getTokens,
  isTokenExpired,
  isTokenExpiringSoon,
  tryRefreshTokenFromProxy,
  getAccessTokenInfo,
} = tokenUtils;

const {
  isAuthRoute,
  getDefaultDashboardRoute,
  getRouteOwner,
  isActiveUser,
  isValidRedirectForUser,
} = routeRulesUtil;

async function handleTokenRefresh(req: NextRequest) {
  try {
    const { sessionToken, refreshToken, accessToken } = await getTokens();
    if (!sessionToken || !refreshToken) {
      console.debug("⏭️ [Proxy] No session or refresh token, skipping refresh");
      return null;
    }

    if (isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken)) {
      console.debug(
        "🔄 [Proxy] Access token expired or expiring soon, so attempting refresh...",
      );

      const isRefresh = await tryRefreshTokenFromProxy();

      if (!isRefresh) {
        console.warn("⚠️ [Proxy] Token refresh failed");
        return null;
      }

      const headers = new Headers(req.headers);
      headers.set(TOKEN_CONFIG.TOKEN_REFRESHED_HEADER, "1");

      return NextResponse.next({ request: { headers } });
    }

    return null;
  } catch (error) {
    console.error("❌ [Proxy] Error in handleTokenRefresh:", error);
    return null;
  }
}

async function handleAuthRouteGuard(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    if (!isAuthRoute(pathname)) return null;

    const { accessToken } = await getTokens();
    const { isValid, decoded } = getAccessTokenInfo(accessToken);
    if (!isValid) {
      console.debug("ℹ️ [Proxy] Invalid token on auth route, allowing passage");
      return null;
    }

    const user = decoded as TokenPayload;

    if (!isActiveUser(user)) {
      console.debug("ℹ️ [Proxy] User inactive on auth route, allowing passage");
      return null;
    }

    const redirectPath = getDefaultDashboardRoute(user);
    if (pathname === redirectPath) return null;

    console.debug(
      `🔀 [Proxy] Redirecting auth user from ${pathname} to ${redirectPath}`,
    );
    return NextResponse.redirect(new URL(redirectPath, req.url));
  } catch (error) {
    console.error("❌ [Proxy] Error in handleAuthRouteGuard:", error);
    return null;
  }
}

function redirectToSignIn(req: NextRequest, pathname: string) {
  const url = new URL("/sign-in", req.url);
  url.searchParams.set("redirect", pathname);

  console.debug(`🔀 [Proxy] Redirecting to sign-in from ${pathname}`);
  return NextResponse.redirect(url);
}

async function handleAccessControl(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const routeOwner = getRouteOwner(pathname);

    // Public route → allow
    if (!routeOwner) {
      console.debug(`✅ [Proxy] Public route: ${pathname}`);
      return NextResponse.next();
    }

    const { sessionToken, refreshToken, accessToken } = await getTokens();

    // Not authenticated → redirect to sign-in
    if (!accessToken || !sessionToken || !refreshToken) {
      console.warn(`🚫 [Proxy] No tokens for protected route: ${pathname}`);
      return redirectToSignIn(req, pathname);
    }

    // Authenticated but token not valid → redirect to sign-in
    const { isValid, decoded } = getAccessTokenInfo(accessToken);
    if (!isValid) {
      console.warn(`🚫 [Proxy] Invalid token for ${pathname}`);
      return redirectToSignIn(req, pathname);
    }

    const user = decoded as TokenPayload;

    // Inactive user → redirect to account-status
    if (!isActiveUser(user)) {
      console.warn(`🚫 [Proxy] Inactive user accessing ${pathname}`);
      return NextResponse.redirect(new URL("/account-status", req.url));
    }

    // COMMON route → any active user can access
    if (routeOwner === "COMMON") {
      console.debug(`✅ [Proxy] COMMON route access granted: ${pathname}`);
      return NextResponse.next();
    }

    // Role/type-based access → redirect to own dashboard if invalid
    if (!isValidRedirectForUser(pathname, user)) {
      const redirectPath = getDefaultDashboardRoute(user);
      console.debug(
        `🔀 [Proxy] Invalid role access, redirecting to ${redirectPath}`,
      );
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    // Authorized → allow
    console.debug(`✅ [Proxy] Access granted to ${pathname}`);
    return NextResponse.next();
  } catch (error) {
    console.error("❌ [Proxy] Error in handleAccessControl:", error);
    // Fail open for unexpected errors
    return NextResponse.next();
  }
}

export const proxyUtils = {
  handleTokenRefresh,
  handleAuthRouteGuard,
  handleAccessControl,
};
