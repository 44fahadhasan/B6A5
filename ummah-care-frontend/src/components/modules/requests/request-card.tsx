import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IRequestResponse } from "@/types";
import { formatExpiryDate } from "@/utils/date-utils";
import { format } from "date-fns";
import Link from "next/link";
import ResponseButton from "../responses/response-button";
import {
  categoryVariantMap,
  getVariant,
  helpTypeVariantMap,
  statusVariantMap,
  urgencyVariantMap,
} from "./badge-variants";

export function RequestCard({ request }: { request: IRequestResponse }) {
  const isUrgent = request.urgency === "HIGH" || request.urgency === "CRITICAL";

  return (
    <div className="border rounded-xl p-5 flex flex-col gap-4 bg-background hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-sm leading-snug">{request.title}</h3>

        <Badge variant={getVariant(urgencyVariantMap, request.urgency)}>
          {request.urgency}
        </Badge>
      </div>

      <TypographyMuted className="line-clamp-2">
        {request.description}
      </TypographyMuted>

      <div className="flex flex-wrap gap-2">
        <Badge variant={getVariant(helpTypeVariantMap, request.helpType)}>
          {request.helpType}
        </Badge>

        <Badge variant={getVariant(categoryVariantMap, request.category)}>
          {request.category}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <Badge variant={getVariant(statusVariantMap, request.status)}>
          {request.status}
        </Badge>

        <Tooltip>
          <TooltipTrigger asChild>
            <TypographySmall className="cursor-default">
              {formatExpiryDate(request.expiresAt)}
            </TypographySmall>
          </TooltipTrigger>
          <TooltipContent>
            {format(new Date(request.expiresAt), "PPpp")}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex gap-2 mt-auto">
        <ResponseButton isUrgent={isUrgent} requestId={request.id} />

        <Button variant="outline" size="sm" asChild>
          <Link href={`/requests/${request.id}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}
