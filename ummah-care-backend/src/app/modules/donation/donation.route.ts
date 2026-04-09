import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Router } from "express";
import { donationController } from "./donation.controller";
import { createDonationSchema, initiateDonationPaymentSchema } from "./donation.validation";

const router: Router = Router();

/**
 * Create a new donation
 */
router.post("/", auth(), validateRequest(createDonationSchema), donationController.createDonation);

/**
 * Initiate Stripe payment for a donation
 */
router.post(
  "/:donationId/payment",
  auth(),
  validateRequest(initiateDonationPaymentSchema),
  donationController.initiateDonationPayment,
);

export const donationRoutes = router;
