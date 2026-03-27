import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TAppSubmitButton = React.ComponentProps<"button"> & {
  className?: string;
  children: ReactNode;
  isPending?: boolean;
  pendingLabel?: string;
};

export default function AppSubmitButton({
  children,
  className,
  isPending = false,
  disabled = false,
  pendingLabel = "Submitting...",
  ...props
}: TAppSubmitButton) {
  return (
    <Button
      {...props}
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
