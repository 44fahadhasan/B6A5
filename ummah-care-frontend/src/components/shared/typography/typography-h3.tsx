import { cn } from "@/lib/utils";

/**
 * Sub-section heading.
 * Used within sections created by H2.
 */
export function TypographyH3({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
