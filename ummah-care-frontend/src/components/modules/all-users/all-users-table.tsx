"use client";

import { getAllUsers } from "@/actions/user.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { allUsersTableColumns } from "./all-users-table-columns";
import { AllUsersTableToolbar } from "./all-users-table-toolbar";

type AllUsersTableProps = {
  queryString: string;
};

export default function AllUsersTable({ queryString }: AllUsersTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.USER.ALL_USERS, queryString],
    queryFn: () => getAllUsers(queryString),
  });

  const users = data?.data ?? [];

  const table = useDataTable({
    data: users,
    columns: allUsersTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <AllUsersTableToolbar table={table} />
      <DataTable data={data} table={table} columns={allUsersTableColumns} />
    </div>
  );
}
