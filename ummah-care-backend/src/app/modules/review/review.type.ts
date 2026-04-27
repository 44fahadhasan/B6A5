import type z from "zod";
import type { createReviewSchema, reviewListQuerySchema } from "./review.validation";

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;
export type ReviewListQuery = z.infer<typeof reviewListQuerySchema>;
