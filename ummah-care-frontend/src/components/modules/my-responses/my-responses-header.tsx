import QuerySearchInput from "@/components/shared/query-filters/query-search-input";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MyResponsesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <TypographyH3 className="text-2xl">My Responses</TypographyH3>
        <TypographyMuted className="text-base">
          A list of all help requests you’ve responded to
        </TypographyMuted>
      </div>

      <QuerySearchInput
        paramName="search"
        className="h-7 sm:w-64 ml-auto"
        placeholder="Search requests..."
      />

      <Button size="sm">
        <Link href="/requests">Help Someone Now</Link>
      </Button>
    </div>
  );
}
