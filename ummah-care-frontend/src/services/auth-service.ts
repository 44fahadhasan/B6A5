import { IForgotPasswordPayload } from "@/components/modules/forgot-password/forgot-password.form.schema";
import { IVerifyEmailPayload } from "@/components/modules/verify-email/verify-email.form.schema";
import { httpClient } from "@/lib/http-client";
import {
  ISessionResponse,
  ISignInResponse,
  ISignUpResponse,
  ITokenRefreshResponse,
} from "@/types";
import { getErrorMessage } from "@/utils/error-util";
import { safeRequest } from "@/utils/safe-request";

export const authService = {
  signInUser: (payload: Record<string, unknown>) =>
    safeRequest(async () =>
      httpClient.post<ISignInResponse>("/auth/sign-in", payload, {
        isProtected: false,
      }),
    ),

  signUpUser: (payload: Record<string, unknown>) =>
    safeRequest(async () =>
      httpClient.post<ISignUpResponse>("/auth/sign-up", payload, {
        isProtected: false,
      }),
    ),

  verifyEmailUser: (payload: IVerifyEmailPayload) =>
    safeRequest(async () =>
      httpClient.post("/auth/verify-email", payload, {
        isProtected: false,
      }),
    ),

  tokenRefresh: () =>
    safeRequest(async () =>
      httpClient.post<ITokenRefreshResponse>("/auth/refresh-token", undefined, {
        isProtected: false,
      }),
    ),

  singOutUser: () => safeRequest(async () => httpClient.post("/auth/logout")),

  getSession: async () => {
    try {
      const res = await httpClient.post<ISessionResponse>("/auth/session");
      return res;
    } catch (error) {
      return {
        data: null,
        success: false,
        message: getErrorMessage(error),
      };
    }
  },

  sendPasswordResetEmail: (payload: IForgotPasswordPayload) =>
    safeRequest(async () => httpClient.post("/auth/forgot-password", payload)),
};
