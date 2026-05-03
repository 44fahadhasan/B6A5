import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Router } from "express";
import { campaignController } from "./campaign.controller";
import { createCampaignSchema, updateCampaignSchema } from "./campaign.validation";

const router: Router = Router();

// Public routes
router.get("/", campaignController.getCampaigns);
router.get("/:id", campaignController.getCampaignById);

// Protected routes
router.post("/", auth(), validateRequest(createCampaignSchema), campaignController.createCampaign);

router.get("/me/campaigns", auth(), campaignController.getMyCampaigns);
router.get("/me/list", auth(), campaignController.getMyCampaignList);

router.patch(
  "/:id",
  auth(),
  validateRequest(updateCampaignSchema),
  campaignController.updateCampaign,
);

router.delete("/:id", auth(), campaignController.deleteCampaign);

export const campaignRoutes = router;
