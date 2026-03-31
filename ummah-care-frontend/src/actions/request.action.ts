"use server";

import { myRequestSchema } from "@/components/modules/my-requests/my-requests.schema";
import { httpClient } from "@/lib/http-client";
import { IRequestResponse } from "@/types";
import { errorResponse } from "@/utils/response-util";
import { validatePayload } from "@/utils/validation-util";

export const createMyRequest = async (payload: Record<string, unknown>) => {
  const result = validatePayload(payload, myRequestSchema);
  if (!result.success) return result;

  try {
    const response = await httpClient.post<IRequestResponse>(
      "/requests",
      result.data,
    );
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};

export const getMyRequests = async (queryString: string) => {
  try {
    const endpoint = queryString
      ? `/requests/me?${queryString}`
      : "/requests/me";

    const response = await httpClient.get<IRequestResponse[]>(endpoint);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateMyRequest = async (
  requestId: string,
  payload: Record<string, unknown>,
) => {
  const result = validatePayload(payload, myRequestSchema);
  if (!result.success) return result;

  try {
    const response = await httpClient.patch<IRequestResponse>(
      `/requests/${requestId}`,
      result.data,
    );
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};

export const deleteMyRequest = async (requestId: string) => {
  try {
    const response = await httpClient.delete<IRequestResponse>(
      `/requests/${requestId}`,
    );
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};
