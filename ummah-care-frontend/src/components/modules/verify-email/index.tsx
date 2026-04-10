import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import VerifyEmailForm from "./verify-email-form";

export default function VerifyEmail() {
  return (
    <div className="space-y-6 w-full max-w-sm mx-auto border-x border-dashed *:px-6">
      <div className="space-y-1">
        <TypographyH4>Verify your email</TypographyH4>
        <TypographyP className="text-muted-foreground not-first:mt-0">
          Enter the OTP sent to your inbox to complete account verification.
        </TypographyP>
      </div>
      <div>
        <FullWidthDivider contained />
        <VerifyEmailForm />
        <TypographyMuted className="text-center pt-4 pb-8">
          Already verified?{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/sign-in"
          >
            Sign in
          </Link>
        </TypographyMuted>
        <FullWidthDivider contained />
      </div>
      <TypographyMuted className="text-center">
        By clicking continue, you agree to our
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="/terms-of-service"
        >
          Terms of Service{" "}
        </Link>
        apply.
      </TypographyMuted>
    </div>
  );
}
