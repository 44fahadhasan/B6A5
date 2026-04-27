import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Role } from "@/generated/prisma/enums";
import { Router } from "express";
import { organizationController } from "./organization.controller";
import { createOrganizationSchema, updateOrganizationSchema } from "./organization.validation";

const router: Router = Router();

// Public routes
router.get("/", organizationController.getOrganizations);
router.get("/:id", organizationController.getOrganizationById);

// Protected routes
router.post(
  "/",
  auth(),
  validateRequest(createOrganizationSchema),
  organizationController.createOrganization,
);

router.get("/me/organization", auth(), organizationController.getMyOrganization);

router.patch(
  "/:id",
  auth(),
  validateRequest(updateOrganizationSchema),
  organizationController.updateOrganization,
);

router.delete("/:id", auth(), organizationController.deleteOrganization);

// Admin routes
router.patch(
  "/:id/verify",
  auth([Role.ADMIN, Role.SUPER_ADMIN]),
  organizationController.verifyOrganization,
);

export const organizationRoutes = router;
