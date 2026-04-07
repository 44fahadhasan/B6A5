"use client";

import { getResponses } from "@/actions/response.actions";
import { DataList } from "@/components/shared/data-list";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import MyRequestResponseCard from "./my-request-response-card";
import { MyRequestResponsesEmptyState } from "./my-request-response-empty-state";
import { MyRequestResponsesLoadingSkeleton } from "./my-request-response-loading-skeleton";

type MyRequestResponseListProps = {
  queryString: string;
};

export function MyRequestResponseList({
  queryString,
}: MyRequestResponseListProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.RESPONSE.MY_REQUEST_RESPONSES, queryString],
    queryFn: () => getResponses(queryString),
  });

  return (
    <DataList
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      loadingState={<MyRequestResponsesLoadingSkeleton />}
      emptyState={<MyRequestResponsesEmptyState />}
      className="grid-cols-none!"
      renderItem={(response) => (
        <MyRequestResponseCard key={response.id} response={response} />
      )}
    />
  );
}
