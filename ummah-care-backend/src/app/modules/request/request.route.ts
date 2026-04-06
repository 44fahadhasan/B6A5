import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Router } from "express";
import { requestController } from "./request.controller";
import { createRequestSchema, updateRequestSchema } from "./request.validation";

const router: Router = Router();

router.post("/", auth(), validateRequest(createRequestSchema), requestController.createRequest);

router.get("/", requestController.getRequests);

router.get("/me", auth(), requestController.getMyRequests);

router.get("/:id/responses", auth(), requestController.getResponsesByRequest);

router.get("/:id", requestController.getRequestById);

router.patch("/:id", auth(), validateRequest(updateRequestSchema), requestController.updateRequest);

router.delete("/:id", auth(), requestController.deleteRequest);

export const requestRoutes = router;
