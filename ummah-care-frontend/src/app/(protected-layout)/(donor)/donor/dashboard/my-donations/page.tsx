import MyDonations from "@/components/modules/my-donations";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

export default async function MyDonationsPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <MyDonations queryString={queryString} />;
}
