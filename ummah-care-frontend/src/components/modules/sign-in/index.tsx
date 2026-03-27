import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import SignInForm from "./sign-in-form";

interface SignInParams {
  redirectPath?: string;
}

export default function SignIn({ redirectPath }: SignInParams) {
  return (
    <div className="space-y-6 w-full max-w-sm mx-auto border-x border-dashed *:px-6">
      <div className="space-y-1">
        <TypographyH4>Hey, welcome!</TypographyH4>
        <TypographyP className="text-muted-foreground not-first:mt-0">
          Enter your credentials to sign in.
        </TypographyP>
      </div>
      <div>
        <FullWidthDivider contained />
        <SignInForm redirectPath={redirectPath} />
        <TypographyMuted className="text-center pt-4 pb-8">
          Don&apos;t have an account?{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/sign-up"
          >
            Sign up
          </Link>
        </TypographyMuted>
        <FullWidthDivider contained />
      </div>
    </div>
  );
}
