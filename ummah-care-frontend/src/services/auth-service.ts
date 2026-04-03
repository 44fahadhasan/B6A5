import { IForgotPasswordPayload } from "@/components/modules/forgot-password/forgot-password.form.schema";
import { httpClient } from "@/lib/http-client";
import {
  ISessionResponse,
  ISignInResponse,
  ISignUpResponse,
  ITokenRefreshResponse,
} from "@/types";
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

  tokenRefresh: () =>
    safeRequest(async () =>
      httpClient.post<ITokenRefreshResponse>("/auth/refresh-token", undefined, {
        isProtected: false,
      }),
    ),

  singOutUser: () => safeRequest(async () => httpClient.post("/auth/logout")),

  getSession: () =>
    safeRequest(async () => httpClient.post<ISessionResponse>("/auth/session")),

  sendPasswordResetEmail: (payload: IForgotPasswordPayload) =>
    safeRequest(async () => httpClient.post("/auth/forgot-password", payload)),
};
