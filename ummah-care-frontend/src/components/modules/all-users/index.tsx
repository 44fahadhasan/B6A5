import { getAllUsers } from "@/actions/user.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllUsersTable from "./all-users-table";

export default async function AllUsers({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.USER.ALL_USERS, queryString],
    () => getAllUsers(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Users</TypographyH3>
        <TypographyMuted className="text-base">
          View and manage all users across the platform.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllUsersTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
