"use client";

import {
  statuses,
  urgencies,
} from "@/components/modules/all-responses/all-responses-table-data";
import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AllResponsesTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AllResponsesTableToolbar<TData>({
  table,
}: AllResponsesTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    new Set(searchParams.getAll("status")),
  );
  const [selectedUrgencies, setSelectedUrgencies] = useState<Set<string>>(
    new Set(searchParams.getAll("urgency")),
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    selectedStatuses.forEach((s) => params.append("status", s));
    params.delete("urgency");
    selectedUrgencies.forEach((u) => params.append("urgency", u));
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params}`, { scroll: false });
    }
  }, [
    selectedStatuses,
    selectedUrgencies,
    debouncedSearch,
    router,
    searchParams,
  ]);

  const isFiltered =
    selectedStatuses.size > 0 ||
    selectedUrgencies.size > 0 ||
    search.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter responses..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />
        {table.getColumn("request.status") && (
          <DataTableFacetedFilter
            column={table.getColumn("request.status")}
            title="Status"
            options={statuses}
            selectedValues={selectedStatuses}
            onSelectionChange={setSelectedStatuses}
          />
        )}
        {table.getColumn("request.urgency") && (
          <DataTableFacetedFilter
            column={table.getColumn("request.urgency")}
            title="Urgency"
            options={urgencies}
            selectedValues={selectedUrgencies}
            onSelectionChange={setSelectedUrgencies}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedStatuses(new Set());
              setSelectedUrgencies(new Set());
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
