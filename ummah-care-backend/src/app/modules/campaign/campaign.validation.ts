import { paginationUtils } from "@/app/utils/pagination.util";
import { CampaignStatus } from "@/generated/prisma/enums";
import { z } from "zod";

export const createCampaignSchema = z.object({
  linkedRequestId: z
    .uuid()
    .optional()
    .transform((val) => val ?? null),
  title: z.string().min(5).max(200),
  description: z.string().max(5000).optional(),
  goalAmount: z.number().min(0),
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
  status: z.union([z.enum(CampaignStatus), z.array(z.enum(CampaignStatus))]).optional(),
  linkedRequestId: z.uuid().optional(),
  search: z.string().optional(),
});
