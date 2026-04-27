import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { organizationServices } from "./organization.service";
import type { CreateOrganizationPayload, UpdateOrganizationPayload } from "./organization.type";
import { verifyOrganizationSchema } from "./organization.validation";

const createOrganization = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as CreateOrganizationPayload;
  const userId = req.user.id;

  const organization = await organizationServices.createOrganization(userId, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Organization created successfully.",
    data: organization,
  });
});

const getOrganizations = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await organizationServices.getOrganizations(query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organizations fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getOrganizationById = asyncHandler(async (req: Request, res: Response) => {
  const organizationId = req.params.id;

  if (!organizationId || Array.isArray(organizationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid organization ID");
  }

  const organization = await organizationServices.getOrganizationById(organizationId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organization fetched successfully.",
    data: organization,
  });
});

const getMyOrganization = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const organization = await organizationServices.getMyOrganization(userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My organization fetched successfully.",
    data: organization,
  });
});

const updateOrganization = asyncHandler(async (req: Request, res: Response) => {
  const organizationId = req.params.id;
  const payload = req.body as UpdateOrganizationPayload;
  const userId = req.user.id;

  if (!organizationId || Array.isArray(organizationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid organization ID");
  }

  const updated = await organizationServices.updateOrganization(organizationId, userId, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organization updated successfully.",
    data: updated,
  });
});

const verifyOrganization = asyncHandler(async (req: Request, res: Response) => {
  const organizationId = req.params.id;
  const payload = verifyOrganizationSchema.parse(req.body);
  const admin = req.user;

  if (!organizationId || Array.isArray(organizationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid organization ID");
  }

  const verified = await organizationServices.verifyOrganization(
    organizationId,
    admin,
    payload.isVerified,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: `Organization ${payload.isVerified ? "verified" : "unverified"} successfully.`,
    data: verified,
  });
});

const deleteOrganization = asyncHandler(async (req: Request, res: Response) => {
  const organizationId = req.params.id;
  const userId = req.user.id;

  if (!organizationId || Array.isArray(organizationId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid organization ID");
  }

  const deleted = await organizationServices.deleteOrganization(organizationId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organization deleted successfully.",
    data: deleted,
  });
});

export const organizationController = {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  getMyOrganization,
  updateOrganization,
  verifyOrganization,
  deleteOrganization,
};
