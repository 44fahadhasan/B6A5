"use client";

import QueryResetButton from "@/components/shared/query-filters/query-reset-button";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function MyRequestResponsesEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No Contributions Yet</EmptyTitle>
        <EmptyDescription>
          You haven’t responded to any help requests yet. Start making an impact
          today!
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="flex-row justify-center gap-2">
        <Button size="sm" asChild variant="destructive">
          <Link href="/requests">Help Someone Now</Link>
        </Button>

        <QueryResetButton className="ml-0">Reset Filters</QueryResetButton>
      </EmptyContent>
    </Empty>
  );
}
