"use server";

import { onboardingSchema } from "@/components/modules/onboarding/onboard-form.schema";
import { httpClient } from "@/lib/http-client";
import { IOnboardingResponse } from "@/types";
import { errorResponse } from "@/utils/response-util";
import { validatePayload } from "@/utils/validation-util";

export const completeOnboarding = async (payload: Record<string, unknown>) => {
  const result = validatePayload(payload, onboardingSchema);
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
