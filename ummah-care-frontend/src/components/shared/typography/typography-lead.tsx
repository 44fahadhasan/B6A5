import { cn } from "@/lib/utils";

/**
 * Introductory paragraph.
 * Typically placed below the main page heading.
 */
export function TypographyLead({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
