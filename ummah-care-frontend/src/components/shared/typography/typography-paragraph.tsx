import { cn } from "@/lib/utils";

/**
 * Default paragraph text.
 * Used for general body content.
 */
export function TypographyP({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("leading-7 not-first:mt-6", className)} {...props}>
      {children}
    </p>
  );
}
