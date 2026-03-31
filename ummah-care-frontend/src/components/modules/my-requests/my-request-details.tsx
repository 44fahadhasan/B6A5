"use client";

import {
  TypographyBlockquote,
  TypographyH3,
  TypographyMuted,
} from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IRequestResponse } from "@/types";
import { format } from "date-fns";

type MyRequestDetailsProps = {
  data?: IRequestResponse;
};

export default function MyRequestDetails({ data }: MyRequestDetailsProps) {
  if (!data) {
    return (
      <TypographyMuted className="text-center">
        No request details available.
      </TypographyMuted>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <TypographyH3>{data.title}</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyMuted>
            Created at: {format(new Date(data.createdAt), "dd MMM yyyy, HH:mm")}{" "}
            | Location: {data.location}
          </TypographyMuted>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TypographyBlockquote>{data.description}</TypographyBlockquote>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Category: {data.category}</Badge>
          <Badge variant={data.urgency === "HIGH" ? "destructive" : "default"}>
            Urgency: {data.urgency}
          </Badge>
          <Badge variant={data.status === "OPEN" ? "outline" : "secondary"}>
            Status: {data.status}
          </Badge>
          <Badge variant="outline">Help Type: {data.helpType}</Badge>
          <Badge variant="outline">
            Anonymous: {data.isAnonymous ? "Yes" : "No"}
          </Badge>
          <Badge variant="outline">
            Expires At: {format(new Date(data.expiresAt), "dd MMM yyyy")}
          </Badge>
        </div>
        <TypographyMuted className="mt-4 block text-sm">
          Last updated: {format(new Date(data.updatedAt), "dd MMM yyyy, HH:mm")}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
