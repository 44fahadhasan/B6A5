import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RequestsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <TypographyH3>Help Requests</TypographyH3>
        <TypographyMuted>Find and respond to people in need</TypographyMuted>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Input placeholder="Search requests..." className="h-7 sm:w-64" />

        <Button size="sm">Search</Button>
      </div>
    </div>
  );
}
