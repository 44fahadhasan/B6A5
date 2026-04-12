"use client";

import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { IResponses } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import AllResponseDetails from "./all-response-details";
import { responseTypes, statuses, urgencies } from "./all-responses-table-data";

export const allResponsesTableColumns: ColumnDef<IResponses>[] = [
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
    accessorKey: "Responder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responder" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.user.name}</span>
        <span className="text-sm text-muted-foreground">
          {row.original.user.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <span className="max-w-125 truncate font-medium">
        {row.original.request.title}
      </span>
    ),
  },
  {
    accessorKey: "responseType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Response Type" />
    ),
    cell: ({ row }) => {
      const responseType = responseTypes.find(
        (type) => type.value === row.getValue("responseType"),
      );
      if (!responseType) return null;

      return (
        <div className="flex items-center gap-2">
          {responseType.icon && (
            <responseType.icon className="size-4 text-muted-foreground" />
          )}
          <span>{responseType.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "request.urgency",
    accessorFn: (row) => row.request.urgency,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Urgency" />
    ),
    cell: ({ row }) => {
      const urgency = urgencies.find(
        (urgency) => urgency.value === row.getValue("request.urgency"),
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
    id: "request.status",
    accessorFn: (row) => row.request.status,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("request.status"),
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
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.request.creator.name}</span>
        <span className="text-sm text-muted-foreground">
          {row.original.request.creator.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responded" />
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
              title={`View Response`}
              description="Here are the full details of this response."
            >
              <AllResponseDetails data={rowData} />
            </DataTableModal>
          ),
        ]}
      />
    ),
  },
];
