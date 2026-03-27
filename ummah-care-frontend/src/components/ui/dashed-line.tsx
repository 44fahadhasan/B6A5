import { cn } from "@/lib/utils";

export default function DashedLine({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "absolute -inset-y-10 border-l border-dashed",
        "-translate-x-2.5 md:-translate-x-4",
        className,
      )}
      {...props}
    />
  );
}
