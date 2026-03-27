"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { OnboardingForm } from "./onboard-form";

export const Onboarding = () => {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;

  return (
    <Card className="mb-4 flex-row p-4 items-center justify-between bg-primary/15 ring-primary">
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
    </Card>
  );
};
