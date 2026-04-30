import { createCampaignSchema } from "@/components/modules/my-campaign/my-campaign.schema";
import { CAMPAIGN_CURRENCY, CAMPAIGN_STATUS } from "@/constants/campaign.const";
import z from "zod";

export type TCampaignStatus =
  (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];
export type TCampaignCurrency =
  (typeof CAMPAIGN_CURRENCY)[keyof typeof CAMPAIGN_CURRENCY];

export type TCampaignPayload = z.infer<typeof createCampaignSchema>;

export interface IOrganizationSummary {
  id: string;
  orgName: string;
  isVerified: boolean;
}

export interface ICampRequestSummary {
  id: string;
  title: string;
}

export interface ICampaignResponse {
  id: string;
  orgId: string;
  linkedRequestId?: string;
  title: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  currency: TCampaignCurrency;
  status: TCampaignStatus;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  organization: IOrganizationSummary;
  linkedRequest?: ICampRequestSummary;
}

export interface ICampaignDetailsResponse extends ICampaignResponse {
  title: string;
}

export type ICampaignListResponse = ICampaignResponse[];
