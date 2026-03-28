"use client";

import { getSession } from "@/actions/auth-actions";
import { TypographySmall } from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { OnboardingForm } from "./onboard-form";

export const Onboarding = () => {
  const [showBanner, setShowBanner] = useState(true);

  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  if (!showBanner) return null;

  const userTypes = data?.success ? (data?.data?.user?.userTypes ?? []) : [];

  return (
    <Card className="mb-4 p-4 gap-2 bg-primary/15 ring-primary">
      {userTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mx-auto">
          {userTypes.map((types) => (
            <div key={types.id} className="flex items-center gap-1">
              <TypographySmall className="capitalize">
                {types.type.toLowerCase()}:
              </TypographySmall>
              <Badge
                className="capitalize"
                variant={
                  types.status === "ACTIVE"
                    ? "default"
                    : types.status === "PENDING"
                      ? "secondary"
                      : "destructive"
                }
              >
                {types.status.toLowerCase()}
              </Badge>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Want to do more?</CardTitle>
          <CardDescription>
            Become a Volunteer, Organization, or Donor to make a bigger impact.
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <OnboardingForm />
          <Button variant="outline" onClick={() => setShowBanner(false)}>
            Skip
          </Button>
        </div>
      </div>
    </Card>
  );
};
