import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Router } from "express";
import { notificationController } from "./notification.controller";
import { markAsReadSchema } from "./notification.validation";

const router: Router = Router();

// All notification routes require authentication
router.get("/", auth(), notificationController.getNotifications);

router.get("/unread-count", auth(), notificationController.getUnreadCount);

router.get("/:id", auth(), notificationController.getNotificationById);

router.post(
  "/mark-read",
  auth(),
  validateRequest(markAsReadSchema),
  notificationController.markAsRead,
);

router.post("/mark-all-read", auth(), notificationController.markAllAsRead);

router.delete("/:id", auth(), notificationController.deleteNotification);

router.delete("/", auth(), notificationController.deleteAllNotifications);

export const notificationRoutes = router;
