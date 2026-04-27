import { paginationUtils } from "@/app/utils/pagination.util";
import { NotificationType } from "@/generated/prisma/enums";
import { z } from "zod";

export const notificationListQuerySchema = paginationUtils.paginationQuerySchema.extend({
  type: z.enum(NotificationType).optional(),
  isRead: z.boolean().optional(),
});

export const markAsReadSchema = z.object({
  notificationIds: z.array(z.uuid()).min(1),
});
