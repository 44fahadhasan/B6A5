"use client";

import { getDashboardStats } from "@/actions/stats.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { TypographyMuted, TypographyP } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { format } from "date-fns";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { OrganizationStatsCards } from "./organization-stats-cards";

export default function OrganizationDashboardContent() {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.DASHBOARD_STATS],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <TypographyP className="text-center">Loading dashboard...</TypographyP>
    );
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={error?.message || data?.message} />;
  }

  const stats = data.data?.organizationStats;

  if (!stats) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BarChart3 className="opacity-40" />
          </EmptyMedia>
          <EmptyTitle>No Organization Statistics Available</EmptyTitle>
          <EmptyDescription>
            Insights will appear once your organization is verified and starts
            receiving donations or launching campaigns.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild size="sm">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="space-y-6 @container/main">
      <OrganizationStatsCards stats={stats} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Track goal progress from your top campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.campaignPerformance.length > 0 ? (
              stats.campaignPerformance.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">{campaign.title}</p>
                      <TypographyMuted>
                        Status: {campaign.status}
                      </TypographyMuted>
                    </div>
                    <p className="text-sm font-semibold">
                      {Number(campaign.currentAmount || 0).toFixed(2)} /{" "}
                      {!Number(campaign.goalAmount) ? (
                        <span className="text-xs text-muted-foreground">
                          (No goal set)
                        </span>
                      ) : (
                        Number(campaign.goalAmount).toFixed(2)
                      )}
                    </p>
                  </div>
                  <TypographyMuted className="mt-2">
                    Created on{" "}
                    {format(new Date(campaign.createdAt), "dd MMM yyyy")}
                  </TypographyMuted>
                </div>
              ))
            ) : (
              <TypographyP>No campaigns available yet.</TypographyP>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>
              Latest gifts received by your organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recentDonations.length > 0 ? (
              stats.recentDonations.slice(0, 5).map((donation) => (
                <div key={donation.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">
                        ${Number(donation.amount || 0).toFixed(2)}
                      </p>
                      <TypographyMuted>
                        {donation.request.title}
                      </TypographyMuted>
                    </div>
                    <TypographyMuted>
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </TypographyMuted>
                  </div>
                  <TypographyMuted className="mt-2">
                    Donor: {donation.donor.name}
                  </TypographyMuted>
                </div>
              ))
            ) : (
              <TypographyP className="text-center">
                No donations received yet.
              </TypographyP>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
