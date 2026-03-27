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
  const { sessionToken, refreshToken, accessToken } = await getTokens();
  if (!sessionToken || !refreshToken) return null;

  if (isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken)) {
    const isRefresh = await tryRefreshTokenFromProxy();
    if (!isRefresh) return null;

    const headers = new Headers(req.headers);
    headers.set(TOKEN_CONFIG.TOKEN_REFRESHED_HEADER, "1");

    return NextResponse.next({ request: { headers } });
  }

  return null;
}

async function handleAuthRouteGuard(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isAuthRoute(pathname)) return null;

  const { accessToken } = await getTokens();
  const { isValid, decoded } = getAccessTokenInfo(accessToken);
  if (!isValid) return null;

  const user = decoded as TokenPayload;

  if (!isActiveUser(user)) return null;

  const redirectPath = getDefaultDashboardRoute(user);
  if (pathname === redirectPath) return null;

  return NextResponse.redirect(new URL(redirectPath, req.url));
}

function redirectToSignIn(req: NextRequest, pathname: string) {
  const url = new URL("/sign-in", req.url);
  url.searchParams.set("redirect", pathname);
  return NextResponse.redirect(url);
}

async function handleAccessControl(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const routeOwner = getRouteOwner(pathname);

  // Public route → allow
  if (!routeOwner) return NextResponse.next();

  const { sessionToken, refreshToken, accessToken } = await getTokens();

  // Not authenticated → redirect to sign-in
  if (!accessToken || !sessionToken || !refreshToken) {
    return redirectToSignIn(req, pathname);
  }

  // authenticated but token not valid → redirect to sign-in
  const { isValid, decoded } = getAccessTokenInfo(accessToken);
  if (!isValid) return redirectToSignIn(req, pathname);

  const user = decoded as TokenPayload;

  // Inactive user → redirect to account-status
  if (!isActiveUser(user)) {
    return NextResponse.redirect(new URL("/account-status", req.url));
  }

  // COMMON route → any active user can access
  if (routeOwner === "COMMON") return NextResponse.next();

  // Role/type-based access → redirect to own dashboard if invalid
  if (!isValidRedirectForUser(pathname, user)) {
    const redirectPath = getDefaultDashboardRoute(user);
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // Authorized → allow
  return NextResponse.next();
}

export const proxyUtils = {
  handleTokenRefresh,
  handleAuthRouteGuard,
  handleAccessControl,
};
