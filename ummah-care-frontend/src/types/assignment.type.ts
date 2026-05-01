import { createAssignmentSchema } from "@/components/modules/assignments/assignments.schema";
import {
  ASSIGNMENT_STATUS,
  ASSIGNMENT_TARGET_TYPE,
} from "@/constants/assignment.const";
import z from "zod";

export type TAssignmentStatus =
  (typeof ASSIGNMENT_STATUS)[keyof typeof ASSIGNMENT_STATUS];
export type TAssignmentTargetType =
  (typeof ASSIGNMENT_TARGET_TYPE)[keyof typeof ASSIGNMENT_TARGET_TYPE];

export type TCreateAssignmentPayload = z.infer<typeof createAssignmentSchema>;

export interface IAssignmentRequestSummary {
  id: string;
  title: string;
}

export interface IVolunteerSummary {
  id: string;
  name: string;
  email: string;
}

export interface IAssignmentOrganizationSummary {
  id: string;
  orgName: string;
}

export interface IAssignedBySummary {
  id: string;
  name: string;
  email: string;
}

export interface IAssignmentResponse {
  id: string;
  targetType: TAssignmentTargetType;
  status: TAssignmentStatus;
  notes?: string | null;
  request: IAssignmentRequestSummary;
  volunteerId?: string | null;
  organizationId?: string | null;
  assignedBy: string;
  volunteer?: IVolunteerSummary | null;
  organization?: IAssignmentOrganizationSummary | null;
  assignedByUser: IAssignedBySummary;
  assignedAt: string;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type IAssignmentListResponse = IAssignmentResponse[];
