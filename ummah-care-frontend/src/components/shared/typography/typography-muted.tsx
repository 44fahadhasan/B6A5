import { cn } from "@/lib/utils";

/**
 * Muted secondary text.
 * Used for supporting descriptions or informational UI text.
 */
export function TypographyMuted({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
