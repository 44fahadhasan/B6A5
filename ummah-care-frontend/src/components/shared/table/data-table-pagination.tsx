"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryParam from "@/hooks/use-query-param";
import { IPaginationMeta } from "@/types";
import { getPaginationMeta } from "@/utils/pagination-utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { TypographySmall } from "../typography";

interface DataTablePaginationProps {
  meta: IPaginationMeta;
}

export function DataTablePagination({ meta }: DataTablePaginationProps) {
  const { total: totalItems, page: currentPage, limit } = meta;

  const { totalPage, safePage } = getPaginationMeta({
    totalItems,
    currentPage,
    limit,
  });

  const { setParamValue: setPage } = useQueryParam("page");
  const { setParamValue: setLimit } = useQueryParam("limit");

  const navigateToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPage));
    setPage(`${newPage}`);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {safePage} of {totalPage}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <TypographySmall>Rows per page</TypographySmall>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              setLimit(value);
              setPage("1");
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <TypographySmall className="flex w-25 items-center justify-center">
          Page {safePage} of {totalPage}
        </TypographySmall>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => navigateToPage(1)}
            disabled={safePage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => navigateToPage(safePage - 1)}
            disabled={safePage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => navigateToPage(safePage + 1)}
            disabled={safePage === totalPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
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
