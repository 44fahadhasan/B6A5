import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const create = async (data: any) => {
  return prisma.notification.create({
    data,
  });
};

const createMany = async (data: any[]) => {
  return prisma.notification.createMany({
    data,
  });
};

const findById = async (id: string) => {
  return prisma.notification.findUnique({
    where: { id },
  });
};

const findMany = async (
  where: Prisma.NotificationWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.notification.findMany({
    where,
    skip,
    take,
    orderBy,
  });
};

const count = async (where: Prisma.NotificationWhereInput) => {
  return prisma.notification.count({ where });
};

const update = async (id: string, data: any) => {
  return prisma.notification.update({
    where: { id },
    data,
  });
};

const updateMany = async (
  where: Prisma.NotificationWhereInput,
  data: Prisma.NotificationUpdateInput,
) => {
  return prisma.notification.updateMany({
    where,
    data,
  });
};

const deleteById = async (id: string) => {
  return prisma.notification.delete({
    where: { id },
  });
};

const deleteMany = async (where: Prisma.NotificationWhereInput) => {
  return prisma.notification.deleteMany({
    where,
  });
};

export const notificationRepository = {
  create,
  createMany,
  findById,
  findMany,
  count,
  update,
  updateMany,
  deleteById,
  deleteMany,
};
