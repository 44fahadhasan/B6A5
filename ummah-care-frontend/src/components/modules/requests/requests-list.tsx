"use client";

import { getRequests } from "@/actions/request.action";
import { TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { useQuery } from "@tanstack/react-query";
import { RequestCard } from "./request-card";
import { RequestsEmptyState } from "./requests-empty-state";
import { RequestsLoadingSkeleton } from "./requests-loading-skeleton";
import { RequestsPagination } from "./requests-pagination";

export function RequestsList({ queryString }: { queryString: string }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY.REQUEST.REQUEST, queryString],
    queryFn: () => getRequests(queryString),
  });

  if (isLoading) return <RequestsLoadingSkeleton />;

  if (!data?.success || isError)
    return (
      <TypographyMuted className="text-center text-destructive">
        {data?.message ?? error?.message}
      </TypographyMuted>
    );

  const requests = data?.data ?? [];

  if (!requests.length) return <RequestsEmptyState />;

  return (
    <div className="space-y-7">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>

      {data?.meta && <RequestsPagination meta={data.meta} />}
    </div>
  );
}
