/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import useQueryParam from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type QuerySearchInputParams = {
  paramName: string;
  className?: string;
  placeholder?: string;
};

export default function QuerySearchInput({
  paramName,
  className,
  placeholder = "Search...",
}: QuerySearchInputParams) {
  const { paramValue, setParamValue } = useQueryParam(paramName);

  const [search, setSearch] = useState(paramValue);
  const debouncedSearch = useDebounce(search, 0);
  const isExternalParamSync = useRef(false);

  useEffect(() => {
    if (paramValue === search) return;

    isExternalParamSync.current = true;

    const timer = setTimeout(() => setSearch(paramValue), 0);
    return () => clearTimeout(timer);
  }, [paramValue]);

  useEffect(() => {
    if (isExternalParamSync.current) {
      isExternalParamSync.current = false;
      return;
    }

    if (debouncedSearch === paramValue) return;

    setParamValue(debouncedSearch);
  }, [debouncedSearch, paramValue, setParamValue]);

  return (
    <Input
      value={search}
      placeholder={placeholder}
      className={cn("min-w-fit max-w-sm", className)}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
