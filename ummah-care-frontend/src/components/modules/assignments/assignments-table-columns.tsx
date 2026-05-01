"use client";

import { deleteAssignment } from "@/actions/assignment.action";
import { DataTableRowDeleteAction } from "@/components/shared/table/data-table-row-delete-action";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ASSIGNMENT_STATUS } from "@/constants/assignment.const";
import { QUERY_KEY } from "@/constants/query.const";
import { IAssignmentResponse } from "@/types/assignment.type";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import { AssignmentCancelAction } from "./assignment-cancel-action";
import AssignmentDetails from "./assignment-details";
import AssignmentForm from "./assignment-form";
import { statuses } from "./assignments-table-data";

export const myAssignmentTableColumns: ColumnDef<IAssignmentResponse>[] = [
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
    accessorKey: "request",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request" />
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <span>{row.original.request.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "volunteer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volunteer" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {" "}
          {row.original.volunteer?.name ?? "N/A"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.volunteer?.email ?? "-"}
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
        <div className="flex items-center gap-2">
          {status.icon && (
            <status.icon className="size-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "targetType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("targetType")}</Badge>
    ),
  },
  {
    accessorKey: "assignedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned" />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue("assignedAt")), "dd MMM yyyy")}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          (rowData) => {
            const status = row.getValue("status");
            if (status !== "COMPLETED" && status !== "CANCELLED") {
              return (
                <DataTableModal
                  mode="edit"
                  title={`Edit: ${rowData.request.title}`}
                  description="Update assignment status and notes."
                >
                  <AssignmentForm data={rowData} />
                </DataTableModal>
              );
            }
            return null;
          },
          (rowData) => (
            <DataTableModal
              mode="view"
              title={`Details: ${rowData.request.title}`}
              description="Review assignment details."
            >
              <AssignmentDetails data={rowData} />
            </DataTableModal>
          ),
          (rowData) => {
            const status = row.getValue("status");
            if (
              status !== ASSIGNMENT_STATUS.COMPLETED &&
              status !== ASSIGNMENT_STATUS.CANCELLED &&
              status !== ASSIGNMENT_STATUS.IN_PROGRESS
            ) {
              return (
                <AssignmentCancelAction
                  id={rowData.id}
                  label={rowData.request.title}
                />
              );
            }

            return null;
          },
          (rowData) => (
            <DataTableRowDeleteAction
              label={rowData.request.title}
              id={rowData.id}
              queryKey={QUERY_KEY.ASSIGNMENT.ASSIGNMENTS}
              deleteFun={deleteAssignment}
            />
          ),
        ]}
      />
    ),
  },
];
