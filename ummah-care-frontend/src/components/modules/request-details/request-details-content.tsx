import { TypographyMuted } from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import { IRequestDetailsResponse } from "@/types";
import {
  categoryVariantMap,
  getVariant,
  helpTypeVariantMap,
  statusVariantMap,
  urgencyVariantMap,
} from "../requests/badge-variants";
import ResponseButton from "../responses/response-button";

type RequestDetailsContentProps = {
  request: IRequestDetailsResponse;
};

export default function RequestDetailsContent({
  request,
}: RequestDetailsContentProps) {
  const { name, email, avatarUrl } = request.creator;

  const displayName = request.isAnonymous ? "Anonymous" : name;
  const displayEmail = request.isAnonymous ? "Hidden Email" : email;
  const initials = request.isAnonymous ? "A" : getInitials(name);

  const isUrgent = request.urgency === "HIGH" || request.urgency === "CRITICAL";

  return (
    <Card className="max-w-3xl mx-auto mt-6 border hover:shadow-sm transition">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          {request.title}
          <Badge variant={getVariant(urgencyVariantMap, request.urgency)}>
            {request.urgency}
          </Badge>
        </CardTitle>
        <CardDescription className="flex flex-wrap gap-2 mt-2">
          <Badge variant={getVariant(categoryVariantMap, request.category)}>
            {request.category}
          </Badge>
          <Badge variant={getVariant(helpTypeVariantMap, request.helpType)}>
            {request.helpType}
          </Badge>
          <Badge variant={getVariant(statusVariantMap, request.status)}>
            {request.status}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TypographyMuted>{request.description}</TypographyMuted>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar size="default" className="rounded-lg">
            {avatarUrl && !request.isAnonymous ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : (
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{displayName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {displayEmail}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <ResponseButton isUrgent={isUrgent} requestId={request.id} />
        </div>
      </CardContent>
    </Card>
  );
}
