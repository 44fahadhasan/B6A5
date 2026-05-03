import { getMyAssignments } from "@/actions/assignment.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import TasksTable from "./tasks-table";

type TasksProps = {
  queryString: string;
};

export default async function Tasks({ queryString }: TasksProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.ASSIGNMENT.MY_ASSIGNMENTS, queryString],
    () => getMyAssignments(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>My Tasks 📋</TypographyH3>
        <TypographyMuted className="text-base">
          View and manage your assigned tasks and volunteer activities.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <TasksTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
