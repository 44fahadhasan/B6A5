import type z from "zod";
import type {
  createReportSchema,
  reportListQuerySchema,
  updateReportSchema,
} from "./report.validation";

export type CreateReportPayload = z.infer<typeof createReportSchema>;
export type UpdateReportPayload = z.infer<typeof updateReportSchema>;
export type ReportListQuery = z.infer<typeof reportListQuerySchema>;
