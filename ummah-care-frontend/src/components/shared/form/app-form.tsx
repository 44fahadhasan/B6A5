"use client";

import AppSubmitButton from "@/components/shared/form/app-submit-button";
import { useAsyncFormSubmit } from "@/hooks/use-async-form-submit";
import { cn } from "@/lib/utils";
import { IApiErrorResponse, IApiResponse } from "@/types";
import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import z from "zod";

type AppFormApi<TFormData> = ReactFormExtendedApi<
  TFormData,
  FormValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  unknown
>;

type AsyncFn<TFormData, TResponse> = (
  value: TFormData,
) => Promise<IApiResponse<TResponse> | IApiErrorResponse>;

type AppFormProps<TFormData, TResponse> = Omit<
  React.ComponentProps<"form">,
  "children"
> & {
  defaultValues: TFormData;
  schema: z.ZodType<TFormData>;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  submitButtonText: string;
  mutationFn: AsyncFn<TFormData, TResponse>;
  onSuccess?: (response: IApiResponse<TResponse>) => void;
  children: (form: AppFormApi<TFormData>) => ReactNode;
};

export function AppForm<TFormData, TResponse = unknown>({
  className,
  defaultValues,
  schema,
  mutationFn,
  submitButtonText,
  loadingMessage,
  successMessage,
  errorMessage,
  onSuccess,
  children,
  ...props
}: AppFormProps<TFormData, TResponse>) {
  const { mutateAsync, isPending } = useMutation({ mutationFn });

  const handleSubmit = useAsyncFormSubmit<TFormData, TResponse>({
    mutateAsync,
    loadingMessage,
    successMessage,
    errorMessage,
    onSuccess: (response) => {
      form.reset();
      onSuccess?.(response);
    },
  });

  const form = useForm<
    TFormData,
    FormValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    unknown
  >({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const result = schema.safeParse(value);
        if (result.success) return undefined;

        const error: {
          form?: string;
          fields: Record<string, Array<{ message: string }>>;
        } = {
          form: "Validation failed",
          fields: {},
        };

        for (const issue of result.error.issues) {
          const key = issue.path.join(".") || "";
          if (!key) continue;

          // create array if it doesn't exist
          if (!error.fields[key]) error.fields[key] = [];

          // push multiple messages per field
          error.fields[key].push({ message: issue.message });
        }

        return error;
      },
    },
    onSubmit: async ({ value }) => handleSubmit(value),
  });

  return (
    <form
      noValidate
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn("space-y-5 px-1", className)}
      {...props}
    >
      {children(form)}
      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            disabled={!canSubmit}
            isPending={isPending || isSubmitting}
          >
            {submitButtonText ?? "Submit"}
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
