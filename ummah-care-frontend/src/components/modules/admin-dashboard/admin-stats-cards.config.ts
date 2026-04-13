import { IAdminStats } from "@/types";
import {
  AlertTriangle,
  DollarSign,
  HandHelping,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  getCriticalRequests,
  getDonorCount,
  getOpenRequests,
} from "./admin-stats-card.utils";

export const buildStatsCards = (stats: IAdminStats) => {
  const critical = getCriticalRequests(stats);

  return [
    {
      title: "Total Donations",
      value: Number(stats.totalDonationAmount ?? 0).toFixed(2),
      icon: DollarSign,
      trendIcon: TrendingUp,
      trendText: "All time",
      description: "Total donated amount",
      footer: "Completed donations",
    },
    {
      title: "Total Users",
      value: stats.userCount ?? 0,
      icon: Users,
      trendIcon: TrendingUp,
      trendText: "Growing",
      description: "Registered users",
      footer: `${getDonorCount(stats)} donors`,
    },
    {
      title: "Open Requests",
      value: getOpenRequests(stats),
      icon: HandHelping,
      trendIcon: TrendingUp,
      trendText: "Active",
      description: "Currently open requests",
      footer: `${stats?.requestCount ?? 0} total requests`,
    },
    {
      title: "Critical Requests",
      value: critical,
      icon: AlertTriangle,
      trendIcon: critical > 0 ? TrendingDown : TrendingUp,
      trendText: critical > 0 ? "Needs attention" : "Stable",
      description: "High priority cases",
      footer: "Urgent help required",
    },
  ];
};
