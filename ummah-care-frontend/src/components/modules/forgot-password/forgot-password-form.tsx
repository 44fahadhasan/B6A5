"use client";

import { sendPasswordResetEmail } from "@/actions/auth-actions";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSubmitButton from "@/components/shared/form/app-submit-button";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  forgotPasswordSchema,
  IForgotPasswordPayload,
} from "./forgot-password.form.schema";

export default function ForgotPasswordForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: IForgotPasswordPayload) =>
      await sendPasswordResetEmail(payload),
  });

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: forgotPasswordSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sending reset OTP ...");

      try {
        const res = await mutateAsync(value);

        if (!res.success) {
          toast.error(res.message ?? "Failed to send reset OTP", {
            id: toastId,
            style: { whiteSpace: "pre-line" },
          });
          return;
        }

        toast.success(res.message ?? "Reset OTP sent!", { id: toastId });
      } catch (error) {
        toast.error((error as Error).message ?? "Something went wrong", {
          id: toastId,
        });
      } finally {
        form.reset();
      }
    },
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
      className="space-y-5 pt-8"
    >
      <form.Field name="email">
        {(field) => (
          <AppInputField
            field={field}
            label="Email"
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
          />
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            disabled={!canSubmit}
            pendingLabel="Sending..."
            isPending={isPending || isSubmitting}
          >
            Send Reset OTP
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
