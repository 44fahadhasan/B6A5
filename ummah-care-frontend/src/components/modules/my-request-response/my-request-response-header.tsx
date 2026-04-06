"use client";

import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function MyRequestResponseHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <TypographyH3 className="text-2xl">Help Request Responses</TypographyH3>
        <TypographyMuted className="text-sm">
          All responses for this help request
        </TypographyMuted>
      </div>

      <Button size="sm" onClick={() => router.back()}>
        Back to Requests
      </Button>
    </div>
  );
}
