"use server";

import { forgotPasswordSchema } from "@/components/modules/forgot-password/forgot-password.form.schema";
import { signInSchema } from "@/components/modules/sign-in/sign-in.form.schema";
import { signUpSchema } from "@/components/modules/sign-up/sign-up.form.schema";
import { TOKEN_CONFIG } from "@/constants/token.const";
import { authService } from "@/services/auth-service";
import { cookieUtils } from "@/utils/cookie-util";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { tokenUtils } from "@/utils/token-util";
import { validatePayload } from "@/utils/validation-util";

const {
  SESSION_TOKEN_NAME,
  SESSION_TOKEN_AGE,
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_AGE,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_AGE,
} = TOKEN_CONFIG;

export async function signInUser(
  payload: Record<string, unknown>,
  redirectPath?: string,
) {
  const result = validatePayload(payload, signInSchema);
  if (!result.success) return result;

  const response = await authService.signInUser(result.data);
  if (!response.success || !response.data) return response;

  const { token, accessToken, refreshToken, user } = response.data;

  await tokenUtils.setTokenIntoCookie(
    SESSION_TOKEN_NAME,
    token,
    SESSION_TOKEN_AGE,
  );

  await tokenUtils.setTokenIntoCookie(
    ACCESS_TOKEN_NAME,
    accessToken,
    ACCESS_TOKEN_AGE,
  );

  await tokenUtils.setTokenIntoCookie(
    REFRESH_TOKEN_NAME,
    refreshToken,
    REFRESH_TOKEN_AGE,
  );

  const { isValidRedirectForUser, getDefaultDashboardRoute } = routeRulesUtil;

  const targetedPath =
    redirectPath && isValidRedirectForUser(redirectPath, user)
      ? redirectPath
      : getDefaultDashboardRoute(user);

  return {
    ...response,
    redirectTo: targetedPath,
  };
}

export async function signUpUser(payload: Record<string, unknown>) {
  const result = validatePayload(payload, signUpSchema);
  if (!result.success) return result;

  const response = await authService.signUpUser(result.data);
  return response;
}

export async function tokenRefresh() {
  const response = await authService.tokenRefresh();
  if (!response.success || !response.data) return response;

  const { token, accessToken, refreshToken } = response.data;

  await tokenUtils.setTokenIntoCookie(
    SESSION_TOKEN_NAME,
    token,
    SESSION_TOKEN_AGE,
  );

  await tokenUtils.setTokenIntoCookie(
    ACCESS_TOKEN_NAME,
    accessToken,
    ACCESS_TOKEN_AGE,
  );

  await tokenUtils.setTokenIntoCookie(
    REFRESH_TOKEN_NAME,
    refreshToken,
    REFRESH_TOKEN_AGE,
  );

  console.info(`🔄 [Auth] ${response.message}`);

  return response;
}

export async function singOutUser() {
  const response = await authService.singOutUser();
  if (!response.success) return response;

  await cookieUtils.deleteCookie(SESSION_TOKEN_NAME);
  await cookieUtils.deleteCookie(ACCESS_TOKEN_NAME);
  await cookieUtils.deleteCookie(REFRESH_TOKEN_NAME);

  return response;
}

export async function getSession() {
  const response = await authService.getSession();
  return response;
}

export async function sendPasswordResetEmail(payload: Record<string, unknown>) {
  const result = validatePayload(payload, forgotPasswordSchema);
  if (!result.success) return result;

  const response = await authService.sendPasswordResetEmail(result.data);
  return response;
}
