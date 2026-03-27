import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="space-y-6 w-full max-w-sm mx-auto border-x border-dashed *:px-6">
      <div className="space-y-1">
        <TypographyH4>Reset your password</TypographyH4>
        <TypographyP className="text-muted-foreground not-first:mt-0">
          Enter your email to receive a password reset otp.
        </TypographyP>
      </div>
      <div>
        <FullWidthDivider contained />
        <ForgotPasswordForm />
        <TypographyMuted className="text-center pt-4 pb-8">
          Remember your password?{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/sign-in"
          >
            Sign in
          </Link>
        </TypographyMuted>
        <FullWidthDivider contained />
      </div>
    </div>
  );
}
