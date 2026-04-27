import type { TokenPayload } from "@/app/types";
import AppError from "@/app/utils/app-error.util";
import { paginationUtils } from "@/app/utils/pagination.util";
import { parseSchema } from "@/app/utils/zod-error.util";
import type { OrganizationWhereInput } from "@/generated/prisma/models";
import status from "http-status";
import { organizationConsts } from "./organization.const";
import { organizationRepository } from "./organization.repository";
import type { CreateOrganizationPayload, UpdateOrganizationPayload } from "./organization.type";
import { organizationListQuerySchema } from "./organization.validation";

const createOrganization = async (userId: string, payload: CreateOrganizationPayload) => {
  const existing = await organizationRepository.findByUserId(userId);
  if (existing) {
    throw new AppError(status.CONFLICT, "Organization already exists for this user");
  }

  return organizationRepository.create({
    user: { connect: { id: userId } },
    ...payload,
  });
};

const getOrganizations = async (query: unknown) => {
  const typedQuery = parseSchema(organizationListQuerySchema, query);
  const { page, limit, skip, take } = paginationUtils.getPaginationOptions(typedQuery);

  const where: OrganizationWhereInput = {};

  if (typedQuery.isVerified !== undefined) {
    where.isVerified = typedQuery.isVerified;
  }

  if (typedQuery.search) {
    where.OR = [
      {
        orgName: {
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
    organizationConsts.allowedSortByFields,
  );

  const [total, organizations] = await Promise.all([
    organizationRepository.count(where),
    organizationRepository.findMany(where, skip, take, orderBy),
  ]);

  return {
    data: organizations,
    meta: paginationUtils.getPaginationMeta(total, page, limit),
  };
};

const getOrganizationById = async (id: string) => {
  const organization = await organizationRepository.findById(id);
  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }
  return organization;
};

const getMyOrganization = async (userId: string) => {
  const organization = await organizationRepository.findByUserId(userId);
  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }
  return organization;
};

const updateOrganization = async (
  id: string,
  userId: string,
  payload: UpdateOrganizationPayload,
) => {
  const organization = await organizationRepository.findById(id);
  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  if (organization.userId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only update your own organization");
  }

  return organizationRepository.update(id, payload);
};

const verifyOrganization = async (id: string, admin: TokenPayload, isVerified: boolean) => {
  const organization = await organizationRepository.findById(id);
  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  return organizationRepository.update(id, {
    isVerified,
    verifiedAt: isVerified ? new Date() : null,
    verifiedBy: isVerified ? admin.id : null,
  });
};

const deleteOrganization = async (id: string, userId: string) => {
  const organization = await organizationRepository.findById(id);
  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  if (organization.userId !== userId) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own organization");
  }

  return organizationRepository.deleteById(id);
};

export const organizationServices = {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  getMyOrganization,
  updateOrganization,
  verifyOrganization,
  deleteOrganization,
};
