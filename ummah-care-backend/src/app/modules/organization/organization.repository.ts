import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const create = async (data: any) => {
  return prisma.organization.create({ data });
};

const findById = async (id: string) => {
  return prisma.organization.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
};

const findByUserId = async (userId: string) => {
  return prisma.organization.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
};

const findMany = async (
  where: Prisma.OrganizationWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.organization.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
};

const count = async (where: Prisma.OrganizationWhereInput) => {
  return prisma.organization.count({ where });
};

const update = async (id: string, data: any) => {
  return prisma.organization.update({
    where: { id },
    data,
  });
};

const deleteById = async (id: string) => {
  return prisma.organization.delete({
    where: { id },
  });
};

export const organizationRepository = {
  create,
  findById,
  findByUserId,
  findMany,
  count,
  update,
  deleteById,
};
