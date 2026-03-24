import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Router } from "express";
import { userController } from "./user.controller";
import { onboardingSchema } from "./user.validation";

const router: Router = Router();

router.post("/me/onboarding", auth(), validateRequest(onboardingSchema), userController.onboarding);

export const userRoutes = router;
