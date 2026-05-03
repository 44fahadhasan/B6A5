"use client";

import { getMyAssignments } from "@/actions/assignment.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { tasksTableColumns } from "./tasks-table-columns";
import { TasksTableToolbar } from "./tasks-table-toolbar";

type TasksTableProps = {
  queryString: string;
};

export default function TasksTable({ queryString }: TasksTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.ASSIGNMENT.MY_ASSIGNMENTS, queryString],
    queryFn: () => getMyAssignments(queryString),
  });

  const tasks = data?.data ?? [];

  const table = useDataTable({
    data: tasks,
    columns: tasksTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <TasksTableToolbar table={table} />
      <DataTable data={data} table={table} columns={tasksTableColumns} />
    </div>
  );
}
