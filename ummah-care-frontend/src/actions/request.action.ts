"use server";

import {
  myRequestCancelSchema,
  myRequestSchema,
} from "@/components/modules/my-requests/my-requests.schema";
import { httpClient } from "@/lib/http-client";
import {
  IMyRequestResponse,
  IRequestDetailsResponse,
  IRequestResponse,
} from "@/types";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const createMyRequest = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, myRequestSchema);
    if (!result.success) return result;

    const response = await httpClient.post<IRequestResponse>(
      "/requests",
      result.data,
    );
    return response;
  });

export const getRequests = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString ? `/requests?${queryString}` : "/requests";

    const response = await httpClient.get<IRequestResponse[]>(endpoint, {
      isProtected: false,
    });
    return response;
  });

export const getMyRequests = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/requests/me?${queryString}`
      : "/requests/me";

    const response = await httpClient.get<IRequestResponse[]>(endpoint);
    return response;
  });

export const getResponsesByRequest = async (
  requestId: string,
  queryString?: string,
) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/requests/${requestId}/responses?${queryString}`
      : `/requests/${requestId}/responses`;

    const response = await httpClient.get<IMyRequestResponse[]>(endpoint);
    return response;
  });

export const getRequestById = async (id: string) =>
  safeRequest(async () => {
    const response = await httpClient.get<IRequestDetailsResponse>(
      `/requests/${id}`,
      {
        isProtected: false,
      },
    );
    return response;
  });

export const updateMyRequest = async (
  requestId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, myRequestSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<IRequestResponse>(
      `/requests/${requestId}`,
      result.data,
    );
    return response;
  });

export const cancelMyRequest = async (
  requestId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, myRequestCancelSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<IRequestResponse>(
      `/requests/${requestId}`,
      result.data,
    );
    return response;
  });

export const deleteMyRequest = async (requestId: string) =>
  safeRequest(async () => {
    const response = await httpClient.delete<IRequestResponse>(
      `/requests/${requestId}`,
    );
    return response;
  });
