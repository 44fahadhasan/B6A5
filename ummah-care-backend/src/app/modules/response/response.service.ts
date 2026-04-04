import { prisma } from "@/app/lib/prisma";
import type { TokenPayload } from "@/app/types";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import { RequestStatus, Role } from "@/generated/prisma/enums";
import type { ResponseWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { responseConsts } from "./response.const";
import { responseRepository } from "./response.repository";
import type { CreateResponsePayload, UpdateResponsePayload } from "./response.type";
import { responseListQuerySchema } from "./response.validation";

const createResponse = async (user: TokenPayload, payload: CreateResponsePayload) => {
  // Check if user has already responded to this request
  const existingResponse = await responseRepository.findByRequestAndUser(
    payload.requestId,
    user.id,
  );

  if (existingResponse) {
    throw new AppError(status.BAD_REQUEST, "You have already responded to this request");
  }

  // Check if request exists and is open
  const request = await prisma.request.findUnique({
    where: { id: payload.requestId },
    select: { status: true },
  });

  if (!request) {
    throw new AppError(status.NOT_FOUND, "Request not found");
  }

  if (request.status !== RequestStatus.OPEN) {
    throw new AppError(status.BAD_REQUEST, "You can only respond to open requests");
  }

  return responseRepository.create({
    ...payload,
    userId: user.id,
  });
};

const getResponses = async (user: TokenPayload, query: unknown) => {
  const typedQuery = parseSchema(responseListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: ResponseWhereInput = {};

  if (typedQuery.requestId) {
    // Check if user owns the request or is admin
    const request = await prisma.request.findUnique({
      where: { id: typedQuery.requestId },
      select: { createdBy: true },
    });

    if (!request) {
      throw new AppError(status.NOT_FOUND, "Request not found");
    }

    const isOwner = request.createdBy === user.id;
    const isAdmin = user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN;

    if (!isOwner && !isAdmin) {
      throw new AppError(status.FORBIDDEN, "You can only view responses to your own requests");
    }

    where.requestId = typedQuery.requestId;
  }

  if (typedQuery.responseType) where.responseType = typedQuery.responseType;
  if (typedQuery.createdBy) where.userId = typedQuery.createdBy;

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    responseConsts.allowedSortByFields,
  );

  const [total, responses] = await Promise.all([
    responseRepository.count(where),
    responseRepository.findMany(where, skip, take, orderBy, {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
            role: true,
          },
        },
        request: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    }),
  ]);

  return {
    data: responses,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getMyResponses = async (userId: string, query: unknown) => {
  const typedQuery = parseSchema(responseListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: ResponseWhereInput = {
    userId,
  };

  if (typedQuery.requestId) where.requestId = typedQuery.requestId;
  if (typedQuery.responseType) where.responseType = typedQuery.responseType;

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    responseConsts.allowedSortByFields,
  );

  const [total, responses] = await Promise.all([
    responseRepository.count(where),
    responseRepository.findMany(where, skip, take, orderBy, {
      include: {
        request: {
          select: {
            id: true,
            title: true,
            status: true,
            category: true,
            urgency: true,
          },
        },
      },
    }),
  ]);

  return {
    data: responses,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getResponseById = async (id: string, user: TokenPayload) => {
  const response = await responseRepository.findById(id, {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatarUrl: true,
          role: true,
        },
      },
      request: {
        select: {
          id: true,
          title: true,
          status: true,
          createdBy: true,
        },
      },
    },
  });

  if (!response) {
    throw new AppError(status.NOT_FOUND, "Response not found");
  }

  // Allow access if user is the responder, request owner, or admin
  const isResponder = response.userId === user.id;
  const isAdmin = user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN;

  if (!isResponder && !isAdmin) {
    throw new AppError(status.FORBIDDEN, "You do not have permission to view this response");
  }

  return response;
};

const updateResponse = async (id: string, userId: string, payload: UpdateResponsePayload) => {
  const existing = await responseRepository.findById(id);

  if (!existing) {
    throw new AppError(status.NOT_FOUND, "Response not found");
  }

  if (existing.userId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only update your own responses");
  }

  // Check if request is still open
  const request = await prisma.request.findUnique({
    where: { id: existing.requestId },
    select: { status: true },
  });

  if (request?.status !== RequestStatus.OPEN) {
    throw new AppError(status.BAD_REQUEST, "Cannot update response for a non-open request");
  }

  return responseRepository.update(id, payload);
};

const deleteResponse = async (id: string, userId: string) => {
  const existing = await responseRepository.findById(id);

  if (!existing) {
    throw new AppError(status.NOT_FOUND, "Response not found");
  }

  if (existing.userId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own responses");
  }

  // Check if request is still open
  const request = await prisma.request.findUnique({
    where: { id: existing.requestId },
    select: { status: true },
  });

  if (request?.status !== RequestStatus.OPEN) {
    throw new AppError(status.BAD_REQUEST, "Cannot delete response for a non-open request");
  }

  return responseRepository.delete(id);
};

export const responseServices = {
  createResponse,
  getResponses,
  getMyResponses,
  getResponseById,
  updateResponse,
  deleteResponse,
};
