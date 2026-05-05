import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { DEMO_CREDENTIALS } from "./demo-ts";
import { ISignInPayload } from "./sign-in.form.schema";

type DemoSignProps = {
  isPending: boolean;
  handleSignIn: (payload: ISignInPayload) => void;
};

export default function DemoSign({ isPending, handleSignIn }: DemoSignProps) {
  return (
    <div className="space-y-3 rounded-xl border-dashed border bg-muted/5 p-4 text-sm">
      <TypographySmall className="text-xs uppercase tracking-wider text-muted-foreground">
        Demo accounts
      </TypographySmall>
      <TypographyMuted>
        Quick sign in with a demo user or admin account.
      </TypographyMuted>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          size="xs"
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => handleSignIn(DEMO_CREDENTIALS.user)}
        >
          Demo User
        </Button>
        <Button
          size="xs"
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => handleSignIn(DEMO_CREDENTIALS.admin)}
        >
          Demo Admin
        </Button>
      </div>
    </div>
  );
}
