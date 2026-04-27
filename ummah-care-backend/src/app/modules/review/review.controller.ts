import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { reviewServices } from "./review.service";
import type { CreateReviewPayload } from "./review.type";

const createReview = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as CreateReviewPayload;
  const reviewerId = req.user.id;

  const review = await reviewServices.createReview(reviewerId, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Review created successfully.",
    data: review,
  });
});

const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await reviewServices.getReviews(query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Reviews fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getReviewById = asyncHandler(async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  if (!reviewId || Array.isArray(reviewId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid review ID");
  }

  const review = await reviewServices.getReviewById(reviewId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Review fetched successfully.",
    data: review,
  });
});

const getUserReviews = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const query = req.query;

  if (!userId || Array.isArray(userId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid user ID");
  }

  const result = await reviewServices.getUserReviews(userId, query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User reviews fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getUserAverageRating = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId || Array.isArray(userId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid user ID");
  }

  const result = await reviewServices.getUserAverageRating(userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User rating fetched successfully.",
    data: result,
  });
});

const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  if (!reviewId || Array.isArray(reviewId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid review ID");
  }

  const deleted = await reviewServices.deleteReview(reviewId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Review deleted successfully.",
    data: deleted,
  });
});

export const reviewController = {
  createReview,
  getReviews,
  getReviewById,
  getUserReviews,
  getUserAverageRating,
  deleteReview,
};
