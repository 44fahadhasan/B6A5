"use server";

import { onboardingSchema } from "@/components/modules/onboarding/onboard-form.schema";
import { USER_TYPE } from "@/constants/user.const";
import { httpClient } from "@/lib/http-client";
import { IOnboardingResponse } from "@/types";
import { errorResponse } from "@/utils/response-util";
import { validatePayload } from "@/utils/validation-util";

export const completeOnboarding = async (payload: Record<string, unknown>) => {
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

  try {
    const response = await httpClient.post<IOnboardingResponse>(
      "/users/me/onboarding",
      result.data,
    );
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};
