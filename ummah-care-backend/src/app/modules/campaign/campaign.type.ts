import type z from "zod";
import type {
  campaignListQuerySchema,
  createCampaignSchema,
  updateCampaignSchema,
} from "./campaign.validation";

export type CreateCampaignPayload = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignPayload = z.infer<typeof updateCampaignSchema>;
export type CampaignListQuery = z.infer<typeof campaignListQuerySchema>;
