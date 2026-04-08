"use server";

import { createMessageSchema } from "@/components/modules/message/message.schema";
import { httpClient } from "@/lib/http-client";
import { IMessageResponse, TMessageConversation } from "@/types/message.type";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const createMessage = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createMessageSchema);
    if (!result.success) return result;

    const response = await httpClient.post<IMessageResponse>(
      "/messages",
      result.data,
    );
    return response;
  });

export const getMessages = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString ? `/messages?${queryString}` : "/messages";
    const response = await httpClient.get<IMessageResponse[]>(endpoint);
    return response;
  });

export const getMyMessages = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/messages/me?${queryString}`
      : "/messages/me";
    const response = await httpClient.get<IMessageResponse[]>(endpoint);
    return response;
  });

export const getMessageById = async (id: string) =>
  safeRequest(async () => {
    const response = await httpClient.get<IMessageResponse>(`/messages/${id}`);
    return response;
  });

export const updateMessage = async (
  messageId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createMessageSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<IMessageResponse>(
      `/messages/${messageId}`,
      result.data,
    );
    return response;
  });

export const deleteMessage = async (messageId: string) =>
  safeRequest(async () => {
    const response = await httpClient.delete<IMessageResponse>(
      `/messages/${messageId}`,
    );
    return response;
  });

export const getConversation = async (
  requestId: string,
  participantId: string,
) =>
  safeRequest(async () => {
    const response = await httpClient.get<TMessageConversation[]>(
      `/messages/conversation/${requestId}/${participantId}`,
    );
    return response;
  });
