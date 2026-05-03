"use client";

import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { statuses } from "./tasks-table-data";

interface TasksTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TasksTableToolbar<TData>({
  table,
}: TasksTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search);
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    new Set(searchParams.getAll("status")),
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");

    selectedStatuses.forEach((status) => params.append("status", status));

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params}`, { scroll: false });
    }
  }, [selectedStatuses, debouncedSearch, router, searchParams]);

  const isFiltered = selectedStatuses.size > 0 || search.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter tasks..."
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
              setSelectedStatuses(new Set());
              setSearch("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
