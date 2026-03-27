import { tokenRefresh } from "@/actions/auth-actions";
import { TOKEN_CONFIG } from "@/constants/token.const";
import { headers } from "next/headers";
import { env } from "../../env";
import { cookieUtils } from "./cookie-util";
import { jwtUtils } from "./jwt-util";

const { SESSION_TOKEN_NAME, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } =
  TOKEN_CONFIG;

async function tryRefreshTokenFromProxy(): Promise<boolean> {
  try {
    const { success, message } = await tokenRefresh();

    console.debug("🔄 [Auth] try refresh token from proxy executed", {
      success,
      message,
    });

    return success;
  } catch (error) {
    console.error("Error refreshing token in proxy:", error);
    return false;
  }
}

const tryRefreshTokenFromHttpClient = async (accessToken?: string) => {
  try {
    const requestHeader = await headers();
    const headerName = TOKEN_CONFIG.TOKEN_REFRESHED_HEADER;
    const { isTokenExpired, isTokenExpiringSoon } = tokenUtils;

    // Refresh the access token if it has expired or will expire soon
    const shouldRefresh =
      isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken);
    if (!shouldRefresh) return;

    const tokenAlreadyRefreshed = requestHeader.get(headerName) === "1";
    if (tokenAlreadyRefreshed) return;

    const { success, message } = await tokenRefresh();

    console.debug("🔄 [Auth] try refresh token from http client executed", {
      success,
      message,
    });
  } catch (error) {
    console.error("Error refreshing token in http client:", error);
  }
};

const getRemainingSecondsOfToken = (token?: string): number => {
  try {
    if (!token) return 0;

    const tokenPayload = jwtUtils.decodeToken(token);
    if (!tokenPayload.exp) return 0;

    const currentSeconds = Math.floor(Date.now() / 1000);
    const remainingSeconds = tokenPayload.exp - currentSeconds;

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
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
