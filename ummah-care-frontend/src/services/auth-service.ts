import { IForgotPasswordPayload } from "@/components/modules/forgot-password/forgot-password.form.schema";
import { httpClient } from "@/lib/http-client";
import {
  ISessionResponse,
  ISignInResponse,
  ISignUpResponse,
  ITokenRefreshResponse,
} from "@/types";
import { errorResponse } from "@/utils/response-util";

export const authService = {
  signInUser: async (payload: Record<string, unknown>) => {
    try {
      const response = await httpClient.post<ISignInResponse>(
        "/auth/sign-in",
        payload,
        { isProtected: false },
      );
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  signUpUser: async (payload: Record<string, unknown>) => {
    try {
      const response = await httpClient.post<ISignUpResponse>(
        "/auth/sign-up",
        payload,
        { isProtected: false },
      );
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  tokenRefresh: async () => {
    try {
      const response = await httpClient.post<ITokenRefreshResponse>(
        "/auth/refresh-token",
      );
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  singOutUser: async () => {
    try {
      const response = await httpClient.post("/auth/logout");
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  getSession: async () => {
    try {
      const response = await httpClient.post<ISessionResponse>("/auth/session");
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  sendPasswordResetEmail: async (payload: IForgotPasswordPayload) => {
    try {
      const response = await httpClient.post("/auth/forgot-password", payload);
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },
};
