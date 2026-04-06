import { Skeleton } from "@/components/ui/skeleton";

export function MyRequestResponsesLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-3 p-4 border rounded-xl bg-background">
          {/* Avatar */}
          <Skeleton className="h-11 w-11 rounded-full shrink-0" />

          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-48 rounded-md" />
              </div>
              <Skeleton className="h-3 w-16 rounded-md shrink-0" />
            </div>

            {/* Response Type */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-24 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
