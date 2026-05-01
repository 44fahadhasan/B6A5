import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Role } from "@/generated/prisma/enums";
import { Router } from "express";
import { assignmentController } from "./assignment.controller";
import { createAssignmentSchema, updateAssignmentSchema } from "./assignment.validation";

const router: Router = Router();

router.use(auth());

router.post("/", validateRequest(createAssignmentSchema), assignmentController.createAssignment);

router.get("/", assignmentController.getAssignments);

router.get("/me", assignmentController.getMyAssignments);

router.get(
  "/all-assignment",
  auth([Role.ADMIN, Role.SUPER_ADMIN]),
  assignmentController.getAllAssignment,
);

router.get("/:id", assignmentController.getAssignmentById);

router.patch(
  "/:id",
  validateRequest(updateAssignmentSchema),
  assignmentController.updateAssignment,
);

router.delete("/:id", assignmentController.deleteAssignment);

export const assignmentRoutes = router;
