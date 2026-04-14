import { IVolunteerStats } from "@/types";
import {
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const buildVolunteerStatsCards = (stats: IVolunteerStats) => {
  return [
    {
      title: "Total Responses",
      value: stats.responseCount ?? 0,
      icon: MessageSquare,
      trendIcon: (stats.responseCount ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.responseCount ?? 0) > 0
          ? "Actively responding"
          : "No responses yet",
      description: "Responses given",
      footer: "Engaged with requests",
    },
    {
      title: "Total Assignments",
      value: stats.assignmentCount ?? 0,
      icon: Target,
      trendIcon: (stats.assignmentCount ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.assignmentCount ?? 0) > 0
          ? "Receiving assignments"
          : "No assignments yet",
      description: "Assignments received",
      footer: `${stats.completedAssignmentCount ?? 0} completed`,
    },
    {
      title: "In Progress",
      value: stats.inProgressAssignmentCount ?? 0,
      icon: Clock,
      trendIcon:
        (stats.inProgressAssignmentCount ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.inProgressAssignmentCount ?? 0) > 0
          ? "Currently active"
          : "No active work",
      description: "Current assignments",
      footer: "Being worked on",
    },
    {
      title: "Completed",
      value: stats.completedAssignmentCount ?? 0,
      icon: CheckCircle,
      trendIcon:
        (stats.completedAssignmentCount ?? 0) > 0 ? TrendingUp : TrendingDown,
      trendText:
        (stats.completedAssignmentCount ?? 0) > 0
          ? "Successfully completing"
          : "No completions yet",
      description: "Finished assignments",
      footer: "Successfully completed",
    },
    {
      title: "Average Rating",
      value: (stats.averageRating ?? 0).toFixed(1),
      icon: Star,
      trendIcon:
        (stats.averageRating ?? 0) >= 4
          ? TrendingUp
          : (stats.averageRating ?? 0) > 0
            ? TrendingDown
            : TrendingDown,
      trendText:
        (stats.averageRating ?? 0) >= 4
          ? "Excellent performance"
          : (stats.averageRating ?? 0) > 0
            ? "Needs improvement"
            : "No ratings yet",
      description: "Your performance rating",
      footer: `${stats.reviewCount ?? 0} reviews received`,
    },
  ];
};
