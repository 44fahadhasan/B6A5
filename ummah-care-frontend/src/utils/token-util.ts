import { tokenRefresh } from "@/actions/auth-actions";
import { TOKEN_CONFIG } from "@/constants/token.const";
import { headers } from "next/headers";
import { env } from "../../env";
import { cookieUtils } from "./cookie-util";
import { jwtUtils } from "./jwt-util";

const { SESSION_TOKEN_NAME, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } =
  TOKEN_CONFIG;

// Prevent concurrent refresh token calls (race condition guard)
let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshTokenFromProxy(): Promise<boolean> {
  try {
    // If refresh is already in progress, wait for it instead of creating new one
    if (refreshPromise) {
      console.debug("🔄 [Auth] Token refresh already in progress, waiting...");
      return refreshPromise;
    }

    // Mark refresh as in-progress
    refreshPromise = (async () => {
      try {
        const { success, message } = await tokenRefresh();

        console.debug("🔄 [Auth] Token refresh from proxy completed", {
          success,
          message,
        });

        return success;
      } catch (error) {
        console.error("❌ [Auth] Error refreshing token in proxy:", error);
        return false;
      }
    })();

    return await refreshPromise;
  } catch (error) {
    console.error(
      "❌ [Auth] Unexpected error in tryRefreshTokenFromProxy:",
      error,
    );
    return false;
  } finally {
    // Clear the promise so next refresh can proceed
    refreshPromise = null;
  }
}

const tryRefreshTokenFromHttpClient = async (accessToken?: string) => {
  try {
    // If no access token, skip refresh entirely (user not authenticated)
    if (!accessToken) {
      console.debug(
        "⏭️ [Auth] No access token, skipping refresh (user likely not authenticated)",
      );
      return;
    }

    // If refresh is already in progress, don't start another one
    if (refreshPromise) {
      console.debug(
        "🔄 [Auth] Token refresh already in progress from another request, skipping...",
      );
      await refreshPromise;
      return;
    }

    const requestHeader = await headers();
    const headerName = TOKEN_CONFIG.TOKEN_REFRESHED_HEADER;
    const { isTokenExpired, isTokenExpiringSoon } = tokenUtils;

    // Check if token needs refresh
    const shouldRefresh =
      isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken);

    if (!shouldRefresh) {
      console.debug("✅ [Auth] Token still valid, no refresh needed");
      return;
    }

    // Check if token was already refreshed in this request cycle
    const tokenAlreadyRefreshed = requestHeader.get(headerName) === "1";

    if (tokenAlreadyRefreshed) {
      console.debug("ℹ️ [Auth] Token already refreshed in this cycle");
      return;
    }

    console.debug(
      "🔄 [Auth] Token expired or expiring soon, so attempting refresh...",
    );

    // Start refresh
    refreshPromise = (async () => {
      try {
        const { success, message } = await tokenRefresh();

        console.debug("🔄 [Auth] Token refresh from http client completed", {
          success,
          message,
        });

        return success;
      } catch (error) {
        console.error(
          "❌ [Auth] Error refreshing token in http client:",
          error,
        );
        return false;
      }
    })();

    await refreshPromise;
  } catch (error) {
    console.error(
      "❌ [Auth] Unexpected error in tryRefreshTokenFromHttpClient:",
      error,
    );
  } finally {
    refreshPromise = null;
  }
};

const getRemainingSecondsOfToken = (token?: string): number => {
  try {
    if (!token) {
      console.debug("⏭️ [Token] No token provided to check expiration");
      return 0;
    }

    const tokenPayload = jwtUtils.decodeToken(token);

    // Handle null payload gracefully
    if (!tokenPayload || !tokenPayload.exp) {
      console.debug("⏭️ [Token] Invalid token payload or no exp claim");
      return 0;
    }

    const currentSeconds = Math.floor(Date.now() / 1000);
    const remainingSeconds = tokenPayload.exp - currentSeconds;

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.debug("⚠️ [Token] Error decoding token:", error);
    return 0;
  }
};

const isTokenExpiringSoon = (
  token?: string,
  thresholdSeconds = 300,
): boolean => {
  const remainingSeconds = getRemainingSecondsOfToken(token);
  return remainingSeconds > 0 && remainingSeconds <= thresholdSeconds;
};

const isTokenExpired = (token?: string) => {
  const remainingSeconds = getRemainingSecondsOfToken(token);
  return remainingSeconds === 0;
};

const setTokenIntoCookie = async (
  name: string,
  token: string,
  maxAgeInSeconds: number,
) => {
  await cookieUtils.setCookie(name, token, maxAgeInSeconds);
};

const getTokens = async () => {
  const sessionToken = await cookieUtils.getCookie(SESSION_TOKEN_NAME);
  const accessToken = await cookieUtils.getCookie(ACCESS_TOKEN_NAME);
  const refreshToken = await cookieUtils.getCookie(REFRESH_TOKEN_NAME);

  return { sessionToken, accessToken, refreshToken };
};

const getAccessTokenInfo = (token?: string) => {
  const { success, data } = token
    ? jwtUtils.verifyToken(token, env.ACCESS_TOKEN_SECRET)
    : {};

  return { decoded: data, isValid: success };
};

export const tokenUtils = {
  getTokens,
  isTokenExpired,
  getAccessTokenInfo,
  setTokenIntoCookie,
  isTokenExpiringSoon,
  tryRefreshTokenFromProxy,
  tryRefreshTokenFromHttpClient,
};
