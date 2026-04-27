import { prisma } from "@/app/lib/prisma";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import { RequestStatus } from "@/generated/prisma/enums";
import type { ReviewWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { reviewConsts } from "./review.const";
import { reviewRepository } from "./review.repository";
import type { CreateReviewPayload } from "./review.type";
import { reviewListQuerySchema } from "./review.validation";

const createReview = async (reviewerId: string, payload: CreateReviewPayload) => {
  // Verify request exists and is completed
  const request = await prisma.request.findUnique({
    where: { id: payload.requestId },
  });

  if (!request) {
    throw new AppError(status.NOT_FOUND, "Request not found");
  }

  if (request.status !== RequestStatus.COMPLETED) {
    throw new AppError(status.BAD_REQUEST, "Can only review completed requests");
  }

  // Verify target user exists
  const targetUser = await prisma.user.findUnique({
    where: { id: payload.targetUserId },
  });

  if (!targetUser) {
    throw new AppError(status.NOT_FOUND, "Target user not found");
  }

  // Check if reviewer already reviewed this user for this request
  const existingReview = await reviewRepository.findByUnique(
    reviewerId,
    payload.targetUserId,
    payload.requestId,
  );
  if (existingReview) {
    throw new AppError(status.CONFLICT, "You have already reviewed this user for this request");
  }

  // Check if reviewer is the request owner or a responder
  const isRequestOwner = request.createdBy === reviewerId;

  const responses = await prisma.response.findMany({
    where: { requestId: payload.requestId },
    select: { userId: true },
  });

  const isResponder = responses.some((r) => r.userId === reviewerId);

  if (!isRequestOwner && !isResponder) {
    throw new AppError(status.FORBIDDEN, "Only request owner or responders can leave reviews");
  }

  // Can't review yourself
  if (reviewerId === payload.targetUserId) {
    throw new AppError(status.BAD_REQUEST, "Cannot review yourself");
  }

  return reviewRepository.create({
    reviewer: { connect: { id: reviewerId } },
    targetUser: { connect: { id: payload.targetUserId } },
    request: { connect: { id: payload.requestId } },
    rating: payload.rating,
    comment: payload.comment,
  });
};

const getReviews = async (query: unknown) => {
  const typedQuery = parseSchema(reviewListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: ReviewWhereInput = {};

  if (typedQuery.targetUserId) where.targetUserId = typedQuery.targetUserId;
  if (typedQuery.requestId) where.requestId = typedQuery.requestId;

  if (typedQuery.minRating || typedQuery.maxRating) {
    where.rating = {};
    if (typedQuery.minRating) where.rating.gte = typedQuery.minRating;
    if (typedQuery.maxRating) where.rating.lte = typedQuery.maxRating;
  }

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    reviewConsts.allowedSortByFields,
  );

  const [total, reviews] = await Promise.all([
    reviewRepository.count(where),
    reviewRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: reviews,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getReviewById = async (id: string) => {
  const review = await reviewRepository.findById(id);
  if (!review) {
    throw new AppError(status.NOT_FOUND, "Review not found");
  }
  return review;
};

const getUserReviews = async (userId: string, query: unknown) => {
  const typedQuery = parseSchema(reviewListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: ReviewWhereInput = {
    targetUserId: userId,
  };

  if (typedQuery.minRating || typedQuery.maxRating) {
    where.rating = {};
    if (typedQuery.minRating) where.rating.gte = typedQuery.minRating;
    if (typedQuery.maxRating) where.rating.lte = typedQuery.maxRating;
  }

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    reviewConsts.allowedSortByFields,
  );

  const [total, reviews] = await Promise.all([
    reviewRepository.count(where),
    reviewRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: reviews,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getUserAverageRating = async (userId: string) => {
  const result = await prisma.review.aggregate({
    where: { targetUserId: userId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count.rating,
  };
};

const deleteReview = async (id: string, userId: string) => {
  const review = await reviewRepository.findById(id);
  if (!review) {
    throw new AppError(status.NOT_FOUND, "Review not found");
  }

  // Only the reviewer can delete their review
  if (review.reviewerId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own reviews");
  }

  return reviewRepository.deleteById(id);
};

export const reviewServices = {
  createReview,
  getReviews,
  getReviewById,
  getUserReviews,
  getUserAverageRating,
  deleteReview,
};
