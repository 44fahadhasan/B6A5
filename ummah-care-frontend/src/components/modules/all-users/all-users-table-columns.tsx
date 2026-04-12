"use client";

import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { IAllUsersResponse } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import AllUserDetails from "./all-user-details";
import { roles, statuses } from "./all-users-table-data";

export const allUsersTableColumns: ColumnDef<IAllUsersResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role"));
      if (!role) return null;

      return (
        <div className="flex w-25 items-center gap-2">
          {role.icon && <role.icon className="size-4 text-muted-foreground" />}
          <span>{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );
      if (!status) return null;

      return (
        <div className="flex w-25 items-center gap-2">
          {status.icon && (
            <status.icon className="size-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "userTypes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Types" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.userTypes.map((userType) => (
          <Badge key={userType.id} variant="secondary" className="text-xs">
            {userType.type}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "requests",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requests" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original._count.createdRequests}</span>
    ),
  },
  {
    accessorKey: "donations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Donations" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original._count.donations}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          (rowData) => (
            <DataTableModal
              mode="view"
              title={`View: ${row.getValue("name")}`}
              description="Here are the full details of this user."
            >
              <AllUserDetails data={rowData} />
            </DataTableModal>
          ),
        ]}
      />
    ),
  },
];
