import { getAssignments } from "@/actions/assignment.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AssignmentsTable from "./assignments-table";

type AssignmentsProps = {
  queryString: string;
};

export default async function Assignments({ queryString }: AssignmentsProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.ASSIGNMENT.ASSIGNMENTS, queryString],
    () => getAssignments(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Assignments 🧩</TypographyH3>
        <TypographyMuted className="text-base">
          Manage and review assignment status, volunteers, and request details.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AssignmentsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
