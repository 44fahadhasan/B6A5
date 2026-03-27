import { cn } from "@/lib/utils";

/**
 * Small supporting text.
 * Used for metadata, timestamps, or helper messages.
 */
export function TypographySmall({
  children,
  className,
  ...props
}: React.ComponentProps<"small">) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
    </small>
  );
}
