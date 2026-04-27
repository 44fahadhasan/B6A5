import type z from "zod";
import type {
  assignmentListQuerySchema,
  createAssignmentSchema,
  updateAssignmentSchema,
} from "./assignment.validation";

export type CreateAssignmentPayload = z.infer<typeof createAssignmentSchema>;
export type UpdateAssignmentPayload = z.infer<typeof updateAssignmentSchema>;
export type AssignmentListQuery = z.infer<typeof assignmentListQuerySchema>;
