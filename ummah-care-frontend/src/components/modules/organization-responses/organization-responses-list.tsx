"use client";

import { getOrganizationResponses } from "@/actions/response.actions";
import { DataList } from "@/components/shared/data-list";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { IOrganizationResponse } from "@/types";
import OrganizationResponseCard from "./organization-responses-card";
import { OrganizationResponsesEmptyState } from "./organization-responses-empty-state";
import { OrganizationResponsesLoadingSkeleton } from "./organization-responses-loading-skeleton";

type OrganizationResponsesListProps = {
  queryString: string;
};

export function OrganizationResponsesList({
  queryString,
}: OrganizationResponsesListProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.RESPONSE.ORGANIZATION_RESPONSES, queryString],
    queryFn: () => getOrganizationResponses(queryString),
  });

  return (
    <DataList
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      loadingState={<OrganizationResponsesLoadingSkeleton />}
      emptyState={<OrganizationResponsesEmptyState />}
      className="grid-cols-none!"
      renderItem={(response: IOrganizationResponse) => (
        <OrganizationResponseCard key={response.id} response={response} />
      )}
    />
  );
}
