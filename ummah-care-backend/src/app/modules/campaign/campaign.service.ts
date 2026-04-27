import { prisma } from "@/app/lib/prisma";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import { CampaignStatus } from "@/generated/prisma/enums";
import type { CampaignWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { campaignConsts } from "./campaign.const";
import { campaignRepository } from "./campaign.repository";
import type { CreateCampaignPayload, UpdateCampaignPayload } from "./campaign.type";
import { campaignListQuerySchema } from "./campaign.validation";

const createCampaign = async (userId: string, payload: CreateCampaignPayload) => {
  // Verify organization exists and belongs to user
  const organization = await prisma.organization.findFirst({
    where: {
      id: payload.orgId,
      userId,
    },
  });

  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found or you don't own it");
  }

  // Verify linked request if provided
  if (payload.linkedRequestId) {
    const request = await prisma.request.findUnique({
      where: { id: payload.linkedRequestId },
    });

    if (!request) {
      throw new AppError(status.NOT_FOUND, "Linked request not found");
    }
  }

  return campaignRepository.create({
    orgId: payload.orgId,
    linkedRequestId: payload.linkedRequestId,
    title: payload.title,
    description: payload.description,
    goalAmount: payload.goalAmount,
    currency: payload.currency,
    status: payload.status,
    startDate: payload.startDate,
    endDate: payload.endDate,
  });
};

const getCampaigns = async (query: unknown) => {
  const typedQuery = parseSchema(campaignListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: CampaignWhereInput = {
    status: CampaignStatus.ACTIVE, // Only show active campaigns publicly
  };

  if (typedQuery.orgId) where.orgId = typedQuery.orgId;
  if (typedQuery.status) where.status = typedQuery.status;
  if (typedQuery.linkedRequestId) where.linkedRequestId = typedQuery.linkedRequestId;

  if (typedQuery.search) {
    where.OR = [
      {
        title: {
          contains: typedQuery.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: typedQuery.search,
          mode: "insensitive",
        },
      },
    ];
  }

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    campaignConsts.allowedSortByFields,
  );

  const [total, campaigns] = await Promise.all([
    campaignRepository.count(where),
    campaignRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: campaigns,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getCampaignById = async (id: string) => {
  const campaign = await campaignRepository.findById(id);
  if (!campaign) {
    throw new AppError(status.NOT_FOUND, "Campaign not found");
  }
  return campaign;
};

const getMyCampaigns = async (userId: string, query: unknown) => {
  const typedQuery = parseSchema(campaignListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  // Get user's organizations
  const organizations = await prisma.organization.findMany({
    where: { userId },
    select: { id: true },
  });

  const orgIds = organizations.map((org) => org.id);

  const where: CampaignWhereInput = {
    orgId: { in: orgIds },
  };

  if (typedQuery.status) where.status = typedQuery.status;
  if (typedQuery.linkedRequestId) where.linkedRequestId = typedQuery.linkedRequestId;

  if (typedQuery.search) {
    where.OR = [
      {
        title: {
          contains: typedQuery.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: typedQuery.search,
          mode: "insensitive",
        },
      },
    ];
  }

  const orderBy = paginationUtils.getOrderBy(
    typedQuery.sortBy,
    typedQuery.sortOrder,
    campaignConsts.allowedSortByFields,
  );

  const [total, campaigns] = await Promise.all([
    campaignRepository.count(where),
    campaignRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: campaigns,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const updateCampaign = async (id: string, userId: string, payload: UpdateCampaignPayload) => {
  const campaign = await campaignRepository.findById(id);
  if (!campaign) {
    throw new AppError(status.NOT_FOUND, "Campaign not found");
  }

  // Verify ownership
  const organization = await prisma.organization.findFirst({
    where: {
      id: campaign.orgId,
      userId,
    },
  });

  if (!organization) {
    throw new AppError(status.FORBIDDEN, "You can only update your own campaigns");
  }

  return campaignRepository.update(id, payload);
};

const deleteCampaign = async (id: string, userId: string) => {
  const campaign = await campaignRepository.findById(id);
  if (!campaign) {
    throw new AppError(status.NOT_FOUND, "Campaign not found");
  }

  // Verify ownership
  const organization = await prisma.organization.findFirst({
    where: {
      id: campaign.orgId,
      userId,
    },
  });

  if (!organization) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own campaigns");
  }

  return campaignRepository.deleteById(id);
};

export const campaignServices = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  getMyCampaigns,
  updateCampaign,
  deleteCampaign,
};
