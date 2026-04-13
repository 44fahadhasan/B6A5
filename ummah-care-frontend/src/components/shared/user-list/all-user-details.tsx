"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAllUsersResponse } from "@/types";
import { format } from "date-fns";

interface AllUserDetailsProps {
  data: IAllUsersResponse;
}

export default function AllUserDetails({ data }: AllUserDetailsProps) {
  const {
    name,
    email,
    phone,
    bio,
    emailVerified,
    location,
    role,
    status,
    createdAt,
    updatedAt,
    userTypes,
    organization,
    _count,
  } = data;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-sm">{name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <div className="flex items-center gap-2">
                <p className="text-sm">{email}</p>
                {emailVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <p className="text-sm">{phone || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Location
              </label>
              <p className="text-sm">{location || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <p className="text-sm capitalize">{role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <Badge
                variant={status === "ACTIVE" ? "default" : "secondary"}
                className="text-xs"
              >
                {status}
              </Badge>
            </div>
          </div>
          {bio && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Bio
              </label>
              <p className="text-sm">{bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Types */}
      <Card>
        <CardHeader>
          <CardTitle>User Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userTypes.map((userType) => (
              <Badge key={userType.id} variant="outline">
                {userType.type} - {userType.status}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Organization Information */}
      {organization && (
        <Card>
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Organization Name
                </label>
                <p className="text-sm">{organization.orgName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Verified
                </label>
                <Badge
                  variant={organization.isVerified ? "default" : "secondary"}
                  className="text-xs"
                >
                  {organization.isVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>
            {organization.description && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <p className="text-sm">{organization.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Website
                </label>
                <p className="text-sm">
                  {organization.website ? (
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {organization.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Registration Number
                </label>
                <p className="text-sm">
                  {organization.registrationNumber || "Not provided"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Contact Email
                </label>
                <p className="text-sm">
                  {organization.contactEmail || "Not provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Contact Phone
                </label>
                <p className="text-sm">
                  {organization.contactPhone || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {_count.createdRequests}
              </div>
              <div className="text-sm text-muted-foreground">
                Requests Created
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {_count.donations}
              </div>
              <div className="text-sm text-muted-foreground">
                Donations Made
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {userTypes.length}
              </div>
              <div className="text-sm text-muted-foreground">User Types</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timestamps */}
      <Card>
        <CardHeader>
          <CardTitle>Account Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Joined
              </label>
              <p className="text-sm">
                {format(new Date(createdAt), "PPP 'at' p")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </label>
              <p className="text-sm">
                {format(new Date(updatedAt), "PPP 'at' p")}
              </p>
            </div>
          </div>
          {organization?.verifiedAt && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Organization Verified
              </label>
              <p className="text-sm">
                {format(new Date(organization.verifiedAt), "PPP 'at' p")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
