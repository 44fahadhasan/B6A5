"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useQueryParam(name: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramValue = useMemo(() => {
    return searchParams.get(name) ?? "";
  }, [searchParams, name]);

  const setParamValue = useCallback(
    (newParamValue: string) => {
      const currentValue = searchParams.get(name) ?? "";
      if (newParamValue === currentValue) return;

      const params = new URLSearchParams(searchParams.toString());

      if (newParamValue) {
        params.set(name, newParamValue);
      } else {
        params.delete(name);
      }

      const query = params.toString();
      const destination = `${pathname}${query ? `?${query}` : ""}`;

      router.replace(destination, { scroll: false });
    },
    [name, pathname, router, searchParams],
  );

  return { paramValue, setParamValue };
}
