"use client";

import { getRequests } from "@/actions/request.action";
import { DataList } from "@/components/shared/data-list";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { RequestCard } from "./request-card";
import { RequestsEmptyState } from "./requests-empty-state";
import { RequestsLoadingSkeleton } from "./requests-loading-skeleton";

export function RequestsList({ queryString }: { queryString: string }) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.REQUEST.REQUEST, queryString],
    queryFn: () => getRequests(queryString),
  });

  return (
    <DataList
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      loadingState={<RequestsLoadingSkeleton />}
      emptyState={<RequestsEmptyState />}
      renderItem={(request) => (
        <RequestCard key={request.id} request={request} />
      )}
    />
  );
}
