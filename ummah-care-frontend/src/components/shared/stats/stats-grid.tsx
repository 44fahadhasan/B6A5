import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function StatsGrid({ children, className }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
