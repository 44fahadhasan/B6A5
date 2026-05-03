import { TypographyH4, TypographyP } from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAssignmentResponse } from "@/types/assignment.type";
import { format } from "date-fns";
import Link from "next/link";

type TaskDetailsProps = {
  assignment: IAssignmentResponse;
};

export default function TaskDetails({ assignment }: TaskDetailsProps) {
  return (
    <div className="space-y-4">
      <Card className="ring-0">
        <CardHeader>
          <CardTitle className="text-base">Task Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <TypographyH4 className="text-base">Request</TypographyH4>
              <Button
                variant="link"
                className="h-auto p-0 text-left justify-start"
                asChild
              >
                <Link href={`/requests/${assignment.request.id}`}>
                  <TypographyP className="not-first:mt-0">
                    {assignment.request.title}
                  </TypographyP>
                </Link>
              </Button>
            </div>
            <div>
              <TypographyH4 className="text-base">Status</TypographyH4>
              <Badge
                variant={
                  assignment.status === "COMPLETED"
                    ? "default"
                    : assignment.status === "IN_PROGRESS"
                      ? "secondary"
                      : assignment.status === "CANCELLED"
                        ? "destructive"
                        : "outline"
                }
              >
                {assignment.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <div>
              <TypographyH4 className="text-base">Organization</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {assignment.organization?.orgName || "N/A"}
              </TypographyP>
            </div>
            <div>
              <TypographyH4 className="text-base">Assigned Date</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {format(new Date(assignment.assignedAt), "dd MMM yyyy")}
              </TypographyP>
            </div>
          </div>
          {assignment.notes && (
            <div>
              <TypographyH4 className="text-base">Notes</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {assignment.notes}
              </TypographyP>
            </div>
          )}
          {assignment.completedAt && (
            <div>
              <TypographyH4 className="text-base">Completed Date</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {format(new Date(assignment.completedAt), "dd MMM yyyy")}
              </TypographyP>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
