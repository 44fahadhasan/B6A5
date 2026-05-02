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

export function OrganizationResponsesEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No Organization Responses</EmptyTitle>
        <EmptyDescription>
          Your organization hasn’t submitted any responses yet. Encourage your
          team to support requests and check back soon.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="flex-row justify-center gap-2">
        <Button size="sm" asChild variant="destructive">
          <Link href="/requests">Browse Open Requests</Link>
        </Button>

        <QueryResetButton className="ml-0">Reset Filters</QueryResetButton>
      </EmptyContent>
    </Empty>
  );
}
