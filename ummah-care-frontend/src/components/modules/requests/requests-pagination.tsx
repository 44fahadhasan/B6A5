"use client";

import QuerySelect from "@/components/shared/query-filters/query-select";
import { TypographyP, TypographySmall } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { PAGE_SIZE } from "@/constants/pagination-option.const";
import useQueryParam from "@/hooks/use-query-param";
import { IPaginationMeta } from "@/types";
import { getPaginationMeta } from "@/utils/pagination-utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function RequestsPagination({ meta }: { meta: IPaginationMeta }) {
  const { total: totalItems, page: currentPage, limit } = meta;

  const { totalPage, safePage, start, end } = getPaginationMeta({
    totalItems,
    currentPage,
    limit,
  });

  const { setParamValue } = useQueryParam("page");

  const navigateToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPage));
    setParamValue(`${newPage}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <TypographyP>
        Showing {start} to {end} of {totalItems} requests
      </TypographyP>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <TypographySmall>Show per page</TypographySmall>
          <QuerySelect paramName="limit" options={[...PAGE_SIZE]} />
        </div>

        <TypographySmall>
          Page {safePage} of {totalPage}
        </TypographySmall>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            disabled={safePage === 1}
            className="hidden lg:flex size-7"
            onClick={() => navigateToPage(1)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>

          <Button
            size="sm"
            className="size-7"
            disabled={safePage === 1}
            onClick={() => navigateToPage(safePage - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          <Button
            size="sm"
            className="size-7"
            disabled={safePage === totalPage}
            onClick={() => navigateToPage(safePage + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>

          <Button
            size="sm"
            className="hidden lg:flex size-7"
            onClick={() => navigateToPage(totalPage)}
            disabled={safePage === totalPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
