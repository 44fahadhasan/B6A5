import { paginationUtils } from "@/app/utils/pagination.util";
import { ReportStatus, ReportTargetType } from "@/generated/prisma/enums";
import { z } from "zod";

export const createReportSchema = z.object({
  targetType: z.enum(ReportTargetType),
  targetId: z.string(),
  reason: z.string().min(10).max(5000),
});

export const updateReportSchema = z.object({
  status: z.enum(ReportStatus),
  adminNotes: z
    .string()
    .max(5000)
    .optional()
    .transform((val) => val ?? null),
});

export const reportListQuerySchema = paginationUtils.paginationQuerySchema.extend({
  status: z.enum(ReportStatus).optional(),
  targetType: z.enum(ReportTargetType).optional(),
  reportedBy: z.string().optional(),
});
