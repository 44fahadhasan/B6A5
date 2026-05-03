"use client";

import { cn } from "@/lib/utils";

type GoalProgressProps = {
  currentAmount: number;
  goalAmount: number;
  currency?: string;
  showLabel?: boolean;
  className?: string;
};

export default function GoalProgress({
  currentAmount,
  goalAmount,
  currency = "",
  showLabel = true,
  className,
}: GoalProgressProps) {
  const safeCurrent = Number(currentAmount) || 0;
  const safeGoal = Number(goalAmount) || 0;

  const hasGoal = safeGoal > 0;

  const progressPercentage = hasGoal
    ? Math.min((safeCurrent / safeGoal) * 100, 100)
    : 0;

  const isCompleted = hasGoal && safeCurrent >= safeGoal;

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="text-sm font-medium flex items-center gap-2">
          {safeCurrent.toLocaleString()} / {safeGoal.toLocaleString()}{" "}
          {currency}
          {!hasGoal && (
            <span className="text-xs text-muted-foreground">(No goal set)</span>
          )}
          {isCompleted && (
            <span className="text-xs text-green-600">Completed</span>
          )}
        </div>
      )}

      {hasGoal ? (
        <>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="text-xs text-muted-foreground">
            {progressPercentage.toFixed(1)}% funded
          </div>
        </>
      ) : (
        <div className="text-xs text-muted-foreground">No goal set</div>
      )}
    </div>
  );
}
