import Campaigns from "@/components/modules/campaigns";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <Campaigns queryString={queryString} />;
}
