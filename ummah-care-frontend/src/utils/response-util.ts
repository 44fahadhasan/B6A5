import { IApiErrorResponse } from "@/types";
import { getErrorMessage } from "./error-util";

export const errorResponse = (error: unknown): IApiErrorResponse => {
  const message = getErrorMessage(error);

  return {
    success: false,
    message,
    data: null,
  };
};
