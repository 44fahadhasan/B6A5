"use client";

import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

type UseFetchOptions<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean | "always";
  refetchInterval?: number;
};

export function useFetch<T>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 1000 * 60 * 5, // 5 min
  gcTime = 1000 * 60 * 10, // 10 min
  refetchOnWindowFocus = false,
  refetchInterval,
}: UseFetchOptions<T>) {
  return useQuery<T>({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
    ...(refetchInterval && { refetchInterval }),
  });
}
