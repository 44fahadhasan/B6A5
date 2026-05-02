"use server";

import { createResponseSchema } from "@/components/modules/responses/response.schema";
import { httpClient } from "@/lib/http-client";
import {
  ICreateMyResponse,
  IDeleteMyResponse,
  IMyResponse,
  IMyResponseDetails,
  IOrganizationResponse,
  IResponses,
  IUpdateMyResponse,
} from "@/types";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const createResponse = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createResponseSchema);
    if (!result.success) return result;

    const response = await httpClient.post<ICreateMyResponse>(
      "/responses",
      result.data,
    );
    return response;
  });

export const getResponses = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString ? `/responses?${queryString}` : "/responses";

    const response = await httpClient.get<IResponses[]>(endpoint);
    return response;
  });

export const getMyResponses = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/responses/me?${queryString}`
      : "/responses/me";

    const response = await httpClient.get<IMyResponse[]>(endpoint);

    return response;
  });

export const getOrganizationResponses = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/responses/organization?${queryString}`
      : "/responses/organization";

    const response = await httpClient.get<IOrganizationResponse[]>(endpoint);
    return response;
  });

export const getResponseById = async (id: string) =>
  safeRequest(async () => {
    const response = await httpClient.get<IMyResponseDetails>(
      `/responses/${id}`,
    );
    return response;
  });

export const updateResponse = async (
  responseId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createResponseSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<IUpdateMyResponse>(
      `/responses/${responseId}`,
      result.data,
    );
    return response;
  });

export const deleteResponse = async (responseId: string) =>
  safeRequest(async () => {
    const response = await httpClient.delete<IDeleteMyResponse>(
      `/responses/${responseId}`,
    );
    return response;
  });
