import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Role } from "@/generated/prisma/enums";
import { Router } from "express";
import { userController } from "./user.controller";
import { onboardingSchema } from "./user.validation";

const router: Router = Router();

router.post("/me/onboarding", auth(), validateRequest(onboardingSchema), userController.onboarding);

router.get("/all-users", auth([Role.ADMIN, Role.SUPER_ADMIN]), userController.getAllUsers);

export const userRoutes = router;
