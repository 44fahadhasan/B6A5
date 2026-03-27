import axios, { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      const status = axiosError.response.status;
      const message = axiosError.response.data?.message;
      return message ?? `Request failed with status code ${status}`;
    }

    if (axiosError.request) {
      return "No response from server.";
    }

    return axiosError.message;
  }

  if (error instanceof Error) return error.message;

  return "An unexpected error occurred";
};
