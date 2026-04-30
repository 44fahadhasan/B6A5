import { getMyCampaigns } from "@/actions/campaign.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import MyCampaignTable from "./my-campaign-table";

export default async function MyCampaigns({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.CAMPAIGN.MY_CAMPAIGN, queryString],
    () => getMyCampaigns(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Campaigns 📢</TypographyH3>
        <TypographyMuted className="text-base">
          Manage and track all your fundraising campaigns in one place.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <MyCampaignTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
