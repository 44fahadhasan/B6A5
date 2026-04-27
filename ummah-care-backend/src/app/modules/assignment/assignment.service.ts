import { prisma } from "@/app/lib/prisma";
import type { TokenPayload } from "@/app/types";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import type { Prisma } from "@/generated/prisma/client";
import { AssignmentStatus, UserType } from "@/generated/prisma/enums";
import type { AssignmentWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { assignmentConsts } from "./assignment.const";
import { assignmentRepository } from "./assignment.repository";
import type { CreateAssignmentPayload, UpdateAssignmentPayload } from "./assignment.type";
import { assignmentListQuerySchema } from "./assignment.validation";

const createAssignment = async (userId: string, payload: CreateAssignmentPayload) => {
  // Verify request exists
  const request = await prisma.request.findUnique({
    where: { id: payload.requestId, status: "OPEN" },
  });

  if (!request) {
    throw new AppError(status.NOT_FOUND, "Request not found");
  }

  // Verify volunteer if provided
  if (payload.volunteerId) {
    const volunteer = await prisma.user.findUnique({
      where: { id: payload.volunteerId, status: "ACTIVE" },
    });

    if (!volunteer) {
      throw new AppError(status.NOT_FOUND, "Volunteer not found");
    }
  }

  // Verify organization if provided
  if (payload.organizationId) {
    const organization = await prisma.organization.findUnique({
      where: { id: payload.organizationId, isVerified: true },
    });

    if (!organization) {
      throw new AppError(status.NOT_FOUND, "Organization not found");
    }
  }

  return assignmentRepository.create({
    targetType: payload.targetType,
    requestId: payload.requestId,
    volunteerId: payload.volunteerId,
    organizationId: payload.organizationId,
    assignedBy: userId,
    notes: payload.notes,
  });
};

const getAssignments = async (query: unknown, user: TokenPayload) => {
  const typedQuery = parseSchema(assignmentListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: AssignmentWhereInput = {};

  const hasActiveRole = (type: UserType) =>
    user.userTypes?.some((ut) => ut.type === type && ut.status === "ACTIVE");

  // Role-based filtering
  if (hasActiveRole(UserType.VOLUNTEER)) {
    where.volunteerId = user.id;
  } else if (hasActiveRole(UserType.ORGANIZATION)) {
    const org = await prisma.organization.findUnique({
      where: { userId: user.id },
    });

    if (org) {
      where.organizationId = org.id;
    }
  }

  if (typedQuery.status) where.status = typedQuery.status;
  if (typedQuery.targetType) where.targetType = typedQuery.targetType;
  if (typedQuery.requestId) where.requestId = typedQuery.requestId;
  if (typedQuery.volunteerId) where.volunteerId = typedQuery.volunteerId;
  if (typedQuery.organizationId) where.organizationId = typedQuery.organizationId;

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    assignmentConsts.allowedSortByFields,
  );

  const [total, assignments] = await Promise.all([
    assignmentRepository.count(where),
    assignmentRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: assignments,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getAssignmentById = async (id: string) => {
  const assignment = await assignmentRepository.findById(id);
  if (!assignment) {
    throw new AppError(status.NOT_FOUND, "Assignment not found");
  }
  return assignment;
};

const getMyAssignments = async (userId: string, query: unknown) => {
  const typedQuery = parseSchema(assignmentListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  // Get user's organization if they're an org
  const org = await prisma.organization.findUnique({
    where: { userId },
  });

  const where: AssignmentWhereInput = {
    OR: [{ volunteerId: userId }, ...(org ? [{ organizationId: org.id }] : [])],
  };

  if (typedQuery.status) where.status = typedQuery.status;
  if (typedQuery.requestId) where.requestId = typedQuery.requestId;

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    assignmentConsts.allowedSortByFields,
  );

  const [total, assignments] = await Promise.all([
    assignmentRepository.count(where),
    assignmentRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: assignments,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const updateAssignment = async (id: string, userId: string, payload: UpdateAssignmentPayload) => {
  const assignment = await assignmentRepository.findById(id);
  if (!assignment) {
    throw new AppError(status.NOT_FOUND, "Assignment not found");
  }

  // Check if user is authorized to update
  const isAssignedVolunteer = assignment.volunteerId === userId;
  const isAssignedOrg = assignment.organizationId
    ? await prisma.organization.findFirst({ where: { id: assignment.organizationId, userId } })
    : false;
  const isAdmin = userId === assignment.assignedBy;

  if (!isAssignedVolunteer && !isAssignedOrg && !isAdmin) {
    throw new AppError(status.FORBIDDEN, "You are not authorized to update this assignment");
  }

  const updateData: Prisma.AssignmentUpdateInput = { ...payload };

  // If status is being set to COMPLETED, set completedAt
  if (payload.status === AssignmentStatus.COMPLETED) {
    updateData.completedAt = new Date();
  }

  return assignmentRepository.update(id, updateData);
};

const deleteAssignment = async (id: string, userId: string) => {
  const assignment = await assignmentRepository.findById(id);
  if (!assignment) {
    throw new AppError(status.NOT_FOUND, "Assignment not found");
  }

  // Only the assigner or admin can delete
  if (assignment.assignedBy !== userId) {
    throw new AppError(status.FORBIDDEN, "You are not authorized to delete this assignment");
  }

  return assignmentRepository.deleteById(id);
};

export const assignmentServices = {
  createAssignment,
  getAssignments,
  getAssignmentById,
  getMyAssignments,
  updateAssignment,
  deleteAssignment,
};
