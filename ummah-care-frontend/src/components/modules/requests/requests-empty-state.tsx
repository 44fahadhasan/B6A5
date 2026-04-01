import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function RequestsEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No Requests Found</EmptyTitle>
        <EmptyDescription>
          There are no help requests matching your filters.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="flex-row justify-center gap-2">
        <Button size="sm" asChild>
          <Link href="/dashboard/my-requests">Post a Help Request</Link>
        </Button>

        <Button variant="outline" size="sm">
          Reset Filters
        </Button>
      </EmptyContent>
    </Empty>
  );
}
