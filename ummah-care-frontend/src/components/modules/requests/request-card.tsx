import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RequestCard() {
  return (
    <div className="border rounded-xl p-5 flex flex-col gap-4 bg-background hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-sm leading-snug">
          Need blood donor urgently
        </h3>

        <Badge variant="destructive">HIGH</Badge>
      </div>

      <TypographyMuted className="line-clamp-2">
        Looking for O+ blood donor for emergency surgery
      </TypographyMuted>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">Medical</Badge>
        <Badge variant="secondary">Physical</Badge>
      </div>

      <div className="flex items-center justify-between">
        <Badge>OPEN</Badge>

        <TypographySmall>Expires: Apr 30</TypographySmall>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button size="sm" asChild className="flex-1">
          <Link href="#">{"HIGH" === "HIGH" ? "Help Now" : "Offer Help"}</Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link href="#">View</Link>
        </Button>
      </div>
    </div>
  );
}
