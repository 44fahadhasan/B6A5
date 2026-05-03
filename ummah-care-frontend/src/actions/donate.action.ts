"use server";

import { createDonationSchema } from "@/components/modules/donate/donate.schema";
import { httpClient } from "@/lib/http-client";
import { IDonationListResponse, IDonationResponse } from "@/types";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const createDonation = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createDonationSchema);
    if (!result.success) return result;
    const response = await httpClient.post<IDonationResponse>(
      "/donations",
      result.data,
    );
    return response;
  });

export const initiateDonationPayment = async (
  donationId: string,
  payload: { successUrl: string; cancelUrl: string },
) =>
  safeRequest(async () => {
    const response = await httpClient.post<{ paymentUrl: string }>(
      `/donations/${donationId}/payment`,
      payload,
    );
    return response;
  });

export const getAllDonations = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString ? `/donations?${queryString}` : "/donations";

    const response = await httpClient.get<IDonationListResponse>(endpoint);
    return response;
  });

export const getMyDonations = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/donations/me?${queryString}`
      : "/donations/me";

    const response = await httpClient.get<IDonationListResponse>(endpoint);
    return response;
  });

export const getMyOrganizationDonations = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/donations/organization?${queryString}`
      : "/donations/organization";

    const response = await httpClient.get<IDonationListResponse>(endpoint);
    return response;
  });

export const getReceivedDonations = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/donations/received?${queryString}`
      : "/donations/received";

    const response = await httpClient.get<IDonationListResponse>(endpoint);
    return response;
  });
