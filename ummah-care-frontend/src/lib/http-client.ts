import { IApiResponse } from "@/types";
import axios, { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";
import { env } from "../../env";
import { tokenUtils } from "../utils/token-util";

interface IRequestOptions extends AxiosRequestConfig {
  isProtected?: boolean;
}

const createAxiosInstance = async (isProtected: boolean) => {
  const headers: AxiosRequestConfig["headers"] = {};

  if (isProtected) {
    const { getTokens, tryRefreshTokenFromHttpClient } = tokenUtils;
    const { sessionToken, accessToken, refreshToken } = await getTokens();

    // Refresh token if need
    if (sessionToken && refreshToken) {
      await tryRefreshTokenFromHttpClient(accessToken);
    }

    // Forward cookies
    const cookieStore = await cookies();
    headers["Cookie"] = cookieStore.toString();
  }

  return axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 15000, // 15 seconds
    headers,
  });
};

const apiRequest = async <T>(
  method: Method,
  endpoint: string,
  data?: unknown,
  options?: IRequestOptions,
): Promise<IApiResponse<T>> => {
  const { isProtected = true, ...axiosOptions } = options || {};
  const instance = await createAxiosInstance(isProtected);

  const response = await instance.request<IApiResponse<T>>({
    url: endpoint,
    method,
    data,
    ...axiosOptions,
  });

  return response.data;
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
