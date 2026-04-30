"use server";

import { createCampaignSchema } from "@/components/modules/my-campaign/my-campaign.schema";
import { httpClient } from "@/lib/http-client";
import {
  ICampaignDetailsResponse,
  ICampaignListResponse,
  ICampaignResponse,
} from "@/types/campaign.type";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const getCampaigns = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString ? `/campaigns?${queryString}` : "/campaigns";

    const response = await httpClient.get<ICampaignListResponse>(endpoint, {
      isProtected: false,
    });
    return response;
  });

export const getCampaignById = async (id: string) =>
  safeRequest(async () => {
    const response = await httpClient.get<ICampaignDetailsResponse>(
      `/campaigns/${id}`,
      {
        isProtected: false,
      },
    );
    return response;
  });

export const createCampaign = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createCampaignSchema);
    if (!result.success) return result;

    const response = await httpClient.post<ICampaignResponse>(
      "/campaigns",
      result.data,
    );
    return response;
  });

export const getMyCampaigns = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/campaigns/me/campaigns?${queryString}`
      : "/campaigns/me/campaigns";

    const response = await httpClient.get<ICampaignListResponse>(endpoint);

    return response;
  });

export const updateCampaign = async (
  campaignId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createCampaignSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<ICampaignResponse>(
      `/campaigns/${campaignId}`,
      result.data,
    );
    return response;
  });

export const deleteCampaign = async (campaignId: string) =>
  safeRequest(async () => {
    const response = await httpClient.delete<ICampaignResponse>(
      `/campaigns/${campaignId}`,
    );
    return response;
  });
