import { TOKEN_CONFIG } from "@/constants/token.const";
import { IApiResponse } from "@/types";
import axios, { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";
import { env } from "../../env";
import { cookieUtils } from "../utils/cookie-util";
import { tokenUtils } from "../utils/token-util";

interface IRequestOptions extends AxiosRequestConfig {
  isProtected?: boolean;
}

const createAxiosInstance = async (isProtected: boolean) => {
  const headers: AxiosRequestConfig["headers"] = {};

  if (isProtected) {
    const { getTokens, tryRefreshTokenFromHttpClient } = tokenUtils;
    const { sessionToken, accessToken, refreshToken } = await getTokens();

    if (sessionToken && accessToken && refreshToken) {
      await tryRefreshTokenFromHttpClient(accessToken);
    } else if (!sessionToken || !refreshToken) {
      console.debug(
        "⏭️ [Http-Client] Missing session or refresh token, skipping refresh",
      );
    }
  }

  return axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 10000, // 10s
    headers,
    withCredentials: false, // Manually handle cookies via headers
  });
};

/**
 * Extract and persist cookies from api response Set-Cookie headers
 * This ensures tokens sent by backend are properly stored
 */
const setCookiesFromResponse = async (
  responseHeaders: Record<string, unknown>,
) => {
  const setCookieHeader = responseHeaders["set-cookie"];
  if (!setCookieHeader) {
    console.debug("📝 [API] No Set-Cookie headers in response");
    return;
  }

  const cookieArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  console.debug(
    `📝 [API] Found ${cookieArray.length} Set-Cookie header(s) in response`,
  );

  const config = TOKEN_CONFIG;
  const setCookiePromises: Promise<void>[] = [];
  const setCookieResults: Array<{
    name: string;
    success: boolean;
    error?: string;
  }> = [];

  for (const cookieString of cookieArray) {
    try {
      // Parse: "tokenName=value; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400"
      const parts = cookieString.split(";");
      const [nameValue] = parts;

      // Split ONLY on the first = sign (don't count = in JWT tokens)
      const eqIndex = nameValue.indexOf("=");
      if (eqIndex < 0) {
        console.debug(`⏭️ [Api] Skipping malformed cookie: ${nameValue}`);
        continue;
      }

      const name = nameValue.substring(0, eqIndex).trim();
      const value = nameValue.substring(eqIndex + 1).trim();

      if (!name || !value) {
        console.debug(
          `⏭️ [API] Skipping empty cookie name or value: ${name || "(empty)"}`,
        );
        continue;
      }

      // Only set recognized token cookies
      const isToken =
        name === config.SESSION_TOKEN_NAME ||
        name === config.ACCESS_TOKEN_NAME ||
        name === config.REFRESH_TOKEN_NAME;

      console.debug(
        `📋 [API] Found cookie in response: ${name} ${isToken ? "(TOKEN)" : "(ignored)"}`,
      );

      if (isToken) {
        // Decode the value if URL-encoded (handle both encoded and raw values)
        let decodedValue = value;
        try {
          decodedValue = decodeURIComponent(value);
        } catch {
          // If decoding fails, use the value as-is
          decodedValue = value;
        }

        // Extract Max-Age from cookie string if available
        const maxAgeMatch = cookieString.match(/Max-Age=(\d+)/i);
        const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : 24 * 60 * 60; // 24h default

        // Add promise to array - DON'T await here
        setCookiePromises.push(
          cookieUtils
            .setCookie(name, decodedValue, maxAge)
            .then(() => {
              console.debug(
                `[Cookie] Set cookie: "${name}" (source: API response headers)`,
              );
              setCookieResults.push({ name, success: true });
            })
            .catch((err) => {
              console.error(`❌ [Cookie] Failed to set ${name}:`, err);
              setCookieResults.push({
                name,
                success: false,
                error: String(err),
              });
            }),
        );
      }
    } catch (err) {
      console.error("Error parsing cookie:", err);
    }
  }

  // Wait for ALL cookies to be written before returning
  try {
    await Promise.all(setCookiePromises);
    const successes = setCookieResults.filter((r) => r.success).length;
    const failures = setCookieResults.filter((r) => !r.success);
    console.debug(
      `📦 [Cookie] Persistence complete: ${successes}/${setCookieResults.length} successful`,
    );
    if (failures.length > 0) {
      console.error(
        `⚠️ [Cookie] ${failures.length} cookie(s) failed to persist:`,
        failures,
      );
    }
  } catch (err) {
    console.error("❌ [Cookie] Promise.all failed:", err);
  }
};

/**
 * Main API request handler - handles cookie management, token refresh, and response extraction
 */
const apiRequest = async <T>(
  method: Method,
  endpoint: string,
  data?: unknown,
  options?: IRequestOptions,
): Promise<IApiResponse<T>> => {
  const { isProtected = true, ...axiosOptions } = options || {};
  const instance = await createAxiosInstance(isProtected);

  try {
    // Read fresh cookies RIGHT BEFORE making request
    // This ensures we get any cookies set by proxy middleware or other server actions
    const cookieStore = await cookies();

    // Extract only cookie name=value pairs (not attributes like Path, Secure, etc)
    // Only include auth-related cookies, filter out Next.js internal cookies
    const cookieList: string[] = [];

    cookieStore.getAll().forEach((cookie) => {
      // Only forward auth-related cookies to the API
      if (
        cookie.name === TOKEN_CONFIG.SESSION_TOKEN_NAME ||
        cookie.name === TOKEN_CONFIG.ACCESS_TOKEN_NAME ||
        cookie.name === TOKEN_CONFIG.REFRESH_TOKEN_NAME
      ) {
        cookieList.push(`${cookie.name}=${cookie.value}`);
        console.debug(`📋 [Http-Client] Including cookie: ${cookie.name}`);
      }
    });

    const cookieHeader = cookieList.join("; ");

    if (cookieHeader) {
      instance.defaults.headers.common["Cookie"] = cookieHeader;
      console.debug(
        `📤 [Http-Client] Set fresh cookies for request: ${cookieList.length} cookies [${cookieList.map((c) => c.split("=")[0]).join(", ")}]`,
      );
    } else {
      console.debug("📤 [Http-Client] No auth cookies found for request");
    }

    const response = await instance.request<IApiResponse<T>>({
      url: endpoint,
      method,
      data,
      ...axiosOptions,
    });

    // Extract and persist cookies from response BEFORE returning data
    if (isProtected && response.headers) {
      console.debug("📝 [API] Extracting cookies from response headers");
      await setCookiesFromResponse(response.headers);
    }

    return response.data;
  } catch (error) {
    console.error(`❌ [API] ${method} ${endpoint} failed:`, error);
    throw error;
  }
};

export const httpClient = {
  get: <T>(endpoint: string, options?: IRequestOptions) =>
    apiRequest<T>("GET", endpoint, undefined, options),

  post: <T>(endpoint: string, data?: unknown, options?: IRequestOptions) =>
    apiRequest<T>("POST", endpoint, data, options),

  put: <T>(endpoint: string, data?: unknown, options?: IRequestOptions) =>
    apiRequest<T>("PUT", endpoint, data, options),

  patch: <T>(endpoint: string, data?: unknown, options?: IRequestOptions) =>
    apiRequest<T>("PATCH", endpoint, data, options),

  delete: <T>(endpoint: string, options?: IRequestOptions) =>
    apiRequest<T>("DELETE", endpoint, undefined, options),
};
