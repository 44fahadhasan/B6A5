import OrganizationResponses from "@/components/modules/organization-responses";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

export default async function OrganizationResponsesPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <OrganizationResponses queryString={queryString} />;
}
