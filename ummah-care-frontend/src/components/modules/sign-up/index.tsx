import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import SignUpForm from "./sign-up-form";

export default function SignUp() {
  return (
    <div className="space-y-6 w-full max-w-sm mx-auto border-x border-dashed *:px-6">
      <div className="space-y-1">
        <TypographyH4>Join Now!</TypographyH4>
        <TypographyP className="text-muted-foreground not-first:mt-0">
          Fill in the form below to create your account.
        </TypographyP>
      </div>
      <div>
        <FullWidthDivider contained />
        <SignUpForm />
        <TypographyMuted className="text-center pt-4 pb-8">
          Already have an account?{" "}
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
          Terms of Service
        </Link>{" "}
        apply.
      </TypographyMuted>
    </div>
  );
}
