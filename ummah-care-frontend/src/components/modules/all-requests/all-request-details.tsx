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
import { IAllRequestResponse } from "@/types";
import { format } from "date-fns";

type AllRequestDetailsProps = {
  data?: IAllRequestResponse;
};

export default function AllRequestDetails({ data }: AllRequestDetailsProps) {
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
            | Location: {data.location || "Not specified"}
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
            Expires At: {format(new Date(data.expiresAt), "dd MMM yyyy")}
          </Badge>
        </div>
        <div className="mt-4">
          <TypographyH3 className="text-lg">Creator Information</TypographyH3>
          <div className="mt-2 space-y-1">
            <TypographyMuted>Name: {data.creator.name}</TypographyMuted>
            <TypographyMuted>Email: {data.creator.email}</TypographyMuted>
            {data.creator.phone && (
              <TypographyMuted>Phone: {data.creator.phone}</TypographyMuted>
            )}
          </div>
        </div>
        <div className="mt-4">
          <TypographyH3 className="text-lg">Activity Summary</TypographyH3>
          <div className="mt-2 flex flex-wrap gap-4">
            <Badge variant="outline">Responses: {data._count.responses}</Badge>
            <Badge variant="outline">Donations: {data._count.donations}</Badge>
            <Badge variant="outline">
              Assignments: {data._count.assignments}
            </Badge>
            <Badge variant="outline">Messages: {data._count.messages}</Badge>
            <Badge variant="outline">Reviews: {data._count.reviews}</Badge>
          </div>
        </div>
        <TypographyMuted className="mt-4 block text-sm">
          Last updated: {format(new Date(data.updatedAt), "dd MMM yyyy, HH:mm")}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
