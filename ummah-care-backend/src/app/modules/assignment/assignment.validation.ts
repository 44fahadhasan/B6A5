import { paginationUtils } from "@/app/utils/pagination.util";
import { AssignmentStatus, AssignmentTargetType } from "@/generated/prisma/enums";
import { z } from "zod";

export const createAssignmentSchema = z.object({
  targetType: z.enum(AssignmentTargetType),
  requestId: z.uuid(),
  volunteerId: z.string().optional(),
  organizationId: z.uuid().optional(),
  notes: z.string().max(5000).optional(),
});

export const updateAssignmentSchema = z.object({
  status: z.enum(AssignmentStatus),
  notes: z
    .string()
    .max(5000)
    .optional()
    .transform((val) => val ?? null),
});

export const assignmentListQuerySchema = paginationUtils.paginationQuerySchema.extend({
  search: z.string().optional(),
  status: z.union([z.enum(AssignmentStatus), z.array(z.enum(AssignmentStatus))]).optional(),
  targetType: z
    .union([z.enum(AssignmentTargetType), z.array(z.enum(AssignmentTargetType))])
    .optional(),
  requestId: z.uuid().optional(),
  volunteerId: z.string().optional(),
  organizationId: z.uuid().optional(),
});
