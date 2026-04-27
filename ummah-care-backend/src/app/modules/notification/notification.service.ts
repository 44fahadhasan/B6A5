import { prisma } from "@/app/lib/prisma";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import type { NotificationWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { notificationConsts } from "./notification.const";
import { notificationRepository } from "./notification.repository";
import { notificationListQuerySchema } from "./notification.validation";

const getNotifications = async (userId: string, query: unknown) => {
  const typedQuery = parseSchema(notificationListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: NotificationWhereInput = {
    userId,
  };

  if (typedQuery.type) where.type = typedQuery.type;
  if (typedQuery.isRead !== undefined) where.isRead = typedQuery.isRead;

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    notificationConsts.allowedSortByFields,
  );

  const [total, notifications] = await Promise.all([
    notificationRepository.count(where),
    notificationRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: notifications,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getNotificationById = async (id: string, userId: string) => {
  const notification = await notificationRepository.findById(id);
  if (!notification) {
    throw new AppError(status.NOT_FOUND, "Notification not found");
  }

  if (notification.userId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only view your own notifications");
  }

  return notification;
};

const getUnreadCount = async (userId: string) => {
  const count = await notificationRepository.count({
    userId,
    isRead: false,
  });

  return { unreadCount: count };
};

const markAsRead = async (userId: string, notificationIds: string[]) => {
  // Verify all notifications belong to user
  const notifications = await prisma.notification.findMany({
    where: {
      id: { in: notificationIds },
      userId,
    },
  });

  if (notifications.length !== notificationIds.length) {
    throw new AppError(status.BAD_REQUEST, "Some notifications not found or don't belong to you");
  }

  const result = await notificationRepository.updateMany(
    {
      id: { in: notificationIds },
      userId,
    },
    { isRead: true },
  );

  return { updated: result.count };
};

const markAllAsRead = async (userId: string) => {
  const result = await notificationRepository.updateMany(
    {
      userId,
      isRead: false,
    },
    { isRead: true },
  );

  return { updated: result.count };
};

const deleteNotification = async (id: string, userId: string) => {
  const notification = await notificationRepository.findById(id);
  if (!notification) {
    throw new AppError(status.NOT_FOUND, "Notification not found");
  }

  if (notification.userId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own notifications");
  }

  return notificationRepository.deleteById(id);
};

const deleteAllNotifications = async (userId: string) => {
  const result = await notificationRepository.deleteMany({
    userId,
  });

  return { deleted: result.count };
};

export const notificationServices = {
  getNotifications,
  getNotificationById,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
};
