import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const create = async (data: any) => {
  return prisma.assignment.create({
    data,
    include: {
      request: {
        select: {
          id: true,
          title: true,
        },
      },
      volunteer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          id: true,
          orgName: true,
        },
      },
      assignedByUser: {
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
  return prisma.assignment.findUnique({
    where: { id },
    include: {
      request: {
        select: {
          id: true,
          title: true,
        },
      },
      volunteer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          id: true,
          orgName: true,
        },
      },
      assignedByUser: {
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
  where: Prisma.AssignmentWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
) => {
  return prisma.assignment.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      request: {
        select: {
          id: true,
          title: true,
        },
      },
      volunteer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          id: true,
          orgName: true,
        },
      },
      assignedByUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const count = async (where: Prisma.AssignmentWhereInput) => {
  return prisma.assignment.count({ where });
};

const update = async (id: string, data: any) => {
  return prisma.assignment.update({
    where: { id },
    data,
    include: {
      request: {
        select: {
          id: true,
          title: true,
        },
      },
      volunteer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          id: true,
          orgName: true,
        },
      },
      assignedByUser: {
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
  return prisma.assignment.delete({
    where: { id },
  });
};

export const assignmentRepository = {
  create,
  findById,
  findMany,
  count,
  update,
  deleteById,
};
