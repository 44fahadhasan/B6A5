"use client";

import { TypographySmall } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function RequestsPagination() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <TypographySmall>Each page</TypographySmall>
          <Select defaultValue="20">
            <SelectTrigger size="sm">
              <SelectValue />
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

        <TypographySmall>Page 1 of 10</TypographySmall>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden lg:flex size-7">
            <ChevronsLeft />
          </Button>

          <Button variant="outline" size="sm" className="size-7">
            <ChevronLeft />
          </Button>

          <Button variant="outline" size="sm" className="size-7">
            <ChevronRight />
          </Button>

          <Button variant="outline" size="sm" className="hidden lg:flex size-7">
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
