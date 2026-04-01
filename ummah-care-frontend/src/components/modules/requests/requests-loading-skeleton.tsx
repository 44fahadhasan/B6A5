import { Skeleton } from "@/components/ui/skeleton";

export function RequestsLoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 border rounded-xl p-5 bg-background"
        >
          {/* Title Skeleton */}
          <Skeleton className="h-5 w-3/4 rounded-md" />

          {/* Description Skeleton */}
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />

          {/* Meta Badges Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>

          {/* Status & Expiry Skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          {/* Button Skeletons */}
          <div className="flex gap-2 mt-auto">
            <Skeleton className="h-7 w-full rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
