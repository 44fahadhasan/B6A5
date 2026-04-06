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
        <EmptyTitle>No Responses Yet</EmptyTitle>
        <EmptyDescription>
          This help request hasn’t received any responses yet.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="flex-row justify-center gap-2">
        <Button size="sm" asChild>
          <Link href="/dashboard/my-requests">Back to Request</Link>
        </Button>

        <QueryResetButton className="ml-0">Reset Filters</QueryResetButton>
      </EmptyContent>
    </Empty>
  );
}
