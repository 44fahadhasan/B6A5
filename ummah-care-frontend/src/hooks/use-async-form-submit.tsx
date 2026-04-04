"use client";

import { IApiErrorResponse, IApiResponse } from "@/types";
import { toast } from "sonner";

type AsyncFn<TFormData, TResponse> = (
  value: TFormData,
) => Promise<IApiResponse<TResponse> | IApiErrorResponse>;

type UseAsyncFormSubmitProps<TFormData, TResponse> = {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  mutateAsync: AsyncFn<TFormData, TResponse>;
  onSuccess?: (response: IApiResponse<TResponse>) => void;
  onError?: (error: IApiErrorResponse) => void;
};

export function useAsyncFormSubmit<TFormData, TResponse>({
  mutateAsync,
  onSuccess,
  onError,
  loadingMessage,
  successMessage,
  errorMessage,
}: UseAsyncFormSubmitProps<TFormData, TResponse>) {
  return async (
    value: TFormData,
  ): Promise<IApiResponse<TResponse> | IApiErrorResponse | null> => {
    const toastId = toast.loading(loadingMessage ?? "Processing...");

    try {
      const response = await mutateAsync(value);

      if (onError && !response.success) {
        onError(response as IApiErrorResponse);
      }

      if (!response.success) {
        toast.error(response.message ?? errorMessage ?? "Failed", {
          id: toastId,
          style: { whiteSpace: "pre-line" },
        });
        return response;
      }

      toast.success(response.message ?? successMessage ?? "Success!", {
        id: toastId,
      });

      if (onSuccess && response.success) {
        onSuccess(response as IApiResponse<TResponse>);
      }

      return response as IApiResponse<TResponse>;
    } catch (err) {
      const errMsg =
        (err as Error).message ?? errorMessage ?? "Something went wrong";

      toast.error(errMsg, { id: toastId });

      if (onError) {
        onError({
          data: null,
          message: errMsg,
          success: false,
        });
      }

      return null;
    }
  };
}
