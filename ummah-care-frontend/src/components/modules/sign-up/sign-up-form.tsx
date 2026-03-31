"use client";

import { signUpUser } from "@/actions/auth-actions";
import { AppForm } from "@/components/shared/form/app-form";
import AppInputField from "@/components/shared/form/app-input-field ";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ISignUpPayload, signUpSchema } from "./sign-up.form.schema";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppForm<ISignUpPayload>
      defaultValues={{ name: "", email: "", password: "" }}
      schema={signUpSchema}
      mutationFn={signUpUser}
      submitButtonText="Sign Up"
      loadingMessage="Signing up..."
      successMessage="Sign up successful!"
      errorMessage="Sign up failed"
      className="space-y-5 pt-8"
    >
      {(form) => (
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
      )}
    </AppForm>
  );
}
