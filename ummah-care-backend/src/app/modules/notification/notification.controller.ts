import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { notificationServices } from "./notification.service";
import { markAsReadSchema } from "./notification.validation";

const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const query = req.query;

  const result = await notificationServices.getNotifications(userId, query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Notifications fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getNotificationById = asyncHandler(async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  const userId = req.user.id;

  if (!notificationId || Array.isArray(notificationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid notification ID");
  }

  const notification = await notificationServices.getNotificationById(notificationId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Notification fetched successfully.",
    data: notification,
  });
});

const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await notificationServices.getUnreadCount(userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Unread count fetched successfully.",
    data: result,
  });
});

const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const payload = markAsReadSchema.parse(req.body);

  const result = await notificationServices.markAsRead(userId, payload.notificationIds);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Notifications marked as read.",
    data: result,
  });
});

const markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await notificationServices.markAllAsRead(userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "All notifications marked as read.",
    data: result,
  });
});

const deleteNotification = asyncHandler(async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  const userId = req.user.id;

  if (!notificationId || Array.isArray(notificationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid notification ID");
  }

  const deleted = await notificationServices.deleteNotification(notificationId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Notification deleted successfully.",
    data: deleted,
  });
});

const deleteAllNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await notificationServices.deleteAllNotifications(userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "All notifications deleted successfully.",
    data: result,
  });
});

export const notificationController = {
  getNotifications,
  getNotificationById,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
};
