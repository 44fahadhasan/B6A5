"use client";

import { signInUser } from "@/actions/auth-actions";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSubmitButton from "@/components/shared/form/app-submit-button";
import { TypographySmall } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ISignInPayload, signInSchema } from "./sign-in.form.schema";

interface SignInFromProps {
  redirectPath?: string;
}

export default function SignInForm({ redirectPath }: SignInFromProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: ISignInPayload) =>
      await signInUser(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sign in...");

      try {
        const res = await mutateAsync(value);

        if (!res.success) {
          if (res.message?.includes("Email not verified")) {
            toast.error("Please verify your email first.", { id: toastId });
            router.push("/verify-email");
            return;
          }

          toast.error(res.message ?? "Sign in failed", {
            id: toastId,
            style: {
              whiteSpace: "pre-line",
            },
          });
          return;
        }

        toast.success(res.message ?? "Sign in Successful!", { id: toastId });

        if ("redirectTo" in res && res.redirectTo) {
          router.push(res.redirectTo);
        }
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
      <FieldGroup>
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

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <TypographySmall className="text-xs">
              <Link
                href="/forgot-password"
                className="font-normal underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </TypographySmall>
          </div>
          <form.Field name="password">
            {(field) => (
              <AppInputField
                field={field}
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
        </Field>
      </FieldGroup>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            disabled={!canSubmit}
            pendingLabel="Please wait...."
            isPending={isPending || isSubmitting}
          >
            Sign In
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
