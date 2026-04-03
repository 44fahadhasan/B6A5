import QuerySearchInput from "@/components/shared/query-filters/query-search-input";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";

export function RequestsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <TypographyH3>Help Requests</TypographyH3>
        <TypographyMuted>Find and respond to people in need</TypographyMuted>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <QuerySearchInput
          paramName="search"
          className="h-7 sm:w-64"
          placeholder="Search requests..."
        />

        <Button size="sm">Search</Button>
      </div>
    </div>
  );
}
