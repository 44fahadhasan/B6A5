import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TAppSubmitButton = {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  isPending?: boolean;
  pendingLabel?: string;
};

export default function AppSubmitButton({
  children,
  className,
  isPending = false,
  disabled = false,
  pendingLabel = "Submitting...",
}: TAppSubmitButton) {
  return (
    <Button
      size="sm"
      type="submit"
      aria-busy={isPending}
      disabled={disabled || isPending}
      className={cn("w-full flex items-center justify-center gap-2", className)}
    >
      {isPending ? (
        <>
          <Spinner data-icon="inline-start" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
