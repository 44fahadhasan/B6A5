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
import useTableToolbar from "@/hooks/use-table-toolbar";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import MyRequestForm from "./my-request-form";

interface MyRequestsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function MyRequestsTableToolbar<TData>({
  table,
}: MyRequestsTableToolbarProps<TData>) {
  const {
    search,
    setSearch,
    filterValues,
    setFilterValues,
    isFiltered,
    resetFilters,
  } = useTableToolbar({
    filterKeys: ["status", "urgency"],
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter requests..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            selectedValues={filterValues.status}
            onSelectionChange={(values) => setFilterValues("status", values)}
          />
        )}
        {table.getColumn("urgency") && (
          <DataTableFacetedFilter
            column={table.getColumn("urgency")}
            title="Urgency"
            options={urgencies}
            selectedValues={filterValues.urgency}
            onSelectionChange={(values) => setFilterValues("urgency", values)}
          />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={resetFilters}>
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
