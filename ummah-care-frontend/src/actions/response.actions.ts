"use server";

import { createResponseSchema } from "@/components/modules/responses/response.schema";
import { httpClient } from "@/lib/http-client";
import {
  ICreateResponse,
  IDeleteResponse,
  IResponse,
  IResponseDetails,
  IUpdateResponse,
} from "@/types";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const createResponse = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createResponseSchema);
    if (!result.success) return result;

    const response = await httpClient.post<ICreateResponse>(
      "/responses",
      result.data,
    );
    return response;
  });

export const getResponses = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString ? `/responses?${queryString}` : "/responses";

    const response = await httpClient.get<IResponse[]>(endpoint);
    return response;
  });

export const getMyResponses = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/responses/me?${queryString}`
      : "/responses/me";

    const response = await httpClient.get<IResponse[]>(endpoint);

    return response;
  });

export const getResponseById = async (id: string) =>
  safeRequest(async () => {
    const response = await httpClient.get<IResponseDetails>(`/responses/${id}`);
    return response;
  });

export const updateResponse = async (
  responseId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createResponseSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<IUpdateResponse>(
      `/responses/${responseId}`,
      result.data,
    );
    return response;
  });

export const deleteResponse = async (responseId: string) =>
  safeRequest(async () => {
    const response = await httpClient.delete<IDeleteResponse>(
      `/responses/${responseId}`,
    );
    return response;
  });
