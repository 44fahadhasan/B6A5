import { IDonorStats } from "@/types";
import {
  DollarSign,
  Heart,
  MessageSquare,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const buildDonorStatsCards = (stats: IDonorStats) => {
  const averageDonation =
    stats.donationCount > 0
      ? (stats.totalDonated / stats.donationCount).toFixed(2)
      : "0.00";

  return [
    {
      title: "Total Donations",
      value: stats.donationCount ?? 0,
      icon: Heart,
      trendIcon: (stats.donationCount ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.donationCount ?? 0) > 0
          ? "Actively donating"
          : "No donations yet",
      description: "Donations made",
      footer: `$${stats.totalDonated?.toFixed(2) ?? "0.00"} total`,
    },
    {
      title: "Total Amount",
      value: `$${Number(stats.totalDonated ?? 0).toFixed(2)}`,
      icon: DollarSign,
      trendIcon: (stats.totalDonated ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.totalDonated ?? 0) > 0
          ? "Positive contribution"
          : "No contribution yet",
      description: "Money donated",
      footer: "Helping the community",
    },
    {
      title: "Responses",
      value: stats.responseCount ?? 0,
      icon: MessageSquare,
      trendIcon: (stats.responseCount ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.responseCount ?? 0) > 0
          ? "Engaging with requests"
          : "No responses yet",
      description: "Responses given",
      footer: "Engaged with requests",
    },
    {
      title: "Average Donation",
      value: `$${averageDonation}`,
      icon: TrendingUp,
      trendIcon: Number(averageDonation) > 0 ? TrendingUp : TrendingDown,
      trendText:
        Number(averageDonation) > 0 ? "Healthy average" : "No donations yet",
      description: "Your average contribution",
      footer: `${stats.donationCount ?? 0} donations`,
    },
  ];
};
