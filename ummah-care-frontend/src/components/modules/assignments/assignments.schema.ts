import {
  ASSIGNMENT_STATUS,
  ASSIGNMENT_TARGET_TYPE,
} from "@/constants/assignment.const";
import { z } from "zod";

export const ASSIGNMENT_STATUS_OPTIONS = [
  ASSIGNMENT_STATUS.ASSIGNED,
  ASSIGNMENT_STATUS.IN_PROGRESS,
  ASSIGNMENT_STATUS.COMPLETED,
  ASSIGNMENT_STATUS.CANCELLED,
] as const;

export const ASSIGNMENT_TARGET_TYPE_OPTIONS = [
  ASSIGNMENT_TARGET_TYPE.VOLUNTEER,
  ASSIGNMENT_TARGET_TYPE.ORGANIZATION,
] as const;

export const createAssignmentSchema = z.object({
  status: z.enum(ASSIGNMENT_STATUS_OPTIONS),
  requestId: z.string().min(1, "Request is required"),
  volunteerId: z.string().min(1, "Volunteer is required"),
  targetType: z.enum(ASSIGNMENT_TARGET_TYPE_OPTIONS),
  notes: z.string().optional(),
});
