import { authRoutes } from "@/app/modules/auth/auth.route";
import { requestRoutes } from "@/app/modules/request/request.route";
import { userRoutes } from "@/app/modules/user/user.route";
import type { Routes } from "@/app/types";
import { Router } from "express";

const router: Router = Router();

const routes: Routes[] = [
  { path: "/auth", router: authRoutes },
  { path: "/users", router: userRoutes },
  { path: "/requests", router: requestRoutes },
];

routes.forEach((route) => router.use(route.path, route.router));

export const v1Routes = router;
