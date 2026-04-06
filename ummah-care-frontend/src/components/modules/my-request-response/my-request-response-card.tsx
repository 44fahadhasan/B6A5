"use client";

import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import { IMyRequestResponse } from "@/types";
import { format } from "date-fns";

type MyRequestResponseCardProps = {
  response: IMyRequestResponse;
};

export default function MyRequestResponseCard({
  response,
}: MyRequestResponseCardProps) {
  const { user, responseType, message, createdAt } = response;

  return (
    <Card>
      <CardContent className="p-4 flex gap-3">
        <Avatar size="lg">
          <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <TypographyH3 className="text-sm font-semibold leading-none">
                {user.name}
              </TypographyH3>
              <TypographyMuted className="text-xs">
                {user.email}
              </TypographyMuted>
            </div>

            <TypographyMuted className="text-xs whitespace-nowrap">
              {format(new Date(createdAt), "PPpp")}
            </TypographyMuted>
          </div>

          <div className="flex items-center gap-2">
            <TypographyMuted className="text-xs">
              Response Type:
            </TypographyMuted>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {responseType}
            </Badge>
          </div>

          <div className="space-y-1">
            <TypographyMuted className="text-xs">Message:</TypographyMuted>
            <TypographyMuted className="leading-relaxed">
              {message}
            </TypographyMuted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
