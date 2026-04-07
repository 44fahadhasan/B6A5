"use client";

import { getMyResponses } from "@/actions/response.actions";
import { DataList } from "@/components/shared/data-list";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import MyResponseCard from "./my-responses-card";
import { MyRequestResponsesEmptyState } from "./my-responses-empty-state";
import { MyRequestResponsesLoadingSkeleton } from "./my-responses-loading-skeleton";

type MyResponsesListProps = {
  queryString: string;
};

export function MyResponsesList({ queryString }: MyResponsesListProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.RESPONSE.MY_RESPONSES, queryString],
    queryFn: () => getMyResponses(queryString),
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
        <MyResponseCard key={response.id} response={response} />
      )}
    />
  );
}
