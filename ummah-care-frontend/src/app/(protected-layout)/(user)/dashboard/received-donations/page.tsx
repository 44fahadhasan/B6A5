import ReceivedDonations from "@/components/modules/received-donations";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

export default async function ReceivedDonationsPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <ReceivedDonations queryString={queryString} />;
}
