import { prisma } from "@/app/lib/prisma";
import type { TokenPayload } from "@/app/types";
import AppError from "@/app/utils/app-error.util";
import { tokenUtils } from "@/app/utils/token.util";
import type { Organization } from "@/generated/prisma/client";
import { UserStatus, UserType, UserTypeStatus } from "@/generated/prisma/enums";
import status from "http-status";
import type { OnboardingPayload } from "./user.validation";

const onboarding = async (userId: string, payload: OnboardingPayload) => {
  if (!payload.types || payload.types.length === 0) {
    throw new AppError(status.BAD_REQUEST, "Select at least one type");
  }

  const orgData = payload.types.includes(UserType.ORGANIZATION)
    ? {
        userId,
        orgName: payload.orgName ?? "",
        description: payload.description ?? "",
        logoUrl: payload.logoUrl ?? null,
        website: payload.website ?? null,
        registrationNumber: payload.registrationNumber ?? null,
        contactEmail: payload.contactEmail ?? null,
        contactPhone: payload.contactPhone ?? null,
      }
    : null;

  let organization: Organization | null = null;

  const userTypeEntries = await prisma.$transaction(async (tx) => {
    const entries = [];

    for (const type of payload.types) {
      const statusValue = type === UserType.DONOR ? UserTypeStatus.ACTIVE : UserTypeStatus.PENDING;

      const entry = await tx.userTypeEntry.upsert({
        where: { userId_type: { userId, type } },
        update: { status: statusValue },
        create: { userId, type, status: statusValue },
      });

      entries.push(entry);

      if (type === UserType.ORGANIZATION && orgData) {
        organization = await tx.organization.upsert({
          where: { userId },
          update: orgData,
          create: orgData,
        });
      }
    }

    return entries;
  });

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId, status: UserStatus.ACTIVE },
    include: { userTypes: true },
  });

  const tokenPayload: TokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    userTypes: user.userTypes.map((ut) => ({ type: ut.type, status: ut.status })),
  };

  const accessToken = tokenUtils.generateAccessToken(tokenPayload);
  const refreshToken = tokenUtils.generateRefreshToken(tokenPayload);

  return organization
    ? { accessToken, refreshToken, userTypeEntries, organization }
    : { accessToken, refreshToken, userTypeEntries };
};

export const userServices = {
  onboarding,
};
