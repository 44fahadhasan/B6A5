import type z from "zod";
import type { notificationListQuerySchema } from "./notification.validation";

export type NotificationListQuery = z.infer<typeof notificationListQuerySchema>;
