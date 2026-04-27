import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const create = async (data: any) => {
  return prisma.review.create({
    data,
    include: {
      reviewer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      targetUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      request: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return prisma.review.findUnique({
    where: { id },
    include: {
      reviewer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      targetUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      request: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const findMany = async (
  where: Prisma.ReviewWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.review.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      reviewer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      targetUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      request: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const count = async (where: Prisma.ReviewWhereInput) => {
  return prisma.review.count({ where });
};

const findByUnique = async (reviewerId: string, targetUserId: string, requestId: string) => {
  return prisma.review.findUnique({
    where: {
      reviewerId_targetUserId_requestId: {
        reviewerId,
        targetUserId,
        requestId,
      },
    },
  });
};

const deleteById = async (id: string) => {
  return prisma.review.delete({
    where: { id },
  });
};

export const reviewRepository = {
  create,
  findById,
  findMany,
  count,
  findByUnique,
  deleteById,
};
