import AppError from "@/app/utils/app-error.util";
import { asyncHandler } from "@/app/utils/async-handler.util";
import { sendResponse } from "@/app/utils/send-response.util";
import type { Request, Response } from "express";
import status from "http-status";
import { assignmentServices } from "./assignment.service";
import type { CreateAssignmentPayload, UpdateAssignmentPayload } from "./assignment.type";

const createAssignment = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as CreateAssignmentPayload;
  const userId = req.user.id;

  const assignment = await assignmentServices.createAssignment(userId, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Assignment created successfully.",
    data: assignment,
  });
});

const getAssignments = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const query = req.query;

  const result = await assignmentServices.getAssignments(userId, query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Assignments fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const assignmentId = req.params.id;

  if (!assignmentId || Array.isArray(assignmentId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid assignment ID");
  }

  const assignment = await assignmentServices.getAssignmentById(assignmentId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Assignment fetched successfully.",
    data: assignment,
  });
});

const getMyAssignments = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const query = req.query;

  const result = await assignmentServices.getMyAssignments(userId, query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My assignments fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const getAllAssignment = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await assignmentServices.getAllAssignment(query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "All assignments fetched successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const updateAssignment = asyncHandler(async (req: Request, res: Response) => {
  const assignmentId = req.params.id;
  const payload = req.body as UpdateAssignmentPayload;
  const userId = req.user.id;

  if (!assignmentId || Array.isArray(assignmentId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid assignment ID");
  }

  const updated = await assignmentServices.updateAssignment(assignmentId, userId, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Assignment updated successfully.",
    data: updated,
  });
});

const deleteAssignment = asyncHandler(async (req: Request, res: Response) => {
  const assignmentId = req.params.id;
  const userId = req.user.id;

  if (!assignmentId || Array.isArray(assignmentId)) {
    throw new AppError(status.BAD_REQUEST, "Invalid assignment ID");
  }

  const deleted = await assignmentServices.deleteAssignment(assignmentId, userId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Assignment deleted successfully.",
    data: deleted,
  });
});

export const assignmentController = {
  createAssignment,
  getAssignments,
  getAssignmentById,
  getMyAssignments,
  getAllAssignment,
  updateAssignment,
  deleteAssignment,
};
