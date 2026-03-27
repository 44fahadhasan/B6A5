import { cn } from "@/lib/utils";

/**
 * Primary page heading.
 * Use as the main title of a page.
 * Typically appears once per page for SEO and accessibility.
 */
export function TypographyH1({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
