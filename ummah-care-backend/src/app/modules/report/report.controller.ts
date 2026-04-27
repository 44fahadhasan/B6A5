import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { reportServices } from "./report.service";
import type { CreateReportPayload, UpdateReportPayload } from "./report.type";

const createReport = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as CreateReportPayload;
  const reporterId = req.user.id;

  const report = await reportServices.createReport(reporterId, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Report submitted successfully.",
    data: report,
  });
});

const getReports = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user;

  const result = await reportServices.getReports(query, user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Reports fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getReportById = asyncHandler(async (req: Request, res: Response) => {
  const reportId = req.params.id;
  const user = req.user;

  if (!reportId || Array.isArray(reportId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid report ID");
  }

  const report = await reportServices.getReportById(reportId, user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Report fetched successfully.",
    data: report,
  });
});

const updateReport = asyncHandler(async (req: Request, res: Response) => {
  const reportId = req.params.id;
  const payload = req.body as UpdateReportPayload;
  const admin = req.user;

  if (!reportId || Array.isArray(reportId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid report ID");
  }

  const updated = await reportServices.updateReport(reportId, admin, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Report updated successfully.",
    data: updated,
  });
});

const deleteReport = asyncHandler(async (req: Request, res: Response) => {
  const reportId = req.params.id;
  const userId = req.user.id;

  if (!reportId || Array.isArray(reportId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid report ID");
  }

  const deleted = await reportServices.deleteReport(reportId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Report deleted successfully.",
    data: deleted,
  });
});

export const reportController = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
};
