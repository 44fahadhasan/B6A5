"use client";

import { getResponseById } from "@/actions/response.actions";
import { ErrorMessage } from "@/components/shared/error-message";
import {
  TypographyH3,
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { getInitials } from "@/lib/utils";
import { formatExpiryDate } from "@/utils/date-utils";
import { format } from "date-fns";

type MyResponseCardProps = {
  responseId: string;
};

export default function MyResponseDetails({ responseId }: MyResponseCardProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.RESPONSE.MY_RESPONSES_DETAILS, responseId],
    queryFn: () => getResponseById(responseId),
  });

  const response = data?.data;

  if (!isLoading && (isError || !data?.success)) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <Card className="ring-0 max-w-2xl mx-auto">
      <CardContent className="space-y-6 p-6">
        {/* Creator Info */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar size="lg">
              <AvatarImage
                src={response?.request.creator.avatarUrl ?? ""}
                alt={response?.request.creator.name}
              />
              <AvatarFallback>
                {getInitials(response?.request.creator.name ?? "")}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1 space-y-1">
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
              </>
            ) : (
              <>
                <TypographyH3 className="text-sm font-semibold leading-none">
                  {response?.request.creator.name}
                </TypographyH3>
                <TypographyMuted className="text-xs">
                  {response?.request.creator.email}
                </TypographyMuted>
              </>
            )}
          </div>

          {isLoading ? (
            <Skeleton className="h-4 w-24 rounded" />
          ) : (
            <TypographyMuted className="text-xs whitespace-nowrap">
              {format(new Date(response?.createdAt ?? ""), "PPpp")}
            </TypographyMuted>
          )}
        </div>

        {/* Request Details */}
        <div className="space-y-2">
          {isLoading ? (
            <Skeleton className="h-6 w-48 rounded" />
          ) : (
            <TypographyH3 className="text-sm font-semibold">
              {response?.request.title}
            </TypographyH3>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
              </>
            ) : (
              <>
                <Badge variant="secondary" className="text-xs">
                  {response?.request.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {response?.request.status}
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  {response?.request.urgency}
                </Badge>
                <Badge variant="default" className="text-xs">
                  {response?.request.helpType}
                </Badge>

                {response?.request.expiresAt && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TypographySmall className="cursor-default text-muted-foreground">
                        Expires: {formatExpiryDate(response?.request.expiresAt)}
                      </TypographySmall>
                    </TooltipTrigger>
                    <TooltipContent>
                      {format(new Date(response?.request.expiresAt), "PPpp")}
                    </TooltipContent>
                  </Tooltip>
                )}
              </>
            )}
          </div>
        </div>

        {/* Response Type */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="h-5 w-32 rounded" />
          ) : (
            <>
              <TypographyMuted className="text-xs">Your Role:</TypographyMuted>
              <Badge className="text-xs px-2 py-0.5">
                {response?.responseType}
              </Badge>
            </>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-12 w-full rounded" />
            </>
          ) : (
            <>
              <TypographyMuted className="text-xs">Message:</TypographyMuted>
              <TypographyMuted className="leading-relaxed">
                {response?.message?.trim()
                  ? response.message
                  : "No message provided"}
              </TypographyMuted>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
