import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { campaignServices } from "./campaign.service";
import type { CreateCampaignPayload, UpdateCampaignPayload } from "./campaign.type";

const createCampaign = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as CreateCampaignPayload;
  const userId = req.user.id;

  const campaign = await campaignServices.createCampaign(userId, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Campaign created successfully.",
    data: campaign,
  });
});

const getCampaigns = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await campaignServices.getCampaigns(query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Campaigns fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getCampaignById = asyncHandler(async (req: Request, res: Response) => {
  const campaignId = req.params.id;

  if (!campaignId || Array.isArray(campaignId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid campaign ID");
  }

  const campaign = await campaignServices.getCampaignById(campaignId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Campaign fetched successfully.",
    data: campaign,
  });
});

const getMyCampaigns = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const query = req.query;

  const result = await campaignServices.getMyCampaigns(userId, query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My campaigns fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaignId = req.params.id;
  const payload = req.body as UpdateCampaignPayload;
  const userId = req.user.id;

  if (!campaignId || Array.isArray(campaignId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid campaign ID");
  }

  const updated = await campaignServices.updateCampaign(campaignId, userId, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Campaign updated successfully.",
    data: updated,
  });
});

const deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaignId = req.params.id;
  const userId = req.user.id;

  if (!campaignId || Array.isArray(campaignId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid campaign ID");
  }

  const deleted = await campaignServices.deleteCampaign(campaignId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Campaign deleted successfully.",
    data: deleted,
  });
});

export const campaignController = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  getMyCampaigns,
  updateCampaign,
  deleteCampaign,
};
