import { paginationUtils } from "@/app/utils/pagination.util";
import { z } from "zod";

export const createReviewSchema = z.object({
  targetUserId: z.string(),
  requestId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(5000).optional(),
});

export const reviewListQuerySchema = paginationUtils.paginationQuerySchema.extend({
  targetUserId: z.string().optional(),
  requestId: z.string().optional(),
  minRating: z.number().int().min(1).max(5).optional(),
  maxRating: z.number().int().min(1).max(5).optional(),
});
