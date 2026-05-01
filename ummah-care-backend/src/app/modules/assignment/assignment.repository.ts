import { prisma } from "@/app/lib/prisma";
import type {
  AssignmentInclude,
  AssignmentSelect,
  AssignmentWhereInput,
} from "@/generated/prisma/models";

type AssignmentRepoOptions = {
  select?: AssignmentSelect;
  include?: AssignmentInclude;
};

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

const count = (where: AssignmentWhereInput) => {
  return prisma.assignment.count({ where });
};

const findMany = (
  where: AssignmentWhereInput,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" },
  options?: AssignmentRepoOptions,
) => {
  const query: Record<string, unknown> = {
    where,
    skip,
    take,
    orderBy,
  };

  if (options?.select) {
    query.select = options.select;
  } else if (options?.include) {
    query.include = options.include;
  }

  return prisma.assignment.findMany(query as any);
};

const findById = (id: string, options?: AssignmentRepoOptions) => {
  const query: Record<string, unknown> = {
    where: { id },
  };

  if (options?.select) {
    query.select = options.select;
  } else if (options?.include) {
    query.include = options.include;
  }

  return prisma.assignment.findUnique(query as any);
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

const remove = (id: string) => {
  return prisma.assignment.delete({ where: { id } });
};

export const assignmentRepository = {
  create,
  count,
  findMany,
  findById,
  update,
  delete: remove,
};
