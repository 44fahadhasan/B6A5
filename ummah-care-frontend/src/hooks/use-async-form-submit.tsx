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
};

export function useAsyncFormSubmit<TFormData, TResponse>({
  mutateAsync,
  onSuccess,
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
      toast.error(
        (err as Error).message ?? errorMessage ?? "Something went wrong",
        { id: toastId },
      );
      return null;
    }
  };
}
