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
import { IResponses } from "@/types";
import { format } from "date-fns";

type AllResponseDetailsProps = {
  data?: IResponses;
};

export default function AllResponseDetails({ data }: AllResponseDetailsProps) {
  if (!data) {
    return (
      <TypographyMuted className="text-center">
        No response details available.
      </TypographyMuted>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Response Details</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyMuted>
            Responded at:{" "}
            {format(new Date(data.createdAt), "dd MMM yyyy, HH:mm")}
          </TypographyMuted>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <TypographyH3 className="text-lg">
              Responder Information
            </TypographyH3>
            <div className="mt-2 space-y-1">
              <TypographyMuted>Name: {data.user.name}</TypographyMuted>
              <TypographyMuted>Email: {data.user.email}</TypographyMuted>
              {data.user.phone && (
                <TypographyMuted>Phone: {data.user.phone}</TypographyMuted>
              )}
              <TypographyMuted>Role: {data.user.role}</TypographyMuted>
            </div>
          </div>

          <div>
            <TypographyH3 className="text-lg">Request Information</TypographyH3>
            <div className="mt-2 space-y-1">
              <TypographyMuted>Title: {data.request.title}</TypographyMuted>
              <TypographyMuted>Status: {data.request.status}</TypographyMuted>
              <TypographyMuted>
                Category: {data.request.category}
              </TypographyMuted>
              <TypographyMuted>Urgency: {data.request.urgency}</TypographyMuted>
              <TypographyMuted>
                Help Type: {data.request.helpType}
              </TypographyMuted>
            </div>
            <div className="mt-2">
              <TypographyH3 className="text-base">Request Creator</TypographyH3>
              <TypographyMuted>
                Name: {data.request.creator.name}
              </TypographyMuted>
              <TypographyMuted>
                Email: {data.request.creator.email}
              </TypographyMuted>
            </div>
          </div>

          <div>
            <TypographyH3 className="text-lg">Response Details</TypographyH3>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">Type: {data.responseType}</Badge>
            </div>
            {data.message && (
              <div className="mt-2">
                <TypographyBlockquote>{data.message}</TypographyBlockquote>
              </div>
            )}
          </div>
        </div>
        <TypographyMuted className="mt-4 block text-sm">
          Last updated: {format(new Date(data.updatedAt), "dd MMM yyyy, HH:mm")}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
