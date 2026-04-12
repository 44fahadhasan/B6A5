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
import { IDonationResponse } from "@/types";
import { format } from "date-fns";

type AllDonationDetailsProps = {
  data?: IDonationResponse;
};

export default function AllDonationDetails({ data }: AllDonationDetailsProps) {
  if (!data) {
    return (
      <TypographyMuted className="text-center">
        No donation details available.
      </TypographyMuted>
    );
  }

  const amount = Number(data.amount).toFixed(2);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Donation Overview</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyMuted>
            Donated on{" "}
            {format(new Date(data.createdAt), "dd MMM yyyy, hh:mm a")}
          </TypographyMuted>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <TypographyH3 className="text-lg">Donation Details</TypographyH3>
            <div className="mt-2 space-y-1">
              <TypographyMuted>
                Amount: {data.currency} {amount}
              </TypographyMuted>
              <TypographyMuted>
                Payment method: {data.paymentMethod}
              </TypographyMuted>
              <TypographyMuted>Status: {data.status}</TypographyMuted>
              <TypographyMuted>
                Transaction: {data.transactionId ?? "N/A"}
              </TypographyMuted>
            </div>
          </div>

          <div>
            <TypographyH3 className="text-lg">Request Summary</TypographyH3>
            <div className="mt-2 space-y-1">
              <TypographyMuted>Title: {data.request.title}</TypographyMuted>
              <TypographyMuted>
                Request owner: {data.request.creator.name} (
                {data.request.creator.email})
              </TypographyMuted>
            </div>
          </div>

          <div>
            <TypographyH3 className="text-lg">Campaign</TypographyH3>
            <TypographyMuted>
              {data.campaign?.title ?? "No campaign linked"}
            </TypographyMuted>
          </div>

          {data.notes && (
            <div>
              <TypographyH3 className="text-lg">Notes</TypographyH3>
              <TypographyBlockquote>{data.notes}</TypographyBlockquote>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Donation ID: {data.id}</Badge>
          <Badge variant="outline">Donor: {data.donor.name}</Badge>
        </div>
        <TypographyMuted className="mt-4 block text-sm">
          Last updated:{" "}
          {format(new Date(data.updatedAt), "dd MMM yyyy, hh:mm a")}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
