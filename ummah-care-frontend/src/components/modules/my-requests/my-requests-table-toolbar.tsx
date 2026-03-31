"use client";

import {
  statuses,
  urgencies,
} from "@/components/modules/my-requests/my-requests-table-data";
import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableModal } from "@/components/shared/table/data-table-modal";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import MyRequestForm from "./my-request-form";

interface MyRequestsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function MyRequestsTableToolbar<TData>({
  table,
}: MyRequestsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter requests..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-37.5 lg:w-62.5"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("urgency") && (
          <DataTableFacetedFilter
            column={table.getColumn("urgency")}
            title="Urgency"
            options={urgencies}
          />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()}>
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <DataTableModal
          mode="create"
          title="Add New Request"
          description="Fill in the details below to submit a new request."
        >
          <MyRequestForm />
        </DataTableModal>
      </div>
    </div>
  );
}
