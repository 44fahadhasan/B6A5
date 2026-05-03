"use client";

import { getAllAssignment } from "@/actions/assignment.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { allTasksTableColumns } from "./all-tasks-table-columns";
import { AllTasksTableToolbar } from "./all-tasks-table-toolbar";

type AllTasksTableProps = {
  queryString: string;
};

export default function AllTasksTable({ queryString }: AllTasksTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.ASSIGNMENT.ALL_ASSIGNMENTS, queryString],
    queryFn: () => getAllAssignment(queryString),
  });

  const tasks = data?.data ?? [];

  const table = useDataTable({
    data: tasks,
    columns: allTasksTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <AllTasksTableToolbar table={table} />
      <DataTable data={data} table={table} columns={allTasksTableColumns} />
    </div>
  );
}
