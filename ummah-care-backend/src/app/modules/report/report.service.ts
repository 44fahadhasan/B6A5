import { prisma } from "@/app/lib/prisma";
import type { TokenPayload } from "@/app/types";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import type { Prisma } from "@/generated/prisma/client";
import { ReportStatus, ReportTargetType, Role } from "@/generated/prisma/enums";
import type { ReportWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { reportConsts } from "./report.const";
import { reportRepository } from "./report.repository";
import type { CreateReportPayload, UpdateReportPayload } from "./report.type";
import { reportListQuerySchema } from "./report.validation";

const createReport = async (reporterId: string, payload: CreateReportPayload) => {
  // Verify target exists based on type
  let targetExists = false;

  switch (payload.targetType) {
    case ReportTargetType.REQUEST: {
      const request = await prisma.request.findUnique({
        where: { id: payload.targetId },
      });
      targetExists = !!request;
      break;
    }
    case ReportTargetType.USER: {
      const user = await prisma.user.findUnique({
        where: { id: payload.targetId },
      });
      targetExists = !!user;
      break;
    }
    case ReportTargetType.REVIEW: {
      const review = await prisma.review.findUnique({
        where: { id: payload.targetId },
      });
      targetExists = !!review;
      break;
    }
  }

  if (!targetExists) {
    throw new AppError(status.NOT_FOUND, "Target not found");
  }

  // Can't report yourself
  if (payload.targetType === ReportTargetType.USER && payload.targetId === reporterId) {
    throw new AppError(status.BAD_REQUEST, "Cannot report yourself");
  }

  return reportRepository.create({
    filer: { connect: { id: reporterId } },
    targetType: payload.targetType,
    targetId: payload.targetId,
    reason: payload.reason,
  });
};

const getReports = async (query: unknown, user: TokenPayload) => {
  const typedQuery = parseSchema(reportListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: ReportWhereInput = {};

  // Regular users can only see their own reports
  if (user.role === Role.USER) {
    where.reportedBy = user.id;
  }

  // Admins can filter by status and target type
  if (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) {
    if (typedQuery.status) where.status = typedQuery.status;
    if (typedQuery.targetType) where.targetType = typedQuery.targetType;
    if (typedQuery.reportedBy) where.reportedBy = typedQuery.reportedBy;
  }

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    reportConsts.allowedSortByFields,
  );

  const [total, reports] = await Promise.all([
    reportRepository.count(where),
    reportRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: reports,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getReportById = async (id: string, user: TokenPayload) => {
  const report = await reportRepository.findById(id);
  if (!report) {
    throw new AppError(status.NOT_FOUND, "Report not found");
  }

  // Regular users can only see their own reports
  if (user.role === Role.USER && report.reportedBy !== user.id) {
    throw new AppError(status.FORBIDDEN, "You can only view your own reports");
  }

  return report;
};

const updateReport = async (id: string, admin: TokenPayload, payload: UpdateReportPayload) => {
  const report = await reportRepository.findById(id);
  if (!report) {
    throw new AppError(status.NOT_FOUND, "Report not found");
  }

  // Only admins can update reports
  if (admin.role !== Role.ADMIN && admin.role !== Role.SUPER_ADMIN) {
    throw new AppError(status.FORBIDDEN, "Only admins can update reports");
  }

  const updateData: Prisma.ReportUpdateInput = {
    ...payload,
  };

  // If status is being changed to REVIEWED or DISMISSED, set resolvedAt
  if (
    payload.status &&
    (payload.status === ReportStatus.REVIEWED || payload.status === ReportStatus.DISMISSED)
  ) {
    updateData.resolvedAt = new Date();
    updateData.resolver = { connect: { id: admin.id } };
  }

  return reportRepository.update(id, updateData);
};

const deleteReport = async (id: string, userId: string) => {
  const report = await reportRepository.findById(id);
  if (!report) {
    throw new AppError(status.NOT_FOUND, "Report not found");
  }

  // Only the filer or admin can delete
  if (report.reportedBy !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own reports");
  }

  return reportRepository.deleteById(id);
};

export const reportServices = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
};
