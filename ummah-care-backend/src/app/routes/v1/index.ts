import { authRoutes } from "@/app/modules/auth/auth.route";
import { requestRoutes } from "@/app/modules/request/request.route";
import { responseRoutes } from "@/app/modules/response/response.route";
import { userRoutes } from "@/app/modules/user/user.route";
import type { Routes } from "@/app/types";
import { Router } from "express";

const router: Router = Router();

const routes: Routes[] = [
  { path: "/auth", router: authRoutes },
  { path: "/users", router: userRoutes },
  { path: "/requests", router: requestRoutes },
  { path: "/responses", router: responseRoutes },
];

routes.forEach((route) => router.use(route.path, route.router));

export const v1Routes = router;
