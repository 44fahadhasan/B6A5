"use client";

import { deleteMessage, getConversation } from "@/actions/message.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTableRowDeleteAction } from "@/components/shared/table/data-table-row-delete-action";
import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

type Props = {
  requestId: string;
  participantId: string;
  currentUserId: string;
};

export default function MessageConversation({
  requestId,
  participantId,
  currentUserId,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.MESSAGE.MY_CONVERSATION, requestId, participantId],
    queryFn: () => getConversation(requestId, participantId),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 3000, // 3 seconds
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.data]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-7 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <ErrorMessage
        message={data?.message ?? error?.message}
        className="ring-0"
      />
    );
  }

  if (!data.data || data.data.length === 0) {
    return (
      <TypographyMuted className="mt-5 text-center">
        No messages yet.
      </TypographyMuted>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.data.map((msg) => {
        const sender = msg.sender;
        const isSender = msg.senderId === currentUserId;

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {!isSender && (
              <Avatar size="sm">
                <AvatarImage src={sender.avatarUrl ?? ""} alt={sender.name} />
                <AvatarFallback>{getInitials(sender.name)}</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`flex flex-col max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                isSender ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-1">
                <DataTableRowDeleteAction
                  className="px-2 h-5"
                  showIcon={false}
                  showSeparator={false}
                  id={msg.id}
                  label={msg.message}
                  queryKey={QUERY_KEY.RESPONSE.MY_RESPONSES}
                  deleteFun={deleteMessage}
                />
                <Badge
                  variant={isSender ? "default" : "secondary"}
                  className="whitespace-pre-wrap h-auto"
                >
                  {msg.message}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <TypographyMuted className="text-xs">
                  {isSender ? "You" : sender.name}
                </TypographyMuted>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TypographySmall className="text-xs text-muted-foreground cursor-default">
                      {format(new Date(msg.createdAt), "PP")}
                    </TypographySmall>
                  </TooltipTrigger>
                  <TooltipContent>
                    {format(new Date(msg.createdAt), "PPpp")}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {isSender && (
              <Avatar size="sm">
                <AvatarImage src={sender.avatarUrl ?? ""} alt={sender.name} />
                <AvatarFallback>{getInitials(sender.name)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
