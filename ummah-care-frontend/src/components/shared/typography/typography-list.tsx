import { cn } from "@/lib/utils";

/**
 * Standard unordered list.
 * Used for feature lists, instructions, or grouped items.
 */
export function TypographyList({
  children,
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}
