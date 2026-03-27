import { cn } from "@/lib/utils";

/**
 * Small heading for grouped UI sections.
 * Commonly used in cards, widgets, or smaller layout blocks.
 */
export function TypographyH4({
  children,
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
