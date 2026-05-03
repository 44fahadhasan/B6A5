import { getAllAssignment } from "@/actions/assignment.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllTasksTable from "./all-tasks-table";

type AllTasksProps = {
  queryString: string;
};

export default async function AllTasks({ queryString }: AllTasksProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.ASSIGNMENT.ALL_ASSIGNMENTS, queryString],
    () => getAllAssignment(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Tasks 📋</TypographyH3>
        <TypographyMuted className="text-base">
          View and manage all assignments across the platform.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllTasksTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
