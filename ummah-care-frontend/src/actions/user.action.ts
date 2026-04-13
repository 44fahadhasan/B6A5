"use server";

import { onboardingSchema } from "@/components/modules/onboarding/onboard-form.schema";
import { USER_TYPE } from "@/constants/user.const";
import { httpClient } from "@/lib/http-client";
import { IAllUsersResponse, IOnboardingResponse } from "@/types";
import { safeRequest } from "@/utils/safe-request";
import { validatePayload } from "@/utils/validation-util";

export const completeOnboarding = async (payload: Record<string, unknown>) =>
  safeRequest(async () => {
    const cleanedPayload = { ...payload } as Record<string, unknown>;

    if (
      !Array.isArray(cleanedPayload.types) ||
      !cleanedPayload.types.includes(USER_TYPE.ORGANIZATION)
    ) {
      delete cleanedPayload.orgName;
      delete cleanedPayload.description;
      delete cleanedPayload.logoUrl;
      delete cleanedPayload.website;
      delete cleanedPayload.registrationNumber;
      delete cleanedPayload.contactEmail;
      delete cleanedPayload.contactPhone;
    }

    const result = validatePayload(cleanedPayload, onboardingSchema);
    if (!result.success) return result;

    const response = await httpClient.post<IOnboardingResponse>(
      "/users/me/onboarding",
      result.data,
    );
    return response;
  });

export const getAllUsers = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/users/all-users?${queryString}`
      : "/users/all-users";

    const response = await httpClient.get<IAllUsersResponse[]>(endpoint);
    return response;
  });

export const getAllVolunteers = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/users/all-volunteers?${queryString}`
      : "/users/all-volunteers";

    const response = await httpClient.get<IAllUsersResponse[]>(endpoint);
    return response;
  });

export const getAllDonors = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/users/all-donors?${queryString}`
      : "/users/all-donors";

    const response = await httpClient.get<IAllUsersResponse[]>(endpoint);
    return response;
  });

export const getAllOrganizations = async (queryString?: string) =>
  safeRequest(async () => {
    const endpoint = queryString
      ? `/users/all-organizations?${queryString}`
      : "/users/all-organizations";

    const response = await httpClient.get<IAllUsersResponse[]>(endpoint);
    return response;
  });
