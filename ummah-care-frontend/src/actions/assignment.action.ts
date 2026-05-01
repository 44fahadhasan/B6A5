"use server";

import { createAssignmentSchema } from "@/components/modules/assignments/assignments.schema";
import { ASSIGNMENT_STATUS } from "@/constants/assignment.const";
import { httpClient } from "@/lib/http-client";
import {
  IAssignmentListResponse,
  IAssignmentResponse,
} from "@/types/assignment.type";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const getAssignments = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/assignments?${queryString}`
      : "/assignments";

    const response = await httpClient.get<IAssignmentListResponse>(endpoint);
    return response;
  });

export const getMyAssignments = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/assignments/me?${queryString}`
      : "/assignments/me";

    const response = await httpClient.get<IAssignmentListResponse>(endpoint);
    return response;
  });

export const getAllAssignment = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/assignment/all-assignment?${queryString}`
      : "/assignment/all-assignment";

    const response = await httpClient.get<IAssignmentListResponse[]>(endpoint);
    return response;
  });

export const getAssignmentById = async (id: string) =>
  safeRequest(async () => {
    const response = await httpClient.get<IAssignmentResponse>(
      `/assignments/${id}`,
    );
    return response;
  });

export const createAssignment = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createAssignmentSchema);
    if (!result.success) return result;

    const response = await httpClient.post<IAssignmentResponse>(
      "/assignments",
      result.data,
    );
    return response;
  });

export const updateAssignment = async (
  assignmentId: string,
  payload: Record<string, unknown>,
) =>
  safeRequest(async () => {
    const result = validatePayload(payload, createAssignmentSchema);
    if (!result.success) return result;

    const response = await httpClient.patch<IAssignmentResponse>(
      `/assignments/${assignmentId}`,
      result.data,
    );
    return response;
  });

export const cancelAssignment = async (assignmentId: string) =>
  safeRequest(async () => {
    const response = await httpClient.patch<IAssignmentResponse>(
      `/assignments/${assignmentId}`,
      { status: ASSIGNMENT_STATUS.CANCELLED },
    );
    return response;
  });

export const deleteAssignment = async (assignmentId: string) =>
  safeRequest(async () => {
    const response = await httpClient.delete<IAssignmentResponse>(
      `/assignments/${assignmentId}`,
    );
    return response;
  });
