"use client";

import { signUpUser } from "@/actions/auth-actions";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSubmitButton from "@/components/shared/form/app-submit-button";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ISignUpPayload, signUpSchema } from "./sign-up.form.schema";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: ISignUpPayload) => await signUpUser(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sign up...");

      try {
        const { success, message } = await mutateAsync(value);

        if (!success) {
          toast.error(message ?? "Sign up failed", {
            id: toastId,
            style: {
              whiteSpace: "pre-line",
            },
          });
          return;
        }

        form.reset();
        toast.success(message ?? "Sign up Successful!", { id: toastId });
      } catch (error) {
        toast.error((error as Error).message ?? "Something went wrong", {
          id: toastId,
        });
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
      <FieldGroup>
        <form.Field name="name">
          {(field) => (
            <AppInputField
              field={field}
              label="Full Name"
              aria-label="Full name"
              placeholder="Enter your full name"
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <AppInputField
              field={field}
              label="Email"
              type="email"
              aria-label="Email address"
              placeholder="Enter your email address"
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <AppInputField
              field={field}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              aria-label={showPassword ? "Hide password" : "Show password"}
              append={
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </Button>
              }
            />
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            disabled={!canSubmit}
            pendingLabel="Please wait...."
            isPending={isPending || isSubmitting}
          >
            Sign up
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
