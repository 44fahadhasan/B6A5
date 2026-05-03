import OrganizationDonations from "@/components/modules/organization-donations";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

export default async function OrganizationDonationsPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <OrganizationDonations queryString={queryString} />;
}
