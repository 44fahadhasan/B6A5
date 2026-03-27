import { cn } from "@/lib/utils";

/**
 * Inline code element.
 * Used inside text to display code snippets or commands.
 */
export function TypographyInlineCode({
  children,
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
