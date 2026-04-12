"use client";

import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { IAllRequestResponse } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import AllRequestDetails from "./all-request-details";
import { categories, statuses, urgencies } from "./all-requests-table-data";

export const allRequestsTableColumns: ColumnDef<IAllRequestResponse>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.original.category,
      );

      return (
        <div className="flex gap-2">
          {category && <Badge variant="outline">{category.label}</Badge>}
          <span className="max-w-125 truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.creator.name}</span>
        <span className="text-sm text-muted-foreground">
          {row.original.creator.email}
        </span>
      </div>
    ),
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
    accessorKey: "urgency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Urgency" />
    ),
    cell: ({ row }) => {
      const urgency = urgencies.find(
        (urgency) => urgency.value === row.getValue("urgency"),
      );
      if (!urgency) return null;

      return (
        <div className="flex items-center gap-2">
          {urgency.icon && (
            <urgency.icon className="size-4 text-muted-foreground" />
          )}
          <span>{urgency.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "_count.responses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responses" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original._count.responses}</span>
    ),
  },
  {
    accessorKey: "_count.donations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Donations" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original._count.donations}</span>
    ),
  },
  {
    accessorKey: "_count.assignments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignments" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original._count.assignments}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
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
              title={`View: ${row.getValue("title")}`}
              description="Here are the full details of this request."
            >
              <AllRequestDetails data={rowData} />
            </DataTableModal>
          ),
        ]}
      />
    ),
  },
];
