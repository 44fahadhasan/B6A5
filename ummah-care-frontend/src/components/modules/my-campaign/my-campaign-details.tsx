"use client";

import {
  TypographyBlockquote,
  TypographyH3,
  TypographyMuted,
} from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ICampaignResponse } from "@/types/campaign.type";
import { format } from "date-fns";

type MyCampaignDetailsProps = {
  data?: ICampaignResponse;
};

export default function MyCampaignDetails({ data }: MyCampaignDetailsProps) {
  if (!data) {
    return (
      <TypographyMuted className="text-center">
        No campaign details available.
      </TypographyMuted>
    );
  }

  const goalAmount = data.goalAmount;
  const currentAmount = data.currentAmount;

  const hasGoal = goalAmount > 0;

  const remainingAmount = Math.max(currentAmount, 0);

  const raisedAmount = Math.max(goalAmount - remainingAmount, 0);

  const progressPercentage =
    goalAmount > 0 ? Math.min((raisedAmount / goalAmount) * 100, 100) : 0;

  const isCompleted = hasGoal && raisedAmount >= goalAmount;

  return (
    <Card className="w-full max-w-2xl mx-auto ring-0">
      <CardHeader>
        <CardTitle>
          <TypographyH3>{data.title}</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyMuted>
            Created at: {format(new Date(data.createdAt), "dd MMM yyyy, HH:mm")}
          </TypographyMuted>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.description && (
          <TypographyBlockquote className="mb-4">
            {data.description}
          </TypographyBlockquote>
        )}

        <div className="mb-4 space-y-2">
          <div className="text-sm font-medium flex items-center gap-2">
            {currentAmount} / {goalAmount} {data.currency}
            {!hasGoal && (
              <span className="text-xs text-muted-foreground">
                (No goal set)
              </span>
            )}
            {isCompleted && (
              <span className="text-xs text-green-600">Completed</span>
            )}
          </div>

          {hasGoal && (
            <>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-xs text-muted-foreground">
                {progressPercentage.toFixed(1)}% funded
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={data.status === "ACTIVE" ? "default" : "secondary"}>
            Status: {data.status}
          </Badge>
          <Badge variant="outline">Currency: {data.currency}</Badge>
          {data.startDate && (
            <Badge variant="outline">
              Start: {format(new Date(data.startDate), "dd MMM yyyy")}
            </Badge>
          )}
          {data.endDate && (
            <Badge variant="outline">
              End: {format(new Date(data.endDate), "dd MMM yyyy")}
            </Badge>
          )}
        </div>
        {data.linkedRequest && (
          <div className="mb-4">
            <TypographyMuted className="text-sm">
              Linked Request: {data.linkedRequest.title}
            </TypographyMuted>
          </div>
        )}
        <TypographyMuted className="block text-sm">
          Last updated: {format(new Date(data.updatedAt), "dd MMM yyyy, HH:mm")}
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
