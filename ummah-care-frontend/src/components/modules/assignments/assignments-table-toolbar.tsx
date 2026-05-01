"use client";

import { statuses } from "@/components/modules/assignments/assignments-table-data";
import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableModal } from "@/components/shared/table/data-table-modal";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AssignmentForm from "./assignment-form";

interface AssignmentsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AssignmentsTableToolbar<TData>({
  table,
}: AssignmentsTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search);
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    new Set(searchParams.getAll("status")),
  );
  const [selectedTargetTypes, setSelectedTargetTypes] = useState<Set<string>>(
    new Set(searchParams.getAll("targetType")),
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    params.delete("targetType");

    selectedStatuses.forEach((status) => params.append("status", status));
    selectedTargetTypes.forEach((targetType) =>
      params.append("targetType", targetType),
    );

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [
    debouncedSearch,
    selectedStatuses,
    selectedTargetTypes,
    router,
    searchParams,
  ]);

  const isFiltered =
    selectedStatuses.size > 0 ||
    selectedTargetTypes.size > 0 ||
    search.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search assignments..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            selectedValues={selectedStatuses}
            onSelectionChange={setSelectedStatuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("");
              setSelectedStatuses(new Set());
              setSelectedTargetTypes(new Set());
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />{" "}
        <DataTableModal
          mode="create"
          title="Create Assignment"
          description="Create a new assignment for a request."
        >
          <AssignmentForm />
        </DataTableModal>
      </div>
    </div>
  );
}
