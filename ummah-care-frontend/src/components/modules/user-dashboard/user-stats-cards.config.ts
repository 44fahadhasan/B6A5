import { IUserStats } from "@/types";
import { DollarSign, FileText, Heart, TrendingUp } from "lucide-react";

export const buildUserStatsCards = (stats: IUserStats) => {
  return [
    {
      title: "Total Requests",
      value: stats.requestCount ?? 0,
      icon: FileText,
      trendIcon: TrendingUp,
      trendText: "All time",
      description: "Requests created",
      footer: `${stats.activeRequestCount ?? 0} active`,
    },
    {
      title: "Completed Requests",
      value: stats.completedRequestCount ?? 0,
      icon: Heart,
      trendIcon: TrendingUp,
      trendText: "Success",
      description: "Requests fulfilled",
      footer: "Helped by community",
    },
    {
      title: "Received Donations",
      value: stats.receivedDonationCount ?? 0,
      icon: DollarSign,
      trendIcon: TrendingUp,
      trendText: "Support",
      description: "Donations received",
      footer: `$${Number(stats.totalReceivedAmount ?? 0).toFixed(2)} total`,
    },
    {
      title: "Total Received",
      value: `$${Number(stats.totalReceivedAmount ?? 0).toFixed(2)}`,
      icon: TrendingUp,
      trendIcon: TrendingUp,
      trendText: "Amount",
      description: "Money received",
      footer: "Community support",
    },
  ];
};
