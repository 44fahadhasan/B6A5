import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import { RequestStatus } from "@/generated/prisma/enums";
import type { RequestWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { requestConsts } from "./request.const";
import { requestRepository } from "./request.repository";
import type { CreateRequestPayload, UpdateRequestPayload } from "./request.type";
import { requestUtils } from "./request.utils";
import { requestListQuerySchema } from "./request.validation";

const createRequest = async (userId: string, payload: CreateRequestPayload) => {
  return requestRepository.create({
    ...payload,
    createdBy: userId,
    expiresAt: requestUtils.setExpiresAt(payload.expiresAt),
  });
};

const getRequests = async (query: unknown) => {
  const typedQuery = parseSchema(requestListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: RequestWhereInput = {};

  where.status = typedQuery.status ?? RequestStatus.OPEN;

  if (typedQuery.category) where.category = typedQuery.category;
  if (typedQuery.urgency) where.urgency = typedQuery.urgency;
  if (typedQuery.helpType) where.helpType = typedQuery.helpType;
  if (typedQuery.createdBy) where.createdBy = typedQuery.createdBy;

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    requestConsts.allowedSortByFields,
  );

  const [total, requests] = await Promise.all([
    requestRepository.count(where),
    requestRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: requests,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getRequestById = async (id: string) => {
  const request = await requestRepository.findById(id);

  if (!request) {
    throw new AppError(status.NOT_FOUND, "Request not found");
  }

  return request;
};

const updateRequest = async (id: string, userId: string, payload: UpdateRequestPayload) => {
  const existing = await requestRepository.findById(id);

  if (!existing) {
    throw new AppError(status.NOT_FOUND, "Request not found");
  }

  if (existing.createdBy !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only update your own requests");
  }

  if (existing.status === RequestStatus.COMPLETED || existing.status === RequestStatus.CANCELLED) {
    throw new AppError(status.BAD_REQUEST, "Cannot update a completed or cancelled request");
  }

  return requestRepository.update(id, {
    title: payload.title ?? existing.title,
    description: payload.description ?? existing.description,
    category: payload.category ?? existing.category,
    urgency: payload.urgency ?? existing.urgency,
    helpType: payload.helpType ?? existing.helpType,
    location: payload.location ?? existing.location,
    isAnonymous: payload.isAnonymous ?? existing.isAnonymous,
    status: payload.status ?? existing.status,
    expiresAt: payload.expiresAt
      ? requestUtils.setExpiresAt(payload.expiresAt)
      : existing.expiresAt,
  });
};

const deleteRequest = async (id: string, userId: string) => {
  const existing = await requestRepository.findById(id);

  if (!existing) {
    throw new AppError(status.NOT_FOUND, "Request not found");
  }

  if (existing.createdBy !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own requests");
  }

  return requestRepository.delete(id);
};

export const requestServices = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
