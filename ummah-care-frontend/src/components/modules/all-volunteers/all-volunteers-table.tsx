"use client";

import { getAllVolunteers } from "@/actions/user.action";
import { statuses } from "@/components/modules/all-users/all-users-table-data";
import UserTable from "@/components/shared/user-list/user-table";
import { QUERY_KEY } from "@/constants/query.const";

type AllVolunteersTableProps = {
  queryString: string;
};

export default function AllVolunteersTable({
  queryString,
}: AllVolunteersTableProps) {
  return (
    <UserTable
      queryString={queryString}
      config={{
        queryKey: QUERY_KEY.USER.ALL_VOLUNTEERS,
        queryFn: getAllVolunteers,
        toolbarConfig: {
          placeholder: "Filter volunteers...",
          statuses,
        },
        tableConfig: {
          showRequests: true,
          showDonations: true,
          showResponses: true,
          showAssignments: true,
        },
      }}
    />
  );
}
