"use client";

import { getAllDonors } from "@/actions/user.action";
import { statuses } from "@/components/modules/all-users/all-users-table-data";
import UserTable from "@/components/shared/user-list/user-table";
import { QUERY_KEY } from "@/constants/query.const";

type AllDonorsTableProps = {
  queryString: string;
};

export default function AllDonorsTable({ queryString }: AllDonorsTableProps) {
  return (
    <UserTable
      queryString={queryString}
      config={{
        queryKey: QUERY_KEY.USER.ALL_DONORS,
        queryFn: getAllDonors,
        toolbarConfig: {
          placeholder: "Filter donors...",
          statuses,
        },
        tableConfig: {
          showRequests: true,
          showDonations: true,
          showResponses: false,
          showAssignments: false,
        },
      }}
    />
  );
}
