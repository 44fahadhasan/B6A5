"use client";

import { deleteMyRequest } from "@/actions/request.action";
import { DataTableRowDeleteAction } from "@/components/shared/table/data-table-row-delete-action";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { QUERY_KEY } from "@/constants/query.const";
import { REQUEST_STATUS } from "@/constants/request.const";
import { IRequestResponse } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import { MyRequestCancelAction } from "./my-request-cancel-action";
import MyRequestDetails from "./my-request-details";
import MyRequestForm from "./my-request-form";
import { categories, statuses, urgencies } from "./my-requests-table-data";

export const requestTableColumns: ColumnDef<IRequestResponse>[] = [
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
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          (rowData) => {
            const status = row.getValue("status");

            if (
              status !== REQUEST_STATUS.CANCELLED &&
              status !== REQUEST_STATUS.COMPLETED
            ) {
              return (
                <DataTableModal
                  mode="edit"
                  title={`Edit: ${rowData.title}`}
                  description="Update the request details below."
                >
                  <MyRequestForm data={rowData} />
                </DataTableModal>
              );
            }

            return null;
          },

          (rowData) => (
            <DataTableModal
              mode="view"
              title={`View : ${row.getValue("title")}`}
              description="Here are the full details of this request."
            >
              <MyRequestDetails data={rowData} />
            </DataTableModal>
          ),

          (rowData) =>
            row.getValue("status") !== REQUEST_STATUS.CANCELLED && (
              <MyRequestCancelAction
                id={rowData.id}
                label={row.getValue("title")}
              />
            ),

          (rowData) => (
            <DataTableRowDeleteAction
              label={row.getValue("title")}
              id={rowData.id}
              queryKey={QUERY_KEY.REQUEST.MY_REQUEST}
              deleteFun={deleteMyRequest}
            />
          ),
        ]}
      />
    ),
  },
];
