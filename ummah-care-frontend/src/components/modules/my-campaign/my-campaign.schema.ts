import { CAMPAIGN_CURRENCY, CAMPAIGN_STATUS } from "@/constants/campaign.const";
import z from "zod";

export const createCampaignSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(200, "Title must not exceed 200 characters"),
  description: z
    .string()
    .max(5000, "Description must not exceed 5000 characters")
    .optional(),
  goalAmount: z.coerce.number().min(0, "Goal amount must be positive"),
  currency: z
    .enum([CAMPAIGN_CURRENCY.BDT, CAMPAIGN_CURRENCY.USD, CAMPAIGN_CURRENCY.EUR])
    .default(CAMPAIGN_CURRENCY.BDT),
  status: z
    .enum([
      CAMPAIGN_STATUS.DRAFT,
      CAMPAIGN_STATUS.ACTIVE,
      CAMPAIGN_STATUS.COMPLETED,
      CAMPAIGN_STATUS.CANCELLED,
    ])
    .optional(),
  //   startDate: z.string().datetime().optional(),
  //   endDate: z.string().datetime().optional(),
});
