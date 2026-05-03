import { getMyOrganizationDonations } from "@/actions/donate.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import OrganizationDonationsTable from "./organization-donations-table";

export default async function OrganizationDonations({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DONATION.ORGANIZATION_DONATIONS, queryString],
    () => getMyOrganizationDonations(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Organization Donations 💰</TypographyH3>
        <TypographyMuted className="text-base">
          View all donations made to your organization&apos;s campaigns.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <OrganizationDonationsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
