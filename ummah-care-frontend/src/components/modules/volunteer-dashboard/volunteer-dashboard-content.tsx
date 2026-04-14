"use client";

import { getDashboardStats } from "@/actions/stats.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { TypographyP } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
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
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { VolunteerAssignmentStatusChart } from "./volunteer-assignment-status-chart";
import { VolunteerStatsCards } from "./volunteer-stats-cards";

export default function VolunteerDashboardContent() {
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

  const stats = data.data?.volunteerStats;

  if (!stats) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BarChart3 className="opacity-40" />
          </EmptyMedia>
          <EmptyTitle>No Volunteer Statistics Available</EmptyTitle>
          <EmptyDescription>
            Insights will appear once your volunteer enrollment is active and
            you start taking assignments.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button asChild size="sm">
            <Link href="/dashboard">Become a Volunteer</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="space-y-6 @container/main">
      <VolunteerStatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolunteerAssignmentStatusChart data={stats} />
      </div>
    </div>
  );
}
