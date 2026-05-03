"use client";

import { IAssignmentResponse } from "@/types/assignment.type";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import { Button } from "../../ui/button";
import TaskDetails from "../tasks/task-details";
import { statuses } from "./all-tasks-table-data";

export const allTasksTableColumns: ColumnDef<IAssignmentResponse>[] = [
  {
    accessorKey: "request",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request" />
    ),
    cell: ({ row }) => {
      const request = row.original.request;
      return (
        <div className="font-medium">
          <div className="font-semibold">{request.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "volunteer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volunteer" />
    ),
    cell: ({ row }) => {
      const volunteer = row.original.volunteer;
      return (
        <div className="font-medium">
          {volunteer ? (
            <div>
              <div className="font-semibold">{volunteer.name}</div>
              <div className="text-sm text-muted-foreground">
                {volunteer.email}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">N/A</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "Assigned By",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned By" />
    ),
    cell: ({ row }) => {
      const assignedByUser = row.original.assignedByUser;
      return (
        <div className="font-medium">
          <div className="font-semibold">{assignedByUser.name}</div>
          <div className="text-sm text-muted-foreground">
            {assignedByUser.email}
          </div>
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
      const status = statuses.find((s) => s.value === row.original.status);
      if (!status) return null;

      const Icon = status.icon;
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="capitalize">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Assigned Date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.assignedAt;
      return (
        <div className="text-sm text-muted-foreground">
          {format(new Date(date), "MMM dd, yyyy")}
        </div>
      );
    },
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
              title="Task Details"
              description="View detailed information about this task"
            >
              <TaskDetails assignment={rowData} />
            </DataTableModal>
          ),
          (rowData) => (
            <Button className="w-full" variant="ghost" size="sm" asChild>
              <Link
                href={`/requests/${rowData.request.id}`}
                className="flex justify-between gap-2"
              >
                View Request
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          ),
        ]}
      />
    ),
  },
];
