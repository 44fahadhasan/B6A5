import { paginationUtils } from "@/app/utils/pagination.util";
import { CampaignStatus } from "@/generated/prisma/enums";
import { z } from "zod";

export const createCampaignSchema = z.object({
  orgId: z.uuid(),
  linkedRequestId: z.uuid().optional(),
  title: z.string().min(5).max(200),
  description: z.string().max(5000).optional(),
  goalAmount: z.number().positive(),
  currency: z.string().max(3).default("BDT"),
  status: z.enum(CampaignStatus).optional(),
  startDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional(),
  ),
  endDate: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),
});

export const updateCampaignSchema = createCampaignSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

export const campaignListQuerySchema = paginationUtils.paginationQuerySchema.extend({
  orgId: z.uuid().optional(),
  status: z.enum(CampaignStatus).optional(),
  linkedRequestId: z.uuid().optional(),
  search: z.string().optional(),
});
