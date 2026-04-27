import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Role } from "@/generated/prisma/enums";
import { Router } from "express";
import { reportController } from "./report.controller";
import { createReportSchema, updateReportSchema } from "./report.validation";

const router: Router = Router();

// Protected routes - all require authentication
router.post("/", auth(), validateRequest(createReportSchema), reportController.createReport);

router.get("/", auth(), reportController.getReports);

router.get("/:id", auth(), reportController.getReportById);

// Admin only routes
router.patch(
  "/:id",
  auth([Role.ADMIN, Role.SUPER_ADMIN]),
  validateRequest(updateReportSchema),
  reportController.updateReport,
);

router.delete("/:id", auth(), reportController.deleteReport);

export const reportRoutes = router;
