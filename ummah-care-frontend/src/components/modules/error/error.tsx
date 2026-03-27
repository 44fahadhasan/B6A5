import { TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { RefreshCcwIcon, WrenchIcon } from "lucide-react";

export default function Error({
  message,
  reset,
}: {
  message: string;
  reset: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen items-center border-x">
        <div>
          <FullWidthDivider />
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-black font-mono text-6xl flex items-center gap-2 justify-center">
                <WrenchIcon className="size-10" />
                Error
              </EmptyTitle>
              <EmptyDescription className="text-center">
                Something went wrong on our side. <br />
                Please try again or return to the homepage.
              </EmptyDescription>
              <TypographyMuted className="mt-2">
                Error Message: {message}
              </TypographyMuted>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => reset()}>
                <RefreshCcwIcon data-icon="inline-start" />
                Try Again
              </Button>
            </EmptyContent>
          </Empty>
          <FullWidthDivider />
        </div>
      </div>
    </div>
  );
}
