import { prisma } from "@/app/lib/prisma";
import type { RequestWhereInput } from "@/generated/prisma/models";

const create = (data: any) => {
  return prisma.request.create({ data });
};

const count = (where: RequestWhereInput) => {
  return prisma.request.count({ where });
};

const findMany = (
  where: RequestWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.request.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      creator: { select: { id: true, name: true, email: true } },
    },
  });
};

const findById = (id: string) => {
  return prisma.request.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true, email: true } },
    },
  });
};

const update = (id: string, data: any) => {
  return prisma.request.update({
    where: { id },
    data,
  });
};

const remove = (id: string) => {
  return prisma.request.delete({ where: { id } });
};

export const requestRepository = {
  create,
  count,
  findMany,
  findById,
  update,
  delete: remove,
};
