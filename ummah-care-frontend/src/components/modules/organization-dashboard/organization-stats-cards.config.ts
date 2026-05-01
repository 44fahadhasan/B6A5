import { IOrganizationStats } from "@/types";
import {
  Activity,
  Award,
  BarChart3,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

export const buildOrganizationStatsCards = (stats: IOrganizationStats) => {
  return [
    {
      title: "Active Campaigns",
      value: stats.activeCampaignCount ?? 0,
      icon: Activity,
      trendIcon: stats.activeCampaignCount > 0 ? CheckCircle2 : BarChart3,
      trendText:
        stats.activeCampaignCount > 0
          ? "Running campaigns"
          : "No active campaigns",
      description: "Campaigns currently raising funds",
      footer: `${stats.campaignCount} total campaigns`,
    },
    {
      title: "Total Raised",
      value: `$${Number(stats.totalRaised ?? 0).toFixed(2)}`,
      icon: DollarSign,
      trendIcon: stats.totalRaised > 0 ? CheckCircle2 : BarChart3,
      trendText:
        stats.totalRaised > 0 ? "Fundraising progress" : "No funds raised yet",
      description: "All donations received",
      footer: `Goal amount $${Number(stats.goalAmount ?? 0).toFixed(2)}`,
    },
    {
      title: "Donation Count",
      value: stats.donationCount ?? 0,
      icon: Award,
      trendIcon: stats.donationCount > 0 ? CheckCircle2 : BarChart3,
      trendText:
        stats.donationCount > 0 ? "Donations received" : "No donations yet",
      description: "Total gifts received",
      footer: `${stats.totalDonationAmount} total donation amount`,
    },
    {
      title: "Assignments",
      value: stats.assignmentCount ?? 0,
      icon: BarChart3,
      trendIcon: stats.completedAssignmentCount > 0 ? CheckCircle2 : BarChart3,
      trendText:
        stats.completedAssignmentCount > 0
          ? `${stats.completedAssignmentCount} completed`
          : "No completed assignments",
      description: "Assignment activity for your organization",
      footer: `${stats.completedAssignmentCount} completed`,
    },
  ];
};
