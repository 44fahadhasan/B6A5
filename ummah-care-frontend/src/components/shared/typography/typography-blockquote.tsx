import { cn } from "@/lib/utils";

/**
 * Blockquote element.
 * Used for quoted content in blogs, articles, or documentation.
 */
export function TypographyBlockquote({
  children,
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
