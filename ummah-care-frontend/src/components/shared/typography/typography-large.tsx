import { cn } from "@/lib/utils";

/**
 * Large emphasized text.
 * Used to highlight important information without creating a heading.
 */
export function TypographyLarge({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  );
}
