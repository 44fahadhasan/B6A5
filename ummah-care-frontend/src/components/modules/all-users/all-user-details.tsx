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
import { IAllUsersResponse } from "@/types";
import { format } from "date-fns";

type AllUserDetailsProps = {
  data?: IAllUsersResponse;
};

export default function AllUserDetails({ data }: AllUserDetailsProps) {
  if (!data) {
    return (
      <TypographyMuted className="text-center">
        No user details available.
      </TypographyMuted>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <TypographyH3>{data.name}</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyMuted>
            Joined: {format(new Date(data.createdAt), "dd MMM yyyy, HH:mm")} |
            Role: {data.role}
          </TypographyMuted>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {data.bio && <TypographyBlockquote>{data.bio}</TypographyBlockquote>}

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={data.status === "ACTIVE" ? "default" : "secondary"}>
            Status: {data.status}
          </Badge>
          <Badge variant="outline">Role: {data.role}</Badge>
          {data.emailVerified && (
            <Badge variant="outline">Email Verified</Badge>
          )}
        </div>

        <div className="mt-4">
          <TypographyH3 className="text-lg">Contact Information</TypographyH3>
          <div className="mt-2 space-y-1">
            <TypographyMuted>Email: {data.email}</TypographyMuted>
            {data.phone && (
              <TypographyMuted>Phone: {data.phone}</TypographyMuted>
            )}
            {data.location && (
              <TypographyMuted>Location: {data.location}</TypographyMuted>
            )}
          </div>
        </div>

        <div className="mt-4">
          <TypographyH3 className="text-lg">User Types</TypographyH3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.userTypes.map((userType) => (
              <Badge
                key={userType.id}
                variant={userType.status === "ACTIVE" ? "default" : "secondary"}
              >
                {userType.type} ({userType.status})
              </Badge>
            ))}
          </div>
        </div>

        {data.organization && (
          <div className="mt-4">
            <TypographyH3 className="text-lg">
              Organization Details
            </TypographyH3>
            <div className="mt-2 space-y-1">
              <TypographyMuted>
                Name: {data.organization.orgName}
              </TypographyMuted>
              {data.organization.description && (
                <TypographyMuted>
                  Description: {data.organization.description}
                </TypographyMuted>
              )}
              {data.organization.contactEmail && (
                <TypographyMuted>
                  Contact Email: {data.organization.contactEmail}
                </TypographyMuted>
              )}
              {data.organization.contactPhone && (
                <TypographyMuted>
                  Contact Phone: {data.organization.contactPhone}
                </TypographyMuted>
              )}
              {data.organization.website && (
                <TypographyMuted>
                  Website: {data.organization.website}
                </TypographyMuted>
              )}
              <div className="mt-2">
                <Badge
                  variant={data.organization.isVerified ? "default" : "outline"}
                >
                  {data.organization.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <TypographyH3 className="text-lg">Activity Summary</TypographyH3>
          <div className="mt-2 flex flex-wrap gap-4">
            <Badge variant="outline">
              Requests: {data._count.createdRequests}
            </Badge>
            <Badge variant="outline">Donations: {data._count.donations}</Badge>
          </div>
        </div>

        <TypographyMuted className="mt-4 block text-sm">
          Last updated: {format(new Date(data.updatedAt), "dd MMM yyyy, HH:mm")}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
