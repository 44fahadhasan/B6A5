import status from "http-status";
import z from "zod";
import type { ErrorResponse, ErrorSource } from "../types";

export const handleZodError = (err: z.ZodError): ErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Zod validation error";
  const errorSources: ErrorSource[] = [];

  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(" => "),
      message: issue.message,
    });
  });

  return {
    statusCode,
    success: false,
    message,
    errorSources,
  };
};
