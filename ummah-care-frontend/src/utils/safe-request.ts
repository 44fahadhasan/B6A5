import { IApiErrorResponse } from "@/types";
import { getErrorMessage } from "./error-util";

type SafeResponse<T> = T | IApiErrorResponse;

export async function safeRequest<T>(
  fn: () => Promise<T>,
): Promise<SafeResponse<T>> {
  try {
    return await fn();
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
      data: null,
    };
  }
}
