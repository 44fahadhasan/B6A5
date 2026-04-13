import { Router } from "express";
import { Role, UserType } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth-middleware";
import { StatsController } from "./stats.controller";

const router: Router = Router();

router.get(
  "/",
  auth(
    [Role.SUPER_ADMIN, Role.ADMIN, Role.USER],
    [UserType.DONOR, UserType.VOLUNTEER, UserType.ORGANIZATION],
  ),
  StatsController.getDashboardStatsData,
);

export const StatsRoutes = router;
