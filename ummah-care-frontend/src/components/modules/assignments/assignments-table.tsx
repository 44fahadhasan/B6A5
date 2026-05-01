"use client";

import { getAssignments } from "@/actions/assignment.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { myAssignmentTableColumns } from "./assignments-table-columns";
import { AssignmentsTableToolbar } from "./assignments-table-toolbar";

type AssignmentsTableProps = {
  queryString: string;
};

export default function AssignmentsTable({
  queryString,
}: AssignmentsTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.ASSIGNMENT.ASSIGNMENTS, queryString],
    queryFn: () => getAssignments(queryString),
  });

  const assignments = data?.data ?? [];

  const table = useDataTable({
    data: assignments,
    columns: myAssignmentTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <AssignmentsTableToolbar table={table} />
      <DataTable data={data} table={table} columns={myAssignmentTableColumns} />
    </div>
  );
}
