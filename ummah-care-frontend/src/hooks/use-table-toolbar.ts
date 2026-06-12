"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "./use-debounce";

type FilterValueSet = Record<string, Set<string>>;

interface UseTableToolbarOptions {
  filterKeys: string[];
  debounceDelay?: number;
}

interface UseTableToolbarResult {
  search: string;
  setSearch: (value: string) => void;
  filterValues: FilterValueSet;
  setFilterValues: (filterKey: string, values: Set<string>) => void;
  isFiltered: boolean;
  resetFilters: () => void;
}

export default function useTableToolbar({
  filterKeys,
  debounceDelay,
}: UseTableToolbarOptions): UseTableToolbarResult {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search, debounceDelay);

  const filterValues = useMemo<FilterValueSet>(() => {
    const values: FilterValueSet = {};

    filterKeys.forEach((filterKey) => {
      values[filterKey] = new Set(searchParams.getAll(filterKey));
    });

    return values;
  }, [searchParams, filterKeys]);

  const getDestination = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      return `${pathname}${query ? `?${query}` : ""}`;
    },
    [pathname],
  );

  const setFilterValues = useCallback(
    (filterKey: string, values: Set<string>) => {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete(filterKey);

      values.forEach((value) => nextParams.append(filterKey, value));

      if (debouncedSearch) {
        nextParams.set("search", debouncedSearch);
      }

      const destination = getDestination(nextParams);
      router.replace(destination, { scroll: false });
    },
    [debouncedSearch, getDestination, router, searchParams],
  );

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (debouncedSearch) {
      nextParams.set("search", debouncedSearch);
    } else {
      nextParams.delete("search");
    }

    const destination = getDestination(nextParams);
    const currentDestination = getDestination(
      new URLSearchParams(searchParams),
    );

    if (destination !== currentDestination) {
      router.replace(destination, { scroll: false });
    }
  }, [debouncedSearch, getDestination, router, searchParams]);

  const isFiltered = useMemo(
    () =>
      search.length > 0 ||
      filterKeys.some((filterKey) => filterValues[filterKey]?.size > 0),
    [filterKeys, filterValues, search],
  );

  const resetFilters = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);
    filterKeys.forEach((filterKey) => nextParams.delete(filterKey));
    nextParams.delete("search");

    setSearch("");

    router.replace(getDestination(nextParams), { scroll: false });
  }, [filterKeys, getDestination, router, searchParams]);

  return {
    search,
    setSearch,
    filterValues,
    setFilterValues,
    isFiltered,
    resetFilters,
  };
}
