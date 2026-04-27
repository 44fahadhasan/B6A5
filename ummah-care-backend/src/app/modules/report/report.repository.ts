import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const create = async (data: any) => {
  return prisma.report.create({
    data,
    include: {
      filer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      resolver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return prisma.report.findUnique({
    where: { id },
    include: {
      filer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      resolver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const findMany = async (
  where: Prisma.ReportWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.report.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      filer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      resolver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const count = async (where: Prisma.ReportWhereInput): Promise<number> => {
  return prisma.report.count({ where });
};

const update = async (id: string, data: any) => {
  return prisma.report.update({
    where: { id },
    data,
    include: {
      filer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      resolver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const deleteById = async (id: string) => {
  return prisma.report.delete({
    where: { id },
  });
};

export const reportRepository = {
  create,
  findById,
  findMany,
  count,
  update,
  deleteById,
};
