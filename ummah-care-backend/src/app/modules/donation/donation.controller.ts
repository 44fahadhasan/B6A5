import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { donationService } from "./donation.service";
import type { CreateDonationPayload, InitiateDonationPaymentPayload } from "./donation.type";

/**
 * Create a new donation
 * @route POST /api/v1/donations
 */
const createDonation = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const payload = req.body as CreateDonationPayload;

  const donation = await donationService.createDonation(userId, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Donation created successfully",
    data: donation,
  });
});

/**
 * Initiate Stripe payment for a donation
 * @route POST /api/v1/donations/:donationId/payment
 */
const initiateDonationPayment = asyncHandler(async (req: Request, res: Response) => {
  const { donationId } = req.params;
  const payload = req.body as InitiateDonationPaymentPayload;

  if (!donationId || Array.isArray(donationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid donation ID");
  }

  const result = await donationService.initiateDonationPayment(donationId, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Payment session created successfully",
    data: result,
  });
});

export const donationController = {
  createDonation,
  initiateDonationPayment,
};
