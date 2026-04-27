import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const create = async (data: any) => {
  return prisma.campaign.create({
    data,
    include: {
      organization: {
        select: {
          id: true,
          orgName: true,
          isVerified: true,
        },
      },
      linkedRequest: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return prisma.campaign.findUnique({
    where: { id },
    include: {
      organization: {
        select: {
          id: true,
          orgName: true,
          isVerified: true,
        },
      },
      linkedRequest: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const findMany = async (
  where: Prisma.CampaignWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.campaign.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      organization: {
        select: {
          id: true,
          orgName: true,
          isVerified: true,
        },
      },
      linkedRequest: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const count = async (where: Prisma.CampaignWhereInput) => {
  return prisma.campaign.count({ where });
};

const update = async (id: string, data: any) => {
  return prisma.campaign.update({
    where: { id },
    data,
    include: {
      organization: {
        select: {
          id: true,
          orgName: true,
          isVerified: true,
        },
      },
      linkedRequest: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const deleteById = async (id: string) => {
  return prisma.campaign.delete({
    where: { id },
  });
};

export const campaignRepository = {
  create,
  findById,
  findMany,
  count,
  update,
  deleteById,
};
