"use client";

import { verifyEmailUser } from "@/actions/auth-actions";
import { AppForm } from "@/components/shared/form/app-form";
import AppInputField from "@/components/shared/form/app-input-field ";
import { FieldGroup } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import {
  IVerifyEmailPayload,
  verifyEmailSchema,
} from "./verify-email.form.schema";

export default function VerifyEmailForm() {
  const router = useRouter();

  return (
    <AppForm<IVerifyEmailPayload>
      defaultValues={{ email: "", otp: "" }}
      schema={verifyEmailSchema}
      mutationFn={verifyEmailUser}
      submitButtonText="Verify Email"
      loadingMessage="Verifying email..."
      successMessage="Email verified successfully!"
      errorMessage="Email verification failed"
      className="space-y-5 pt-8"
      onSuccess={() => router.push("/sign-in")}
    >
      {(form) => (
        <FieldGroup>
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

          <form.Field name="otp">
            {(field) => (
              <AppInputField
                field={field}
                label="Verification Code"
                placeholder="Enter the 5-digit OTP"
                aria-label="Verification code"
              />
            )}
          </form.Field>
        </FieldGroup>
      )}
    </AppForm>
  );
}
